/**
 * services/ai/interview-coach.ts
 *
 * Generează sesiuni de simulare de interviu (întrebări) și
 * evaluează răspunsurile userului, folosind AI.
 *
 * NU implementează logica de business încă — doar fundația.
 * Fără UI aici.
 *
 * Folosit de: features/interview/ (questions, answers, feedback,
 * history), components/ai/InterviewCoachCard, hooks (viitor).
 */

import type {
  InterviewCoachInput,
  InterviewCoachResult,
  InterviewAnswer,
  InterviewFeedback,
  InterviewSessionSummary,
} from "@/types/interview";
import type { SearchedJob } from "@/types/jobSearch";

export type { InterviewCoachInput, InterviewCoachResult };

/**
 * Construiește un InterviewCoachInput direct dintr-un SearchedJob,
 * pentru cazul comun în care userul vrea o simulare de interviu
 * pregătită pentru un rezultat de căutare specific.
 */
export function buildInterviewInputFromJob(
  job: SearchedJob,
  type: InterviewCoachInput["type"],
  difficulty: InterviewCoachInput["difficulty"],
  numberOfQuestions = 5
): InterviewCoachInput {
  return {
    jobId: job.id,
    jobTitle: job.title,
    technologies: job.tags,
    type,
    difficulty,
    numberOfQuestions,
  };
}

/**
 * Generează o sesiune nouă de interviu (întrebările propriu-zise),
 * pe baza input-ului dat.
 *
 * TODO: implementare reală — apel AI care generează N întrebări
 * relevante pentru tipul, dificultatea și tehnologiile specificate.
 */
export async function generateInterviewSession(
  input: InterviewCoachInput
): Promise<InterviewCoachResult> {
  throw new Error("Not implemented: generateInterviewSession (services/ai/interview-coach.ts)");
}

/**
 * Evaluează un singur răspuns al userului la o întrebare de interviu,
 * generând feedback AI (puncte forte, de îmbunătățit, model de răspuns ideal).
 *
 * TODO: implementare reală.
 */
export async function evaluateAnswer(answer: InterviewAnswer): Promise<InterviewFeedback> {
  throw new Error("Not implemented: evaluateAnswer (services/ai/interview-coach.ts)");
}

/**
 * Generează rezumatul complet al unei sesiuni de interviu, agregând
 * feedback-ul individual al fiecărui răspuns.
 *
 * TODO: implementare reală — poate reutiliza intern evaluateAnswer
 * pentru fiecare răspuns, apoi agregă scorurile.
 */
export async function summarizeInterviewSession(
  sessionId: string,
  answers: InterviewAnswer[]
): Promise<InterviewSessionSummary> {
  throw new Error("Not implemented: summarizeInterviewSession (services/ai/interview-coach.ts)");
}