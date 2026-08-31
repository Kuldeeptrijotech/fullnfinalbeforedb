"use client";

import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import type { ContentEntry, SiteContent } from "@/app/lib/content-store";
import { getAnimationConfig } from "@/app/lib/animation-config";

const normalize = (value: string) => value.replace(/\s+/g, " ").trim();

function safeHtml(value: string): string {
  const template = document.createElement("template");
  template.innerHTML = value;
  template.content
    .querySelectorAll("script,style,iframe,object,embed,form")
    .forEach((node) => node.remove());
  template.content.querySelectorAll<HTMLElement>("*").forEach((node) => {
    for (const attribute of Array.from(node.attributes)) {
      if (/^on/i.test(attribute.name) || /javascript:/i.test(attribute.value))
        node.removeAttribute(attribute.name);
    }
  });
  return template.innerHTML;
}

function cleanClass(name: string): boolean {
  if (!name || typeof name !== "string") return false;
  // Ignore state and ephemeral admin classes
  if (/^(is-|active|slick|swiper|current|admin-|open|show|focus)/i.test(name)) return false;
  // Ignore classes with special punctuation (like Tailwind arbitrary values / responsive prefixes)
  if (/[[\]\\/:%$(.)#]/.test(name)) return false;
  // Ignore common generic layout utilities that might be unstable across builds
  if (
    /^(flex|grid|block|inline|hidden|relative|absolute|static|fixed|isolate|mx-|my-|mt-|mb-|ml-|mr-|pt-|pb-|pl-|pr-|p-|m-|w-|h-|max-|min-|gap-|text-|bg-|border-|rounded-|leading-|tracking-|opacity-|z-|top-|bottom-|left-|right-)/.test(
      name
    )
  )
    return false;
  return true;
}

function cssPath(element: Element): string {
  if (element.id && !/^(admin-|__)/.test(element.id)) return `#${CSS.escape(element.id)}`;

  const parts: string[] = [];
  let current: Element | null = element;

  while (
    current &&
    current !== document.body &&
    current !== document.documentElement &&
    parts.length < 8
  ) {
    if (current.id && !/^(admin-|__)/.test(current.id)) {
      parts.unshift(`#${CSS.escape(current.id)}`);
      break;
    }

    let part = current.tagName.toLowerCase();

    // Select stable semantic classes
    const validClasses = Array.from(current.classList).filter(cleanClass).slice(0, 2);
    if (validClasses.length) {
      part += validClasses.map((cls) => `.${CSS.escape(cls)}`).join("");
    }

    const parent: Element | null = current.parentElement;
    if (parent) {
      const siblings = Array.from(parent.children).filter(
        (child) => child.tagName === current?.tagName
      );
      if (siblings.length > 1) {
        const index = siblings.indexOf(current) + 1;
        part += `:nth-of-type(${index})`;
      }
    }

    parts.unshift(part);
    current = parent;
  }

  return parts.join(" > ");
}

function applyEntry(entry: ContentEntry) {
  // Strip any accidental admin state classes from selector
  const cleanSelector = entry.selector.replace(/\.admin-edit-(selected|hover)/g, "").trim();
  if (!cleanSelector) return;

  let elements: NodeListOf<HTMLElement>;
  try {
    elements = document.querySelectorAll<HTMLElement>(cleanSelector);
  } catch {
    return;
  }

  elements.forEach((element) => {
    if (entry.kind === "sectionStyle") {
      try {
        const options = JSON.parse(entry.value) as {
          width?: string;
          maxWidth?: string;
          minHeight?: string;
          height?: string;
          paddingTop?: string;
          paddingBottom?: string;
          paddingLeft?: string;
          paddingRight?: string;
          marginTop?: string;
          marginBottom?: string;
          backgroundColor?: string;
          background?: string;
          borderRadius?: string;
          layout?: string;
          columns?: string;
          gap?: string;
          display?: string;
          hidden?: boolean;
        };
        if (options.width) {
          element.style.width = options.width;
          element.style.maxWidth = options.width !== "100%" ? options.width : "";
          element.style.marginInline = options.width !== "100%" ? "auto" : "";
        }
        if (options.maxWidth) element.style.maxWidth = options.maxWidth;
        if (options.minHeight) element.style.minHeight = options.minHeight;
        if (options.height) element.style.height = options.height;
        if (options.paddingTop) element.style.paddingTop = options.paddingTop;
        if (options.paddingBottom) element.style.paddingBottom = options.paddingBottom;
        if (options.paddingLeft) element.style.paddingLeft = options.paddingLeft;
        if (options.paddingRight) element.style.paddingRight = options.paddingRight;
        if (options.marginTop) element.style.marginTop = options.marginTop;
        if (options.marginBottom) element.style.marginBottom = options.marginBottom;
        if (options.backgroundColor) element.style.backgroundColor = options.backgroundColor;
        if (options.background) element.style.background = options.background;
        if (options.borderRadius) element.style.borderRadius = options.borderRadius;
        if (options.gap) element.style.gap = options.gap;
        if (options.display) element.style.display = options.display;
        element.toggleAttribute("hidden", Boolean(options.hidden));
        element.dataset.adminLayout = options.layout || "original";
        element.style.setProperty("--admin-columns", options.columns || "3");
      } catch {
        return;
      }
      return;
    }

    if (entry.kind === "imageStyle") {
      try {
        const options = JSON.parse(entry.value) as {
          width?: string;
          maxWidth?: string;
          minWidth?: string;
          height?: string;
          minHeight?: string;
          maxHeight?: string;
          aspectRatio?: string;
          objectFit?: string;
          objectPosition?: string;
          borderRadius?: string;
          filter?: string;
          opacity?: string;
          margin?: string;
          boxShadow?: string;
        };
        if (options.width !== undefined) element.style.width = options.width;
        if (options.maxWidth !== undefined) element.style.maxWidth = options.maxWidth;
        if (options.minWidth !== undefined) element.style.minWidth = options.minWidth;
        if (options.height !== undefined) element.style.height = options.height;
        if (options.minHeight !== undefined) element.style.minHeight = options.minHeight;
        if (options.maxHeight !== undefined) element.style.maxHeight = options.maxHeight;
        if (options.aspectRatio !== undefined) element.style.aspectRatio = options.aspectRatio;
        if (options.objectFit !== undefined) element.style.objectFit = options.objectFit;
        if (options.objectPosition !== undefined) element.style.objectPosition = options.objectPosition;
        if (options.borderRadius !== undefined) element.style.borderRadius = options.borderRadius;
        if (options.filter !== undefined) element.style.filter = options.filter;
        if (options.opacity !== undefined) element.style.opacity = options.opacity;
        if (options.margin !== undefined) element.style.margin = options.margin;
        if (options.boxShadow !== undefined) element.style.boxShadow = options.boxShadow;
      } catch {
        return;
      }
      return;
    }

    if (entry.kind === "elementStyle") {
      try {
        const options = JSON.parse(entry.value) as {
          fontSize?: string;
          fontWeight?: string;
          color?: string;
          textAlign?: string;
          lineHeight?: string;
          letterSpacing?: string;
          padding?: string;
          margin?: string;
          marginTop?: string;
          marginBottom?: string;
          backgroundColor?: string;
          background?: string;
          borderRadius?: string;
          border?: string;
          boxShadow?: string;
          display?: string;
        };
        if (options.fontSize !== undefined) element.style.fontSize = options.fontSize;
        if (options.fontWeight !== undefined) element.style.fontWeight = options.fontWeight;
        if (options.color !== undefined) {
          element.style.color = options.color;
          element.style.webkitTextFillColor = options.color;
        }
        if (options.textAlign !== undefined) element.style.textAlign = options.textAlign;
        if (options.lineHeight !== undefined) element.style.lineHeight = options.lineHeight;
        if (options.letterSpacing !== undefined) element.style.letterSpacing = options.letterSpacing;
        if (options.padding !== undefined) element.style.padding = options.padding;
        if (options.margin !== undefined) element.style.margin = options.margin;
        if (options.marginTop !== undefined) element.style.marginTop = options.marginTop;
        if (options.marginBottom !== undefined) element.style.marginBottom = options.marginBottom;
        if (options.backgroundColor !== undefined) element.style.backgroundColor = options.backgroundColor;
        if (options.background !== undefined) element.style.background = options.background;
        if (options.borderRadius !== undefined) element.style.borderRadius = options.borderRadius;
        if (options.border !== undefined) element.style.border = options.border;
        if (options.boxShadow !== undefined) element.style.boxShadow = options.boxShadow;
        if (options.display !== undefined) element.style.display = options.display;
      } catch {
        return;
      }
      return;
    }

    if (entry.kind === "appendHtml" || entry.kind === "insertAfter") {
      if (document.querySelector(`[data-admin-entry="${CSS.escape(entry.id)}"]`)) return;
      const wrapper = document.createElement(entry.kind === "insertAfter" ? "section" : "div");
      wrapper.dataset.adminEntry = entry.id;
      wrapper.className = entry.kind === "insertAfter" ? "admin-created-section" : "admin-added-content";
      wrapper.innerHTML = safeHtml(entry.value);
      if (entry.kind === "insertAfter") element.insertAdjacentElement("afterend", wrapper);
      else element.appendChild(wrapper);
      return;
    }
    if (entry.kind === "html") {
      const current = normalize(element.innerHTML);
      const target = normalize(entry.value);
      if (current === target) return;
      element.innerHTML = safeHtml(entry.value);
      return;
    }
    if (entry.kind === "backgroundImage") {
      if (!entry.value) { element.style.removeProperty("background-image"); return; }
      const current = element.style.backgroundImage.replace(/^url\(["']?|["']?\)$/g, "");
      if (current === entry.value) return;
      element.style.backgroundImage = `url("${entry.value}")`;
      return;
    }
    if (entry.attribute) {
      if (!entry.value) {
        if (entry.attribute === "data-media-src" || entry.attribute === "data-admin-animation") element.setAttribute(entry.attribute, "");
        else element.removeAttribute(entry.attribute);
        if (entry.attribute === "data-media-src") element.removeAttribute("src");
        if (element instanceof HTMLVideoElement) element.load();
        return;
      }
      const current = element.getAttribute(entry.attribute) || "";
      if (current === entry.value) return;
      element.setAttribute(entry.attribute, entry.value);
      if (entry.attribute === "src") {
        element.removeAttribute("srcset");
        element.removeAttribute("sizes");
        if (element instanceof HTMLVideoElement) element.load();
      }
    }
  });
}

function editableTarget(origin: Element): HTMLElement {
  return (origin.closest("h1,h2,h3,h4,h5,h6,p,a,button,img,video,li,span,label,article,section,div[class*='card']") ||
    origin) as HTMLElement;
}

function cardSelectionTarget(origin: Element): HTMLElement {
  const fallback = editableTarget(origin);
  const card = origin.closest<HTMLElement>("article, [class*='card']");
  if (!card) return fallback;

  const isDirectText = fallback.matches("h1,h2,h3,h4,h5,h6,p,span,label,blockquote") ||
    ((fallback.tagName === "A" || fallback.tagName === "BUTTON") && !fallback.querySelector("video, img"));
  if (isDirectText) return fallback;

  return card.querySelector<HTMLElement>("h1,h2,h3,h4,h5,h6,p,[data-admin-card-title]") || fallback;
}

export default function ContentRuntime({ content }: { content: SiteContent }) {
  const pathname = usePathname();
  const [siteContent, setSiteContent] = useState<SiteContent>(content);
  const [previewEntries, setPreviewEntries] = useState<ContentEntry[]>([]);
  const applying = useRef(false);

  // Sync latest content on client mount to bypass static page cache
  useEffect(() => {
    let active = true;
    fetch("/api/content", { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : null))
      .then((fresh) => {
        if (active && fresh?.version) {
          setSiteContent(fresh);
        }
      })
      .catch(() => undefined);
    return () => {
      active = false;
    };
  }, [pathname]);

  const entries = useMemo(() => {
    const global = Object.values(siteContent.global.sections).flatMap((section) => section.entries);
    const page = Object.values(siteContent.pages[pathname]?.sections ?? {}).flatMap(
      (section) => section.entries
    );
    const all = [...global, ...page];
    if (previewEntries.length) {
      const previewIds = new Set(previewEntries.map((p) => p.id));
      const filtered = all.filter((e) => !previewIds.has(e.id));
      return [...filtered, ...previewEntries];
    }
    return all;
  }, [siteContent, pathname, previewEntries]);

  // Apply content overrides to DOM
  useEffect(() => {
    if (entries.length === 0) return;

    let frame = 0;
    const applyAll = () => {
      if (applying.current) return;
      applying.current = true;
      entries.forEach(applyEntry);
      queueMicrotask(() => {
        applying.current = false;
      });
    };

    const scheduleApply = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        applyAll();
      });
    };

    applyAll();
    const observer = new MutationObserver(scheduleApply);
    observer.observe(document.body, {
      subtree: true,
      childList: true,
      attributes: true,
    });

    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(frame);
    };
  }, [entries]);

  // Admin Preview Mode Interaction
  useEffect(() => {
    const previewMode = new URLSearchParams(window.location.search).get("adminPreview") === "1";

    const followAdminButtonLink = (event: MouseEvent) => {
      const button = (event.target as Element | null)?.closest<HTMLButtonElement>(
        "button[data-admin-href]"
      );
      if (!button || previewMode) return;
      event.preventDefault();
      event.stopPropagation();
      window.location.assign(button.dataset.adminHref || "/");
    };

    document.addEventListener("click", followAdminButtonLink, true);
    if (!previewMode)
      return () => document.removeEventListener("click", followAdminButtonLink, true);

    document.documentElement.classList.add("admin-preview-mode");

    let hoveredElement: HTMLElement | null = null;
    let selectedElement: HTMLElement | null = null;

    const showHover = (event: MouseEvent) => {
      const origin = event.target;
      if (!(origin instanceof Element)) return;
      const element = editableTarget(origin);
      if (hoveredElement === element) return;
      hoveredElement?.classList.remove("admin-edit-hover");
      hoveredElement = element;
      if (element !== selectedElement) element.classList.add("admin-edit-hover");
    };

    const clearHover = () => {
      hoveredElement?.classList.remove("admin-edit-hover");
      hoveredElement = null;
    };

    const select = (event: MouseEvent) => {
      const origin = event.target;
      if (!(origin instanceof Element)) return;
      event.preventDefault();
      event.stopPropagation();
      const element = cardSelectionTarget(origin);

      // Compute selector BEFORE adding transient class
      const selector = cssPath(element);

      const isMedia = element.tagName === "IMG" || element.tagName === "VIDEO";
      const sectionContainer = element.closest("header,footer,section,main") as HTMLElement | null;
      const heroSection = element.closest("section") as HTMLElement | null;
      const sectionIsHero = Boolean(heroSection && (
        heroSection.hasAttribute("data-admin-hero") ||
        heroSection.hasAttribute("data-admin-animation") ||
        /hero/i.test(heroSection.id + " " + heroSection.className + " " + (heroSection.getAttribute("aria-label") || ""))
      ));
      const animationConfig = getAnimationConfig(sectionContainer, element);
      const hasAnimation = animationConfig.exists;
      const backgroundElement =
        sectionContainer?.querySelector<HTMLElement>("[style*='background-image']") || null;
      const heroImageElement = sectionIsHero && heroSection
        ? Array.from(heroSection.querySelectorAll<HTMLImageElement>("img")).find((image) => {
            const style = window.getComputedStyle(image);
            return style.position === "absolute" || image.className.includes("object-cover");
          }) || null
        : null;

      let selectedType = "element";
      if (element.tagName === "IMG") {
        selectedType = heroImageElement === element || element.className.includes("hero") ? "hero-image" : "image";
      } else if (element.tagName === "SECTION" || element.className.includes("hero")) {
        selectedType = "hero-section";
      }

      selectedElement?.removeAttribute("data-admin-selected-type");
      selectedElement?.classList.remove("admin-edit-selected");
      element.classList.remove("admin-edit-hover");
      element.classList.add("admin-edit-selected");
      element.setAttribute("data-admin-selected-type", selectedType);
      selectedElement = element;

      const section = sectionContainer;
      const global = Boolean(element.closest("header,footer"));
      const linkElement = element.closest("a") || (element.tagName === "BUTTON" ? element : null);

      const computed = window.getComputedStyle(element);
      const sectionComputed = sectionContainer ? window.getComputedStyle(sectionContainer) : null;

      window.parent.postMessage(
        {
          type: "admin-content-selection",
          payload: {
            pathname,
            pageLabel: document.title || pathname,
            scope: global ? "global" : "page",
            section:
              section?.id || section?.classList[0] || section?.tagName.toLowerCase() || "general",
            sectionLabel:
              section?.getAttribute("aria-label") ||
              section?.classList[0]?.replace(/[-_]/g, " ") ||
              "General Section",
            selector,
            tag: element.tagName.toLowerCase(),
            label: normalize(
              element.textContent ||
                element.getAttribute("alt") ||
                element.getAttribute("aria-label") ||
                element.tagName
            ),
            html: isMedia ? "" : element.innerHTML,
            href:
              linkElement?.getAttribute(
                linkElement.tagName === "BUTTON" ? "data-admin-href" : "href"
              ) || "",
            hrefSelector: linkElement ? cssPath(linkElement) : "",
            src: isMedia
              ? element.getAttribute("src") || element.getAttribute("data-media-src") || ""
              : "",
            alt:
              element.tagName === "VIDEO"
                ? element.getAttribute("aria-label") || ""
                : element.tagName === "IMG"
                  ? element.getAttribute("alt") || ""
                  : "",
            backgroundImage:
              backgroundElement?.style.backgroundImage.replace(/^url\(["']?|["']?\)$/g, "") || "",
            backgroundSelector: backgroundElement ? cssPath(backgroundElement) : "",
            heroImage: heroImageElement?.getAttribute("src") || "",
            heroImageSelector: heroImageElement ? cssPath(heroImageElement) : "",
            animation: animationConfig.source,
            animationSelector: animationConfig.element ? cssPath(animationConfig.element) : "",
            animationType: animationConfig.type,
            animationAttribute: animationConfig.attribute,
            capabilities: {
              text: !isMedia && /^(H[1-6]|P|SPAN|LABEL|LI|A|BUTTON|BLOCKQUOTE)$/.test(element.tagName) && element.innerHTML !== "",
              link: Boolean(linkElement),
              image: element.tagName === "IMG" || Boolean(heroImageElement),
              video: element.tagName === "VIDEO",
              backgroundImage: Boolean(backgroundElement),
              animation: hasAnimation,
              elementStyle: Boolean(element.getAttribute("style")?.trim()),
              sectionSettings: element.tagName === "SECTION" && Boolean(element.getAttribute("style")?.trim()),
              addContent: false,
              hero: sectionIsHero,
            },

            // Image dimension & styling properties
            imageWidth: element.style.width || (isMedia ? computed.width : ""),
            imageMaxWidth: element.style.maxWidth || "",
            imageHeight: element.style.height || (isMedia ? computed.height : ""),
            imageMinHeight: element.style.minHeight || "",
            imageAspectRatio: element.style.aspectRatio || (isMedia ? computed.aspectRatio : "auto"),
            imageObjectFit: element.style.objectFit || (isMedia ? computed.objectFit : "cover"),
            imageObjectPosition: element.style.objectPosition || (isMedia ? computed.objectPosition : "center"),
            imageBorderRadius: element.style.borderRadius || (isMedia ? computed.borderRadius : ""),
            imageOpacity: element.style.opacity || (isMedia ? computed.opacity : "1"),
            imageFilter: element.style.filter || "",

            // Element typography & styling properties
            fontSize: element.style.fontSize || computed.fontSize,
            fontWeight: element.style.fontWeight || computed.fontWeight,
            color: element.style.color || computed.color,
            textAlign: element.style.textAlign || computed.textAlign,
            lineHeight: element.style.lineHeight || computed.lineHeight,
            letterSpacing: element.style.letterSpacing || computed.letterSpacing,
            elementPadding: element.style.padding || "",
            elementMarginTop: element.style.marginTop || "",
            elementMarginBottom: element.style.marginBottom || "",
            elementBackgroundColor: element.style.backgroundColor || "",
            elementBorderRadius: element.style.borderRadius || "",

            // Section dimension & styling properties
            sectionSelector: sectionContainer ? cssPath(sectionContainer) : "",
            sectionWidth: sectionContainer?.style.width || "100%",
            sectionMaxWidth: sectionContainer?.style.maxWidth || "",
            sectionMinHeight: sectionContainer?.style.minHeight || (sectionComputed ? sectionComputed.minHeight : "auto"),
            sectionHeight: sectionContainer?.style.height || "",
            sectionPaddingTop: sectionContainer?.style.paddingTop || (sectionComputed ? sectionComputed.paddingTop : ""),
            sectionPaddingBottom: sectionContainer?.style.paddingBottom || (sectionComputed ? sectionComputed.paddingBottom : ""),
            sectionPaddingLeft: sectionContainer?.style.paddingLeft || (sectionComputed ? sectionComputed.paddingLeft : ""),
            sectionPaddingRight: sectionContainer?.style.paddingRight || (sectionComputed ? sectionComputed.paddingRight : ""),
            sectionMarginTop: sectionContainer?.style.marginTop || "",
            sectionMarginBottom: sectionContainer?.style.marginBottom || "",
            sectionBackgroundColor: sectionContainer?.style.backgroundColor || (sectionComputed ? sectionComputed.backgroundColor : ""),
            sectionBackground: sectionContainer?.style.background || "",
            sectionBorderRadius: sectionContainer?.style.borderRadius || (sectionComputed ? sectionComputed.borderRadius : ""),
            sectionLayout: sectionContainer?.dataset.adminLayout || "original",
            sectionColumns: sectionContainer?.style.getPropertyValue("--admin-columns") || "3",
            sectionHidden: sectionContainer?.hasAttribute("hidden") || false,
          },
        },
        window.location.origin
      );
    };

    const handlePreview = (event: MessageEvent) => {
      if (event.origin !== window.location.origin || event.data?.type !== "admin-content-preview")
        return;
      const newEntries = event.data.entries as ContentEntry[];
      setPreviewEntries(newEntries);
      newEntries.forEach(applyEntry);
    };

    document.addEventListener("mouseover", showHover, true);
    document.addEventListener("mouseleave", clearHover, true);
    document.addEventListener("click", select, true);
    window.addEventListener("message", handlePreview);

    return () => {
      document.documentElement.classList.remove("admin-preview-mode");
      hoveredElement?.classList.remove("admin-edit-hover");
      selectedElement?.classList.remove("admin-edit-selected");
      document.removeEventListener("mouseover", showHover, true);
      document.removeEventListener("mouseleave", clearHover, true);
      document.removeEventListener("click", followAdminButtonLink, true);
      document.removeEventListener("click", select, true);
      window.removeEventListener("message", handlePreview);
    };
  }, [pathname]);

  return null;
}
