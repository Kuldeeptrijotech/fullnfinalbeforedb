import LatestBlogsCarousel from "./LatestBlogsCarousel";
import ContactCta from "./common/ContactCta";
import type { BlogPost } from "@/lib/types/blog.types";
import { createElement } from "react";
import { resolveBlockStyle } from "@/app/lib/blog-style-resolver";

export default function ManagedBlogPage({ post, preview = false }: { post: BlogPost; preview?: boolean }) {
  const date = post.publishedAt ? new Intl.DateTimeFormat("en", { dateStyle: "long", timeZone: "UTC" }).format(new Date(post.publishedAt)) : "Draft";
  const contentParts = post.content.split(/\{\{image:([^}]+)\}\}/g);
  return (
    <main className="public-alternating-page min-h-screen w-full bg-[#050817] pt-24 text-white font-sans overflow-hidden">
      <article className="w-full">
        {/* Full-width Hero Header */}
        <header className="relative isolate w-full overflow-hidden bg-[#050817] py-12 sm:py-16 border-b border-white/10">
          <div aria-hidden className="absolute inset-0 -z-20 tri-mesh opacity-60" />
          <div aria-hidden className="absolute inset-0 -z-30 tri-hex-grid opacity-45" />
          <div aria-hidden className="tri-blob -z-10 h-80 w-80" style={{ right: "10%", top: "10%", background: "radial-gradient(circle, rgba(255, 255, 255,0.18), transparent 70%)" }} />

          <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12">
            <div className="mb-4 flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-[#050817]/90 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-white">
                Trijotech Insights
              </span>
              {preview && <span className="rounded-full bg-white px-3 py-1 text-xs font-bold uppercase text-slate-950">Draft preview</span>}
            </div>
            <h1 className="max-w-4xl text-2xl font-bold leading-[1.2] tracking-tight text-white sm:text-4xl lg:text-5xl">{post.title}</h1>
            <p className="mt-5 max-w-3xl text-base sm:text-lg leading-[1.7] text-white/80">{post.shortDescription}</p>
            <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-medium text-slate-400">
              <span>{post.author}</span>
              <span>•</span>
              <span>{post.category}</span>
              <span>•</span>
              <span>{date}</span>
            </div>
          </div>
        </header>

        {/* Full-width Content Body */}
        <div className="w-full bg-white py-12 sm:py-16 border-b border-slate-200">
          <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12">
            {post.featuredImage && (
              <figure className="my-5 flex w-full flex-col items-center justify-center text-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="mx-auto block h-[260px] sm:h-[340px] md:h-[380px] w-auto max-w-full rounded-lg object-contain bg-white"
                  src={post.featuredImage}
                  alt={post.imageAlt}
                  loading="lazy"
                />
              </figure>
            )}

            <div className="w-full text-slate-900 [&_a]:text-[#087b71] [&_a]:underline [&_a]:font-medium [&_h1]:my-5 [&_h1]:mt-10 [&_h1]:text-2xl sm:[&_h1]:text-3xl [&_h1]:font-bold [&_h1]:leading-snug [&_h1]:text-black [&_h2]:my-5 [&_h2]:mt-10 [&_h2]:text-xl sm:[&_h2]:text-2xl [&_h2]:font-bold [&_h2]:leading-snug [&_h2]:text-black [&_h3]:mb-3 [&_h3]:mt-8 [&_h3]:text-lg sm:[&_h3]:text-xl [&_h3]:font-bold [&_h3]:leading-snug [&_h3]:text-black [&_h4]:my-3 [&_h4]:text-base sm:[&_h4]:text-lg [&_h4]:font-bold [&_h4]:text-black [&_li]:my-2 [&_li]:pl-1.5 [&_li]:leading-relaxed [&_li]:text-slate-800 [&_ol]:mb-6 [&_ol]:mt-2 [&_ol]:pl-6 [&_p]:mb-5 [&_p]:text-left [&_p]:text-sm sm:[&_p]:text-base [&_p]:leading-[1.8] [&_p]:text-slate-800 [&_ul]:mb-6 [&_ul]:mt-2 [&_ul]:pl-6">
              {post.contentBlocks?.length ? post.contentBlocks.map((block) => {
                const headingLevel = Math.min(6, Math.max(1, block.headingLevel || (block.type === "heading" ? 2 : 3))) as 1 | 2 | 3 | 4 | 5 | 6;
                const blockStyle = resolveBlockStyle(block.style, block.type, headingLevel);
                if (block.type === "heading" || block.type === "subheading") return createElement(`h${headingLevel}`, { key: block.id, style: blockStyle, dangerouslySetInnerHTML: { __html: block.value } });
                if (block.type === "content") return /<[^>]+>/.test(block.value) ? <div key={block.id} style={blockStyle} dangerouslySetInnerHTML={{ __html: block.value }} /> : <p key={block.id} style={blockStyle}>{block.value}</p>;
                if (block.type === "quote") return /<[^>]+>/.test(block.value) ? <blockquote className="my-8 rounded-2xl border-l-4 border-white bg-white/[0.03] px-6 py-5 text-base sm:text-lg italic leading-relaxed text-slate-300" key={block.id} style={blockStyle} dangerouslySetInnerHTML={{ __html: block.value }} /> : <blockquote className="my-8 rounded-2xl border-l-4 border-white bg-white/[0.03] px-6 py-5 text-base sm:text-lg italic leading-relaxed text-slate-300" key={block.id} style={blockStyle}>{block.value}</blockquote>;
                if (block.type === "bulletList") return <ul key={block.id} style={blockStyle}>{block.value.split(/\r?\n/).filter(Boolean).map((item, index) => <li key={`${block.id}-${index}`}>{item}</li>)}</ul>;
                if (block.type === "numberedList") return <ol key={block.id} style={blockStyle}>{block.value.split(/\r?\n/).filter(Boolean).map((item, index) => <li key={`${block.id}-${index}`}>{item}</li>)}</ol>;
                if (block.type === "callout") return /<[^>]+>/.test(block.value) ? <aside className="my-7 rounded-2xl border border-white/30 bg-white/10 px-6 py-5 leading-relaxed text-slate-200" key={block.id} style={blockStyle} dangerouslySetInnerHTML={{ __html: block.value }} /> : <aside className="my-7 rounded-2xl border border-white/30 bg-white/10 px-6 py-5 leading-relaxed text-slate-200" key={block.id} style={blockStyle}>{block.value}</aside>;
                if (block.type === "divider") return <hr className="my-8 w-full border-0 border-t border-white/10" key={block.id} style={{ marginTop: blockStyle.marginTop, marginBottom: blockStyle.marginBottom }} />;
                if (block.type === "link") return <p className="managed-blog-link-block" key={block.id} style={blockStyle}><a href={block.linkUrl}>{block.value}</a></p>;
                
                return (
                  <figure className="my-5 w-full text-center" key={block.id}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      className="mx-auto block h-[260px] sm:h-[340px] md:h-[380px] w-auto max-w-full rounded-lg object-contain bg-[#f1f5f9]"
                      src={block.imageSrc}
                      alt={block.imageAlt || "Blog illustration"}
                      loading="lazy"
                    />
                    {block.caption && <figcaption className="mt-2 text-center text-xs font-medium text-slate-400">{block.caption}</figcaption>}
                  </figure>
                );
              }) : contentParts.map((part, index) => {
                if (index % 2 === 0) return part ? <div key={`content-${index}`} dangerouslySetInnerHTML={{ __html: part }} /> : null;
                const image = post.contentImages.find((candidate) => candidate.id === part);
                if (!image) return null;
                return (
                  <figure className="my-5 w-full text-center" key={`${image.id}-${index}`}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      className="mx-auto block h-[260px] sm:h-[340px] md:h-[380px] w-auto max-w-full rounded-lg object-contain bg-[#f1f5f9]"
                      src={image.src}
                      alt={image.alt || "Blog illustration"}
                      loading="lazy"
                    />
                    {image.caption && <figcaption className="mt-2 text-center text-xs font-medium text-slate-400">{image.caption}</figcaption>}
                  </figure>
                );
              })}
            </div>

            {post.tags.length > 0 && (
              <div className="mt-10 flex flex-wrap gap-2 border-t border-white/10 pt-6" aria-label="Blog tags">
                {post.tags.map((tag) => (
                  <span className="rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-slate-300" key={tag}>{tag}</span>
                ))}
              </div>
            )}
          </div>
        </div>
      </article>
      <LatestBlogsCarousel />
      <ContactCta />
    </main>
  );
}
