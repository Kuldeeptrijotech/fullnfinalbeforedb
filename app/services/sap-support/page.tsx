import type { Metadata } from "next";
import SapSupportPage from "@/components/services/SapSupportPage";
import { getServiceBySlug } from "@/lib/services/services.service";

export const metadata: Metadata = { title: "SAP Support & Application Management Services" };

export const dynamic = "force-dynamic";

export default async function Page() {
  const service = await getServiceBySlug("sap-support");
  const offerings = service?.enables.map((item) => ({
    title: item,
    description: `Enterprise AMS and support coverage for ${item} with guaranteed SLA resolution.`,
  })) || [
    { title: "Functional and Technical Support", description: "Resolve incidents and strengthen day-to-day SAP processes across business and technology teams." },
    { title: "Post-Go-Live Stabilization", description: "Address transition issues and reinforce adoption as implementation moves into steady operations." },
    { title: "Upgrade and Release Management", description: "Plan, test, and govern changes without unnecessary business disruption." },
    { title: "Performance Optimization", description: "Analyze slow transactions and reports to improve system responsiveness and user experience." },
    { title: "Security and Role Management", description: "Protect data integrity through access controls, audits, compliance, and role reviews." },
    { title: "Flexible Engagement Models", description: "Choose scalable teams and SLAs aligned with operational demand and service priorities." },
  ];

  const impacts = service?.benefits.map((b) => ({
    title: b,
    description: `Proactive AMS outcome: ${b} across core enterprise systems.`,
  })) || [
    { title: "Stable Operations", description: "Proactive monitoring and responsive support keep critical processes reliable." },
    { title: "Continuous Improvement", description: "Structured enhancements help the landscape evolve with the business." },
    { title: "Flexible Service", description: "Scale support capacity and expertise as operational needs change." },
    { title: "Secure and Compliant", description: "Governance and role controls protect systems and enterprise data." },
  ];

  return <SapSupportPage offerings={offerings} impacts={impacts} />;
}
