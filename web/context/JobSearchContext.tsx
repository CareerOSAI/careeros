"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

import { SearchedJob, WorkType, ExperienceLevel } from "@/types/jobSearch";

export type JobSearchFilters = {
  workType: WorkType | "All";
  country: string;
  level: ExperienceLevel | "All";
  sortBy: "newest" | "oldest";
};

const DEFAULT_FILTERS: JobSearchFilters = {
  workType: "All",
  country: "All",
  level: "All",
  sortBy: "newest",
};

type JobSearchContextType = {
  query: string;
  setQuery: (query: string) => void;
  results: SearchedJob[];
  setResults: (jobs: SearchedJob[]) => void;
  filters: JobSearchFilters;
  updateFilters: (partial: Partial<JobSearchFilters>) => void;
  resetFilters: () => void;
  hasSearched: boolean;
  setHasSearched: (value: boolean) => void;
  addedIds: Set<string>;
  markAdded: (id: string) => void;
};

const STORAGE_KEY = "careeros_job_search_context";

const JobSearchContext = createContext<JobSearchContextType | undefined>(
  undefined
);

export function JobSearchProvider({ children }: { children: ReactNode }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchedJob[]>([]);
  const [filters, setFilters] = useState<JobSearchFilters>(DEFAULT_FILTERS);
  const [hasSearched, setHasSearched] = useState(false);
  const [addedIds, setAddedIds] = useState<Set<string>>(new Set());
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const saved = sessionStorage.getItem(STORAGE_KEY);

    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setQuery(parsed.query ?? "");
        setResults(parsed.results ?? []);
        setFilters(parsed.filters ?? DEFAULT_FILTERS);
        setHasSearched(parsed.hasSearched ?? false);
        setAddedIds(new Set(parsed.addedIds ?? []));
      } catch {
        // ignore corrupted state
      }
    }

    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;

    sessionStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        query,
        results,
        filters,
        hasSearched,
        addedIds: Array.from(addedIds),
      })
    );
  }, [query, results, filters, hasSearched, addedIds, hydrated]);

  const updateFilters = (partial: Partial<JobSearchFilters>) => {
    setFilters((prev) => ({ ...prev, ...partial }));
  };

  const resetFilters = () => {
    setFilters(DEFAULT_FILTERS);
  };

  const markAdded = (id: string) => {
    setAddedIds((prev) => new Set(prev).add(id));
  };

  return (
    <JobSearchContext.Provider
      value={{
        query,
        setQuery,
        results,
        setResults,
        filters,
        updateFilters,
        resetFilters,
        hasSearched,
        setHasSearched,
        addedIds,
        markAdded,
      }}
    >
      {children}
    </JobSearchContext.Provider>
  );
}

export function useJobSearchContext() {
  const context = useContext(JobSearchContext);
  if (!context) {
    throw new Error(
      "useJobSearchContext must be used inside JobSearchProvider"
    );
  }
  return context;
}