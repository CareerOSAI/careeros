"use client";

import { Job } from "@/types/job";
import JobCard from "./JobCard";

type Props = {
  jobs: Job[];
};

export default function JobList({ jobs }: Props) {
  return (
    <div className="space-y-4">
      {jobs.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          No jobs found.
        </p>
      ) : (
        jobs.map((job) => (
          <JobCard
            key={job.id}
            job={job}
          />
        ))
      )}
    </div>
  );
}