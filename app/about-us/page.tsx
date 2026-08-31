import type { Metadata } from "next";
import { getAboutUsPageData } from "@/lib/services/about.service";
import AboutUsClientView from "@/components/about/AboutUsClientView";

export const metadata: Metadata = {
  title: "About Us | Trijotech",
  description: "Learn about Trijotech, our leadership, vision, mission, and SAP enterprise transformation services.",
};

export const dynamic = "force-dynamic";

export default async function AboutUsPage() {
  const data = await getAboutUsPageData();
  return <AboutUsClientView data={data} />;
}
