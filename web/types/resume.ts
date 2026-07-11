/**
 * types/resume.ts
 *
 * Tipuri dedicate CV-ului/Resume-ului — folosite de features/cv/
 * (builder, templates, preview, export, analysis), de
 * services/ai/resume-optimizer.ts, services/ai/ats-analyzer.ts
 * și services/ai/cover-letter.ts.
 */

// ────────────────────────────────────────────────────────────
// Structura de bază a unui CV
// ────────────────────────────────────────────────────────────

export interface ResumeContactInfo {
  fullName: string;
  email: string;
  phone: string | null;
  location: string | null;
  linkedinUrl: string | null;
  githubUrl: string | null;
  portfolioUrl: string | null;
}

export interface ResumeExperienceEntry {
  id: string;
  jobTitle: string;
  company: string;
  location: string | null;
  startDate: string; // ISO date
  endDate: string | null; // null = "prezent"
  isCurrent: boolean;
  bullets: string[]; // descrieri realizări, pregătite pentru ATS
  technologies: string[];
}

export interface ResumeEducationEntry {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string | null;
  startDate: string | null;
  endDate: string | null;
}

export interface ResumeProjectEntry {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  url: string | null;
}

export interface ResumeSkillGroup {
  category: string; // ex: "Languages", "Frameworks", "Tools"
  skills: string[];
}

/**
 * Modelul canonic al unui CV în CareerOS.
 * Folosit atât de Builder (features/cv/builder) cât și de
 * Analysis (features/cv/analysis).
 */
export interface Resume {
  id: string;
  userId: string;
  title: string; // ex: "CV - Backend Engineer"
  contact: ResumeContactInfo;
  summary: string | null;
  experience: ResumeExperienceEntry[];
  education: ResumeEducationEntry[];
  projects: ResumeProjectEntry[];
  skills: ResumeSkillGroup[];
  languages: string[];

  templateId: string; // referință către features/cv/templates
  createdAt: string;
  updatedAt: string;
}

// ────────────────────────────────────────────────────────────
// CV Analyzer / ATS
// ────────────────────────────────────────────────────────────

/**
 * Rezultatul analizei ATS (Applicant Tracking System) asupra unui CV,
 * opțional comparat cu un Job specific.
 *
 * TODO: implementat în services/ai/ats-analyzer.ts
 */
export interface AtsAnalysisResult {
  score: number; // 0-100
  passesAts: boolean;
  missingKeywords: string[];
  matchedKeywords: string[];
  formattingIssues: string[];
  recommendations: string[];
}

/**
 * Input pentru Resume Optimizer AI — optimizează un CV
 * pentru un job specific.
 *
 * TODO: implementat în services/ai/resume-optimizer.ts
 */
export interface ResumeOptimizationInput {
  resume: Resume;
  targetJobId?: string;
  targetJobDescription?: string;
}

/**
 * Rezultatul optimizării — sugestii concrete, per secțiune.
 *
 * TODO: implementat în services/ai/resume-optimizer.ts
 */
export interface ResumeOptimizationResult {
  overallScore: number; // 0-100
  suggestions: {
    section: "summary" | "experience" | "skills" | "education" | "projects";
    entryId?: string; // referință la ResumeExperienceEntry.id etc.
    suggestion: string;
    reason: string;
  }[];
}

// ────────────────────────────────────────────────────────────
// Cover Letter
// ────────────────────────────────────────────────────────────

/**
 * Input pentru generarea unei scrisori de intenție.
 *
 * TODO: implementat în services/ai/cover-letter.ts
 */
export interface CoverLetterInput {
  resume: Resume;
  jobId: string;
  jobTitle: string;
  companyName: string;
  tone?: "formal" | "friendly" | "confident" | "concise";
}

/**
 * Rezultatul generării unei scrisori de intenție.
 *
 * TODO: implementat în services/ai/cover-letter.ts
 */
export interface CoverLetterResult {
  content: string;
  tone: string;
  generatedAt: string; // ISO date
}