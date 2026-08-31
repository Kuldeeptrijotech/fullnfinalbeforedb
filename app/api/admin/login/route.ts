import { NextResponse } from "next/server";
import { SESSION_COOKIE, sessionCookieOptions } from "@/app/lib/admin-auth";
import { authenticateAdmin } from "@/app/lib/services/user.service";
import { logAuditEvent } from "@/app/lib/services/audit.service";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const address = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "127.0.0.1";
  const userAgent = request.headers.get("user-agent") || "unknown";

  let password = "";
  try {
    const body = (await request.json()) as { password?: unknown };
    password = typeof body.password === "string" ? body.password : "";
  } catch {
    return NextResponse.json({ error: "Invalid request payload." }, { status: 400 });
  }

  if (!password.trim()) {
    return NextResponse.json({ error: "Password is required." }, { status: 400 });
  }

  const result = await authenticateAdmin(password, address, userAgent);

  if (!result.success) {
    await logAuditEvent({
      action: "ADMIN_LOGIN_FAILED",
      entityType: "User",
      metadata: { reason: result.error },
      ipAddress: address,
    });
    return NextResponse.json({ error: result.error }, { status: result.status });
  }

  await logAuditEvent({
    userId: result.user.id,
    action: "ADMIN_LOGIN_SUCCESS",
    entityType: "User",
    entityId: result.user.id,
    metadata: { email: result.user.email, role: result.user.role },
    ipAddress: address,
  });

  const response = NextResponse.json({
    success: true,
    user: {
      id: result.user.id,
      email: result.user.email,
      name: result.user.name,
      role: result.user.role,
    },
  });

  response.cookies.set(SESSION_COOKIE, result.sessionToken, sessionCookieOptions);
  return response;
}
