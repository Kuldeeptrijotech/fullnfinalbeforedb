import prisma from "@/app/lib/db";

export type HeaderDropdownItemData = {
  name: string;
  href: string;
  description: string;
  hasImage: boolean;
  imageUrl: string;
};

export type HeaderNavItemData = {
  name: string;
  type: "link" | "dropdown";
  href: string;
  description: string;
  items?: HeaderDropdownItemData[];
};

export type BrandData = {
  name: string;
  homeHref: string;
  logoSrc: string;
  logoAlt: string;
  ariaLabel: string;
};

export type FooterLink = {
  label: string;
  href: string;
};

export type FooterColumn = {
  title: string;
  links: FooterLink[];
};

export type ContactAddress = {
  title: string;
  lines: string[];
};

export type ContactPhone = {
  label: string;
  href: string;
};

export type PartnerBadge = {
  label: string;
  src: string;
  width: number;
  height: number;
};

export type SocialLink = {
  label: string;
  href: string;
};

export type FooterData = {
  summary: string;
  columns: FooterColumn[];
  contact: {
    email: string;
    phones: ContactPhone[];
    addresses: ContactAddress[];
  };
  badges: PartnerBadge[];
  socialLinks: SocialLink[];
};

export type SiteNavigationData = {
  brand: BrandData;
  navItems: HeaderNavItemData[];
  footer: FooterData;
};

const defaultSiteConfig: SiteNavigationData = {
  brand: {
    name: "Trijotech",
    homeHref: "/",
    logoSrc: "/brand/Trijotech_Complete_white.svg",
    logoAlt: "Trijotech",
    ariaLabel: "Trijotech home",
  },
  navItems: [],
  footer: {
    summary: "Trijotech helps organizations modernize SAP landscapes, data platforms, and cloud applications with practical engineering teams.",
    columns: [],
    contact: {
      email: "sales@trijotech.com",
      phones: [],
      addresses: [],
    },
    badges: [],
    socialLinks: [],
  },
};

export async function getSiteNavigationData(): Promise<SiteNavigationData> {
  try {
    const [dbNavItems, dbSiteConfig] = await Promise.all([
      prisma.headerNavItem.findMany({
        orderBy: { sortOrder: "asc" },
        include: {
          items: {
            orderBy: { sortOrder: "asc" },
          },
        },
      }),
      prisma.siteConfigSetting.findUnique({
        where: { key: "global_site_config" },
      }),
    ]);

    const navItems: HeaderNavItemData[] = dbNavItems.map((nav) => ({
      name: nav.name,
      type: nav.type as "link" | "dropdown",
      href: nav.href,
      description: nav.description,
      items: nav.items.map((item) => ({
        name: item.name,
        href: item.href,
        description: item.description,
        hasImage: item.hasImage,
        imageUrl: item.imageUrl,
      })),
    }));

    const configValue = dbSiteConfig?.value as { brand?: BrandData; footer?: FooterData } | null;

    return {
      brand: configValue?.brand || defaultSiteConfig.brand,
      navItems: navItems.length > 0 ? navItems : defaultSiteConfig.navItems,
      footer: configValue?.footer || defaultSiteConfig.footer,
    };
  } catch (error) {
    console.error("Error fetching site navigation data from PostgreSQL:", error);
    return defaultSiteConfig;
  }
}
