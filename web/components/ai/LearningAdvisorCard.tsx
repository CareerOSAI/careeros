"use client";

/**
 * components/ai/LearningAdvisorCard.tsx
 *
 * Afișează resurse de învățare recomandate pentru skill-uri lipsă,
 * generate de services/ai/learning-advisor.ts.
 *
 * STARE ACTUALĂ: schelet vizual. services/ai/learning-advisor.ts e
 * încă neimplementat (aruncă "Not implemented").
 *
 * TODO când AI-ul e implementat:
 * - primește un LearningAdvisorResult (din serviciu, apelat cu
 *   buildLearningInputFromSkillGap pe baza unui SkillGapResult)
 * - afișează resources[] ca listă de linkuri, cu format
 *   (video/article/course) și durată estimată
 */

import { GraduationCap } from "lucide-react";

type Props = {
  skill?: string;
};

export default function LearningAdvisorCard({ skill }: Props) {
  return (
    <div className="rounded-2xl border border-dashed border-border bg-card p-6">
      <div className="flex items-center gap-2 text-muted-foreground">
        <GraduationCap size={18} />
        <h3 className="font-semibold">Learning Resources</h3>
      </div>
      <p className="mt-3 text-sm text-muted-foreground">
        {skill
          ? `Coming soon — curated resources to learn ${skill}.`
          : "Coming soon — curated resources based on your skill gaps."}
      </p>
    </div>
  );
}