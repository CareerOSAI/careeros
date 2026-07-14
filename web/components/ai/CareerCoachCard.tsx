"use client";

/**
 * components/ai/CareerCoachCard.tsx
 *
 * Afișează sfaturi de carieră personalizate, generate de
 * services/ai/career-coach.ts.
 *
 * STARE ACTUALĂ: schelet vizual. services/ai/career-coach.ts e încă
 * neimplementat (aruncă "Not implemented").
 *
 * TODO când AI-ul e implementat:
 * - primește un CareerCoachResult (din useCareerCoach().askCoach())
 * - afișează summary + advice[] grupate pe categorie, cu priority
 */

import { Compass } from "lucide-react";

export default function CareerCoachCard() {
  return (
    <div className="rounded-2xl border border-dashed border-border bg-card p-6">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Compass size={18} />
        <h3 className="font-semibold">Career Coach</h3>
      </div>
      <p className="mt-3 text-sm text-muted-foreground">
        Coming soon — get personalized career advice based on your goals and activity.
      </p>
    </div>
  );
}