import prisma from "@/app/lib/db";

export type PrivacySectionData = {
  heading: string;
  body: string;
};

export type PrivacyPolicyPageData = {
  title: string;
  lastUpdated: string;
  introduction: string;
  sections: PrivacySectionData[];
};

export async function getPrivacyPolicyData(): Promise<PrivacyPolicyPageData> {
  try {
    const page = await prisma.privacyPolicyPage.findUnique({
      where: { id: "default" },
    });

    return {
      title: page?.title || "Privacy Policy",
      lastUpdated: page?.lastUpdated || "August 2026",
      introduction:
        page?.introduction ||
        "Trijotech Software Consulting Pvt. Ltd. is committed to protecting your privacy.",
      sections: (page?.sections as unknown as PrivacySectionData[]) || [],
    };
  } catch (error) {
    console.error("Error fetching privacy policy from PostgreSQL:", error);
    throw error;
  }
}
