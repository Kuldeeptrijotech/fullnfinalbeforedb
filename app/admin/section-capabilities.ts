export type EditorTab = "content" | "image" | "animation" | "style" | "section" | "add";

export type SectionCapabilities = {
  text: boolean;
  link: boolean;
  image: boolean;
  video: boolean;
  backgroundImage: boolean;
  animation: boolean;
  elementStyle: boolean;
  sectionSettings: boolean;
  addContent: boolean;
  hero: boolean;
};

type CapabilitySource = {
  tag: string;
  html: string;
  hrefSelector: string;
  src: string;
  backgroundSelector: string;
  heroImageSelector: string;
  animationSelector: string;
  sectionSelector: string;
  sectionLabel: string;
  capabilities?: Partial<SectionCapabilities>;
};

export function detectSectionCapabilities(selection: CapabilitySource): SectionCapabilities {
  const mediaTag = selection.tag === "img" || selection.tag === "video";
  const textTag = /^(h[1-6]|p|span|label|li|a|button|blockquote)$/.test(selection.tag);
  const hero = selection.capabilities?.hero ??
    Boolean(selection.heroImageSelector || selection.animationSelector || /hero/i.test(selection.sectionLabel));

  return {
    text: selection.capabilities?.text ?? (textTag && selection.html !== ""),
    link: selection.capabilities?.link ?? Boolean(selection.hrefSelector),
    image: selection.capabilities?.image ?? (selection.tag === "img" || Boolean(selection.heroImageSelector)),
    video: selection.capabilities?.video ?? selection.tag === "video",
    backgroundImage: selection.capabilities?.backgroundImage ?? Boolean(selection.backgroundSelector),
    animation: selection.capabilities?.animation ?? Boolean(selection.animationSelector),
    elementStyle: selection.capabilities?.elementStyle ?? (textTag || mediaTag),
    sectionSettings: selection.capabilities?.sectionSettings ?? selection.tag === "section",
    addContent: selection.capabilities?.addContent ?? selection.tag === "section",
    hero,
  };
}

export function tabsForCapabilities(capabilities: SectionCapabilities): Array<{ id: EditorTab; label: string }> {
  const tabs: Array<{ id: EditorTab; label: string }> = [];
  if (capabilities.text || capabilities.link) tabs.push({ id: "content", label: capabilities.link && !capabilities.text ? "Link" : "Text and Link" });
  if (capabilities.image || capabilities.video || capabilities.backgroundImage) tabs.push({ id: "image", label: capabilities.video ? "Video" : "Image" });
  if (capabilities.animation) tabs.push({ id: "animation", label: "Animation" });
  if (capabilities.elementStyle) tabs.push({ id: "style", label: "Element Style" });
  if (capabilities.sectionSettings) tabs.push({ id: "section", label: "Section Settings" });
  if (capabilities.addContent) tabs.push({ id: "add", label: "Add Content" });
  return tabs;
}
