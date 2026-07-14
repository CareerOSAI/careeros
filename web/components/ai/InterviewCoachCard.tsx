"use client";

/**
 * components/ai/InterviewCoachCard.tsx
 *
 * Punct de start pentru o sesiune de simulare de interviu, generată
 * de services/ai/interview-coach.ts.
 *
 * STARE ACTUALĂ: schelet vizual. services/ai/interview-coach.ts e
 * încă neimplementat (aruncă "Not implemented"), și nu există încă
 * un ecran features/interview/ care să afișeze sesiunea propriu-zisă.
 *
 * TODO când AI-ul + features/interview/ sunt gata:
 * - buton declanșează generateInterviewSession() cu jobTitle/technologies
 * - navighează către ecranul de sesiune (features/interview/questions)
 */

import { MessagesSquare } from "lucide-react";

type Props = {
  jobTitle?: string;
};

export default function InterviewCoachCard({ jobTitle }: Props) {
  return (
    <div className="rounded-2xl border border-dashed border-border bg-card p-6">
      <div className="flex items-center gap-2 text-muted-foreground">
        <MessagesSquare size={18} />
        <h3 className="font-semibold">Interview Practice</h3>
      </div>
      <p className="mt-3 text-sm text-muted-foreground">
        {jobTitle
          ? `Coming soon — practice interview questions for "${jobTitle}".`
          : "Coming soon — practice interview questions tailored to this role."}
      </p>
    </div>
  );
}