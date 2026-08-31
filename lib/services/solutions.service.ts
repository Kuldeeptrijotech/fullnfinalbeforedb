import prisma from "@/app/lib/db";

export type SolutionFeature = {
  title: string;
  description: string;
};

export type SolutionSection = {
  title: string;
  description?: string;
  items: SolutionFeature[];
};

export type SolutionDetailData = {
  title: string;
  slug: string;
  href: string;
  description: string;
  image: string;
  imageAlt: string;
  showOnHome: boolean;
  highlights: string[];
  features: string[];
  subtitle: string;
  shortDescription: string;
  heroImage: string;
  cardImage: string;
  eyebrow: string;
  overviewTitle: string;
  overview: string;
  sections: SolutionSection[];
  benefits: string[];
  outcomesTitle: string;
  featureCards: SolutionFeature[];
};

export async function getSolutionsPageData(): Promise<SolutionDetailData[]> {
  try {
    const dbSolutions = await prisma.solutionDetail.findMany({
      orderBy: { sortOrder: "asc" },
    });

    return dbSolutions.map((s) => ({
      title: s.title,
      slug: s.slug,
      href: `/solutions/${s.slug}`,
      description: s.description,
      image: s.image,
      imageAlt: s.imageAlt,
      showOnHome: s.showOnHome,
      highlights: s.highlights,
      features: s.features,
      subtitle: s.subtitle,
      shortDescription: s.shortDescription,
      heroImage: s.heroImage,
      cardImage: s.cardImage,
      eyebrow: s.eyebrow,
      overviewTitle: s.overviewTitle,
      overview: s.overview,
      sections: (s.sections as unknown as SolutionSection[]) || [],
      benefits: s.benefits,
      outcomesTitle: s.outcomesTitle,
      featureCards: (s.featureCards as unknown as SolutionFeature[]) || [],
    }));
  } catch (error) {
    console.error("Error fetching solutions from PostgreSQL:", error);
    throw error;
  }
}

export async function getSolutionBySlug(slug: string): Promise<SolutionDetailData | null> {
  try {
    const s = await prisma.solutionDetail.findUnique({
      where: { slug },
    });

    if (!s) return null;

    return {
      title: s.title,
      slug: s.slug,
      href: `/solutions/${s.slug}`,
      description: s.description,
      image: s.image,
      imageAlt: s.imageAlt,
      showOnHome: s.showOnHome,
      highlights: s.highlights,
      features: s.features,
      subtitle: s.subtitle,
      shortDescription: s.shortDescription,
      heroImage: s.heroImage,
      cardImage: s.cardImage,
      eyebrow: s.eyebrow,
      overviewTitle: s.overviewTitle,
      overview: s.overview,
      sections: (s.sections as unknown as SolutionSection[]) || [],
      benefits: s.benefits,
      outcomesTitle: s.outcomesTitle,
      featureCards: (s.featureCards as unknown as SolutionFeature[]) || [],
    };
  } catch (error) {
    console.error(`Error fetching solution '${slug}' from PostgreSQL:`, error);
    return null;
  }
}

export async function getAllSolutionSlugs(): Promise<string[]> {
  try {
    const solutions = await prisma.solutionDetail.findMany({
      select: { slug: true },
    });
    return solutions.map((s) => s.slug);
  } catch {
    return [];
  }
}
