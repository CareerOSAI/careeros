/**
 * services/jobs/ranking/index.ts
 *
 * Punctul de intrare pentru Ranking Engine în pipeline-ul de search.
 * Reutilizează logica pură din utils/ranking.ts (remote, salariu,
 * freshness, AI match, companii favorite, prioritate).
 *
 * Ranking-ul e opțional și separat de sortarea implicită după dată
 * (care rămâne default în searchEngine.ts) — se aplică doar când
 * userul alege explicit "Best Match" sau echivalent în UI.
 */

import type { SearchedJob } from "@/types/jobSearch";
import type { FavoriteCompany } from "@/types/company";
import { rankJobs, type RankingContext, type RankingScore } from "@/utils/ranking";

export type { RankingContext, RankingScore };

/**
 * Valoare de referință implicită pentru salariu anual, folosită
 * când nu avem încă un target salarial specific al userului
 * (ex: din CareerProfile). Aproximare rezonabilă pentru piața de
 * dezvoltare software în Europa.
 *
 * TODO: înlocuit cu o valoare reală, calculată din CareerProfile /
 * SalaryAnalyzer, odată ce acele module sunt implementate.
 */
const DEFAULT_REFERENCE_ANNUAL_SALARY = 60000;

/**
 * Aplică ranking-ul pe o listă de joburi și întoarce lista sortată
 * după scorul total (cel mai bun match primul).
 *
 * Dacă nu se oferă context explicit, folosește valori neutre
 * (fără companii favorite, salariu de referință implicit) — util
 * pentru un ranking "generic", fără personalizare.
 */
export function applyRanking(
  jobs: SearchedJob[],
  overrides?: Partial<RankingContext>
): SearchedJob[] {
  const context: RankingContext = {
    referenceAnnualSalary: overrides?.referenceAnnualSalary ?? DEFAULT_REFERENCE_ANNUAL_SALARY,
    favoriteCompanies: overrides?.favoriteCompanies ?? [],
    aiMatchScore: overrides?.aiMatchScore,
    manualPriorityScore: overrides?.manualPriorityScore,
  };

  return rankJobs(jobs, context).map((entry) => entry.job);
}

/**
 * Variantă care întoarce și scorurile calculate (util pentru UI-uri
 * care vor să afișeze "de ce" un job e recomandat — ex: JobAIInsights).
 */
export function applyRankingWithScores(
  jobs: SearchedJob[],
  overrides?: Partial<RankingContext>
): { job: SearchedJob; score: RankingScore }[] {
  const context: RankingContext = {
    referenceAnnualSalary: overrides?.referenceAnnualSalary ?? DEFAULT_REFERENCE_ANNUAL_SALARY,
    favoriteCompanies: overrides?.favoriteCompanies ?? [],
    aiMatchScore: overrides?.aiMatchScore,
    manualPriorityScore: overrides?.manualPriorityScore,
  };

  return rankJobs(jobs, context);
}