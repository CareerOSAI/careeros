"use client";

import { useState } from "react";
import Link from "next/link";
import { Star } from "lucide-react";

import { Job, JobStatus, JobPriority } from "@/types/job";
import { useJobs } from "@/context/JobsContext";
import DeleteJobModal from "./DeleteJobModal";
import EditJobModal from "./EditJobModal";

type Props = {
  job: Job;
};

const NEXT_STATUS: Record<JobStatus, JobStatus | null> = {
  Wishlist: "Applied",
  Applied: "Interview",
  Interview: "Offer",
  Offer: "Rejected",
  Rejected: null,
};

const STATUS_COLORS: Record<JobStatus, string> = {
  Wishlist: "bg-violet-600 text-white",
  Applied: "bg-blue-600 text-white",
  Interview: "bg-amber-500 text-black",
  Offer: "bg-green-600 text-white",
  Rejected: "bg-red-600 text-white",
};

const PRIORITY_COLORS: Record<JobPriority, string> = {
  High: "bg-red-500/15 text-red-500 border border-red-500/30",
  Medium: "bg-yellow-500/15 text-yellow-500 border border-yellow-500/30",
  Low: "bg-green-500/15 text-green-500 border border-green-500/30",
};

export default function JobCard({ job }: Props) {
  const { updateJob, deleteJob, toggleFavorite } = useJobs();
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const moveForward = () => {
    const next = NEXT_STATUS[job.status];
    if (!next) return;

    updateJob({
      ...job,
      status: next,
    });
  };

  const handleConfirmDelete = () => {
    deleteJob(job.id);
    setIsDeleteOpen(false);
  };

  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      {/* HEADER */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-xl font-bold">{job.company}</h2>
          <p className="text-muted-foreground">{job.position}</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => toggleFavorite(job.id)}
            aria-label="Toggle favorite"
            className="transition hover:scale-110"
          >
            <Star
              size={20}
              className={
                job.favorite
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-muted-foreground"
              }
            />
          </button>

          {job.priority && (
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${PRIORITY_COLORS[job.priority]}`}
            >
              {job.priority}
            </span>
          )}

          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${STATUS_COLORS[job.status]}`}
          >
            {job.status}
          </span>
        </div>
      </div>

      {/* DETAILS */}
      <div className="mt-6 space-y-3 text-sm">
        <p><strong>📍 Location:</strong> {job.location || "-"}</p>
        <p><strong>💰 Salary:</strong> {job.salary || "-"}</p>
        <p><strong>📝 Notes:</strong> {job.notes || "-"}</p>
      </div>

      {/* ACTIONS */}
      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          href={`/jobs/${job.id}`}
          className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-700"
        >
          Open
        </Link>

        <button
          onClick={moveForward}
          disabled={job.status === "Rejected"}
          className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-600"
        >
          Move →
        </button>

        <button
          onClick={() => setIsEditOpen(true)}
          className="rounded-xl border border-yellow-500 px-4 py-2 text-sm text-yellow-500 transition hover:bg-yellow-500 hover:text-black"
        >
          Edit
        </button>

        <button
          onClick={() => setIsDeleteOpen(true)}
          className="rounded-xl border border-red-500 px-4 py-2 text-sm text-red-500 transition hover:bg-red-500 hover:text-white"
        >
          Delete
        </button>
      </div>

      <DeleteJobModal
        open={isDeleteOpen}
        company={job.company}
        position={job.position}
        onCancel={() => setIsDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
      />

      <EditJobModal
        open={isEditOpen}
        job={job}
        onClose={() => setIsEditOpen(false)}
      />
    </div>
  );
}