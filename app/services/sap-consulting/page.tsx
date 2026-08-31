import type { Metadata } from "next";
import SapImplementationPage from "@/components/services/SapImplementationPage";
import { getServiceBySlug } from "@/lib/services/services.service";

export const metadata: Metadata = {
  title: "SAP Consulting Services | Trijotech",
  description: "Transforming businesses with expert SAP consulting and implementation solutions from Trijotech.",
};

export const dynamic = "force-dynamic";

export default async function Page() {
  const service = await getServiceBySlug("sap-consulting");

  const offerings = service?.enables.map((item) => ({
    title: item,
    description: `Enterprise delivery capability for ${item} backed by Trijotech SAP consultants.`,
  })) || [
    { title: "Implementation Strategy", description: "Translate business priorities into a practical SAP roadmap, delivery model, and transformation plan." },
    { title: "Legal and Management Consolidation", description: "Unify financial data across entities to improve compliance, control, and management visibility." },
    { title: "Data Analytics and Intelligence", description: "Turn enterprise data into real-time reporting, predictive insight, and measurable performance visibility." },
    { title: "Planning, Budgeting and Forecasting", description: "Build agile planning models, scenarios, and integrated forecasts with SAP Analytics Cloud." },
    { title: "FP&A and Profitability", description: "Improve allocations, margin visibility, forecasting accuracy, and performance management." },
    { title: "Adoption and Go-Live", description: "Support testing, migration, enablement, deployment, and stabilization through a controlled go-live." },
  ];

  const impacts = service?.benefits.map((b) => ({
    title: b,
    description: `Measurable outcome: ${b} for your enterprise operating model.`,
  })) || [
    { title: "Connected Finance", description: "Bring consolidation, planning, profitability, and reporting into a coherent operating model." },
    { title: "Faster Decisions", description: "Give leaders timely, trusted information across finance and operations." },
    { title: "Lower Transformation Risk", description: "Use structured governance, testing, migration, and adoption practices throughout delivery." },
    { title: "Sustainable Value", description: "Design scalable solutions that continue to support growth after go-live." },
  ];

  return <SapImplementationPage service={service} offerings={offerings} impacts={impacts} />;
}
