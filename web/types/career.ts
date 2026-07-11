/**
 * types/career.ts
 *
 * Tipuri dedicate "Career Coach" — folosite de CareerContext (nou),
 * de services/ai/career-coach.ts și de services/ai/weekly-report.ts.
 *
 * Acest fișier NU se suprapune cu Roadmap (roadmap.ts) — Roadmap
 * ține de progresul pe skill-uri/lecții, Career ține de strategia
 * generală de carieră a userului (obiective, direcție, feedback).
 */

// ────────────────────────────────────────────────────────────
// Profilul de carieră al userului
// ────────────────────────────────────────────────────────────

/**
 * Obiectivul de carieră declarat/dedus al userului.
 * Folosit ca input pentru Career Coach AI și pentru Ranking Engine
 * (ex: prioritizare joburi aliniate cu targetRole).
 */
export interface CareerGoal {
  id: string;
  targetRole: string; // ex: "Senior Backend Engineer"
  targetSeniority: string; // ex: "senior", "staff"
  targetIndustries: string[];
  targetTechnologies: string[];
  timeframeMonths: number | null; // orizont de timp declarat de user
  createdAt: string; // ISO date
}

/**
 * Profilul de carieră agregat al userului — folosit de CareerContext
 * ca sursă de adevăr pentru toate componentele AI legate de carieră.
 */
export interface CareerProfile {
  userId: string;
  currentRole: string | null;
  currentSeniority: string | null;
  yearsOfExperience: number | null;
  goals: CareerGoal[];
  strengths: string[];
  weaknesses: string[];
  updatedAt: string; // ISO date
}

// ────────────────────────────────────────────────────────────
// Career Coach AI
// ────────────────────────────────────────────────────────────

/**
 * Tipul unei sugestii/sfat oferit de Career Coach AI.
 */
export type CareerAdviceCategory =
  | "job_search_strategy"
  | "skill_development"
  | "networking"
  | "resume"
  | "interview_prep"
  | "negotiation"
  | "general";

/**
 * O bucată individuală de sfat generat de Career Coach AI.
 *
 * TODO: implementat în services/ai/career-coach.ts
 */
export interface CareerAdvice {
  id: string;
  category: CareerAdviceCategory;
  title: string;
  content: string;
  priority: "low" | "medium" | "high";
  createdAt: string; // ISO date
}

/**
 * Input trimis către Career Coach AI.
 *
 * TODO: implementat în services/ai/career-coach.ts
 */
export interface CareerCoachInput {
  profile: CareerProfile;
  recentActivitySummary?: string; // ex: rezumat din ActivityContext
  question?: string; // întrebare liberă adresată de user coach-ului
}

/**
 * Rezultatul unei sesiuni de Career Coach AI.
 *
 * TODO: implementat în services/ai/career-coach.ts
 */
export interface CareerCoachResult {
  advice: CareerAdvice[];
  summary: string;
  generatedAt: string; // ISO date
}

// ────────────────────────────────────────────────────────────
// Weekly Report AI
// ────────────────────────────────────────────────────────────

/**
 * Metrici agregate pentru raportul săptămânal
 * (surse: JobsContext, ActivityContext, RoadmapContext).
 */
export interface WeeklyReportMetrics {
  jobsDiscovered: number;
  jobsApplied: number;
  jobsInterviewing: number;
  jobsRejected: number;
  roadmapItemsCompleted: number;
  averageMatchScore: number | null;
}

/**
 * Input pentru generarea raportului săptămânal AI.
 *
 * TODO: implementat în services/ai/weekly-report.ts
 */
export interface WeeklyReportInput {
  userId: string;
  weekStart: string; // ISO date
  weekEnd: string; // ISO date
  metrics: WeeklyReportMetrics;
}

/**
 * Rezultatul raportului săptămânal generat de AI —
 * un rezumat narativ + recomandări pentru săptămâna următoare.
 *
 * TODO: implementat în services/ai/weekly-report.ts
 */
export interface WeeklyReportResult {
  summary: string;
  highlights: string[];
  recommendationsForNextWeek: string[];
  metrics: WeeklyReportMetrics;
  generatedAt: string; // ISO date
}