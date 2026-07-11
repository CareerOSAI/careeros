/**
 * types/jobSearch.ts
 *
 * SearchedJob = modelul unic pentru rezultatele din multi-provider
 * search (Job Search feature). Structura de bază e cea deja
 * existentă și conectată la UI (SearchedJobCard, Add to Tracker) —
 * NEATINSĂ.
 *
 * Câmpurile noi sunt toate OPȚIONALE, adăugate pentru a suporta
 * provideri viitori (Adzuna, Greenhouse, Lever etc.) care oferă
 * date mai bogate (salariu structurat, employment type, benefits).
 * Arbeitnow/Remotive continuă să funcționeze neschimbate, pur și
 * simplu nu populează aceste câmpuri noi.
 */

// ────────────────────────────────────────────────────────────
// Tipuri existente — NEATINSE
// ────────────────────────────────────────────────────────────

export type WorkType = "Remote" | "Hybrid" | "On-site";
export type ExperienceLevel = "Junior" | "Mid" | "Senior" | "Lead" | "Unclear";

/**
 * Identificatorul fiecărui provider suportat.
 * Extins față de original ("arbeitnow" | "remotive") pentru a
 * permite providerii ceruți în arhitectură.
 */
export type JobSource =
  | "arbeitnow"
  | "remotive"
  | "adzuna"
  | "greenhouse"
  | "lever"
  | "fantastic"
  | "manual"
  | "linked"
  | "rss";

// ────────────────────────────────────────────────────────────
// Sub-entități noi (opționale)
// ────────────────────────────────────────────────────────────

export type EmploymentType =
  | "full_time"
  | "part_time"
  | "contract"
  | "internship"
  | "freelance"
  | "temporary"
  | "unknown";

/**
 * Interval salarial normalizat. Opțional — Arbeitnow/Remotive
 * nu-l populează momentan; provideri precum Adzuna/Greenhouse da.
 */
export interface SearchedJobSalary {
  min: number | null;
  max: number | null;
  currency: string | null; // ISO 4217
  period: "hour" | "day" | "month" | "year" | "unknown";
  isEstimated: boolean;
}

// ────────────────────────────────────────────────────────────
// SearchedJob — extins, backward-compatible
// ────────────────────────────────────────────────────────────

export type SearchedJob = {
  // ── Câmpuri existente, NEATINSE ──
  id: string;
  source: JobSource; // extins ca listă de valori, dar tipul de câmp rămâne string
  title: string;
  company: string;
  location: string;
  country: string;
  workType: WorkType;
  experienceLevel: ExperienceLevel;
  url: string;
  description: string;
  tags: string[];
  postedAt: string | null;

  // ── Câmpuri noi, TOATE opționale — nu rup providerii existenți ──
  companyLogo?: string | null;
  salary?: SearchedJobSalary;
  employmentType?: EmploymentType;
  benefits?: string[];
  expiresAt?: string | null;
  isDuplicate?: boolean;
  duplicateOf?: string;
};

// ────────────────────────────────────────────────────────────
// Search params / rezultate (pentru Search Engine viitor)
// ────────────────────────────────────────────────────────────

export interface JobSearchParams {
  query?: string;
  location?: string;
  workType?: WorkType[];
  employmentType?: EmploymentType[];
  experienceLevel?: ExperienceLevel[];
  technologies?: string[]; // mapate pe `tags`
  salaryMin?: number;
  currency?: string;
  sources?: JobSource[];
  page?: number;
  pageSize?: number;
  sortBy?: "relevance" | "date" | "salary";
}

export interface JobSearchResult {
  jobs: SearchedJob[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  sourcesQueried: JobSource[];
  sourcesFailed: JobSource[];
}

export interface ProviderFetchResult {
  source: JobSource;
  success: boolean;
  jobs: SearchedJob[];
  error?: string;
  raw?: unknown;
}