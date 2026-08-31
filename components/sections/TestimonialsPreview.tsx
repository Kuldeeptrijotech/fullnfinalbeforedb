"use client";

import Container from "@/components/ui/Container";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { ArrowLeft, ArrowRight, Quote, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState, type TouchEvent } from "react";
import type { TestimonialsSectionData, TestimonialItemData } from "@/lib/services/homepage.service";

export type TestimonialsPreviewProps = TestimonialsSectionData;

const AUTO_ROTATE_MS = 6500;

function loopIndex(index: number, length: number) {
  return ((index % length) + length) % length;
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function TestimonialsPreview({
  eyebrow,
  title,
  description,
  items = [],
}: TestimonialsPreviewProps) {
  const visibleTestimonials = items.filter((item) => item.showOnHome !== false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [cardsToShow, setCardsToShow] = useState(3);
  const sectionRef = useRef<HTMLElement>(null);
  const sectionInView = useInView(sectionRef, { amount: 0.05 });
  const [selectedTestimonial, setSelectedTestimonial] = useState<TestimonialItemData | null>(null);

  // Touch swipe handling
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // Responsive card count adjustment
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 640) {
        setCardsToShow(1);
      } else if (window.innerWidth < 1024) {
        setCardsToShow(2);
      } else {
        setCardsToShow(3);
      }
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const cardCount = Math.min(cardsToShow, visibleTestimonials.length);
  const visibleCards = Array.from({ length: cardCount }, (_, offset) =>
    visibleTestimonials[loopIndex(activeIndex + offset, visibleTestimonials.length)]
  );

  function goNext() {
    setActiveIndex((current) => loopIndex(current + 1, visibleTestimonials.length));
  }
  function goPrevious() {
    setActiveIndex((current) => loopIndex(current - 1, visibleTestimonials.length));
  }

  function handleTouchStart(e: TouchEvent) {
    touchStartX.current = e.targetTouches[0].clientX;
    touchEndX.current = null;
  }

  function handleTouchMove(e: TouchEvent) {
    touchEndX.current = e.targetTouches[0].clientX;
  }

  function handleTouchEnd() {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;
    if (distance > minSwipeDistance) {
      goNext();
    } else if (distance < -minSwipeDistance) {
      goPrevious();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  }

  useEffect(() => {
    const visibleCount = visibleTestimonials.length;
    if (visibleCount <= 1 || selectedTestimonial || !sectionInView) return;
    const timer = window.setInterval(() => {
      setActiveIndex((current) => loopIndex(current + 1, visibleCount));
    }, AUTO_ROTATE_MS);
    return () => window.clearInterval(timer);
  }, [visibleTestimonials.length, selectedTestimonial, sectionInView]);

  if (!visibleTestimonials.length) return null;

  return (
    <section
      ref={sectionRef}
      data-content-visibility="off"
      className="relative isolate overflow-hidden bg-[#18263e] py-12 sm:py-14 lg:py-16 text-white border-t border-white/10"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-20 tri-mesh opacity-60" />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-30 tri-grid-bg opacity-25" />
      <div
        aria-hidden
        className="tri-blob -z-10 h-72 w-72 animate-float-slow"
        style={{ left: "-8%", top: "20%", background: "radial-gradient(circle, rgba(255, 255, 255, 0.12), transparent 70%)" }}
      />

      <Container className="relative">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#38bdf8]">
              {eyebrow}
            </span>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
              {title}
            </h2>
            <p className="mt-2 max-w-xl text-xs leading-relaxed text-slate-300 sm:text-sm sm:leading-6">
              {description}
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={goPrevious}
              aria-label="Previous testimonial"
              className="flex size-9 sm:size-10 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-white backdrop-blur-md transition hover:border-[rgba(255,255,255,0.6)] hover:bg-white/[0.14] active:scale-95 focus-visible:ring-2 focus-visible:ring-cyan-400"
            >
              <ArrowLeft className="size-4" />
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label="Next testimonial"
              className="flex size-9 sm:size-10 items-center justify-center rounded-full bg-white hover:bg-slate-100 text-slate-900 shadow-lg transition hover:-translate-y-0.5 active:scale-95 focus-visible:ring-2 focus-visible:ring-cyan-400"
            >
              <ArrowRight className="size-4" />
            </button>
          </div>
        </div>

        {/* Responsive Cards Container with Touch Swipe */}
        <div
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="mt-7 sm:mt-8 grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-stretch"
        >
          <AnimatePresence mode="popLayout">
            {visibleCards.map((testimonial) => (
              <motion.article
                key={`${testimonial.companyName}-${testimonial.writerName}-${activeIndex}`}
                layout
                initial={{ opacity: 0, y: 16, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -16, scale: 0.98 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="flex h-full flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.04] p-5 sm:p-6 lg:p-7 backdrop-blur-md transition-all duration-300 hover:border-white/40 hover:bg-white/[0.07] hover:shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10">
                      <Quote className="size-4 text-white" />
                    </span>
                    <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.18em] text-cyan-200">
                      {testimonial.companyName}
                    </span>
                  </div>

                  <p className="mt-5 line-clamp-4 text-xs sm:text-sm leading-relaxed text-slate-300">
                    &ldquo;{testimonial.testimonial}&rdquo;
                  </p>
                </div>

                <div className="mt-5 pt-4">
                  <button
                    type="button"
                    onClick={() => setSelectedTestimonial(testimonial)}
                    className="text-xs sm:text-sm font-semibold text-cyan-300 transition hover:text-white focus-visible:ring-2 focus-visible:ring-cyan-400"
                  >
                    Read full review &rarr;
                  </button>

                  <div className="mt-4 flex items-center gap-3.5 border-t border-white/10 pt-4">
                    {testimonial.image ? (
                      <div className="relative size-10 sm:size-11 shrink-0 overflow-hidden rounded-full bg-slate-700 ring-2 ring-white/15">
                        <Image
                          src={testimonial.image}
                          alt={testimonial.imageAlt ?? testimonial.writerName}
                          fill
                          sizes="44px"
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="flex size-10 sm:size-11 shrink-0 items-center justify-center rounded-full bg-white text-xs sm:text-sm font-bold text-slate-900 ring-2 ring-white/15">
                        {getInitials(testimonial.writerName)}
                      </div>
                    )}

                    <div className="min-w-0">
                      <p className="truncate text-xs sm:text-sm font-semibold text-white">{testimonial.writerName}</p>
                      <p className="truncate text-[11px] sm:text-xs text-slate-400">{testimonial.designation}</p>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>

        {/* Interactive Pagination Dots */}
        <div className="mt-6 flex items-center justify-center gap-2">
          {visibleTestimonials.map((_, idx) => {
            const isSelected = activeIndex === idx;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveIndex(idx)}
                aria-label={`Go to testimonial ${idx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${isSelected
                  ? "w-7 bg-white"
                  : "w-2 bg-white/20 hover:bg-white/40"
                  }`}
              />
            );
          })}
        </div>
      </Container>

      {/* Modal Dialog for Full Testimonial */}
      <AnimatePresence>
        {selectedTestimonial && (
          <motion.div
            className="fixed inset-0 z-80 flex items-center justify-center bg-slate-950/80 p-4 sm:p-6 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            onClick={() => setSelectedTestimonial(null)}
          >
            <motion.div
              className="relative max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl sm:rounded-3xl border border-white/15 bg-[#0e1e33] p-6 sm:p-8 text-white shadow-2xl backdrop-blur-xl"
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.96 }}
              transition={{ duration: 0.25 }}
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setSelectedTestimonial(null)}
                aria-label="Close testimonial"
                className="tri-focus absolute right-4 top-4 flex size-8 sm:size-9 items-center justify-center rounded-full border border-white/15 bg-white/[0.08] text-slate-300 transition hover:bg-white/[0.18] hover:text-white"
              >
                <X className="size-4 sm:size-5" />
              </button>

              <div className="flex items-center gap-2">
                <Quote className="size-5 text-cyan-300" />
                <p className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-cyan-200">
                  {selectedTestimonial.companyName}
                </p>
              </div>

              <p className="mt-5 text-sm sm:text-base leading-relaxed text-slate-200">
                &ldquo;{selectedTestimonial.testimonial}&rdquo;
              </p>

              <div className="mt-6 flex items-center gap-3.5 border-t border-white/10 pt-5">
                {selectedTestimonial.image ? (
                  <div className="relative size-12 shrink-0 overflow-hidden rounded-full bg-slate-700 ring-2 ring-white/15">
                    <Image
                      src={selectedTestimonial.image}
                      alt={selectedTestimonial.imageAlt ?? selectedTestimonial.writerName}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(160deg,#22d3ee,#2563eb)] text-sm font-bold text-white ring-2 ring-white/15">
                    {getInitials(selectedTestimonial.writerName)}
                  </div>
                )}
                <div>
                  <p className="font-semibold text-white text-sm sm:text-base">{selectedTestimonial.writerName}</p>
                  <p className="text-xs sm:text-sm text-slate-400">{selectedTestimonial.designation}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
