/**
 * services/jobs/duplicates/index.ts
 *
 * Punctul de intrare pentru Duplicate Detection în pipeline-ul de
 * search. Reutilizează logica pură din utils/duplicates.ts
 * (companie + titlu + locație + salariu).
 *
 * Folosit de services/jobs/search/searchEngine.ts, ca pas după
 * combinarea rezultatelor din toți providerii, înainte de sortare.
 */

import type { SearchedJob } from "@/types/jobSearch";
import { removeDuplicateJobs, markDuplicateJobs } from "@/utils/duplicates";

/**
 * Elimină duplicatele dintr-o listă combinată de joburi (din mai
 * mulți provideri), păstrând un singur exemplar per job unic.
 */
export function deduplicateJobs(jobs: SearchedJob[]): SearchedJob[] {
  return removeDuplicateJobs(jobs);
}

/**
 * Variantă care NU elimină duplicatele, doar le marchează
 * (isDuplicate / duplicateOf). Util dacă la un moment dat UI-ul
 * vrea să afișeze "3 provideri au acest job" în loc să-l ascundă.
 */
export function markDuplicates(jobs: SearchedJob[]): SearchedJob[] {
  return markDuplicateJobs(jobs);
}