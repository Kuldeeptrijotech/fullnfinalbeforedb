import prisma from "@/app/lib/db";

export type CareerBenefit = {
  title: string;
  description: string;
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

    return {
      heroTitle: config?.heroTitle || "Build what matters in enterprise technology",
      heroSubtitle:
        config?.heroSubtitle ||
        "Join a team of SAP specialists, data engineers, and problem-solvers who deliver technology that creates lasting value for global enterprises.",
      heroImage: config?.heroImage || "/assets/heroes/careers-generated-v2.png",
      cultureTitle: config?.cultureTitle || "Life at Trijotech",
      cultureSubtitle: config?.cultureSubtitle || "A workplace shaped by autonomy, continuous learning, and pride in delivery.",
      benefits: (config?.benefits as unknown as CareerBenefit[]) || [],
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
