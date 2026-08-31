"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { useRef, type ReactNode } from "react";
import AnimatedCounter from "@/components/motion/AnimatedCounter";

/* ─────────────────────────────────────────────────────────────
   Shared building blocks for the five premium Service subpages.
   Everything here is public-site only — nothing is shared with
   the /admin experience.
   ───────────────────────────────────────────────────────────── */

export const EASE = [0.22, 1, 0.36, 1] as const;

/** SAP-inspired blue technology foundation + Trijotech accents. */
export const SAP = {
  ink: "#121927",
  navy: "#1a2336",
  deep: "#162032",
  blue: "#0a6ed1",
  blueBright: "#2f8fff",
  azure: "#38bdf8",
  cyan: "#22d3ee",
  aqua: "#67e8f9",
  ice: "#ffffff",
  violet: "#8b7cf6",
  purple: "#a78bfa",
  amber: "#ffffff",
  green: "#ffffff",
  greenDeep: "#ffffff",
};

/** Consistent hero heading typography (clamp sized, tight, premium). */
export const heroH1 =
  "text-2xl sm:text-4xl lg:text-5xl font-bold leading-[1.15] tracking-tight text-white";

/** Consistent large intro statement. */
export const introLead =
  "text-xl sm:text-2xl lg:text-3xl font-bold leading-[1.2] tracking-tight";

/** Ease + duration used across page reveals. */
export const springEase = { ease: EASE, duration: 0.7 };

type PointerRotate = {
  bind: (e: React.PointerEvent<HTMLElement>) => void;
  reset: () => void;
  grabStart: () => void;
  grabEnd: () => void;
  rotateX: ReturnType<typeof useMotionValue<number>>;
  rotateY: ReturnType<typeof useMotionValue<number>>;
};

/**
 * Pointer rig for hero scenes.
 *  · hover  — gentle parallax tilt toward the cursor (desktop mouse only)
 *  · drag   — press + move to "orbit" the scene up to ~2.4x the hover range
 * Honors reduced motion.
 */
export function usePointerRotate(max = 6): PointerRotate {
  const reduce = useReducedMotion();
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const grabbing = useRef(false);
  const rotateX = useSpring(rx, { stiffness: 120, damping: 20, mass: 0.6 });
  const rotateY = useSpring(ry, { stiffness: 120, damping: 20, mass: 0.6 });

  const bind = (e: React.PointerEvent<HTMLElement>) => {
    if (reduce) return;
    if (e.pointerType !== "mouse") return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    const gain = grabbing.current ? 2.4 : 1;
    rx.set(-py * max * gain);
    ry.set(px * max * gain);
  };
  const grabStart = () => {
    grabbing.current = true;
  };
  const grabEnd = () => {
    grabbing.current = false;
  };
  const reset = () => {
    grabbing.current = false;
    rx.set(0);
    ry.set(0);
  };

  return { bind, reset, grabStart, grabEnd, rotateX, rotateY };
}

/* ── Section label ────────────────────────────────────────── */

export function SectionLabel({
  children,
  dark = false,
  className = "",
}: {
  children: ReactNode;
  dark?: boolean;
  className?: string;
}) {
  return (
    <span className={`service-section-label inline-flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.2em] ${className}`}>
      <span aria-hidden className="service-section-marker h-0.5 w-7 shrink-0 rounded-full" />
      <span className={dark ? "text-white" : "text-black"}>{children}</span>
    </span>
  );
}

/* ── Glass panel variants ─────────────────────────────────── */

export type GlassVariant = "frosted" | "transparent" | "dark" | "light";

const GLASS: Record<GlassVariant, string> = {
  frosted: "bg-white/[0.07] border border-white/15",
  transparent: "bg-white/[0.03] backdrop-blur-sm border border-white/10",
  dark: "bg-[#162032]/80 border border-white/12",
  light: "bg-white/85 border border-[#cfe4f5]",
};

export function Glass({
  children,
  variant = "frosted",
  tone,
  className = "",
  shine = true,
}: {
  children: ReactNode;
  variant?: GlassVariant;
  tone?: "blue" | "cyan" | "violet" | "amber" | "green";
  className?: string;
  shine?: boolean;
}) {
  const toneGlow: Record<string, string> = {
    blue: "rgba(47,143,255,0.35)",
    cyan: "rgba(34,211,238,0.32)",
    violet: "rgba(139,124,246,0.32)",
    amber: "rgba(255, 255, 255,0.28)",
    green: "rgba(255, 255, 255,0.3)",
  };
  const glow = tone ? toneGlow[tone] : toneGlow.cyan;
  return (
    <div className={`service-glass-card group/glass relative flex h-full flex-col overflow-hidden rounded-2xl shadow-[0_24px_70px_-28px_rgba(3,7,19,0.6)] transition-transform duration-300 ${GLASS[variant]} ${className}`}>
      {tone && (
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-25 blur-3xl transition-opacity duration-300 group-hover/glass:opacity-45"
          style={{ background: `radial-gradient(circle, ${glow}, transparent 70%)` }}
        />
      )}
      {shine && (
        <div aria-hidden className="pointer-events-none absolute inset-0 -translate-x-[130%] skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/[0.05] to-transparent transition-transform duration-700 group-hover/glass:translate-x-[130%]" />
      )}
      <div className="relative z-10 flex h-full w-full flex-1 flex-col justify-between">{children}</div>
    </div>
  );
}

/* ── Metric with animated counter ─────────────────────────── */

export function Metric({
  to,
  suffix = "",
  prefix = "",
  label,
  accent = "text-white",
  sub,
  dark = false,
  labelClassName,
  subClassName,
}: {
  to: number;
  suffix?: string;
  prefix?: string;
  label: string;
  accent?: string;
  sub?: string;
  dark?: boolean;
  labelClassName?: string;
  subClassName?: string;
}) {
  return (
    <div className="relative flex h-full flex-col justify-between">
      <p className={`flex h-10 items-end whitespace-nowrap text-3xl font-extrabold tracking-tight sm:h-12 sm:text-4xl lg:text-5xl ${accent}`}>
        <AnimatedCounter to={to} prefix={prefix} suffix={suffix} />
      </p>
      <div className="mt-3 flex flex-1 flex-col justify-end">
        <p className={`text-xs sm:text-sm font-semibold leading-snug ${labelClassName ?? (dark ? "text-white/90" : "text-black")}`}>{label}</p>
        {sub && <p className={`mt-1 text-[11px] sm:text-xs leading-4 ${subClassName ?? (dark ? "text-white/50" : "text-slate-600")}`}>{sub}</p>}
      </div>
    </div>
  );
}
