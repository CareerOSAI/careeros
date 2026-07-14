/**
 * features/roadmap/recommendations/index.ts
 *
 * Afișarea recomandărilor de pași următori, generate de
 * services/ai/roadmap-recommender.ts (schelet, neimplementat încă)
 * și services/ai/learning-advisor.ts (schelet, neimplementat încă).
 *
 * TODO: componentă RoadmapRecommendationsPanel care apelează
 * recommendNextSteps() / recommendLearningResources() odată ce
 * sunt implementate.
 */

export type { RoadmapRecommendation } from "@/types/roadmap";
export type { LearningResource } from "@/types/roadmap";

// TODO: <RoadmapRecommendationsPanel completedItemIds={number[]} />