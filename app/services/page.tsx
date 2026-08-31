import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ServiceBanners from "@/components/services/ServiceBanners";
import { getServicesPageData } from "@/lib/services/services.service";

export const metadata: Metadata = {
  title: "Services | Trijotech",
  description:
    "End-to-end SAP implementation, support, integration, cloud, analytics, and AI services.",
};

export const dynamic = "force-dynamic";

export default async function ServicesPage() {
  const data = await getServicesPageData();
  const { hero, services } = data;

  return (
    <main className="services-page-root font-sans overflow-hidden bg-[#030713] text-white">
      {/* ──── Hero Section ──── */}
      <section className="relative isolate min-h-[calc(100svh-4.5rem)] overflow-hidden bg-[#050817] pt-24 sm:pt-28 lg:pt-24 pb-12">
        <div aria-hidden className="absolute inset-0 -z-40 tri-mesh" />
        <div aria-hidden className="absolute inset-0 -z-30 tri-hex-grid opacity-55" />

        <Image
          src={hero.heroImage}
          alt="Trijotech SAP Services"
          fill
          priority
          loading="eager"
          sizes="100vw"
          className="absolute inset-0 -z-20 object-cover object-center opacity-90"
        />

        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(3,7,19,0.92)_0%,rgba(3,7,19,0.70)_40%,rgba(3,7,19,0.20)_75%,transparent_100%)]"
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(3,7,19,0.30)_0%,transparent_30%,transparent_70%,rgba(3,7,19,0.60)_100%)]"
        />

        <div className="mx-auto flex min-h-[calc(100svh-9.5rem)] w-full max-w-7xl items-center px-5 py-10 sm:px-8 sm:py-12 lg:px-12">
          <div className="max-w-3xl">
            <h1 className="max-w-3xl text-2xl font-bold leading-[1.15] tracking-tight text-white sm:text-4xl lg:text-5xl">
              {hero.title}
            </h1>

            <p className="mt-6 max-w-2xl text-base font-normal leading-[1.7] text-white/80 sm:text-lg">
              {hero.description}
            </p>

            <div className="mt-9 flex flex-wrap gap-4 relative z-10">
              <a
                href="#explore-services"
                className="inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 text-sm font-semibold text-slate-950 bg-white hover:bg-slate-100 border-0 shadow-[0_8px_20px_rgba(255,255,255,0.25)] hover:shadow-[0_12px_28px_rgba(255,255,255,0.4)] hover:-translate-y-0.5 active:translate-y-0 relative z-10 hover:z-20 transition-all duration-200"
              >
                Explore Services <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 text-sm font-semibold text-white border border-white/20 bg-white/5 hover:bg-white/10 hover:-translate-y-0.5 active:translate-y-0 relative z-10 hover:z-20 transition-all duration-200"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>

        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-b from-transparent to-[#030713]"
        />
      </section>

      {/* ──── Services Full-Width Alternating Banners from PostgreSQL ──── */}
      <ServiceBanners services={services} />
    </main>
  );
}
