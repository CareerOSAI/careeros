"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useJobs } from "@/context/JobsContext";
import { JobStatus, JobPriority } from "@/types/job";
import { jobSchema, JobFormData } from "@/lib/validations/job";

const statuses: JobStatus[] = [
  "Wishlist",
  "Applied",
  "Interview",
  "Offer",
  "Rejected",
];

const priorities: JobPriority[] = ["High", "Medium", "Low"];

export default function JobForm() {
  const { addJob } = useJobs();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<JobFormData>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      company: "",
      position: "",
      location: "",
      salary: "",
      status: "Wishlist",
      priority: "Medium",
      link: "",
      notes: "",
    },
  });

  const onSubmit = (data: JobFormData) => {
    addJob({
      id: crypto.randomUUID(),
      company: data.company,
      position: data.position,
      location: data.location,
      salary: data.salary,
      status: data.status,
      priority: data.priority,
      link: data.link,
      notes: data.notes,
      createdAt: new Date().toISOString(),
    });

    toast.success("Job added successfully!");
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-2xl border border-border bg-card p-6 space-y-5"
    >
      <h2 className="text-xl font-semibold">Add Job</h2>

      <div className="grid gap-4 md:grid-cols-2">
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

        <div>
          <input
            {...register("location")}
            placeholder="Location"
            className="w-full rounded-xl border border-border bg-background px-4 py-3"
          />
        </div>

        <div>
          <input
            {...register("salary")}
            placeholder="Salary"
            className="w-full rounded-xl border border-border bg-background px-4 py-3"
          />
        </div>

        <div>
          <select
            {...register("status")}
            className="w-full rounded-xl border border-border bg-background px-4 py-3"
          >
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        <div>
          <select
            {...register("priority")}
            className="w-full rounded-xl border border-border bg-background px-4 py-3"
          >
            {priorities.map((priority) => (
              <option key={priority} value={priority}>
                {priority} Priority
              </option>
            ))}
          </select>
        </div>

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

      <div>
        <textarea
          {...register("notes")}
          placeholder="Notes"
          rows={4}
          className="w-full rounded-xl border border-border bg-background px-4 py-3"
        />
      </div>

      <button
        type="submit"
        className="rounded-xl bg-primary px-5 py-3 font-medium text-primary-foreground transition hover:opacity-90"
      >
        Add Job
      </button>
    </form>
  );
}