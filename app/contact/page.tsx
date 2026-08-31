import type { Metadata } from "next";
import { getContactPageData } from "@/lib/services/contact.service";
import ContactClientView from "@/components/contact/ContactClientView";

export const metadata: Metadata = {
  title: "Contact Us | Trijotech",
  description:
    "Get in touch with Trijotech for enterprise SAP consulting, support, cloud application development, or general inquiries.",
};

export const dynamic = "force-dynamic";

export default async function ContactPage() {
  const data = await getContactPageData();
  return <ContactClientView data={data} />;
}
