import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SESSION_COOKIE, verifyAdminSession } from "@/app/lib/admin-auth";
import SubmissionsWorkspace from "./SubmissionsWorkspace";

export const dynamic = "force-dynamic";

export default async function SubmissionsPage() {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  const user = await verifyAdminSession(token);
  if (!user) redirect("/admin/login");

  return <SubmissionsWorkspace />;
}
