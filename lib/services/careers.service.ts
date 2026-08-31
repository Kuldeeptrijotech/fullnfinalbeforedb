import prisma from "@/app/lib/db";

export type CareerBenefit = {
  title: string;
  description: string;
};

export type CareerHighlight = {
  icon: string;
  title: string;
  text: string;
};

export type CareerPerk = {
  icon: string;
  title: string;
  desc: string;
  badge: string;
  tone: string;
};

export type CareerMetric = {
  value: string;
  label: string;
};

export type CareerCulturePillarData = {
  title: string;
  description: string;
  icon: string;
  image: string;
  imageAlt: string;
  tags: string[];
};

export type CareerPageData = {
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  cultureTitle: string;
  cultureSubtitle: string;
  benefits: CareerBenefit[];
  highlights: CareerHighlight[];
  perks: CareerPerk[];
  metrics: CareerMetric[];
  pillars: CareerCulturePillarData[];
};

export async function getCareerPageData(): Promise<CareerPageData> {
  try {
    const [config, pillars] = await Promise.all([
      prisma.careerPageConfig.findUnique({
        where: { id: "default" },
      }),
      prisma.careerCulturePillar.findMany({
        orderBy: { sortOrder: "asc" },
      }),
    ]);

    const defaultHighlights: CareerHighlight[] = [
      {
        icon: "BriefcaseBusiness",
        title: "Meaningful work",
        text: "Solve real enterprise challenges across SAP, data, analytics, and automation.",
      },
      {
        icon: "Users",
        title: "Grow together",
        text: "Learn alongside experienced consultants in a collaborative, ownership-driven team.",
      },
      {
        icon: "Mail",
        title: "Start a conversation",
        text: "Share your experience with us and we will contact you when there is a strong fit.",
      },
    ];

    const defaultPerks: CareerPerk[] = [
      {
        icon: "GraduationCap",
        title: "SAP Certifications & Learning",
        desc: "Sponsored certifications across S/4HANA, BTP, PaPM, SAC & AI.",
        badge: "Growth",
        tone: "blue",
      },
      {
        icon: "Users",
        title: "Direct Leadership Mentorship",
        desc: "Work closely with seasoned architects and directors on enterprise programs.",
        badge: "Mentorship",
        tone: "blue",
      },
      {
        icon: "TrendingUp",
        title: "Merit-Driven Progression",
        desc: "Clear career advancement tied to delivery impact, ownership, and skill growth.",
        badge: "Fast-Track",
        tone: "blue",
      },
      {
        icon: "Compass",
        title: "Modern Hybrid Workplace",
        desc: "Flexible, outcome-oriented work model built for balance and high performance.",
        badge: "Flexibility",
        tone: "blue",
      },
    ];

    const defaultMetrics: CareerMetric[] = [
      { value: "100%", label: "Project Ownership" },
      { value: "Global", label: "Enterprise Clients" },
      { value: "5/5", label: "Satisfaction" },
    ];

    return {
      heroTitle: config?.heroTitle || "Build what matters in enterprise technology",
      heroSubtitle:
        config?.heroSubtitle ||
        "Join a team of SAP specialists, data engineers, and problem-solvers who deliver technology that creates lasting value for global enterprises.",
      heroImage: config?.heroImage || "/assets/heroes/careers-generated-v2.png",
      cultureTitle: config?.cultureTitle || "Life at Trijotech",
      cultureSubtitle: config?.cultureSubtitle || "A workplace shaped by autonomy, continuous learning, and pride in delivery.",
      benefits: (config?.benefits as unknown as CareerBenefit[]) || [],
      highlights: (config?.highlights as unknown as CareerHighlight[]) || defaultHighlights,
      perks: (config?.perks as unknown as CareerPerk[]) || defaultPerks,
      metrics: (config?.metrics as unknown as CareerMetric[]) || defaultMetrics,
      pillars: pillars.map((p) => ({
        title: p.title,
        description: p.description,
        icon: p.icon,
        image: p.image,
        imageAlt: p.imageAlt,
        tags: p.tags,
      })),
    };
  } catch (error) {
    console.error("Error fetching careers page data from PostgreSQL:", error);
    throw error;
  }
}
