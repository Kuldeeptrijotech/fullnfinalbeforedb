import { randomUUID, createHash } from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";
import { NextRequest, NextResponse } from "next/server";
import { isAdminRequest, verifyAdminSession, SESSION_COOKIE } from "@/app/lib/admin-auth";
import prisma from "@/app/lib/db";
import { logAuditEvent } from "@/app/lib/services/audit.service";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
const MAX_ANIMATION_BYTES = 25 * 1024 * 1024;
const allowedTypes = new Map([
  ["image/jpeg", "jpg"],
  ["image/png", "png"],
  ["image/webp", "webp"],
  ["image/svg+xml", "svg"],
  ["video/mp4", "mp4"],
  ["video/webm", "webm"],
  ["image/gif", "gif"],
]);

function forbidden() {
  return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
}

function sameOrigin(request: NextRequest) {
  const origin = request.headers.get("origin");
  return !origin || origin === request.nextUrl.origin;
}

function validSignature(buffer: Buffer, extension: string) {
  if (extension === "jpg") return buffer.length > 3 && buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff;
  if (extension === "png") return buffer.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]));
  if (extension === "webp") return buffer.subarray(0, 4).toString() === "RIFF" && buffer.subarray(8, 12).toString() === "WEBP";
  if (extension === "mp4") return buffer.length > 12 && buffer.subarray(4, 8).toString() === "ftyp";
  if (extension === "webm") return buffer.length > 4 && buffer.subarray(0, 4).equals(Buffer.from([0x1a, 0x45, 0xdf, 0xa3]));
  if (extension === "gif") return buffer.subarray(0, 6).toString() === "GIF87a" || buffer.subarray(0, 6).toString() === "GIF89a";
  if (extension === "svg") {
    const source = buffer.toString("utf8").replace(/^\uFEFF/, "");
    return /<svg[\s>]/i.test(source) && !/<(?:script|iframe|object|embed|foreignObject)\b|\bon\w+\s*=|javascript:/i.test(source);
  }
  return false;
}

export async function POST(request: NextRequest) {
  if (!isAdminRequest(request) || !sameOrigin(request)) return forbidden();
  try {
    const form = await request.formData();
    const animationUpload = form.get("animation");
    const file = animationUpload instanceof File ? animationUpload : form.get("image");
    const isAnimation = animationUpload instanceof File;
    if (!(file instanceof File)) return NextResponse.json({ error: "Choose a media file to upload." }, { status: 400 });
    const maxBytes = isAnimation ? MAX_ANIMATION_BYTES : MAX_IMAGE_BYTES;
    if (!file.size || file.size > maxBytes) return NextResponse.json({ error: isAnimation ? "Animation must be smaller than 25 MB." : "Image must be smaller than 5 MB." }, { status: 400 });

    const extension = allowedTypes.get(file.type.toLowerCase());
    if (!extension || (isAnimation && !["mp4", "webm", "gif"].includes(extension)) || (!isAnimation && ["mp4", "webm", "gif"].includes(extension))) return NextResponse.json({ error: isAnimation ? "Use an MP4, WebM, or GIF animation." : "Use a JPG, JPEG, PNG, SVG, or WebP image." }, { status: 400 });
    const buffer = Buffer.from(await file.arrayBuffer());
    if (!validSignature(buffer, extension)) return NextResponse.json({ error: "The selected file is not valid or safe." }, { status: 400 });

    const originalBase = path.basename(file.name, path.extname(file.name)).replace(/[^a-zA-Z0-9_-]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 60) || "image";
    const filename = `${originalBase}-${Date.now()}-${randomUUID().slice(0, 8)}.${extension}`;
    const uploadDirectory = path.join(process.cwd(), "public", "assets", "uploads");
    await fs.mkdir(uploadDirectory, { recursive: true });
    await fs.writeFile(path.join(uploadDirectory, filename), buffer, { flag: "wx" });

    const publicUrl = `/assets/uploads/${filename}`;
    const checksum = createHash("sha256").update(buffer).digest("hex");

    const token = request.cookies.get(SESSION_COOKIE)?.value;
    const user = await verifyAdminSession(token);

    // Persist MediaAsset record with binary data in PostgreSQL
    const mediaAsset = await prisma.mediaAsset.create({
      data: {
        fileName: filename,
        originalName: file.name,
        mimeType: file.type,
        fileSize: file.size,
        storageType: "DATABASE_BLOB",
        storageKey: publicUrl.replace(/^\//, ""),
        publicUrl,
        data: buffer,
        checksum,
        createdBy: user?.id || null,
      },
    });

    await logAuditEvent({
      userId: user?.id,
      action: "MEDIA_UPLOADED",
      entityType: "MediaAsset",
      entityId: mediaAsset.id,
      metadata: { filename, publicUrl, size: file.size, mimeType: file.type },
      ipAddress: request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "127.0.0.1",
    });

    return NextResponse.json({ success: true, path: publicUrl, filename, assetId: mediaAsset.id });
  } catch (error) {
    console.error("Unable to upload image", error);
    return NextResponse.json({ error: "The image could not be uploaded. Please try again." }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  if (!isAdminRequest(request) || !sameOrigin(request)) return forbidden();
  try {
    const body = (await request.json()) as { path?: string };
    if (typeof body.path !== "string" || !body.path.startsWith("/assets/uploads/")) {
      return NextResponse.json({ error: "Invalid upload path." }, { status: 400 });
    }
    const filename = path.basename(body.path);
    const target = path.join(process.cwd(), "public", "assets", "uploads", filename);
    await fs.unlink(target).catch((error: NodeJS.ErrnoException) => {
      if (error.code !== "ENOENT") throw error;
    });

    // Mark as deleted in PostgreSQL
    await prisma.mediaAsset.updateMany({
      where: { publicUrl: body.path },
      data: { deletedAt: new Date() },
    });

    const token = request.cookies.get(SESSION_COOKIE)?.value;
    const user = await verifyAdminSession(token);
    await logAuditEvent({
      userId: user?.id,
      action: "MEDIA_DELETED",
      entityType: "MediaAsset",
      metadata: { path: body.path },
      ipAddress: request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "127.0.0.1",
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Unable to discard image", error);
    return NextResponse.json({ error: "The staged image could not be removed." }, { status: 500 });
  }
}
