"use client";

/**
 * hooks/useJobSearch.ts
 *
 * Hook pentru căutarea de joburi multi-provider (Arbeitnow, Remotive
 * etc.), folosind services/jobs/search/searchEngine.ts printr-un
 * API route (nu apelează Search Engine-ul direct — rulează server-side).
 *
 * NOTĂ: app/(app)/job-search/page.tsx are deja propria logică de
 * fetch inline, funcțională, și NU a fost modificată să folosească
 * acest hook. Acesta e disponibil pentru refolosire viitoare (ex:
 * un widget de căutare rapidă pe Dashboard) fără a risca să strice
 * pagina existentă.
 */

import { useState, useCallback } from "react";
import type { SearchedJob } from "@/types/jobSearch";

interface UseJobSearchResult {
  jobs: SearchedJob[];
  loading: boolean;
  error: string | null;
  search: (query: string) => Promise<void>;
}

export default function useJobSearch(): UseJobSearchResult {
  const [jobs, setJobs] = useState<SearchedJob[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = useCallback(async (query: string) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/job-search?q=${encodeURIComponent(query)}`);
      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Failed to search jobs.");
        return;
      }

      setJobs(data.jobs);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  return { jobs, loading, error, search };
}