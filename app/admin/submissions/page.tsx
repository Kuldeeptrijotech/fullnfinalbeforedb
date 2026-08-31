import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SESSION_COOKIE, verifySessionToken } from "@/app/lib/admin-auth";
import SubmissionsWorkspace from "./SubmissionsWorkspace";

export const dynamic = "force-dynamic";

export default async function SubmissionsPage() {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!verifySessionToken(token)) redirect("/admin/login");

  return <SubmissionsWorkspace />;
}
