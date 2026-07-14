/**
 * features/cv/analysis/index.ts
 *
 * Analiza unui Resume — combină ce există deja (CV Analyzer real,
 * app/(app)/cv-analyzer/, bazat pe Gemini + unpdf) cu servicii AI
 * noi din services/ai/ (resume-optimizer.ts, ats-analyzer.ts),
 * ambele încă schelet.
 *
 * NOTĂ: CV Analyzer existent lucrează direct pe un PDF încărcat, NU
 * pe un obiect Resume structurat din features/cv/builder/. Dacă
 * builder-ul devine funcțional, acest modul ar trebui să unifice
 * cele două fluxuri (PDF analizat vs. Resume construit în aplicație).
 *
 * TODO: apelează optimizeResume() / analyzeAtsCompatibility() din
 * services/ai/ odată implementate, pentru un Resume structurat.
 */

export type { AtsAnalysisResult, ResumeOptimizationResult } from "@/types/resume";

// TODO: <ResumeAnalysisPanel resume={Resume} targetJob?: SearchedJob />