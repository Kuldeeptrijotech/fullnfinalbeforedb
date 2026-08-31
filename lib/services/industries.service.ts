import prisma from "@/app/lib/db";

export type IndustryData = {
  slug: string;
  title: string;
  subtitle: string;
  shortDescription: string;
  description: string;
  heroImage: string;
  services: string[];
  benefits: string[];
};

export async function getIndustriesData(): Promise<IndustryData[]> {
  try {
    const dbIndustries = await prisma.industryDetail.findMany({
      orderBy: { sortOrder: "asc" },
    });

    return dbIndustries.map((ind) => ({
      slug: ind.slug,
      title: ind.title,
      subtitle: ind.subtitle,
      shortDescription: ind.shortDescription,
      description: ind.description,
      heroImage: ind.heroImage,
      services: ind.services,
      benefits: ind.benefits,
    }));
  } catch (error) {
    console.error("Error fetching industries from PostgreSQL:", error);
    throw error;
  }
}

export async function getIndustryBySlug(slug: string): Promise<IndustryData | null> {
  try {
    const ind = await prisma.industryDetail.findUnique({
      where: { slug },
    });

    if (!ind) return null;

    return {
      slug: ind.slug,
      title: ind.title,
      subtitle: ind.subtitle,
      shortDescription: ind.shortDescription,
      description: ind.description,
      heroImage: ind.heroImage,
      services: ind.services,
      benefits: ind.benefits,
    };
  } catch (error) {
    console.error(`Error fetching industry '${slug}' from PostgreSQL:`, error);
    return null;
  }
}

export async function getAllIndustrySlugs(): Promise<string[]> {
  try {
    const industries = await prisma.industryDetail.findMany({
      select: { slug: true },
    });
    return industries.map((i) => i.slug);
  } catch {
    return [];
  }
}
