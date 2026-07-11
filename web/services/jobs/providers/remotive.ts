/**
 * services/jobs/providers/remotive.ts
 *
 * Provider pentru Remotive (https://remotive.com).
 * Extras identic din app/api/job-search/route.ts (fetchRemotive),
 * fără nicio modificare de comportament — doar reorganizat ca
 * provider standalone, conform arhitecturii (provider nou = 1 fișier).
 */

import type { SearchedJob } from "@/types/jobSearch";
import { detectWorkType } from "@/services/jobs/normalizers/workType";
import { detectExperienceLevel } from "@/services/jobs/normalizers/experienceLevel";
import { detectCountry } from "@/services/jobs/normalizers/country";

/**
 * Caută joburi pe Remotive, pentru query-ul dat.
 * Toate joburile Remotive sunt remote by design (remote=true fix).
 */
export async function fetchRemotive(query: string): Promise<SearchedJob[]> {
  const url = new URL("https://remotive.com/api/remote-jobs");
  if (query) url.searchParams.set("search", query);

  const res = await fetch(url.toString());
  if (!res.ok) return [];

  const data = await res.json();

  return (data.jobs ?? []).map((job: any): SearchedJob => {
    const location = job.candidate_required_location || "Remote";
    const description = job.description ?? "";

    return {
      id: `remotive-${job.id}`,
      source: "remotive",
      title: job.title,
      company: job.company_name,
      location,
      country: detectCountry(location, true),
      workType: detectWorkType(location, description, true),
      experienceLevel: detectExperienceLevel(job.title, description),
      url: job.url,
      description,
      tags: job.tags ?? [],
      postedAt: job.publication_date ?? null,
    };
  });
}