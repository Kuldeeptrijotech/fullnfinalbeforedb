const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  console.log("Starting Complete Database Migration to PostgreSQL (trijotech-nextjs)...");

  // ==========================================
  // 1. GLOBAL NAVIGATION & BRAND (header-data.json)
  // ==========================================
  console.log("1. Seeding Header Navigation & Dropdowns...");
  const headerNavData = [
    {
      name: "Home",
      type: "link",
      href: "/",
      description: "Return to the Trijotech homepage. Discover our solutions, services, insights, and company updates in one place.",
      sortOrder: 0,
      items: [],
    },
    {
      name: "Solutions",
      type: "dropdown",
      href: "/solutions",
      description: "Explore Trijotech products built for modern business operations. Find tools that simplify compliance, finance, reporting, and performance management.",
      sortOrder: 1,
      items: [
        {
          name: "E-Invoicing Pro",
          href: "/solutions/e-invoicing-pro",
          description: "Automate e-invoicing workflows with accuracy and compliance. Streamline invoice generation, validation, submission, and tracking for your business.",
          hasImage: true,
          imageUrl: "/assets/heroes/products-blue.png",
          sortOrder: 0,
        },
        {
          name: "Finlagoon Consolidation",
          href: "/solutions/finlagoon-consolidation",
          description: "Simplify financial consolidation across entities and reporting structures. Gain clearer visibility into group performance with faster, more reliable reporting.",
          hasImage: true,
          imageUrl: "/assets/heroes/industry-blue.png",
          sortOrder: 1,
        },
        {
          name: "Profitability Pro",
          href: "/solutions/profitability-pro",
          description: "Analyze profitability across products, customers, regions, and business units. Turn financial data into actionable insights for better decision-making.",
          hasImage: true,
          imageUrl: "/assets/image/Product_4.png",
          sortOrder: 2,
        },
      ],
    },
    {
      name: "Services",
      type: "dropdown",
      href: "/services",
      description: "Discover technology services designed for modern teams and enterprises. From SAP consulting to cloud applications, we help businesses build scalable digital systems.",
      sortOrder: 2,
      items: [
        {
          name: "SAP Consulting",
          href: "/services/sap-consulting",
          description: "Plan, implement, integrate, and optimize SAP solutions for your organization. Improve business processes with expert guidance across ERP and enterprise systems.",
          hasImage: true,
          imageUrl: "/assets/heroes/sap-implementation-blue.png",
          sortOrder: 0,
        },
        {
          name: "SAP Support & AMS",
          href: "/services/sap-support",
          description: "Keep your SAP systems stable, secure, and continuously optimized. Our application management support helps reduce downtime and improve operational efficiency.",
          hasImage: true,
          imageUrl: "/assets/heroes/sap-support-blue.png",
          sortOrder: 1,
        },
        {
          name: "SAP BTP Full Stack Applications",
          href: "/services/sap-btp-full-stack",
          description: "Build scalable full-stack applications on SAP Business Technology Platform. Create modern portals, workflows, extensions, and integrations tailored to your business.",
          hasImage: true,
          imageUrl: "/assets/heroes/sap-btp-full-stack-blue.png",
          sortOrder: 2,
        },
        {
          name: "SAP Data Integration & Migration",
          href: "/services/sap-data-integration",
          description: "Move, transform, and integrate business data across SAP and non-SAP systems. Ensure secure migration, clean data structures, and reliable connectivity across platforms.",
          hasImage: true,
          imageUrl: "/assets/heroes/sap-data-integration-blue.png",
          sortOrder: 3,
        },
        {
          name: "SAP AI & Data Insight Services",
          href: "/services/sap-ai-ml",
          description: "Unlock business value from data using analytics, automation, and AI-driven insights. Turn complex enterprise information into smarter decisions and measurable outcomes.",
          hasImage: true,
          imageUrl: "/assets/heroes/sap-ai-ml-blue.png",
          sortOrder: 4,
        },
      ],
    },
    {
      name: "Industries",
      type: "dropdown",
      href: "/industries/retail-supply-chain",
      description: "Explore industry-focused solutions tailored to specific business challenges. We help organizations modernize operations, reporting, compliance, and customer experiences.",
      sortOrder: 3,
      items: [
        {
          name: "Retail & Supply Chain",
          href: "/industries/retail-supply-chain",
          description: "Digitize commerce, inventory, procurement, and supply chain operations. Improve visibility, forecasting, fulfillment, and decision-making across retail networks.",
          hasImage: true,
          imageUrl: "/static/Retail_and_supply_chain_image.png",
          sortOrder: 0,
        },
        {
          name: "Pharmaceuticals & Life Sciences",
          href: "/industries/pharmaceuticals-life-sciences",
          description: "Support regulated operations with reliable digital workflows and reporting systems. Improve traceability, compliance, quality control, and data-driven decision-making.",
          hasImage: true,
          imageUrl: "/static/Pharma.jpg",
          sortOrder: 1,
        },
        {
          name: "Manufacturing",
          href: "/industries/manufacturing",
          description: "Modernize production, planning, procurement, and shop-floor visibility. Improve efficiency with connected systems, accurate reporting, and streamlined operations.",
          hasImage: true,
          imageUrl: "/static/Manufacturing.jpg",
          sortOrder: 2,
        },
        {
          name: "Fintech",
          href: "/industries/fintech",
          description: "Build secure, scalable, and data-driven financial technology platforms. Enhance compliance, reporting, integrations, and customer-facing digital experiences.",
          hasImage: true,
          imageUrl: "/static/FinTech.jpg",
          sortOrder: 3,
        },
        {
          name: "Entertainment",
          href: "/industries/entertainment",
          description: "Enable digital workflows for media, content, production, and audience operations. Improve reporting, revenue tracking, collaboration, and business performance visibility.",
          hasImage: true,
          imageUrl: "/static/Entertainment.jpg",
          sortOrder: 4,
        },
        {
          name: "Steel Manufacturing",
          href: "/industries/steel-manufacturing",
          description: "Optimize steel production, procurement, logistics, and financial reporting processes. Improve operational control with integrated systems and real-time business insights.",
          hasImage: true,
          imageUrl: "/static/Steel_Manufacturing.jpg",
          sortOrder: 5,
        },
        {
          name: "Telecommunications",
          href: "/industries/telecommunications",
          description: "Support telecom operations with scalable systems for finance, data, and service workflows. Improve customer operations, reporting, integrations, and enterprise process efficiency.",
          hasImage: true,
          imageUrl: "/static/Telecommunication.jpg",
          sortOrder: 6,
        },
      ],
    },
    {
      name: "Insights",
      type: "dropdown",
      href: "/insights",
      description: "Read Trijotech insights, updates, and practical technology perspectives. Explore blogs, case studies, and videos that share ideas, outcomes, and industry knowledge.",
      sortOrder: 4,
      items: [
        {
          name: "Blogs",
          href: "/blogs",
          description: "Read expert articles on SAP, enterprise technology, digital transformation, and analytics. Stay informed with practical ideas, trends, and implementation guidance.",
          hasImage: true,
          imageUrl: "/assets/heroes/blogs-blue.png",
          sortOrder: 0,
        },
        {
          name: "Case Studies",
          href: "/case-studies",
          description: "Explore real-world examples of how Trijotech solves business challenges. See project outcomes, solution approaches, and measurable transformation results.",
          hasImage: true,
          imageUrl: "/assets/case-studies/financial-analysis-team.png",
          sortOrder: 1,
        },
        {
          name: "Videos",
          href: "/videos",
          description: "Watch product explainers, service overviews, and technology insights from Trijotech. Learn through visual content designed to simplify complex business and SAP topics.",
          hasImage: true,
          imageUrl: "/assets/heroes/videos-camera-hero.png",
          sortOrder: 2,
        },
      ],
    },
    {
      name: "Corporate",
      type: "dropdown",
      href: "/about-us",
      description: "Learn more about Trijotech, our people, careers, and contact options. Connect with our team and discover how we support businesses through technology.",
      sortOrder: 5,
      items: [
        {
          name: "About Us",
          href: "/about-us",
          description: "Learn about Trijotech's mission, experience, capabilities, and approach to technology. Discover how we help organizations modernize systems and achieve business goals.",
          hasImage: true,
          imageUrl: "/assets/about/trijotech-team-collaboration-blue.png",
          sortOrder: 0,
        },
        {
          name: "Careers",
          href: "/careers",
          description: "Explore career opportunities with Trijotech across technology, consulting, and delivery roles. Join a team focused on innovation, learning, and meaningful client impact.",
          hasImage: true,
          imageUrl: "/assets/heroes/careers-generated-v2.png",
          sortOrder: 1,
        },
        {
          name: "Contact Us",
          href: "/contact",
          description: "Get in touch with Trijotech for product, service, partnership, or support inquiries. Share your requirements and our team will help you find the right solution.",
          hasImage: true,
          imageUrl: "/assets/heroes/contact-generated-v2.png",
          sortOrder: 2,
        },
      ],
    },
  ];

  await prisma.headerDropdownItem.deleteMany({});
  await prisma.headerNavItem.deleteMany({});

  for (const nav of headerNavData) {
    const parent = await prisma.headerNavItem.create({
      data: {
        name: nav.name,
        type: nav.type,
        href: nav.href,
        description: nav.description,
        sortOrder: nav.sortOrder,
      },
    });

    for (const item of nav.items) {
      await prisma.headerDropdownItem.create({
        data: {
          navItemId: parent.id,
          name: item.name,
          href: item.href,
          description: item.description,
          hasImage: item.hasImage,
          imageUrl: item.imageUrl,
          sortOrder: item.sortOrder,
        },
      });
    }
  }

  // ==========================================
  // 2. SITE CONFIG & FOOTER (site-data.ts)
  // ==========================================
  console.log("2. Seeding Site Config & Footer Settings...");
  const siteConfigData = {
    brand: {
      name: "Trijotech",
      homeHref: "/",
      logoSrc: "/brand/Trijotech_Complete_white.svg",
      logoAlt: "Trijotech",
      ariaLabel: "Trijotech home",
    },
    footer: {
      summary: "Trijotech helps organizations modernize SAP landscapes, data platforms, and cloud applications with practical engineering teams.",
      columns: [
        {
          title: "Useful Links",
          links: [
            { label: "Home", href: "/" },
            { label: "Blogs", href: "/blogs" },
            { label: "Case Studies", href: "/case-studies" },
            { label: "Videos", href: "/videos" },
          ],
        },
        {
          title: "Company",
          links: [
            { label: "Services", href: "/services" },
            { label: "Solutions", href: "/solutions" },
            { label: "Industries", href: "/industries/retail-supply-chain" },
            { label: "Careers", href: "/careers" },
            { label: "Contact", href: "/contact" },
          ],
        },
        {
          title: "Compliance",
          links: [{ label: "Privacy Policy", href: "/privacy-policy" }],
        },
      ],
      contact: {
        email: "sales@trijotech.com",
        phones: [
          { label: "+91 120-3506433", href: "tel:+911203506433" },
          { label: "+91 7982531976", href: "tel:+917982531976" },
        ],
        addresses: [
          {
            title: "Corporate Address",
            lines: ["C56A, Infinity Technopark, 501, 16, C Block,", "Phase 2, Sector 62, Noida,", "Uttar Pradesh 201309"],
          },
          {
            title: "Registered Address",
            lines: ["House No. 74, 2nd Floor, Block B,", "Pocket 6, Sector 7, Rohini,", "North West Delhi - 110085"],
          },
        ],
      },
      badges: [
        { label: "Trijotech Software Consulting Pvt Ltd", src: "/static/footer/trijotech-footer-logo.png", width: 500, height: 289 },
        { label: "SAP Partner", src: "/static/footer/sap-partner-logo.png", width: 130, height: 65 },
        { label: "ISO certifications", src: "/static/footer/iso-certifications.png", width: 135, height: 65 },
      ],
      socialLinks: [
        { label: "YouTube", href: "https://www.youtube.com/@trijotech" },
        { label: "LinkedIn", href: "https://www.linkedin.com/company/trijotech/" },
        { label: "X", href: "https://x.com/trijotech" },
      ],
    },
  };

  await prisma.siteConfigSetting.upsert({
    where: { key: "global_site_config" },
    update: { value: siteConfigData, description: "Global brand and footer configuration" },
    create: { id: "global_site_config", key: "global_site_config", value: siteConfigData, description: "Global brand and footer configuration" },
  });

  const insightCards = [
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

  await prisma.homepageSectionConfig.upsert({
    where: { sectionKey: "insights" },
    update: {
      title: "Practical perspectives on SAP & enterprise growth",
      description: "Explore blogs, case studies, and videos covering SAP transformation, cloud architecture, financial planning, integration, and data-driven execution.",
      customData: { cards: insightCards },
    },
    create: {
      id: "insights",
      sectionKey: "insights",
      title: "Practical perspectives on SAP & enterprise growth",
      description: "Explore blogs, case studies, and videos covering SAP transformation, cloud architecture, financial planning, integration, and data-driven execution.",
      customData: { cards: insightCards },
    },
  });

  // ==========================================
  // 3. ABOUT US PAGE
  // ==========================================
  console.log("3. Seeding About Us Page...");
  const aboutPillars = [
    {
      icon: "Layers",
      title: "Full-Stack SAP Architecture",
      description: "Deep expertise spanning SAP S/4HANA, BTP, SAC, PaPM, and BW/4HANA integration.",
    },
    {
      icon: "Network",
      title: "Connected Data & Governance",
      description: "Unifying transactional systems and analytical models for trusted decision-making.",
    },
    {
      icon: "ShieldCheck",
      title: "Accountable Delivery Ownership",
      description: "Dedicated consultant teams staying close to outcomes from strategy to run-phase.",
    },
    {
      icon: "Users",
      title: "True Collaborative Partnership",
      description: "Transparent knowledge transfer and long-term client enablement at every milestone.",
    },
  ];

  const aboutMetrics = [
    { value: "9+", label: "Years Experience" },
    { value: "100%", label: "Delivery Ownership" },
    { value: "Global", label: "Enterprise Reach" },
  ];

  await prisma.aboutUsPageConfig.upsert({
    where: { id: "default" },
    update: {
      heroTitle: "Technology shaped around real outcomes",
      heroSubtitle: "We help enterprises modernize SAP landscapes, integrate critical data, and turn technology investments into sustainable business advantage.",
      heroImage: "/assets/about/trijotech-team-collaboration-blue.png",
      whoWeAreTitle: "Deep expertise, close collaboration",
      whoWeAreDescription1: "Trijotech was founded on a simple principle: enterprise technology should create measurable business outcomes, not unnecessary complexity.",
      whoWeAreDescription2: "We are practitioners, architects, and problem solvers who take ownership of critical systems — from architecture design and integration to ongoing AMS support.",
      expertiseNote: "Expertise shaped around measurable business value",
      pillars: aboutPillars,
      metrics: aboutMetrics,
    },
    create: {
      id: "default",
      heroTitle: "Technology shaped around real outcomes",
      heroSubtitle: "We help enterprises modernize SAP landscapes, integrate critical data, and turn technology investments into sustainable business advantage.",
      heroImage: "/assets/about/trijotech-team-collaboration-blue.png",
      whoWeAreTitle: "Deep expertise, close collaboration",
      whoWeAreDescription1: "Trijotech was founded on a simple principle: enterprise technology should create measurable business outcomes, not unnecessary complexity.",
      whoWeAreDescription2: "We are practitioners, architects, and problem solvers who take ownership of critical systems — from architecture design and integration to ongoing AMS support.",
      expertiseNote: "Expertise shaped around measurable business value",
      pillars: aboutPillars,
      metrics: aboutMetrics,
    },
  });

  const aboutPurposes = [
    {
      label: "Our Vision",
      title: "Be the trusted SAP and technology partner for modern enterprises.",
      text: "We envision a future where enterprise systems are agile, cloud-ready, and deeply integrated to drive continuous competitive advantage.",
      sortOrder: 0,
    },
    {
      label: "Our Mission",
      title: "Empower teams through scalable architecture and dedicated delivery ownership.",
      text: "Our mission is to help clients solve complex business challenges with high-performing SAP architectures, intelligent data solutions, and long-term partnership.",
      sortOrder: 1,
    },
    {
      label: "Our Goals",
      title: "Deliver measurable value, build lasting partnerships.",
      text: "We focus on measurable outcomes, long-term client success, and continuous innovation on every engagement.",
      sortOrder: 2,
    },
  ];

  await prisma.aboutUsPurpose.deleteMany({});
  for (const p of aboutPurposes) {
    await prisma.aboutUsPurpose.create({ data: p });
  }

  const aboutValues = [
    {
      number: "01",
      title: "Own the Outcome",
      description: "We take responsibility from the first conversation through delivery, adoption, and measurable business value.",
      sortOrder: 0,
    },
    {
      number: "02",
      title: "Keep It Practical",
      description: "We turn complex SAP and data challenges into clear, maintainable solutions that teams can confidently use.",
      sortOrder: 1,
    },
    {
      number: "03",
      title: "Build Together",
      description: "We work as an extension of your team, sharing knowledge and making decisions with transparency at every stage.",
      sortOrder: 2,
    },
  ];

  await prisma.aboutUsValue.deleteMany({});
  for (const v of aboutValues) {
    await prisma.aboutUsValue.create({ data: v });
  }

  const leadership = [
    {
      name: "Rakesh Kumar",
      role: "Managing Director",
      image: "",
      description: "Rakesh leads Trijotech with vision, strategic direction, and a practical focus on SAP transformation that delivers measurable value.",
      sortOrder: 0,
    },
    {
      name: "Rakesh Shah",
      role: "Managing Director",
      image: "/assets/images/team_02.jpg",
      description: "Rakesh guides delivery excellence, enterprise architecture, and technical execution across major client programs.",
      sortOrder: 1,
    },
    {
      name: "Rajesh Soni",
      role: "Director of Delivery",
      image: "/assets/images/team_03.jpg",
      description: "Rajesh oversees delivery teams, quality standards, and program governance to keep projects predictable and on track.",
      sortOrder: 2,
    },
  ];

  await prisma.leadershipMember.deleteMany({});
  for (const l of leadership) {
    await prisma.leadershipMember.create({ data: l });
  }

  // ==========================================
  // 4. DETAILED SERVICES (service_details)
  // ==========================================
  console.log("4. Seeding Service Details...");
  const serviceDetails = [
    {
      slug: "sap-consulting",
      title: "SAP Consulting",
      subtitle: "Enterprise architecture, roadmap and business process optimization",
      number: "01",
      description: "End-to-end SAP transformation and consulting that aligns consolidation, planning, forecasting, analytics, and profitability processes with business goals.",
      heroImage: "/assets/heroes/sap-implementation-blue.png",
      bannerImage: "/assets/services/service_consulting_transparent.png",
      enables: ["Implementation Strategy", "Architecture & Configuration", "Planning & Forecasting", "Analytics & Reporting", "Process Optimization"],
      deliverables: ["Target Architecture Blueprint", "System Sizing & Readiness Report", "Process Fit-Gap Matrix", "Phase-Wise Execution Plan"],
      benefits: ["Accelerate time-to-value", "Minimize implementation risk", "Standardize core processes", "Increase executive visibility"],
      tools: ["SAP S/4HANA", "SAP Activate Methodology", "SAP Signavio", "SAP Solution Manager"],
      metaData: {
        steps: [
          { n: "01", label: "Assess & plan", icon: "Target" },
          { n: "02", label: "Configure", icon: "Cog" },
          { n: "03", label: "Develop & test", icon: "Code2" },
          { n: "04", label: "Migrate data", icon: "Database" },
          { n: "05", label: "Go-live & optimize", icon: "Rocket" },
        ],
        stack: [
          { label: "Strategy & Governance", desc: "Roadmaps, delivery models, and governance that keep transformation on track.", icon: "ShieldCheck" },
          { label: "SAP Solutions", desc: "S/4HANA, consolidation, planning, and analytics built around your business.", icon: "Server" },
          { label: "Platform & Clean Core", desc: "BTP extensions that keep the core standard, stable, and upgrade-ready.", icon: "Layers" },
          { label: "Data & Foundation", desc: "A trusted data backbone that powers reporting and intelligent decisions.", icon: "Database" },
        ],
        extensions: ["Consolidation", "Planning", "Analytics", "Automation", "Integrations", "Profitability"],
        pillars: [
          {
            tag: "Advisory & Roadmap",
            title: "S/4HANA Transformation",
            desc: "Tailored migration pathways (Greenfield, Brownfield, or Selective) with clear ROI modeling and clean core architecture.",
            icon: "Target",
          },
          {
            tag: "Process Optimization",
            title: "Standardized Operations",
            desc: "Align enterprise workflows with SAP standard best practices, reducing complexity and costly custom code.",
            icon: "Cog",
          },
          {
            tag: "Decision Intelligence",
            title: "Consolidated Analytics",
            desc: "Unify financial reporting, group consolidation, and real-time FP&A forecasts with SAP Analytics Cloud.",
            icon: "Database",
          },
          {
            tag: "Delivery Governance",
            title: "De-risked Execution",
            desc: "Rigorous testing, cutover management, data reconciliation, and user adoption for predictable go-lives.",
            icon: "ShieldCheck",
          },
        ],
        metrics: [
          { value: "9+", label: "Years Experience" },
          { value: "100+", label: "Projects Delivered" },
          { value: "100%", label: "Delivery Ownership" },
        ],
      },
      sortOrder: 0,
    },
    {
      slug: "sap-support",
      title: "SAP Support & AMS",
      subtitle: "24/7 proactive monitoring, continuous optimization and SLA governance",
      number: "02",
      description: "Reliable functional and technical support that keeps SAP landscapes stable, current, efficient, and ready for evolving business needs.",
      heroImage: "/assets/heroes/sap-support-blue.png",
      bannerImage: "/assets/services/service_support_transparent.png",
      enables: ["Functional & Technical Support", "Post-Go-Live Stabilization", "Upgrades & Enhancements", "Performance Optimization", "24*7 SLA Management"],
      deliverables: ["24/7 Tier 1-3 Support", "Monthly SLA Performance Reports", "Root Cause Analysis (RCA)", "Security Patching & Release Management"],
      benefits: ["99.9% uptime for core business processes", "Predictable maintenance costs", "Faster incident resolution", "Continuous compliance audits"],
      tools: ["SAP Solution Manager", "ServiceNow Integration", "SAP EarlyWatch Alert", "SAP Cloud ALM"],
      metaData: {
        pillars: [
          { label: "Monitor", desc: "Proactive 24*7 monitoring keeps critical processes visible before issues surface.", icon: "Activity" },
          { label: "Respond", desc: "SLAs, triage, and deep expertise resolve incidents quickly across every layer.", icon: "Headphones" },
          { label: "Improve", desc: "Structured enhancements help the landscape evolve with the business.", icon: "TrendingUp" },
        ],
        process: [
          { label: "Detect", icon: "Activity", tone: "#38bdf8" },
          { label: "Triage", icon: "SearchCheck", tone: "#ffffff" },
          { label: "Resolve", icon: "Wrench", tone: "#22d3ee" },
          { label: "Verify", icon: "RefreshCw", tone: "#67e8f9" },
          { label: "Improve", icon: "TrendingUp", tone: "#ffffff" },
        ],
        metrics: [
          { value: "24*7*365", label: "Global Coverage" },
          { value: "<15 min", label: "Critical SLA Response" },
          { value: "99.9%", label: "System Availability" },
        ],
      },
      sortOrder: 1,
    },
    {
      slug: "sap-btp-full-stack",
      title: "SAP BTP Full Stack Applications",
      subtitle: "Cloud-native portal engineering, CAP/RAP extensions and Fiori UX",
      number: "03",
      description: "Modern applications, extensions, workflows, and integrations built on SAP BTP to make enterprise work simpler and faster.",
      heroImage: "/assets/heroes/sap-btp-full-stack-blue.png",
      bannerImage: "/assets/services/service_btp_transparent.png",
      enables: ["SAP Fiori & UI5 Modernization", "Process Automation & Workflows", "Full-Stack Cloud Extensions", "Embedded Intelligence", "Multi-Cloud Integration"],
      deliverables: ["Custom BTP Apps & Portal Extensions", "SAP Build Process Automations", "Side-by-Side Clean Core Architecture", "Modern Fiori / UI5 Design System"],
      benefits: ["Clean Core keeping ERP upgrade-ready", "Rapid cross-department automation", "Responsive mobile-first user experience", "Seamless single sign-on"],
      tools: ["SAP BTP", "Cloud Application Programming (CAP)", "RESTful Application Programming (RAP)", "SAP Fiori / UI5"],
      metaData: {
        tracks: [
          { label: "Applications", desc: "Cloud-native apps built around specific business needs — without disrupting the core.", icon: "LayoutDashboard" },
          { label: "Extensions", desc: "Upgrade-ready side-by-side extensions using SAP Extension Suite.", icon: "Puzzle" },
          { label: "Experiences", desc: "Intuitive Fiori and UI5 interfaces that lift productivity and adoption.", icon: "MousePointerClick" },
        ],
        triplets: [
          { label: "Integration", desc: "Governed APIs, events, and connectors that unify SAP and third-party systems.", icon: "Plug" },
          { label: "Data", desc: "Model and expose enterprise data for responsive, real-time applications.", icon: "Database" },
          { label: "AI", desc: "Embed intelligence and automation into the experiences you build.", icon: "Brain" },
        ],
        metrics: [
          { value: "Clean Core", label: "Architecture Compliant" },
          { value: "Full-Stack", label: "CAP, RAP, UI5 & Fiori" },
          { value: "Secure", label: "Enterprise BTP Runtime" },
        ],
      },
      sortOrder: 2,
    },
    {
      slug: "sap-data-integration",
      title: "SAP Data Integration Services",
      subtitle: "Real-time middleware, cloud integrations and high-volume data pipelines",
      number: "04",
      description: "Secure, scalable interfaces connecting SAP and non-SAP systems through SAP PI/PO, Cloud Integration, APIs, and enterprise protocols.",
      heroImage: "/assets/heroes/sap-data-integration-blue.png",
      bannerImage: "/assets/services/service_data_integration_transparent.png",
      enables: ["SAP CPI & PI/PO Integration", "API & Middleware Management", "Data Migration & Replication", "Hybrid Cloud Connectivity", "Real-Time Event Streaming"],
      deliverables: ["Standardized API & iFlow Catalog", "Automated Data Validation Scripts", "Error Handling & Alerting Framework", "Migration & Cutover Playbooks"],
      benefits: ["Break data silos across third-party tools", "Zero manual data re-keying", "Low-latency transactional sync", "High auditability"],
      tools: ["SAP Integration Suite (CPI)", "SAP PI/PO", "SAP Event Mesh", "OData & REST APIs"],
      metaData: {
        pillars: [
          { label: "Cloud Integration", desc: "Secure interfaces connecting SAP and non-SAP applications via SAP Integration Suite.", icon: "Network" },
          { label: "API Management", desc: "Governed, cataloged, and reusable APIs for high-throughput enterprise communication.", icon: "Boxes" },
          { label: "Migration & ETL", desc: "Structured migration tooling, cutover execution, and data validation protocols.", icon: "Database" },
        ],
        metrics: [
          { value: "100M+", label: "Monthly Transactions" },
          { value: "Real-Time", label: "Event Streaming" },
          { value: "Zero-Loss", label: "Data Reconciliation" },
        ],
      },
      sortOrder: 3,
    },
    {
      slug: "sap-ai-ml",
      title: "SAP AI & Data Insight Services",
      subtitle: "Predictive analytics, SAC planning and AI-assisted enterprise decisions",
      number: "05",
      description: "AI, predictive analytics, automation, and intelligent insights embedded into core SAP operations and decision-making.",
      heroImage: "/assets/heroes/sap-ai-ml-blue.png",
      bannerImage: "/assets/services/service_ai_analytics_transparent.png",
      enables: ["SAP Business AI & Copilots", "Predictive Financial Analytics", "Intelligent Process Automation", "Machine Learning Pipelines", "Executive Data Insights"],
      deliverables: ["SAC Executive Dashboards", "PaPM Profitability Models", "Predictive Forecasting Algorithms", "Automated Anomaly Detection Systems"],
      benefits: ["Proactive risk mitigation", "Faster financial close cycles", "Scenario-based financial simulations", "Actionable executive KPIs"],
      tools: ["SAP Analytics Cloud (SAC)", "SAP PaPM", "SAP Datasphere", "SAP Joule & Generative AI"],
      metaData: {
        pillars: [
          { label: "Predictive Analytics", desc: "Machine learning pipelines projecting cash flows, revenue drivers, and supply chain trends.", icon: "Sparkles" },
          { label: "SAP Analytics Cloud", desc: "Executive boards, KPI dashboards, and live business analytics.", icon: "BarChart3" },
          { label: "PaPM Profitability", desc: "Multi-dimensional margin allocations across products, channels, and business units.", icon: "Layers" },
        ],
        metrics: [
          { value: "Real-Time", label: "Predictive Inference" },
          { value: "Granular", label: "Profitability Margins" },
          { value: "AI Powered", label: "Copilots & SAC" },
        ],
      },
      sortOrder: 4,
    },
  ];

  for (const s of serviceDetails) {
    await prisma.serviceDetail.upsert({
      where: { slug: s.slug },
      update: s,
      create: s,
    });
  }

  // ==========================================
  // 5. DETAILED SOLUTIONS (solution_details)
  // ==========================================
  console.log("5. Seeding Solution Details...");
  const solutionDetails = [
    {
      slug: "e-invoicing-pro",
      title: "E-Invoicing Pro",
      eyebrow: "E-INVOICING PRO",
      subtitle: "Simplify compliant invoicing from SAP to government portals.",
      description: "Keep up with government mandates and eliminate manual errors with our end-to-end e-invoicing solution. Whether you are on public or private cloud, E-Invoicing Pro ensures seamless compliance and real-time invoice tracking.",
      shortDescription: "E-Invoicing Pro simplifies compliant electronic invoicing with direct portal integration, automated processing and real-time invoice tracking across SAP environments.",
      image: "/static/Hero-Animation-1.mp4",
      imageAlt: "E-invoicing compliance and SAP integration",
      heroImage: "/assets/heroes/products-blue.png",
      cardImage: "/assets/heroes/e-invoicing-generated-v2.png",
      overviewTitle: "Overview",
      overview: "E-Invoicing Pro enables seamless compliance through direct integration with government portals, reducing manual effort and errors. Compatible with SAP S/4HANA Public and Private Cloud, the solution is secure, scalable, and built on SAP standards. Real-time tracking ensures full visibility into the invoicing process — from submission through approval.",
      highlights: [
        "Direct government portal integration for compliant invoicing.",
        "SAP S/4HANA-ready automated invoice processing.",
        "Real-time status tracking, approvals, and audit history.",
      ],
      features: [
        "Automated invoice validation and submission.",
        "Support for both public and private cloud SAP landscapes.",
        "Compliance workflows tailored to local regulations.",
        "Dashboard visibility for approvals, exceptions, and settlement status.",
      ],
      featureCards: [
        { title: "SAP S/4HANA Integration", description: "Hassle-free deployment across public and private cloud." },
        { title: "Government Portal Integration", description: "Send invoices for approval directly to mandated portals." },
        { title: "Real-Time Tracking", description: "Full visibility into invoice status from submit to approval." },
        { title: "Regulatory Compliance", description: "Stay aligned with evolving e-invoicing tax regulations." },
      ],
      sections: [
        {
          title: "Why Choose E-Invoicing Pro",
          description: "A purpose-built invoicing layer that removes licensing friction, hidden cost and manual hand-offs — while staying native to SAP.",
          items: [
            { title: "Eliminate Expensive Licensing Fees", description: "Reduce costs significantly compared with traditional licensed e-invoicing add-ons." },
            { title: "Seamless SAP S/4HANA Integration", description: "Hassle-free deployment on S/4HANA Public and Private Cloud, built on SAP standards." },
            { title: "Automated End-to-End Workflow", description: "From invoice submission to approval tracking, without spreadsheet workarounds." },
            { title: "No Hidden Costs", description: "High ROI with complete commercial transparency across the invoicing lifecycle." },
            { title: "User-Centric Design", description: "Minimal training required for quick adoption by finance and AP teams." },
          ],
        },
        {
          title: "Key Capabilities",
          description: "Everything required to run compliant electronic invoicing at enterprise scale.",
          items: [
            { title: "SAP S/4HANA Integration", description: "Native fit for S/4HANA public and private cloud, with secure, scalable SAP-standard architecture." },
            { title: "Automated Workflow", description: "End-to-end automation from invoice creation and submission through approval tracking." },
            { title: "Government Portal Integration", description: "Direct portal connectivity so invoices can be sent for approval without manual re-keying." },
            { title: "Real-Time Approval & Tracking", description: "Instant status updates give finance teams live visibility into every invoice." },
            { title: "Mass Invoice Processing", description: "Process, print or email invoices in bulk to keep high-volume operations moving." },
            { title: "Regulatory Compliance", description: "Stay compliant with evolving government e-invoicing and tax regulations." },
          ],
        },
      ],
      benefits: [
        "Reduced manual processing across the invoice lifecycle",
        "Fewer invoicing errors and less rework",
        "Better compliance with government mandates",
        "Faster turnaround on billing cycles",
        "Full audit trails with timestamped proof of submission",
      ],
      outcomesTitle: "Business Outcomes",
      sortOrder: 0,
    },
    {
      slug: "profitability-pro",
      title: "Profitability Pro",
      eyebrow: "PROFITABILITY PRO",
      subtitle: "Granular profitability and cost analysis built on SAP PaPM and SAC.",
      description: "Profitability Pro helps finance leaders analyze profitability across products, customers, channels, and business units with fast multi-dimensional allocation models.",
      shortDescription: "Granular profitability and cost analysis built on SAP PaPM and SAC for fast multi-dimensional allocation and margin visibility.",
      image: "/static/Hero-Animation-4.webm",
      imageAlt: "Profitability Pro analytics and cost allocation",
      heroImage: "/assets/heroes/products-blue.png",
      cardImage: "/assets/image/Product_4.png",
      overviewTitle: "Overview",
      overview: "Profitability Pro delivers high-speed profitability modeling and cost allocation using SAP Profitability and Performance Management (PaPM) and SAP Analytics Cloud (SAC). It enables finance teams to run complex allocations, simulate what-if scenarios, and understand exact margins at product, customer, and channel levels.",
      highlights: [
        "High-performance cost allocations across multiple dimensions.",
        "Driver-based profitability modeling and simulations.",
        "Interactive SAC executive dashboards for margin analysis.",
      ],
      features: [
        "Activity-based and rule-based cost allocation engines.",
        "Customer, product, and channel margin breakdown.",
        "What-if profitability scenario planning.",
        "Integration with SAP S/4HANA Universal Journal (ACDOCA).",
      ],
      featureCards: [
        { title: "Multi-Dimension Allocation", description: "Allocate indirect and direct costs with precision." },
        { title: "Margin Visibility", description: "Drill into net profitability by product line and customer." },
        { title: "Scenario Simulation", description: "Model price and cost changes in real time." },
        { title: "SAC Reporting", description: "Board-ready interactive dashboards and visual analytics." },
      ],
      sections: [
        {
          title: "Key Capabilities",
          description: "Advanced analytics tools for finance and commercial teams.",
          items: [
            { title: "High-Speed Calculation Engine", description: "Process millions of allocation records in seconds." },
            { title: "Universal Journal Fit", description: "Direct read and write with SAP S/4HANA financial records." },
            { title: "Simulation Workspaces", description: "Test revenue models, pricing changes, and cost fluctuations." },
          ],
        },
      ],
      benefits: [
        "Uncover hidden loss-making products and customer segments",
        "Accelerate period-end profitability reporting",
        "Enable confident, data-backed pricing decisions",
        "Eliminate fragile spreadsheet-based allocation models",
      ],
      outcomesTitle: "Business Outcomes",
      sortOrder: 1,
    },
    {
      slug: "finlagoon-consolidation",
      title: "Finlagoon Consolidation",
      eyebrow: "FINLAGOON CONSOLIDATION",
      subtitle: "Accelerate group reporting and statutory legal consolidation.",
      description: "An automated financial consolidation solution supporting multi-GAAP, currency translation, intercompany elimination, and fast group close.",
      shortDescription: "Automate group reporting and statutory legal consolidation with multi-currency handling and real-time intercompany reconciliation.",
      image: "/static/Hero-Animation-2.mp4",
      imageAlt: "Finlagoon Consolidation and group reporting",
      heroImage: "/assets/heroes/products-blue.png",
      cardImage: "/assets/heroes/industry-blue.png",
      overviewTitle: "Overview",
      overview: "Finlagoon Consolidation streamlines legal and management consolidation across global entities, multiple currencies, and diverse accounting standards (IFRS, US GAAP, local GAAP). It automates intercompany matching, currency conversions, and equity elimination for a faster, audit-ready financial close.",
      highlights: [
        "Automated intercompany reconciliation and eliminations.",
        "Multi-GAAP and multi-currency reporting support.",
        "Audit-ready balance sheet and cash flow consolidation.",
      ],
      features: [
        "Rule-based elimination and equity pickup.",
        "Real-time consolidation status monitor.",
        "Pre-built consolidation report templates.",
        "Automated currency translation with CTA tracking.",
      ],
      featureCards: [
        { title: "Intercompany Elimination", description: "Reconcile balances automatically across entities." },
        { title: "Multi-GAAP Compliance", description: "Generate local statutory and group IFRS reports." },
        { title: "Fast Financial Close", description: "Cut days off the monthly and annual consolidation cycle." },
        { title: "Audit Trail", description: "Full transparency on all elimination and adjustment journal entries." },
      ],
      sections: [
        {
          title: "Key Capabilities",
          description: "Enterprise group reporting simplified.",
          items: [
            { title: "Automated Data Ingestion", description: "Direct connection with SAP and non-SAP entity ledgers." },
            { title: "Consolidation Monitor", description: "Visual milestone tracking for every subsidiary." },
            { title: "Financial Disclosure Reports", description: "Standard balance sheet, P&L, and cash flow outputs." },
          ],
        },
      ],
      benefits: [
        "Cut group closing time by up to 50%",
        "Reduce compliance risk with automated audit trails",
        "Unified reporting across global subsidiaries",
        "Eliminate manual spreadsheet consolidation errors",
      ],
      outcomesTitle: "Business Outcomes",
      sortOrder: 2,
    },
  ];

  for (const sol of solutionDetails) {
    await prisma.solutionDetail.upsert({
      where: { slug: sol.slug },
      update: sol,
      create: sol,
    });
  }

  // ==========================================
  // 6. DETAILED INDUSTRIES (industry_details)
  // ==========================================
  console.log("6. Seeding Industry Details...");
  const industryDetails = [
    {
      slug: "retail-supply-chain",
      title: "Retail & Supply Chain",
      subtitle: "Transforming retail and supply chain operations",
      shortDescription: "Build connected, intelligent and resilient retail and supply chain operations using modern SAP solutions.",
      description: "Trijotech helps retail and supply chain organizations improve planning, inventory visibility, forecasting and operational performance. We connect business and financial data to enable faster and more informed decision-making.",
      heroImage: "/static/Retail_and_supply_chain_image.png",
      services: ["Supply Chain Planning", "Inventory Optimization", "Demand Forecasting", "SAP Analytics", "Business Process Automation", "Real-Time Reporting"],
      benefits: ["Better inventory visibility", "Improved demand forecasting", "Reduced operational inefficiencies", "Faster business decisions"],
      sortOrder: 0,
    },
    {
      slug: "pharmaceuticals-life-sciences",
      title: "Pharmaceuticals & Life Sciences",
      subtitle: "Digital transformation for life sciences",
      shortDescription: "Improve financial planning, analytics and operational efficiency for pharmaceutical and life sciences organizations.",
      description: "We help pharmaceutical organizations connect finance, sales and supply chain information using SAP technologies. Our solutions improve planning, forecasting, reporting accuracy and overall business agility.",
      heroImage: "/static/Pharma.jpg",
      services: ["SAP Analytics Cloud", "Financial Planning", "Budgeting & Forecasting", "Supply Chain Analytics", "Data Integration", "Management Reporting"],
      benefits: ["Improved financial forecasting", "Integrated business information", "Better reporting accuracy", "Faster planning cycles"],
      sortOrder: 1,
    },
    {
      slug: "manufacturing",
      title: "Manufacturing",
      subtitle: "Smarter manufacturing through connected data",
      shortDescription: "Transform manufacturing finance and operations through automation, analytics and SAP technologies.",
      description: "Trijotech enables manufacturing organizations to connect financial and operational information, automate reconciliation and improve management reporting. SAP technologies provide greater transparency and help organizations make faster decisions.",
      heroImage: "/static/Manufacturing.jpg",
      services: ["SAP S/4HANA", "Group Reporting", "Intercompany Reconciliation", "Management Consolidation", "Performance Analytics", "Process Automation"],
      benefits: ["Faster financial close", "Improved reporting accuracy", "Greater financial transparency", "Better operational visibility"],
      sortOrder: 2,
    },
    {
      slug: "fintech",
      title: "Fintech",
      subtitle: "Modern technology for financial businesses",
      shortDescription: "Build agile and scalable financial processes using SAP BTP, analytics and automation.",
      description: "We help fintech and financial services organizations automate workflows, integrate systems and build modern applications on SAP BTP. Our solutions help teams innovate faster while maintaining regulatory compliance and financial control.",
      heroImage: "/static/FinTech.jpg",
      services: ["SAP BTP Applications", "API Integration", "Process Automation", "Financial Analytics", "Custom Workflows", "Reporting Platforms"],
      benefits: ["Scalable business architecture", "Faster product rollouts", "Automated compliance checks", "Real-time financial tracking"],
      sortOrder: 3,
    },
    {
      slug: "oil-and-gas",
      title: "Oil & Gas",
      subtitle: "Connected energy operations and analytics",
      shortDescription: "Real-time asset telemetry, hydrocarbon accounting, emissions compliance, and joint venture analytics.",
      description: "Trijotech provides SAP-driven asset lifecycle tracking, maintenance planning, joint venture accounting, and ESG telemetry for upstream and downstream energy operators.",
      heroImage: "/static/Oil_and_Gas.jpg",
      services: ["Hydrocarbon Accounting", "Joint Venture Management", "Plant Maintenance (SAP PM)", "Sustainability & Emissions Tracking", "Supply Logistics"],
      benefits: ["Reduced equipment downtime", "Accurate joint venture settlements", "Automated regulatory ESG reporting", "Real-time field visibility"],
      sortOrder: 4,
    },
    {
      slug: "healthcare",
      title: "Healthcare",
      subtitle: "Clinical data analytics and hospital resource management",
      shortDescription: "Clinical data analytics, hospital resource planning, and regulatory compliance powered by SAP.",
      description: "We assist healthcare providers and hospital networks with unified procurement, clinical asset tracking, staff scheduling, and compliance reporting.",
      heroImage: "/static/Healthcare.jpg",
      services: ["Hospital Resource Planning", "Medical Inventory Control", "Patient Care Analytics", "Regulatory Audit Compliance", "Billing Modernization"],
      benefits: ["Optimized medical stock levels", "Reduced patient wait times", "HIPAA & privacy compliance", "Integrated healthcare financials"],
      sortOrder: 5,
    },
    {
      slug: "telecommunications",
      title: "Telecommunications",
      subtitle: "Scalable billing, subscriber analytics and network ERP",
      shortDescription: "Enterprise SAP, integration, and reporting solutions for telecom teams managing network infrastructure and subscribers.",
      description: "Trijotech helps telecom operators handle high-volume billing, network asset accounting, churn prediction, and omnichannel subscriber support integration.",
      heroImage: "/static/Telecommunication.jpg",
      services: ["Convergent Charging & Billing", "Subscriber Analytics", "Network Infrastructure Accounting", "Customer Journey Integrations"],
      benefits: ["High-volume revenue assurance", "Reduced subscriber churn", "Accurate network asset depreciation", "Automated multi-channel billing"],
      sortOrder: 6,
    },
    {
      slug: "steel-manufacturing",
      title: "Steel Manufacturing",
      subtitle: "Heavy industry production, materials and KPI telemetry",
      shortDescription: "SAP solutions for complex steel operations, production planning, materials, financial control, and KPI monitoring.",
      description: "We help steel producers manage melt shop schedules, rolling mill inventory, scrap material valuation, and quality control through integrated SAP ERP.",
      heroImage: "/static/Steel_Manufacturing.jpg",
      services: ["Production Planning & Detailed Scheduling (PP/DS)", "Quality Management", "Batch & Heat Tracking", "Plant Maintenance"],
      benefits: ["Minimized yield loss", "Accurate batch traceability", "Optimal furnace scheduling", "Predictable plant maintenance"],
      sortOrder: 7,
    },
    {
      slug: "entertainment",
      title: "Entertainment & Media",
      subtitle: "Content rights, royalties and digital media financial workflows",
      shortDescription: "Digital workflows for media, content, production, and audience operations with real-time reporting.",
      description: "Enable streamlined rights management, automated royalty calculation, production budgeting, and distribution tracking across media platforms.",
      heroImage: "/static/Entertainment.jpg",
      services: ["Rights & Royalty Accounting", "Production Budgeting", "Digital Distribution Integration", "Revenue Analytics"],
      benefits: ["Automated talent royalty payouts", "Accurate production cost tracking", "Real-time streaming analytics", "Streamlined licensing contracts"],
      sortOrder: 8,
    },
  ];

  for (const ind of industryDetails) {
    await prisma.industryDetail.upsert({
      where: { slug: ind.slug },
      update: ind,
      create: ind,
    });
  }

  // ==========================================
  // 7. CAREERS PAGE (career_page_configs & career_culture_pillars)
  // ==========================================
  console.log("7. Seeding Careers Page & Culture Pillars...");
  const careerHighlights = [
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

  const careerPerks = [
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

  const careerMetrics = [
    { value: "100%", label: "Project Ownership" },
    { value: "Global", label: "Enterprise Clients" },
    { value: "5/5", label: "Satisfaction" },
  ];

  await prisma.careerPageConfig.upsert({
    where: { id: "default" },
    update: {
      heroTitle: "Build what matters in enterprise technology",
      heroSubtitle: "Join a team of SAP specialists, data engineers, and problem-solvers who deliver technology that creates lasting value for global enterprises.",
      heroImage: "/assets/heroes/careers-generated-v2.png",
      cultureTitle: "Life at Trijotech",
      cultureSubtitle: "A workplace shaped by autonomy, continuous learning, and pride in delivery.",
      benefits: [
        { title: "High-Impact Programs", description: "Work on large-scale SAP modernization for market leaders." },
        { title: "Continuous Learning", description: "Support for SAP certifications, workshops, and cloud training." },
        { title: "Collaborative Culture", description: "Direct access to leadership and supportive peer mentors." },
        { title: "Flexible Working", description: "Hybrid models designed to support work-life balance." },
      ],
      highlights: careerHighlights,
      perks: careerPerks,
      metrics: careerMetrics,
    },
    create: {
      id: "default",
      heroTitle: "Build what matters in enterprise technology",
      heroSubtitle: "Join a team of SAP specialists, data engineers, and problem-solvers who deliver technology that creates lasting value for global enterprises.",
      heroImage: "/assets/heroes/careers-generated-v2.png",
      cultureTitle: "Life at Trijotech",
      cultureSubtitle: "A workplace shaped by autonomy, continuous learning, and pride in delivery.",
      benefits: [
        { title: "High-Impact Programs", description: "Work on large-scale SAP modernization for market leaders." },
        { title: "Continuous Learning", description: "Support for SAP certifications, workshops, and cloud training." },
        { title: "Collaborative Culture", description: "Direct access to leadership and supportive peer mentors." },
        { title: "Flexible Working", description: "Hybrid models designed to support work-life balance." },
      ],
      highlights: careerHighlights,
      perks: careerPerks,
      metrics: careerMetrics,
    },
  });

  const culturePillars = [
    {
      title: "Continuous Learning & Certification",
      description: "We invest in your growth with sponsored SAP certifications, hands-on labs, and dedicated training time.",
      icon: "GraduationCap",
      image: "/assets/careers/learning-culture.png",
      imageAlt: "Continuous learning and certification at Trijotech",
      tags: ["SAP Certified", "Hands-on Labs", "Mentorship"],
      sortOrder: 0,
    },
    {
      title: "Ownership & Meaningful Impact",
      description: "Take ownership from day one. You work directly with clients to solve challenges that shape enterprise systems.",
      icon: "Target",
      image: "/assets/careers/ownership-culture.png",
      imageAlt: "Ownership and impact",
      tags: ["Direct Client Impact", "Architecture Autonomy", "Results Driven"],
      sortOrder: 1,
    },
    {
      title: "Global Collaboration & Diverse Perspectives",
      description: "Collaborate across regions with consultants in Europe, Asia, and North America on diverse global deployments.",
      icon: "Globe",
      image: "/assets/careers/global-team.png",
      imageAlt: "Global collaboration",
      tags: ["Multi-Region Projects", "Inclusive Teams", "Knowledge Sharing"],
      sortOrder: 2,
    },
  ];

  await prisma.careerCulturePillar.deleteMany({});
  for (const pillar of culturePillars) {
    await prisma.careerCulturePillar.create({ data: pillar });
  }

  // ==========================================
  // 8. CONTACT PAGE (contact_page_configs)
  // ==========================================
  console.log("8. Seeding Contact Page Config & Addresses...");
  const contactCards = [
    {
      icon: "Phone",
      title: "Call us",
      items: [
        { label: "+91 120-3506433", href: "tel:+911203506433", desc: "Corporate Office" },
        { label: "+91 7982531976", href: "tel:+917982531976", desc: "Direct Line" },
      ],
    },
    {
      icon: "Mail",
      title: "Email us",
      items: [
        { label: "sales@trijotech.com", href: "mailto:sales@trijotech.com" },
      ],
    },
    {
      icon: "MapPin",
      title: "Visit us",
      items: [
        { label: "56A, Infinity Tecnopark, 501, 16, C Block, Phase 2, Sector 62, Noida, Uttar Pradesh 201309" },
      ],
    },
  ];

  await prisma.contactPageConfig.upsert({
    where: { id: "default" },
    update: {
      heroTitle: "Let's talk about your next milestone",
      heroSubtitle: "Whether you need SAP implementation, managed support, cloud development, or data integration, our team is ready to help.",
      heroImage: "/assets/heroes/contact-generated-v2.png",
      salesEmail: "sales@trijotech.com",
      careersEmail: "hr@trijotech.com",
      phones: [
        { label: "+91 120-3506433", href: "tel:+911203506433", desc: "Corporate Office" },
        { label: "+91 7982531976", href: "tel:+917982531976", desc: "Direct Line" },
      ],
      addresses: [
        {
          title: "Corporate Address",
          lines: ["C56A, Infinity Technopark, 501, 16, C Block,", "Phase 2, Sector 62, Noida,", "Uttar Pradesh 201309"],
        },
        {
          title: "Registered Address",
          lines: ["House No. 74, 2nd Floor, Block B,", "Pocket 6, Sector 7, Rohini,", "North West Delhi - 110085"],
        },
      ],
      contactCards: contactCards,
      inquiryTypes: ["SAP Consulting", "Support & AMS", "BTP Application Development", "Data & AI Solutions", "General Inquiry"],
    },
    create: {
      id: "default",
      heroTitle: "Let's talk about your next milestone",
      heroSubtitle: "Whether you need SAP implementation, managed support, cloud development, or data integration, our team is ready to help.",
      heroImage: "/assets/heroes/contact-generated-v2.png",
      salesEmail: "sales@trijotech.com",
      careersEmail: "hr@trijotech.com",
      phones: [
        { label: "+91 120-3506433", href: "tel:+911203506433", desc: "Corporate Office" },
        { label: "+91 7982531976", href: "tel:+917982531976", desc: "Direct Line" },
      ],
      addresses: [
        {
          title: "Corporate Address",
          lines: ["C56A, Infinity Technopark, 501, 16, C Block,", "Phase 2, Sector 62, Noida,", "Uttar Pradesh 201309"],
        },
        {
          title: "Registered Address",
          lines: ["House No. 74, 2nd Floor, Block B,", "Pocket 6, Sector 7, Rohini,", "North West Delhi - 110085"],
        },
      ],
      contactCards: contactCards,
      inquiryTypes: ["SAP Consulting", "Support & AMS", "BTP Application Development", "Data & AI Solutions", "General Inquiry"],
    },
  });

  // ==========================================
  // 9. CASE STUDIES (case_studies)
  // ==========================================
  console.log("9. Seeding Case Studies...");
  const caseStudies = [
    {
      slug: "maximizing-roi-s4hana-transformations",
      title: "Maximizing ROI for Large Scale S/4HANA Transformations",
      client: "Global Enterprise Transformation",
      industry: "Enterprise S/4HANA",
      challenge: "Complex multi-country legacy landscape required streamlined processes and innovative SAP tools that ensure a smooth transition with tailored cloud offerings.",
      solution: "Trijotech architected an end-to-end migration strategy with automated cutover workflows, selective data conversion, and clean core extension architecture.",
      outcome: "Achieved unparalleled efficiency, cost-effectiveness, zero unexpected disruption, and accelerated time-to-value across 12 countries.",
      metrics: ["Unparalleled Efficiency", "Zero Core Disruption", "Multi-Country Cloud Conversion"],
      heroImage: "/assets/case-studies/financial-analysis-team.png",
      images: Array.from(
        { length: 25 },
        (_, index) =>
          `/assets/image/Casestudy1_${index === 0 ? "001" : String(index + 1).padStart(index + 1 >= 10 ? 4 : 3, "0")}.png`,
      ),
      sortOrder: 0,
      isPublished: true,
    },
    {
      slug: "sap-sac-financial-planning-pharma",
      title: "SAP SAC Financial Planning for a Major Pharmaceutical Company",
      client: "Leading Pharma Multinational",
      industry: "Pharmaceuticals & Life Sciences",
      challenge: "The pharmaceutical firm required financial planning analyzing data from a complex BW environment across profit centers, business segments, and material costs.",
      solution: "Built integrated financial planning models and live forecasting boards with SAP Analytics Cloud connecting directly to BW/4HANA.",
      outcome: "Turned deep data analysis into agile, real-time budgeting that effectively supported the company's long-term financial planning objectives.",
      metrics: ["Live BW/4HANA Sync", "Granular Cost Planning", "Agile Budgeting"],
      heroImage: "/assets/case-studies/financial-analysis-team.png",
      images: Array.from(
        { length: 8 },
        (_, index) =>
          `/assets/image/Casestudy2_${String(index + 1).padStart(3, "0")}.jpg`,
      ),
      sortOrder: 1,
      isPublished: true,
    },
    {
      slug: "elevate-business-sap-papm",
      title: "Elevate Your Business with SAP Profitability & Performance Management (PaPM)",
      client: "Commercial Enterprise Group",
      industry: "Financial & Performance Management",
      challenge: "Needed to transform the approach to financial and operational performance management with granular multi-dimensional calculations.",
      solution: "Implemented SAP PaPM solution architecture with rapid calculation functions, cost allocation rules, and real-world scenario modeling.",
      outcome: "Empowered leadership with instant margin transparency at product, customer, and regional levels.",
      metrics: ["Multi-Dimension Allocations", "Instant Margin Clarity", "Scenario Simulations"],
      heroImage: "/assets/case-studies/financial-analysis-team.png",
      images: Array.from(
        { length: 11 },
        (_, index) =>
          `/assets/image/Casestudy3_${index + 1 >= 10 ? String(index + 1).padStart(4, "0") : String(index + 1).padStart(3, "0")}.png`,
      ),
      sortOrder: 2,
      isPublished: true,
    },
    {
      slug: "mis-kpis-dashboard-automotive",
      title: "MIS & KPIs Dashboard Implementation for a Leading European Automotive Manufacturer using SAP BW/4HANA & SAP Analytics Cloud",
      client: "Major British Car Manufacturer",
      industry: "Automotive Manufacturing",
      challenge: "Executive reporting and key performance indicator tracking was fragmented across separate plant databases and manual spreadsheets.",
      solution: "Implemented comprehensive MIS reporting and executive KPI dashboards combining SAP BW and SAP Analytics Cloud.",
      outcome: "Optimized operational business performance through complete real-time visibility over manufacturing and distribution KPIs.",
      metrics: ["Automotive KPI Dashboard", "Real-Time Shop Floor Insights", "Unified BW/SAC Architecture"],
      heroImage: "/assets/case-studies/financial-analysis-team.png",
      images: Array.from(
        { length: 13 },
        (_, index) =>
          `/assets/image/Casestudy4_${index + 1 >= 10 ? String(index + 1).padStart(4, "0") : String(index + 1).padStart(3, "0")}.jpg`,
      ),
      sortOrder: 3,
      isPublished: true,
    },
    {
      slug: "legal-consolidation-disclosure-palm-oil",
      title: "Legal Consolidation and Disclosure reporting for Major APAC Palm oil Manufacturers using SAP BPC 11.0",
      client: "Major APAC Palm Oil Manufacturer",
      industry: "Agriculture & Commodity Manufacturing",
      challenge: "Required unique multi-currency group consolidation repurposing the Group Currency of one group as a source for another on an alternative currency base.",
      solution: "Designed and deployed SAP BPC 11.1 NW Legal Consolidation with automated disclosure reporting rules.",
      outcome: "Seamless automated multi-currency financial consolidation and fully compliant disclosure reporting.",
      metrics: ["Multi-Currency Group Consolidation", "100% Disclosure Accuracy", "SAP BPC 11.1 Deployment"],
      heroImage: "/assets/case-studies/financial-analysis-team.png",
      images: Array.from(
        { length: 4 },
        (_, index) =>
          `/assets/image/Casestudy5_${String(index + 1).padStart(3, "0")}.png`,
      ),
      sortOrder: 4,
      isPublished: true,
    },
  ];

  await prisma.caseStudy.deleteMany({});
  for (const cs of caseStudies) {
    await prisma.caseStudy.create({ data: cs });
  }

  // ==========================================
  // 10. PRIVACY POLICY
  // ==========================================
  console.log("10. Seeding Privacy Policy Page...");
  const privacyPolicySections = [
    {
      heading: "1. Information We Collect",
      body: "We collect information you provide directly to us when filling out contact or career inquiry forms, such as your name, email address, phone number, company name, resume attachments, and message contents. We also automatically collect standard technical data like browser type, IP address, and pages visited to ensure site security and performance.",
    },
    {
      heading: "2. How We Use Your Information",
      body: "We use the collected information exclusively to respond to your service inquiries, evaluate job applications, provide customer support, optimize website performance, and maintain compliance with applicable legal obligations. We do not sell or monetize personal information.",
    },
    {
      heading: "3. Data Security & Storage",
      body: "Trijotech employs industry-standard encryption, strict access controls, and secure database architectures to safeguard your information against unauthorized access, loss, or alteration.",
    },
    {
      heading: "4. Third-Party Sharing",
      body: "We do not share your personal data with third parties except as strictly necessary to deliver our services (e.g. secure cloud infrastructure providers) or as mandated by law.",
    },
    {
      heading: "5. Your Rights and Contact Information",
      body: "You have the right to request access to, correction of, or deletion of your personal data. For privacy inquiries, contact our data protection team at privacy@trijotech.com.",
    },
  ];

  await prisma.privacyPolicyPage.upsert({
    where: { id: "default" },
    update: {
      title: "Privacy Policy",
      lastUpdated: "August 2026",
      introduction: "Trijotech Software Consulting Pvt. Ltd. ('Trijotech', 'we', 'our', or 'us') is committed to protecting your privacy and ensuring your personal information is handled in a safe and responsible manner. This policy explains our practices regarding data collection, use, and security.",
      sections: privacyPolicySections,
    },
    create: {
      id: "default",
      title: "Privacy Policy",
      lastUpdated: "August 2026",
      introduction: "Trijotech Software Consulting Pvt. Ltd. ('Trijotech', 'we', 'our', or 'us') is committed to protecting your privacy and ensuring your personal information is handled in a safe and responsible manner. This policy explains our practices regarding data collection, use, and security.",
      sections: privacyPolicySections,
    },
  });

  console.log("\n=======================================================");
  console.log("🎉 Complete Website Migration to PostgreSQL Successful!");
  console.log("=======================================================");
}

main()
  .catch((e) => {
    console.error("Migration failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
