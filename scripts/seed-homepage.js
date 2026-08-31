const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const defaultHeroSection = {
  slides: [
    {
      id: "sap-consulting",
      eyebrow: "SAP Consulting",
      title: "Plan, implement, and optimize SAP systems with confidence.",
      description:
        "Trijotech helps businesses improve ERP processes through SAP consulting, implementation, integration, and enterprise system optimization.",
      primaryCta: {
        label: "Explore SAP Consulting",
        href: "/services/sap-consulting",
      },
      secondaryCta: {
        label: "Talk to an expert",
        href: "/contact",
      },
      visual: {
        type: "video",
        src: "/static/Hero-Animation-1.mp4",
        alt: "SAP consulting and enterprise planning",
      },
    },
    {
      id: "sap-support-ams",
      eyebrow: "SAP Support & AMS",
      title: "Keep your SAP systems stable, secure, and continuously optimized.",
      description:
        "Reduce downtime and improve operational efficiency with SAP application management support built for ongoing business performance.",
      primaryCta: {
        label: "Explore SAP AMS",
        href: "/services/sap-support-ams",
      },
      secondaryCta: {
        label: "Get Support",
        href: "/contact",
      },
      visual: {
        type: "video",
        src: "/static/Hero-Animation-3.mp4",
        alt: "SAP support and application management",
      },
    },
    {
      id: "sap-btp-applications",
      eyebrow: "SAP BTP Applications",
      title: "Build scalable SAP extensions, portals, and workflows.",
      description:
        "Create full-stack applications on SAP Business Technology Platform, including modern portals, integrations, workflows, and custom business extensions.",
      primaryCta: {
        label: "Explore SAP BTP",
        href: "/services/sap-btp-full-stack-applications",
      },
      secondaryCta: {
        label: "See Case Studies",
        href: "/case-studies",
      },
      visual: {
        type: "video",
        src: "/static/Hero-Animation-2.mp4",
        alt: "SAP BTP full-stack application development",
      },
    },
    {
      id: "sap-data-ai",
      eyebrow: "SAP Data, AI & Insights",
      title: "Turn enterprise data into smarter decisions.",
      description:
        "Integrate, migrate, and transform SAP and non-SAP data while using analytics, automation, and AI-driven insights to improve business outcomes.",
      primaryCta: {
        label: "Explore Data & AI",
        href: "/services/sap-ai-data-insight-services",
      },
      secondaryCta: {
        label: "Read Insights",
        href: "/blogs",
      },
      visual: {
        type: "video",
        src: "/static/Hero-Animation-5.mp4",
        alt: "SAP data integration analytics and AI insights",
      },
    },
  ],
};

const defaultServicesSection = {
  eyebrow: "Services",
  title: "Practical SAP and digital services for enterprise growth.",
  description:
    "Choose focused delivery teams for implementation, support, integration, application development, and data-led decisions.",
  viewAllText: "View all services",
  viewAllHref: "/services",
  learnMoreText: "Learn more",
  items: [
    {
      title: "SAP Consulting",
      description:
        "Implementation, integration, reporting, and business process optimization for SAP landscapes.",
      href: "/services/sap-consulting",
      icon: "Compass",
      showOnHome: true,
    },
    {
      title: "SAP Support & AMS",
      description:
        "Stabilize, support, and continuously optimize SAP environments with dependable application management.",
      href: "/services/sap-support-ams",
      icon: "HeartHandshake",
      showOnHome: true,
    },
    {
      title: "SAP BTP Full Stack Applications",
      description:
        "Build portals, workflows, extensions, and integrations on SAP Business Technology Platform.",
      href: "/services/sap-btp-full-stack-applications",
      icon: "Blocks",
      showOnHome: true,
    },
    {
      title: "SAP Data Integration & Migration",
      description:
        "Move, transform, and connect business data across SAP and non-SAP systems with reliable delivery.",
      href: "/services/sap-data-integration-migration",
      icon: "DatabaseZap",
      showOnHome: true,
    },
  ],
};

const defaultProductsSection = {
  eyebrow: "Our Solutions",
  title: "Practical SAP products built for enterprise teams.",
  description:
    "Explore Trijotech solutions designed to simplify operations, improve reporting, and support business-critical SAP workflows.",
  viewAllText: "View all solutions",
  viewAllHref: "/solutions",
  ctaText: "Explore product",
  items: [
    {
      title: "E-invoicing Pro",
      description:
        "A secure and scalable e-invoicing solution that enables seamless compliance through direct integration with government portals. Built for SAP S/4HANA Public and Private Cloud, it reduces manual effort, minimizes errors, and provides real-time visibility into the invoicing process.",
      href: "/solutions/e-invoicing-pro",
      image: "/static/Hero-Animation-1.mp4",
      imageAlt: "E-invoicing compliance and SAP integration animation",
      icon: "ReceiptText",
      showOnHome: true,
    },
    {
      title: "Profitability Pro",
      description:
        "An SAP BTP-based consolidation solution that automates legal and financial consolidation across entities and jurisdictions. It supports Multi-GAAP and IFRS requirements, accelerates financial close, and reduces dependency on spreadsheets through real-time dashboards.",
      href: "/solutions/profitability-pro",
      image: "/static/Hero-Animation-4.webm",
      imageAlt: "Profitability and financial consolidation dashboard animation",
      icon: "LineChart",
      showOnHome: true,
    },
    {
      title: "Finlagoon Consolidation",
      description:
        "An SAP BTP-based consolidation solution that automates legal and financial consolidation across entities and jurisdictions. It supports Multi-GAAP and IFRS requirements, accelerates financial close, and reduces dependency on spreadsheets through real-time dashboards.",
      href: "/solutions/finlagoon-consolidation",
      image: "/static/Hero-Animation-2.mp4",
      imageAlt: "SAP BTP applications, portals, and workflows animation",
      icon: "Layers3",
      showOnHome: true,
    },
  ],
};

const defaultWhyChooseUsSection = {
  eyebrow: "Why Choose Us",
  title: "SAP expertise built around business outcomes.",
  description:
    "We combine certified SAP talent, business understanding, and structured delivery practices to help enterprises modernize with confidence.",
  stats: [
    {
      value: "9+",
      label: "Years in SAP implementation and support",
      summary:
        "Hands-on SAP delivery experience across implementation, stabilization, support, and continuous improvement.",
    },
    {
      value: "100+",
      label: "Projects delivered",
      summary:
        "Successful delivery across SAP consulting, data integration, reporting, analytics, and enterprise transformation programs.",
    },
    {
      value: "50+",
      label: "Clients served",
      summary:
        "Trusted by clients across regions and industries with practical, scalable, and business-focused SAP solutions.",
    },
    {
      value: "30+",
      label: "Years of founder industry experience",
      summary:
        "Leadership shaped by deep industry experience, delivery ownership, and long-term client success.",
    },
  ],
  items: [
    {
      title: "Specialized SAP and Industry Expertise",
      description:
        "We combine business process knowledge with deep SAP capabilities across analytics, consolidation, planning, reporting, integration, and enterprise transformation. Every solution is designed to be practical, scalable, and tied to measurable business value.",
      image: "/static/Hero-Animation-1.mp4",
      imageAlt: "SAP expertise and enterprise transformation",
      icon: "Award",
      showOnHome: true,
    },
    {
      title: "Global Experience, Local Commitment",
      description:
        "We support organizations across the US, Europe, the Middle East, and APAC with SAP and digital solutions adapted to regional business needs while staying aligned with global delivery standards and best practices.",
      image: "/static/Hero-Animation-3.mp4",
      imageAlt: "Global SAP delivery and regional business support",
      icon: "Globe2",
      showOnHome: true,
    },
    {
      title: "Certified Talent, Quality-Driven Delivery",
      description:
        "Our SAP-certified professionals follow structured delivery practices with clear communication, transparent execution, and quality checkpoints that help every engagement move forward with confidence.",
      image: "/static/Hero-Animation-5.mp4",
      imageAlt: "Certified SAP talent and quality delivery",
      icon: "BadgeCheck",
      showOnHome: true,
    },
  ],
};

const defaultSAPCapabilitiesSection = {
  eyebrow: "SAP Ecosystem",
  title: "One connected ecosystem across the SAP landscape.",
  description:
    "Trijotech works across the SAP stack — core ERP, analytics, finance, platform services, and managed support — so your systems stay connected and your teams keep full visibility.",
  ctaText: "Explore our services",
  ctaHref: "/services",
  capabilities: [
    {
      text: "SAP S/4HANA implementation and system conversion",
      icon: "Layers",
    },
    {
      text: "SAP BPC, Group Reporting & Analytics Cloud",
      icon: "LineChart",
    },
    {
      text: "BTP application development and integrations",
      icon: "Blocks",
    },
    {
      text: "Data migration, integration & AI-assisted insights",
      icon: "Sparkles",
    },
    {
      text: "SAP support, AMS and continuous optimization",
      icon: "ShieldCheck",
    },
  ],
  nodes: [
    { icon: "Database", label: "SAP S/4HANA", desc: "Core cloud & on-premise ERP" },
    { icon: "LineChart", label: "Analytics Cloud", desc: "Enterprise planning & SAC dashboards" },
    { icon: "Blocks", label: "SAP BTP", desc: "Custom apps, extensions & workflows" },
    { icon: "DatabaseZap", label: "Data & Integration", desc: "Automated pipelines & AI workflows" },
    { icon: "Landmark", label: "Finance & Reporting", desc: "Group consolidation & PaPM analytics" },
    { icon: "LifeBuoy", label: "Support & AMS", desc: "24/7 SLA governance & optimization" },
  ],
};

const defaultIndustriesSection = {
  eyebrow: "Industries",
  title: "SAP solutions shaped around industry needs.",
  description:
    "We help organizations modernize operations, reporting, planning, and decision-making across industries with practical SAP expertise.",
  viewAllText: "Explore All Industries",
  viewAllHref: "/industries/retail-supply-chain",
  ctaText: "Explore industry",
  items: [
    {
      title: "Retail & Supply Chain",
      description:
        "Build connected, intelligent and resilient retail and supply chain operations using modern SAP solutions.",
      href: "/industries/retail-supply-chain",
      image: "/static/Retail_and_supply_chain_image.png",
      imageAlt: "Retail and supply chain operations and analytics",
      icon: "ShoppingCart",
      showOnHome: true,
    },
    {
      title: "Life Sciences & Pharma",
      description:
        "SAP-led planning, finance, supply chain, and analytics solutions for pharmaceutical teams that need accuracy and compliance.",
      href: "/industries/pharmaceuticals-life-sciences",
      image: "/static/cards/Pharma.webp",
      imageAlt: "Pharma and life sciences SAP analytics",
      icon: "FlaskConical",
      showOnHome: true,
    },
    {
      title: "Manufacturing & Industrial",
      description:
        "Connected SAP solutions for production, procurement, inventory, reporting, and operational performance.",
      href: "/industries/manufacturing",
      image: "/static/cards/Manufacturing.webp",
      imageAlt: "Manufacturing and industrial operations",
      icon: "Factory",
      showOnHome: true,
    },
    {
      title: "Banking & Fintech",
      description:
        "Data-driven SAP and cloud solutions for finance platforms that need secure reporting and scalable operations.",
      href: "/industries/fintech",
      image: "/static/cards/FinTech.webp",
      imageAlt: "Banking and fintech data dashboard",
      icon: "Wallet",
      showOnHome: true,
    },
    {
      title: "Oil & Gas",
      description:
        "Real-time asset telemetry, hydrocarbon accounting, emissions compliance, and joint venture analytics.",
      href: "/industries/oil-and-gas",
      image: "/static/Oil_and_Gas.jpg",
      imageAlt: "Oil and gas energy operations and pipeline telemetry",
      icon: "Fuel",
      showOnHome: true,
    },
    {
      title: "Healthcare",
      description:
        "Clinical data analytics, hospital resource planning, and regulatory compliance powered by SAP.",
      href: "/industries/healthcare",
      image: "/static/Healthcare.jpg",
      imageAlt: "Healthcare analytics and clinical operations",
      icon: "HeartPulse",
      showOnHome: true,
    },
    {
      title: "Telecom & Media",
      description:
        "Enterprise SAP, integration, and reporting solutions for telecom teams managing network infrastructure and subscribers.",
      href: "/industries/telecommunications",
      image: "/static/Telecommunication.jpg",
      imageAlt: "Telecommunication and media infrastructure systems",
      icon: "Radio",
      showOnHome: true,
    },
    {
      title: "Steel Manufacturing",
      description:
        "SAP solutions for complex steel operations, production planning, materials, financial control, and KPI monitoring.",
      href: "/industries/steel-manufacturing",
      image: "/static/Steel_Manufacturing.jpg",
      imageAlt: "Steel manufacturing and heavy industrial operations",
      icon: "Layers",
      showOnHome: true,
    },
  ],
};

const defaultTestimonialsSection = {
  eyebrow: "Testimonials",
  title: "Trusted by teams modernizing with SAP.",
  description:
    "Hear from clients who rely on Trijotech for practical delivery, clear communication, and measurable business outcomes.",
  items: [
    {
      companyName: "Large IT Company from Asia",
      writerName: "Large IT Company from Asia",
      designation: "Project Manager",
      testimonial:
        "We are pleased to present the SPOT AWARD in recognition of the excellent work by the Trijotech consultant. Your dedication, ownership, and willingness to take on additional responsibilities truly stood out. Your efforts in delivering the S/4HANA solution ensured a successful outcome and earned appreciation from the customer.",
      image: "",
      imageAlt: "",
      showOnHome: true,
    },
    {
      companyName: "Global Manufacturing Company, Asia",
      writerName: "Global Manufacturing Company, Asia",
      designation: "CTO",
      testimonial:
        "Compared to other partners we've worked with, Trijotech demonstrated dedication and expertise that set them apart. Their SAP consultants ensured seamless communication and proactive support. The automation of our material master data process exceeded expectations and significantly improved operational efficiency.",
      image: "",
      imageAlt: "",
      showOnHome: true,
    },
    {
      companyName: "Diligent Global",
      writerName: "Kalpesh Chavda",
      designation: "CEO",
      testimonial:
        "Trijotech has supported us with an excellent team for BPC implementation and has been prompt in delivery and response. Their consultants have strong capability around Legal & Management Consolidation and Data Analytics. I strongly recommend Trijotech for SAP BPC and Group Reporting implementation services.",
      image: "",
      imageAlt: "",
      showOnHome: true,
    },
    {
      companyName: "NEC",
      writerName: "Bharat Bhushan",
      designation: "Senior Manager",
      testimonial:
        "We're really happy with the way Trijotech has handled the SAP AMS project. The team has shown true ownership, worked with full dedication, and always responded quickly when needed. Thank you for the great support—keep it going!",
      image: "",
      imageAlt: "",
      showOnHome: true,
    },
    {
      companyName: "Verovis",
      writerName: "Guenteher",
      designation: "Verovis",
      testimonial:
        "We would like to thank Trijotech for their outstanding support in resolving the challenges we were facing with SAP BPC. Their team was prompt, supportive, and easy to work with throughout the process. Thanks to their efforts, things are now running smoothly.",
      image: "",
      imageAlt: "",
      showOnHome: true,
    },
    {
      companyName: "Valantic Group",
      writerName: "Matthias Weil",
      designation: "Executive Board Member",
      testimonial:
        "Trijotech has been our trusted partner for many years for all things SAP software. Their profound technical expertise has helped us elevate our game in BPC, Group Reporting, and SAP Analytics Cloud.",
      image: "",
      imageAlt: "",
      showOnHome: true,
    },
  ],
};

const defaultInsightsSection = {
  eyebrow: "Insights",
  title: "Practical SAP thinking in blogs and videos.",
  description:
    "Explore SAP, data, cloud, finance, and transformation ideas from the Trijotech team.",
  blogsTabLabel: "Blogs",
  videosTabLabel: "Videos",
  viewAllBlogsText: "View all blogs",
  viewAllVideosText: "View all videos",
  readBlogText: "Read blog",
  watchVideoText: "Watch video",
  blogs: [
    {
      title: "E-Invoicing Pro: Simplifying Invoicing for Modern Businesses",
      description:
        "Simplify invoicing with SAP-integrated compliance, automation, and better visibility across the invoicing process.",
      date: "March 2024",
      href: "/blogs/e-invoicing-pro-simplifying-invoicing-for-modern-businesses",
      image: "/static/blogs/blog-1.png",
      imageAlt: "E-Invoicing Pro blog preview",
      showOnHome: true,
    },
    {
      title: "SAP Analytics Cloud for Annual Budgeting in Oil & Gas",
      description:
        "See how SAP Analytics Cloud supports data-driven planning, budgeting, and better business decisions in Oil and Gas.",
      date: "May 2024",
      href: "/blogs/sap-analytics-cloud-oil-gas-industry",
      image: "/static/blogs/blog-2.png",
      imageAlt: "SAP Analytics Cloud budgeting blog preview",
      showOnHome: true,
    },
    {
      title: "Key Preparations Before Starting Your Legal & Compliance Journey",
      description:
        "Understand the practical planning steps that help enterprises prepare for SAP-led legal, compliance, and reporting programs.",
      date: "December 2024",
      href: "/blogs/key-preparations-before-starting-your-legal-management-consolidation-projects",
      image: "/static/blogs/blog-3.png",
      imageAlt: "Legal and compliance preparation blog preview",
      showOnHome: true,
    },
    {
      title: "Starting a Data Analytics Project for Your Company",
      description:
        "A practical guide to beginning a data analytics initiative with clearer goals, stronger data foundations, and measurable outcomes.",
      date: "October 2024",
      href: "/blogs/starting-a-data-analytics-project-for-your-company-heres-what-you-need-to-know",
      image: "/static/blogs/blog-4.jpg",
      imageAlt: "Data analytics project blog preview",
      showOnHome: true,
    },
  ],
  videos: [
    {
      title: "Why Every Business Needs SAP Profitability",
      description:
        "A focused video on why profitability insight matters for modern business planning, control, and performance.",
      youtubeId: "c8MdA6ihDZw",
      youtubeUrl: "https://www.youtube.com/watch?v=c8MdA6ihDZw",
      showOnHome: true,
    },
    {
      title: "The Journey of SAP Analytics & Planning Made Simple",
      description:
        "A simple walkthrough of how SAP analytics and planning help organizations connect data with better decisions.",
      youtubeId: "mh4wKCYlFgI",
      youtubeUrl: "https://www.youtube.com/watch?v=mh4wKCYlFgI",
      showOnHome: true,
    },
    {
      title: "Maximizing ROI for Large Scale S/4HANA Transformation",
      description:
        "Practical points for improving value realization and reducing risk in enterprise S/4HANA transformation programs.",
      youtubeId: "7pszJqQBMAY",
      youtubeUrl: "https://www.youtube.com/watch?v=7pszJqQBMAY",
      showOnHome: true,
    },
    {
      title: "E-Invoicing Pro: Simplifying Compliance",
      description:
        "A product-focused video on streamlining e-invoicing compliance with SAP integration and automation.",
      youtubeId: "rg5odsXS1sM",
      youtubeUrl: "https://www.youtube.com/watch?v=rg5odsXS1sM",
      showOnHome: true,
    },
  ],
};

async function main() {
  console.log("Seeding homepage in PostgreSQL...");

  // 1. Ensure the root page exists
  let page = await prisma.page.findUnique({
    where: { slug: "/" },
  });

  if (!page) {
    page = await prisma.page.create({
      data: {
        slug: "/",
        title: "Trijotech | SAP Solutions",
        metaTitle: "Trijotech | SAP Solutions",
        metaDescription: "SAP, data, and cloud transformation services for modern enterprise teams.",
        status: "published",
      },
    });
  }

  const sectionsToSeed = [
    { sectionKey: "hero", content: defaultHeroSection, sortOrder: 0 },
    { sectionKey: "services", content: defaultServicesSection, sortOrder: 1 },
    { sectionKey: "products", content: defaultProductsSection, sortOrder: 2 },
    { sectionKey: "whyChooseUs", content: defaultWhyChooseUsSection, sortOrder: 3 },
    { sectionKey: "sapCapabilities", content: defaultSAPCapabilitiesSection, sortOrder: 4 },
    { sectionKey: "industries", content: defaultIndustriesSection, sortOrder: 5 },
    { sectionKey: "testimonials", content: defaultTestimonialsSection, sortOrder: 6 },
    { sectionKey: "insights", content: defaultInsightsSection, sortOrder: 7 },
  ];

  for (const item of sectionsToSeed) {
    await prisma.pageSection.upsert({
      where: {
        pageId_sectionKey: {
          pageId: page.id,
          sectionKey: item.sectionKey,
        },
      },
      update: {
        content: item.content,
        sortOrder: item.sortOrder,
        isVisible: true,
        updatedAt: new Date(),
      },
      create: {
        pageId: page.id,
        sectionKey: item.sectionKey,
        sectionType: item.sectionKey,
        content: item.content,
        sortOrder: item.sortOrder,
        isVisible: true,
      },
    });
    console.log(`- Upserted section: ${item.sectionKey}`);
  }

  console.log("Homepage database seeding completed successfully!");
}

main()
  .catch((err) => {
    console.error("Seeding failed:", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
