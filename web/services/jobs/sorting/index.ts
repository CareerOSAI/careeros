/**
 * services/jobs/sorting/index.ts
 *
 * Sortare a rezultatelor de search (SearchedJob). Extrage logica
 * de sortare "newest"/"oldest" din app/(app)/job-search/page.tsx
 * (filteredJobs useMemo) și din searchEngine.ts, plus adaugă opțiuni
 * noi (salary, best match) pentru extindere ulterioară.
 *
 * IMPORTANT: JobSearchPage.tsx și searchEngine.ts NU trebuie
 * modificate să folosească asta imediat — logica lor inline rămâne
 * validă. Acest fișier devine sursa de adevăr pentru orice
 * utilizare NOUĂ a sortării.
 */

import type { SearchedJob } from "@/types/jobSearch";
import { applyRankingWithScores, type RankingContext } from "@/services/jobs/ranking";

export type JobSortOption = "newest" | "oldest" | "salary-desc" | "salary-asc" | "best-match";

/**
 * Sortează după data publicării, cele mai recente primele.
 * Joburile fără dată sunt împinse la final.
 * Extras identic din JobSearchPage.tsx / searchEngine.ts.
 */
function sortByDate(jobs: SearchedJob[], direction: "newest" | "oldest"): SearchedJob[] {
  return [...jobs].sort((a, b) => {
    if (!a.postedAt) return 1;
    if (!b.postedAt) return -1;
    const diff = new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime();
    return direction === "newest" ? diff : -diff;
  });
}

/**
 * Sortează după salariu (folosind valoarea maximă, apoi minimă ca
 * fallback). Joburile fără salariu populat sunt împinse la final.
 */
function sortBySalary(jobs: SearchedJob[], direction: "desc" | "asc"): SearchedJob[] {
  const getValue = (job: SearchedJob) => job.salary?.max ?? job.salary?.min ?? null;

  return [...jobs].sort((a, b) => {
    const aValue = getValue(a);
    const bValue = getValue(b);

    if (aValue === null && bValue === null) return 0;
    if (aValue === null) return 1;
    if (bValue === null) return -1;

    return direction === "desc" ? bValue - aValue : aValue - bValue;
  });
}

/**
 * Sortează după scorul de ranking (Best Match), folosind
 * services/jobs/ranking. Cel mai bun scor primul.
 */
function sortByBestMatch(jobs: SearchedJob[], context?: Partial<RankingContext>): SearchedJob[] {
  return applyRankingWithScores(jobs, context).map((entry) => entry.job);
}

/**
 * Punctul unic de sortare — dispatch pe baza opțiunii alese.
 * Folosit de orice ecran care afișează SearchedJob și oferă
 * control de sortare userului.
 */
export function sortJobs(
  jobs: SearchedJob[],
  sortBy: JobSortOption,
  rankingContext?: Partial<RankingContext>
): SearchedJob[] {
  switch (sortBy) {
    case "newest":
      return sortByDate(jobs, "newest");
    case "oldest":
      return sortByDate(jobs, "oldest");
    case "salary-desc":
      return sortBySalary(jobs, "desc");
    case "salary-asc":
      return sortBySalary(jobs, "asc");
    case "best-match":
      return sortByBestMatch(jobs, rankingContext);
    default:
      return jobs;
  }
}