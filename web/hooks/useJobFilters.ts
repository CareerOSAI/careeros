"use client";

/**
 * hooks/useJobFilters.ts
 *
 * Hook pentru gestionarea filtrelor peste rezultatele de search
 * (SearchedJob), folosind services/jobs/filters/index.ts.
 *
 * NOTĂ: app/(app)/job-search/page.tsx are deja propria logică de
 * filtrare inline, funcțională, și NU a fost modificată să
 * folosească acest hook. Acesta e disponibil pentru refolosire
 * viitoare (ex: alt ecran care afișează SearchedJob) fără a risca
 * să strice pagina existentă.
 */

import { useMemo, useState } from "react";
import type { SearchedJob } from "@/types/jobSearch";
import {
  filterJobs,
  extractUniqueCountries,
  countActiveFilters,
  type JobFilterCriteria,
} from "@/services/jobs/filters";

interface UseJobFiltersResult {
  criteria: JobFilterCriteria;
  setCriteria: (criteria: JobFilterCriteria) => void;
  updateCriteria: (partial: Partial<JobFilterCriteria>) => void;
  filteredJobs: SearchedJob[];
  availableCountries: string[];
  activeFilterCount: number;
  resetFilters: () => void;
}

const DEFAULT_CRITERIA: JobFilterCriteria = {
  workType: "All",
  country: "All",
  experienceLevel: "All",
};

export default function useJobFilters(jobs: SearchedJob[]): UseJobFiltersResult {
  const [criteria, setCriteria] = useState<JobFilterCriteria>(DEFAULT_CRITERIA);

  const updateCriteria = (partial: Partial<JobFilterCriteria>) => {
    setCriteria((prev) => ({ ...prev, ...partial }));
  };

  const resetFilters = () => setCriteria(DEFAULT_CRITERIA);

  const filteredJobs = useMemo(() => filterJobs(jobs, criteria), [jobs, criteria]);

  const availableCountries = useMemo(() => extractUniqueCountries(jobs), [jobs]);

  const activeFilterCount = useMemo(() => countActiveFilters(criteria), [criteria]);

  return {
    criteria,
    setCriteria,
    updateCriteria,
    filteredJobs,
    availableCountries,
    activeFilterCount,
    resetFilters,
  };
}