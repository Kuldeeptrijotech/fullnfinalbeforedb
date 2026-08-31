import prisma from "@/app/lib/db";

export type InsightCardData = {
  title: string;
  href: string;
  image: string;
  imageAlt: string;
  description: string;
  cta: string;
  icon: string;
  tone: "green" | "mix" | "amber";
};

export type InsightsPageData = {
  heroTitle: string;
  heroSubtitle: string;
  cards: InsightCardData[];
};

export async function getInsightsPageData(): Promise<InsightsPageData> {
  try {
    const config = await prisma.homepageSectionConfig.findUnique({
      where: { sectionKey: "insights" },
    });

    const defaultCards: InsightCardData[] = [
      {
        title: "Blogs",
        href: "/blogs",
        image: "/assets/heroes/blogs-blue.png",
        imageAlt: "Trijotech SAP articles and insights",
        description:
          "Read practical perspectives on SAP, enterprise technology, analytics, planning, integration, and digital transformation.",
        cta: "Explore Blogs",
        icon: "BookOpen",
        tone: "green",
      },
      {
        title: "Case Studies",
        href: "/case-studies",
        image: "/assets/case-studies/financial-analysis-team.png",
        imageAlt: "Business team reviewing financial analysis and performance reports",
        description:
          "See real project challenges, solution approaches, and outcomes across planning, consolidation, analytics, and profitability.",
        cta: "Explore Case Studies",
        icon: "FileText",
        tone: "mix",
      },
      {
        title: "Videos",
        href: "/videos",
        image: "/assets/heroes/videos-camera-hero.png",
        imageAlt: "Trijotech SAP video library",
        description:
          "Watch explainers, service overviews, and expert perspectives that make complex SAP and business topics easier to understand.",
        cta: "Explore Videos",
        icon: "Clapperboard",
        tone: "amber",
      },
    ];

    const customCards = (config?.customData as any)?.cards as InsightCardData[] | undefined;
    const cards = customCards || defaultCards;

    return {
      heroTitle: config?.title || "Practical perspectives on SAP & enterprise growth",
      heroSubtitle:
        config?.description ||
        "Explore blogs, case studies, and videos covering SAP transformation, cloud architecture, financial planning, integration, and data-driven execution.",
      cards,
    };
  } catch (error) {
    console.error("Error fetching insights page data from PostgreSQL:", error);
    throw error;
  }
}
