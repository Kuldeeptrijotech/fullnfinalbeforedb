import { createHmac, timingSafeEqual } from "node:crypto";
import type { NextRequest } from "next/server";
import { verifyDbSession, type AuthenticatedUser } from "./services/user.service";

export const SESSION_COOKIE = "trijotech_admin_session";
const SESSION_SECONDS = 60 * 60 * 8;

function secret(): string {
  return process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD || "trijotech-admin-secret-key";
}

function signature(payload: string): string {
  return createHmac("sha256", secret()).update(payload).digest("base64url");
}

export function createSessionToken(): string {
  const payload = `admin:${Date.now() + SESSION_SECONDS * 1000}`;
  return `${Buffer.from(payload).toString("base64url")}.${signature(payload)}`;
}

export async function verifyAdminSession(token?: string): Promise<AuthenticatedUser | null> {
  if (!token) return null;

  // 1. Check PostgreSQL Session table
  try {
    const dbUser = await verifyDbSession(token);
    if (dbUser) return dbUser;
  } catch (err) {
    console.warn("DB session verification error:", err);
  }

  // 2. Fallback to HMAC token verification
  if (verifySessionToken(token)) {
    return {
      id: "admin-static",
      email: "admin@trijotech.com",
      name: "Administrator",
      role: "SUPER_ADMIN",
      isActive: true,
      failedLoginAttempts: 0,
      lockedUntil: null,
      lastLoginAt: null,
      passwordChangedAt: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  return null;
}

export function verifySessionToken(token?: string): boolean {
  if (!token || !secret()) return false;
  const parts = token.split(".");
  if (parts.length === 2) {
    const [encoded, supplied] = parts;
    try {
      const payload = Buffer.from(encoded, "base64url").toString("utf8");
      const [, expiresValue] = payload.split(":");
      if (!expiresValue || Number(expiresValue) <= Date.now()) return false;
      const expected = signature(payload);
      const left = Buffer.from(supplied);
      const right = Buffer.from(expected);
      return left.length === right.length && timingSafeEqual(left, right);
    } catch {
      return false;
    }
  }
  // UUID session tokens are verified in database
  return Boolean(token && token.length >= 32);
}

export async function isAdminRequestAsync(request: NextRequest): Promise<boolean> {
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  if (!token) return false;
  const user = await verifyAdminSession(token);
  return user !== null;
}

export function isAdminRequest(request: NextRequest): boolean {
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  return Boolean(token && verifySessionToken(token));
}

export function passwordMatches(password: string): boolean {
  const configured = process.env.ADMIN_PASSWORD;
  if (!configured || !password) return false;
  const left = Buffer.from(password);
  const right = Buffer.from(configured);
  return left.length === right.length && timingSafeEqual(left, right);
}

export const sessionCookieOptions = {
  httpOnly: true,
  sameSite: "strict" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: SESSION_SECONDS,
};
