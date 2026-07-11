
/**
 * services/ai/roadmap-recommender.ts
 *
 * Generează recomandări de pași următori în roadmap, pe baza
 * progresului curent al userului (RoadmapItem-urile completate) și
 * a skill-urilor sale actuale, folosind AI.
 *
 * NU implementează logica de business încă — doar fundația.
 * Fără UI aici.
 *
 * Folosit de: features/roadmap/recommendations,
 * components/ai/... (dacă apare un card dedicat), hooks/useRoadmap.ts.
 */

import type { RoadmapItem } from "@/types/roadmap";
import type {
  RoadmapSkill,
  RoadmapRecommenderInput,
  RoadmapRecommenderResult,
  RoadmapRecommendation,
} from "@/types/roadmap";

export type { RoadmapRecommenderInput, RoadmapRecommenderResult };

/**
 * Construiește RoadmapRecommenderInput pe baza listei de
 * RoadmapItem existente (originalul, cu status "Completed") și a
 * skill-urilor curente ale userului.
 */
export function buildRecommenderInput(
  roadmapItems: RoadmapItem[],
  currentSkills: RoadmapSkill[],
  targetRole?: string
): RoadmapRecommenderInput {
  const completedRoadmapItemIds = roadmapItems
    .filter((item) => item.status === "Completed")
    .map((item) => item.id);

  return { completedRoadmapItemIds, currentSkills, targetRole };
}

/**
 * Generează recomandări de pași următori în roadmap.
 *
 * TODO: implementare reală — apel AI care primește pașii completați
 * + skill-urile curente + (opțional) rolul țintă, și generează
 * recomandări prioritizate (ex: "Următorul modul recomandat: X,
 * pentru că Y").
 */
export async function recommendNextSteps(
  input: RoadmapRecommenderInput
): Promise<RoadmapRecommenderResult> {
  throw new Error("Not implemented: recommendNextSteps (services/ai/roadmap-recommender.ts)");
}

/**
 * Generează o singură recomandare "quick win" — cel mai rapid pas
 * următor recomandat, util pentru un widget compact pe Dashboard
 * (features/dashboard/recommendations), fără să aștepte analiza completă.
 *
 * TODO: implementare reală.
 */
export async function getQuickWinRecommendation(
  input: RoadmapRecommenderInput
): Promise<RoadmapRecommendation | null> {
  throw new Error("Not implemented: getQuickWinRecommendation (services/ai/roadmap-recommender.ts)");
}