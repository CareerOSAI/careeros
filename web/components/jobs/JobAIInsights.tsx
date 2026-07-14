"use client";

/**
 * components/jobs/JobAIInsights.tsx
 *
 * Secțiune de insight-uri AI pentru un job specific, afișată pe
 * pagina de detalii (app/(app)/jobs/[id]/page.tsx).
 *
 * STARE ACTUALĂ: schelet vizual. services/ai/match-score.ts și
 * services/ai/skill-gap.ts sunt încă neimplementate (aruncă
 * "Not implemented"), și nu există încă un flux de CV/Resume conectat
 * la Job Tracker — de aceea componenta arată "Coming soon" în loc să
 * apeleze AI-ul și să crape.
 *
 * TODO când CV/Resume + AI real sunt gata:
 * - preia Resume-ul userului (din context sau props)
 * - apelează useMatchScore().compute(job-ul mapat la SearchedJob, resume)
 * - apelează useSkillGap().analyze({ resume, targetRole: job.position })
 * - înlocuiește stările "Coming soon" cu rezultatele reale
 */

import { Sparkles, Target, TrendingUp } from "lucide-react";
import type { Job } from "@/types/job";

type Props = {
  job: Job;
};

export default function JobAIInsights({ job }: Props) {
  return (
    <section className="rounded-3xl border border-border bg-card p-8">
      <div className="flex items-center gap-2">
        <Sparkles size={20} className="text-primary" />
        <h2 className="text-2xl font-bold">AI Insights</h2>
      </div>

      <p className="mt-2 text-sm text-muted-foreground">
        Personalized analysis for this application, powered by AI.
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-dashed border-border p-6">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Target size={18} />
            <h3 className="font-semibold">Match Score</h3>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            Coming soon — upload your CV to see how well you match this role.
          </p>
        </div>

        <div className="rounded-2xl border border-dashed border-border p-6">
          <div className="flex items-center gap-2 text-muted-foreground">
            <TrendingUp size={18} />
            <h3 className="font-semibold">Skill Gap</h3>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            Coming soon — see which skills to focus on for {job.position}.
          </p>
        </div>
      </div>
    </section>
  );
}