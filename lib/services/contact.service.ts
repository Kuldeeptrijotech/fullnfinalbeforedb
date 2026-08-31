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

export type ContactPageData = {
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  salesEmail: string;
  careersEmail: string;
  phones: ContactPhoneData[];
  addresses: ContactAddressData[];
  inquiryTypes: string[];
};

export async function getContactPageData(): Promise<ContactPageData> {
  try {
    const config = await prisma.contactPageConfig.findUnique({
      where: { id: "default" },
    });

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
      inquiryTypes: config?.inquiryTypes || [],
    };
  } catch (error) {
    console.error("Error fetching contact page data from PostgreSQL:", error);
    throw error;
  }
}
