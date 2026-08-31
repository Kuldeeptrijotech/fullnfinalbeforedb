import { NextRequest, NextResponse } from "next/server";
import { isAdminRequest, verifyAdminSession, SESSION_COOKIE } from "@/app/lib/admin-auth";
import {
  getContactSubmissions,
  getCareerSubmissions,
  updateContactSubmissionStatus,
  updateCareerSubmissionStatus,
} from "@/app/lib/services/form.service";
import { logAuditEvent } from "@/app/lib/services/audit.service";
import type { FormStatus } from "@prisma/client";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const forbidden = () => NextResponse.json({ error: "Unauthorized." }, { status: 401 });
const sameOrigin = (request: NextRequest) => !request.headers.get("origin") || request.headers.get("origin") === request.nextUrl.origin;

export async function GET(request: NextRequest) {
  if (!isAdminRequest(request)) return forbidden();

  const searchParams = request.nextUrl.searchParams;
  const type = searchParams.get("type") || "all";
  const status = (searchParams.get("status") as FormStatus) || undefined;
  const limit = Math.min(100, Math.max(1, Number(searchParams.get("limit")) || 50));
  const offset = Math.max(0, Number(searchParams.get("offset")) || 0);

  try {
    let contactData = { submissions: [] as any[], total: 0 };
    let careerData = { submissions: [] as any[], total: 0 };

    if (type === "all" || type === "contact") {
      contactData = await getContactSubmissions({ status, limit, offset });
    }
    if (type === "all" || type === "career") {
      careerData = await getCareerSubmissions({ status, limit, offset });
    }

    return NextResponse.json({
      contact: contactData,
      careers: careerData,
    });
  } catch (error) {
    console.error("Failed to fetch submissions from PostgreSQL", error);
    return NextResponse.json({ error: "Failed to retrieve submissions." }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  if (!isAdminRequest(request) || !sameOrigin(request)) return forbidden();

  try {
    const body = (await request.json()) as {
      type: "contact" | "career";
      id: string;
      status: FormStatus;
      notes?: string;
    };

    if (!body.id || !body.status || !["contact", "career"].includes(body.type)) {
      return NextResponse.json({ error: "Invalid submission update request." }, { status: 400 });
    }

    let updated;
    if (body.type === "contact") {
      updated = await updateContactSubmissionStatus(body.id, body.status, body.notes);
    } else {
      updated = await updateCareerSubmissionStatus(body.id, body.status, body.notes);
    }

    const token = request.cookies.get(SESSION_COOKIE)?.value;
    const user = await verifyAdminSession(token);
    await logAuditEvent({
      userId: user?.id,
      action: "SUBMISSION_STATUS_UPDATED",
      entityType: body.type === "contact" ? "ContactSubmission" : "CareerSubmission",
      entityId: body.id,
      metadata: { newStatus: body.status, notes: body.notes },
      ipAddress: request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "127.0.0.1",
    });

    return NextResponse.json({ success: true, submission: updated });
  } catch (error) {
    console.error("Failed to update submission status in PostgreSQL", error);
    return NextResponse.json({ error: "Failed to update submission status." }, { status: 500 });
  }
}
