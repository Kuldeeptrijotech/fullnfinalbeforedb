"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";

type ServiceHeroProps = {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  metrics?: { value: string; label: string }[];
  heading?: ReactNode;
  scene?: ReactNode;
  bgClass?: string;
  fadeTo?: string;
  glow?: [string, string];
  heroImage?: string;
};

export default function ServiceHero({
  eyebrow = "SAP Enterprise Services",
  title = "End-to-End SAP Transformation & Consulting",
  subtitle = "Delivering scalable architecture, cloud integration, and measurable business outcomes.",
  description = "",
  primaryCta = { label: "Consult our SAP experts", href: "/contact" },
  secondaryCta = { label: "Explore all services", href: "/services" },
  metrics = [
    { value: "9+", label: "Years Experience" },
    { value: "100%", label: "Delivery Ownership" },
    { value: "24/7", label: "Enterprise Support" },
  ],
  heading,
  bgClass = "bg-[#050817]",
  heroImage = "/assets/heroes/services-blue.png",
}: ServiceHeroProps) {
  return (
    <section className={`relative isolate flex min-h-[75vh] w-full flex-col justify-center overflow-hidden ${bgClass} pb-16 pt-32 sm:pt-36 lg:min-h-[640px] lg:py-24`}>
      {heroImage && (
        <div aria-hidden className="absolute inset-0 -z-20 overflow-hidden">
          <Image
            src={heroImage}
            alt={title || "Service Hero"}
            fill
            priority
            loading="eager"
            sizes="100vw"
            className="h-full w-full object-cover object-center brightness-[0.88] contrast-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#030713]/80 via-[#030713]/35 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#030713] to-transparent" />
        </div>
      )}

      <Container className="relative z-10 mx-auto w-full max-w-7xl">
        {heading ? (
          <div className="max-w-3xl">{heading}</div>
        ) : (
          <div className="flex max-w-4xl flex-col items-start text-left">
            <h1 className="text-3xl font-extrabold leading-[1.15] tracking-tight text-white drop-shadow-md sm:text-4xl lg:text-5xl">
              {title}
            </h1>

            {subtitle && (
              <p className="mt-5 text-lg font-semibold leading-relaxed text-white drop-shadow-md sm:text-xl">
                {subtitle}
              </p>
            )}

            {description && (
              <p className="mt-4 max-w-2xl text-base font-normal leading-[1.7] text-white/90 drop-shadow sm:text-lg">
                {description}
              </p>
            )}

            <div className="mt-9 flex flex-wrap items-center gap-4 relative z-10">
              {primaryCta && (
                <Link
                  href={primaryCta.href}
                  className="inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 text-sm font-bold text-slate-950 bg-white hover:bg-slate-100 border-0 shadow-[0_8px_20px_rgba(255,255,255,0.25)] hover:shadow-[0_12px_28px_rgba(255,255,255,0.4)] hover:-translate-y-0.5 active:translate-y-0 relative z-10 hover:z-20 transition-all duration-200"
                >
                  {primaryCta.label} <ArrowRight className="h-4 w-4" />
                </Link>
              )}
              {secondaryCta && (
                <Link
                  href={secondaryCta.href}
                  className="inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 text-sm font-semibold text-white border border-white/20 bg-white/5 hover:bg-white/10 hover:-translate-y-0.5 active:translate-y-0 relative z-10 hover:z-20 transition-all duration-200"
                >
                  {secondaryCta.label}
                </Link>
              )}
            </div>
          </div>
        )}
      </Container>

      <div aria-hidden className="absolute inset-x-0 bottom-0 z-30 h-px bg-white/15" />
    </section>
  );
}
