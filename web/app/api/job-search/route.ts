import { NextRequest, NextResponse } from "next/server";
import { searchJobs } from "@/services/jobs/search/searchEngine";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q") ?? "";

    const result = await searchJobs(query);

    return NextResponse.json({ jobs: result.jobs });
  } catch (error) {
    console.error("Job search error:", error);
    return NextResponse.json({ error: "Failed to fetch jobs." }, { status: 500 });
  }
}