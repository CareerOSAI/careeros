/**
 * utils/ranking.ts
 *
 * Calculul scorului de ranking pentru SearchedJob (rezultate din
 * search multi-provider) — NU are legătură cu sortjobs.ts
 * (care sortează Job-urile din Job Tracker).
 *
 * Scorul e calculat pe baza:
 * - remote (workType)
 * - salariu (normalizat anual)
 * - data publicării (freshness)
 * - AI Match Score (dacă a fost deja calculat, opțional)
 * - companii favorite
 * - prioritate manuală
 */

import type { SearchedJob, WorkType } from "@/types/jobSearch";
import type { FavoriteCompany } from "@/types/company";
import { daysSince } from "./date";
import { normalizeToAnnual } from "./salary";

const WEIGHTS = {
  remote: 20,
  salary: 25,
  freshness: 15,
  aiMatch: 25,
  favoriteCompany: 10,
  priority: 5,
} as const;

export interface RankingScore {
  total: number;
  remoteScore: number;
  salaryScore: number;
  freshnessScore: number;
  aiMatchScore: number;
  favoriteCompanyScore: number;
  priorityScore: number;
}

function calculateRemoteScore(workType: WorkType): number {
  switch (workType) {
    case "Remote":
      return 100;
    case "Hybrid":
      return 60;
    case "On-site":
      return 30;
    default:
      return 40;
  }
}

function calculateSalaryScore(
  salary: SearchedJob["salary"],
  referenceAnnualSalary: number
): number {
  if (!salary) return 50;

  const normalized = normalizeToAnnual(salary);
  const value = normalized.maxAnnual ?? normalized.minAnnual;

  if (value === null || referenceAnnualSalary <= 0) return 50;

  const ratio = value / referenceAnnualSalary;
  return Math.max(0, Math.min(100, Math.round(ratio * 100)));
}

function calculateFreshnessScore(postedAt: string | null): number {
  if (!postedAt) return 30; // fără dată -> scor neutru-scăzut
  const days = daysSince(postedAt);
  const maxDays = 60;

  if (days >= maxDays) return 0;
  return Math.round(((maxDays - days) / maxDays) * 100);
}

function calculateFavoriteCompanyScore(
  companyName: string,
  favoriteCompanies: FavoriteCompany[]
): number {
  const isFavorite = favoriteCompanies.some(
    (fav) => fav.companyName.toLowerCase() === companyName.toLowerCase()
  );
  return isFavorite ? 100 : 0;
}

export interface RankingContext {
  referenceAnnualSalary: number;
  favoriteCompanies: FavoriteCompany[];
  aiMatchScore?: number;
  manualPriorityScore?: number;
}

/**
 * Calculează scorul de ranking pentru un SearchedJob.
 * Funcție pură — nu modifică jobul, doar întoarce scorul.
 */
export function calculateRankingScore(
  job: SearchedJob,
  context: RankingContext
): RankingScore {
  const remoteScore = calculateRemoteScore(job.workType);
  const salaryScore = calculateSalaryScore(job.salary, context.referenceAnnualSalary);
  const freshnessScore = calculateFreshnessScore(job.postedAt);
  const aiMatchScore = context.aiMatchScore ?? 50;
  const favoriteCompanyScore = calculateFavoriteCompanyScore(
    job.company,
    context.favoriteCompanies
  );
  const priorityScore = context.manualPriorityScore ?? 0;

  const total = Math.round(
    (remoteScore * WEIGHTS.remote +
      salaryScore * WEIGHTS.salary +
      freshnessScore * WEIGHTS.freshness +
      aiMatchScore * WEIGHTS.aiMatch +
      favoriteCompanyScore * WEIGHTS.favoriteCompany +
      priorityScore * WEIGHTS.priority) /
      100
  );

  return { total, remoteScore, salaryScore, freshnessScore, aiMatchScore, favoriteCompanyScore, priorityScore };
}

/**
 * Aplică ranking-ul pe o listă de joburi și întoarce perechi
 * { job, score }, sortate descrescător după scor total.
 * Folosit de services/jobs/ranking/ ca ultim pas înainte de UI.
 */
export function rankJobs(
  jobs: SearchedJob[],
  context: RankingContext
): { job: SearchedJob; score: RankingScore }[] {
  return jobs
    .map((job) => ({ job, score: calculateRankingScore(job, context) }))
    .sort((a, b) => b.score.total - a.score.total);
}