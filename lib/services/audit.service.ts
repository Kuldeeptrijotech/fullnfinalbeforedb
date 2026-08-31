import prisma from "@/app/lib/db";
import { Prisma } from "@prisma/client";

export async function logAuditEvent({
  userId,
  action,
  entityType,
  entityId,
  metadata,
  ipAddress,
}: {
  userId?: string | null;
  action: string;
  entityType?: string;
  entityId?: string;
  metadata?: Prisma.InputJsonValue;
  ipAddress?: string | null;
}) {
  try {
    return await prisma.auditLog.create({
      data: {
        userId: userId || null,
        action,
        entityType: entityType || null,
        entityId: entityId || null,
        metadata: metadata ?? Prisma.JsonNull,
        ipAddress: ipAddress || null,
      },
    });
  } catch (error) {
    console.error("Failed to write audit log:", error);
    return null;
  }
}

export async function getRecentAuditLogs(limit = 50) {
  return prisma.auditLog.findMany({
    take: limit,
    orderBy: { createdAt: "desc" },
    include: {
      user: {
        select: { id: true, name: true, email: true, role: true },
      },
    },
  });
}
