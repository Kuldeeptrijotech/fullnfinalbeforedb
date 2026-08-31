import bcrypt from "bcryptjs";
import { randomUUID } from "node:crypto";
import prisma from "@/app/lib/db";
import type { Role, User } from "@prisma/client";

const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_MINUTES = 15;
const SESSION_EXPIRY_HOURS = 8;

export type AuthenticatedUser = Omit<User, "passwordHash">;

export async function getAdminByEmail(email: string): Promise<User | null> {
  return prisma.user.findUnique({
    where: { email: email.toLowerCase().trim() },
  });
}

export async function getAdminById(id: string): Promise<AuthenticatedUser | null> {
  const user = await prisma.user.findUnique({
    where: { id },
  });
  if (!user) return null;
  const { passwordHash, ...safeUser } = user;
  return safeUser;
}

export async function createOrUpdateDefaultAdmin(rawPassword?: string): Promise<User> {
  const password = rawPassword || process.env.ADMIN_PASSWORD || "admin123";
  const email = "admin@trijotech.com";
  const existing = await prisma.user.findUnique({ where: { email } });
  const passwordHash = await bcrypt.hash(password, 12);

  if (existing) {
    return prisma.user.update({
      where: { id: existing.id },
      data: {
        passwordHash,
        isActive: true,
        failedLoginAttempts: 0,
        lockedUntil: null,
      },
    });
  }

  return prisma.user.create({
    data: {
      email,
      name: "Trijotech Admin",
      role: "SUPER_ADMIN" as Role,
      passwordHash,
      isActive: true,
    },
  });
}

export type LoginResult =
  | { success: true; user: AuthenticatedUser; sessionToken: string }
  | { success: false; error: string; status: number };

export async function authenticateAdmin(
  passwordInput: string,
  ipAddress?: string,
  userAgent?: string
): Promise<LoginResult> {
  const email = "admin@trijotech.com";
  let user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    // If no admin exists, bootstrap with current ADMIN_PASSWORD
    user = await createOrUpdateDefaultAdmin();
  }

  if (!user.isActive) {
    return { success: false, error: "Account is disabled.", status: 403 };
  }

  const now = new Date();
  if (user.lockedUntil && user.lockedUntil > now) {
    const minutesLeft = Math.ceil((user.lockedUntil.getTime() - now.getTime()) / (60 * 1000));
    return {
      success: false,
      error: `Too many failed attempts. Try again in ${minutesLeft} minute${minutesLeft > 1 ? "s" : ""}.`,
      status: 429,
    };
  }

  const matches = await bcrypt.compare(passwordInput, user.passwordHash);

  if (!matches) {
    const nextAttempts = user.failedLoginAttempts + 1;
    const isLocked = nextAttempts >= MAX_FAILED_ATTEMPTS;
    const lockedUntil = isLocked ? new Date(now.getTime() + LOCKOUT_MINUTES * 60 * 1000) : null;

    await prisma.user.update({
      where: { id: user.id },
      data: {
        failedLoginAttempts: isLocked ? 0 : nextAttempts,
        lockedUntil,
      },
    });

    if (isLocked) {
      return {
        success: false,
        error: `Too many failed attempts. Your account has been temporarily locked for ${LOCKOUT_MINUTES} minutes.`,
        status: 429,
      };
    }

    return {
      success: false,
      error: "Invalid credentials.",
      status: 401,
    };
  }

  // Password matched -> Reset failed counter, generate session
  const sessionToken = `${randomUUID()}-${randomUUID()}`;
  const expiresAt = new Date(now.getTime() + SESSION_EXPIRY_HOURS * 60 * 60 * 1000);

  await prisma.$transaction([
    prisma.user.update({
      where: { id: user.id },
      data: {
        failedLoginAttempts: 0,
        lockedUntil: null,
        lastLoginAt: now,
      },
    }),
    prisma.session.create({
      data: {
        sessionToken,
        userId: user.id,
        expiresAt,
        ipAddress: ipAddress || null,
        userAgent: userAgent || null,
      },
    }),
  ]);

  const { passwordHash, ...safeUser } = user;
  return { success: true, user: safeUser, sessionToken };
}

export async function verifyDbSession(sessionToken?: string): Promise<AuthenticatedUser | null> {
  if (!sessionToken) return null;

  const session = await prisma.session.findUnique({
    where: { sessionToken },
    include: { user: true },
  });

  if (!session) return null;

  const now = new Date();
  if (session.expiresAt <= now || !session.user.isActive) {
    // Delete expired session
    await prisma.session.delete({ where: { id: session.id } }).catch(() => undefined);
    return null;
  }

  const { passwordHash, ...safeUser } = session.user;
  return safeUser;
}

export async function invalidateSession(sessionToken?: string): Promise<void> {
  if (!sessionToken) return;
  await prisma.session.deleteMany({
    where: { sessionToken },
  }).catch(() => undefined);
}

export async function invalidateAllUserSessions(userId: string): Promise<void> {
  await prisma.session.deleteMany({
    where: { userId },
  });
}
