import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SESSION_COOKIE, verifyAdminSession } from "@/app/lib/admin-auth";
import { readBlogPosts } from "@/app/lib/blog-store";
import CreateBlogWorkspace from "./CreateBlogWorkspace";

export default async function CreateBlogPage() {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  const user = await verifyAdminSession(token);
  if (!user) redirect("/admin/login");
  return <CreateBlogWorkspace initialPosts={await readBlogPosts()} />;
}
