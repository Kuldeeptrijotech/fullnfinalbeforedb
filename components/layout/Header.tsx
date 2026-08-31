"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ChevronRight, Menu, Search, UserCircle, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";

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

const dropdownHeroImages: Record<string, string> = {
  "/solutions": "/assets/heroes/products.png",
  "/solutions/e-invoicing-pro": "/assets/heroes/products-blue.png",
  "/solutions/finlagoon-consolidation": "/assets/heroes/industry-blue.png",
  "/solutions/profitability-pro": "/assets/image/Product_4.png",
  "/services": "/assets/heroes/services.png",
  "/services/sap-consulting": "/assets/heroes/sap-implementation-blue.png",
  "/services/sap-implementation": "/assets/heroes/sap-implementation-blue.png",
  "/services/sap-support": "/assets/heroes/sap-support-blue.png",
  "/services/sap-btp-full-stack": "/assets/heroes/sap-btp-full-stack-blue.png",
  "/services/sap-data-integration": "/assets/heroes/sap-data-integration-blue.png",
  "/services/sap-ai-ml": "/assets/heroes/sap-ai-ml-blue.png",
  "/industries/retail-supply-chain": "/static/Retail_and_supply_chain_image.png",
  "/industries/pharmaceuticals-life-sciences": "/static/Pharma.jpg",
  "/industries/manufacturing": "/static/Manufacturing.jpg",
  "/industries/fintech": "/static/FinTech.jpg",
  "/industries/entertainment": "/static/Entertainment.jpg",
  "/industries/steel-manufacturing": "/static/Steel_Manufacturing.jpg",
  "/industries/telecommunications": "/static/Telecommunication.jpg",
  "/insights": "/assets/heroes/blogs-blue.png",
  "/blogs": "/assets/heroes/blogs-blue.png",
  "/case-studies": "/assets/case-studies/financial-analysis-team.png",
  "/videos": "/assets/heroes/videos-camera-hero.png",
  "/about-us": "/assets/about/trijotech-team-collaboration-blue.png",
  "/careers": "/assets/heroes/careers-generated-v2.png",
  "/contact": "/assets/heroes/contact-generated-v2.png",
};

function isActiveRoute(pathname: string, href: string) {
  if (!href) return false;
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function isNavItemActive(pathname: string, item: HeaderNavItem) {
  if (isActiveRoute(pathname, item.href)) return true;
  return item.items?.some((child) => isActiveRoute(pathname, child.href)) ?? false;
}

function hasDropdownItems(item: HeaderNavItem) {
  return Boolean(item.items?.length);
}

function getDropdownItemByHref(item: HeaderNavItem, href?: string) {
  return item.items?.find((dropdownItem) => dropdownItem.href === href) ?? null;
}

function HeaderActionButton({
  children,
  label,
  onClick,
}: {
  children: ReactNode;
  label: string;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/6 text-white/80 transition hover:bg-white/10 hover:text-white"
    >
      {children}
    </button>
  );
}

export default function Header() {
  const pathname = usePathname();
  const [isOverHero, setIsOverHero] = useState(false);
  const [isPastHero, setIsPastHero] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdownName, setOpenDropdownName] = useState<string | null>(null);
  const [openMobileDropdownName, setOpenMobileDropdownName] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeItemByMenu, setActiveItemByMenu] = useState<Record<string, string>>({});

  const [navData, setNavData] = useState<{
    brand: { name: string; homeHref: string; logoSrc: string; logoAlt: string; ariaLabel: string };
    navItems: HeaderNavItem[];
  }>({
    brand: {
      name: "Trijotech",
      homeHref: "/",
      logoSrc: "/brand/Trijotech_Complete_white.svg",
      logoAlt: "Trijotech",
      ariaLabel: "Trijotech home",
    },
    navItems: [],
  });

  useEffect(() => {
    fetch("/api/navigation")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.navItems && data.navItems.length > 0) {
          setNavData({ brand: data.brand || navData.brand, navItems: data.navItems });
        }
      })
      .catch((err) => console.error("Failed to load nav data:", err));
  }, []);

  useEffect(() => {
    const hero = document.querySelector<HTMLElement>(
      "main > section:first-child, .zip-theme > section:first-child, .zip-inner-theme > section:first-child",
    );

    if (!hero) {
      const resetFrame = window.requestAnimationFrame(() => {
        setIsOverHero(false);
        setIsPastHero(false);
      });
      return () => window.cancelAnimationFrame(resetFrame);
    }

    const previousMinHeight = hero.style.minHeight;
    hero.style.minHeight = "100svh";

    let frame = 0;
    const updateHeaderVisibility = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        const hasStartedScrolling = window.scrollY > 8;
        const isHeroStillVisible = hero.getBoundingClientRect().bottom > 0;
        setIsOverHero(hasStartedScrolling && isHeroStillVisible);
        setIsPastHero(hasStartedScrolling && !isHeroStillVisible);
      });
    };

    updateHeaderVisibility();
    window.addEventListener("scroll", updateHeaderVisibility, { passive: true });
    window.addEventListener("resize", updateHeaderVisibility);

    return () => {
      hero.style.minHeight = previousMinHeight;
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateHeaderVisibility);
      window.removeEventListener("resize", updateHeaderVisibility);
    };
  }, [pathname]);

  const brand = navData.brand;
  const configuredNavItems = navData.navItems;
  const servicesItem = configuredNavItems.find((item) => item.name === "Services");
  const navItems = servicesItem
    ? configuredNavItems.reduce<HeaderNavItem[]>((items, item) => {
        if (item.name === "Services") return items;
        if (item.name === "Solutions") items.push(servicesItem);
        items.push(item);
        return items;
      }, [])
    : configuredNavItems;

  function openDropdown(item: HeaderNavItem) {
    setOpenDropdownName(item.name);
    setActiveItemByMenu((current) => ({
      ...current,
      [item.name]: current[item.name] || item.items?.[0]?.href || item.href,
    }));
  }

  function toggleDropdown(item: HeaderNavItem) {
    if (openDropdownName === item.name) {
      setOpenDropdownName(null);
      return;
    }
    openDropdown(item);
  }

  function getActiveDropdownItem(item: HeaderNavItem) {
    const activeHref = activeItemByMenu[item.name] || item.items?.[0]?.href || item.href;
    const child = getDropdownItemByHref(item, activeHref);

    if (child) {
      const imageUrl = dropdownHeroImages[child.href] ?? child.imageUrl;
      return { ...child, hasImage: Boolean(imageUrl), imageUrl };
    }

    const imageUrl = (item.href ? dropdownHeroImages[item.href] : "") || (item.items?.[0]?.href ? dropdownHeroImages[item.items[0].href] : "") || "";
    return {
      name: item.name,
      href: item.href || item.items?.[0]?.href || "#",
      description: item.description,
      hasImage: Boolean(imageUrl),
      imageUrl,
    };
  }

  function setActiveDropdownItem(menuName: string, itemHref: string) {
    setActiveItemByMenu((current) => ({
      ...current,
      [menuName]: itemHref,
    }));
  }

  function openSearch() {
    setIsSearchOpen(true);
    setIsMenuOpen(false);
    setOpenDropdownName(null);
    setOpenMobileDropdownName(null);
  }

  function closeSearch() {
    setIsSearchOpen(false);
    setSearchQuery("");
  }

  return (
    <header
      className={`site-modern-header fixed inset-x-0 top-0 z-50 bg-[#030713] font-sans text-white transition-[transform,opacity] duration-300 ease-out ${
        isOverHero
          ? "pointer-events-none -translate-y-full opacity-0"
          : "translate-y-0 opacity-100"
      }`}
    >
      <div className={`relative border-b backdrop-blur-xl transition-[border-color,background-color,box-shadow] duration-300 ${
        isPastHero
          ? "border-white/20 bg-[#050817]/90 shadow-lg shadow-black/25"
          : "border-white/10 bg-[#050817]/95"
      }`}>
        <div className="site-header-grid mx-auto grid h-18 w-full max-w-none grid-cols-[1fr_auto] items-center gap-4 px-3 sm:px-4 xl:grid-cols-[1fr_auto_1fr] xl:px-6 2xl:px-8">
          <Link
            href={brand.homeHref}
            className="flex w-fit items-center"
            aria-label={brand.ariaLabel}
            onClick={() => setIsMenuOpen(false)}
          >
            <Image
              src="/brand/Trijotech_Complete_white.svg"
              alt="Trijotech"
              width={168}
              height={44}
              priority
              style={{ width: "auto" }}
              className="h-10 sm:h-11 w-auto object-contain transition-transform duration-200 hover:scale-105"
            />
          </Link>

          <nav
            aria-label="Primary navigation"
            className="site-primary-nav hidden items-center gap-1 rounded-full border border-white/10 bg-white/6 p-1 shadow-lg shadow-black/20 xl:flex"
          >
            {navItems.map((item) => {
              const isActive = isNavItemActive(pathname, item);
              const hasDropdown = hasDropdownItems(item);
              const parentNavigates = item.name !== "Solutions" && item.name !== "Industries" ? Boolean(item.href) : item.href === "/solutions";
              const isDropdownOpen = openDropdownName === item.name;
              const activeDropdownItem = getActiveDropdownItem(item);
              const navLinkClasses = `inline-flex h-8 items-center gap-1 rounded-full px-4 text-sm font-semibold transition ${isActive
                ? "bg-white/15 text-white"
                : "text-white/80 hover:bg-white/10 hover:text-white"
                }`;

              if (hasDropdown) {
                return (
                  <div
                    key={item.name}
                    className="relative"
                    onMouseEnter={() => openDropdown(item)}
                    onMouseLeave={() => setOpenDropdownName(null)}
                    onBlur={(event) => {
                      if (!event.currentTarget.contains(event.relatedTarget)) {
                        setOpenDropdownName(null);
                      }
                    }}
                  >
                    <div className={`${navLinkClasses} gap-0 px-1`}>
                      {parentNavigates ? (
                        <Link href={item.href} className="flex h-full items-center rounded-full px-3">{item.name}</Link>
                      ) : (
                        <button type="button" onClick={() => toggleDropdown(item)} className="flex h-full items-center rounded-full px-3">{item.name}</button>
                      )}
                      <button
                        type="button"
                        className="flex h-full items-center rounded-full px-1.5"
                        aria-label={`Toggle ${item.name} menu`}
                        aria-haspopup="true"
                        aria-expanded={isDropdownOpen}
                        onClick={() => toggleDropdown(item)}
                      >
                        <ChevronDown
                        className={`h-3.5 w-3.5 text-white/45 transition ${isDropdownOpen ? "rotate-180 text-white/70" : ""
                          }`}
                        />
                      </button>
                    </div>

                    <AnimatePresence>
                      {isDropdownOpen ? (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.98 }}
                          transition={{ duration: 0.16, ease: "easeOut" }}
                          className="site-desktop-dropdown fixed left-1/2 top-13 hidden w-[min(861px,calc(100vw-2rem))] -translate-x-1/2 pt-3 lg:block"
                        >
                          <div className="grid min-h-[22rem] grid-cols-[minmax(242px,0.9fr)_minmax(352px,1.1fr)] overflow-hidden rounded-lg border border-white/10 bg-[#111320]/95 shadow-[inset_0_0_28px_rgba(47,143,255,0.12),0_28px_70px_rgba(0,0,0,0.58)] backdrop-blur-xl">
                            <div className="border-r border-white/10 p-2">
                              {item.items?.map((dropdownItem) => {
                                const isSelected =
                                  activeDropdownItem?.href === dropdownItem.href;

                                return (
                                  <Link
                                    key={`${item.name}-${dropdownItem.name}-${dropdownItem.href}`}
                                    href={dropdownItem.href}
                                    onClick={() => setOpenDropdownName(null)}
                                    onMouseEnter={() =>
                                      setActiveDropdownItem(
                                        item.name,
                                        dropdownItem.href,
                                      )
                                    }
                                    onFocus={() =>
                                      setActiveDropdownItem(
                                        item.name,
                                        dropdownItem.href,
                                      )
                                    }
                                    className={`group flex items-center justify-between rounded-lg px-3 py-2 text-sm font-semibold transition ${isSelected
                                      ? "border border-white/20 bg-white/12 text-white"
                                      : "border border-transparent text-white/70 hover:border-white/10 hover:bg-white/6 hover:text-white"
                                      }`}
                                  >
                                    <span>{dropdownItem.name}</span>
                                    <ChevronRight
                                      className={`h-4 w-4 transition ${isSelected
                                        ? "translate-x-0.5 text-white"
                                        : "text-white/35 group-hover:translate-x-0.5 group-hover:text-white/70"
                                        }`}
                                    />
                                  </Link>
                                );
                              })}
                            </div>

                            <div className="flex flex-col justify-between p-6">
                              <div>
                                {activeDropdownItem?.hasImage &&
                                  activeDropdownItem.imageUrl ? (
                                  <div className="relative mb-4 aspect-[16/9] w-full overflow-hidden rounded-lg border border-white/10 bg-[#171a2c]">
                                    <Image
                                      src={activeDropdownItem.imageUrl}
                                      alt={activeDropdownItem.name}
                                      fill
                                      sizes="(max-width: 1024px) 100vw, 420px"
                                      className="object-cover transition duration-300 hover:scale-105"
                                    />
                                  </div>
                                ) : null}
                                <h3 className="text-lg font-bold text-white">
                                  {activeDropdownItem?.name}
                                </h3>
                                <p className="mt-2 text-sm leading-relaxed text-white/70 whitespace-pre-line">
                                  {activeDropdownItem?.description}
                                </p>
                              </div>

                              <Link
                                href={activeDropdownItem?.href || item.href}
                                onClick={() => setOpenDropdownName(null)}
                                className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-white transition hover:text-white/80"
                              >
                                Explore {activeDropdownItem?.name}
                                <ChevronRight className="h-4 w-4" />
                              </Link>
                            </div>
                          </div>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <Link key={item.name} href={item.href} className={navLinkClasses}>
                  {item.name}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center justify-end gap-2">
            <HeaderActionButton label="Search" onClick={openSearch}>
              <Search className="h-4.5 w-4.5" />
            </HeaderActionButton>

            <Link
              href="/admin/login"
              aria-label="Profile"
              title="Profile"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/6 text-white/80 transition hover:bg-white/10 hover:text-white"
            >
              <UserCircle className="h-5 w-5" />
            </Link>

            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/6 text-white transition hover:bg-white/10 xl:hidden"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen((current) => !current)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isSearchOpen ? (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.16, ease: "easeOut" }}
              className="border-t border-white/10 bg-[#070b1e]/98 px-4 py-3 backdrop-blur-xl"
            >
              <div className="mx-auto flex max-w-3xl items-center gap-2">
                <Search className="h-4 w-4 text-white/45" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Search solutions, services, or documentation..."
                  className="w-full bg-transparent text-sm text-white placeholder:text-white/40 focus:outline-none"
                />
                <button
                  type="button"
                  aria-label="Close search"
                  onClick={closeSearch}
                  className="inline-flex h-7 w-7 items-center justify-center rounded-full text-white/60 hover:bg-white/10 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>

        <AnimatePresence>
          {isMenuOpen ? (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="overflow-hidden border-t border-white/10 bg-[#050817]/98 px-4 py-6 backdrop-blur-2xl xl:hidden"
            >
              <div className="mx-auto max-w-2xl space-y-2">
                <nav className="space-y-1">
                  {navItems.map((item) => {
                    const isActive = isNavItemActive(pathname, item);
                    const hasDropdown = hasDropdownItems(item);
                    const isMobileDropdownOpen = openMobileDropdownName === item.name;
                    const parentNavigates = item.name !== "Solutions" && item.name !== "Industries" ? Boolean(item.href) : item.href === "/solutions";

                    if (hasDropdown) {
                      return (
                        <div key={item.name} className="space-y-1">
                          <div className={`flex items-center justify-between rounded-lg text-sm font-semibold transition ${isActive
                            ? "bg-white/12 text-white"
                            : "text-white/75 hover:bg-white/[0.07] hover:text-white"
                            }`}>
                            {parentNavigates ? (
                              <Link href={item.href} onClick={() => setIsMenuOpen(false)} className="flex-1 px-4 py-3">{item.name}</Link>
                            ) : (
                              <button type="button" onClick={() => setOpenMobileDropdownName((current) => current === item.name ? null : item.name)} className="flex-1 px-4 py-3 text-left">{item.name}</button>
                            )}
                            <button
                              type="button"
                              onClick={() => setOpenMobileDropdownName((current) => current === item.name ? null : item.name)}
                              className="px-4 py-3"
                              aria-label={`Toggle ${item.name} menu`}
                              aria-expanded={isMobileDropdownOpen}
                            >
                              <ChevronDown
                              className={`h-4 w-4 text-white/30 transition ${isMobileDropdownOpen
                                ? "rotate-180 text-white/60"
                                : ""
                                }`}
                              />
                            </button>
                          </div>

                          <AnimatePresence initial={false}>
                            {isMobileDropdownOpen ? (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.16, ease: "easeOut" }}
                                className="ml-4 mt-1 overflow-hidden border-l border-white/10 pl-3"
                              >
                                <div className="space-y-1">
                                  {item.items?.map((dropdownItem) => (
                                    <Link
                                      key={`${item.name}-${dropdownItem.name}-${dropdownItem.href}`}
                                      href={dropdownItem.href}
                                      onClick={() => {
                                        setIsMenuOpen(false);
                                        setOpenMobileDropdownName(null);
                                      }}
                                      className="block rounded-lg px-4 py-2 text-sm font-medium text-white/60 transition hover:bg-white/[0.07] hover:text-white"
                                    >
                                      {dropdownItem.name}
                                    </Link>
                                  ))}
                                </div>
                              </motion.div>
                            ) : null}
                          </AnimatePresence>
                        </div>
                      );
                    }

                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setIsMenuOpen(false)}
                        className={`flex items-center justify-between rounded-lg px-4 py-3 text-sm font-semibold transition ${isActive
                          ? "bg-white/12 text-white"
                          : "text-white/75 hover:bg-white/[0.07] hover:text-white"
                          }`}
                      >
                        {item.name}
                        <ChevronRight className="h-4 w-4 text-white/30" />
                      </Link>
                    );
                  })}
                </nav>

                <div className="mt-4 flex gap-2 border-t border-white/10 pt-4">
                  <HeaderActionButton label="Search" onClick={openSearch}>
                    <Search className="h-4.5 w-4.5" />
                  </HeaderActionButton>
                  <Link
                    href="/admin/login"
                    onClick={() => setIsMenuOpen(false)}
                    aria-label="Profile"
                    title="Profile"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/6 text-white/80 transition hover:bg-white/10 hover:text-white"
                  >
                    <UserCircle className="h-5 w-5" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </header>
  );
}
