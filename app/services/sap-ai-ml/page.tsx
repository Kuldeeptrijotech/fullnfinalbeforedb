import type { Metadata } from "next";
import SapAiPage from "@/components/services/SapAiPage";
import { getServiceBySlug } from "@/lib/services/services.service";

export const metadata: Metadata = { title: "SAP AI & Data Insight Services" };

export const dynamic = "force-dynamic";

export default async function Page() {
  const service = await getServiceBySlug("sap-ai-ml");
  const offerings = service?.enables.map((item) => ({
    title: item,
    description: `Enterprise AI and data analytics capability for ${item} using SAP Analytics Cloud and PaPM.`,
  })) || [
    { title: "Predictive Analytics and Forecasting", description: "Use machine learning and statistical models to project demand, revenue, and key financial drivers." },
    { title: "SAP Analytics Cloud (SAC)", description: "Design role-based dashboards, board-level reporting, and operational visualizations." },
    { title: "Intelligent Automation and AI", description: "Apply AI assistance and automation to accelerate routine analysis, classification, and reporting." },
    { title: "Financial Intelligence and PaPM", description: "Gain granular profitability visibility across products, customers, channels, and business units." },
    { title: "Data Unification and Modeling", description: "Harmonize data across SAP and non-SAP sources into reliable, governed analytical models." },
    { title: "Decision Intelligence Frameworks", description: "Embed insights directly into workflows to guide planning, operations, and strategic choices." },
  ];

  const impacts = service?.benefits.map((b) => ({
    title: b,
    description: `AI and analytics outcome: ${b} for strategic leadership.`,
  })) || [
    { title: "Smarter Decisions", description: "Give leaders trusted, forward-looking insights across finance, supply chain, and operations." },
    { title: "Faster Insights", description: "Automate complex reporting cycles and reduce time spent on manual reconciliation." },
    { title: "Profitability Clarity", description: "Understand margin drivers at the product, customer, and channel level with precision." },
    { title: "Future-Ready Foundation", description: "Build scalable analytical models ready for evolving business and technology needs." },
  ];

  return <SapAiPage offerings={offerings} impacts={impacts} />;
}
