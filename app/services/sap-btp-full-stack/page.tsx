import type { Metadata } from "next";
import SapBtpPage from "@/components/services/SapBtpPage";
import { getServiceBySlug } from "@/lib/services/services.service";

export const metadata: Metadata = { title: "SAP Full-Stack Applications on BTP" };

export const dynamic = "force-dynamic";

export default async function Page() {
  const service = await getServiceBySlug("sap-btp-full-stack");
  const offerings = service?.enables.map((item) => ({
    title: item,
    description: `Cloud-native enterprise engineering for ${item} on SAP Business Technology Platform.`,
  })) || [
    { title: "Custom BTP Applications", description: "Build cloud-native applications around specific business needs without disrupting the SAP core." },
    { title: "S/4HANA Extensions", description: "Create upgrade-ready side-by-side extensions using SAP Extension Suite." },
    { title: "Fiori and UI5 Experiences", description: "Deliver intuitive, responsive interfaces that improve productivity and adoption." },
    { title: "CAP and RAP Services", description: "Develop maintainable service layers and robust business logic for enterprise applications." },
    { title: "Workflow Automation", description: "Automate approvals, escalations, and rules-driven processes across teams." },
    { title: "API and Integration Suite", description: "Connect SAP and non-SAP applications with governed APIs and prebuilt connectors." },
  ];

  const impacts = service?.benefits.map((b) => ({
    title: b,
    description: `Enterprise cloud outcome: ${b} for modern business operations.`,
  })) || [
    { title: "Faster Time to Market", description: "Reusable services and proven patterns accelerate application delivery." },
    { title: "Clean Core", description: "Extend capabilities while preserving system performance and upgrade readiness." },
    { title: "Connected Work", description: "Bring applications, workflows, and data together across the enterprise." },
    { title: "Anywhere Access", description: "Create responsive experiences for desktop, tablet, and mobile users." },
  ];

  return <SapBtpPage offerings={offerings} impacts={impacts} />;
}
