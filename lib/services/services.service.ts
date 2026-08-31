import prisma from "@/app/lib/db";

export type ServiceBannerItemData = {
  number: string;
  title: string;
  slug: string;
  rowId: string;
  description: string;
  image: string;
  imageAlt: string;
  enables: string[];
};

export type ServiceDetailData = {
  slug: string;
  title: string;
  subtitle: string;
  number: string;
  description: string;
  heroImage: string;
  bannerImage: string;
  enables: string[];
  deliverables: string[];
  benefits: string[];
  tools: string[];
  metaData?: Record<string, any>;
};

export type ServicesPageData = {
  hero: {
    title: string;
    description: string;
    heroImage: string;
  };
  services: ServiceBannerItemData[];
};

export async function getServicesPageData(): Promise<ServicesPageData> {
  try {
    const details = await prisma.serviceDetail.findMany({
      where: { isPublished: true },
      orderBy: { sortOrder: "asc" },
    });

    const services: ServiceBannerItemData[] = details.map((d) => ({
      number: d.number,
      title: d.title,
      slug: d.slug,
      rowId: `srv-${d.slug.replace(/[^a-zA-Z0-9_-]/g, "")}`,
      description: d.description,
      image: d.bannerImage || "/assets/services/service_consulting_transparent.png",
      imageAlt: `${d.title} architecture and visualizer`,
      enables: d.enables,
    }));

    return {
      hero: {
        title: "SAP solutions designed to transform your business",
        description:
          "Trijotech provides end-to-end SAP services across implementation, support, integration, analytics, cloud, and intelligent technologies.",
        heroImage: "/assets/heroes/services-blue.png",
      },
      services,
    };
  } catch (error) {
    console.error("Error fetching services page data from PostgreSQL:", error);
    throw error;
  }
}

export async function getServiceBySlug(slug: string): Promise<ServiceDetailData | null> {
  try {
    const detail = await prisma.serviceDetail.findUnique({
      where: { slug },
    });

    if (!detail) return null;

    return {
      slug: detail.slug,
      title: detail.title,
      subtitle: detail.subtitle,
      number: detail.number,
      description: detail.description,
      heroImage: detail.heroImage,
      bannerImage: detail.bannerImage,
      enables: detail.enables,
      deliverables: detail.deliverables,
      benefits: detail.benefits,
      tools: detail.tools,
      metaData: (detail.metaData as Record<string, any>) || {},
    };
  } catch (error) {
    console.error(`Error fetching service '${slug}' from PostgreSQL:`, error);
    return null;
  }
}

export async function getAllServiceSlugs(): Promise<string[]> {
  try {
    const services = await prisma.serviceDetail.findMany({
      select: { slug: true },
    });
    return services.map((s) => s.slug);
  } catch {
    return [];
  }
}
