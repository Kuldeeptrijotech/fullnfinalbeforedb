"use client";
/* eslint-disable @next/next/no-img-element */

import { createElement, useEffect, useRef, useState } from "react";
import type { BlogPost } from "@/app/data/blogs";
import ImageUploadField from "./ImageUploadField";
import { resolveBlockStyle } from "@/app/lib/blog-style-resolver";

type Block = BlogPost["contentBlocks"][number];
type BlockType = Block["type"];

const defaultStyle = (): Block["style"] => ({
  textAlign: "left",
  fontSize: "medium",
  textColor: "",
  backgroundColor: "",
  backgroundGradient: "none",
  spacing: "normal",
  customMarginTop: "",
  customMarginBottom: "",
  imageWidth: "100",
  imageAlign: "center",
  borderRadius: "16",
  fontWeight: "400",
  fontFamily: "sans",
  fontStyle: "normal",
  textDecoration: "none",
  lineHeight: "normal",
  letterSpacing: "normal",
  textTransform: "none",
  padding: "0",
  blockRadius: "0",
  borderStyle: "none",
  borderWidth: "1",
  borderColor: "",
  boxShadow: "none",
  opacity: "100",
  imageMaxHeight: "auto",
  imageObjectFit: "contain",
  imageShadow: "soft",
  customCss: "",
});

const palette: Array<{ type: BlockType; label: string; help: string }> = [
  { type: "heading", label: "Add Heading", help: "Main article section heading" },
  { type: "subheading", label: "Add Subheading", help: "Topic subsection heading" },
  { type: "content", label: "Add Content", help: "Paragraph or rich body text" },
  { type: "image", label: "Add Image", help: "Inline responsive image" },
  { type: "quote", label: "Add Quote", help: "Highlighted pull quotation" },
  { type: "bulletList", label: "Add Bullet List", help: "Unordered bulleted points" },
  { type: "numberedList", label: "Add Numbered List", help: "Ordered step-by-step points" },
  { type: "callout", label: "Add Callout", help: "Highlighted note or insight box" },
  { type: "divider", label: "Add Divider", help: "Clean horizontal separator" },
  { type: "link", label: "Add Link", help: "Action link or resource CTA" },
];

const newBlock = (type: BlockType): Block => ({
  id: `block-${crypto.randomUUID().slice(0, 10)}`,
  type,
  value: "",
  imageSrc: "",
  imageAlt: "",
  caption: "",
  linkUrl: "",
  headingLevel: type === "heading" ? 2 : type === "subheading" ? 3 : undefined,
  style: defaultStyle(),
});

function RichTextField({
  id,
  label,
  value,
  rows,
  placeholder,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  rows: number;
  placeholder: string;
  onChange: (value: string) => void;
}) {
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const editor = editorRef.current;
    if (editor && editor.innerHTML !== value) {
      editor.innerHTML = value;
    }
  }, [value]);

  const run = (command: string, commandValue?: string) => {
    editorRef.current?.focus();
    document.execCommand(command, false, commandValue);
    onChange(editorRef.current?.innerHTML || "");
  };

  const addLink = () => {
    const url = window.prompt("Enter the link URL", "https://");
    if (url) run("createLink", url);
  };

  return (
    <div className="admin-field admin-rich-field">
      <label htmlFor={id}>{label}</label>
      <div className="admin-inline-toolbar" aria-label={`${label} formatting tools`}>
        <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => run("bold")} title="Bold (Ctrl+B)">Bold</button>
        <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => run("italic")} title="Italic (Ctrl+I)">Italic</button>
        <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => run("underline")} title="Underline (Ctrl+U)">Underline</button>
        <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => run("strikeThrough")} title="Strikethrough">Strike</button>
        <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => run("subscript")} title="Subscript">Subscript</button>
        <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => run("superscript")} title="Superscript">Superscript</button>
        <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => run("backColor", "#fff1ad")} title="Yellow Highlight" style={{ background: "#fff9db" }}>Yellow highlight</button>
        <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => run("backColor", "#d1fae5")} title="Mint Highlight" style={{ background: "#ecfdf5" }}>Mint highlight</button>
        <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => run("backColor", "#dbeafe")} title="Amber Highlight" style={{ background: "#eff6ff" }}>Amber highlight</button>
        <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => run("foreColor", "#ffffff")} title="Deep Green" style={{ color: "#ffffff", fontWeight: 700 }}>Green</button>
        <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => run("foreColor", "#ffffff")} title="Mint Teal" style={{ color: "#ffffff", fontWeight: 700 }}>Mint</button>
        <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => run("foreColor", "#ffffff")} title="Amber Gold" style={{ color: "#ffffff", fontWeight: 700 }}>Amber</button>
        <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => run("foreColor", "#0284c7")} title="Sky Blue" style={{ color: "#0284c7", fontWeight: 700 }}>Cyan</button>
        <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => run("justifyLeft")} title="Align Left">Align left</button>
        <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => run("justifyCenter")} title="Align Center">Align center</button>
        <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => run("justifyRight")} title="Align Right">Align right</button>
        <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => run("justifyFull")} title="Justify Text">Justify</button>
        <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => run("insertUnorderedList")} title="Bullet List">Bullet list</button>
        <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => run("insertOrderedList")} title="Numbered List">Numbered list</button>
        <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => run("formatBlock", "blockquote")} title="Quote Block">Quote</button>
        <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => run("formatBlock", "pre")} title="Code Block">Code block</button>
        <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={addLink} title="Add link">Add link</button>
        <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => run("removeFormat")} title="Clear formatting" style={{ color: "#b42318" }}>Clear formatting</button>
      </div>
      <div
        ref={editorRef}
        id={id}
        className="admin-rich-editor"
        contentEditable
        role="textbox"
        aria-multiline="true"
        aria-label={label}
        data-placeholder={placeholder}
        style={{ minHeight: `${Math.max(rows * 24, 60)}px` }}
        suppressContentEditableWarning
        onInput={(event) => onChange(event.currentTarget.innerHTML)}
      />
      <small>Select text to format. Formatting reflects in the live preview and published article.</small>
    </div>
  );
}

function PreviewHtmlFixer({ blocks }: { blocks: Block[] }) {
  useEffect(() => {
    const page = document.querySelector<HTMLElement>(".admin-preview-page");
    if (!page) return;
    const description = page.querySelector(".description");
    const previewNodes = Array.from(page.children)
      .slice(description ? Array.from(page.children).indexOf(description) + 1 : 2)
      .filter((node) => !node.classList.contains("featured"));

    blocks.forEach((block, index) => {
      const node = previewNodes[index] as HTMLElement | undefined;
      if (!node) return;
      if (["heading", "subheading", "content", "quote", "callout", "bulletList", "numberedList", "link"].includes(block.type)) {
        const style = resolveBlockStyle(block.style, block.type, block.headingLevel || 2);
        Object.assign(node.style, style);
        if (block.type !== "bulletList" && block.type !== "numberedList") {
          if (node.innerHTML !== block.value) {
            node.innerHTML = block.value || (({
              heading: "Heading",
              subheading: "Subheading",
              content: "Content",
              quote: "Quote",
              callout: "Callout",
              link: "Link",
            } as Partial<Record<BlockType, string>>)[block.type] ?? "");
          }
        }
      }
    });
  }, [blocks]);
  return null;
}

export default function BlogBlockEditor({
  blocks,
  title,
  description,
  featuredImage,
  featuredImageStyle,
  onChange,
  onImageUploaded,
  onError,
}: {
  blocks: Block[];
  title: string;
  description: string;
  featuredImage: string;
  featuredImageStyle: BlogPost["featuredImageStyle"];
  onChange: (blocks: Block[]) => void;
  onImageUploaded: (path: string) => void;
  onError: (message: string) => void;
}) {
  const [dropIndex, setDropIndex] = useState<number | null>(null);

  const add = (type: BlockType, index = blocks.length) => {
    const next = [...blocks];
    next.splice(index, 0, newBlock(type));
    onChange(next);
  };

  const update = (id: string, values: Partial<Block>) =>
    onChange(blocks.map((block) => (block.id === id ? { ...block, ...values } : block)));

  const updateStyle = (id: string, values: Partial<Block["style"]>) =>
    onChange(
      blocks.map((block) =>
        block.id === id ? { ...block, style: { ...defaultStyle(), ...block.style, ...values } } : block
      )
    );

  const remove = (id: string) => onChange(blocks.filter((block) => block.id !== id));

  const duplicate = (block: Block, index: number) => {
    const copy = { ...block, id: `block-${crypto.randomUUID().slice(0, 10)}`, style: { ...block.style } };
    const next = [...blocks];
    next.splice(index + 1, 0, copy);
    onChange(next);
  };

  const move = (id: string, targetIndex: number) => {
    const sourceIndex = blocks.findIndex((block) => block.id === id);
    if (sourceIndex < 0) return;
    const next = [...blocks];
    const [block] = next.splice(sourceIndex, 1);
    next.splice(sourceIndex < targetIndex ? targetIndex - 1 : targetIndex, 0, block);
    onChange(next);
  };

  const drop = (event: React.DragEvent, index: number) => {
    event.preventDefault();
    const existingId = event.dataTransfer.getData("application/x-blog-block-id");
    const type = event.dataTransfer.getData("application/x-blog-block-type") as BlockType;
    if (existingId) move(existingId, index);
    else if (palette.some((item) => item.type === type)) add(type, index);
    setDropIndex(null);
  };

  return (
    <div className="admin-block-builder">
      <PreviewHtmlFixer blocks={blocks} />

      <section
        className="admin-block-canvas"
        onDragOver={(event) => event.preventDefault()}
        onDrop={(event) => drop(event, blocks.length)}
      >
        <div className="admin-block-canvas-heading">
          <div>
            <label>Blog page content</label>
            <small>Drag blocks from the right panel and customize their styling to build your article.</small>
          </div>
          <span>{blocks.length} blocks</span>
        </div>

        {blocks.length === 0 && (
          <div
            className={`admin-block-empty ${dropIndex === 0 ? "is-drop-active" : ""}`}
            onDragEnter={() => setDropIndex(0)}
            onDragOver={(event) => event.preventDefault()}
            onDragLeave={() => setDropIndex(null)}
            onDrop={(event) => drop(event, 0)}
          >
            <strong>Drop a content block here</strong>
            <small>Or select an element from the right panel to begin.</small>
          </div>
        )}

        {blocks.map((block, index) => (
          <div key={block.id} className="admin-block-row-wrap">
            <div
              className={`admin-block-insert-zone ${dropIndex === index ? "is-active" : ""}`}
              onDragEnter={(event) => {
                event.preventDefault();
                setDropIndex(index);
              }}
              onDragOver={(event) => {
                event.preventDefault();
                event.dataTransfer.dropEffect = event.dataTransfer.types.includes(
                  "application/x-blog-block-id"
                )
                  ? "move"
                  : "copy";
              }}
              onDrop={(event) => {
                event.stopPropagation();
                drop(event, index);
              }}
            >
              <span>Drop block here</span>
            </div>

            <article
              className="admin-content-block"
              draggable
              onDragStart={(event) => {
                event.dataTransfer.effectAllowed = "move";
                event.dataTransfer.setData("application/x-blog-block-id", block.id);
              }}
              onDragEnd={() => setDropIndex(null)}
            >
              <div className="admin-content-block-header">
                <span className="admin-drag-handle">Drag</span>
                <strong>
                  {palette.find((item) => item.type === block.type)?.label.replace("Add ", "")}
                </strong>
                <div>
                  <button type="button" onClick={() => duplicate(block, index)} aria-label="Duplicate block" title="Duplicate block">
                    Duplicate
                  </button>
                  <button
                    type="button"
                    onClick={() => index > 0 && move(block.id, index - 1)}
                    disabled={index === 0}
                    aria-label="Move block up"
                    title="Move up"
                  >Up</button>
                  <button
                    type="button"
                    onClick={() => index < blocks.length - 1 && move(block.id, index + 2)}
                    disabled={index === blocks.length - 1}
                    aria-label="Move block down"
                    title="Move down"
                  >Down</button>
                  <button type="button" className="remove" onClick={() => remove(block.id)} aria-label="Remove block" title="Remove block">
                    ×
                  </button>
                </div>
              </div>

              {/* Block-specific input fields */}
              {block.type === "heading" && (
                <div className="admin-block-heading-fields">
                  <div className="admin-field">
                    <label htmlFor={`${block.id}-level`}>Heading hierarchy</label>
                    <select
                      id={`${block.id}-level`}
                      value={block.headingLevel || 2}
                      onChange={(event) =>
                        update(block.id, { headingLevel: Number(event.target.value) as Block["headingLevel"] })
                      }
                    >
                      {[1, 2, 3, 4, 5, 6].map((level) => (
                        <option value={level} key={level}>H{level}</option>
                      ))}
                    </select>
                  </div>
                  <RichTextField
                    id={`${block.id}-value`}
                    label="Heading text"
                    rows={2}
                    value={block.value}
                    onChange={(value) => update(block.id, { value })}
                    placeholder="Enter section heading"
                  />
                </div>
              )}

              {block.type === "subheading" && (
                <div className="admin-block-heading-fields">
                  <div className="admin-field">
                    <label htmlFor={`${block.id}-level`}>Subheading hierarchy</label>
                    <select
                      id={`${block.id}-level`}
                      value={Math.max(2, block.headingLevel || 3)}
                      onChange={(event) =>
                        update(block.id, { headingLevel: Number(event.target.value) as Block["headingLevel"] })
                      }
                    >
                      {[2, 3, 4, 5, 6].map((level) => (
                        <option value={level} key={level}>H{level}</option>
                      ))}
                    </select>
                  </div>
                  <RichTextField
                    id={`${block.id}-value`}
                    label="Subheading text"
                    rows={2}
                    value={block.value}
                    onChange={(value) => update(block.id, { value })}
                    placeholder="Enter subsection heading"
                  />
                </div>
              )}

              {block.type === "content" && (
                <RichTextField
                  id={`${block.id}-value`}
                  label="Content paragraph"
                  rows={6}
                  value={block.value}
                  onChange={(value) => update(block.id, { value })}
                  placeholder="Enter paragraph or rich body text..."
                />
              )}

              {block.type === "quote" && (
                <RichTextField
                  id={`${block.id}-value`}
                  label="Quotation text"
                  rows={4}
                  value={block.value}
                  onChange={(value) => update(block.id, { value })}
                  placeholder="Enter the highlighted quote or client testimonial"
                />
              )}

              {(block.type === "bulletList" || block.type === "numberedList") && (
                <div className="admin-field">
                  <label htmlFor={`${block.id}-value`}>
                    {block.type === "bulletList" ? "Bullet list items" : "Numbered list items"}
                  </label>
                  <textarea
                    id={`${block.id}-value`}
                    rows={6}
                    value={block.value}
                    onChange={(event) => update(block.id, { value: event.target.value })}
                    placeholder="Enter one item per line"
                  />
                  <small>Each non-empty line becomes a separate list item.</small>
                </div>
              )}

              {block.type === "callout" && (
                <RichTextField
                  id={`${block.id}-value`}
                  label="Callout note / insight"
                  rows={4}
                  value={block.value}
                  onChange={(value) => update(block.id, { value })}
                  placeholder="Enter key takeaway, technical alert, or best practice note"
                />
              )}

              {block.type === "divider" && (
                <div className="admin-divider-preview">
                  <span />
                  Section Divider Line
                </div>
              )}

              {block.type === "link" && (
                <div className="admin-block-image-fields">
                  <div className="admin-field">
                    <label htmlFor={`${block.id}-value`}>Link / Button text</label>
                    <input
                      id={`${block.id}-value`}
                      value={block.value}
                      onChange={(event) => update(block.id, { value: event.target.value })}
                      placeholder="Explore SAP BTP Solutions"
                    />
                  </div>
                  <div className="admin-field">
                    <label htmlFor={`${block.id}-url`}>Destination URL</label>
                    <input
                      id={`${block.id}-url`}
                      value={block.linkUrl}
                      onChange={(event) => update(block.id, { linkUrl: event.target.value })}
                      placeholder="/services/sap-btp or https://..."
                    />
                  </div>
                </div>
              )}

              {block.type === "image" && (
                <>
                  <ImageUploadField
                    id={`${block.id}-upload`}
                    label="Inline image"
                    value={block.imageSrc}
                    alt={block.imageAlt}
                    onUploaded={(path) => {
                      update(block.id, { imageSrc: path });
                      onImageUploaded(path);
                    }}
                    onError={onError}
                  />
                  <div className="admin-block-image-fields">
                    <div className="admin-field">
                      <label htmlFor={`${block.id}-alt`}>Image alt text</label>
                      <input
                        id={`${block.id}-alt`}
                        value={block.imageAlt}
                        onChange={(event) => update(block.id, { imageAlt: event.target.value })}
                        placeholder="Descriptive alt text for accessibility"
                      />
                    </div>
                    <div className="admin-field">
                      <label htmlFor={`${block.id}-caption`}>Caption (optional)</label>
                      <input
                        id={`${block.id}-caption`}
                        value={block.caption}
                        onChange={(event) => update(block.id, { caption: event.target.value })}
                        placeholder="Figure 1: SAP Architecture diagram"
                      />
                    </div>
                  </div>
                </>
              )}

              {/* ───────────────────────────────────────────────────────────
                  EXPANDED ULTRA-POWERFUL CUSTOMIZE STYLING SECTION
                  ─────────────────────────────────────────────────────────── */}
              <details className="admin-block-style-tools" open={false}>
                <summary>Customize Styling and Design (Advanced)</summary>
                
                <div className="admin-block-style-grid">
                  {/* 1. TYPOGRAPHY */}
                  {block.type !== "image" && (
                    <>
                      <div className="admin-field">
                        <label htmlFor={`${block.id}-font-family`}>Font family</label>
                        <select
                          id={`${block.id}-font-family`}
                          value={block.style?.fontFamily || "sans"}
                          onChange={(e) => updateStyle(block.id, { fontFamily: e.target.value as Block["style"]["fontFamily"] })}
                        >
                          <option value="sans">Modern Sans (Inter / Poppins)</option>
                          <option value="serif">Editorial Serif (Merriweather / Georgia)</option>
                          <option value="mono">Technical Monospace (JetBrains Mono)</option>
                          <option value="display">Syne / Display Heading</option>
                        </select>
                      </div>

                      <div className="admin-field">
                        <label htmlFor={`${block.id}-size`}>Text size</label>
                        <select
                          id={`${block.id}-size`}
                          value={block.style?.fontSize || "medium"}
                          onChange={(e) => updateStyle(block.id, { fontSize: e.target.value as Block["style"]["fontSize"] })}
                        >
                          <option value="small">Small (14px)</option>
                          <option value="medium">Medium (16px)</option>
                          <option value="large">Large (19px)</option>
                          <option value="xlarge">Extra Large (23px)</option>
                          <option value="huge">Hero / Huge (30px)</option>
                        </select>
                      </div>

                      <div className="admin-field">
                        <label htmlFor={`${block.id}-weight`}>Font weight</label>
                        <select
                          id={`${block.id}-weight`}
                          value={block.style?.fontWeight || "400"}
                          onChange={(e) => updateStyle(block.id, { fontWeight: e.target.value as Block["style"]["fontWeight"] })}
                        >
                          <option value="300">300 - Light</option>
                          <option value="400">400 - Regular</option>
                          <option value="500">500 - Medium</option>
                          <option value="600">600 - Semi Bold</option>
                          <option value="700">700 - Bold</option>
                          <option value="800">800 - Extra Bold</option>
                          <option value="900">900 - Black</option>
                        </select>
                      </div>

                      <div className="admin-field">
                        <label htmlFor={`${block.id}-align`}>Alignment</label>
                        <select
                          id={`${block.id}-align`}
                          value={block.style?.textAlign || "left"}
                          onChange={(e) => updateStyle(block.id, { textAlign: e.target.value as Block["style"]["textAlign"] })}
                        >
                          <option value="left">Left</option>
                          <option value="center">Center</option>
                          <option value="right">Right</option>
                          <option value="justify">Justify (Full)</option>
                        </select>
                      </div>

                      <div className="admin-field">
                        <label htmlFor={`${block.id}-tracking`}>Letter spacing (Tracking)</label>
                        <select
                          id={`${block.id}-tracking`}
                          value={block.style?.letterSpacing || "normal"}
                          onChange={(e) => updateStyle(block.id, { letterSpacing: e.target.value as Block["style"]["letterSpacing"] })}
                        >
                          <option value="tighter">Tighter (-0.03em)</option>
                          <option value="tight">Tight (-0.015em)</option>
                          <option value="normal">Normal (0)</option>
                          <option value="wide">Wide (+0.05em)</option>
                          <option value="wider">Extra Wide (+0.15em)</option>
                        </select>
                      </div>

                      <div className="admin-field">
                        <label htmlFor={`${block.id}-line-height`}>Line height</label>
                        <select
                          id={`${block.id}-line-height`}
                          value={block.style?.lineHeight || "normal"}
                          onChange={(e) => updateStyle(block.id, { lineHeight: e.target.value as Block["style"]["lineHeight"] })}
                        >
                          <option value="tight">Tight (1.25)</option>
                          <option value="compact">Compact (1.4)</option>
                          <option value="normal">Normal (1.75)</option>
                          <option value="relaxed">Relaxed (2.0)</option>
                          <option value="loose">Loose (2.3)</option>
                        </select>
                      </div>

                      <div className="admin-field">
                        <label htmlFor={`${block.id}-transform`}>Letter case</label>
                        <select
                          id={`${block.id}-transform`}
                          value={block.style?.textTransform || "none"}
                          onChange={(e) => updateStyle(block.id, { textTransform: e.target.value as Block["style"]["textTransform"] })}
                        >
                          <option value="none">Original</option>
                          <option value="uppercase">UPPERCASE</option>
                          <option value="lowercase">lowercase</option>
                          <option value="capitalize">Capitalize Words</option>
                        </select>
                      </div>

                      <div className="admin-field admin-toggle-field">
                        <label>Format styles</label>
                        <div>
                          <button
                            type="button"
                            className={block.style?.fontStyle === "italic" ? "is-active" : ""}
                            onClick={() => updateStyle(block.id, { fontStyle: block.style?.fontStyle === "italic" ? "normal" : "italic" })}
                            title="Toggle Italic"
                          >
                            <em>I</em>
                          </button>
                          <button
                            type="button"
                            className={block.style?.textDecoration === "underline" ? "is-active" : ""}
                            onClick={() => updateStyle(block.id, { textDecoration: block.style?.textDecoration === "underline" ? "none" : "underline" })}
                            title="Toggle Underline"
                          >
                            <u>U</u>
                          </button>
                          <button
                            type="button"
                            className={block.style?.textDecoration === "line-through" ? "is-active" : ""}
                            onClick={() => updateStyle(block.id, { textDecoration: block.style?.textDecoration === "line-through" ? "none" : "line-through" })}
                            title="Toggle Strikethrough"
                          >
                            <s>S</s>
                          </button>
                        </div>
                      </div>

                      <div className="admin-field admin-color-field">
                        <label htmlFor={`${block.id}-color`}>Text color</label>
                        <input
                          id={`${block.id}-color`}
                          type="color"
                          value={block.style?.textColor || "#232555"}
                          onChange={(e) => updateStyle(block.id, { textColor: e.target.value })}
                        />
                        <button type="button" onClick={() => updateStyle(block.id, { textColor: "" })}>Reset</button>
                      </div>
                    </>
                  )}

                  {/* 2. BACKGROUNDS & GRADIENTS */}
                  <div className="admin-field admin-color-field">
                    <label htmlFor={`${block.id}-background`}>Background color</label>
                    <input
                      id={`${block.id}-background`}
                      type="color"
                      value={block.style?.backgroundColor || "#ffffff"}
                      onChange={(e) => updateStyle(block.id, { backgroundColor: e.target.value })}
                    />
                    <button type="button" onClick={() => updateStyle(block.id, { backgroundColor: "" })}>Reset</button>
                  </div>

                  <div className="admin-field">
                    <label htmlFor={`${block.id}-gradient`}>Gradient atmosphere</label>
                    <select
                      id={`${block.id}-gradient`}
                      value={block.style?.backgroundGradient || "none"}
                      onChange={(e) => updateStyle(block.id, { backgroundGradient: e.target.value })}
                    >
                      <option value="none">None (Solid Color)</option>
                      <option value="emerald">Emerald / Mint Ambient Subtle</option>
                      <option value="amber">Amber Gold Radiant Sunset</option>
                      <option value="midnight">Deep Midnight Card (Dark)</option>
                      <option value="cyan">Electric Cyan High-Tech</option>
                      <option value="glass">Frosted Dark Glass</option>
                      <option value="frost">Soft Light Frost</option>
                    </select>
                  </div>

                  <div className="admin-field">
                    <label htmlFor={`${block.id}-opacity`}>Opacity</label>
                    <select
                      id={`${block.id}-opacity`}
                      value={block.style?.opacity || "100"}
                      onChange={(e) => updateStyle(block.id, { opacity: e.target.value as Block["style"]["opacity"] })}
                    >
                      <option value="100">100% (Solid)</option>
                      <option value="90">90%</option>
                      <option value="80">80%</option>
                      <option value="70">70%</option>
                      <option value="50">50% (Translucent)</option>
                    </select>
                  </div>

                  {/* 3. BORDERS & SHADOWS */}
                  <div className="admin-field">
                    <label htmlFor={`${block.id}-border-style`}>Border style</label>
                    <select
                      id={`${block.id}-border-style`}
                      value={block.style?.borderStyle || "none"}
                      onChange={(e) => updateStyle(block.id, { borderStyle: e.target.value as Block["style"]["borderStyle"] })}
                    >
                      <option value="none">None</option>
                      <option value="solid">Solid Line</option>
                      <option value="dashed">Dashed Line</option>
                      <option value="dotted">Dotted Line</option>
                      <option value="double">Double Line</option>
                    </select>
                  </div>

                  <div className="admin-field">
                    <label htmlFor={`${block.id}-border-width`}>Border thickness</label>
                    <select
                      id={`${block.id}-border-width`}
                      value={block.style?.borderWidth || "1"}
                      onChange={(e) => updateStyle(block.id, { borderWidth: e.target.value as Block["style"]["borderWidth"] })}
                    >
                      <option value="1">1px (Subtle)</option>
                      <option value="2">2px (Medium)</option>
                      <option value="3">3px (Thick)</option>
                      <option value="4">4px (Heavy)</option>
                    </select>
                  </div>

                  <div className="admin-field admin-color-field">
                    <label htmlFor={`${block.id}-border-color`}>Border color</label>
                    <input
                      id={`${block.id}-border-color`}
                      type="color"
                      value={block.style?.borderColor || "#dce2e8"}
                      onChange={(e) => updateStyle(block.id, { borderColor: e.target.value })}
                    />
                    <button type="button" onClick={() => updateStyle(block.id, { borderColor: "" })}>Reset</button>
                  </div>

                  <div className="admin-field">
                    <label htmlFor={`${block.id}-block-radius`}>Corner radius (Roundness)</label>
                    <select
                      id={`${block.id}-block-radius`}
                      value={block.style?.blockRadius || "0"}
                      onChange={(e) => updateStyle(block.id, { blockRadius: e.target.value as Block["style"]["blockRadius"] })}
                    >
                      <option value="0">0px - Square</option>
                      <option value="8">8px - Small</option>
                      <option value="12">12px - Medium</option>
                      <option value="16">16px - Large</option>
                      <option value="24">24px - Extra Large Card</option>
                      <option value="32">32px - Ultra Rounded</option>
                      <option value="999">Full Pill / Stadium</option>
                    </select>
                  </div>

                  <div className="admin-field">
                    <label htmlFor={`${block.id}-shadow`}>Shadow &amp; Glow effect</label>
                    <select
                      id={`${block.id}-shadow`}
                      value={block.style?.boxShadow || "none"}
                      onChange={(e) => updateStyle(block.id, { boxShadow: e.target.value as Block["style"]["boxShadow"] })}
                    >
                      <option value="none">None</option>
                      <option value="soft">Soft Ambient Drop Shadow</option>
                      <option value="medium">Elevated Card Shadow</option>
                      <option value="deep">Deep 3D Floating Shadow</option>
                      <option value="glow-green">Emerald Green Outer Glow</option>
                      <option value="glow-amber">Amber Gold Outer Glow</option>
                      <option value="glow-cyan">Electric Cyan Glow</option>
                    </select>
                  </div>

                  {/* 4. SPACING & PADDING */}
                  <div className="admin-field">
                    <label htmlFor={`${block.id}-padding`}>Inner padding (Breathing room)</label>
                    <select
                      id={`${block.id}-padding`}
                      value={block.style?.padding || "0"}
                      onChange={(e) => updateStyle(block.id, { padding: e.target.value as Block["style"]["padding"] })}
                    >
                      <option value="0">None (0px)</option>
                      <option value="8">8px - Compact</option>
                      <option value="12">12px - Small</option>
                      <option value="16">16px - Regular</option>
                      <option value="20">20px - Medium</option>
                      <option value="24">24px - Large</option>
                      <option value="32">32px - Spacious</option>
                      <option value="40">40px - Heroic Box</option>
                    </select>
                  </div>

                  <div className="admin-field">
                    <label htmlFor={`${block.id}-spacing`}>Vertical spacing preset</label>
                    <select
                      id={`${block.id}-spacing`}
                      value={block.style?.spacing || "normal"}
                      onChange={(e) => updateStyle(block.id, { spacing: e.target.value as Block["style"]["spacing"] })}
                    >
                      <option value="none">None (0px)</option>
                      <option value="compact">Compact (10px)</option>
                      <option value="normal">Normal (20px)</option>
                      <option value="spacious">Spacious (36px)</option>
                    </select>
                  </div>

                  {/* 5. IMAGE-SPECIFIC STYLING */}
                  {block.type === "image" && (
                    <>
                      <div className="admin-field">
                        <label htmlFor={`${block.id}-width`}>Image width</label>
                        <select
                          id={`${block.id}-width`}
                          value={block.style?.imageWidth || "100"}
                          onChange={(e) => updateStyle(block.id, { imageWidth: e.target.value as Block["style"]["imageWidth"] })}
                        >
                          <option value="25">25% (Thumbnail)</option>
                          <option value="33">33% (One Third)</option>
                          <option value="50">50% (Half Width)</option>
                          <option value="66">66% (Two Thirds)</option>
                          <option value="75">75%</option>
                          <option value="100">100% (Full Width)</option>
                        </select>
                      </div>

                      <div className="admin-field">
                        <label htmlFor={`${block.id}-image-align`}>Image alignment</label>
                        <select
                          id={`${block.id}-image-align`}
                          value={block.style?.imageAlign || "center"}
                          onChange={(e) => updateStyle(block.id, { imageAlign: e.target.value as Block["style"]["imageAlign"] })}
                        >
                          <option value="left">Left</option>
                          <option value="center">Center</option>
                          <option value="right">Right</option>
                        </select>
                      </div>

                      <div className="admin-field">
                        <label htmlFor={`${block.id}-radius`}>Image corner radius</label>
                        <select
                          id={`${block.id}-radius`}
                          value={block.style?.borderRadius || "16"}
                          onChange={(e) => updateStyle(block.id, { borderRadius: e.target.value as Block["style"]["borderRadius"] })}
                        >
                          <option value="0">Square (0px)</option>
                          <option value="8">Small (8px)</option>
                          <option value="16">Medium (16px)</option>
                          <option value="24">Large (24px)</option>
                          <option value="32">Extra Large (32px)</option>
                          <option value="full">Full Round / Circle</option>
                        </select>
                      </div>

                      <div className="admin-field">
                        <label htmlFor={`${block.id}-max-height`}>Image max height</label>
                        <select
                          id={`${block.id}-max-height`}
                          value={block.style?.imageMaxHeight || "auto"}
                          onChange={(e) => updateStyle(block.id, { imageMaxHeight: e.target.value as Block["style"]["imageMaxHeight"] })}
                        >
                          <option value="200">200px (Compact banner)</option>
                          <option value="320">320px</option>
                          <option value="480">480px</option>
                          <option value="640">640px</option>
                          <option value="800">800px</option>
                          <option value="auto">Natural / Unconstrained</option>
                        </select>
                      </div>

                      <div className="admin-field">
                        <label htmlFor={`${block.id}-fit`}>Image fit</label>
                        <select
                          id={`${block.id}-fit`}
                          value={block.style?.imageObjectFit || "contain"}
                          onChange={(e) => updateStyle(block.id, { imageObjectFit: e.target.value as Block["style"]["imageObjectFit"] })}
                        >
                          <option value="contain">Contain (Full Image Visible)</option>
                          <option value="cover">Cover / Fill Area (Crop to fit)</option>
                        </select>
                      </div>

                      <div className="admin-field">
                        <label htmlFor={`${block.id}-img-shadow`}>Image shadow &amp; glow</label>
                        <select
                          id={`${block.id}-img-shadow`}
                          value={block.style?.imageShadow || "soft"}
                          onChange={(e) => updateStyle(block.id, { imageShadow: e.target.value as Block["style"]["imageShadow"] })}
                        >
                          <option value="none">None</option>
                          <option value="soft">Soft Subtle Shadow</option>
                          <option value="strong">Strong 3D Depth Shadow</option>
                          <option value="glow-green">Emerald Ambient Glow</option>
                          <option value="glow-amber">Amber Gold Ambient Glow</option>
                        </select>
                      </div>
                    </>
                  )}

                  {/* 6. POWER USER FREEFORM CUSTOM CSS */}
                  <div className="admin-field admin-field-wide" style={{ gridColumn: "1 / -1" }}>
                    <label htmlFor={`${block.id}-custom-css`}>
                      Custom CSS styles (Type any CSS property)
                    </label>
                    <input
                      id={`${block.id}-custom-css`}
                      value={block.style?.customCss || ""}
                      onChange={(e) => updateStyle(block.id, { customCss: e.target.value })}
                      placeholder="e.g. letter-spacing: 2px; backdrop-filter: blur(10px); transform: rotate(-0.5deg);"
                    />
                    <small>Write standard CSS key-value pairs separated by semicolons. Applies directly to this block.</small>
                  </div>

                  {/* Reset Button */}
                  <div className="admin-field admin-style-reset" style={{ gridColumn: "1 / -1" }}>
                    <button type="button" onClick={() => update(block.id, { style: defaultStyle() })}>
                      Reset all styling to default
                    </button>
                  </div>
                </div>
              </details>
            </article>
          </div>
        ))}

        {blocks.length > 0 && (
          <div
            className={`admin-block-insert-zone admin-block-drop-end ${
              dropIndex === blocks.length ? "is-active" : ""
            }`}
            onDragEnter={(event) => {
              event.preventDefault();
              setDropIndex(blocks.length);
            }}
            onDragOver={(event) => event.preventDefault()}
            onDrop={(event) => {
              event.stopPropagation();
              drop(event, blocks.length);
            }}
          >
            <span>Drop block here</span>
          </div>
        )}
      </section>

      {/* Right Side Panel: Elements & Live Preview */}
      <aside className="admin-block-side-panel">
        <div className="admin-block-palette" aria-label="Content blocks">
          <p className="admin-eyebrow">Add blocks</p>
          <h3>Page elements</h3>
          <small>Drag an element into the canvas or click to append.</small>
          {palette.map((item) => (
            <button
              type="button"
              draggable
              key={item.type}
              onDragStart={(event) => {
                event.dataTransfer.effectAllowed = "copy";
                event.dataTransfer.setData("application/x-blog-block-type", item.type);
              }}
              onDragEnd={() => setDropIndex(null)}
              onClick={() => add(item.type)}
            >
              <div>
                <strong>{item.label}</strong>
                <small>{item.help}</small>
              </div>
            </button>
          ))}
        </div>

        <section className="admin-block-live-preview" aria-label="Live blog preview">
          <p className="admin-eyebrow">Live Preview</p>
          <div className="admin-preview-page">
            <h1>{title || "Blog title"}</h1>
            <p className="description">{description || "Your short description will appear here."}</p>
            {featuredImage && (
              <img
                className="featured"
                src={featuredImage}
                alt="Featured preview"
                style={{
                  width: `${featuredImageStyle.width}%`,
                  maxHeight:
                    featuredImageStyle.maxHeight === "auto"
                      ? "none"
                      : `${featuredImageStyle.maxHeight}px`,
                  objectFit: featuredImageStyle.objectFit,
                  borderRadius: `${featuredImageStyle.borderRadius}px`,
                  marginLeft:
                    featuredImageStyle.align === "right" ||
                    featuredImageStyle.align === "center"
                      ? "auto"
                      : 0,
                  marginRight:
                    featuredImageStyle.align === "left" ||
                    featuredImageStyle.align === "center"
                      ? "auto"
                      : 0,
                }}
              />
            )}

            {blocks.map((block) => {
              const headingLevel = Math.min(6, Math.max(1, block.headingLevel || (block.type === "heading" ? 2 : 3))) as 1 | 2 | 3 | 4 | 5 | 6;
              const style = resolveBlockStyle(block.style, block.type, headingLevel);

              if (block.type === "heading") {
                return createElement(`h${headingLevel}`, { key: block.id, style, dangerouslySetInnerHTML: { __html: block.value || "Heading" } });
              }
              if (block.type === "subheading") {
                return createElement(`h${headingLevel}`, { key: block.id, style, dangerouslySetInnerHTML: { __html: block.value || "Subheading" } });
              }
              if (block.type === "image") {
                const imgShadow = block.style?.imageShadow === "none" ? "none" : block.style?.imageShadow === "strong" ? "0 16px 36px rgba(0,0,0,0.35)" : block.style?.imageShadow === "glow-green" ? "0 0 30px rgba(255, 255, 255,0.4)" : block.style?.imageShadow === "glow-amber" ? "0 0 30px rgba(255, 255, 255,0.4)" : "0 10px 24px rgba(0,0,0,0.18)";
                const imgRadius = block.style?.borderRadius === "full" ? "9999px" : `${block.style?.borderRadius || "16"}px`;
                return block.imageSrc ? (
                  <img
                    key={block.id}
                    src={block.imageSrc}
                    alt={block.imageAlt || "Content preview"}
                    style={{
                      width: `${block.style?.imageWidth || "100"}%`,
                      maxHeight:
                        block.style?.imageMaxHeight === "auto"
                          ? "none"
                          : `${block.style?.imageMaxHeight || "640"}px`,
                      objectFit: block.style?.imageObjectFit || "contain",
                      boxShadow: imgShadow,
                      borderRadius: imgRadius,
                      marginTop: style.marginTop,
                      marginBottom: style.marginBottom,
                      marginLeft:
                        block.style?.imageAlign === "right" || block.style?.imageAlign === "center"
                          ? "auto"
                          : 0,
                      marginRight:
                        block.style?.imageAlign === "left" || block.style?.imageAlign === "center"
                          ? "auto"
                          : 0,
                    }}
                  />
                ) : (
                  <div className="image-placeholder" key={block.id}>
                    Image
                  </div>
                );
              }
              if (block.type === "divider") {
                return <hr key={block.id} style={{ marginTop: style.marginTop, marginBottom: style.marginBottom }} />;
              }
              if (block.type === "bulletList" || block.type === "numberedList") {
                const Tag = block.type === "bulletList" ? "ul" : "ol";
                return (
                  <Tag key={block.id} style={style}>
                    {block.value
                      .split(/\r?\n/)
                      .filter(Boolean)
                      .map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                  </Tag>
                );
              }
              if (block.type === "quote") {
                return (
                  <blockquote
                    key={block.id}
                    style={style}
                    dangerouslySetInnerHTML={{ __html: block.value || "Quote" }}
                  />
                );
              }
              if (block.type === "callout") {
                return (
                  <aside
                    key={block.id}
                    style={style}
                    dangerouslySetInnerHTML={{ __html: block.value || "Callout" }}
                  />
                );
              }
              if (block.type === "link") {
                return (
                  <a
                    key={block.id}
                    href="#"
                    style={style}
                    onClick={(event) => event.preventDefault()}
                  >
                    {block.value || "Link"}
                  </a>
                );
              }
              return (
                <p
                  key={block.id}
                  style={style}
                  dangerouslySetInnerHTML={{ __html: block.value || "Content paragraph" }}
                />
              );
            })}
          </div>
        </section>
      </aside>
    </div>
  );
}
