"use client";

/**
 * components/ai/MatchScoreCard.tsx
 *
 * Afișează scorul de compatibilitate (Match Score) al userului
 * pentru un job, calculat de services/ai/match-score.ts.
 *
 * STARE ACTUALĂ: schelet vizual. services/ai/match-score.ts e încă
 * neimplementat (aruncă "Not implemented"), deci componenta arată
 * "Coming soon" în loc să apeleze AI-ul.
 *
 * TODO când AI-ul e implementat:
 * - primește jobTitle + un MatchScoreResult (din useMatchScore)
 * - afișează overall + breakdown (skillsMatch, experienceMatch, etc.)
 *   folosind formatScorePercent/getScoreQualityLabel din utils/formatters.ts
 */

import { Target } from "lucide-react";

type Props = {
  jobTitle?: string;
};

export default function MatchScoreCard({ jobTitle }: Props) {
  return (
    <div className="rounded-2xl border border-dashed border-border bg-card p-6">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Target size={18} />
        <h3 className="font-semibold">Match Score</h3>
      </div>
      <p className="mt-3 text-sm text-muted-foreground">
        {jobTitle
          ? `Coming soon — see how well you match "${jobTitle}".`
          : "Coming soon — upload your CV to see your match score."}
      </p>
    </div>
  );
}