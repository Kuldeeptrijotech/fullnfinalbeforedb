import prisma from "@/app/lib/db";

export type HeroSlideData = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  primaryCta: {
    label: string;
    href: string;
  };
  secondaryCta: {
    label: string;
    href: string;
  };
  visual: {
    type: string;
    src: string;
    alt: string;
  };
};

export type HeroSectionData = {
  slides: HeroSlideData[];
};

export type ServiceItemData = {
  title: string;
  description: string;
  href: string;
  icon: string;
  showOnHome?: boolean;
};

export type ServicesSectionData = {
  eyebrow: string;
  title: string;
  description: string;
  viewAllText: string;
  viewAllHref: string;
  learnMoreText: string;
  items: ServiceItemData[];
};

export type ProductItemData = {
  title: string;
  description: string;
  href: string;
  image: string;
  imageAlt: string;
  icon: string;
  showOnHome?: boolean;
};

export type ProductsSectionData = {
  eyebrow: string;
  title: string;
  description: string;
  viewAllText: string;
  viewAllHref: string;
  ctaText: string;
  items: ProductItemData[];
};

export type WhyChooseStatData = {
  value: string;
  numeric?: number;
  suffix?: string;
  label: string;
  summary?: string;
};

export type WhyChooseItemData = {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  icon: string;
  showOnHome?: boolean;
};

export type WhyChooseUsSectionData = {
  eyebrow: string;
  title: string;
  description: string;
  stats: WhyChooseStatData[];
  items: WhyChooseItemData[];
};

export type SAPCapabilityData = {
  text: string;
  icon: string;
};

export type SAPNodeData = {
  label: string;
  desc: string;
  icon: string;
};

export type SAPCapabilitiesSectionData = {
  eyebrow: string;
  title: string;
  description: string;
  ctaText: string;
  ctaHref: string;
  capabilities: SAPCapabilityData[];
  nodes: SAPNodeData[];
};

export type IndustryItemData = {
  title: string;
  description: string;
  href: string;
  image: string;
  imageAlt: string;
  icon: string;
  showOnHome?: boolean;
};

export type IndustriesSectionData = {
  eyebrow: string;
  title: string;
  description: string;
  viewAllText: string;
  viewAllHref: string;
  ctaText: string;
  items: IndustryItemData[];
};

export type TestimonialItemData = {
  companyName: string;
  writerName: string;
  designation: string;
  testimonial: string;
  href?: string;
  image?: string;
  imageAlt?: string;
  showOnHome?: boolean;
};

export type TestimonialsSectionData = {
  eyebrow: string;
  title: string;
  description: string;
  items: TestimonialItemData[];
};

export type FeaturedBlogItemData = {
  title: string;
  description: string;
  date: string;
  href: string;
  image: string;
  imageAlt: string;
  showOnHome?: boolean;
};

export type FeaturedVideoItemData = {
  title: string;
  description: string;
  youtubeId: string;
  youtubeUrl: string;
  showOnHome?: boolean;
};

export type InsightsSectionData = {
  eyebrow: string;
  title: string;
  description: string;
  blogsTabLabel: string;
  videosTabLabel: string;
  viewAllBlogsText: string;
  viewAllVideosText: string;
  readBlogText: string;
  watchVideoText: string;
  blogs: FeaturedBlogItemData[];
  videos: FeaturedVideoItemData[];
};

export type HomepageData = {
  hero: HeroSectionData;
  services: ServicesSectionData;
  products: ProductsSectionData;
  whyChooseUs: WhyChooseUsSectionData;
  sapCapabilities: SAPCapabilitiesSectionData;
  industries: IndustriesSectionData;
  testimonials: TestimonialsSectionData;
  insights: InsightsSectionData;
};

export async function getHomepageData(): Promise<HomepageData> {
  // Query all dedicated PostgreSQL tables concurrently
  const [
    dbHeroSlides,
    dbServices,
    dbProducts,
    dbWhyChooseItems,
    dbWhyChooseStats,
    dbSapCapabilities,
    dbSapNodes,
    dbIndustries,
    dbTestimonials,
    dbVideos,
    dbBlogPosts,
    dbConfigs,
  ] = await Promise.all([
    prisma.heroSlide.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: "asc" },
    }),
    prisma.service.findMany({
      orderBy: { sortOrder: "asc" },
    }),
    prisma.product.findMany({
      orderBy: { sortOrder: "asc" },
    }),
    prisma.whyChooseUsItem.findMany({
      orderBy: { sortOrder: "asc" },
    }),
    prisma.whyChooseStat.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: "asc" },
    }),
    prisma.sAPCapability.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: "asc" },
    }),
    prisma.sAPEcosystemNode.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: "asc" },
    }),
    prisma.industry.findMany({
      orderBy: { sortOrder: "asc" },
    }),
    prisma.testimonial.findMany({
      orderBy: { sortOrder: "asc" },
    }),
    prisma.featuredVideo.findMany({
      orderBy: { sortOrder: "asc" },
    }),
    prisma.blogPost.findMany({
      where: { status: "published", deletedAt: null },
      orderBy: { publishedAt: "desc" },
      take: 4,
    }),
    prisma.homepageSectionConfig.findMany(),
  ]);

  const configsMap = new Map(dbConfigs.map((c) => [c.sectionKey, c]));

  // Hero Section
  const heroSlides: HeroSlideData[] = dbHeroSlides.map((slide) => ({
    id: slide.slug,
    eyebrow: slide.eyebrow,
    title: slide.title,
    description: slide.description,
    primaryCta: {
      label: slide.primaryCtaLabel,
      href: slide.primaryCtaHref,
    },
    secondaryCta: {
      label: slide.secondaryCtaLabel,
      href: slide.secondaryCtaHref,
    },
    visual: {
      type: slide.visualType,
      src: slide.visualSrc,
      alt: slide.visualAlt,
    },
  }));

  // Services Section
  const servicesConfig = configsMap.get("services");
  const services: ServicesSectionData = {
    eyebrow: servicesConfig?.eyebrow || "Services",
    title: servicesConfig?.title || "Practical SAP and digital services for enterprise growth.",
    description:
      servicesConfig?.description ||
      "Choose focused delivery teams for implementation, support, integration, application development, and data-led decisions.",
    viewAllText: servicesConfig?.viewAllText || "View all services",
    viewAllHref: servicesConfig?.viewAllHref || "/services",
    learnMoreText: servicesConfig?.ctaText || "Learn more",
    items: dbServices.map((s) => ({
      title: s.title,
      description: s.description,
      href: s.href,
      icon: s.icon,
      showOnHome: s.showOnHome,
    })),
  };

  // Products Section
  const productsConfig = configsMap.get("products");
  const products: ProductsSectionData = {
    eyebrow: productsConfig?.eyebrow || "Our Solutions",
    title: productsConfig?.title || "Practical SAP products built for enterprise teams.",
    description:
      productsConfig?.description ||
      "Explore Trijotech solutions designed to simplify operations, improve reporting, and support business-critical SAP workflows.",
    viewAllText: productsConfig?.viewAllText || "View all solutions",
    viewAllHref: productsConfig?.viewAllHref || "/solutions",
    ctaText: productsConfig?.ctaText || "Explore product",
    items: dbProducts.map((p) => ({
      title: p.title,
      description: p.description,
      href: p.href,
      image: p.image,
      imageAlt: p.imageAlt,
      icon: p.icon,
      showOnHome: p.showOnHome,
    })),
  };

  // Why Choose Us Section
  const whyChooseUsConfig = configsMap.get("whyChooseUs");
  const whyChooseUs: WhyChooseUsSectionData = {
    eyebrow: whyChooseUsConfig?.eyebrow || "Why Choose Us",
    title: whyChooseUsConfig?.title || "SAP expertise built around business outcomes.",
    description:
      whyChooseUsConfig?.description ||
      "We combine certified SAP talent, business understanding, and structured delivery practices to help enterprises modernize with confidence.",
    stats: dbWhyChooseStats.map((st) => ({
      value: st.value,
      label: st.label,
      summary: st.summary || "",
    })),
    items: dbWhyChooseItems.map((item) => ({
      title: item.title,
      description: item.description,
      image: item.image,
      imageAlt: item.imageAlt,
      icon: item.icon,
      showOnHome: item.showOnHome,
    })),
  };

  // SAP Capabilities Section
  const sapCapabilitiesConfig = configsMap.get("sapCapabilities");
  const sapCapabilities: SAPCapabilitiesSectionData = {
    eyebrow: sapCapabilitiesConfig?.eyebrow || "SAP Ecosystem",
    title: sapCapabilitiesConfig?.title || "One connected ecosystem across the SAP landscape.",
    description:
      sapCapabilitiesConfig?.description ||
      "Trijotech works across the SAP stack — core ERP, analytics, finance, platform services, and managed support — so your systems stay connected and your teams keep full visibility.",
    ctaText: sapCapabilitiesConfig?.ctaText || "Explore our services",
    ctaHref: sapCapabilitiesConfig?.ctaHref || "/services",
    capabilities: dbSapCapabilities.map((c) => ({
      text: c.text,
      icon: c.icon,
    })),
    nodes: dbSapNodes.map((n) => ({
      label: n.label,
      desc: n.desc,
      icon: n.icon,
    })),
  };

  // Industries Section
  const industriesConfig = configsMap.get("industries");
  const industries: IndustriesSectionData = {
    eyebrow: industriesConfig?.eyebrow || "Industries",
    title: industriesConfig?.title || "SAP solutions shaped around industry needs.",
    description:
      industriesConfig?.description ||
      "We help organizations modernize operations, reporting, planning, and decision-making across industries with practical SAP expertise.",
    viewAllText: industriesConfig?.viewAllText || "Explore All Industries",
    viewAllHref: industriesConfig?.viewAllHref || "/industries/retail-supply-chain",
    ctaText: industriesConfig?.ctaText || "Explore industry",
    items: dbIndustries.map((ind) => ({
      title: ind.title,
      description: ind.description,
      href: ind.href,
      image: ind.image,
      imageAlt: ind.imageAlt,
      icon: ind.icon,
      showOnHome: ind.showOnHome,
    })),
  };

  // Testimonials Section
  const testimonialsConfig = configsMap.get("testimonials");
  const testimonials: TestimonialsSectionData = {
    eyebrow: testimonialsConfig?.eyebrow || "Testimonials",
    title: testimonialsConfig?.title || "Trusted by teams modernizing with SAP.",
    description:
      testimonialsConfig?.description ||
      "Hear from clients who rely on Trijotech for practical delivery, clear communication, and measurable business outcomes.",
    items: dbTestimonials.map((t) => ({
      companyName: t.companyName,
      writerName: t.writerName,
      designation: t.designation,
      testimonial: t.testimonial,
      image: t.image,
      imageAlt: t.imageAlt,
      showOnHome: t.showOnHome,
    })),
  };

  // Insights Section (combines published DB blogs and DB videos)
  const insightsConfig = configsMap.get("insights");
  const customData = (insightsConfig?.customData as Record<string, string>) || {};

  const blogs: FeaturedBlogItemData[] =
    dbBlogPosts.length > 0
      ? dbBlogPosts.map((b) => ({
          title: b.title,
          description: b.shortDescription,
          date: b.publishedAt
            ? new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" }).format(b.publishedAt)
            : "Recent",
          href: `/blogs/${b.slug}`,
          image: b.featuredImage || "/static/blogs/blog-1.png",
          imageAlt: b.imageAlt || b.title,
          showOnHome: true,
        }))
      : [];

  const videos: FeaturedVideoItemData[] = dbVideos.map((v) => ({
    title: v.title,
    description: v.description,
    youtubeId: v.youtubeId,
    youtubeUrl: v.youtubeUrl,
    showOnHome: v.showOnHome,
  }));

  const insights: InsightsSectionData = {
    eyebrow: insightsConfig?.eyebrow || "Insights",
    title: insightsConfig?.title || "Practical SAP thinking in blogs and videos.",
    description:
      insightsConfig?.description ||
      "Explore SAP, data, cloud, finance, and transformation ideas from the Trijotech team.",
    blogsTabLabel: customData.blogsTabLabel || "Blogs",
    videosTabLabel: customData.videosTabLabel || "Videos",
    viewAllBlogsText: customData.viewAllBlogsText || "View all blogs",
    viewAllVideosText: customData.viewAllVideosText || "View all videos",
    readBlogText: customData.readBlogText || "Read blog",
    watchVideoText: customData.watchVideoText || "Watch video",
    blogs,
    videos,
  };

  return {
    hero: { slides: heroSlides },
    services,
    products,
    whyChooseUs,
    sapCapabilities,
    industries,
    testimonials,
    insights,
  };
}
