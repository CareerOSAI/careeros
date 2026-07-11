"use client";

/**
 * hooks/useSkillGap.ts
 *
 * Hook pentru analiza skill gap-ului dintre CV-ul userului și un
 * job specific (sau un rol țintă generic), folosind
 * services/ai/skill-gap.ts.
 *
 * NOTĂ: services/ai/skill-gap.ts e încă schelet (aruncă
 * "Not implemented") — acest hook e pregătit structural, dar va
 * arunca eroare până la implementarea reală a serviciului AI.
 * Partea determinstă (extractMissingSkillsForJob) e însă complet
 * funcțională de pe acum.
 */

import { useState, useCallback } from "react";
import type { SearchedJob } from "@/types/jobSearch";
import type { Resume } from "@/types/resume";
import {
  analyzeSkillGap,
  extractMissingSkillsForJob,
  type SkillGapInput,
  type SkillGapResult,
} from "@/services/jobs/ai/skill-gap";

interface UseSkillGapResult {
  result: SkillGapResult | null;
  quickMissingSkills: string[];
  loading: boolean;
  error: string | null;
  analyze: (input: SkillGapInput) => Promise<void>;
  computeQuickGap: (resume: Resume, job: SearchedJob) => void;
}

export default function useSkillGap(): UseSkillGapResult {
  const [result, setResult] = useState<SkillGapResult | null>(null);
  const [quickMissingSkills, setQuickMissingSkills] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analyze = useCallback(async (input: SkillGapInput) => {
    setLoading(true);
    setError(null);

    try {
      const analysis = await analyzeSkillGap(input);
      setResult(analysis);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to analyze skill gap.");
    } finally {
      setLoading(false);
    }
  }, []);

  const computeQuickGap = useCallback((resume: Resume, job: SearchedJob) => {
    setQuickMissingSkills(extractMissingSkillsForJob(resume, job));
  }, []);

  return { result, quickMissingSkills, loading, error, analyze, computeQuickGap };
}