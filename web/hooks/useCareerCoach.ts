"use client";

/**
 * hooks/useCareerCoach.ts
 *
 * Hook pentru obținerea de sfaturi de carieră personalizate,
 * folosind services/ai/career-coach.ts.
 *
 * NOTĂ: services/ai/career-coach.ts e încă schelet (aruncă
 * "Not implemented") — acest hook e pregătit structural, dar va
 * arunca eroare până la implementarea reală a serviciului AI.
 */

import { useState, useCallback } from "react";
import type { CareerProfile, CareerAdvice, CareerCoachResult } from "@/types/career";
import {
  getCareerAdvice,
  getCareerAdviceForCategory,
  type CareerCoachInput,
} from "@/services/jobs/ai/career-coach";

interface UseCareerCoachResult {
  result: CareerCoachResult | null;
  categoryAdvice: CareerAdvice[];
  loading: boolean;
  error: string | null;
  askCoach: (input: CareerCoachInput) => Promise<void>;
  askForCategory: (profile: CareerProfile, category: CareerAdvice["category"]) => Promise<void>;
}

export default function useCareerCoach(): UseCareerCoachResult {
  const [result, setResult] = useState<CareerCoachResult | null>(null);
  const [categoryAdvice, setCategoryAdvice] = useState<CareerAdvice[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const askCoach = useCallback(async (input: CareerCoachInput) => {
    setLoading(true);
    setError(null);

    try {
      const advice = await getCareerAdvice(input);
      setResult(advice);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to get career advice.");
    } finally {
      setLoading(false);
    }
  }, []);

  const askForCategory = useCallback(
    async (profile: CareerProfile, category: CareerAdvice["category"]) => {
      setLoading(true);
      setError(null);

      try {
        const advice = await getCareerAdviceForCategory(profile, category);
        setCategoryAdvice(advice);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to get career advice.");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { result, categoryAdvice, loading, error, askCoach, askForCategory };
}