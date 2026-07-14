/**
 * features/dashboard/recommendations/index.ts
 *
 * Recomandări afișate pe Dashboard — combină
 * utils/dashboardInsights.ts existent (getDashboardTasks,
 * getDashboardSuggestion, deja funcțional) cu recomandări AI
 * viitoare (services/ai/roadmap-recommender.ts,
 * services/ai/career-coach.ts).
 *
 * TODO: componentă RecommendationsPanel care afișează întâi
 * getDashboardSuggestion() (deja funcțional, fără AI), apoi extinde
 * cu getQuickWinRecommendation() / getCareerAdviceForCategory()
 * odată ce sunt implementate.
 */

export type { DashboardTask } from "@/utils/dashboardInsights";

// TODO: <RecommendationsPanel jobs={jobs} />