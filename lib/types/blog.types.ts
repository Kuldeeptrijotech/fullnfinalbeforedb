export interface Blog {
  title: string;
  description: string;
  image: string;
  link: string;
  date: string;
  category?: string;
  readTime?: string;
  author?: string;
  badgeTone?: "cyan" | "indigo" | "emerald" | "amber" | "sky" | "blue";
}

export type BlogBlockStyle = {
  textAlign?: "left" | "center" | "right" | "justify";
  fontSize?: "small" | "medium" | "large" | "xlarge" | "huge";
  textColor?: string;
  backgroundColor?: string;
  backgroundGradient?: string;
  spacing?: "none" | "compact" | "normal" | "spacious" | "custom";
  customMarginTop?: string;
  customMarginBottom?: string;
  imageWidth?: "25" | "33" | "50" | "66" | "75" | "100";
  imageAlign?: "left" | "center" | "right";
  borderRadius?: "0" | "8" | "16" | "24" | "32" | "full";
  fontWeight?: "300" | "400" | "500" | "600" | "700" | "800" | "900";
  fontFamily?: "sans" | "serif" | "mono" | "display";
  fontStyle?: "normal" | "italic";
  textDecoration?: "none" | "underline" | "line-through";
  lineHeight?: "tight" | "compact" | "normal" | "relaxed" | "loose";
  letterSpacing?: "tighter" | "tight" | "normal" | "wide" | "wider";
  textTransform?: "none" | "uppercase" | "lowercase" | "capitalize";
  padding?: "0" | "8" | "12" | "16" | "20" | "24" | "32" | "40";
  blockRadius?: "0" | "8" | "12" | "16" | "20" | "24" | "32" | "999";
  borderStyle?: "none" | "solid" | "dashed" | "dotted" | "double";
  borderWidth?: "0" | "1" | "2" | "3" | "4";
  borderColor?: string;
  boxShadow?: "none" | "soft" | "medium" | "glow-green" | "glow-amber" | "glow-cyan" | "deep";
  opacity?: "100" | "90" | "80" | "70" | "50";
  imageMaxHeight?: "200" | "320" | "480" | "640" | "800" | "auto";
  imageObjectFit?: "contain" | "cover";
  imageShadow?: "none" | "soft" | "strong" | "glow-green" | "glow-amber";
  customCss?: string;
};

export type BlogContentBlock = {
  id: string;
  type: "heading" | "subheading" | "content" | "image" | "quote" | "bulletList" | "numberedList" | "callout" | "divider" | "link";
  value: string;
  imageSrc: string;
  imageAlt: string;
  caption: string;
  linkUrl: string;
  headingLevel?: 1 | 2 | 3 | 4 | 5 | 6;
  style: BlogBlockStyle;
};

export type FeaturedImageStyle = {
  width: "50" | "75" | "100";
  align: "left" | "center" | "right";
  maxHeight: "320" | "480" | "640" | "auto";
  objectFit: "contain" | "cover";
  borderRadius: "0" | "8" | "16" | "24";
};

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  content: string;
  contentImages: Array<{ id: string; src: string; alt: string; caption: string }>;
  contentBlocks: BlogContentBlock[];
  featuredImage: string;
  featuredImageStyle: FeaturedImageStyle;
  imageAlt: string;
  author: string;
  category: string;
  tags: string[];
  publishedAt: string | null;
  updatedAt: string;
  status: "draft" | "published";
  seoTitle: string;
  seoDescription: string;
};
