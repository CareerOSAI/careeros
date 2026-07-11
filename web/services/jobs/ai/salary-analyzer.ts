/**
 * services/ai/salary-analyzer.ts
 *
 * Analizează dacă salariul unui job (sau un salariu oferit) e sub,
 * la nivelul, sau peste piață, folosind AI + date de referință.
 *
 * NU implementează logica de business încă — doar fundația.
 * Fără UI aici.
 *
 * Notă: tipurile de salariu sunt definite local aici (nu în
 * types/salary.ts, care a rămas neconectat de restul aplicației —
 * vezi utils/salary.ts, care folosește SearchedJobSalary din
 * types/jobSearch.ts ca sursă unică de adevăr pentru salariu).
 *
 * Folosit de: components/ai/SalaryAnalyzerCard, hooks (viitor).
 */

import type { SearchedJob } from "@/types/jobSearch";
import type { SearchedJobSalary } from "@/types/jobSearch";

/**
 * Input pentru analiza de salariu.
 */
export interface SalaryAnalysisInput {
  role: string;
  experienceLevel: string;
  location: string;
  technologies: string[];
  /** Salariul de analizat — poate veni dintr-un SearchedJob sau introdus manual de user */
  offeredSalary?: SearchedJobSalary;
}

/**
 * Rezultatul analizei — verdict + context de piață.
 */
export interface SalaryAnalysisResult {
  marketMin: number | null;
  marketMax: number | null;
  marketMedian: number | null;
  currency: string;
  verdict: "below_market" | "at_market" | "above_market" | "unknown";
  confidence: number; // 0-100
  explanation: string;
  generatedAt: string; // ISO date
}

/**
 * Construiește un SalaryAnalysisInput direct dintr-un SearchedJob,
 * pentru cazul comun în care userul vrea analiza pe un rezultat
 * de căutare, nu pe date introduse manual.
 */
export function buildSalaryAnalysisInputFromJob(job: SearchedJob): SalaryAnalysisInput {
  return {
    role: job.title,
    experienceLevel: job.experienceLevel,
    location: job.location,
    technologies: job.tags,
    offeredSalary: job.salary,
  };
}

/**
 * Analizează salariul unui job/ofertă față de piață.
 *
 * TODO: implementare reală — apel AI (posibil combinat cu o sursă
 * de date de piață, ex: un API extern de salary benchmarking sau
 * date agregate din joburile deja indexate de CareerOS) care
 * întoarce min/max/median de piață + verdict.
 */
export async function analyzeSalary(input: SalaryAnalysisInput): Promise<SalaryAnalysisResult> {
  throw new Error("Not implemented: analyzeSalary (services/ai/salary-analyzer.ts)");
}