import type { BlogPost } from "@/lib/types/blog.types";
import type { CSSProperties } from "react";

type Block = BlogPost["contentBlocks"][number];
type BlockType = Block["type"];

export function resolveBlockStyle(
  style?: Block["style"],
  type?: BlockType,
  headingLevel: number = 2
): CSSProperties {
  if (!style) return {};

  // Font family
  const fontFamily =
    style.fontFamily === "serif"
      ? 'Merriweather, Georgia, Cambria, "Times New Roman", serif'
      : style.fontFamily === "mono"
      ? '"JetBrains Mono", Menlo, Monaco, Consolas, monospace'
      : style.fontFamily === "display"
      ? '"Syne", "Montserrat", "Poppins", sans-serif'
      : undefined;

  // Font size
  const textSize = style.fontSize || "medium";
  const fontSize =
    type === "heading" || type === "subheading"
      ? `${Math.round(
          ({ 1: 38, 2: 30, 3: 24, 4: 20, 5: 18, 6: 15 }[
            (headingLevel as 1 | 2 | 3 | 4 | 5 | 6) || 2
          ] || 30) *
            ({ small: 0.85, medium: 1, large: 1.18, xlarge: 1.35, huge: 1.6 }[
              textSize
            ] || 1)
        )}px`
      : {
          small: "14px",
          medium: "16px",
          large: "19px",
          xlarge: "23px",
          huge: "28px",
        }[textSize] || "16px";

  // Spacing & Margins
  let marginTop: string | undefined = style.customMarginTop
    ? `${style.customMarginTop}px`
    : undefined;
  let marginBottom: string | undefined = style.customMarginBottom
    ? `${style.customMarginBottom}px`
    : undefined;
  if (!marginTop && !marginBottom) {
    if (style.spacing === "none") {
      marginTop = "0px";
      marginBottom = "0px";
    } else if (style.spacing === "compact") {
      marginTop = "10px";
      marginBottom = "10px";
    } else if (style.spacing === "spacious") {
      marginTop = "36px";
      marginBottom = "36px";
    } else {
      marginTop = "20px";
      marginBottom = "20px";
    }
  }

  // Background & Gradients
  let backgroundImage: string | undefined;
  let backgroundColor = style.backgroundColor || undefined;
  if (style.backgroundGradient === "emerald") {
    backgroundImage =
      "linear-gradient(135deg, rgba(255, 255, 255,0.18) 0%, rgba(9,21,39,0.06) 100%)";
  } else if (style.backgroundGradient === "amber") {
    backgroundImage =
      "linear-gradient(135deg, rgba(255, 255, 255,0.2) 0%, rgba(255,255,255,0.02) 100%)";
  } else if (style.backgroundGradient === "midnight") {
    backgroundImage =
      "linear-gradient(135deg, #101c30 0%, #0a1322 100%)";
    if (!style.textColor) style.textColor = "#f8fafc";
  } else if (style.backgroundGradient === "cyan") {
    backgroundImage =
      "linear-gradient(135deg, rgba(56,189,248,0.2) 0%, rgba(9,21,39,0.05) 100%)";
  } else if (style.backgroundGradient === "glass") {
    backgroundColor = "rgba(18, 30, 49, 0.75)";
    backgroundImage =
      "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)";
  } else if (style.backgroundGradient === "frost") {
    backgroundImage =
      "linear-gradient(135deg, #f0f7ff 0%, #f7fbfe 100%)";
  }

  // Line height
  const lineHeight =
    style.lineHeight === "tight"
      ? "1.25"
      : style.lineHeight === "compact"
      ? "1.4"
      : style.lineHeight === "relaxed"
      ? "2.0"
      : style.lineHeight === "loose"
      ? "2.3"
      : "1.75";

  // Letter spacing
  const letterSpacing =
    style.letterSpacing === "tighter"
      ? "-0.03em"
      : style.letterSpacing === "tight"
      ? "-0.015em"
      : style.letterSpacing === "wide"
      ? "0.05em"
      : style.letterSpacing === "wider"
      ? "0.15em"
      : undefined;

  // Box shadow & glow
  let boxShadow: string | undefined;
  if (style.boxShadow === "soft") boxShadow = "0 4px 14px rgba(0,0,0,0.07)";
  else if (style.boxShadow === "medium")
    boxShadow = "0 10px 25px rgba(0,0,0,0.14)";
  else if (style.boxShadow === "deep")
    boxShadow = "0 20px 45px rgba(0,0,0,0.24)";
  else if (style.boxShadow === "glow-green")
    boxShadow = "0 0 25px rgba(255, 255, 255,0.35)";
  else if (style.boxShadow === "glow-amber")
    boxShadow = "0 0 25px rgba(255, 255, 255,0.35)";
  else if (style.boxShadow === "glow-cyan")
    boxShadow = "0 0 25px rgba(56,189,248,0.35)";

  // Border
  let border: string | undefined;
  if (style.borderStyle && style.borderStyle !== "none") {
    const w = style.borderWidth ? `${style.borderWidth}px` : "1px";
    const c = style.borderColor || "rgba(255,255,255,0.18)";
    border = `${w} ${style.borderStyle} ${c}`;
  } else if (style.borderColor) {
    border = `1px solid ${style.borderColor}`;
  }

  // Opacity
  const opacity = style.opacity
    ? `${Number(style.opacity) / 100}`
    : undefined;

  // Padding
  const padding = style.padding
    ? `${style.padding}px`
    : backgroundColor || backgroundImage
    ? "20px"
    : "0px";

  // Border radius
  const borderRadius = style.blockRadius
    ? style.blockRadius === "999"
      ? "9999px"
      : `${style.blockRadius}px`
    : undefined;

  // Parse custom inline CSS string (e.g. "filter: blur(1px); text-shadow: 0 2px 4px black;")
  const customStyleObj: Record<string, string> = {};
  if (style.customCss) {
    try {
      style.customCss.split(";").forEach((rule) => {
        const colon = rule.indexOf(":");
        if (colon > 0) {
          const k = rule.slice(0, colon).trim();
          const v = rule.slice(colon + 1).trim();
          if (k && v) {
            const camelKey = k.replace(/-([a-z])/g, (_, g) => g.toUpperCase());
            customStyleObj[camelKey] = v;
          }
        }
      });
    } catch {
      // ignore
    }
  }

  return {
    fontFamily,
    fontSize,
    textAlign: style.textAlign || "left",
    color: style.textColor || undefined,
    backgroundColor,
    backgroundImage,
    fontWeight: style.fontWeight || "400",
    fontStyle: style.fontStyle || "normal",
    textDecoration: style.textDecoration || "none",
    lineHeight,
    letterSpacing,
    textTransform: style.textTransform || "none",
    padding,
    marginTop,
    marginBottom,
    borderRadius,
    border,
    boxShadow,
    opacity,
    ...customStyleObj,
  };
}
