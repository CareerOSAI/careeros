/**
 * services/jobs/search/searchEngine.ts
 *
 * Search Engine central — verifică cache-ul, apelează toți
 * providerii activi în paralel (Promise.all) dacă e nevoie, combină
 * rezultatele, elimină duplicatele și le sortează.
 */

import type { SearchedJob } from "@/types/jobSearch";
import { getEnabledProviders } from "@/services/jobs/providers";
import { deduplicateJobs } from "@/services/jobs/duplicates";
import { getCachedResults, setCachedResults } from "@/services/jobs/cache";

export interface JobSearchResult {
  jobs: SearchedJob[];
  sourcesQueried: string[];
  sourcesFailed: string[];
  fromCache: boolean;
}

export async function searchJobs(query: string, maxResults = 60): Promise<JobSearchResult> {
  const cached = getCachedResults(query);

  if (cached) {
    return {
      jobs: cached.slice(0, maxResults),
      sourcesQueried: [],
      sourcesFailed: [],
      fromCache: true,
    };
  }

  const providers = getEnabledProviders();

  const results = await Promise.all(
    providers.map(async (provider) => {
      try {
        const jobs = await provider.search(query);
        return { id: provider.id, jobs, success: true as const };
      } catch (error) {
        console.error(`Provider "${provider.id}" failed:`, error);
        return { id: provider.id, jobs: [] as SearchedJob[], success: false as const };
      }
    })
  );

  const combined = results.flatMap((r) => r.jobs);
  const deduplicated = deduplicateJobs(combined);

  const sorted = deduplicated.sort((a, b) => {
    if (!a.postedAt) return 1;
    if (!b.postedAt) return -1;
    return new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime();
  });

  setCachedResults(query, sorted);

  return {
    jobs: sorted.slice(0, maxResults),
    sourcesQueried: results.map((r) => r.id),
    sourcesFailed: results.filter((r) => !r.success).map((r) => r.id),
    fromCache: false,
  };
}