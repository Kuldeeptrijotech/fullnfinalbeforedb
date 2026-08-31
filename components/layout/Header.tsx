"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ChevronRight, Menu, Search, UserCircle, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export type HeaderDropdownItem = {
  name: string;
  href: string;
  description: string;
  hasImage: boolean;
  imageUrl: string;
};

export type HeaderNavItem = {
  name: string;
  type: "link" | "dropdown";
  href: string;
  description: string;
  items?: HeaderDropdownItem[];
};

const DEFAULT_NAV_ITEMS: HeaderNavItem[] = [
  {
    name: "Services",
    type: "dropdown",
    href: "/services",
    description: "End-to-end SAP services across consulting, support, full-stack BTP engineering, integration, and AI.",
    items: [
      {
        name: "SAP Consulting",
        href: "/services/sap-consulting",
        description: "Enterprise architecture, roadmap, and business process optimization.",
        hasImage: true,
        imageUrl: "/assets/heroes/sap-implementation-blue.png",
      },
      {
        name: "SAP Support & AMS",
        href: "/services/sap-support",
        description: "24/7 proactive monitoring, continuous optimization, and SLA governance.",
        hasImage: true,
        imageUrl: "/assets/heroes/sap-support-blue.png",
      },
      {
        name: "SAP BTP Full Stack Applications",
        href: "/services/sap-btp-full-stack",
        description: "Cloud-native portal engineering, CAP/RAP extensions, and Fiori UX.",
        hasImage: true,
        imageUrl: "/assets/heroes/sap-btp-full-stack-blue.png",
      },
      {
        name: "SAP Data Integration Services",
        href: "/services/sap-data-integration",
        description: "Real-time middleware, cloud integrations, and high-volume data pipelines.",
        hasImage: true,
        imageUrl: "/assets/heroes/sap-data-integration-blue.png",
      },
      {
        name: "SAP AI & Data Insight Services",
        href: "/services/sap-ai-ml",
        description: "Predictive analytics, SAC planning, and AI-assisted enterprise decisions.",
        hasImage: true,
        imageUrl: "/assets/heroes/sap-ai-ml-blue.png",
      },
    ],
  },
  {
    name: "Solutions",
    type: "dropdown",
    href: "/solutions",
    description: "Proprietary software solutions and SAP add-ons engineered to simplify enterprise compliance and reporting.",
    items: [
      {
        name: "E-Invoicing Pro",
        href: "/solutions/e-invoicing-pro",
        description: "Simplify compliant electronic invoicing from SAP to government portals with real-time tracking.",
        hasImage: true,
        imageUrl: "/assets/heroes/e-invoicing-generated-v2.png",
      },
      {
        name: "Profitability Pro",
        href: "/solutions/profitability-pro",
        description: "Granular profitability and cost analysis built on SAP PaPM and SAC for margin visibility.",
        hasImage: true,
        imageUrl: "/assets/image/Product_4.png",
      },
      {
        name: "Finlagoon Consolidation",
        href: "/solutions/finlagoon-consolidation",
        description: "Automate statutory legal consolidation with multi-currency handling and group reporting.",
        hasImage: true,
        imageUrl: "/assets/heroes/industry-blue.png",
      },
    ],
  },
  {
    name: "Industries",
    type: "dropdown",
    href: "/industries/retail-supply-chain",
    description: "Domain-specific SAP architectures and digital workflows tailored for global enterprise sectors.",
    items: [
      {
        name: "Retail & Supply Chain",
        href: "/industries/retail-supply-chain",
        description: "Inventory visibility, demand planning, and multi-channel supply chain execution.",
        hasImage: true,
        imageUrl: "/static/Retail_and_supply_chain_image.png",
      },
      {
        name: "Pharmaceuticals & Life Sciences",
        href: "/industries/pharmaceuticals-life-sciences",
        description: "Financial planning, regulatory audit compliance, and unified supply chain analytics.",
        hasImage: true,
        imageUrl: "/static/Pharma.jpg",
      },
      {
        name: "Manufacturing",
        href: "/industries/manufacturing",
        description: "Production scheduling, plant maintenance, and shop floor ERP telemetry.",
        hasImage: true,
        imageUrl: "/static/Manufacturing.jpg",
      },
      {
        name: "Fintech",
        href: "/industries/fintech",
        description: "Automated financial workflows, API connectivity, and modern BTP applications.",
        hasImage: true,
        imageUrl: "/static/FinTech.jpg",
      },
      {
        name: "Oil & Gas",
        href: "/industries/oil-and-gas",
        description: "Hydrocarbon accounting, joint venture settlements, and asset lifecycle tracking.",
        hasImage: true,
        imageUrl: "/static/Oil_and_Gas.jpg",
      },
      {
        name: "Healthcare",
        href: "/industries/healthcare",
        description: "Clinical data analytics, hospital resource planning, and regulatory compliance.",
        hasImage: true,
        imageUrl: "/static/Healthcare.jpg",
      },
      {
        name: "Telecommunications",
        href: "/industries/telecommunications",
        description: "High-volume billing, network asset accounting, and subscriber analytics.",
        hasImage: true,
        imageUrl: "/static/Telecommunication.jpg",
      },
      {
        name: "Steel Manufacturing",
        href: "/industries/steel-manufacturing",
        description: "Melt shop planning, quality management, and plant telemetry.",
        hasImage: true,
        imageUrl: "/static/Steel_Manufacturing.jpg",
      },
      {
        name: "Entertainment & Media",
        href: "/industries/entertainment",
        description: "Content rights management, royalty accounting, and production budgeting.",
        hasImage: true,
        imageUrl: "/static/Entertainment.jpg",
      },
    ],
  },
  {
    name: "Insights",
    type: "dropdown",
    href: "/insights",
    description: "Read practical technology perspectives, case studies, blogs, and video walk-throughs.",
    items: [
      {
        name: "Blogs",
        href: "/blogs",
        description: "Expert articles on SAP transformation, cloud architecture, and analytics.",
        hasImage: true,
        imageUrl: "/assets/heroes/blogs-blue.png",
      },
      {
        name: "Case Studies",
        href: "/case-studies",
        description: "Real-world project challenges, architecture solutions, and measurable outcomes.",
        hasImage: true,
        imageUrl: "/assets/case-studies/financial-analysis-team.png",
      },
      {
        name: "Videos",
        href: "/videos",
        description: "Technical explainers, architecture walk-throughs, and practitioner demos.",
        hasImage: true,
        imageUrl: "/assets/heroes/videos-camera-hero.png",
      },
    ],
  },
  {
    name: "Corporate",
    type: "dropdown",
    href: "/about-us",
    description: "Learn about Trijotech, leadership, career opportunities, and direct contact options.",
    items: [
      {
        name: "About Us",
        href: "/about-us",
        description: "Discover our mission, executive leadership, delivery model, and consulting philosophy.",
        hasImage: true,
        imageUrl: "/assets/about/trijotech-team-collaboration-blue.png",
      },
      {
        name: "Careers",
        href: "/careers",
        description: "Explore opportunities with Trijotech across SAP consulting and cloud architecture.",
        hasImage: true,
        imageUrl: "/assets/heroes/careers-generated-v2.png",
      },
      {
        name: "Contact Us",
        href: "/contact",
        description: "Reach our sales, architecture, and support teams to discuss your next milestone.",
        hasImage: true,
        imageUrl: "/assets/heroes/contact-generated-v2.png",
      },
    ],
  },
];

function isActiveRoute(pathname: string, href: string) {
  if (!href) return false;
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function isNavItemActive(pathname: string, item: HeaderNavItem) {
  if (isActiveRoute(pathname, item.href)) return true;
  return item.items?.some((child) => isActiveRoute(pathname, child.href)) ?? false;
}

export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdownName, setOpenDropdownName] = useState<string | null>(null);
  const [openMobileDropdownName, setOpenMobileDropdownName] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeItemByMenu, setActiveItemByMenu] = useState<Record<string, string>>({});
  const [navItems, setNavItems] = useState<HeaderNavItem[]>(DEFAULT_NAV_ITEMS);

  useEffect(() => {
    fetch("/api/navigation")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.navItems && data.navItems.length > 0) {
          setNavItems(data.navItems);
        }
      })
      .catch((err) => console.error("Failed to load navigation data:", err));
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setIsMenuOpen(false);
    setOpenDropdownName(null);
    setOpenMobileDropdownName(null);
    setIsSearchOpen(false);
  }, [pathname]);

  function getActiveDropdownItem(item: HeaderNavItem) {
    const activeHref = activeItemByMenu[item.name] || item.items?.[0]?.href || item.href;
    const child = item.items?.find((d) => d.href === activeHref);
    if (child) return child;
    return (
      item.items?.[0] || {
        name: item.name,
        href: item.href,
        description: item.description,
        hasImage: false,
        imageUrl: "",
      }
    );
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#050817]/95 shadow-xl shadow-black/40 backdrop-blur-xl border-b border-white/10"
          : "bg-[#050817]/85 backdrop-blur-lg border-b border-white/5"
      }`}
    >
      <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 shrink-0"
          aria-label="Trijotech Home"
          onClick={() => setIsMenuOpen(false)}
        >
          <Image
            src="/brand/Trijotech_Complete_white.svg"
            alt="Trijotech"
            width={180}
            height={48}
            priority
            className="h-11 sm:h-12 w-auto object-contain"
          />
        </Link>

        {/* Desktop Navigation Items (Always visible on lg+ screens) */}
        <nav
          aria-label="Primary navigation"
          className="hidden lg:flex items-center gap-1 rounded-full border border-white/15 bg-white/[0.07] p-1.5 shadow-lg shadow-black/20 backdrop-blur-md"
        >
          {navItems.map((item) => {
            const isActive = isNavItemActive(pathname, item);
            const hasDropdown = Boolean(item.items && item.items.length > 0);
            const isDropdownOpen = openDropdownName === item.name;
            const activeDropdownItem = getActiveDropdownItem(item);

            if (hasDropdown) {
              return (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => {
                    setOpenDropdownName(item.name);
                    setActiveItemByMenu((prev) => ({
                      ...prev,
                      [item.name]: prev[item.name] || item.items?.[0]?.href || item.href,
                    }));
                  }}
                  onMouseLeave={() => setOpenDropdownName(null)}
                >
                  <div
                    className={`flex items-center rounded-full transition-all duration-200 ${
                      isActive
                        ? "bg-white/20 text-white font-bold shadow-sm"
                        : isDropdownOpen
                        ? "bg-white/15 text-white"
                        : "text-slate-200 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <Link
                      href={item.href}
                      className="px-3.5 py-1.5 text-sm font-semibold tracking-wide"
                    >
                      {item.name}
                    </Link>
                    <button
                      type="button"
                      aria-label={`Toggle ${item.name} menu`}
                      onClick={() => setOpenDropdownName(isDropdownOpen ? null : item.name)}
                      className="pr-2.5 py-1.5 text-slate-300 hover:text-white"
                    >
                      <ChevronDown
                        className={`h-3.5 w-3.5 transition-transform duration-200 ${
                          isDropdownOpen ? "rotate-180 text-cyan-400" : ""
                        }`}
                      />
                    </button>
                  </div>

                  {/* Mega Dropdown Menu */}
                  <AnimatePresence>
                    {isDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 6, scale: 0.98 }}
                        transition={{ duration: 0.18, ease: "easeOut" }}
                        className="fixed left-1/2 top-18 -translate-x-1/2 w-[min(920px,calc(100vw-2rem))] pt-2"
                      >
                        <div className="grid min-h-[22rem] grid-cols-[minmax(280px,1fr)_minmax(340px,1.2fr)] overflow-hidden rounded-2xl border border-white/15 bg-[#0b1329]/98 shadow-2xl shadow-black/80 backdrop-blur-2xl">
                          {/* Items List */}
                          <div className="border-r border-white/10 p-3 space-y-1 bg-black/20">
                            <p className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-cyan-400">
                              {item.name} Overview
                            </p>
                            {item.items?.map((dropdownItem) => {
                              const isSelected = activeDropdownItem.href === dropdownItem.href;
                              return (
                                <Link
                                  key={dropdownItem.href}
                                  href={dropdownItem.href}
                                  onClick={() => setOpenDropdownName(null)}
                                  onMouseEnter={() =>
                                    setActiveItemByMenu((prev) => ({
                                      ...prev,
                                      [item.name]: dropdownItem.href,
                                    }))
                                  }
                                  className={`group flex items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-semibold transition-all duration-150 ${
                                    isSelected
                                      ? "bg-gradient-to-r from-blue-600/30 to-cyan-500/20 text-white border border-cyan-400/40 shadow-sm"
                                      : "text-slate-300 hover:bg-white/10 hover:text-white border border-transparent"
                                  }`}
                                >
                                  <span>{dropdownItem.name}</span>
                                  <ChevronRight
                                    className={`h-4 w-4 transition-transform ${
                                      isSelected
                                        ? "translate-x-0.5 text-cyan-400"
                                        : "text-slate-500 group-hover:translate-x-0.5 group-hover:text-white"
                                    }`}
                                  />
                                </Link>
                              );
                            })}
                          </div>

                          {/* Preview Card */}
                          <div className="flex flex-col justify-between p-6 bg-gradient-to-br from-white/[0.02] to-white/[0.06]">
                            <div>
                              {activeDropdownItem.hasImage && activeDropdownItem.imageUrl && (
                                <div className="relative mb-4 aspect-[16/9] w-full overflow-hidden rounded-xl border border-white/15 bg-slate-950 shadow-md">
                                  <Image
                                    src={activeDropdownItem.imageUrl}
                                    alt={activeDropdownItem.name}
                                    fill
                                    sizes="(max-width: 1024px) 100vw, 420px"
                                    className="object-cover transition-transform duration-300 hover:scale-105"
                                  />
                                </div>
                              )}
                              <h3 className="text-lg font-bold text-white">
                                {activeDropdownItem.name}
                              </h3>
                              <p className="mt-2 text-sm leading-relaxed text-slate-300">
                                {activeDropdownItem.description}
                              </p>
                            </div>

                            <Link
                              href={activeDropdownItem.href || item.href}
                              onClick={() => setOpenDropdownName(null)}
                              className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-cyan-400 hover:text-cyan-300 transition-colors"
                            >
                              <span>Explore {activeDropdownItem.name}</span>
                              <ChevronRight className="h-4 w-4" />
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            }

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-white/20 text-white font-bold shadow-sm"
                    : "text-slate-200 hover:bg-white/10 hover:text-white"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            aria-label="Search website"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white hover:bg-white/20 transition-all duration-200"
          >
            <Search className="h-4.5 w-4.5" />
          </button>

          <Link
            href="/admin/login"
            aria-label="Admin Portal"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white hover:bg-white/20 transition-all duration-200"
          >
            <UserCircle className="h-5 w-5" />
          </Link>

          {/* Mobile Menu Hamburger Button */}
          <button
            type="button"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex lg:hidden h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white hover:bg-white/20 transition-all duration-200"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Global Search Bar */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="border-t border-white/10 bg-[#070b1e]/98 px-4 py-3 backdrop-blur-xl shadow-lg"
          >
            <div className="mx-auto flex max-w-3xl items-center gap-3">
              <Search className="h-4.5 w-4.5 text-cyan-400 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search solutions, services, case studies, or topics..."
                className="w-full bg-transparent text-sm text-white placeholder:text-slate-400 focus:outline-none"
              />
              <button
                type="button"
                aria-label="Close search"
                onClick={() => {
                  setIsSearchOpen(false);
                  setSearchQuery("");
                }}
                className="flex h-7 w-7 items-center justify-center rounded-full text-slate-400 hover:bg-white/10 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="lg:hidden border-t border-white/10 bg-[#050817]/98 px-5 py-6 backdrop-blur-2xl max-h-[85vh] overflow-y-auto"
          >
            <div className="mx-auto max-w-lg space-y-3">
              <nav className="space-y-1.5">
                {navItems.map((item) => {
                  const isActive = isNavItemActive(pathname, item);
                  const hasDropdown = Boolean(item.items && item.items.length > 0);
                  const isMobileDropdownOpen = openMobileDropdownName === item.name;

                  if (hasDropdown) {
                    return (
                      <div key={item.name} className="space-y-1">
                        <div
                          className={`flex items-center justify-between rounded-xl text-sm font-semibold transition ${
                            isActive
                              ? "bg-white/15 text-white"
                              : "text-slate-200 hover:bg-white/10 hover:text-white"
                          }`}
                        >
                          <Link
                            href={item.href}
                            onClick={() => setIsMenuOpen(false)}
                            className="flex-1 px-4 py-3"
                          >
                            {item.name}
                          </Link>
                          <button
                            type="button"
                            onClick={() =>
                              setOpenMobileDropdownName(
                                isMobileDropdownOpen ? null : item.name
                              )
                            }
                            className="px-4 py-3 text-slate-400 hover:text-white"
                            aria-label={`Toggle ${item.name} menu`}
                          >
                            <ChevronDown
                              className={`h-4 w-4 transition-transform ${
                                isMobileDropdownOpen ? "rotate-180 text-cyan-400" : ""
                              }`}
                            />
                          </button>
                        </div>

                        <AnimatePresence initial={false}>
                          {isMobileDropdownOpen && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.18 }}
                              className="ml-3 border-l-2 border-cyan-500/30 pl-3 space-y-1 pt-1"
                            >
                              {item.items?.map((dropdownItem) => (
                                <Link
                                  key={dropdownItem.href}
                                  href={dropdownItem.href}
                                  onClick={() => {
                                    setIsMenuOpen(false);
                                    setOpenMobileDropdownName(null);
                                  }}
                                  className="block rounded-lg px-3.5 py-2 text-xs font-medium text-slate-300 hover:bg-white/10 hover:text-white transition"
                                >
                                  {dropdownItem.name}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  }

                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold transition ${
                        isActive
                          ? "bg-white/15 text-white"
                          : "text-slate-200 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      <span>{item.name}</span>
                      <ChevronRight className="h-4 w-4 text-slate-400" />
                    </Link>
                  );
                })}
              </nav>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                <Link
                  href="/contact"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex-1 text-center py-2.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-sm shadow-md"
                >
                  Contact Us
                </Link>
                <Link
                  href="/admin/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="py-2.5 px-4 rounded-xl border border-white/20 bg-white/10 text-white font-semibold text-sm"
                >
                  Admin Login
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
