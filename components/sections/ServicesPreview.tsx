import Link from "next/link";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { StaggerReveal, StaggerRevealItem } from "@/components/motion/Reveal";
import { ArrowRight } from "lucide-react";
import DynamicIcon from "@/components/ui/DynamicIcon";
import type { ServicesSectionData } from "@/lib/services/homepage.service";

export type ServicesPreviewProps = ServicesSectionData;

export default function ServicesPreview({
  eyebrow,
  title,
  description,
  viewAllText,
  viewAllHref,
  learnMoreText,
  items = [],
}: ServicesPreviewProps) {
  const featuredServices = items.filter((service) => service.showOnHome !== false);

  return (
    <section className="relative isolate overflow-hidden bg-[#a8c0f1] bg-[radial-gradient(circle_at_15%_20%,#85a1da_0%,transparent_45%),radial-gradient(circle_at_70%_15%,#9eb6ce_0%,transparent_50%),radial-gradient(circle_at_35%_65%,#9cafda_0%,transparent_55%),radial-gradient(circle_at_85%_70%,#97b3f0_0%,transparent_50%),radial-gradient(circle_at_10%_90%,#c2dbec_0%,transparent_40%)] bg-blend-screen py-12 sm:py-14 lg:py-16 text-slate-900 border-t border-slate-200">
      <Container className="relative">
        <StaggerReveal className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <StaggerRevealItem className="max-w-2xl">
            <SectionHeading
              eyebrow={eyebrow}
              dark={false}
              title={title}
              description={description}
            />
          </StaggerRevealItem>
          {viewAllHref && viewAllText && (
            <StaggerRevealItem>
              <Link
                href={viewAllHref}
                className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-2.5 text-xs sm:text-sm font-semibold text-slate-900 shadow-xs hover:bg-slate-50 transition-all"
              >
                {viewAllText} <ArrowRight className="h-4 w-4" />
              </Link>
            </StaggerRevealItem>
          )}
        </StaggerReveal>

        <StaggerReveal className="mt-7 sm:mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 items-stretch" stagger={0.07}>
          {featuredServices.map((service) => (
            <StaggerRevealItem key={service.href || service.title} className="h-full">
              <Link
                href={service.href}
                className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 text-slate-900 shadow-sm transition-all duration-300 hover:border-slate-400 hover:shadow-md sm:p-6"
              >
                <div className="flex items-center text-cyan-600">
                  <DynamicIcon name={service.icon} className="h-7 w-7 text-cyan-600 stroke-cyan-600" strokeWidth={2} />
                </div>
                <h3 className="mt-4 text-base font-bold leading-snug text-slate-900 sm:text-lg">
                  {service.title}
                </h3>
                <p className="mt-2 flex-1 text-xs leading-relaxed text-slate-600 sm:text-sm">{service.description}</p>
                <div className="mt-auto pt-5">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-600 group-hover:text-cyan-700 sm:text-sm">
                    {learnMoreText || "Learn more"} <ArrowRight aria-hidden="true" className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </StaggerRevealItem>
          ))}
        </StaggerReveal>
      </Container>
    </section>
  );
}
