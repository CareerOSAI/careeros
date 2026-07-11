"use client";

import { ExternalLink, MapPin, Plus } from "lucide-react";
import { SearchedJob, WorkType, ExperienceLevel } from "@/types/jobSearch";

type Props = {
  job: SearchedJob;
  onAdd: (job: SearchedJob) => void;
  added: boolean;
};

const WORK_TYPE_COLORS: Record<WorkType, string> = {
  Remote: "bg-green-500/10 text-green-500",
  Hybrid: "bg-blue-500/10 text-blue-500",
  "On-site": "bg-orange-500/10 text-orange-500",
};

const LEVEL_COLORS: Record<ExperienceLevel, string> = {
  Junior: "bg-teal-500/10 text-teal-500",
  Mid: "bg-yellow-500/10 text-yellow-500",
  Senior: "bg-purple-500/10 text-purple-500",
  Lead: "bg-red-500/10 text-red-500",
  Unclear: "bg-muted text-muted-foreground",
};

export default function SearchedJobCard({ job, onAdd, added }: Props) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold">{job.title}</h3>
          <p className="text-muted-foreground">{job.company}</p>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${WORK_TYPE_COLORS[job.workType]}`}>
          {job.workType}
        </span>

        {job.experienceLevel !== "Unclear" && (
          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${LEVEL_COLORS[job.experienceLevel]}`}>
            {job.experienceLevel}
          </span>
        )}

        <span className="flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin size={14} />
          {job.country}
        </span>
      </div>

      {job.tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {job.tags.slice(0, 6).map((tag, i) => (
            <span key={i} className="rounded-full border border-border px-2 py-0.5 text-xs text-muted-foreground">
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="mt-5 flex gap-3">
        
          <a
          href={job.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-xl border border-border px-4 py-2 text-sm transition hover:bg-accent"
        >
          <ExternalLink size={14} />
          View
        </a>

        <button
          onClick={() => onAdd(job)}
          disabled={added}
          className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90 disabled:opacity-50"
        >
          <Plus size={14} />
          {added ? "Added" : "Add to Tracker"}
        </button>
      </div>
    </div>
  );
}