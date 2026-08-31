import type { Metadata } from "next";
import { getSolutionsPageData } from "@/lib/services/solutions.service";
import SolutionsClientView from "@/components/solutions/SolutionsClientView";

export const metadata: Metadata = {
  title: "Solutions & Products | Trijotech",
  description:
    "Explore Trijotech proprietary SAP extensions for e-invoicing compliance, financial consolidation, and profitability analysis.",
};

export const dynamic = "force-dynamic";

export default async function SolutionsPage() {
  const solutions = await getSolutionsPageData();
  return <SolutionsClientView solutions={solutions} />;
}
