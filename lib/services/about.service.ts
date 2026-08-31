import prisma from "@/app/lib/db";

export type AboutPurposeData = {
  label: string;
  title: string;
  text: string;
};

export type AboutValueData = {
  number: string;
  title: string;
  description: string;
};

export type LeadershipMemberData = {
  name: string;
  role: string;
  image: string;
  description: string;
};

export type AboutUsPageData = {
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  whoWeAreTitle: string;
  whoWeAreDescription1: string;
  whoWeAreDescription2: string;
  expertiseNote: string;
  purposes: AboutPurposeData[];
  values: AboutValueData[];
  leadership: LeadershipMemberData[];
};

export async function getAboutUsPageData(): Promise<AboutUsPageData> {
  try {
    const [config, purposes, values, leadership] = await Promise.all([
      prisma.aboutUsPageConfig.findUnique({
        where: { id: "default" },
      }),
      prisma.aboutUsPurpose.findMany({
        orderBy: { sortOrder: "asc" },
      }),
      prisma.aboutUsValue.findMany({
        orderBy: { sortOrder: "asc" },
      }),
      prisma.leadershipMember.findMany({
        orderBy: { sortOrder: "asc" },
      }),
    ]);

    return {
      heroTitle: config?.heroTitle || "Technology shaped around real outcomes",
      heroSubtitle:
        config?.heroSubtitle ||
        "We help enterprises modernize SAP landscapes, integrate critical data, and turn technology investments into sustainable business advantage.",
      heroImage: config?.heroImage || "/assets/about/trijotech-team-collaboration-blue.png",
      whoWeAreTitle: config?.whoWeAreTitle || "Deep expertise, close collaboration",
      whoWeAreDescription1:
        config?.whoWeAreDescription1 ||
        "Trijotech is a technology consulting company focused on SAP, enterprise data, analytics, integration, and intelligent automation.",
      whoWeAreDescription2:
        config?.whoWeAreDescription2 ||
        "Our consultants bring global experience and a collaborative mindset to every engagement.",
      expertiseNote: config?.expertiseNote || "Expertise shaped around measurable business value",
      purposes: purposes.map((p) => ({ label: p.label, title: p.title, text: p.text })),
      values: values.map((v) => ({ number: v.number, title: v.title, description: v.description })),
      leadership: leadership.map((l) => ({ name: l.name, role: l.role, image: l.image, description: l.description })),
    };
  } catch (error) {
    console.error("Error fetching about us page data from PostgreSQL:", error);
    throw error;
  }
}
