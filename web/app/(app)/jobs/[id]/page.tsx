"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

import { useJobs } from "@/context/JobsContext";

import JobOverview from "@/components/jobs/JobOverview";
import JobNotes from "@/components/jobs/JobNotes";
import JobTimeline from "@/components/jobs/JobTimeline";
import JobToolbar from "@/components/jobs/JobToolbar";
import JobAttachments from "@/components/jobs/JobsAttachments";
import JobRecruiter from "@/components/jobs/JobRecruiter";
import EditJobModal from "@/components/jobs/EditJobModal";
import DeleteJobModal from "@/components/jobs/DeleteJobModal";
import JobAIInsights from "@/components/jobs/JobAIInsights";
export default function JobDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { jobs, deleteJob, toggleFavorite } = useJobs();

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const job = jobs.find((j) => j.id === params.id);

  if (!job) {
    return (
      <div>
        <h1 className="text-3xl font-bold">Job not found</h1>

        <Link
          href="/jobs"
          className="mt-6 inline-block text-blue-500 hover:underline"
        >
          ← Back to Jobs
        </Link>
      </div>
    );
  }

  const handleConfirmDelete = () => {
    deleteJob(job.id);
    setIsDeleteOpen(false);
    router.push("/jobs");
  };

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-8">
      <Link href="/jobs" className="w-fit text-blue-500 hover:underline">
        ← Back to Jobs
      </Link>

      <JobToolbar
        job={job}
        onEdit={() => setIsEditOpen(true)}
        onDelete={() => setIsDeleteOpen(true)}
        onToggleFavorite={() => toggleFavorite(job.id)}
      />

      <JobOverview
        company={job.company}
        position={job.position}
        status={job.status}
        location={job.location ?? ""}
        salary={job.salary ?? ""}
        link={job.link ?? ""}
      />

      <JobNotes notes={job.notes ?? ""} />

      <JobAttachments />

      <JobRecruiter job={job} />

      <JobTimeline job={job} />
      <JobAIInsights job={job} />
      <EditJobModal
        open={isEditOpen}
        job={job}
        onClose={() => setIsEditOpen(false)}
      />

      <DeleteJobModal
        open={isDeleteOpen}
        company={job.company}
        position={job.position}
        onCancel={() => setIsDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}