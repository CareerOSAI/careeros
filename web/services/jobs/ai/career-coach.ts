/**
 * services/ai/career-coach.ts
 *
 * Oferă sfaturi de carieră personalizate (strategie de căutare,
 * dezvoltare de skill-uri, networking, negociere etc.), folosind AI,
 * pe baza profilului de carieră al userului.
 *
 * NU implementează logica de business încă — doar fundația.
 * Fără UI aici.
 */

import type {
  CareerProfile,
  CareerCoachInput,
  CareerCoachResult,
  CareerAdvice,
} from "@/types/career";

export type { CareerCoachInput, CareerCoachResult };

export async function getCareerAdvice(input: CareerCoachInput): Promise<CareerCoachResult> {
  throw new Error("Not implemented: getCareerAdvice (services/ai/career-coach.ts)");
}

export async function getCareerAdviceForCategory(
  profile: CareerProfile,
  category: CareerAdvice["category"]
): Promise<CareerAdvice[]> {
  throw new Error("Not implemented: getCareerAdviceForCategory (services/ai/career-coach.ts)");
}