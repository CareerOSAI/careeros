export type Lesson = {
  id: number;
  title: string;
  completed: boolean;
};

export type RoadmapItem = {
  id: number;
  title: string;
  description: string;
  progress: number;
  status: "Locked" | "Started" | "In Progress" | "Completed";
  icon: "code2" | "braces" | "badgecheck" | "atom" | "rocket";
  lessons: Lesson[];
};// ────────────────────────────────────────────────────────────
// Extensii Roadmap — adăugate pentru arhitectura de servicii/AI
// (nu modifică Lesson / RoadmapItem existente)
// ────────────────────────────────────────────────────────────

/**
 * Progresul agregat al userului pe întregul roadmap,
 * folosit de features/roadmap/progress și de Dashboard (stats/widgets).
 */
export interface RoadmapProgress {
  totalItems: number;
  completedItems: number;
  inProgressItems: number;
  lockedItems: number;
  overallProgressPercent: number; // 0-100
  lastUpdatedAt: string; // ISO date
}

/**
 * Un skill individual urmărit în cadrul roadmap-ului,
 * folosit de features/roadmap/skills și de useSkillGap.ts.
 */
export interface RoadmapSkill {
  id: string;
  name: string;
  category: string; // ex: "Backend", "DevOps", "Soft Skills"
  proficiency: number; // 0-100
  relatedRoadmapItemIds: number[]; // referințe către RoadmapItem.id
}

/**
 * O recomandare generată (AI sau manual) pentru un pas următor
 * în roadmap, folosită de features/roadmap/recommendations.
 *
 * TODO: populat de services/ai/roadmap-recommender.ts
 */
export interface RoadmapRecommendation {
  id: string;
  relatedRoadmapItemId: number | null; // null = recomandare generală
  title: string;
  reason: string;
  priority: "low" | "medium" | "high";
  source: "ai" | "manual";
  createdAt: string; // ISO date
}

/**
 * Un eveniment/etapă plasat pe timeline-ul roadmap-ului,
 * folosit de features/roadmap/timeline.
 */
export interface RoadmapTimelineEvent {
  id: string;
  roadmapItemId: number;
  label: string; // ex: "Completat", "Început"
  date: string; // ISO date
}

// ────────────────────────────────────────────────────────────
// AI: Roadmap Recommender & Learning Advisor
// ────────────────────────────────────────────────────────────

/**
 * Input pentru Roadmap Recommender AI — generează recomandări
 * de pași următori pe baza progresului curent și a skill gap-ului.
 *
 * TODO: implementat în services/ai/roadmap-recommender.ts
 */
export interface RoadmapRecommenderInput {
  completedRoadmapItemIds: number[];
  currentSkills: RoadmapSkill[];
  targetRole?: string;
}

/**
 * Rezultatul Roadmap Recommender AI.
 *
 * TODO: implementat în services/ai/roadmap-recommender.ts
 */
export interface RoadmapRecommenderResult {
  recommendations: RoadmapRecommendation[];
  generatedAt: string; // ISO date
}

/**
 * Input pentru Learning Advisor AI — sugerează resurse de învățare
 * concrete (cursuri, articole) pentru un skill gap identificat.
 *
 * TODO: implementat în services/ai/learning-advisor.ts
 */
export interface LearningAdvisorInput {
  skillGaps: string[];
  preferredFormat?: "video" | "article" | "course" | "any";
}

/**
 * O resursă de învățare recomandată.
 *
 * TODO: implementat în services/ai/learning-advisor.ts
 */
export interface LearningResource {
  id: string;
  title: string;
  url: string;
  format: "video" | "article" | "course";
  relatedSkill: string;
  estimatedDurationMinutes: number | null;
}

/**
 * Rezultatul Learning Advisor AI.
 *
 * TODO: implementat în services/ai/learning-advisor.ts
 */
export interface LearningAdvisorResult {
  resources: LearningResource[];
  generatedAt: string; // ISO date
}