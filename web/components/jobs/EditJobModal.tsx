"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Job, JobStatus, JobPriority } from "@/types/job";
import { useJobs } from "@/context/JobsContext";
import { jobSchema, JobFormData } from "@/lib/validations/job";

type Props = {
  open: boolean;
  job: Job;
  onClose: () => void;
};

const STATUSES: JobStatus[] = [
  "Wishlist",
  "Applied",
  "Interview",
  "Offer",
  "Rejected",
];

const PRIORITIES: JobPriority[] = ["High", "Medium", "Low"];

export default function EditJobModal({ open, job, onClose }: Props) {
  const { updateJob } = useJobs();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<JobFormData>({
    resolver: zodResolver(jobSchema),
  });

  useEffect(() => {
    if (!open) return;

    reset({
      company: job.company,
      position: job.position,
      location: job.location ?? "",
      salary: job.salary ?? "",
      status: job.status,
      priority: job.priority ?? "Medium",
      link: job.link ?? "",
      notes: job.notes ?? "",
    });
  }, [job, open, reset]);

  if (!open) return null;

  const onSubmit = (data: JobFormData) => {
    updateJob({
      ...job,
      ...data,
    });

    toast.success("Job updated successfully!");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="w-full max-w-2xl rounded-2xl border border-border bg-card p-6">
        <h2 className="text-2xl font-bold">Edit Job</h2>

        <p className="mt-2 text-muted-foreground">
          Update your application details.
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div>
              <input
                {...register("company")}
                placeholder="Company"
                className="w-full rounded-xl border border-border bg-background px-4 py-3"
              />
              {errors.company && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.company.message}
                </p>
              )}
            </div>

            <div>
              <input
                {...register("position")}
                placeholder="Position"
                className="w-full rounded-xl border border-border bg-background px-4 py-3"
              />
              {errors.position && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.position.message}
                </p>
              )}
            </div>

            <input
              {...register("location")}
              placeholder="Location"
              className="rounded-xl border border-border bg-background px-4 py-3"
            />

            <input
              {...register("salary")}
              placeholder="Salary"
              className="rounded-xl border border-border bg-background px-4 py-3"
            />

            <select
              {...register("status")}
              className="rounded-xl border border-border bg-background px-4 py-3"
            >
              {STATUSES.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

            <select
              {...register("priority")}
              className="rounded-xl border border-border bg-background px-4 py-3"
            >
              {PRIORITIES.map((item) => (
                <option key={item} value={item}>
                  {item} Priority
                </option>
              ))}
            </select>

            <div>
              <input
                {...register("link")}
                placeholder="Application Link"
                className="w-full rounded-xl border border-border bg-background px-4 py-3"
              />
              {errors.link && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.link.message}
                </p>
              )}
            </div>
          </div>

          <textarea
            {...register("notes")}
            rows={5}
            placeholder="Notes"
            className="mt-4 w-full rounded-xl border border-border bg-background px-4 py-3"
          />

          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-border px-5 py-2 hover:bg-muted"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-xl bg-blue-600 px-5 py-2 font-medium text-white hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}