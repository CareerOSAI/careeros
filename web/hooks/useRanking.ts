"use client";

/**
 * hooks/useRanking.ts
 *
 * Hook pentru aplicarea Ranking Engine (services/jobs/ranking) peste
 * o listă de rezultate de search — util pentru o opțiune de sortare
 * "Best Match" în UI.
 *
 * NOTĂ: neconectat încă la app/(app)/job-search/page.tsx (care
 * folosește doar sortare newest/oldest momentan). Disponibil pentru
 * activare viitoare fără a risca să strice pagina existentă.
 */

import { useMemo } from "react";
import type { SearchedJob } from "@/types/jobSearch";
import {
  applyRanking,
  applyRankingWithScores,
  type RankingContext,
  type RankingScore,
} from "@/services/jobs/ranking";

interface UseRankingResult {
  rankedJobs: SearchedJob[];
  rankedJobsWithScores: { job: SearchedJob; score: RankingScore }[];
}

export default function useRanking(
  jobs: SearchedJob[],
  context?: Partial<RankingContext>
): UseRankingResult {
  const rankedJobs = useMemo(() => applyRanking(jobs, context), [jobs, context]);

  const rankedJobsWithScores = useMemo(
    () => applyRankingWithScores(jobs, context),
    [jobs, context]
  );

  return { rankedJobs, rankedJobsWithScores };
}