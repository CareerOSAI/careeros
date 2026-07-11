/**
 * services/ai/company-analyzer.ts
 *
 * Analizează o companie (cultură, semnale de creștere, riscuri),
 * folosind AI, pe baza datelor disponibile despre companie și
 * (opțional) profilul tehnic al candidatului.
 *
 * NU implementează logica de business încă — doar fundația.
 * Fără UI aici.
 *
 * Folosit de: components/ai/CompanyAnalyzerCard, hooks (viitor).
 */

import type { Company, CompanyAnalysisInput, CompanyAnalysisResult } from "@/types/company";
import type { SearchedJob } from "@/types/jobSearch";

export type { CompanyAnalysisInput, CompanyAnalysisResult };

/**
 * Construiește un obiect Company minimal direct dintr-un
 * SearchedJob, pentru cazul comun în care nu avem încă o intrare
 * completă de Company (ex: nu există încă un modul dedicat de
 * "companii cunoscute" populat).
 *
 * Notă: majoritatea câmpurilor rămân necunoscute din SearchedJob
 * (industry, size, description) — AI-ul va trebui să le completeze
 * sau să lucreze cu date parțiale.
 */
export function buildCompanyFromJob(job: SearchedJob): Company {
  return {
    id: job.company.toLowerCase().replace(/\s+/g, "-"),
    name: job.company,
    logo: null,
    website: null,
    industry: null,
    size: "unknown",
    location: job.location,
    description: null,
  };
}

/**
 * Analizează o companie, generând semnale de cultură, creștere și
 * riscuri, plus un scor general.
 *
 * TODO: implementare reală — apel AI, posibil combinat cu surse
 * externe (ex: căutare web despre companie, dacă e disponibilă
 * infrastructura de search) pentru context suplimentar.
 */
export async function analyzeCompany(
  input: CompanyAnalysisInput
): Promise<CompanyAnalysisResult> {
  throw new Error("Not implemented: analyzeCompany (services/ai/company-analyzer.ts)");
}