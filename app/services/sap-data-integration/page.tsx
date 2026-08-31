import type { Metadata } from "next";
import SapDataIntegrationPage from "@/components/services/SapDataIntegrationPage";
import { getServiceBySlug } from "@/lib/services/services.service";

export const metadata: Metadata = { title: "SAP Data Integration Services" };

export const dynamic = "force-dynamic";

export default async function Page() {
  const service = await getServiceBySlug("sap-data-integration");
  const offerings = service?.enables.map((item) => ({
    title: item,
    description: `Enterprise integration and middleware capability for ${item} connecting SAP and third-party systems.`,
  })) || [
    { title: "SAP Cloud Integration", description: "Design secure cloud integration flows across SAP and third-party applications." },
    { title: "SAP PI/PO Modernization", description: "Assess, migrate, and modernize established interfaces for a cloud-ready landscape." },
    { title: "API Integration", description: "Create governed, reusable APIs that simplify system and partner connectivity." },
    { title: "Data Migration", description: "Move business data with structured validation, reconciliation, and cutover planning." },
    { title: "Event-Driven Integration", description: "Enable responsive processes through real-time events and asynchronous patterns." },
    { title: "Integration Monitoring", description: "Improve reliability through traceability, alerts, operational dashboards, and support." },
  ];

  const impacts = service?.benefits.map((b) => ({
    title: b,
    description: `Data integration outcome: ${b} across hybrid cloud landscapes.`,
  })) || [
    { title: "Connected Operations", description: "Keep information moving consistently across applications and business processes." },
    { title: "Reliable Data", description: "Improve trust through controlled mappings, validation, and reconciliation." },
    { title: "Real-Time Visibility", description: "Make current operational information available where decisions happen." },
    { title: "Scalable Architecture", description: "Use repeatable integration patterns that can grow with the enterprise." },
  ];

  return <SapDataIntegrationPage service={service} offerings={offerings} impacts={impacts} />;
}
