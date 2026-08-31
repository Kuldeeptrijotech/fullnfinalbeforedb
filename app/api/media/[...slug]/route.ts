import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  try {
    const { slug } = await params;
    const requestedPath = slug.join("/");
    const normalizedKey = requestedPath.startsWith("assets/")
      ? requestedPath
      : `assets/${requestedPath}`;
    const publicUrl = `/${normalizedKey}`;

    const asset = await prisma.mediaAsset.findFirst({
      where: {
        OR: [
          { storageKey: normalizedKey },
          { publicUrl: publicUrl },
          { fileName: slug[slug.length - 1] },
        ],
        deletedAt: null,
      },
    });

    if (!asset || !asset.data) {
      return new NextResponse("Image not found in database", { status: 404 });
    }

    return new NextResponse(asset.data, {
      status: 200,
      headers: {
        "Content-Type": asset.mimeType || "image/png",
        "Content-Length": asset.fileSize.toString(),
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error("Error streaming image from PostgreSQL database:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
