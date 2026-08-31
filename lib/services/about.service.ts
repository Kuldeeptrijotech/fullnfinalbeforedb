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

export type AboutPillarData = {
  icon: string;
  title: string;
  description: string;
};

export type AboutMetricData = {
  value: string;
  label: string;
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
  pillars: AboutPillarData[];
  metrics: AboutMetricData[];
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

    const defaultPillars: AboutPillarData[] = [
      {
        icon: "Layers",
        title: "Full-Stack SAP Architecture",
        description: "Deep expertise spanning SAP S/4HANA, BTP, SAC, PaPM, and BW/4HANA integration.",
      },
      {
        icon: "Network",
        title: "Connected Data & Governance",
        description: "Unifying transactional systems and analytical models for trusted decision-making.",
      },
      {
        icon: "ShieldCheck",
        title: "Accountable Delivery Ownership",
        description: "Dedicated consultant teams staying close to outcomes from strategy to run-phase.",
      },
      {
        icon: "Users",
        title: "True Collaborative Partnership",
        description: "Transparent knowledge transfer and long-term client enablement at every milestone.",
      },
    ];

    const defaultMetrics: AboutMetricData[] = [
      { value: "9+", label: "Years Experience" },
      { value: "100%", label: "Delivery Ownership" },
      { value: "Global", label: "Enterprise Reach" },
    ];

    return {
      heroTitle: config?.heroTitle || "Technology shaped around real outcomes",
      heroSubtitle:
        config?.heroSubtitle ||
        "We help enterprises modernize SAP landscapes, integrate critical data, and turn technology investments into sustainable business advantage.",
      heroImage: config?.heroImage || "/assets/about/trijotech-team-collaboration-blue.png",
      whoWeAreTitle: config?.whoWeAreTitle || "Deep expertise, close collaboration",
      whoWeAreDescription1:
        config?.whoWeAreDescription1 ||
        "Trijotech was founded on a simple principle: enterprise technology should create measurable business outcomes, not unnecessary complexity.",
      whoWeAreDescription2:
        config?.whoWeAreDescription2 ||
        "We are practitioners, architects, and problem solvers who take ownership of critical systems — from architecture design and integration to ongoing AMS support.",
      expertiseNote: config?.expertiseNote || "Expertise shaped around measurable business value",
      purposes: purposes.map((p) => ({ label: p.label, title: p.title, text: p.text })),
      values: values.map((v) => ({ number: v.number, title: v.title, description: v.description })),
      leadership: leadership.map((l) => ({ name: l.name, role: l.role, image: l.image, description: l.description })),
      pillars: (config?.pillars as unknown as AboutPillarData[]) || defaultPillars,
      metrics: (config?.metrics as unknown as AboutMetricData[]) || defaultMetrics,
    };
  } catch (error) {
    console.error("Error fetching about us page data from PostgreSQL:", error);
    throw error;
  }
}
