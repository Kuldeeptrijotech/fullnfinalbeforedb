import { randomUUID } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { isAdminRequest } from "@/app/lib/admin-auth";
import { deleteKnowledgeEntry, readKnowledgeEntries, saveKnowledgeEntry } from "@/app/services/knowledge-base";
import { chatbotAnalytics } from "@/app/services/chatbot-analytics";
import type { KnowledgeEntry } from "@/app/types/chatbot";

const isAllowed = async (request: NextRequest) =>
  (await isAdminRequest(request)) &&
  (!request.headers.get("origin") || request.headers.get("origin") === request.nextUrl.origin);

const clean = (value: Partial<KnowledgeEntry>): KnowledgeEntry => ({
  id: typeof value.id === "string" && value.id ? value.id : randomUUID(),
  title: String(value.title || "").trim().slice(0, 150),
  category: String(value.category || "general").trim().toLowerCase().replace(/[^a-z0-9-]/g, "").slice(0, 40),
  content: String(value.content || "").trim().slice(0, 10000),
  keywords: Array.isArray(value.keywords) ? value.keywords.map(String).map((item) => item.trim()).filter(Boolean).slice(0, 30) : [],
  priority: Math.max(0, Math.min(10, Number(value.priority) || 0)),
  enabled: value.enabled !== false,
  url: typeof value.url === "string" && value.url.startsWith("/") ? value.url.slice(0, 500) : undefined,
});

export async function GET(request: NextRequest) {
  if (!(await isAdminRequest(request))) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
  return NextResponse.json({
    entries: await readKnowledgeEntries(),
    analytics: chatbotAnalytics(),
  });
}

export async function PUT(request: NextRequest) {
  if (!(await isAllowed(request))) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
  const body = (await request.json()) as Partial<KnowledgeEntry>;
  const entry = clean(body);
  if (!entry.title || !entry.content || !entry.category) {
    return NextResponse.json({ error: "Title, category, and content are required." }, { status: 400 });
  }
  if (entry.id.startsWith("blog-") || entry.id.startsWith("site-")) {
    return NextResponse.json({ error: "Generated website and blog entries must be edited at their source." }, { status: 400 });
  }
  await saveKnowledgeEntry(entry);
  return NextResponse.json({ success: true, entry });
}

export async function DELETE(request: NextRequest) {
  if (!(await isAllowed(request))) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
  const { id } = (await request.json()) as { id?: string };
  if (!id || id.startsWith("blog-") || id.startsWith("site-")) {
    return NextResponse.json({ error: "This generated entry cannot be deleted here." }, { status: 400 });
  }
  const deleted = await deleteKnowledgeEntry(id);
  return NextResponse.json({ success: deleted }, { status: deleted ? 200 : 404 });
}
