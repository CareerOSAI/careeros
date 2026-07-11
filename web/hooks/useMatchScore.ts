"use client";

/**
 * hooks/useMatchScore.ts
 *
 * Hook pentru calcularea AI Match Score-ului unui job față de CV-ul
 * userului, folosind services/ai/match-score.ts.
 *
 * NOTĂ: services/ai/match-score.ts e încă schelet (aruncă
 * "Not implemented") — acest hook e pregătit structural, dar va
 * arunca eroare până la implementarea reală a serviciului AI.
 */

import { useState, useCallback } from "react";
import type { SearchedJob } from "@/types/jobSearch";
import type { Resume } from "@/types/resume";
import {
  calculateMatchScore,
  type MatchScoreResult,
} from "@/services/jobs/ai/match-score";

interface UseMatchScoreResult {
  result: MatchScoreResult | null;
  loading: boolean;
  error: string | null;
  compute: (job: SearchedJob, resume: Resume) => Promise<void>;
}

export default function useMatchScore(): UseMatchScoreResult {
  const [result, setResult] = useState<MatchScoreResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const compute = useCallback(async (job: SearchedJob, resume: Resume) => {
    setLoading(true);
    setError(null);

    try {
      const score = await calculateMatchScore({ job, resume });
      setResult(score);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to calculate match score.");
    } finally {
      setLoading(false);
    }
  }, []);

  return { result, loading, error, compute };
}