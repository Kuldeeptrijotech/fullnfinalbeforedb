import { NextResponse } from "next/server";
import { getSiteNavigationData } from "@/lib/services/navigation.service";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const data = await getSiteNavigationData();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in navigation API:", error);
    return NextResponse.json({ error: "Failed to fetch navigation data" }, { status: 500 });
  }
}
