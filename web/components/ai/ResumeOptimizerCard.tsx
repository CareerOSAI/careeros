"use client";

/**
 * components/ai/ResumeOptimizerCard.tsx
 *
 * Afișează sugestii de optimizare a CV-ului pentru un job specific,
 * generate de services/ai/resume-optimizer.ts.
 *
 * STARE ACTUALĂ: schelet vizual. services/ai/resume-optimizer.ts e
 * încă neimplementat (aruncă "Not implemented").
 *
 * TODO când AI-ul e implementat:
 * - primește un ResumeOptimizationResult (din serviciu)
 * - afișează overallScore + suggestions grupate pe secțiune
 *   (summary, experience, skills, education, projects)
 */

import { FileText } from "lucide-react";

type Props = {
  jobTitle?: string;
};

export default function ResumeOptimizerCard({ jobTitle }: Props) {
  return (
    <div className="rounded-2xl border border-dashed border-border bg-card p-6">
      <div className="flex items-center gap-2 text-muted-foreground">
        <FileText size={18} />
        <h3 className="font-semibold">Resume Optimizer</h3>
      </div>
      <p className="mt-3 text-sm text-muted-foreground">
        {jobTitle
          ? `Coming soon — get suggestions to tailor your CV for "${jobTitle}".`
          : "Coming soon — upload your CV to get tailored suggestions."}
      </p>
    </div>
  );
}