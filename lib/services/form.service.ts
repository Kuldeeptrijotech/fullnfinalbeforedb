import prisma from "@/app/lib/db";
import type { FormStatus, ContactSubmission, CareerSubmission } from "@prisma/client";

export async function createContactSubmission({
  name,
  email,
  phone,
  company,
  inquiryType,
  subject,
  message,
  ipAddress,
}: {
  name: string;
  email: string;
  phone: string;
  company?: string;
  inquiryType?: string;
  subject: string;
  message: string;
  ipAddress?: string;
}): Promise<ContactSubmission> {
  return prisma.contactSubmission.create({
    data: {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      company: company?.trim() || null,
      inquiryType: inquiryType?.trim() || null,
      subject: subject.trim(),
      message: message.trim(),
      status: "NEW",
      ipAddress: ipAddress || null,
    },
  });
}

export async function createCareerSubmission({
  name,
  email,
  phone,
  position,
  experience,
  company,
  message,
  resumeName,
  resumeMime,
  resumeSize,
  resumeBuffer,
  ipAddress,
}: {
  name: string;
  email: string;
  phone: string;
  position: string;
  experience: string;
  company?: string;
  message: string;
  resumeName: string;
  resumeMime: string;
  resumeSize: number;
  resumeBuffer?: Buffer;
  ipAddress?: string;
}): Promise<CareerSubmission> {
  return prisma.careerSubmission.create({
    data: {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      position: position.trim(),
      experience: experience.trim(),
      company: company?.trim() || null,
      message: message.trim(),
      resumeName: resumeName.trim(),
      resumeMime: resumeMime.trim(),
      resumeSize,
      resumeData: resumeBuffer ? Buffer.from(resumeBuffer) : null,
      status: "NEW",
      ipAddress: ipAddress || null,
    },
  });
}

export async function getContactSubmissions({
  status,
  limit = 50,
  offset = 0,
}: {
  status?: FormStatus;
  limit?: number;
  offset?: number;
} = {}) {
  const where = status ? { status } : {};
  const [submissions, total] = await Promise.all([
    prisma.contactSubmission.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: limit,
      skip: offset,
    }),
    prisma.contactSubmission.count({ where }),
  ]);
  return { submissions, total };
}

export async function getCareerSubmissions({
  status,
  limit = 50,
  offset = 0,
}: {
  status?: FormStatus;
  limit?: number;
  offset?: number;
} = {}) {
  const where = status ? { status } : {};
  const [submissions, total] = await Promise.all([
    prisma.careerSubmission.findMany({
      where,
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        position: true,
        experience: true,
        company: true,
        message: true,
        resumeName: true,
        resumeMime: true,
        resumeSize: true,
        resumeUrl: true,
        status: true,
        ipAddress: true,
        notes: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: { createdAt: "desc" },
      take: limit,
      skip: offset,
    }),
    prisma.careerSubmission.count({ where }),
  ]);
  return { submissions, total };
}

export async function updateContactSubmissionStatus(
  id: string,
  status: FormStatus,
  notes?: string
) {
  return prisma.contactSubmission.update({
    where: { id },
    data: {
      status,
      notes: notes !== undefined ? notes : undefined,
    },
  });
}

export async function updateCareerSubmissionStatus(
  id: string,
  status: FormStatus,
  notes?: string
) {
  return prisma.careerSubmission.update({
    where: { id },
    data: {
      status,
      notes: notes !== undefined ? notes : undefined,
    },
  });
}

export async function getCareerResumeBuffer(id: string) {
  const submission = await prisma.careerSubmission.findUnique({
    where: { id },
    select: {
      id: true,
      resumeName: true,
      resumeMime: true,
      resumeData: true,
    },
  });

  if (!submission || !submission.resumeData) return null;
  return {
    filename: submission.resumeName,
    mimeType: submission.resumeMime,
    buffer: Buffer.from(submission.resumeData),
  };
}
