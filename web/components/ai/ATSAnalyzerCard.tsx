"use client";

/**
 * components/ai/ATSAnalyzerCard.tsx
 *
 * Afișează compatibilitatea CV-ului cu sisteme ATS, calculată de
 * services/ai/ats-analyzer.ts.
 *
 * STARE ACTUALĂ: schelet vizual. services/ai/ats-analyzer.ts e încă
 * neimplementat (aruncă "Not implemented").
 *
 * NOTĂ: distinct de CV Analyzer existent (app/(app)/cv-analyzer/,
 * care folosește Gemini pentru scor ATS general) — acesta e gândit
 * pentru compatibilitate ATS față de UN job specific (cuvinte cheie
 * lipsă relevante acelui job), nu o analiză generică de CV.
 *
 * TODO când AI-ul e implementat:
 * - primește un AtsAnalysisResult (din serviciu)
 * - afișează score, passesAts, missingKeywords, formattingIssues
 */

import { CheckCircle2 } from "lucide-react";

type Props = {
  jobTitle?: string;
};

export default function ATSAnalyzerCard({ jobTitle }: Props) {
  return (
    <div className="rounded-2xl border border-dashed border-border bg-card p-6">
      <div className="flex items-center gap-2 text-muted-foreground">
        <CheckCircle2 size={18} />
        <h3 className="font-semibold">ATS Compatibility</h3>
      </div>
      <p className="mt-3 text-sm text-muted-foreground">
        {jobTitle
          ? `Coming soon — check your CV's keyword match for "${jobTitle}".`
          : "Coming soon — check if your CV passes ATS filters for this job."}
      </p>
    </div>
  );
}