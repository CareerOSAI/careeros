"use client";

import { useMemo, useState } from "react";
import { Star, SlidersHorizontal } from "lucide-react";

import JobForm from "@/components/jobs/JobForm";
import JobList from "@/components/jobs/JobList";
import JobStats from "@/components/jobs/JobStats";
import SearchBar from "@/components/jobs/SearchBar";
import StatusFilter from "@/components/jobs/StatusFilter";
import CompanyFilter from "@/components/jobs/CompanyFilter";
import LocationFilter from "@/components/jobs/LocationFilter";
import PriorityFilter from "@/components/jobs/PriorityFilter";
import SortSelect, { SortOption } from "@/components/jobs/SortSelect";

import { useJobs } from "@/context/JobsContext";
import { JobStatus, JobPriority } from "@/types/job";
import { sortJobs } from "@/utils/sortJobs";

export default function JobsPage() {
  const { jobs } = useJobs();

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<JobStatus | "All">("All");
  const [company, setCompany] = useState("All");
  const [location, setLocation] = useState("All");
  const [priority, setPriority] = useState<JobPriority | "All">("All");
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [favoritesOnly, setFavoritesOnly] = useState(false);

  const uniqueCompanies = useMemo(() => {
    const set = new Set(jobs.map((job) => job.company));
    return Array.from(set).sort();
  }, [jobs]);

  const uniqueLocations = useMemo(() => {
    const set = new Set(
      jobs
        .map((job) => job.location)
        .filter((loc): loc is string => Boolean(loc))
    );
    return Array.from(set).sort();
  }, [jobs]);

  const filteredJobs = useMemo(() => {
    const filtered = jobs.filter((job) => {
      const matchesSearch =
        job.company.toLowerCase().includes(search.toLowerCase()) ||
        job.position.toLowerCase().includes(search.toLowerCase());

      const matchesStatus = status === "All" || job.status === status;
      const matchesCompany = company === "All" || job.company === company;
      const matchesLocation = location === "All" || job.location === location;
      const matchesPriority = priority === "All" || job.priority === priority;
      const matchesFavorite = !favoritesOnly || job.favorite === true;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesCompany &&
        matchesLocation &&
        matchesPriority &&
        matchesFavorite
      );
    });

    return sortJobs(filtered, sortBy);
  }, [
    jobs,
    search,
    status,
    company,
    location,
    priority,
    sortBy,
    favoritesOnly,
  ]);

  const activeFilterCount = [
    status !== "All",
    company !== "All",
    location !== "All",
    priority !== "All",
    favoritesOnly,
  ].filter(Boolean).length;

  const resetFilters = () => {
    setSearch("");
    setStatus("All");
    setCompany("All");
    setLocation("All");
    setPriority("All");
    setFavoritesOnly(false);
    setSortBy("newest");
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold">Job Tracker</h1>
        <p className="mt-2 text-muted-foreground">
          Track every application in one place.
        </p>
      </div>

      <JobStats jobs={jobs} />

      <JobForm />

      {/* FILTERS CARD */}
      <div className="rounded-2xl border border-border bg-card p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <SlidersHorizontal size={18} className="text-muted-foreground" />
            <h2 className="text-lg font-semibold">Filters</h2>
            {activeFilterCount > 0 && (
              <span className="rounded-full bg-primary px-2 py-0.5 text-xs font-semibold text-primary-foreground">
                {activeFilterCount}
              </span>
            )}
          </div>

          {activeFilterCount > 0 && (
            <button
              onClick={resetFilters}
              className="text-sm text-muted-foreground underline-offset-2 hover:text-foreground hover:underline"
            >
              Clear all
            </button>
          )}
        </div>

        <div className="mt-4">
          <SearchBar value={search} onChange={setSearch} />
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <StatusFilter value={status} onChange={setStatus} />
          <CompanyFilter
            value={company}
            onChange={setCompany}
            companies={uniqueCompanies}
          />
          <LocationFilter
            value={location}
            onChange={setLocation}
            locations={uniqueLocations}
          />
          <PriorityFilter value={priority} onChange={setPriority} />
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <SortSelect value={sortBy} onChange={setSortBy} />

          <button
            onClick={() => setFavoritesOnly((prev) => !prev)}
            className={`flex items-center gap-2 rounded-2xl border px-5 py-3 text-sm font-medium transition ${
              favoritesOnly
                ? "border-yellow-400 bg-yellow-400/10 text-yellow-400"
                : "border-border bg-background text-muted-foreground hover:bg-muted"
            }`}
          >
            <Star
              size={16}
              className={
                favoritesOnly ? "fill-yellow-400 text-yellow-400" : ""
              }
            />
            Favorites Only
          </button>
        </div>
      </div>

      <JobList jobs={filteredJobs} />
    </div>
  );
}