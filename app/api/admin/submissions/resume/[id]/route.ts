import { NextRequest, NextResponse } from "next/server";
import { isAdminRequest } from "@/app/lib/admin-auth";
import { getCareerResumeBuffer } from "@/app/lib/services/form.service";

export const runtime = "nodejs";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const { id } = await params;
  const resume = await getCareerResumeBuffer(id);

  if (!resume) {
    return NextResponse.json({ error: "Resume file not found." }, { status: 404 });
  }

  const safeFilename = encodeURIComponent(resume.filename);

  return new NextResponse(resume.buffer, {
    status: 200,
    headers: {
      "Content-Type": resume.mimeType || "application/pdf",
      "Content-Disposition": `attachment; filename="${safeFilename}"; filename*=UTF-8''${safeFilename}`,
      "Cache-Control": "private, no-cache, no-store, must-revalidate",
    },
  });
}
