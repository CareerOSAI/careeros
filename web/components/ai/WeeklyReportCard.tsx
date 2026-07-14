"use client";

/**
 * components/ai/WeeklyReportCard.tsx
 *
 * Afișează raportul săptămânal (rezumat + recomandări), generat de
 * services/ai/weekly-report.ts.
 *
 * STARE ACTUALĂ: schelet vizual pentru partea narativă AI
 * (generateWeeklyReport e neimplementat). Partea de METRICI
 * (buildWeeklyMetrics, folosind utils/jobStats.ts existent) e deja
 * funcțională — poate fi conectată acum dacă se dorește un preview
 * cu numere reale, chiar înainte ca rezumatul narativ AI să existe.
 *
 * TODO când AI-ul e implementat:
 * - apelează buildWeeklyMetrics(jobs, roadmapItemsCompleted) apoi
 *   generateWeeklyReport() pentru rezumat narativ complet
 */

import { CalendarDays } from "lucide-react";

type Props = {
  jobsApplied?: number;
};

export default function WeeklyReportCard({ jobsApplied }: Props) {
  return (
    <div className="rounded-2xl border border-dashed border-border bg-card p-6">
      <div className="flex items-center gap-2 text-muted-foreground">
        <CalendarDays size={18} />
        <h3 className="font-semibold">Weekly Report</h3>
      </div>
      <p className="mt-3 text-sm text-muted-foreground">
        {typeof jobsApplied === "number"
          ? `Coming soon — a full summary of your ${jobsApplied} application${jobsApplied !== 1 ? "s" : ""} this week.`
          : "Coming soon — a weekly summary of your job search activity."}
      </p>
    </div>
  );
}