"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { ContentEntry, SiteContent } from "@/app/lib/content-store";
import type { BlogPost } from "@/app/data/blogs";
import ImageUploadField from "./ImageUploadField";
import BlogManager from "./BlogManager";
import AdminNavbar from "./AdminNavbar";
import AnimationUploadField from "./AnimationUploadField";
import { detectSectionCapabilities, tabsForCapabilities, type EditorTab, type SectionCapabilities } from "./section-capabilities";
import type { AnimationAttribute, AnimationKind } from "@/app/lib/animation-config";

function stripHtmlTags(str: string): string {
  try {
    const doc = new DOMParser().parseFromString(str, "text/html");
    return (doc.body.textContent || "").replace(/\s+/g, " ").trim();
  } catch {
    return str.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
  }
}

type RouteOption = { label: string; path: string };

type Selection = {
  pathname: string;
  pageLabel: string;
  scope: "global" | "page";
  section: string;
  sectionLabel: string;
  selector: string;
  tag: string;
  label: string;
  html: string;
  href: string;
  hrefSelector: string;
  src: string;
  alt: string;
  backgroundImage: string;
  backgroundSelector: string;
  heroImage: string;
  heroImageSelector: string;
  animation: string;
  animationSelector: string;
  animationType?: AnimationKind;
  animationAttribute?: AnimationAttribute;
  capabilities?: Partial<SectionCapabilities>;

  // Image dimensions & styling
  imageWidth?: string;
  imageMaxWidth?: string;
  imageHeight?: string;
  imageMinHeight?: string;
  imageAspectRatio?: string;
  imageObjectFit?: string;
  imageObjectPosition?: string;
  imageBorderRadius?: string;
  imageOpacity?: string;
  imageFilter?: string;

  // Element typography & styling
  fontSize?: string;
  fontWeight?: string;
  color?: string;
  textAlign?: string;
  lineHeight?: string;
  letterSpacing?: string;
  elementPadding?: string;
  elementMarginTop?: string;
  elementMarginBottom?: string;
  elementBackgroundColor?: string;
  elementBorderRadius?: string;

  // Section dimensions & styling
  sectionSelector: string;
  sectionWidth?: string;
  sectionMaxWidth?: string;
  sectionMinHeight?: string;
  sectionHeight?: string;
  sectionPaddingTop?: string;
  sectionPaddingBottom?: string;
  sectionPaddingLeft?: string;
  sectionPaddingRight?: string;
  sectionMarginTop?: string;
  sectionMarginBottom?: string;
  sectionBackgroundColor?: string;
  sectionBackground?: string;
  sectionBorderRadius?: string;
  sectionLayout?: string;
  sectionColumns?: string;
  sectionHidden?: boolean;
};

type Notice = { type: "success" | "error"; text: string } | null;

const urlValid = (value: string, image = false) => {
  if (!value.trim()) return false;
  if (value.startsWith("/") || (!image && (value.startsWith("#") || value.startsWith("mailto:") || value.startsWith("tel:")))) return true;
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
};

const hash = (value: string) => {
  let result = 2166136261;
  for (let index = 0; index < value.length; index += 1) result = Math.imul(result ^ value.charCodeAt(index), 16777619);
  return (result >>> 0).toString(36);
};

const entryId = (selection: Selection, kind: string, attribute = "") =>
  `content-${hash(`${selection.scope}|${selection.pathname}|${selection.selector}|${kind}|${attribute}`)}`;

const contextualEntries = (content: SiteContent, selection: Selection) =>
  selection.scope === "global"
    ? Object.values(content.global.sections).flatMap((section) => section.entries)
    : Object.values(content.pages[selection.pathname]?.sections ?? {}).flatMap((section) => section.entries);

export default function AdminEditor({
  initialContent,
  initialBlogs,
  routes,
}: {
  initialContent: SiteContent;
  initialBlogs: BlogPost[];
  routes: RouteOption[];
}) {
  const [content, setContent] = useState(initialContent);
  const [mode, setMode] = useState<"content" | "blogs">("content");
  const [routeOptions, setRouteOptions] = useState(routes);
  const [blogPosts, setBlogPosts] = useState(initialBlogs);
  const [route, setRoute] = useState("/");
  const [customRoute, setCustomRoute] = useState("");
  const [selection, setSelection] = useState<Selection | null>(null);

  // Active sub-tab in the editor panel
  const [activeTab, setActiveTab] = useState<EditorTab>("content");

  // Content text & links
  const [html, setHtml] = useState("");
  const [href, setHref] = useState("");

  // Media
  const [src, setSrc] = useState("");
  const [alt, setAlt] = useState("");
  const [backgroundImage, setBackgroundImage] = useState("");
  const [heroImage, setHeroImage] = useState("");
  const [animation, setAnimation] = useState("default");
  const [animationType, setAnimationType] = useState<AnimationKind>("preset");

  // Image Dimensions & Sizing
  const [imageWidth, setImageWidth] = useState("");
  const [imageMaxWidth, setImageMaxWidth] = useState("");
  const [imageHeight, setImageHeight] = useState("");
  const [imageMinHeight, setImageMinHeight] = useState("");
  const [imageAspectRatio, setImageAspectRatio] = useState("auto");
  const [imageObjectFit, setImageObjectFit] = useState("cover");
  const [imageObjectPosition, setImageObjectPosition] = useState("center");
  const [imageBorderRadius, setImageBorderRadius] = useState("");
  const [imageOpacity, setImageOpacity] = useState("1");
  const [imageFilter, setImageFilter] = useState("");

  // Element Typography & Styles
  const [fontSize, setFontSize] = useState("");
  const [fontWeight, setFontWeight] = useState("");
  const [textColor, setTextColor] = useState("");
  const [textAlign, setTextAlign] = useState("");
  const [lineHeight, setLineHeight] = useState("");
  const [elementPadding, setElementPadding] = useState("");
  const [elementMarginTop, setElementMarginTop] = useState("");
  const [elementMarginBottom, setElementMarginBottom] = useState("");
  const [elementBackgroundColor, setElementBackgroundColor] = useState("");
  const [elementBorderRadius, setElementBorderRadius] = useState("");

  // Section Dimensions & Layout
  const [sectionWidth, setSectionWidth] = useState("100%");
  const [sectionMaxWidth, setSectionMaxWidth] = useState("");
  const [sectionMinHeight, setSectionMinHeight] = useState("auto");
  const [sectionHeight, setSectionHeight] = useState("");
  const [sectionPaddingTop, setSectionPaddingTop] = useState("");
  const [sectionPaddingBottom, setSectionPaddingBottom] = useState("");
  const [sectionPaddingLeft, setSectionPaddingLeft] = useState("");
  const [sectionPaddingRight, setSectionPaddingRight] = useState("");
  const [sectionMarginTop, setSectionMarginTop] = useState("");
  const [sectionMarginBottom, setSectionMarginBottom] = useState("");
  const [sectionBackgroundColor, setSectionBackgroundColor] = useState("");
  const [sectionBackground, setSectionBackground] = useState("");
  const [sectionBorderRadius, setSectionBorderRadius] = useState("");
  const [sectionLayout, setSectionLayout] = useState("original");
  const [sectionColumns, setSectionColumns] = useState("3");
  const [sectionHidden, setSectionHidden] = useState(false);

  // New Content & Section Insertion
  const [addedContent, setAddedContent] = useState("");
  const [newSection, setNewSection] = useState("");

  const [notice, setNotice] = useState<Notice>(null);
  const [saving, setSaving] = useState(false);
  const [frameVersion, setFrameVersion] = useState(0);
  const frame = useRef<HTMLIFrameElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [stagedUploads, setStagedUploads] = useState<string[]>([]);
  const hasHtmlTags = useMemo(() => /<[a-z][\s\S]*>/i.test(html), [html]);
  const capabilities = useMemo(() => selection ? detectSectionCapabilities(selection) : null, [selection]);
  const editorTabs = useMemo(() => capabilities ? tabsForCapabilities(capabilities) : [], [capabilities]);

  const allEntries = useMemo(
    () => [
      ...Object.values(content.global.sections).flatMap((section) => section.entries),
      ...Object.values(content.pages).flatMap((page) =>
        Object.values(page.sections).flatMap((section) => section.entries)
      ),
    ],
    [content]
  );

  const selectedSaved = useMemo(
    () =>
      selection
        ? contextualEntries(content, selection).filter(
            (entry) =>
              entry.selector === selection.selector ||
              entry.selector === selection.hrefSelector ||
              entry.selector === selection.backgroundSelector ||
              entry.selector === selection.heroImageSelector ||
              entry.selector === selection.animationSelector ||
              entry.selector === selection.sectionSelector
          )
        : [],
    [content, selection]
  );

  async function discardUpload(path: string) {
    if (!stagedUploads.includes(path)) return;
    setStagedUploads((current) => current.filter((candidate) => candidate !== path));
    await fetch("/api/admin/images", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path }),
    }).catch(() => undefined);
  }

  async function discardStagedUploads() {
    const paths = [...stagedUploads];
    await Promise.all(paths.map(discardUpload));
  }

  function imageUploaded(path: string, kind: "src" | "background" | "hero") {
    if (!selection) return;
    const previous = kind === "src" ? src : kind === "hero" ? heroImage : backgroundImage;
    if (stagedUploads.includes(previous)) void discardUpload(previous);
    setStagedUploads((current) => (current.includes(path) ? current : [...current, path]));
    if (kind === "src") setSrc(path);
    else if (kind === "hero") setHeroImage(path);
    else setBackgroundImage(path);

    const selector =
      kind === "src"
        ? selection.selector
        : kind === "hero"
        ? selection.heroImageSelector
        : selection.backgroundSelector;
    const saved = existing(
      kind === "background" ? "backgroundImage" : "attribute",
      kind === "background" ? undefined : "src",
      selector
    );
    const entry: ContentEntry =
      kind !== "background"
        ? {
            id: saved?.id ?? entryId({ ...selection, selector }, "attribute", "src"),
            selector,
            kind: "attribute",
            attribute: "src",
            value: path,
            match: saved?.match ?? (kind === "hero" ? selection.heroImage : selection.src),
            label: kind === "hero" ? `${selection.sectionLabel} hero image` : `${selection.label || "Image"} URL`,
          }
        : {
            id: saved?.id ?? entryId({ ...selection, selector }, "backgroundImage"),
            selector,
            kind: "backgroundImage",
            value: path,
            match: saved?.match ?? selection.backgroundImage,
            label: `${selection.sectionLabel} background image`,
          };
    frame.current?.contentWindow?.postMessage({ type: "admin-content-preview", entries: [entry] }, window.location.origin);
    setNotice({ type: "success", text: "Image uploaded and previewed. Save Changes to publish it." });
  }

  // Animation preset selector handler
  function handleSelectAnimation(nextAnimation: string) {
    setAnimation(nextAnimation);
    if (!selection || !selection.animationSelector) return;
    const animationAttribute = selection.animationAttribute || "data-admin-animation";
    const saved = existing("attribute", animationAttribute, selection.animationSelector);
    const entry: ContentEntry = {
      id: saved?.id ?? entryId({ ...selection, selector: selection.animationSelector }, "attribute", animationAttribute),
      selector: selection.animationSelector,
      kind: "attribute",
      attribute: animationAttribute,
      value: nextAnimation,
      match: saved?.match ?? selection.animation,
      label: `${selection.sectionLabel} animation`,
    };
    frame.current?.contentWindow?.postMessage({ type: "admin-content-preview", entries: [entry] }, window.location.origin);
    setNotice({ type: "success", text: nextAnimation ? "Animation preview updated. Save Changes to publish it." : "Animation removed from the preview. Save Changes to publish it." });
  }

  useEffect(() => {
    const receive = (event: MessageEvent) => {
      if (event.origin !== window.location.origin || event.data?.type !== "admin-content-selection") return;
      const next = event.data.payload as Selection;
      const existing = contextualEntries(content, next).filter(
        (entry) =>
          entry.selector === next.selector ||
          entry.selector === next.hrefSelector ||
          entry.selector === next.backgroundSelector ||
          entry.selector === next.heroImageSelector ||
          entry.selector === next.animationSelector ||
          entry.selector === next.sectionSelector
      );

      const htmlEntry = existing.find((entry) => entry.kind === "html");
      const hrefEntry = existing.find((entry) => entry.kind === "attribute" && entry.attribute === "href");
      const srcEntry = existing.find((entry) => entry.kind === "attribute" && entry.attribute === "src" && entry.selector === next.selector);
      const altAttribute = next.tag === "video" ? "aria-label" : "alt";
      const altEntry = existing.find((entry) => entry.kind === "attribute" && entry.attribute === altAttribute);
      const backgroundEntry = existing.find((entry) => entry.kind === "backgroundImage");
      const heroImageEntry = existing.find((entry) => entry.kind === "attribute" && entry.attribute === "src" && entry.selector === next.heroImageSelector);
      const animationAttribute = next.animationAttribute || "data-admin-animation";
      const animationEntry = existing.find((entry) => entry.kind === "attribute" && entry.attribute === animationAttribute && entry.selector === next.animationSelector);

      const sectionStyleEntry = existing.find((entry) => entry.kind === "sectionStyle");
      const sectionOptions = sectionStyleEntry ? (JSON.parse(sectionStyleEntry.value) as Record<string, unknown>) : {};

      const imageStyleEntry = existing.find((entry) => entry.kind === "imageStyle");
      const imageOptions = imageStyleEntry ? (JSON.parse(imageStyleEntry.value) as Record<string, unknown>) : {};

      const elementStyleEntry = existing.find((entry) => entry.kind === "elementStyle");
      const elementOptions = elementStyleEntry ? (JSON.parse(elementStyleEntry.value) as Record<string, unknown>) : {};

      setSelection(next);

      // Default active tab based on element type
      if (next.tag === "img" || next.tag === "video" || next.heroImageSelector) {
        setActiveTab("image");
      } else if (next.animationSelector) {
        setActiveTab("animation");
      } else if (next.tag === "section" || next.tag === "header" || next.tag === "footer") {
        setActiveTab("section");
      } else {
        setActiveTab("content");
      }

      const rawContent = htmlEntry?.value ?? next.html;
      setHtml(stripHtmlTags(rawContent));
      setHref(hrefEntry?.value ?? next.href);
      setSrc(srcEntry?.value ?? next.src);
      setAlt(altEntry?.value ?? next.alt);
      setBackgroundImage(backgroundEntry?.value ?? next.backgroundImage);
      setHeroImage(heroImageEntry?.value ?? next.heroImage);
      setAnimation(animationEntry?.value ?? next.animation ?? "");
      setAnimationType(next.animationType ?? "preset");

      // Image dimension settings
      setImageWidth((imageOptions.width as string) ?? next.imageWidth ?? "");
      setImageMaxWidth((imageOptions.maxWidth as string) ?? next.imageMaxWidth ?? "");
      setImageHeight((imageOptions.height as string) ?? next.imageHeight ?? "");
      setImageMinHeight((imageOptions.minHeight as string) ?? next.imageMinHeight ?? "");
      setImageAspectRatio((imageOptions.aspectRatio as string) ?? next.imageAspectRatio ?? "auto");
      setImageObjectFit((imageOptions.objectFit as string) ?? next.imageObjectFit ?? "cover");
      setImageObjectPosition((imageOptions.objectPosition as string) ?? next.imageObjectPosition ?? "center");
      setImageBorderRadius((imageOptions.borderRadius as string) ?? next.imageBorderRadius ?? "");
      setImageOpacity((imageOptions.opacity as string) ?? next.imageOpacity ?? "1");
      setImageFilter((imageOptions.filter as string) ?? next.imageFilter ?? "");

      // Typography & element styles
      setFontSize((elementOptions.fontSize as string) ?? next.fontSize ?? "");
      setFontWeight((elementOptions.fontWeight as string) ?? next.fontWeight ?? "");
      setTextColor((elementOptions.color as string) ?? next.color ?? "");
      setTextAlign((elementOptions.textAlign as string) ?? next.textAlign ?? "");
      setLineHeight((elementOptions.lineHeight as string) ?? next.lineHeight ?? "");
      setElementPadding((elementOptions.padding as string) ?? next.elementPadding ?? "");
      setElementMarginTop((elementOptions.marginTop as string) ?? next.elementMarginTop ?? "");
      setElementMarginBottom((elementOptions.marginBottom as string) ?? next.elementMarginBottom ?? "");
      setElementBackgroundColor((elementOptions.backgroundColor as string) ?? next.elementBackgroundColor ?? "");
      setElementBorderRadius((elementOptions.borderRadius as string) ?? next.elementBorderRadius ?? "");

      // Section settings
      setSectionWidth((sectionOptions.width as string) ?? next.sectionWidth ?? "100%");
      setSectionMaxWidth((sectionOptions.maxWidth as string) ?? next.sectionMaxWidth ?? "");
      setSectionMinHeight((sectionOptions.minHeight as string) ?? next.sectionMinHeight ?? "auto");
      setSectionHeight((sectionOptions.height as string) ?? next.sectionHeight ?? "");
      setSectionPaddingTop((sectionOptions.paddingTop as string) ?? next.sectionPaddingTop ?? "");
      setSectionPaddingBottom((sectionOptions.paddingBottom as string) ?? next.sectionPaddingBottom ?? "");
      setSectionPaddingLeft((sectionOptions.paddingLeft as string) ?? next.sectionPaddingLeft ?? "");
      setSectionPaddingRight((sectionOptions.paddingRight as string) ?? next.sectionPaddingRight ?? "");
      setSectionMarginTop((sectionOptions.marginTop as string) ?? next.sectionMarginTop ?? "");
      setSectionMarginBottom((sectionOptions.marginBottom as string) ?? next.sectionMarginBottom ?? "");
      setSectionBackgroundColor((sectionOptions.backgroundColor as string) ?? next.sectionBackgroundColor ?? "");
      setSectionBackground((sectionOptions.background as string) ?? next.sectionBackground ?? "");
      setSectionBorderRadius((sectionOptions.borderRadius as string) ?? next.sectionBorderRadius ?? "");
      setSectionLayout((sectionOptions.layout as string) ?? next.sectionLayout ?? "original");
      setSectionColumns((sectionOptions.columns as string) ?? next.sectionColumns ?? "3");
      setSectionHidden((sectionOptions.hidden as boolean) ?? next.sectionHidden ?? false);

      setAddedContent("");
      setNewSection("");
      setNotice(null);
    };

    window.addEventListener("message", receive);
    return () => window.removeEventListener("message", receive);
  }, [content]);

  const existing = (kind: ContentEntry["kind"], attribute?: ContentEntry["attribute"], selector?: string) =>
    selectedSaved.find(
      (entry) => entry.kind === kind && entry.attribute === attribute && (!selector || entry.selector === selector)
    );

  function handleRemoveHtml() {
    const cleaned = stripHtmlTags(html);
    setHtml(cleaned);
    setNotice({ type: "success", text: "HTML tags removed from text." });
  }

  function handleWrapTag(tag: "bold" | "italic" | "accent") {
    if (!textareaRef.current) return;
    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = html.slice(start, end);
    if (!selectedText) {
      setNotice({ type: "error", text: "Highlight text inside the editor first to format it." });
      return;
    }

    let replacement = "";
    if (tag === "bold") replacement = `<strong>${selectedText}</strong>`;
    else if (tag === "italic") replacement = `<em>${selectedText}</em>`;
    else if (tag === "accent") replacement = `<span class="text-[#008fd3]">${selectedText}</span>`;

    const nextHtml = html.slice(0, start) + replacement + html.slice(end);
    setHtml(nextHtml);
    setNotice({ type: "success", text: `Formatted with ${tag}.` });
  }

  function buildEntries(): ContentEntry[] {
    if (!selection) return [];
    const entries: ContentEntry[] = [];

    // Text Content
    if (selection.tag !== "img" && selection.html !== "") {
      const saved = existing("html", undefined, selection.selector);
      entries.push({
        id: saved?.id ?? entryId(selection, "html"),
        selector: selection.selector,
        kind: "html",
        value: html.trim(),
        match: saved?.match ?? selection.html,
        label: selection.label || "Text content",
      });
    }

    // Link URL
    if (selection.hrefSelector && href.trim()) {
      const saved = existing("attribute", selection.tag === "button" ? "data-admin-href" : "href", selection.hrefSelector);
      entries.push({
        id: saved?.id ?? entryId(selection, "attribute", selection.tag === "button" ? "data-admin-href" : "href"),
        selector: selection.hrefSelector,
        kind: "attribute",
        attribute: selection.tag === "button" ? "data-admin-href" : "href",
        value: href.trim(),
        match: saved?.match ?? selection.href,
        label: `${selection.label || "Link"} URL`,
      });
    }

    // Image / Video Source
    if (selection.src) {
      const altAttribute = selection.tag === "video" ? "aria-label" : "alt";
      const savedSrc = existing("attribute", "src", selection.selector);
      const savedAlt = existing("attribute", altAttribute, selection.selector);
      entries.push({
        id: savedSrc?.id ?? entryId(selection, "attribute", "src"),
        selector: selection.selector,
        kind: "attribute",
        attribute: "src",
        value: src.trim(),
        match: savedSrc?.match ?? selection.src,
        label: `${selection.label || "Image"} URL`,
      });
      entries.push({
        id: savedAlt?.id ?? entryId(selection, "attribute", altAttribute),
        selector: selection.selector,
        kind: "attribute",
        attribute: altAttribute,
        value: alt.trim(),
        match: savedAlt?.match ?? selection.alt,
        label: `${selection.label || "Media"} alternative text`,
      });
    }

    // Image Dimensions & Styling Overrides
    if (selection.tag === "img" || selection.tag === "video" || selection.heroImageSelector) {
      const targetSelector = selection.tag === "img" || selection.tag === "video" ? selection.selector : selection.heroImageSelector;
      const savedImgStyle = existing("imageStyle", undefined, targetSelector);
      const imgStyleValue = JSON.stringify({
        width: imageWidth,
        maxWidth: imageMaxWidth,
        height: imageHeight,
        minHeight: imageMinHeight,
        aspectRatio: imageAspectRatio,
        objectFit: imageObjectFit,
        objectPosition: imageObjectPosition,
        borderRadius: imageBorderRadius,
        opacity: imageOpacity,
        filter: imageFilter,
      });
      entries.push({
        id: savedImgStyle?.id ?? entryId({ ...selection, selector: targetSelector }, "imageStyle"),
        selector: targetSelector,
        kind: "imageStyle",
        value: imgStyleValue,
        label: `${selection.label || "Image"} dimensions & style`,
      });
    }

    // Element Typography & Styling Overrides
    if (fontSize || fontWeight || textColor || textAlign || lineHeight || elementPadding || elementMarginTop || elementMarginBottom || elementBackgroundColor || elementBorderRadius) {
      const savedElemStyle = existing("elementStyle", undefined, selection.selector);
      const elemStyleValue = JSON.stringify({
        fontSize,
        fontWeight,
        color: textColor,
        textAlign,
        lineHeight,
        padding: elementPadding,
        marginTop: elementMarginTop,
        marginBottom: elementMarginBottom,
        backgroundColor: elementBackgroundColor,
        borderRadius: elementBorderRadius,
      });
      entries.push({
        id: savedElemStyle?.id ?? entryId(selection, "elementStyle"),
        selector: selection.selector,
        kind: "elementStyle",
        value: elemStyleValue,
        label: `${selection.label || "Element"} styling`,
      });
    }

    // Section Dimensions & Styling Overrides
    if (selection.sectionSelector) {
      const saved = existing("sectionStyle", undefined, selection.sectionSelector);
      const value = JSON.stringify({
        width: sectionWidth,
        maxWidth: sectionMaxWidth,
        minHeight: sectionMinHeight,
        height: sectionHeight,
        paddingTop: sectionPaddingTop,
        paddingBottom: sectionPaddingBottom,
        paddingLeft: sectionPaddingLeft,
        paddingRight: sectionPaddingRight,
        marginTop: sectionMarginTop,
        marginBottom: sectionMarginBottom,
        backgroundColor: sectionBackgroundColor,
        background: sectionBackground,
        borderRadius: sectionBorderRadius,
        layout: sectionLayout,
        columns: sectionColumns,
        hidden: sectionHidden,
      });
      entries.push({
        id: saved?.id ?? entryId({ ...selection, selector: selection.sectionSelector }, "sectionStyle"),
        selector: selection.sectionSelector,
        kind: "sectionStyle",
        value,
        label: `${selection.sectionLabel} section dimensions & layout`,
      });

      if (addedContent.trim()) {
        entries.push({
          id: entryId({ ...selection, selector: selection.sectionSelector }, "appendHtml", hash(addedContent)),
          selector: selection.sectionSelector,
          kind: "appendHtml",
          value: addedContent.trim(),
          label: `${selection.sectionLabel} added content`,
        });
      }
      if (newSection.trim()) {
        entries.push({
          id: entryId({ ...selection, selector: selection.sectionSelector }, "insertAfter", hash(newSection)),
          selector: selection.sectionSelector,
          kind: "insertAfter",
          value: newSection.trim(),
          label: `New section after ${selection.sectionLabel}`,
        });
      }
    }

    // Hero Section Image Override
    if (selection.heroImageSelector && heroImage) {
      const saved = existing("attribute", "src", selection.heroImageSelector);
      entries.push({
        id: saved?.id ?? entryId({ ...selection, selector: selection.heroImageSelector }, "attribute", "src"),
        selector: selection.heroImageSelector,
        kind: "attribute",
        attribute: "src",
        value: heroImage.trim(),
        match: saved?.match ?? selection.heroImage,
        label: `${selection.sectionLabel} hero image`,
      });
    }

    // Section Background Image Override
    if (selection.backgroundSelector && backgroundImage) {
      const saved = existing("backgroundImage", undefined, selection.backgroundSelector);
      entries.push({
        id: saved?.id ?? entryId({ ...selection, selector: selection.backgroundSelector }, "backgroundImage"),
        selector: selection.backgroundSelector,
        kind: "backgroundImage",
        value: backgroundImage.trim(),
        match: saved?.match ?? selection.backgroundImage,
        label: `${selection.sectionLabel} background image`,
      });
    }

    // Animation Override
    if (selection.animationSelector) {
      const animationAttribute = selection.animationAttribute || "data-admin-animation";
    const saved = existing("attribute", animationAttribute, selection.animationSelector);
      entries.push({
        id: saved?.id ?? entryId({ ...selection, selector: selection.animationSelector }, "attribute", animationAttribute),
        selector: selection.animationSelector,
        kind: "attribute",
        attribute: animationAttribute,
        value: animation,
        match: saved?.match ?? selection.animation,
        label: `${selection.sectionLabel} animation`,
      });
    }

    return entries;
  }

  function validate(entries: ContentEntry[]): string | null {
    if (!selection) return "Select an element in the preview first.";
    if (!entries.length) return "This element has no editable fields.";
    if (entries.some((entry) => !entry.value.trim() && !(entry.kind === "attribute" && (entry.attribute === "src" || entry.attribute === "data-media-src" || entry.attribute === "data-admin-animation")))) return "Empty content cannot be saved.";
    if (href && !urlValid(href)) return "Enter a valid link URL or site-relative path.";
    if (src && !urlValid(src, true)) return "Enter a valid image URL or site-relative path.";
    if (backgroundImage && !urlValid(backgroundImage, true)) return "Enter a valid background image URL or site-relative path.";
    if (heroImage && !urlValid(heroImage, true)) return "Enter a valid hero image URL or upload an image.";
    if (/<script\b|on\w+\s*=|javascript:/i.test(html)) return "Scripts and unsafe attributes are not allowed.";
    return null;
  }

  function preview() {
    const entries = buildEntries();
    const error = validate(entries);
    if (error) return setNotice({ type: "error", text: error });
    frame.current?.contentWindow?.postMessage({ type: "admin-content-preview", entries }, window.location.origin);
    setNotice({ type: "success", text: "Preview applied live! Save Changes to publish." });
  }

  async function save() {
    const entries = buildEntries();
    const error = validate(entries);
    if (error || !selection) return setNotice({ type: "error", text: error || "Select an element first." });
    setSaving(true);
    try {
      const response = await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          scope: selection.scope,
          pathname: selection.pathname,
          pageLabel: selection.pageLabel,
          section: selection.section,
          sectionLabel: selection.sectionLabel,
          entries,
        }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Save failed.");
      setContent(result.content);
      setStagedUploads([]);
      setNotice({ type: "success", text: "Content, dimensions, and styles saved and published successfully." });
      setFrameVersion((value) => value + 1);
    } catch (reason) {
      setNotice({ type: "error", text: reason instanceof Error ? reason.message : "Content could not be saved." });
    } finally {
      setSaving(false);
    }
  }

  async function reset(ids = selectedSaved.map((entry) => entry.id)) {
    if (!ids.length) return setNotice({ type: "error", text: "This element has no saved changes to reset." });
    await discardStagedUploads();
    setSaving(true);
    try {
      const response = await fetch("/api/admin/content", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Reset failed.");
      setContent(result.content);
      setSelection(null);
      setFrameVersion((value) => value + 1);
      setNotice({ type: "success", text: "Saved changes reset to the original website defaults." });
    } catch (reason) {
      setNotice({ type: "error", text: reason instanceof Error ? reason.message : "Reset failed." });
    } finally {
      setSaving(false);
    }
  }

  async function cancel() {
    await discardStagedUploads();
    setSelection(null);
    setFrameVersion((value) => value + 1);
    setNotice({ type: "success", text: "Editing cancelled. No changes were saved." });
  }

  const navigate = (next: string) => {
    if (!next.startsWith("/")) return setNotice({ type: "error", text: "Enter a valid site route beginning with /." });
    void discardStagedUploads();
    setRoute(next);
    setSelection(null);
    setFrameVersion((value) => value + 1);
    setNotice({ type: "success", text: `Preview opened for ${next}. Click any element to edit it.` });
  };

  const blogsChanged = (posts: BlogPost[]) => {
    setBlogPosts(posts);
    setRouteOptions((current) => [
      ...current.filter((item) => item.path === "/blogs" || !item.path.startsWith("/blogs/")),
      ...posts.map((post) => ({ label: `Blog: ${post.title}`, path: `/blogs/${post.slug}` })),
    ]);
  };

  const isHeroSelected = Boolean(
    selection?.heroImageSelector ||
    selection?.animationSelector ||
    selection?.tag === "img" ||
    selection?.sectionLabel?.toLowerCase().includes("hero")
  );

  return (
    <main className="admin-shell">
      {/* Shared Admin Navigation Bar */}
      <AdminNavbar
        activeTab="content"
        extraActions={
          selection ? (
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <button
                type="button"
                className="admin-secondary-button"
                onClick={preview}
                disabled={saving}
                style={{ height: "36px", padding: "0 14px", borderRadius: "8px", fontSize: "12px", fontWeight: 700 }}
              >
                Live Preview
              </button>
              <button
                type="button"
                className="admin-primary-button"
                onClick={save}
                disabled={saving}
                style={{
                  height: "36px",
                  padding: "0 18px",
                  borderRadius: "8px",
                  background: "#ee9e1e",
                  color: "#fff",
                  border: "1px solid #ee9e1e",
                  fontFamily: "inherit",
                  fontSize: "13px",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          ) : undefined
        }
      />

      {notice && (
        <div className={`admin-notice ${notice.type}`} role="status">
          <span>{notice.text}</span>
          <button type="button" onClick={() => setNotice(null)} aria-label="Dismiss notification">
            &times;
          </button>
        </div>
      )}

      {mode === "blogs" ? (
        <div className="admin-workspace admin-blog-workspace">
          <BlogManager initialPosts={blogPosts} onPostsChange={blogsChanged} />
        </div>
      ) : (
        <div className="admin-workspace">
          {/* Left Sidebar: Route Navigation & History */}
          <aside className="admin-sidebar">
            <section className="admin-panel-section">
              <p className="admin-eyebrow">Page</p>
              <label htmlFor="admin-route">Choose a website page</label>
              <select id="admin-route" value={route} onChange={(event) => navigate(event.target.value)}>
                {routeOptions.map((item) => (
                  <option key={item.path} value={item.path}>
                    {item.label}
                  </option>
                ))}
              </select>
              <div className="admin-custom-route">
                <input
                  value={customRoute}
                  onChange={(event) => setCustomRoute(event.target.value)}
                  placeholder="/other-page"
                  aria-label="Custom route"
                />
                <button type="button" onClick={() => navigate(customRoute)}>
                  Open
                </button>
              </div>
            </section>

            <section className="admin-panel-section admin-instructions">
              <p className="admin-eyebrow">How to edit</p>
              <ol>
                <li>Choose a page from the dropdown.</li>
                <li>Click any element, image, or section in the preview.</li>
                <li>Adjust text, hero image, animations, dimensions, or styles.</li>
                <li>Click <strong>Live Preview</strong>, then <strong>Save Changes</strong>.</li>
              </ol>
            </section>

            <section className="admin-panel-section admin-saved-list">
              <div className="admin-section-title">
                <p className="admin-eyebrow">Saved overrides</p>
                <span>{allEntries.length}</span>
              </div>
              {allEntries.length === 0 ? (
                <p className="admin-muted">No custom overrides yet.</p>
              ) : (
                allEntries.map((entry) => (
                  <div className="admin-saved-row" key={entry.id}>
                    <span title={entry.label}>{entry.label}</span>
                    <button type="button" onClick={() => reset([entry.id])} aria-label={`Reset ${entry.label}`}>
                      Reset
                    </button>
                  </div>
                ))
              )}
            </section>
          </aside>

          {/* Central Live Preview Area */}
          <section className="admin-preview-panel">
            <div className="admin-preview-bar">
              <span>Interactive Page Preview (Click any element to edit)</span>
              <a href={route} target="_blank" rel="noreferrer">
                Open full page
              </a>
            </div>
            <iframe
              key={`${route}-${frameVersion}`}
              ref={frame}
              src={`${route}${route.includes("?") ? "&" : "?"}adminPreview=1`}
              title={`Editing preview for ${route}`}
            />
          </section>

          {/* Right Editor Panel */}
          <aside className="admin-editor-panel" style={{ overflowY: "auto", maxHeight: "calc(100vh - 65px)" }}>
            {!selection ? (
              <div className="admin-empty-state">
                <h2>Select content to edit</h2>
                <p>Click any heading, hero image, hero animation, graphic, button, or section in the preview window.</p>
              </div>
            ) : (
              <>
                {/* Visual Sign / Selection Confirmation Indicator Card */}
                <div
                  style={{
                    padding: "12px 14px",
                    borderRadius: "10px",
                    background: selection.tag === "img" || selection.heroImageSelector ? "linear-gradient(135deg, #fff8ec 0%, #fff 100%)" : "linear-gradient(135deg, #edf7f5 0%, #fff 100%)",
                    border: selection.tag === "img" || selection.heroImageSelector ? "1.5px solid #ee9e1e" : "1.5px solid #087b71",
                    marginBottom: "14px",
                    boxShadow: "0 4px 14px rgba(0,0,0,0.04)",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <div>
                        <strong style={{ display: "block", fontSize: "13px", color: "#1e293b" }}>
                          {selection.tag === "img" || selection.heroImageSelector
                            ? "Hero / Image Selected"
                            : selection.animationSelector
                            ? "Hero Section & Animation Selected"
                            : `${selection.label || selection.tag} Selected`}
                        </strong>
                        <small style={{ color: "#64748b", fontSize: "11px" }}>
                          Section: <strong>{selection.sectionLabel}</strong>
                        </small>
                      </div>
                    </div>
                    <span
                      style={{
                        fontSize: "11px",
                        fontWeight: 700,
                        padding: "3px 8px",
                        borderRadius: "6px",
                        background: selection.tag === "img" || selection.heroImageSelector ? "#fef3c7" : "#ccfbf1",
                        color: selection.tag === "img" || selection.heroImageSelector ? "#92400e" : "#0f766e",
                      }}
                    >
                      Active
                    </span>
                  </div>
                </div>

                {/* Sub-Navigation Tabs */}
                <div className="mb-3 flex flex-wrap gap-2 border-b border-slate-200 pb-3">
                  {editorTabs.map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveTab(tab.id)}
                      className={`rounded-md px-3 py-1.5 text-xs font-semibold transition ${activeTab === tab.id ? "bg-[#087b71] text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>


                {/* Tab 1: Text content and link */}
                {activeTab === "content" && (
                  <div>
                    {selection.tag !== "img" && selection.html !== "" && (
                      <div className="admin-field">
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "6px" }}>
                          <label htmlFor="content-html" style={{ margin: 0, fontWeight: 700 }}>
                            Content Text
                          </label>
                          {hasHtmlTags && (
                            <button
                              type="button"
                              onClick={handleRemoveHtml}
                              style={{
                                padding: "2px 8px",
                                border: "1px solid #087b71",
                                borderRadius: "6px",
                                background: "#edf7f5",
                                color: "#087b71",
                                fontSize: "11px",
                                fontWeight: 700,
                                cursor: "pointer",
                              }}
                            >
                              Remove HTML Tags
                            </button>
                          )}
                        </div>

                        <textarea
                          ref={textareaRef}
                          id="content-html"
                          rows={6}
                          value={html}
                          onChange={(event) => setHtml(event.target.value)}
                          placeholder="Enter content text..."
                          style={{ fontFamily: "inherit", fontSize: "13px", lineHeight: 1.6, width: "100%" }}
                        />

                        {/* Quick formatting tools */}
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                            marginTop: "6px",
                            padding: "6px 8px",
                            background: "#f4f7f9",
                            borderRadius: "6px",
                            border: "1px solid #e2e8ee",
                          }}
                        >
                          <span style={{ fontSize: "11px", color: "#667085", fontWeight: 600 }}>Format:</span>
                          <button
                            type="button"
                            onClick={() => handleWrapTag("bold")}
                            style={{ padding: "2px 7px", fontSize: "11px", fontWeight: 700, border: "1px solid #cfd8e1", borderRadius: "4px", background: "#fff", cursor: "pointer" }}
                          >
                            Bold
                          </button>
                          <button
                            type="button"
                            onClick={() => handleWrapTag("italic")}
                            style={{ padding: "2px 7px", fontSize: "11px", fontStyle: "italic", border: "1px solid #cfd8e1", borderRadius: "4px", background: "#fff", cursor: "pointer" }}
                          >
                            Italic
                          </button>
                          <button
                            type="button"
                            onClick={() => handleWrapTag("accent")}
                            style={{ padding: "2px 7px", fontSize: "11px", fontWeight: 600, border: "1px solid #cfd8e1", borderRadius: "4px", background: "#fff", color: "#008fd3", cursor: "pointer" }}
                          >
                            Accent
                          </button>
                        </div>
                      </div>
                    )}

                    {selection.hrefSelector && (
                      <div className="admin-field" style={{ marginTop: "14px" }}>
                        <label htmlFor="content-link">Button or Link URL</label>
                        <input
                          id="content-link"
                          value={href}
                          onChange={(event) => setHref(event.target.value)}
                          placeholder="/contact or https://..."
                          className={href && !urlValid(href) ? "invalid" : ""}
                        />
                        {href && !urlValid(href) && <small className="error">Enter a valid URL or /site-path.</small>}
                      </div>
                    )}
                  </div>
                )}

                {/* Tab 2: Image and section media */}
                {activeTab === "image" && (
                  <div>
                    {/* Selected Image Upload */}
                    {selection.tag === "img" && (
                      <ImageUploadField
                        id="content-image-upload"
                        label={selection.label || "Selected Image"}
                        value={src}
                        alt={alt}
                        onUploaded={(path) => imageUploaded(path, "src")}
                        onError={(text) => setNotice({ type: "error", text })}
                      />
                    )}

                    {selection.src && (
                      <>
                        <div className="admin-field">
                          <label htmlFor="content-image">{selection.tag === "video" ? "Video URL" : "Image URL"}</label>
                          <input
                            id="content-image"
                            value={src}
                            onChange={(event) => setSrc(event.target.value)}
                            className={src && !urlValid(src, true) ? "invalid" : ""}
                          />
                        </div>
                        <div className="admin-field">
                          <label htmlFor="content-alt">Media Alternative Text</label>
                          <input id="content-alt" value={alt} onChange={(event) => setAlt(event.target.value)} />
                        </div>
                      </>
                    )}

                    {/* Hero Section Image Upload */}
                    {selection.heroImageSelector && (
                      <div style={{ marginTop: "12px", borderTop: "1px solid #e2e8ee", paddingTop: "12px" }}>
                        <div
                          style={{
                            padding: "8px 12px",
                            background: "#fffbeb",
                            borderRadius: "8px",
                            border: "1px solid #fde68a",
                            marginBottom: "10px",
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                          }}
                        >
                          <strong style={{ fontSize: "12px", color: "#92400e" }}>
                            Hero Image Layer Available
                          </strong>
                        </div>

                        <ImageUploadField
                          id="content-hero-upload"
                          label={`${selection.sectionLabel} Hero Image`}
                          value={heroImage}
                          alt={`${selection.sectionLabel} hero preview`}
                          onUploaded={(path) => imageUploaded(path, "hero")}
                          onError={(text) => setNotice({ type: "error", text })}
                        />
                        <div className="admin-field">
                          <label htmlFor="content-hero-image">Hero Section Image URL</label>
                          <input id="content-hero-image" value={heroImage} onChange={(event) => setHeroImage(event.target.value)} />
                        </div>
                      </div>
                    )}

                    {/* Background Image Upload */}
                    {selection.backgroundSelector && (
                      <div style={{ marginTop: "12px", borderTop: "1px solid #e2e8ee", paddingTop: "12px" }}>
                        <ImageUploadField
                          id="content-background-upload"
                          label={`${selection.sectionLabel} Background Image`}
                          value={backgroundImage}
                          alt={`${selection.sectionLabel} background preview`}
                          onUploaded={(path) => imageUploaded(path, "background")}
                          onError={(text) => setNotice({ type: "error", text })}
                        />
                        <div className="admin-field">
                          <label htmlFor="content-background">Background Image URL</label>
                          <input id="content-background" value={backgroundImage} onChange={(event) => setBackgroundImage(event.target.value)} />
                        </div>
                      </div>
                    )}

                    {/* Image Dimensions & Aspect Ratio Controls */}
                    <div style={{ marginTop: "16px", padding: "12px", background: "#f8fafc", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
                      <p className="admin-eyebrow" style={{ color: "#ee9e1e", marginBottom: "8px" }}>
                        Image Sizing & Dimensions
                      </p>

                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                        <div className="admin-field">
                          <label htmlFor="img-width">Width</label>
                          <input
                            id="img-width"
                            value={imageWidth}
                            onChange={(e) => setImageWidth(e.target.value)}
                            placeholder="e.g. 100%, 500px"
                          />
                        </div>

                        <div className="admin-field">
                          <label htmlFor="img-height">Height</label>
                          <input
                            id="img-height"
                            value={imageHeight}
                            onChange={(e) => setImageHeight(e.target.value)}
                            placeholder="e.g. auto, 450px, 75vh"
                          />
                        </div>
                      </div>

                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginTop: "8px" }}>
                        <div className="admin-field">
                          <label htmlFor="img-aspect">Aspect Ratio</label>
                          <select id="img-aspect" value={imageAspectRatio} onChange={(e) => setImageAspectRatio(e.target.value)}>
                            <option value="auto">Auto</option>
                            <option value="16 / 9">16:9 Landscape</option>
                            <option value="4 / 3">4:3 Standard</option>
                            <option value="1 / 1">1:1 Square</option>
                            <option value="21 / 9">21:9 Ultrawide</option>
                            <option value="3 / 2">3:2 Photo</option>
                          </select>
                        </div>

                        <div className="admin-field">
                          <label htmlFor="img-fit">Object Fit</label>
                          <select id="img-fit" value={imageObjectFit} onChange={(e) => setImageObjectFit(e.target.value)}>
                            <option value="cover">Cover (crop to fit)</option>
                            <option value="contain">Contain (show whole image)</option>
                            <option value="fill">Fill (stretch)</option>
                            <option value="none">None (original size)</option>
                            <option value="scale-down">Scale down</option>
                          </select>
                        </div>
                      </div>

                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginTop: "8px" }}>
                        <div className="admin-field">
                          <label htmlFor="img-radius">Border Radius</label>
                          <input
                            id="img-radius"
                            value={imageBorderRadius}
                            onChange={(e) => setImageBorderRadius(e.target.value)}
                            placeholder="e.g. 0px, 16px, 2rem, 9999px"
                          />
                        </div>

                        <div className="admin-field">
                          <label htmlFor="img-opacity">Opacity</label>
                          <select id="img-opacity" value={imageOpacity} onChange={(e) => setImageOpacity(e.target.value)}>
                            <option value="1">100% (Solid)</option>
                            <option value="0.9">90%</option>
                            <option value="0.8">80%</option>
                            <option value="0.7">70%</option>
                            <option value="0.5">50%</option>
                            <option value="0.35">35%</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab 3: Animation */}
                {activeTab === "animation" && selection.animationSelector && (
                  animationType === "preset" ? (
                    <div className="rounded-xl border border-slate-200 bg-white p-3">
                      <p className="admin-eyebrow">Animation</p>
                      <select className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" value={animation} onChange={(event) => handleSelectAnimation(event.target.value)}>
                        <option value="">No animation</option>
                        <option value="default">Original dynamic animation</option>
                        <option value="subtle">Subtle smooth motion</option>
                        <option value="glow">Ambient glow</option>
                        <option value="grid">Moving grid</option>
                        <option value="off">Animation off</option>
                      </select>
                    </div>
                  ) : (
                    <AnimationUploadField
                      source={animation}
                      type={animationType}
                      onUploaded={(path) => { setStagedUploads((current) => current.includes(path) ? current : [...current, path]); handleSelectAnimation(path); }}
                      onRemove={() => handleSelectAnimation("")}
                      onError={(text) => setNotice({ type: "error", text })}
                    />
                  )
                )}

                {activeTab === "style" && (
                  <div style={{ padding: "12px", background: "#f8fafc", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
                    <p className="admin-eyebrow" style={{ color: "#087b71", marginBottom: "8px" }}>
                      Typography & Element Styles
                    </p>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                      <div className="admin-field">
                        <label htmlFor="elem-fontsize">Font Size</label>
                        <input
                          id="elem-fontsize"
                          value={fontSize}
                          onChange={(e) => setFontSize(e.target.value)}
                          placeholder="e.g. 18px, 2.5rem"
                        />
                      </div>

                      <div className="admin-field">
                        <label htmlFor="elem-fontweight">Font Weight</label>
                        <select id="elem-fontweight" value={fontWeight} onChange={(e) => setFontWeight(e.target.value)}>
                          <option value="">Default</option>
                          <option value="400">Regular (400)</option>
                          <option value="500">Medium (500)</option>
                          <option value="600">Semi-Bold (600)</option>
                          <option value="700">Bold (700)</option>
                          <option value="800">Extra Bold (800)</option>
                        </select>
                      </div>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginTop: "8px" }}>
                      <div className="admin-field">
                        <label htmlFor="elem-color">Text Color</label>
                        <input
                          id="elem-color"
                          value={textColor}
                          onChange={(e) => setTextColor(e.target.value)}
                          placeholder="e.g. #ffffff, #22d3ee"
                        />
                      </div>

                      <div className="admin-field">
                        <label htmlFor="elem-align">Text Alignment</label>
                        <select id="elem-align" value={textAlign} onChange={(e) => setTextAlign(e.target.value)}>
                          <option value="">Default</option>
                          <option value="left">Left</option>
                          <option value="center">Center</option>
                          <option value="right">Right</option>
                        </select>
                      </div>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginTop: "8px" }}>
                      <div className="admin-field">
                        <label htmlFor="elem-margin-top">Margin Top</label>
                        <input
                          id="elem-margin-top"
                          value={elementMarginTop}
                          onChange={(e) => setElementMarginTop(e.target.value)}
                          placeholder="e.g. 16px, 1.5rem"
                        />
                      </div>

                      <div className="admin-field">
                        <label htmlFor="elem-margin-bottom">Margin Bottom</label>
                        <input
                          id="elem-margin-bottom"
                          value={elementMarginBottom}
                          onChange={(e) => setElementMarginBottom(e.target.value)}
                          placeholder="e.g. 24px, 2rem"
                        />
                      </div>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginTop: "8px" }}>
                      <div className="admin-field">
                        <label htmlFor="elem-padding">Padding</label>
                        <input
                          id="elem-padding"
                          value={elementPadding}
                          onChange={(e) => setElementPadding(e.target.value)}
                          placeholder="e.g. 12px 20px"
                        />
                      </div>

                      <div className="admin-field">
                        <label htmlFor="elem-bg">Background Color</label>
                        <input
                          id="elem-bg"
                          value={elementBackgroundColor}
                          onChange={(e) => setElementBackgroundColor(e.target.value)}
                          placeholder="e.g. rgba(255,255,255,0.06)"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab 5: Section dimensions */}
                {activeTab === "section" && (
                  <div className="admin-section-builder">
                    <p className="admin-eyebrow" style={{ color: "#087b71", marginBottom: "8px" }}>
                      Section Dimensions & Sizing
                    </p>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                      <div className="admin-field">
                        <label htmlFor="section-width">Section Width</label>
                        <select id="section-width" value={sectionWidth} onChange={(event) => setSectionWidth(event.target.value)}>
                          <option value="100%">Full width (100%)</option>
                          <option value="1920px">Cinema - 1920px</option>
                          <option value="1600px">Ultra Wide - 1600px</option>
                          <option value="1440px">Wide - 1440px</option>
                          <option value="1280px">Standard Max - 1280px</option>
                          <option value="1140px">Compact - 1140px</option>
                          <option value="960px">Narrow - 960px</option>
                          <option value="760px">Focus - 760px</option>
                        </select>
                      </div>

                      <div className="admin-field">
                        <label htmlFor="section-height">Minimum Height</label>
                        <select id="section-height" value={sectionMinHeight} onChange={(event) => setSectionMinHeight(event.target.value)}>
                          <option value="auto">Automatic</option>
                          <option value="400px">400px</option>
                          <option value="500px">500px</option>
                          <option value="600px">600px</option>
                          <option value="700px">700px</option>
                          <option value="75vh">75vh (Hero height)</option>
                          <option value="100svh">100vh (Full screen)</option>
                        </select>
                      </div>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginTop: "8px" }}>
                      <div className="admin-field">
                        <label htmlFor="section-pad-top">Padding Top</label>
                        <input
                          id="section-pad-top"
                          value={sectionPaddingTop}
                          onChange={(e) => setSectionPaddingTop(e.target.value)}
                          placeholder="e.g. 80px, 5rem"
                        />
                      </div>

                      <div className="admin-field">
                        <label htmlFor="section-pad-bot">Padding Bottom</label>
                        <input
                          id="section-pad-bot"
                          value={sectionPaddingBottom}
                          onChange={(e) => setSectionPaddingBottom(e.target.value)}
                          placeholder="e.g. 80px, 5rem"
                        />
                      </div>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginTop: "8px" }}>
                      <div className="admin-field">
                        <label htmlFor="section-bg-color">Section Background</label>
                        <input
                          id="section-bg-color"
                          value={sectionBackgroundColor}
                          onChange={(e) => setSectionBackgroundColor(e.target.value)}
                          placeholder="e.g. #050817, #030713, transparent"
                        />
                      </div>

                      <div className="admin-field">
                        <label htmlFor="section-layout">Content Layout</label>
                        <select id="section-layout" value={sectionLayout} onChange={(event) => setSectionLayout(event.target.value)}>
                          <option value="original">Original layout</option>
                          <option value="stack">Vertical stack</option>
                          <option value="grid">Grid</option>
                          <option value="carousel">Horizontal carousel</option>
                        </select>
                      </div>
                    </div>

                    {sectionLayout === "grid" && (
                      <div className="admin-field" style={{ marginTop: "8px" }}>
                        <label htmlFor="section-columns">Grid Columns</label>
                        <select id="section-columns" value={sectionColumns} onChange={(event) => setSectionColumns(event.target.value)}>
                          <option value="2">2 columns</option>
                          <option value="3">3 columns</option>
                          <option value="4">4 columns</option>
                        </select>
                      </div>
                    )}

                    <div className="admin-field" style={{ marginTop: "12px" }}>
                      <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                        <input type="checkbox" checked={sectionHidden} onChange={(event) => setSectionHidden(event.target.checked)} />
                        Hide this section from page
                      </label>
                      <small>Hiding removes this section visually while keeping it reversible anytime.</small>
                    </div>
                  </div>
                )}

                {/* Tab 6: Add content */}
                {activeTab === "add" && (
                  <div>
                    <div className="admin-field">
                      <label htmlFor="section-add-content">Add Content Inside this Section</label>
                      <textarea
                        id="section-add-content"
                        rows={5}
                        value={addedContent}
                        onChange={(event) => setAddedContent(event.target.value)}
                        placeholder={'<h2>New heading</h2>\n<p>New content...</p>\n<a href="/contact" class="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold text-white bg-[#008fd3] hover:bg-[#007bb8]">Learn more</a>'}
                      />
                      <small>Supports safe HTML headings, text, links, buttons, lists, and images.</small>
                    </div>

                    <div className="admin-field" style={{ marginTop: "14px" }}>
                      <label htmlFor="section-add-new">Insert a New Section After this One</label>
                      <textarea
                        id="section-add-new"
                        rows={5}
                        value={newSection}
                        onChange={(event) => setNewSection(event.target.value)}
                        placeholder={'<section class="py-20 bg-[#050817] text-white">\n  <div class="max-w-7xl mx-auto px-5">\n    <h2>New section</h2>\n  </div>\n</section>'}
                      />
                      <div className="admin-template-buttons" style={{ marginTop: "8px", display: "flex", gap: "6px" }}>
                        <button
                          type="button"
                          className="admin-secondary-button"
                          onClick={() =>
                            setNewSection(
                              '<section class="py-20 bg-[#050817] text-white border-b border-white/10">\n  <div class="max-w-7xl mx-auto px-5">\n    <h2 class="text-3xl font-bold">New Headline</h2>\n    <p class="mt-4 text-slate-300">Add detailed description here.</p>\n    <a href="/contact" class="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold text-white bg-[#008fd3] hover:bg-[#007bb8] mt-6">Contact Us</a>\n  </div>\n</section>'
                            )
                          }
                        >
                          Text + CTA
                        </button>
                        <button
                          type="button"
                          className="admin-secondary-button"
                          onClick={() =>
                            setNewSection(
                              '<section class="py-20 bg-[#030713] text-white">\n  <div class="max-w-7xl mx-auto px-5 grid md:grid-cols-3 gap-6">\n    <div class="p-6 rounded-2xl bg-white/[0.04] border border-white/10"><h3>Card 1</h3><p class="mt-2 text-slate-400">Card description.</p></div>\n    <div class="p-6 rounded-2xl bg-white/[0.04] border border-white/10"><h3>Card 2</h3><p class="mt-2 text-slate-400">Card description.</p></div>\n    <div class="p-6 rounded-2xl bg-white/[0.04] border border-white/10"><h3>Card 3</h3><p class="mt-2 text-slate-400">Card description.</p></div>\n  </div>\n</section>'
                            )
                          }
                        >
                          3-Card Grid
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Bottom Sticky Action Buttons */}
                <div className="admin-actions" style={{ marginTop: "20px", paddingTop: "14px", borderTop: "1px solid #e2e8f0" }}>
                  <button type="button" className="admin-primary-button" onClick={save} disabled={saving}>
                    {saving ? "Saving..." : "Save Changes"}
                  </button>
                  <button type="button" className="admin-secondary-button" onClick={preview} disabled={saving}>
                    Live Preview
                  </button>
                  <button
                    type="button"
                    className="admin-secondary-button"
                    onClick={() => reset()}
                    disabled={saving || selectedSaved.length === 0}
                  >
                    Reset Defaults
                  </button>
                  <button type="button" className="admin-text-button" onClick={() => void cancel()} disabled={saving}>
                    Cancel
                  </button>
                </div>
              </>
            )}
          </aside>
        </div>
      )}
    </main>
  );
}
