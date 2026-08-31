"use client";

import Container from "@/components/ui/Container";
import GradientButton from "@/components/ui/GradientButton";
import { Reveal, StaggerReveal, StaggerRevealItem } from "@/components/motion/Reveal";
import { ArrowRight } from "lucide-react";
import DynamicIcon from "@/components/ui/DynamicIcon";
import type { SAPCapabilitiesSectionData } from "@/lib/services/homepage.service";

export type SAPCapabilitiesProps = SAPCapabilitiesSectionData;

export default function SAPCapabilities({
  eyebrow,
  title,
  description,
  ctaText,
  ctaHref,
  capabilities = [],
  nodes = [],
}: SAPCapabilitiesProps) {
  return (
    <section className="relative isolate overflow-hidden bg-[#18263e] py-12 sm:py-14 lg:py-16 text-white border-t border-white/10">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-20 tri-mesh opacity-60" />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-30 tri-grid-bg opacity-25" />

      <Container className="relative grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
        <div className="space-y-6">
          <Reveal>
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#38bdf8]">
              {eyebrow}
            </span>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
              {title}
            </h2>
            <p className="mt-2.5 max-w-xl text-xs leading-relaxed text-slate-300 sm:text-sm sm:leading-6">
              {description}
            </p>
          </Reveal>

          <StaggerReveal className="mt-5 space-y-2.5" stagger={0.06}>
            {capabilities.map(({ text, icon }) => (
              <StaggerRevealItem key={text}>
                <div className="flex items-center gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(160deg,#22d3ee,#2563eb)] text-white shadow-sm">
                    <DynamicIcon name={icon} className="h-3.5 w-3.5" strokeWidth={2.2} />
                  </span>
                  <p className="text-xs font-medium leading-snug text-slate-200 sm:text-sm">{text}</p>
                </div>
              </StaggerRevealItem>
            ))}
          </StaggerReveal>

          {ctaHref && ctaText && (
            <Reveal delay={0.15}>
              <div className="mt-6">
                <GradientButton href={ctaHref} variant="outline" size="md">
                  {ctaText} <ArrowRight className="h-4 w-4" />
                </GradientButton>
              </div>
            </Reveal>
          )}
        </div>

        <div className="relative">
          <StaggerReveal className="grid grid-cols-1 sm:grid-cols-2 gap-3.5" stagger={0.05}>
            {nodes.map((node) => (
              <StaggerRevealItem key={node.label}>
                <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-slate-900/60 p-3.5 transition-all duration-300 hover:border-cyan-400/50 hover:bg-slate-900/80">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[linear-gradient(150deg,#22d3ee,#2563eb)] text-white shadow-md">
                    <DynamicIcon name={node.icon} className="h-4.5 w-4.5" strokeWidth={2.2} />
                  </span>
                  <div className="min-w-0">
                    <h4 className="text-sm font-bold text-white leading-snug">{node.label}</h4>
                    <p className="mt-0.5 text-xs leading-relaxed text-slate-300">{node.desc}</p>
                  </div>
                </div>
              </StaggerRevealItem>
            ))}
          </StaggerReveal>
        </div>
      </Container>
    </section>
  );
}
