/**
 * types/company.ts
 *
 * Tipuri dedicate entității Company — folosite de JobCompany (job.ts),
 * de Ranking Engine (favorite companies), și de
 * services/ai/company-analyzer.ts.
 */

/**
 * Dimensiunea companiei, folosită pentru filtre și pentru
 * Company Analyzer AI.
 */
export type CompanySize =
  | "startup" // 1-10
  | "small" // 11-50
  | "medium" // 51-200
  | "large" // 201-1000
  | "enterprise" // 1000+
  | "unknown";

/**
 * Reprezentarea normalizată a unei companii, folosită atât în
 * JobCompany (embed pe fiecare Job), cât și standalone
 * (ex: pagina de detalii companie, Favorite Companies).
 */
export interface Company {
  id: string;
  name: string;
  logo: string | null;
  website: string | null;
  industry: string | null;
  size: CompanySize;
  location: string | null;
  description: string | null;

  /** Linkuri sociale opționale, folosite în UI (JobCompany component) */
  linkedinUrl?: string;
  githubUrl?: string;
  glassdoorUrl?: string;
}

/**
 * Intrare în lista de "companii favorite" a userului,
 * folosită de Ranking Engine (favoriteCompanyScore).
 *
 * TODO: persistat per user, sursă exactă (DB/local) TBD.
 */
export interface FavoriteCompany {
  companyId: string;
  companyName: string;
  addedAt: string; // ISO date
  /** Boost manual aplicat de user în ranking, ex: 1-10 */
  priority?: number;
}

/**
 * Input pentru Company Analyzer AI.
 *
 * TODO: implementat în services/ai/company-analyzer.ts
 */
export interface CompanyAnalysisInput {
  company: Company;
  /** Tehnologiile candidatului, pentru a evalua fit-ul cultural/tehnic */
  candidateTechnologies?: string[];
}

/**
 * Rezultatul analizei AI asupra unei companii
 * (cultură, stabilitate, semnale de creștere etc.).
 *
 * TODO: implementat în services/ai/company-analyzer.ts
 */
export interface CompanyAnalysisResult {
  summary: string;
  cultureSignals: string[];
  growthSignals: string[];
  riskFlags: string[];
  overallScore: number; // 0-100
  confidence: number; // 0-100
}