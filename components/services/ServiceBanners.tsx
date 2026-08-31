import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ServiceMockupComponents } from "./ServiceMockups";
import type { ServiceBannerItemData } from "@/lib/services/services.service";

export type ServiceBannerItem = ServiceBannerItemData;

export default function ServiceBanners({ services }: { services?: ServiceBannerItem[] }) {
  const items = services && services.length > 0 ? services : [];
  return (
    <section id="explore-services" className="service-banners-section w-full overflow-hidden">
      <div className="service-banners-container w-full">
        {items.map((item, index) => {
          const isDark = index % 2 === 1; // 0=White, 1=Dark, 2=White, 3=Dark, 4=White
          const isImageRight = index % 2 === 0; // 0=Right, 1=Left, 2=Right, 3=Left, 4=Right
          const Mockup = ServiceMockupComponents[item.slug as keyof typeof ServiceMockupComponents];

          return (
            <div
              key={item.slug}
              id={item.rowId}
              className={`service-banner-row service-row-${item.slug} group relative w-full border-b transition-colors duration-300 ${
                isDark
                  ? "bg-[#050817] text-white border-transparent"
                  : "bg-[#a8c0f1] bg-[radial-gradient(circle_at_15%_20%,#85a1da_0%,transparent_45%),radial-gradient(circle_at_70%_15%,#9eb6ce_0%,transparent_50%),radial-gradient(circle_at_35%_65%,#9cafda_0%,transparent_55%),radial-gradient(circle_at_85%_70%,#97b3f0_0%,transparent_50%),radial-gradient(circle_at_10%_90%,#c2dbec_0%,transparent_40%)] bg-blend-screen text-black border-slate-200"
              }`}
            >
              <div className="service-banner-inner mx-auto grid w-full max-w-[1600px] grid-cols-1 lg:grid-cols-2 lg:items-stretch">
                {/* ── 50% UI Mockup Column: Mobile Order 1 / Desktop Order 2 (if right) or Order 1 (if left) ── */}
                <div
                  className={`service-col-image order-1 ${
                    isImageRight ? "lg:order-2" : "lg:order-1"
                  } relative flex items-center justify-center min-h-[300px] sm:min-h-[360px] md:min-h-[420px] lg:h-auto lg:min-h-[480px] w-full overflow-hidden p-4 sm:p-6 lg:p-10`}
                >
                  {Mockup ? (
                    <Mockup />
                  ) : (
                    <div className="service-image-frame relative h-full w-full flex items-center justify-center">
                      <Image
                        src={item.image}
                        alt={item.imageAlt}
                        fill
                        unoptimized
                        priority={index < 2}
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="service-photo object-contain object-center transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                    </div>
                  )}
                </div>

                {/* ── 50% Content Column: Mobile Order 2 / Desktop Order 1 (if image right) or Order 2 (if image left) ── */}
                <div
                  className={`service-col-content order-2 ${
                    isImageRight
                      ? "lg:order-1 lg:pl-10 lg:pr-10 xl:pl-16 xl:pr-14"
                      : "lg:order-2 lg:pl-10 lg:pr-10 xl:pl-14 xl:pr-16"
                  } flex flex-col justify-center px-6 py-8 sm:px-10 sm:py-12 lg:py-16`}
                >
                  {/* Number badge */}
                  <div className="service-num-wrapper flex items-center">
                    <span
                      className={`service-number-badge text-3xl font-black tracking-tight sm:text-4xl ${
                        isDark ? "text-[#38bdf8]" : "text-slate-900"
                      }`}
                    >
                      {item.number}
                    </span>
                  </div>

                  {/* Service Title */}
                  <h3
                    className={`service-heading-title mt-3 text-2xl font-black uppercase tracking-tight sm:text-3xl lg:text-[1.85rem] xl:text-[2.05rem] leading-[1.15] ${
                      isDark ? "text-white" : "text-black"
                    }`}
                  >
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p
                    className={`service-paragraph-description mt-3.5 text-sm sm:text-base leading-relaxed font-medium ${
                      isDark ? "text-slate-300" : "text-slate-700"
                    }`}
                  >
                    {item.description}
                  </p>

                  {/* WHAT WE ENABLE */}
                  <div
                    className={`service-enable-wrapper mt-6 border-t pt-5 ${
                      isDark ? "border-transparent" : "border-slate-200"
                    }`}
                  >
                    <p
                      className={`service-enable-heading text-[11px] font-black tracking-[0.24em] uppercase ${
                        isDark ? "text-[#38bdf8]" : "text-slate-900"
                      }`}
                    >
                      WHAT WE ENABLE
                    </p>

                    {/* 2-Column Responsive Grid of Enables */}
                    <ul className="service-enable-list mt-3.5 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5">
                      {item.enables.map((label) => (
                        <li
                          key={label}
                          className={`service-enable-item flex items-center gap-2.5 text-xs sm:text-sm font-semibold ${
                            isDark ? "text-white" : "text-slate-900"
                          }`}
                        >
                          <span
                            className={`service-bullet-dot h-2 w-2 shrink-0 rounded-full ${
                              isDark ? "bg-[#38bdf8]" : "bg-slate-900"
                            }`}
                          />
                          <span>{label}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Explore Service Link */}
                  <div className="mt-7">
                    <Link
                      href={`/services/${item.slug}`}
                      className={`inline-flex items-center gap-2 rounded-full px-6 py-3 text-xs sm:text-sm font-bold transition-all duration-200 border-0 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 ${
                        isDark ? "bg-white text-slate-950 hover:bg-slate-100" : "bg-slate-900 text-white hover:bg-slate-800"
                      }`}
                    >
                      Explore Service
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
