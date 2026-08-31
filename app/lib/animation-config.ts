export type AnimationKind = "video" | "gif" | "preset";
export type AnimationAttribute = "data-media-src" | "src" | "data-admin-animation";

export type DomAnimationConfig = {
  exists: boolean;
  source: string;
  type: AnimationKind;
  attribute: AnimationAttribute;
  element: HTMLElement | null;
};

export function getAnimationConfig(section: HTMLElement | null, selectedElement?: HTMLElement | null): DomAnimationConfig {
  if (!section) return { exists: false, source: "", type: "preset", attribute: "data-admin-animation", element: null };

  const mediaSelector = "video, img[data-media-src], img[src$='.gif']";
  const selectedMedia = selectedElement?.matches(mediaSelector)
    ? selectedElement
    : selectedElement?.closest<HTMLElement>(mediaSelector);
  const component = selectedElement?.closest<HTMLElement>("article, li, [class*='card']") || null;
  const componentMedia =
    selectedElement?.querySelector<HTMLElement>(mediaSelector) ||
    component?.querySelector<HTMLElement>(mediaSelector) ||
    null;
  const media =
    selectedMedia && section.contains(selectedMedia)
      ? selectedMedia
      : component
        ? componentMedia
        : componentMedia || section.querySelector<HTMLElement>(mediaSelector);
  if (media) {
    const source = media.getAttribute("data-media-src") || media.getAttribute("src") || "";
    return {
      exists: true,
      source,
      type: media.tagName === "VIDEO" ? "video" : "gif",
      attribute: media.hasAttribute("data-media-src") ? "data-media-src" : "src",
      element: media,
    };
  }

  if (section.hasAttribute("data-admin-animation")) {
    return {
      exists: true,
      source: section.getAttribute("data-admin-animation") || "",
      type: "preset",
      attribute: "data-admin-animation",
      element: section,
    };
  }

  return { exists: false, source: "", type: "preset", attribute: "data-admin-animation", element: null };
}
