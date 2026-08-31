import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SESSION_COOKIE, verifyAdminSession } from "@/app/lib/admin-auth";
import AdminUsersWorkspace from "./AdminUsersWorkspace";
export const dynamic = "force-dynamic";
export default async function AdminUsersPage() {
  const user = await verifyAdminSession((await cookies()).get(SESSION_COOKIE)?.value);
  if (!user) redirect("/admin/login");
  if (user.role !== "SUPER_ADMIN") redirect("/admin");
  return <AdminUsersWorkspace />;
}