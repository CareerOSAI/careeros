/**
 * types/analytics.ts
 *
 * Tipuri dedicate modulului Analytics — folosite de
 * features/analytics/ (charts, reports, salary, applications,
 * response-rate).
 */

// ────────────────────────────────────────────────────────────
// Perioade / filtre comune pentru analytics
// ────────────────────────────────────────────────────────────

export type AnalyticsPeriod = "7d" | "30d" | "90d" | "6m" | "1y" | "all";

/**
 * Parametrii comuni acceptați de toate rapoartele de analytics.
 */
export interface AnalyticsQueryParams {
  period: AnalyticsPeriod;
  from?: string; // ISO date, folosit dacă period nu acoperă exact intervalul dorit
  to?: string; // ISO date
}

// ────────────────────────────────────────────────────────────
// Applications (features/analytics/applications)
// ────────────────────────────────────────────────────────────

/**
 * Statistici despre aplicările userului, agregate pe perioada cerută.
 */
export interface ApplicationStats {
  totalApplied: number;
  totalInterviewing: number;
  totalOffers: number;
  totalRejected: number;
  /** Serie temporală, ex: pentru grafic "aplicări în timp" */
  timeline: { date: string; count: number }[];
}

// ────────────────────────────────────────────────────────────
// Response rate (features/analytics/response-rate)
// ────────────────────────────────────────────────────────────

/**
 * Rata de răspuns a companiilor la aplicările userului.
 */
export interface ResponseRateStats {
  totalApplications: number;
  totalResponses: number;
  responseRatePercent: number; // 0-100
  averageResponseTimeDays: number | null;
  /** Defalcare per companie, util pentru identificarea de tipare */
  byCompany: {
    companyName: string;
    applications: number;
    responses: number;
    responseRatePercent: number;
  }[];
}

// ────────────────────────────────────────────────────────────
// Salary analytics (features/analytics/salary)
// ────────────────────────────────────────────────────────────

/**
 * Distribuția salarială a joburilor văzute/aplicate de user,
 * folosită pentru grafice comparative.
 */
export interface SalaryAnalyticsStats {
  currency: string;
  minObserved: number | null;
  maxObserved: number | null;
  medianObserved: number | null;
  /** Distribuție pe bucket-uri, pentru histograme */
  distribution: { rangeLabel: string; count: number }[];
}

// ────────────────────────────────────────────────────────────
// Rapoarte generale (features/analytics/reports)
// ────────────────────────────────────────────────────────────

/**
 * Un raport agregat, combinând mai multe categorii de statistici.
 * Folosit ca bază pentru export (PDF/CSV) sau pentru afișare in-app.
 */
export interface AnalyticsReport {
  id: string;
  userId: string;
  period: AnalyticsPeriod;
  generatedAt: string; // ISO date
  applications: ApplicationStats;
  responseRate: ResponseRateStats;
  salary: SalaryAnalyticsStats;
}

// ────────────────────────────────────────────────────────────
// Charts (features/analytics/charts) — tipuri generice de date
// ────────────────────────────────────────────────────────────

/**
 * Punct de date generic, reutilizabil pentru orice grafic simplu
 * (line/bar chart) din features/analytics/charts.
 */
export interface ChartDataPoint {
  label: string;
  value: number;
}

/**
 * Serie de date pentru grafice cu multiple linii/categorii
 * (ex: aplicări vs. interviuri pe aceeași axă de timp).
 */
export interface ChartSeries {
  name: string;
  data: ChartDataPoint[];
  color?: string;
}