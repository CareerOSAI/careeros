/**
 * services/ai/match-score.ts
 *
 * Calculează scorul de compatibilitate (Match Score) între un
 * SearchedJob și profilul/CV-ul userului, folosind AI.
 *
 * NU implementează logica de business încă — doar fundația.
 * Fără UI aici.
 */

import type { SearchedJob } from "@/types/jobSearch";
import type { Resume } from "@/types/resume";

export interface MatchScoreInput {
  job: SearchedJob;
  resume: Resume;
  additionalSkills?: string[];
}

export interface MatchScoreResult {
  overall: number;
  skillsMatch: number;
  experienceMatch: number;
  locationMatch: number;
  explanation: string;
  computedAt: string;
}

export async function calculateMatchScore(
  input: MatchScoreInput
): Promise<MatchScoreResult> {
  throw new Error("Not implemented: calculateMatchScore (services/ai/match-score.ts)");
}

export async function calculateMatchScoresBatch(
  jobs: SearchedJob[],
  resume: Resume
): Promise<Map<string, MatchScoreResult>> {
  throw new Error("Not implemented: calculateMatchScoresBatch (services/ai/match-score.ts)");
}