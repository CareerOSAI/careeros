/**
 * services/ai/weekly-report.ts
 *
 * Generează un raport săptămânal narativ (rezumat + recomandări),
 * combinând metrici din Job Tracker (utils/jobStats.ts) și Roadmap,
 * folosind AI pentru partea narativă.
 *
 * NU implementează logica de business încă — doar fundația.
 * Fără UI aici.
 *
 * Folosit de: components/ai/WeeklyReportCard, hooks (viitor).
 */

import type { Job } from "@/types/job";
import type {
  WeeklyReportInput,
  WeeklyReportResult,
  WeeklyReportMetrics,
} from "@/types/career";
import { getJobStats } from "@/utils/jobStats";
import { getCurrentWeekRange } from "@/utils/date";

export type { WeeklyReportInput, WeeklyReportResult, WeeklyReportMetrics };

/**
 * Construiește WeeklyReportMetrics pe baza joburilor din Job Tracker
 * și a progresului din Roadmap (partea determinstă, fără AI).
 *
 * Notă: getJobStats (utils/jobStats.ts) întoarce statistici pe
 * TOATE joburile din tracker, nu doar pe cele din săptămâna curentă
 * — filtrarea pe interval de dată rămâne TODO, momentan raportul
 * reflectă starea curentă agregată, nu strict delta săptămânii.
 *
 * TODO: filtrare joburi după createdAt/updatedAt în intervalul
 * [weekStart, weekEnd] pentru un raport strict "această săptămână".
 */
export function buildWeeklyMetrics(
  jobs: Job[],
  roadmapItemsCompletedThisWeek: number,
  averageMatchScore: number | null = null
): WeeklyReportMetrics {
  const stats = getJobStats(jobs);

  return {
    jobsDiscovered: stats.total,
    jobsApplied: stats.applied,
    jobsInterviewing: stats.interview,
    jobsRejected: stats.rejected,
    roadmapItemsCompleted: roadmapItemsCompletedThisWeek,
    averageMatchScore,
  };
}

/**
 * Construiește input-ul complet pentru generarea raportului,
 * folosind intervalul săptămânii curente (utils/date.ts).
 */
export function buildWeeklyReportInput(
  userId: string,
  metrics: WeeklyReportMetrics
): WeeklyReportInput {
  const { weekStart, weekEnd } = getCurrentWeekRange();

  return { userId, weekStart, weekEnd, metrics };
}

/**
 * Generează raportul săptămânal complet — rezumat narativ +
 * recomandări pentru săptămâna următoare, pe baza metricilor.
 *
 * TODO: implementare reală — apel AI care primește
 * WeeklyReportMetrics și generează un rezumat coerent + highlights
 * + recomandări concrete.
 */
export async function generateWeeklyReport(
  input: WeeklyReportInput
): Promise<WeeklyReportResult> {
  throw new Error("Not implemented: generateWeeklyReport (services/ai/weekly-report.ts)");
}