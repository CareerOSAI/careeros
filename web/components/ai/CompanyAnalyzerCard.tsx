"use client";

/**
 * components/ai/CompanyAnalyzerCard.tsx
 *
 * Afișează analiza unei companii (cultură, semnale de creștere,
 * riscuri), generată de services/ai/company-analyzer.ts.
 *
 * STARE ACTUALĂ: schelet vizual. services/ai/company-analyzer.ts e
 * încă neimplementat (aruncă "Not implemented").
 *
 * TODO când AI-ul e implementat:
 * - primește un CompanyAnalysisResult (din serviciu, apelat cu
 *   buildCompanyFromJob sau un Company real dacă există)
 * - afișează summary, cultureSignals, growthSignals, riskFlags,
 *   overallScore
 */

import { Building2 } from "lucide-react";

type Props = {
  companyName?: string;
};

export default function CompanyAnalyzerCard({ companyName }: Props) {
  return (
    <div className="rounded-2xl border border-dashed border-border bg-card p-6">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Building2 size={18} />
        <h3 className="font-semibold">Company Insights</h3>
      </div>
      <p className="mt-3 text-sm text-muted-foreground">
        {companyName
          ? `Coming soon — learn more about ${companyName}'s culture and growth signals.`
          : "Coming soon — get AI-generated insights about this company."}
      </p>
    </div>
  );
}