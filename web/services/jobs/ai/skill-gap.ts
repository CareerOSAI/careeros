/**
 * services/ai/skill-gap.ts
 *
 * Identifică skill gap-ul dintre profilul/CV-ul userului și
 * cerințele unui job, și generează recomandări AI.
 *
 * NU implementează logica de business încă — doar fundația.
 * Fără UI aici.
 */

import type { SearchedJob } from "@/types/jobSearch";
import type { Resume } from "@/types/resume";
import { findMissingTechnologies } from "@/utils/skills";

export interface SkillGapInput {
  resume: Resume;
  targetJob?: SearchedJob;
  targetRole?: string;
}

export interface SkillGapRecommendation {
  skill: string;
  priority: "low" | "medium" | "high";
  reason: string;
  suggestedResourceUrl?: string;
}

export interface SkillGapResult {
  missingSkills: string[];
  matchingSkills: string[];
  recommendations: SkillGapRecommendation[];
  overallReadinessScore: number;
  generatedAt: string;
}

export function extractMissingSkillsForJob(resume: Resume, job: SearchedJob): string[] {
  const candidateSkills = resume.skills.flatMap((group) => group.skills);
  return findMissingTechnologies(candidateSkills, job.tags);
}

export async function analyzeSkillGap(input: SkillGapInput): Promise<SkillGapResult> {
  throw new Error("Not implemented: analyzeSkillGap (services/ai/skill-gap.ts)");
}