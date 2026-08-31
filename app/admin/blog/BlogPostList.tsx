import type { BlogPost } from "@/lib/types/blog.types";

export default function BlogPostList({ posts, query, onQueryChange, onSelect }: { posts: BlogPost[]; query: string; onQueryChange: (value: string) => void; onSelect: (post: BlogPost) => void }) {
  return <aside className="admin-blog-list"><div className="admin-blog-list-heading"><span>Blog library</span><strong>{posts.length}</strong></div><label htmlFor="blog-search">Search blogs</label><input id="blog-search" type="search" value={query} onChange={(event) => onQueryChange(event.target.value)} placeholder="Title, category, status…" /><div className="admin-blog-list-scroll">{posts.map((post) => <button type="button" key={post.id} onClick={() => onSelect(post)}><span>{post.title}</span><small><i className={post.status} />{post.status}<b>{post.category || "Uncategorized"}</b></small></button>)}</div></aside>;
}
