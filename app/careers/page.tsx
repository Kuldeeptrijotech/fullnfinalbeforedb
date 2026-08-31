import type { Metadata } from "next";
import { getCareerPageData } from "@/lib/services/careers.service";
import CareersClientView from "@/components/careers/CareersClientView";

export const metadata: Metadata = {
  title: "Careers | Trijotech",
  description:
    "Join our high-ownership SAP and cloud consulting team. Explore career opportunities at Trijotech.",
};

export const dynamic = "force-dynamic";

export default async function CareersPage() {
  const data = await getCareerPageData();
  return <CareersClientView data={data} />;
}
