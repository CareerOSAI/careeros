/**
 * utils/duplicates.ts
 *
 * Detectare joburi duplicate cross-provider, comparând:
 * companie + titlu + locație + salariu.
 *
 * Lucrează cu SearchedJob (types/jobSearch.ts) — rezultate din
 * Job Search, NU Job Tracker.
 */

import type { SearchedJob } from "@/types/jobSearch";
import { normalizeForComparison } from "./strings";

function buildDuplicateKey(job: SearchedJob): string {
  const company = normalizeForComparison(job.company);
  const title = normalizeForComparison(job.title);
  const location = normalizeForComparison(job.location ?? "");

  return `${company}|${title}|${location}`;
}

function hasSimilarSalary(a: SearchedJob, b: SearchedJob): boolean {
  const aMin = a.salary?.min ?? null;
  const aMax = a.salary?.max ?? null;
  const bMin = b.salary?.min ?? null;
  const bMax = b.salary?.max ?? null;

  const aHasSalary = aMin !== null || aMax !== null;
  const bHasSalary = bMin !== null || bMax !== null;

  if (!aHasSalary || !bHasSalary) return true; // lipsă date -> nu descalifică

  const aValue = aMin ?? aMax ?? 0;
  const bValue = bMin ?? bMax ?? 0;

  if (aValue === 0 || bValue === 0) return true;

  const diffPercent = Math.abs(aValue - bValue) / Math.max(aValue, bValue);
  return diffPercent <= 0.1; // toleranță 10%
}

export function areJobsDuplicate(a: SearchedJob, b: SearchedJob): boolean {
  if (a.id === b.id) return false;

  const sameKey = buildDuplicateKey(a) === buildDuplicateKey(b);
  if (!sameKey) return false;

  return hasSimilarSalary(a, b);
}

export function markDuplicateJobs(jobs: SearchedJob[]): SearchedJob[] {
  const seenByKey = new Map<string, SearchedJob>();

  return jobs.map((job) => {
    const key = buildDuplicateKey(job);
    const existing = seenByKey.get(key);

    if (!existing) {
      seenByKey.set(key, job);
      return { ...job, isDuplicate: false, duplicateOf: undefined };
    }

    if (hasSimilarSalary(existing, job)) {
      return { ...job, isDuplicate: true, duplicateOf: existing.id };
    }

    seenByKey.set(`${key}|${job.id}`, job);
    return { ...job, isDuplicate: false, duplicateOf: undefined };
  });
}

export function removeDuplicateJobs(jobs: SearchedJob[]): SearchedJob[] {
  return markDuplicateJobs(jobs).filter((job) => !job.isDuplicate);
}