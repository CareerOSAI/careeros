/**
 * services/ai/ats-analyzer.ts
 *
 * Analizează un CV din perspectiva compatibilității cu sistemele
 * ATS (Applicant Tracking System) — cuvinte cheie lipsă, probleme
 * de formatare, scor de trecere — folosind AI.
 *
 * Diferență față de resume-optimizer.ts: acela optimizează
 * conținutul general al CV-ului (claritate, impact); acesta se
 * concentrează STRICT pe compatibilitatea tehnică cu parserele ATS.
 *
 * NU implementează logica de business încă — doar fundația.
 * Fără UI aici.
 *
 * Folosit de: features/cv/analysis, components/ai/ATSAnalyzerCard,
 * hooks (viitor).
 */

import type { Resume, AtsAnalysisResult } from "@/types/resume";
import type { SearchedJob } from "@/types/jobSearch";

export type { AtsAnalysisResult };

/**
 * Input pentru analiza ATS — CV-ul, opțional comparat cu un job
 * specific (pentru a verifica match-ul de cuvinte cheie relevante
 * acelui job, nu doar formatare generică).
 */
export interface AtsAnalysisInput {
  resume: Resume;
  targetJob?: SearchedJob;
}

/**
 * Analizează compatibilitatea ATS a unui CV.
 *
 * TODO: implementare reală — verificare deterministă de formatare
 * (ex: fără tabele complexe, fără imagini, fonturi standard) +
 * apel AI pentru identificarea cuvintelor cheie lipsă față de
 * targetJob.description, dacă e specificat.
 */
export async function analyzeAtsCompatibility(
  input: AtsAnalysisInput
): Promise<AtsAnalysisResult> {
  throw new Error("Not implemented: analyzeAtsCompatibility (services/ai/ats-analyzer.ts)");
}

/**
 * Verificare rapidă, doar de formatare (fără AI) — util ca prim
 * filtru instant în UI, înainte de analiza completă (care poate
 * dura mai mult din cauza apelului AI).
 *
 * TODO: implementare reală — reguli deterministe simple (ex:
 * verifică dacă Resume are secțiuni goale, bullets prea lungi etc.)
 */
export function quickFormatCheck(resume: Resume): string[] {
  throw new Error("Not implemented: quickFormatCheck (services/ai/ats-analyzer.ts)");
}