import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  BarChart3,
  Check,
  CircleCheckBig,
  DatabaseZap,
  Layers3,
} from "lucide-react";
import { getIndustryBySlug } from "@/lib/services/industries.service";

type Props = { params: Promise<{ slug?: string[] }> };

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).slug?.[0];
  if (!slug) return {};
  const industry = await getIndustryBySlug(slug);
  if (!industry) return {};
  return {
    title: `${industry.title} Solutions | Trijotech`,
    description: industry.shortDescription,
  };
}

const capabilityIcons = [Layers3, DatabaseZap, BarChart3];

/* Trijotech neutral composition */
const cardTones = [
  { color: "#ffffff", soft: "rgba(255, 255, 255,0.16)" },
  { color: "#ffffff", soft: "rgba(255, 255, 255,0.16)" },
  { color: "#ffffff", soft: "rgba(255, 255, 255,0.16)" },
];

export default async function IndustryDetailPage({ params }: Props) {
  const rawSlug = (await params).slug?.[0] || "retail-supply-chain";
  const industry = await getIndustryBySlug(rawSlug);
  if (!industry) notFound();

  return (
    <main className="industry-detail-page overflow-hidden bg-[#030713] text-white">
      {/* ──── Hero Section (Full Height & Full Width Background Image, High Visibility) ──── */}
      <section className="industry-hero-section relative isolate flex min-h-[75vh] w-full flex-col justify-center overflow-hidden bg-[#050817] pb-16 pt-32 sm:pt-36 lg:min-h-[640px] lg:py-24">
        {/* Full width & full height image backdrop */}
        <div aria-hidden className="absolute inset-0 -z-20 overflow-hidden">
          <Image
            src={industry.heroImage}
            alt={industry.title}
            fill
            priority
            loading="eager"
            sizes="100vw"
            className="h-full w-full object-cover object-center brightness-[0.88] contrast-[1.05]"
          />
          {/* Subtle soft gradient on left for text legibility while keeping image vibrant & visible */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#030713]/80 via-[#030713]/35 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#030713] to-transparent" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="flex max-w-4xl flex-col items-start text-left">
            {/* Title */}
            <h1 className="text-3xl font-extrabold leading-[1.15] tracking-tight text-white drop-shadow-md sm:text-4xl lg:text-5xl">
              {industry.title}
            </h1>

            {/* Subtitle */}
            <p className="mt-5 text-lg font-semibold leading-relaxed text-white drop-shadow-md sm:text-xl">
              {industry.subtitle}
            </p>

            {/* Description */}
            <p className="mt-4 max-w-2xl text-base font-normal leading-[1.7] text-white/90 drop-shadow sm:text-lg">
              {industry.shortDescription || industry.description}
            </p>

            {/* Action buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 text-sm font-bold text-slate-950 bg-white hover:bg-slate-100 border-0 shadow-[0_8px_20px_rgba(255,255,255,0.25)] hover:shadow-[0_12px_28px_rgba(255,255,255,0.4)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
              >
                Schedule consultation <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 text-sm font-semibold text-white border border-white/20 bg-white/5 hover:bg-white/10 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
              >
                Explore services
              </Link>
            </div>
          </div>
        </div>

        {/* Clean bottom boundary */}
        <div aria-hidden className="absolute inset-x-0 bottom-0 z-30 h-px bg-white/15" />
      </section>

      {/* ──── Definition / Overview ──────────────────────────── */}
      <section className="industry-definition-section relative overflow-hidden bg-[#a8c0f1] bg-[radial-gradient(circle_at_15%_20%,#85a1da_0%,transparent_45%),radial-gradient(circle_at_70%_15%,#9eb6ce_0%,transparent_50%),radial-gradient(circle_at_35%_65%,#9cafda_0%,transparent_55%),radial-gradient(circle_at_85%_70%,#97b3f0_0%,transparent_50%),radial-gradient(circle_at_10%_90%,#c2dbec_0%,transparent_40%)] bg-blend-screen py-16 sm:py-20 border-b border-slate-200 text-slate-900">
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="industry-definition-card mx-auto max-w-5xl rounded-[2rem] border border-slate-200 bg-white p-7 shadow-lg sm:p-10 text-slate-900">
            <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-slate-900">Definition</p>
            <div className="detail-split-grid mt-4 grid gap-8 lg:grid-cols-12">
              <div className="lg:col-span-8">
                <h2 className="text-2xl font-bold leading-[1.2] text-slate-900 sm:text-3xl">
                  {industry.subtitle}
                </h2>
              </div>
              <div className="lg:col-span-4">
                <p className="text-sm font-medium leading-7 text-slate-600">
                  {industry.description}
                </p>
              </div>
            </div>
            <div className="mt-7 flex items-center gap-3 border-t border-slate-200 pt-6 text-sm font-semibold text-slate-900">
              <CircleCheckBig className="h-5 w-5 text-slate-900" /> SAP expertise shaped around your operation
            </div>
          </div>
        </div>
      </section>

      {/* ──── Capabilities (What We Deliver) ────────────────────────────────────────────── */}
      <section className="bg-[#030713] py-20 sm:py-24 border-b border-white/5">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="max-w-3xl">
            <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#38bdf8]">What we deliver</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-5xl">
              Capabilities built for your industry
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-400">
              Practical technology capabilities that connect teams, data, and decisions across your organization.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {industry.services.map((service, index) => {
              const Icon = capabilityIcons[index % capabilityIcons.length];
              const tone = cardTones[index % cardTones.length];
              return (
                <article
                  key={service}
                  className="industry-detail-card group relative min-w-0 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-7 shadow-md transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:border-white/20"
                  style={{ "--card-tone": tone.color, "--card-soft": tone.soft } as CSSProperties}
                >
                  <span
                    aria-hidden
                    className="absolute inset-x-0 top-0 h-0.5 opacity-70 transition-opacity duration-300 group-hover:opacity-100 bg-white/40"
                  />
                  <span
                    aria-hidden
                    className="absolute right-5 top-4 text-5xl font-bold transition-colors duration-300"
                    style={{ color: "rgba(255,255,255,0.06)" }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div
                    className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-white/20 bg-white/10 text-white transition-colors duration-300 group-hover:bg-white group-hover:text-[#030713]"
                  >
                    <Icon className="industry-card-icon h-6 w-6" aria-hidden="true" />
                  </div>
                  <h3 className="relative mt-7 text-xl font-bold text-white">{service}</h3>
                  <p className="relative mt-3 leading-7 text-slate-400">
                    Designed to improve visibility, simplify work, and support informed decisions.
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ──── Business Value & Measurable Outcomes ────────────────────────────────────────── */}
      <section className="industry-outcomes-section relative bg-[#a8c0f1] bg-[radial-gradient(circle_at_15%_20%,#85a1da_0%,transparent_45%),radial-gradient(circle_at_70%_15%,#9eb6ce_0%,transparent_50%),radial-gradient(circle_at_35%_65%,#9cafda_0%,transparent_55%),radial-gradient(circle_at_85%_70%,#97b3f0_0%,transparent_50%),radial-gradient(circle_at_10%_90%,#c2dbec_0%,transparent_40%)] bg-blend-screen py-20 sm:py-24 border-b border-slate-200 text-slate-900">
        <div className="relative mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:items-center lg:gap-14 lg:px-12">
          {/* Left Column: Title & Feature Image Card */}
          <div className="flex flex-col gap-8">
            <div>
              <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-slate-900">Value created</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                Measurable outcomes for {industry.title}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
                A strong foundation helps your teams react faster, work with greater precision, and plan with confidence.
              </p>
              <div className="mt-6">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-bold text-slate-950 bg-white hover:bg-slate-100 border-0 shadow-md transition-all duration-200"
                >
                  Start a conversation <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="industry-outcomes-image relative aspect-[16/9] w-full overflow-hidden rounded-[2rem] bg-slate-950 border border-slate-200 shadow-xl">
              <Image
                src={industry.heroImage}
                alt={`${industry.title} business outcomes`}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-[1]" />
              <div className="absolute bottom-0 p-6 sm:p-8 z-10">
                <p className="industry-outcomes-kicker text-xs font-bold uppercase tracking-[0.2em] text-white">
                  Built for lasting value
                </p>
                <p className="mt-2 text-xl font-bold text-white leading-snug sm:text-2xl">
                  Better data. Clearer decisions. Stronger operations.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Benefits Cards */}
          <div className="grid gap-4 sm:grid-cols-2">
            {industry.benefits.map((benefit) => {
              return (
                <div
                  key={benefit}
                  className="industry-detail-card flex min-w-0 items-start gap-4 overflow-hidden rounded-2xl border border-slate-200 bg-white text-slate-900 p-6 shadow-sm transition-all duration-300 hover:border-slate-300 hover:shadow-md"
                >
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-900 shadow-sm">
                    <Check className="h-4.5 w-4.5 stroke-[3] text-slate-900" />
                  </span>
                  <div>
                    <p className="text-base font-bold text-slate-900 leading-snug">{benefit}</p>
                    <p className="mt-1 text-xs text-slate-600">Delivering reliable, repeatable operational gains.</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
