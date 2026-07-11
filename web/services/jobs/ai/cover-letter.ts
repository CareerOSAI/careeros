/**
 * services/ai/cover-letter.ts
 *
 * Generează o scrisoare de intenție (cover letter) personalizată,
 * pe baza CV-ului userului și a unui job specific, folosind AI.
 *
 * NU implementează logica de business încă — doar fundația.
 * Fără UI aici.
 *
 * Folosit de: features/cv/builder (sau o secțiune dedicată),
 * hooks (viitor).
 */

import type { Resume, CoverLetterInput, CoverLetterResult } from "@/types/resume";
import type { SearchedJob } from "@/types/jobSearch";

export type { CoverLetterInput, CoverLetterResult };

/**
 * Construiește un CoverLetterInput direct dintr-un SearchedJob,
 * pentru cazul comun în care userul generează o scrisoare pentru
 * un rezultat de căutare specific.
 */
export function buildCoverLetterInputFromJob(
  resume: Resume,
  job: SearchedJob,
  tone?: CoverLetterInput["tone"]
): CoverLetterInput {
  return {
    resume,
    jobId: job.id,
    jobTitle: job.title,
    companyName: job.company,
    tone,
  };
}

/**
 * Generează scrisoarea de intenție.
 *
 * TODO: implementare reală — apel AI care primește CV-ul + detaliile
 * jobului (titlu, companie, descriere) + tonul dorit, și întoarce
 * un text coerent, personalizat, gata de trimis.
 */
export async function generateCoverLetter(
  input: CoverLetterInput
): Promise<CoverLetterResult> {
  throw new Error("Not implemented: generateCoverLetter (services/ai/cover-letter.ts)");
}

/**
 * Regenerează scrisoarea cu un ton diferit, păstrând conținutul
 * de bază (util pentru un buton "Try a different tone" în UI).
 *
 * TODO: implementare reală.
 */
export async function regenerateWithTone(
  input: CoverLetterInput,
  newTone: CoverLetterInput["tone"]
): Promise<CoverLetterResult> {
  throw new Error("Not implemented: regenerateWithTone (services/ai/cover-letter.ts)");
}