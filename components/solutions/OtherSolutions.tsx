import Image from "next/image";
import OptimizedVideo from "@/components/ui/OptimizedVideo";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getSolutionsPageData } from "@/lib/services/solutions.service";

export default async function OtherSolutions({ currentSlug }: { currentSlug: string }) {
  const allSolutions = await getSolutionsPageData();
  const others = allSolutions.filter((s) => s.slug !== currentSlug);
  if (others.length === 0) return null;

  return (
    <section className="relative isolate overflow-hidden bg-[#a8c0f1] bg-[radial-gradient(circle_at_15%_20%,#85a1da_0%,transparent_45%),radial-gradient(circle_at_70%_15%,#9eb6ce_0%,transparent_50%),radial-gradient(circle_at_35%_65%,#9cafda_0%,transparent_55%),radial-gradient(circle_at_85%_70%,#97b3f0_0%,transparent_50%),radial-gradient(circle_at_10%_90%,#c2dbec_0%,transparent_40%)] bg-blend-screen py-12 sm:py-14 lg:py-16 border-t border-slate-200 text-slate-900">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-black">More from Trijotech</p>
        <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
          Explore Other Solutions
        </h2>
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          {others.map((solution) => (
            <article
              key={solution.slug}
              className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_6px_24px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-slate-400 hover:shadow-[0_16px_36px_rgba(0,0,0,0.12)]"
            >
              <Link href={solution.href} className="no-underline relative block aspect-[16/10] w-full shrink-0 overflow-hidden bg-slate-900">
                {solution.cardImage && solution.cardImage.toLowerCase().match(/\.(mp4|webm)$/) !== null ? (
                  <OptimizedVideo
                    src={solution.cardImage}
                    alt={solution.imageAlt}
                    className="pointer-events-none absolute inset-[-2px] h-[calc(100%+4px)] w-[calc(100%+4px)] object-cover origin-center scale-[1.04]"
                  />
                ) : (
                  <Image
                    src={solution.cardImage || "/assets/heroes/products-blue.png"}
                    alt={solution.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover origin-center scale-[1.04]"
                  />
                )}
                <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[rgba(14,26,44,0.7)] via-transparent to-transparent" />
              </Link>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-slate-700 transition-colors">{solution.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-6 text-slate-600">{solution.shortDescription}</p>
                <Link href={solution.href} className="mt-auto inline-flex items-center gap-2 pt-5 font-bold text-cyan-600 transition-all duration-200 group-hover:gap-3 group-hover:text-cyan-700">
                  Explore Solution <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
