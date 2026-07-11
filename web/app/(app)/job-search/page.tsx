"use client";

import { useEffect, useMemo, useState } from "react";
import { Search, Loader2, SlidersHorizontal } from "lucide-react";
import { toast } from "sonner";

import { SearchedJob, WorkType, ExperienceLevel } from "@/types/jobSearch";
import { useJobs } from "@/context/JobsContext";
import SearchedJobCard from "@/components/job-search/SearchedJobCard";

type SortOption = "newest" | "oldest";

const STORAGE_KEY = "careeros_job_search_state";

export default function JobSearchPage() {
  const { addJob } = useJobs();

  const [query, setQuery] = useState("");
  const [jobs, setJobs] = useState<SearchedJob[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [addedIds, setAddedIds] = useState<Set<string>>(new Set());

  const [workType, setWorkType] = useState<WorkType | "All">("All");
  const [country, setCountry] = useState("All");
  const [level, setLevel] = useState<ExperienceLevel | "All">("All");
  const [sortBy, setSortBy] = useState<SortOption>("newest");

  // Restore state on mount
  useEffect(() => {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (!saved) return;

    try {
      const parsed = JSON.parse(saved);
      setQuery(parsed.query ?? "");
      setJobs(parsed.jobs ?? []);
      setSearched(parsed.searched ?? false);
      setAddedIds(new Set(parsed.addedIds ?? []));
      setWorkType(parsed.workType ?? "All");
      setCountry(parsed.country ?? "All");
      setLevel(parsed.level ?? "All");
      setSortBy(parsed.sortBy ?? "newest");
    } catch {
      // ignore corrupted state
    }
  }, []);

  // Save state whenever it changes
  useEffect(() => {
    sessionStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        query,
        jobs,
        searched,
        addedIds: Array.from(addedIds),
        workType,
        country,
        level,
        sortBy,
      })
    );
  }, [query, jobs, searched, addedIds, workType, country, level, sortBy]);

  const handleSearch = async () => {
    setLoading(true);
    setSearched(true);

    try {
      const res = await fetch(`/api/job-search?q=${encodeURIComponent(query)}`);
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error ?? "Failed to search jobs.");
        return;
      }

      setJobs(data.jobs);
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const stripHtml = (html: string) => {
    return html
      .replace(/<[^>]*>/g, " ")
      .replace(/&nbsp;/g, " ")
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/\s+/g, " ")
      .trim();
  };

  const handleAdd = async (job: SearchedJob) => {
    await addJob({
      id: crypto.randomUUID(),
      company: job.company,
      position: job.title,
      location: job.location,
      link: job.url,
      notes: stripHtml(job.description).slice(0, 500),
      status: "Wishlist",
    } as any);

    setAddedIds((prev) => new Set(prev).add(job.id));
    toast.success("Job added to your tracker!");
  };

  const uniqueCountries = useMemo(() => {
    const set = new Set(jobs.map((j) => j.country));
    return Array.from(set).sort();
  }, [jobs]);

  const filteredJobs = useMemo(() => {
    const filtered = jobs.filter((job) => {
      const matchesWorkType = workType === "All" || job.workType === workType;
      const matchesCountry = country === "All" || job.country === country;
      const matchesLevel = level === "All" || job.experienceLevel === level;
      return matchesWorkType && matchesCountry && matchesLevel;
    });

    return [...filtered].sort((a, b) => {
      if (!a.postedAt) return 1;
      if (!b.postedAt) return -1;
      const diff = new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime();
      return sortBy === "newest" ? diff : -diff;
    });
  }, [jobs, workType, country, level, sortBy]);

  const activeFilterCount = [workType !== "All", country !== "All", level !== "All"].filter(Boolean).length;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold">Job Search</h1>
        <p className="mt-2 text-muted-foreground">
          Find jobs in Romania and remote positions worldwide.
        </p>
      </div>

      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch();
            }}
            placeholder="e.g. React developer, DevOps, UI/UX..."
            className="h-12 w-full rounded-xl border border-border bg-card pl-11 pr-4 outline-none transition focus:border-primary"
          />
        </div>

        <button
          onClick={handleSearch}
          disabled={loading}
          className="rounded-xl bg-primary px-6 font-medium text-primary-foreground transition hover:opacity-90 disabled:opacity-50"
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      {jobs.length > 0 && (
        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="flex items-center gap-2">
            <SlidersHorizontal size={18} className="text-muted-foreground" />
            <h2 className="text-lg font-semibold">Filters</h2>
            {activeFilterCount > 0 && (
              <span className="rounded-full bg-primary px-2 py-0.5 text-xs font-semibold text-primary-foreground">
                {activeFilterCount}
              </span>
            )}
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <select
              value={workType}
              onChange={(e) => setWorkType(e.target.value as WorkType | "All")}
              className="rounded-xl border border-border bg-background px-4 py-2.5"
            >
              <option value="All">All Work Types</option>
              <option value="Remote">Remote</option>
              <option value="Hybrid">Hybrid</option>
              <option value="On-site">On-site</option>
            </select>

            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="rounded-xl border border-border bg-background px-4 py-2.5"
            >
              <option value="All">All Countries</option>
              {uniqueCountries.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>

            <select
              value={level}
              onChange={(e) => setLevel(e.target.value as ExperienceLevel | "All")}
              className="rounded-xl border border-border bg-background px-4 py-2.5"
            >
              <option value="All">All Levels</option>
              <option value="Junior">Junior</option>
              <option value="Mid">Mid</option>
              <option value="Senior">Senior</option>
              <option value="Lead">Lead</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="rounded-xl border border-border bg-background px-4 py-2.5"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>

            <span className="ml-auto text-sm text-muted-foreground">
              {filteredJobs.length} job{filteredJobs.length !== 1 ? "s" : ""}
            </span>
          </div>
        </div>
      )}

      {loading && (
        <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
          <Loader2 size={32} className="animate-spin" />
          <p className="mt-4">Searching for jobs...</p>
        </div>
      )}

      {!loading && searched && filteredJobs.length === 0 && (
        <p className="text-center text-muted-foreground">
          No jobs found. Try a different search term or fewer filters.
        </p>
      )}

      {!loading && filteredJobs.length > 0 && (
        <div className="grid gap-4 lg:grid-cols-2">
          {filteredJobs.map((job) => (
            <SearchedJobCard key={job.id} job={job} onAdd={handleAdd} added={addedIds.has(job.id)} />
          ))}
        </div>
      )}
    </div>
  );
}