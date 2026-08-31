import Container from "@/components/ui/Container";
import { StaggerReveal, StaggerRevealItem } from "@/components/motion/Reveal";
import { ArrowRight, Building2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import DynamicIcon from "@/components/ui/DynamicIcon";
import type { IndustriesSectionData } from "@/lib/services/homepage.service";

export type IndustriesPreviewProps = IndustriesSectionData;

export default function IndustriesPreview({
  eyebrow,
  title,
  description,
  viewAllText,
  viewAllHref,
  ctaText,
  items = [],
}: IndustriesPreviewProps) {
  const visibleIndustries = items.filter((industry) => industry.showOnHome !== false);

  return (
    <section className="relative isolate overflow-hidden bg-[#a8c0f1] bg-[radial-gradient(circle_at_15%_20%,#85a1da_0%,transparent_45%),radial-gradient(circle_at_70%_15%,#9eb6ce_0%,transparent_50%),radial-gradient(circle_at_35%_65%,#9cafda_0%,transparent_55%),radial-gradient(circle_at_85%_70%,#97b3f0_0%,transparent_50%),radial-gradient(circle_at_10%_90%,#c2dbec_0%,transparent_40%)] bg-blend-screen py-5 sm:py-6 lg:py-8 text-slate-900 border-t border-slate-200">
      <Container className="relative">
        <StaggerReveal className="flex flex-col gap-2.5 md:flex-row md:items-end md:justify-between">
          <StaggerRevealItem className="max-w-2xl">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-slate-900">
              {eyebrow}
            </span>
            <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
              {title}
            </h2>
            <p className="mt-1 max-w-xl text-xs leading-relaxed text-slate-600 sm:text-sm">
              {description}
            </p>
          </StaggerRevealItem>
          {viewAllHref && viewAllText && (
            <StaggerRevealItem>
              <Link
                href={viewAllHref}
                className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-900 shadow-xs hover:bg-slate-50 transition-all"
              >
                {viewAllText} <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </StaggerRevealItem>
          )}
        </StaggerReveal>

        <StaggerReveal className="mt-4 sm:mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[3px] items-stretch" stagger={0.03}>
          {visibleIndustries.map((industry) => (
            <StaggerRevealItem key={industry.title} className="h-full">
              <Link
                href={industry.href}
                className="group relative block h-full overflow-hidden rounded-none border border-slate-200/80 bg-slate-900 shadow-xs transition-all duration-300 hover:border-slate-400 hover:shadow-md active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              >
                <div className="relative aspect-[16/10] sm:aspect-[4/5] lg:aspect-[3/4] w-full h-full min-h-[220px] sm:min-h-[240px] lg:min-h-[255px] overflow-hidden flex flex-col justify-between p-3.5 sm:p-4 rounded-none">
                  {/* Full bleed industry photographic background */}
                  <Image
                    src={industry.image}
                    alt={industry.imageAlt || industry.title}
                    fill
                    loading={industry.image === "/static/cards/Pharma.webp" ? "eager" : "lazy"}
                    sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-108 rounded-none"
                  />
                  
                  {/* Subtle contrast gradient for text clarity without obscuring imagery */}
                  <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 rounded-none" />
                  <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.15),transparent_70%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100 rounded-none" />

                  {/* Top row: Icon */}
                  <div className="relative z-10 flex items-center justify-between">
                    <span className="flex items-center justify-center text-cyan-200 drop-shadow-md">
                      <DynamicIcon name={industry.icon} fallback={Building2} className="h-6 w-6 text-cyan-200 stroke-cyan-200" strokeWidth={2} />
                    </span>
                  </div>

                  {/* Bottom row: Industry Title, Description & Action */}
                  <div className="relative z-10 mt-auto">
                    <h3 className="text-base sm:text-lg font-bold text-white leading-snug drop-shadow-md transition-colors">
                      {industry.title}
                    </h3>
                    <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-slate-200/95 opacity-90 drop-shadow transition-opacity duration-300 group-hover:opacity-100">
                      {industry.description}
                    </p>
                    <div className="mt-2">
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-200 transition-all duration-300 group-hover:gap-2 group-hover:text-cyan-100">
                        {ctaText || "Explore industry"} <ArrowRight className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </StaggerRevealItem>
          ))}
        </StaggerReveal>
      </Container>
    </section>
  );
}
