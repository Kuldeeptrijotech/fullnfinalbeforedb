import Link from "next/link";
import type { Blog } from "@/lib/types/blog.types";

type BlogCardProps = { blog: Blog; variant?: "listing" | "carousel" };

export default function BlogCard({ blog, variant = "listing" }: BlogCardProps) {
  if (variant === "carousel") {
    return (
      <article className="flex min-h-[450px] w-[clamp(280px,29vw,370px)] shrink-0 basis-[clamp(280px,29vw,370px)] flex-col overflow-hidden rounded-3xl border border-white/12 bg-[#1a2336]/90 shadow-2xl backdrop-blur-md sm:min-h-[470px] max-[640px]:w-[82vw] max-[640px]:basis-[82vw] transition-all hover:border-white/50">
        <Link href={blog.link} className="block h-[210px] min-h-[210px] w-full overflow-hidden bg-[#121927] max-[640px]:h-[190px] max-[640px]:min-h-[190px]">
          <img src={blog.image} alt={blog.title} loading="lazy" className="h-full w-full object-fill opacity-100 [filter:none] [transform:none]" />
        </Link>
        <div className="flex min-h-0 flex-1 flex-col bg-transparent p-5">
          <span className="text-[13px] font-bold text-white">{blog.date}</span>
          <h3 className="my-[9px] line-clamp-2 min-h-[53px] max-h-[53px] overflow-hidden text-[18px] font-bold leading-[1.45] text-white">
            <Link href={blog.link} className="text-white hover:text-white transition-colors">{blog.title}</Link>
          </h3>
          <p className="mb-[14px] line-clamp-3 max-h-[67px] overflow-hidden text-[14px] leading-[1.6] text-slate-300">{blog.description}</p>
          <Link href={blog.link} className="mt-auto text-[14px] font-bold text-cyan-200 hover:text-cyan-100 transition-colors">Read article →</Link>
        </div>
      </article>
    );
  }

  const cropVerticalWhitespace = blog.title === "SAP S/4HANA Group Reporting : Overview";
  return (
    <article className="flex min-h-[460px] w-full flex-col overflow-hidden rounded-3xl border border-white/12 bg-[#1a2336]/90 p-0 shadow-2xl backdrop-blur-md transition-all hover:border-white/50">
      <Link href={blog.link} className="m-0 h-[220px] overflow-hidden bg-[#121927]" aria-label={`Read blog: ${blog.title}`}>
        <img loading="lazy" src={blog.image} alt={blog.title} className={`m-0 h-full w-full object-fill p-0 opacity-100 [filter:none] ${cropVerticalWhitespace ? "scale-y-[1.12]" : "[transform:none]"}`} />
      </Link>
      <div className="flex min-h-[238px] flex-1 flex-col p-5">
        <div className="text-white text-xs font-bold uppercase"><span>{blog.date}</span></div>
        <h4 className="text-[18px] font-bold leading-[1.4] text-white mt-2">{blog.title}</h4>
        <p className="line-clamp-3 min-h-[4.8em] max-h-[4.8em] text-[14px] leading-[1.6] text-slate-300 mt-2">{blog.description}</p>
        <Link href={blog.link} className="mt-auto inline-flex w-fit items-center gap-1 text-sm font-bold text-cyan-200 hover:text-cyan-100 transition-colors">Read More →</Link>
      </div>
    </article>
  );
}
