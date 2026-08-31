import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SESSION_COOKIE, verifyAdminSession } from "@/app/lib/admin-auth";
import AdminLogin from "./AdminLogin";

export default async function LoginPage() {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  const user = await verifyAdminSession(token);
  if (user) redirect("/admin");
  return <AdminLogin />;
}
