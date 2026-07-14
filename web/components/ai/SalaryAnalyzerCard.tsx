"use client";

/**
 * components/ai/SalaryAnalyzerCard.tsx
 *
 * Afișează analiza de salariu (sub/la/peste piață) pentru un job,
 * calculată de services/ai/salary-analyzer.ts.
 *
 * STARE ACTUALĂ: schelet vizual. services/ai/salary-analyzer.ts e
 * încă neimplementat (aruncă "Not implemented").
 *
 * TODO când AI-ul e implementat:
 * - primește un SalaryAnalysisResult (din serviciu, apelat cu
 *   buildSalaryAnalysisInputFromJob)
 * - afișează verdict (below_market/at_market/above_market) cu
 *   culoare corespunzătoare, plus marketMin/Max/Median și explanation
 */

import { DollarSign } from "lucide-react";

type Props = {
  offeredSalary?: string;
};

export default function SalaryAnalyzerCard({ offeredSalary }: Props) {
  return (
    <div className="rounded-2xl border border-dashed border-border bg-card p-6">
      <div className="flex items-center gap-2 text-muted-foreground">
        <DollarSign size={18} />
        <h3 className="font-semibold">Salary Analysis</h3>
      </div>
      <p className="mt-3 text-sm text-muted-foreground">
        {offeredSalary
          ? `Coming soon — see how ${offeredSalary} compares to the market.`
          : "Coming soon — compare this offer against market data."}
      </p>
    </div>
  );
}