import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import prisma from "@/app/lib/db";
import { SESSION_COOKIE, verifyAdminSession } from "@/app/lib/admin-auth";
import { logAuditEvent } from "@/lib/services/audit.service";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const createSchema = z.object({
  name: z.string().trim().min(2, "Name must contain at least 2 characters.").max(100),
  email: z.string().trim().toLowerCase().email("Enter a valid email address.").max(254),
  password: z.string().min(12, "Password must contain at least 12 characters.").max(128)
    .regex(/[a-z]/, "Password must include a lowercase letter.")
    .regex(/[A-Z]/, "Password must include an uppercase letter.")
    .regex(/[0-9]/, "Password must include a number."),
  role: z.enum(["ADMIN", "EDITOR"]).default("ADMIN"),
});
const updateSchema = z.object({ id: z.string().uuid(), isActive: z.boolean() });
const publicUserSelect = { id: true, name: true, email: true, role: true, isActive: true, lastLoginAt: true, createdAt: true } as const;

function sameOrigin(request: NextRequest) {
  const origin = request.headers.get("origin");
  return !origin || origin === request.nextUrl.origin;
}
async function requireSuperAdmin(request: NextRequest) {
  const user = await verifyAdminSession(request.cookies.get(SESSION_COOKIE)?.value);
  return user?.role === "SUPER_ADMIN" ? user : null;
}
function ip(request: NextRequest) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "127.0.0.1";
}

export async function GET(request: NextRequest) {
  const actor = await requireSuperAdmin(request);
  if (!actor) return NextResponse.json({ error: "Super admin access is required." }, { status: 403 });
  const users = await prisma.user.findMany({ select: publicUserSelect, orderBy: [{ isActive: "desc" }, { createdAt: "desc" }] });
  return NextResponse.json({ users, currentUserId: actor.id }, { headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: NextRequest) {
  const actor = await requireSuperAdmin(request);
  if (!actor || !sameOrigin(request)) return NextResponse.json({ error: "Super admin access is required." }, { status: 403 });
  const parsed = createSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0]?.message || "Invalid user details." }, { status: 400 });
  const existing = await prisma.user.findUnique({ where: { email: parsed.data.email }, select: { id: true } });
  if (existing) return NextResponse.json({ error: "An account with this email already exists." }, { status: 409 });
  const user = await prisma.user.create({
    data: { name: parsed.data.name, email: parsed.data.email, passwordHash: await bcrypt.hash(parsed.data.password, 12), role: parsed.data.role, passwordChangedAt: new Date() },
    select: publicUserSelect,
  });
  await logAuditEvent({ userId: actor.id, action: "ADMIN_USER_CREATED", entityType: "User", entityId: user.id, metadata: { email: user.email, role: user.role }, ipAddress: ip(request) });
  return NextResponse.json({ user }, { status: 201 });
}

export async function PATCH(request: NextRequest) {
  const actor = await requireSuperAdmin(request);
  if (!actor || !sameOrigin(request)) return NextResponse.json({ error: "Super admin access is required." }, { status: 403 });
  const parsed = updateSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Invalid account update." }, { status: 400 });
  if (parsed.data.id === actor.id && !parsed.data.isActive) return NextResponse.json({ error: "You cannot deactivate your own account." }, { status: 400 });
  const target = await prisma.user.findUnique({ where: { id: parsed.data.id } });
  if (!target) return NextResponse.json({ error: "Admin account was not found." }, { status: 404 });
  if (target.role === "SUPER_ADMIN") return NextResponse.json({ error: "Super admin accounts cannot be deactivated here." }, { status: 400 });
  const user = await prisma.$transaction(async (tx) => {
    const updated = await tx.user.update({ where: { id: target.id }, data: { isActive: parsed.data.isActive }, select: publicUserSelect });
    if (!parsed.data.isActive) await tx.session.deleteMany({ where: { userId: target.id } });
    return updated;
  });
  await logAuditEvent({ userId: actor.id, action: user.isActive ? "ADMIN_USER_ACTIVATED" : "ADMIN_USER_DEACTIVATED", entityType: "User", entityId: user.id, metadata: { email: user.email }, ipAddress: ip(request) });
  return NextResponse.json({ user });
}