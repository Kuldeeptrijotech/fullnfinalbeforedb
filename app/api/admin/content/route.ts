import { NextRequest, NextResponse } from "next/server";
import { isAdminRequest, verifyAdminSession, SESSION_COOKIE } from "@/app/lib/admin-auth";
import { validateEntry, type ContentEntry } from "@/app/lib/content-store";
import {
  getSiteContentFromDb,
  saveSiteContentEntriesToDb,
  deleteSiteContentEntriesFromDb,
} from "@/lib/services/content.service";
import { logAuditEvent } from "@/lib/services/audit.service";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function forbidden() {
  return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
}

function sameOrigin(request: NextRequest): boolean {
  const origin = request.headers.get("origin");
  return !origin || origin === request.nextUrl.origin;
}

export async function GET(request: NextRequest) {
  if (!(await isAdminRequest(request))) return forbidden();
  const content = await getSiteContentFromDb();
  return NextResponse.json(content, { headers: { "Cache-Control": "no-store" } });
}

export async function PUT(request: NextRequest) {
  if (!(await isAdminRequest(request)) || !sameOrigin(request)) return forbidden();
  try {
    const body = (await request.json()) as {
      scope?: "global" | "page";
      pathname?: string;
      pageLabel?: string;
      section?: string;
      sectionLabel?: string;
      entries?: ContentEntry[];
    };

    if (!Array.isArray(body.entries) || body.entries.length === 0 || body.entries.length > 100) {
      return NextResponse.json({ error: "Select at least one valid field to save." }, { status: 400 });
    }

    for (const entry of body.entries) {
      const error = validateEntry(entry);
      if (error) return NextResponse.json({ error }, { status: 400 });
    }

    const scope = body.scope === "global" ? "global" : "page";
    const pathname = typeof body.pathname === "string" && body.pathname.startsWith("/") ? body.pathname.slice(0, 300) : "/";
    const pageLabel = body.pageLabel?.trim().slice(0, 120) || pathname;
    const sectionKey = body.section?.trim().replace(/[^a-zA-Z0-9/_-]+/g, "-").slice(0, 160) || "general";
    const sectionLabel = typeof body.sectionLabel === "string" && body.sectionLabel.trim() ? body.sectionLabel.trim().slice(0, 120) : "General";

    const updatedContent = await saveSiteContentEntriesToDb({
      entries: body.entries,
      scope,
      pathname,
      pageLabel,
      sectionKey,
      sectionLabel,
    });

    const token = request.cookies.get(SESSION_COOKIE)?.value;
    const user = await verifyAdminSession(token);
    await logAuditEvent({
      userId: user?.id,
      action: "SITE_CONTENT_UPDATED",
      entityType: "PageSection",
      entityId: `${pathname}#${sectionKey}`,
      metadata: { count: body.entries.length, sectionKey, pathname, scope },
      ipAddress: request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "127.0.0.1",
    });

    return NextResponse.json({ success: true, content: updatedContent });
  } catch (error) {
    console.error("Unable to update site content in PostgreSQL", error);
    return NextResponse.json({ error: "The content could not be saved." }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  if (!(await isAdminRequest(request)) || !sameOrigin(request)) return forbidden();
  try {
    const body = (await request.json()) as { ids?: string[] };
    if (!Array.isArray(body.ids) || body.ids.length === 0) {
      return NextResponse.json({ error: "No saved fields were selected." }, { status: 400 });
    }

    const ids = body.ids.filter((id): id is string => typeof id === "string");
    const updatedContent = await deleteSiteContentEntriesFromDb(ids);

    const token = request.cookies.get(SESSION_COOKIE)?.value;
    const user = await verifyAdminSession(token);
    await logAuditEvent({
      userId: user?.id,
      action: "SITE_CONTENT_RESET",
      entityType: "SiteContentEntry",
      metadata: { deletedCount: ids.length, ids },
      ipAddress: request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "127.0.0.1",
    });

    return NextResponse.json({ success: true, content: updatedContent });
  } catch (error) {
    console.error("Unable to reset site content in PostgreSQL", error);
    return NextResponse.json({ error: "The saved content could not be reset." }, { status: 500 });
  }
}
