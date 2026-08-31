import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE, sessionCookieOptions } from "@/app/lib/admin-auth";
import { invalidateSession, verifyDbSession } from "@/lib/services/user.service";
import { logAuditEvent } from "@/lib/services/audit.service";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  const address = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "127.0.0.1";

  if (token) {
    const user = await verifyDbSession(token);
    if (user) {
      await logAuditEvent({
        userId: user.id,
        action: "ADMIN_LOGOUT",
        entityType: "User",
        entityId: user.id,
        ipAddress: address,
      });
    }
    await invalidateSession(token);
  }

  const response = NextResponse.json({ success: true });
  response.cookies.set(SESSION_COOKIE, "", { ...sessionCookieOptions, maxAge: 0 });
  return response;
}
