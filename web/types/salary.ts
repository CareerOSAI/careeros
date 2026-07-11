/**
 * types/salary.ts
 *
 * Tipuri dedicate logicii de salariu — folosite de JobSalary (job.ts),
 * de utils/salary.ts (parsare/normalizare) și de
 * services/ai/salary-analyzer.ts.
 */

/**
 * Perioada de referință a unui salariu, așa cum apare la providerii externi.
 * Fiecare provider poate raporta salariul diferit (orar, anual etc.) —
 * normalizers/ trebuie să mapeze totul către SalaryPeriod.
 */
export type SalaryPeriod = "hour" | "day" | "month" | "year" | "unknown";

/**
 * Reprezentarea normalizată, internă, a unui interval salarial.
 * Identic conceptual cu JobSalary din job.ts — redenumit aici pentru
 * a fi reutilizabil și în afara contextului unui Job
 * (ex: în CV Analyzer, Salary Analyzer AI, Analytics).
 */
export interface SalaryRange {
  min: number | null;
  max: number | null;
  currency: string | null; // ISO 4217
  period: SalaryPeriod;
  isEstimated: boolean;
}

/**
 * Rezultatul normalizării unui salariu anual, folosit pentru
 * comparații corecte între joburi cu perioade diferite
 * (ex: salariu orar vs. salariu anual).
 *
 * TODO: implementat în utils/salary.ts -> normalizeToAnnual()
 */
export interface NormalizedAnnualSalary {
  minAnnual: number | null;
  maxAnnual: number | null;
  currency: string | null;
  /** Rata de conversie folosită, dacă salariul a fost convertit valutar */
  conversionRateUsed?: number;
  /** Data la care a fost făcută conversia valutară (pentru audit) */
  convertedAt?: string; // ISO date
}

/**
 * Input generic pentru Salary Analyzer AI.
 *
 * TODO: implementat în services/ai/salary-analyzer.ts
 */
export interface SalaryAnalysisInput {
  role: string;
  experienceLevel: string;
  location: string;
  technologies: string[];
  offeredSalary?: SalaryRange;
}

/**
 * Rezultatul analizei AI asupra unui salariu (ex: "sub piață",
 * "peste piață", cu context și sursă de comparație).
 *
 * TODO: implementat în services/ai/salary-analyzer.ts
 */
export interface SalaryAnalysisResult {
  marketMin: number | null;
  marketMax: number | null;
  marketMedian: number | null;
  currency: string;
  verdict: "below_market" | "at_market" | "above_market" | "unknown";
  confidence: number; // 0-100
  explanation: string;
}