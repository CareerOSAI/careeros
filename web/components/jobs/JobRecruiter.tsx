"use client";

import { useState } from "react";
import { User, Mail, Phone, Save } from "lucide-react";
import { toast } from "sonner";

import { Job, RecruiterInfo } from "@/types/job";
import { useJobs } from "@/context/JobsContext";

type Props = {
  job: Job;
};

const EMPTY: RecruiterInfo = {
  name: "",
  email: "",
  phone: "",
  linkedin: "",
};

export default function JobRecruiter({ job }: Props) {
  const { updateJobRecruiter } = useJobs();

  const [editing, setEditing] = useState(false);

  const [data, setData] = useState<RecruiterInfo>({
    ...EMPTY,
    ...job.recruiter,
  });

  const recruiter = job.recruiter ?? EMPTY;

  const hasAnyInfo =
    recruiter.name.trim() !== "" ||
    recruiter.email.trim() !== "" ||
    recruiter.phone.trim() !== "";

  const handleChange = (
    field: keyof RecruiterInfo,
    value: string
  ) => {
    setData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    await updateJobRecruiter(job.id, data);

    toast.success("Recruiter information saved.");

    setEditing(false);
  };

  return (
    <section className="rounded-3xl border border-border bg-card p-8">

      <div className="mb-6 flex items-center justify-between">

        <div className="flex items-center gap-2">
          <User className="text-primary" size={20} />
          <h2 className="text-2xl font-bold">
            Recruiter
          </h2>
        </div>

        {!editing && (
          <button
            onClick={() => setEditing(true)}
            className="rounded-xl border border-border px-4 py-2 text-sm transition hover:bg-accent"
          >
            {hasAnyInfo ? "Edit" : "Add Recruiter"}
          </button>
        )}

      </div>

      {!editing && !hasAnyInfo && (
        <p className="text-sm text-muted-foreground">
          No recruiter information added yet.
        </p>
      )}

      {!editing && hasAnyInfo && (

        <div className="space-y-4">

          {recruiter.name && (
            <div className="flex items-center gap-3">
              <User
                size={16}
                className="text-muted-foreground"
              />

              <span>{recruiter.name}</span>
            </div>
          )}

          {recruiter.email && (
            <div className="flex items-center gap-3">
              <Mail
                size={16}
                className="text-muted-foreground"
              />

              <a
                href={`mailto:${recruiter.email}`}
                className="hover:underline"
              >
                {recruiter.email}
              </a>
            </div>
          )}

          {recruiter.phone && (
            <div className="flex items-center gap-3">
              <Phone
                size={16}
                className="text-muted-foreground"
              />

              <span>{recruiter.phone}</span>
            </div>
          )}

        </div>

      )}

      {editing && (

        <div className="space-y-4">

          <input
            type="text"
            value={data.name}
            onChange={(e) =>
              handleChange("name", e.target.value)
            }
            placeholder="Recruiter name"
            className="w-full rounded-xl border border-border bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
          />

          <input
            type="email"
            value={data.email}
            onChange={(e) =>
              handleChange("email", e.target.value)
            }
            placeholder="Recruiter email"
            className="w-full rounded-xl border border-border bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
          />

          <input
            type="text"
            value={data.phone}
            onChange={(e) =>
              handleChange("phone", e.target.value)
            }
            placeholder="Recruiter phone"
            className="w-full rounded-xl border border-border bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
          />

          <div className="flex gap-3 pt-2">

            <button
              onClick={() => {
                setData({
                  ...EMPTY,
                  ...job.recruiter,
                });

                setEditing(false);
              }}
              className="rounded-xl border border-border px-5 py-2 text-sm transition hover:bg-accent"
            >
              Cancel
            </button>

            <button
              onClick={handleSave}
              className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90"
            >
              <Save size={15} />
              Save
            </button>

          </div>

        </div>

      )}

    </section>
  );
}