/**
 * services/jobs/providers/arbeitnow.ts
 *
 * Provider pentru Arbeitnow (https://www.arbeitnow.com).
 * Extras identic din app/api/job-search/route.ts (fetchArbeitnow),
 * fără nicio modificare de comportament — doar reorganizat ca
 * provider standalone, conform arhitecturii (provider nou = 1 fișier).
 */

import type { SearchedJob } from "@/types/jobSearch";
import { detectWorkType } from "@/services/jobs/normalizers/workType";
import { detectExperienceLevel } from "@/services/jobs/normalizers/experienceLevel";
import { detectCountry, isRomaniaOrRemote } from "@/services/jobs/normalizers/country";

/**
 * Caută joburi pe Arbeitnow, filtrate deja pentru Romania/Remote
 * și pentru query-ul dat (exact ca în implementarea originală).
 */
export async function fetchArbeitnow(query: string): Promise<SearchedJob[]> {
  const res = await fetch("https://www.arbeitnow.com/api/job-board-api");
  if (!res.ok) return [];

  const data = await res.json();

  return (data.data ?? [])
    .map((job: any): SearchedJob => {
      const location = job.location || (job.remote ? "Remote" : "Unknown");
      const description = job.description ?? "";

      return {
        id: `arbeitnow-${job.slug}`,
        source: "arbeitnow",
        title: job.title,
        company: job.company_name,
        location,
        country: detectCountry(location, Boolean(job.remote)),
        workType: detectWorkType(location, description, Boolean(job.remote)),
        experienceLevel: detectExperienceLevel(job.title, description),
        url: job.url,
        description,
        tags: job.tags ?? [],
        postedAt: job.created_at ? new Date(job.created_at * 1000).toISOString() : null,
      };
    })
    .filter((job: SearchedJob) => isRomaniaOrRemote(job.location, job.workType === "Remote"))
    .filter((job: SearchedJob) => {
      if (!query) return true;
      const haystack = `${job.title} ${job.tags.join(" ")} ${job.location}`.toLowerCase();
      return haystack.includes(query.toLowerCase());
    });
}