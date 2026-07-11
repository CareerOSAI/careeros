/**
 * services/ai/resume-optimizer.ts
 *
 * Optimizează un CV pentru un job specific (sau pentru un rol
 * generic), generând sugestii concrete per secțiune folosind AI.
 *
 * NU implementează logica de business încă — doar fundația.
 * Fără UI aici.
 *
 * Folosit de: features/cv/analysis, components/ai/ResumeOptimizerCard,
 * hooks (viitor).
 */

import type { Resume, ResumeOptimizationInput, ResumeOptimizationResult } from "@/types/resume";
import type { SearchedJob } from "@/types/jobSearch";

export type { ResumeOptimizationInput, ResumeOptimizationResult };

/**
 * Construiește un ResumeOptimizationInput direct dintr-un
 * SearchedJob, pentru cazul comun în care userul vrea optimizare
 * față de un rezultat de căutare specific.
 */
export function buildOptimizationInputFromJob(
  resume: Resume,
  job: SearchedJob
): ResumeOptimizationInput {
  return {
    resume,
    targetJobId: job.id,
    targetJobDescription: job.description,
  };
}

/**
 * Optimizează CV-ul, generând sugestii per secțiune
 * (summary, experience, skills, education, projects).
 *
 * TODO: implementare reală — apel AI care primește CV-ul complet +
 * descrierea jobului țintă și întoarce sugestii concrete, per
 * secțiune, cu justificare.
 */
export async function optimizeResume(
  input: ResumeOptimizationInput
): Promise<ResumeOptimizationResult> {
  throw new Error("Not implemented: optimizeResume (services/ai/resume-optimizer.ts)");
}

/**
 * Calculează un scor general de optimizare (0-100) fără a genera
 * sugestii detaliate — util pentru un indicator rapid în UI
 * (ex: "CV Score: 72/100") înainte ca userul să ceară analiza completă.
 *
 * TODO: implementare reală — poate reutiliza intern optimizeResume
 * și extrage doar overallScore, sau un apel AI mai ieftin/rapid dedicat.
 */
export async function getQuickResumeScore(resume: Resume): Promise<number> {
  throw new Error("Not implemented: getQuickResumeScore (services/ai/resume-optimizer.ts)");
}