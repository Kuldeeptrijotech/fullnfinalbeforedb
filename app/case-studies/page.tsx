import type { Metadata } from "next";
import CaseStudiesPage from "./CaseStudiesPage";
import { getCaseStudiesData } from "@/lib/services/case-studies.service";

export const metadata: Metadata = {
  title: "Case Studies | Trijotech",
  description: "Explore Trijotech SAP transformation, planning, analytics, profitability, and consolidation case studies.",
};

export const dynamic = "force-dynamic";

export default async function Page() {
  const dbStudies = await getCaseStudiesData();
  return <CaseStudiesPage dbStudies={dbStudies} />;
}
