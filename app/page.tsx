import Hero from "@/components/sections/Hero";
import ServicesPreview from "@/components/sections/ServicesPreview";
import ProductsPreview from "@/components/sections/ProductsPreview";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import SAPCapabilities from "@/components/sections/SAPCapabilities";
import IndustriesPreview from "@/components/sections/IndustriesPreview";
import TestimonialsPreview from "@/components/sections/TestimonialsPreview";
import InsightsPreview from "@/components/sections/InsightsPreview";
import { getHomepageData } from "@/lib/services/homepage.service";

export const dynamic = "force-dynamic";

export default async function Home() {
  const data = await getHomepageData();

  return (
    <div className="zip-theme font-sans">
      <Hero {...data.hero} />
      <ServicesPreview {...data.services} />
      <ProductsPreview {...data.products} />
      <WhyChooseUs {...data.whyChooseUs} />
      <SAPCapabilities {...data.sapCapabilities} />
      <IndustriesPreview {...data.industries} />
      <TestimonialsPreview {...data.testimonials} />
      <InsightsPreview {...data.insights} />
    </div>
  );
}
