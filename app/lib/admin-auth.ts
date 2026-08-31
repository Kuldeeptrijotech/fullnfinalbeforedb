import type { NextRequest } from "next/server";
import { verifyDbSession, type AuthenticatedUser } from "@/lib/services/user.service";

export const SESSION_COOKIE = "trijotech_admin_session";
const SESSION_SECONDS = 60 * 60 * 8;

export async function verifyAdminSession(token?: string): Promise<AuthenticatedUser | null> {
  if (!token) return null;
  return verifyDbSession(token);
}

export function verifySessionToken(token?: string): boolean {
  return Boolean(token && token.length >= 32);
}

export async function isAdminRequest(request: NextRequest): Promise<boolean> {
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  if (!token) return false;
  const user = await verifyDbSession(token);
  return user !== null && user.isActive;
}

export async function isAdminRequestAsync(request: NextRequest): Promise<boolean> {
  return isAdminRequest(request);
}

export const sessionCookieOptions = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: SESSION_SECONDS,
};
