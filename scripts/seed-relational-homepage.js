const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding relational homepage tables in PostgreSQL database: trijotech-nextjs...");

  // 1. Hero Slides
  const heroSlides = [
    {
      slug: "sap-consulting",
      eyebrow: "SAP Consulting",
      title: "Plan, implement, and optimize SAP systems with confidence.",
      description:
        "Trijotech helps businesses improve ERP processes through SAP consulting, implementation, integration, and enterprise system optimization.",
      primaryCtaLabel: "Explore SAP Consulting",
      primaryCtaHref: "/services/sap-consulting",
      secondaryCtaLabel: "Talk to an expert",
      secondaryCtaHref: "/contact",
      visualType: "video",
      visualSrc: "/static/Hero-Animation-1.mp4",
      visualAlt: "SAP consulting and enterprise planning",
      sortOrder: 0,
      isActive: true,
    },
    {
      slug: "sap-support-ams",
      eyebrow: "SAP Support & AMS",
      title: "Keep your SAP systems stable, secure, and continuously optimized.",
      description:
        "Reduce downtime and improve operational efficiency with SAP application management support built for ongoing business performance.",
      primaryCtaLabel: "Explore SAP AMS",
      primaryCtaHref: "/services/sap-support-ams",
      secondaryCtaLabel: "Get Support",
      secondaryCtaHref: "/contact",
      visualType: "video",
      visualSrc: "/static/Hero-Animation-3.mp4",
      visualAlt: "SAP support and application management",
      sortOrder: 1,
      isActive: true,
    },
    {
      slug: "sap-btp-applications",
      eyebrow: "SAP BTP Applications",
      title: "Build scalable SAP extensions, portals, and workflows.",
      description:
        "Create full-stack applications on SAP Business Technology Platform, including modern portals, integrations, workflows, and custom business extensions.",
      primaryCtaLabel: "Explore SAP BTP",
      primaryCtaHref: "/services/sap-btp-full-stack-applications",
      secondaryCtaLabel: "See Case Studies",
      secondaryCtaHref: "/case-studies",
      visualType: "video",
      visualSrc: "/static/Hero-Animation-2.mp4",
      visualAlt: "SAP BTP full-stack application development",
      sortOrder: 2,
      isActive: true,
    },
    {
      slug: "sap-data-ai",
      eyebrow: "SAP Data, AI & Insights",
      title: "Turn enterprise data into smarter decisions.",
      description:
        "Integrate, migrate, and transform SAP and non-SAP data while using analytics, automation, and AI-driven insights to improve business outcomes.",
      primaryCtaLabel: "Explore Data & AI",
      primaryCtaHref: "/services/sap-ai-data-insight-services",
      secondaryCtaLabel: "Read Insights",
      secondaryCtaHref: "/blogs",
      visualType: "video",
      visualSrc: "/static/Hero-Animation-5.mp4",
      visualAlt: "SAP data integration analytics and AI insights",
      sortOrder: 3,
      isActive: true,
    },
  ];

  for (const slide of heroSlides) {
    await prisma.heroSlide.upsert({
      where: { slug: slide.slug },
      update: slide,
      create: slide,
    });
  }
  console.log(`✓ Seeded ${heroSlides.length} Hero Slides into "hero_slides" table.`);

  // 2. Services
  const services = [
    {
      title: "SAP Consulting",
      description:
        "Implementation, integration, reporting, and business process optimization for SAP landscapes.",
      href: "/services/sap-consulting",
      icon: "Compass",
      image: "/static/Hero-Animation-1.mp4",
      imageAlt: "SAP consulting and enterprise workflow animation",
      showOnHome: true,
      sortOrder: 0,
    },
    {
      title: "SAP Support & AMS",
      description:
        "Stabilize, support, and continuously optimize SAP environments with dependable application management.",
      href: "/services/sap-support-ams",
      icon: "HeartHandshake",
      image: "/static/Hero-Animation-3.mp4",
      imageAlt: "SAP support and managed services animation",
      showOnHome: true,
      sortOrder: 1,
    },
    {
      title: "SAP BTP Full Stack Applications",
      description:
        "Build portals, workflows, extensions, and integrations on SAP Business Technology Platform.",
      href: "/services/sap-btp-full-stack-applications",
      icon: "Blocks",
      image: "/static/Hero-Animation-2.mp4",
      imageAlt: "SAP BTP application development animation",
      showOnHome: true,
      sortOrder: 2,
    },
    {
      title: "SAP Data Integration & Migration",
      description:
        "Move, transform, and connect business data across SAP and non-SAP systems with reliable delivery.",
      href: "/services/sap-data-integration-migration",
      icon: "DatabaseZap",
      image: "/static/Hero-Animation-4.webm",
      imageAlt: "Data integration and migration animation",
      showOnHome: true,
      sortOrder: 3,
    },
    {
      title: "SAP AI & Data Insight Services",
      description:
        "Use analytics, automation, and AI-assisted insight to turn enterprise data into better decisions.",
      href: "/services/sap-ai-data-insight-services",
      icon: "Sparkles",
      image: "/static/Hero-Animation-5.mp4",
      imageAlt: "AI and enterprise data insights animation",
      showOnHome: false,
      sortOrder: 4,
    },
  ];

  for (const service of services) {
    await prisma.service.upsert({
      where: { title: service.title },
      update: service,
      create: service,
    });
  }
  console.log(`✓ Seeded ${services.length} Services into "services" table.`);

  // 3. Products
  const products = [
    {
      title: "E-invoicing Pro",
      description:
        "A secure and scalable e-invoicing solution that enables seamless compliance through direct integration with government portals. Built for SAP S/4HANA Public and Private Cloud, it reduces manual effort, minimizes errors, and provides real-time visibility into the invoicing process.",
      href: "/solutions/e-invoicing-pro",
      image: "/static/Hero-Animation-1.mp4",
      imageAlt: "E-invoicing compliance and SAP integration animation",
      icon: "ReceiptText",
      showOnHome: true,
      sortOrder: 0,
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
      sortOrder: 1,
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
      sortOrder: 2,
    },
  ];

  for (const product of products) {
    await prisma.product.upsert({
      where: { title: product.title },
      update: product,
      create: product,
    });
  }
  console.log(`✓ Seeded ${products.length} Products into "products" table.`);

  // 4. Why Choose Us Items
  const whyChooseUsItems = [
    {
      title: "Specialized SAP and Industry Expertise",
      description:
        "We combine business process knowledge with deep SAP capabilities across analytics, consolidation, planning, reporting, integration, and enterprise transformation. Every solution is designed to be practical, scalable, and tied to measurable business value.",
      image: "/static/Hero-Animation-1.mp4",
      imageAlt: "SAP expertise and enterprise transformation",
      icon: "Award",
      showOnHome: true,
      sortOrder: 0,
    },
    {
      title: "Global Experience, Local Commitment",
      description:
        "We support organizations across the US, Europe, the Middle East, and APAC with SAP and digital solutions adapted to regional business needs while staying aligned with global delivery standards and best practices.",
      image: "/static/Hero-Animation-3.mp4",
      imageAlt: "Global SAP delivery and regional business support",
      icon: "Globe2",
      showOnHome: true,
      sortOrder: 1,
    },
    {
      title: "Certified Talent, Quality-Driven Delivery",
      description:
        "Our SAP-certified professionals follow structured delivery practices with clear communication, transparent execution, and quality checkpoints that help every engagement move forward with confidence.",
      image: "/static/Hero-Animation-5.mp4",
      imageAlt: "Certified SAP talent and quality delivery",
      icon: "BadgeCheck",
      showOnHome: true,
      sortOrder: 2,
    },
  ];

  for (const item of whyChooseUsItems) {
    await prisma.whyChooseUsItem.upsert({
      where: { title: item.title },
      update: item,
      create: item,
    });
  }
  console.log(`✓ Seeded ${whyChooseUsItems.length} Why Choose Us items into "why_choose_us_items" table.`);

  // 5. Why Choose Stats
  const whyChooseStats = [
    {
      value: "9+",
      label: "Years in SAP implementation and support",
      summary:
        "Hands-on SAP delivery experience across implementation, stabilization, support, and continuous improvement.",
      sortOrder: 0,
      isActive: true,
    },
    {
      value: "100+",
      label: "Projects delivered",
      summary:
        "Successful delivery across SAP consulting, data integration, reporting, analytics, and enterprise transformation programs.",
      sortOrder: 1,
      isActive: true,
    },
    {
      value: "50+",
      label: "Clients served",
      summary:
        "Trusted by clients across regions and industries with practical, scalable, and business-focused SAP solutions.",
      sortOrder: 2,
      isActive: true,
    },
    {
      value: "30+",
      label: "Years of founder industry experience",
      summary:
        "Leadership shaped by deep industry experience, delivery ownership, and long-term client success.",
      sortOrder: 3,
      isActive: true,
    },
  ];

  await prisma.whyChooseStat.deleteMany({});
  for (const stat of whyChooseStats) {
    await prisma.whyChooseStat.create({ data: stat });
  }
  console.log(`✓ Seeded ${whyChooseStats.length} Stats into "why_choose_stats" table.`);

  // 6. SAP Capabilities
  const sapCapabilities = [
    {
      text: "SAP S/4HANA implementation and system conversion",
      icon: "Layers",
      sortOrder: 0,
      isActive: true,
    },
    {
      text: "SAP BPC, Group Reporting & Analytics Cloud",
      icon: "LineChart",
      sortOrder: 1,
      isActive: true,
    },
    {
      text: "BTP application development and integrations",
      icon: "Blocks",
      sortOrder: 2,
      isActive: true,
    },
    {
      text: "Data migration, integration & AI-assisted insights",
      icon: "Sparkles",
      sortOrder: 3,
      isActive: true,
    },
    {
      text: "SAP support, AMS and continuous optimization",
      icon: "ShieldCheck",
      sortOrder: 4,
      isActive: true,
    },
  ];

  await prisma.sAPCapability.deleteMany({});
  for (const cap of sapCapabilities) {
    await prisma.sAPCapability.create({ data: cap });
  }
  console.log(`✓ Seeded ${sapCapabilities.length} SAP Capabilities into "sap_capabilities" table.`);

  // 7. SAP Ecosystem Nodes
  const sapNodes = [
    { label: "SAP S/4HANA", desc: "Core cloud & on-premise ERP", icon: "Database", sortOrder: 0, isActive: true },
    { label: "Analytics Cloud", desc: "Enterprise planning & SAC dashboards", icon: "LineChart", sortOrder: 1, isActive: true },
    { label: "SAP BTP", desc: "Custom apps, extensions & workflows", icon: "Blocks", sortOrder: 2, isActive: true },
    { label: "Data & Integration", desc: "Automated pipelines & AI workflows", icon: "DatabaseZap", sortOrder: 3, isActive: true },
    { label: "Finance & Reporting", desc: "Group consolidation & PaPM analytics", icon: "Landmark", sortOrder: 4, isActive: true },
    { label: "Support & AMS", desc: "24/7 SLA governance & optimization", icon: "LifeBuoy", sortOrder: 5, isActive: true },
  ];

  await prisma.sAPEcosystemNode.deleteMany({});
  for (const node of sapNodes) {
    await prisma.sAPEcosystemNode.create({ data: node });
  }
  console.log(`✓ Seeded ${sapNodes.length} SAP Ecosystem Nodes into "sap_ecosystem_nodes" table.`);

  // 8. Industries
  const industries = [
    {
      title: "Retail & Supply Chain",
      description:
        "Build connected, intelligent and resilient retail and supply chain operations using modern SAP solutions.",
      href: "/industries/retail-supply-chain",
      image: "/static/Retail_and_supply_chain_image.png",
      imageAlt: "Retail and supply chain operations and analytics",
      icon: "ShoppingCart",
      showOnHome: true,
      sortOrder: 0,
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
      sortOrder: 1,
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
      sortOrder: 2,
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
      sortOrder: 3,
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
      sortOrder: 4,
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
      sortOrder: 5,
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
      sortOrder: 6,
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
      sortOrder: 7,
    },
  ];

  for (const ind of industries) {
    await prisma.industry.upsert({
      where: { title: ind.title },
      update: ind,
      create: ind,
    });
  }
  console.log(`✓ Seeded ${industries.length} Industries into "industries" table.`);

  // 9. Testimonials
  const testimonials = [
    {
      companyName: "Large IT Company from Asia",
      writerName: "Large IT Company from Asia",
      designation: "Project Manager",
      testimonial:
        "We are pleased to present the SPOT AWARD in recognition of the excellent work by the Trijotech consultant. Your dedication, ownership, and willingness to take on additional responsibilities truly stood out. Your efforts in delivering the S/4HANA solution ensured a successful outcome and earned appreciation from the customer.",
      image: "",
      imageAlt: "",
      showOnHome: true,
      sortOrder: 0,
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
      sortOrder: 1,
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
      sortOrder: 2,
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
      sortOrder: 3,
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
      sortOrder: 4,
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
      sortOrder: 5,
    },
  ];

  await prisma.testimonial.deleteMany({});
  for (const t of testimonials) {
    await prisma.testimonial.create({ data: t });
  }
  console.log(`✓ Seeded ${testimonials.length} Testimonials into "testimonials" table.`);

  // 10. Featured Videos
  const featuredVideos = [
    {
      title: "Why Every Business Needs SAP Profitability",
      description:
        "A focused video on why profitability insight matters for modern business planning, control, and performance.",
      youtubeId: "c8MdA6ihDZw",
      youtubeUrl: "https://www.youtube.com/watch?v=c8MdA6ihDZw",
      showOnHome: true,
      sortOrder: 0,
    },
    {
      title: "The Journey of SAP Analytics & Planning Made Simple",
      description:
        "A simple walkthrough of how SAP analytics and planning help organizations connect data with better decisions.",
      youtubeId: "mh4wKCYlFgI",
      youtubeUrl: "https://www.youtube.com/watch?v=mh4wKCYlFgI",
      showOnHome: true,
      sortOrder: 1,
    },
    {
      title: "Maximizing ROI for Large Scale S/4HANA Transformation",
      description:
        "Practical points for improving value realization and reducing risk in enterprise S/4HANA transformation programs.",
      youtubeId: "7pszJqQBMAY",
      youtubeUrl: "https://www.youtube.com/watch?v=7pszJqQBMAY",
      showOnHome: true,
      sortOrder: 2,
    },
    {
      title: "E-Invoicing Pro: Simplifying Compliance",
      description:
        "A product-focused video on streamlining e-invoicing compliance with SAP integration and automation.",
      youtubeId: "rg5odsXS1sM",
      youtubeUrl: "https://www.youtube.com/watch?v=rg5odsXS1sM",
      showOnHome: true,
      sortOrder: 3,
    },
  ];

  await prisma.featuredVideo.deleteMany({});
  for (const v of featuredVideos) {
    await prisma.featuredVideo.create({ data: v });
  }
  console.log(`✓ Seeded ${featuredVideos.length} Videos into "featured_videos" table.`);

  // 11. Homepage Section Configs
  const sectionConfigs = [
    {
      id: "services",
      sectionKey: "services",
      eyebrow: "Services",
      title: "Practical SAP and digital services for enterprise growth.",
      description:
        "Choose focused delivery teams for implementation, support, integration, application development, and data-led decisions.",
      viewAllText: "View all services",
      viewAllHref: "/services",
      ctaText: "Learn more",
    },
    {
      id: "products",
      sectionKey: "products",
      eyebrow: "Our Solutions",
      title: "Practical SAP products built for enterprise teams.",
      description:
        "Explore Trijotech solutions designed to simplify operations, improve reporting, and support business-critical SAP workflows.",
      viewAllText: "View all solutions",
      viewAllHref: "/solutions",
      ctaText: "Explore product",
    },
    {
      id: "whyChooseUs",
      sectionKey: "whyChooseUs",
      eyebrow: "Why Choose Us",
      title: "SAP expertise built around business outcomes.",
      description:
        "We combine certified SAP talent, business understanding, and structured delivery practices to help enterprises modernize with confidence.",
    },
    {
      id: "sapCapabilities",
      sectionKey: "sapCapabilities",
      eyebrow: "SAP Ecosystem",
      title: "One connected ecosystem across the SAP landscape.",
      description:
        "Trijotech works across the SAP stack — core ERP, analytics, finance, platform services, and managed support — so your systems stay connected and your teams keep full visibility.",
      ctaText: "Explore our services",
      ctaHref: "/services",
    },
    {
      id: "industries",
      sectionKey: "industries",
      eyebrow: "Industries",
      title: "SAP solutions shaped around industry needs.",
      description:
        "We help organizations modernize operations, reporting, planning, and decision-making across industries with practical SAP expertise.",
      viewAllText: "Explore All Industries",
      viewAllHref: "/industries/retail-supply-chain",
      ctaText: "Explore industry",
    },
    {
      id: "testimonials",
      sectionKey: "testimonials",
      eyebrow: "Testimonials",
      title: "Trusted by teams modernizing with SAP.",
      description:
        "Hear from clients who rely on Trijotech for practical delivery, clear communication, and measurable business outcomes.",
    },
    {
      id: "insights",
      sectionKey: "insights",
      eyebrow: "Insights",
      title: "Practical SAP thinking in blogs and videos.",
      description:
        "Explore SAP, data, cloud, finance, and transformation ideas from the Trijotech team.",
      viewAllText: "View all blogs",
      ctaText: "Read blog",
      customData: {
        blogsTabLabel: "Blogs",
        videosTabLabel: "Videos",
        viewAllBlogsText: "View all blogs",
        viewAllVideosText: "View all videos",
        readBlogText: "Read blog",
        watchVideoText: "Watch video",
      },
    },
  ];

  for (const cfg of sectionConfigs) {
    await prisma.homepageSectionConfig.upsert({
      where: { sectionKey: cfg.sectionKey },
      update: cfg,
      create: cfg,
    });
  }
  console.log(`✓ Seeded ${sectionConfigs.length} Section Configs into "homepage_section_configs" table.`);

  console.log("\n✅ All relational tables populated successfully in PostgreSQL!");
}

main()
  .catch((e) => {
    console.error("Failed to seed relational tables:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
