/**
 * services/ai/learning-advisor.ts
 *
 * Recomandă resurse de învățare concrete (cursuri, articole, video)
 * pentru skill gap-uri identificate, folosind AI.
 *
 * Diferență față de roadmap-recommender.ts: acela recomandă CE
 * pas următor din roadmap ar trebui urmat; acesta recomandă CU CE
 * resurse externe concrete poate fi acoperit un skill gap specific
 * (poate fi folosit independent de roadmap, ex: direct din
 * skill-gap.ts).
 *
 * NU implementează logica de business încă — doar fundația.
 * Fără UI aici.
 *
 * Folosit de: features/roadmap/recommendations,
 * components/ai/LearningAdvisorCard, hooks (viitor).
 */

import type {
  LearningAdvisorInput,
  LearningAdvisorResult,
  LearningResource,
} from "@/types/roadmap";
import type { SkillGapResult } from "./skill-gap";

export type { LearningAdvisorInput, LearningAdvisorResult };

/**
 * Construiește LearningAdvisorInput direct dintr-un SkillGapResult
 * deja calculat (services/ai/skill-gap.ts), pentru fluxul comun:
 * analizezi gap-ul -> ceri resurse pentru el.
 */
export function buildLearningInputFromSkillGap(
  skillGap: SkillGapResult,
  preferredFormat?: LearningAdvisorInput["preferredFormat"]
): LearningAdvisorInput {
  return {
    skillGaps: skillGap.missingSkills,
    preferredFormat,
  };
}

/**
 * Recomandă resurse de învățare pentru o listă de skill gap-uri.
 *
 * TODO: implementare reală — apel AI (posibil combinat cu o sursă
 * externă/curated de resurse, sau căutare web dacă infrastructura
 * de search e disponibilă) care întoarce resurse relevante, per skill.
 */
export async function recommendLearningResources(
  input: LearningAdvisorInput
): Promise<LearningAdvisorResult> {
  throw new Error("Not implemented: recommendLearningResources (services/ai/learning-advisor.ts)");
}

/**
 * Recomandă o singură resursă "quick start" pentru UN skill anume,
 * util pentru un link rapid inline (ex: lângă un skill marcat ca
 * lipsă în SkillGapCard), fără să aștepte lista completă.
 *
 * TODO: implementare reală.
 */
export async function getQuickStartResource(skill: string): Promise<LearningResource | null> {
  throw new Error("Not implemented: getQuickStartResource (services/ai/learning-advisor.ts)");
}