"use client";

/**
 * components/ai/SkillGapCard.tsx
 *
 * Afișează skill-urile lipsă între CV-ul userului și un job (sau
 * un rol țintă), calculate de services/ai/skill-gap.ts.
 *
 * STARE ACTUALĂ: schelet vizual. Partea determinstă
 * (extractMissingSkillsForJob) e funcțională, dar analiza completă
 * cu recomandări (analyzeSkillGap) e încă neimplementată.
 *
 * TODO când AI-ul e implementat:
 * - primește un SkillGapResult (din useSkillGap().analyze())
 * - afișează missingSkills ca listă de badge-uri
 * - afișează recommendations cu priority (low/medium/high)
 */

import { TrendingUp } from "lucide-react";

type Props = {
  missingSkills?: string[];
};

export default function SkillGapCard({ missingSkills }: Props) {
  const hasQuickData = missingSkills && missingSkills.length > 0;

  return (
    <div className="rounded-2xl border border-dashed border-border bg-card p-6">
      <div className="flex items-center gap-2 text-muted-foreground">
        <TrendingUp size={18} />
        <h3 className="font-semibold">Skill Gap</h3>
      </div>

      {hasQuickData ? (
        <div className="mt-3 flex flex-wrap gap-2">
          {missingSkills!.map((skill) => (
            <span
              key={skill}
              className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground"
            >
              {skill}
            </span>
          ))}
        </div>
      ) : (
        <p className="mt-3 text-sm text-muted-foreground">
          Coming soon — upload your CV to see which skills to focus on.
        </p>
      )}
    </div>
  );
}