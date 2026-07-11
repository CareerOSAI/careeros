/**
 * services/jobs/filters/index.ts
 *
 * Filtrare a rezultatelor de search după workType, country și
 * experienceLevel. Extrage exact logica din
 * app/(app)/job-search/page.tsx (filteredJobs useMemo), fără nicio
 * modificare de comportament — doar mutată aici pentru reutilizare
 * (ex: dacă apare nevoia de filtrare server-side, sau alt ecran
 * care afișează SearchedJob).
 *
 * IMPORTANT: JobSearchPage.tsx NU trebuie modificat neapărat să
 * folosească asta imediat — funcția existentă acolo rămâne validă.
 * Acest fișier devine sursa de adevăr pentru orice utilizare NOUĂ
 * a filtrării (ex: Search Engine server-side, alte pagini).
 */

import type { SearchedJob, WorkType, ExperienceLevel } from "@/types/jobSearch";

export interface JobFilterCriteria {
  workType?: WorkType | "All";
  country?: string | "All";
  experienceLevel?: ExperienceLevel | "All";
  /** Filtrare după tehnologii/tag-uri, dacă e nevoie ulterior */
  technologies?: string[];
  /** Prag minim de salariu anual, dacă SearchedJob.salary e populat */
  salaryMin?: number;
}

/**
 * Aplică toate criteriile de filtrare peste o listă de joburi.
 * Un criteriu absent sau "All" nu restrânge rezultatele.
 */
export function filterJobs(jobs: SearchedJob[], criteria: JobFilterCriteria): SearchedJob[] {
  return jobs.filter((job) => {
    const matchesWorkType =
      !criteria.workType || criteria.workType === "All" || job.workType === criteria.workType;

    const matchesCountry =
      !criteria.country || criteria.country === "All" || job.country === criteria.country;

    const matchesLevel =
      !criteria.experienceLevel ||
      criteria.experienceLevel === "All" ||
      job.experienceLevel === criteria.experienceLevel;

    const matchesTechnologies =
      !criteria.technologies ||
      criteria.technologies.length === 0 ||
      criteria.technologies.some((tech) =>
        job.tags.some((tag) => tag.toLowerCase() === tech.toLowerCase())
      );

    const matchesSalary =
      criteria.salaryMin === undefined ||
      (job.salary?.max ?? job.salary?.min ?? null) !== null &&
        (job.salary!.max ?? job.salary!.min ?? 0) >= criteria.salaryMin;

    return (
      matchesWorkType &&
      matchesCountry &&
      matchesLevel &&
      matchesTechnologies &&
      matchesSalary
    );
  });
}

/**
 * Extrage lista de țări unice dintr-o listă de joburi, sortate
 * alfabetic — folosit pentru a popula dropdown-ul de filtru
 * "Country" (exact logica din JobSearchPage.tsx: uniqueCountries).
 */
export function extractUniqueCountries(jobs: SearchedJob[]): string[] {
  const set = new Set(jobs.map((j) => j.country));
  return Array.from(set).sort();
}

/**
 * Numără câte filtre sunt active (diferite de "All"/undefined) —
 * folosit pentru badge-ul cu numărul de filtre active în UI
 * (exact logica din JobSearchPage.tsx: activeFilterCount).
 */
export function countActiveFilters(criteria: JobFilterCriteria): number {
  return [
    criteria.workType && criteria.workType !== "All",
    criteria.country && criteria.country !== "All",
    criteria.experienceLevel && criteria.experienceLevel !== "All",
  ].filter(Boolean).length;
}