import type { Metadata } from "next";
import InsightsClientView from "@/components/insights/InsightsClientView";
import { getInsightsPageData } from "@/lib/services/insights.service";

export const metadata: Metadata = {
  title: "Insights & Resources | Trijotech",
  description:
    "Explore SAP case studies, blog articles, video walk-throughs, and enterprise technology insights from Trijotech experts.",
};

export const dynamic = "force-dynamic";

export default async function InsightsPage() {
  const data = await getInsightsPageData();
  return <InsightsClientView data={data} />;
}
