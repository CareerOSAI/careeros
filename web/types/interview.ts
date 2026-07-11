/**
 * types/interview.ts
 *
 * Tipuri dedicate modulului Interview — folosite de
 * features/interview/ (questions, answers, feedback, history)
 * și de services/ai/interview-coach.ts.
 */

// ────────────────────────────────────────────────────────────
// Sesiune de interviu
// ────────────────────────────────────────────────────────────

export type InterviewType =
  | "behavioral"
  | "technical"
  | "system_design"
  | "coding"
  | "hr_screening"
  | "mixed";

export type InterviewDifficulty = "easy" | "medium" | "hard";

/**
 * O sesiune de simulare de interviu, potențial legată de un job
 * specific din Job Tracker.
 */
export interface InterviewSession {
  id: string;
  userId: string;
  jobId: string | null; // referință opțională la Job.id
  type: InterviewType;
  difficulty: InterviewDifficulty;
  startedAt: string; // ISO date
  completedAt: string | null;
  status: "in_progress" | "completed" | "abandoned";
}

// ────────────────────────────────────────────────────────────
// Întrebări
// ────────────────────────────────────────────────────────────

/**
 * O întrebare individuală de interviu, generată de AI sau
 * dintr-o bancă predefinită.
 *
 * TODO: generare implementată în services/ai/interview-coach.ts
 */
export interface InterviewQuestion {
  id: string;
  sessionId: string;
  type: InterviewType;
  text: string;
  order: number;
  /** Tehnologii/skill-uri vizate de întrebare, dacă e cazul */
  relatedTechnologies?: string[];
}

// ────────────────────────────────────────────────────────────
// Răspunsuri
// ────────────────────────────────────────────────────────────

/**
 * Răspunsul userului la o întrebare de interviu
 * (text scris sau transcript audio/video, în funcție de UI).
 */
export interface InterviewAnswer {
  id: string;
  questionId: string;
  sessionId: string;
  content: string;
  submittedAt: string; // ISO date
  /** Durata luată pentru a răspunde, în secunde — util pentru feedback */
  durationSeconds?: number;
}

// ────────────────────────────────────────────────────────────
// Feedback AI
// ────────────────────────────────────────────────────────────

/**
 * Feedback generat de AI pentru un răspuns individual.
 *
 * TODO: implementat în services/ai/interview-coach.ts
 */
export interface InterviewFeedback {
  id: string;
  answerId: string;
  questionId: string;
  score: number; // 0-100
  strengths: string[];
  improvements: string[];
  idealAnswerOutline: string | null;
  generatedAt: string; // ISO date
}

/**
 * Rezumatul complet al unei sesiuni de interviu, agregând
 * feedback-ul individual al fiecărui răspuns.
 *
 * TODO: implementat în services/ai/interview-coach.ts
 */
export interface InterviewSessionSummary {
  sessionId: string;
  overallScore: number; // 0-100
  strengths: string[];
  improvements: string[];
  feedbackByQuestion: InterviewFeedback[];
  generatedAt: string; // ISO date
}

// ────────────────────────────────────────────────────────────
// Istoric
// ────────────────────────────────────────────────────────────

/**
 * Intrare de istoric folosită de features/interview/history —
 * o versiune "ușoară" a InterviewSession, pentru liste/tabele.
 */
export interface InterviewHistoryEntry {
  sessionId: string;
  jobTitle: string | null;
  companyName: string | null;
  type: InterviewType;
  overallScore: number | null;
  completedAt: string | null;
}

// ────────────────────────────────────────────────────────────
// Interview Coach AI — input generic de generare sesiune
// ────────────────────────────────────────────────────────────

/**
 * Input pentru generarea unei sesiuni noi de interviu de către AI.
 *
 * TODO: implementat în services/ai/interview-coach.ts
 */
export interface InterviewCoachInput {
  jobId?: string;
  jobTitle?: string;
  technologies?: string[];
  type: InterviewType;
  difficulty: InterviewDifficulty;
  numberOfQuestions: number;
}

/**
 * Rezultatul generării unei sesiuni noi (întrebările propriu-zise).
 *
 * TODO: implementat în services/ai/interview-coach.ts
 */
export interface InterviewCoachResult {
  session: InterviewSession;
  questions: InterviewQuestion[];
}