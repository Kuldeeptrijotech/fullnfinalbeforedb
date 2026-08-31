import prisma from "@/app/lib/db";

export type ContactAddressData = {
  title: string;
  lines: string[];
};

export type ContactPhoneData = {
  label: string;
  href: string;
  desc?: string;
};

export type ContactCardItem = {
  label?: string;
  href?: string;
  desc?: string;
};

export type ContactCard = {
  icon: string;
  title: string;
  items: (ContactCardItem | string)[];
};

export type ContactPageData = {
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  salesEmail: string;
  careersEmail: string;
  phones: ContactPhoneData[];
  addresses: ContactAddressData[];
  contactCards: ContactCard[];
  inquiryTypes: string[];
};

export async function getContactPageData(): Promise<ContactPageData> {
  try {
    const config = await prisma.contactPageConfig.findUnique({
      where: { id: "default" },
    });

    const defaultContactCards: ContactCard[] = [
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
          "56A, Infinity Tecnopark, 501, 16, C Block, Phase 2, Sector 62, Noida, Uttar Pradesh 201309",
        ],
      },
    ];

    return {
      heroTitle: config?.heroTitle || "Let's talk about your next milestone",
      heroSubtitle:
        config?.heroSubtitle ||
        "Whether you need SAP implementation, managed support, cloud development, or data integration, our team is ready to help.",
      heroImage: config?.heroImage || "/assets/heroes/contact-generated-v2.png",
      salesEmail: config?.salesEmail || "sales@trijotech.com",
      careersEmail: config?.careersEmail || "hr@trijotech.com",
      phones: (config?.phones as unknown as ContactPhoneData[]) || [],
      addresses: (config?.addresses as unknown as ContactAddressData[]) || [],
      contactCards: (config?.contactCards as unknown as ContactCard[]) || defaultContactCards,
      inquiryTypes: config?.inquiryTypes || [],
    };
  } catch (error) {
    console.error("Error fetching contact page data from PostgreSQL:", error);
    throw error;
  }
}
