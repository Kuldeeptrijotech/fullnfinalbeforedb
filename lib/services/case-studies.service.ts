import prisma from "@/app/lib/db";

export type CaseStudyData = {
  slug: string;
  title: string;
  client: string;
  industry: string;
  challenge: string;
  solution: string;
  outcome: string;
  metrics: string[];
  heroImage: string;
};

export async function getCaseStudiesData(): Promise<CaseStudyData[]> {
  try {
    const studies = await prisma.caseStudy.findMany({
      where: { isPublished: true },
      orderBy: { sortOrder: "asc" },
    });

    return studies.map((cs) => ({
      slug: cs.slug,
      title: cs.title,
      client: cs.client,
      industry: cs.industry,
      challenge: cs.challenge,
      solution: cs.solution,
      outcome: cs.outcome,
      metrics: cs.metrics,
      heroImage: cs.heroImage,
    }));
  } catch (error) {
    console.error("Error fetching case studies from PostgreSQL:", error);
    throw error;
  }
}
