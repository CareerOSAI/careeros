"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

import { Job, TimelineEntry } from "@/types/job";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/context/AuthContext";

type JobsContextType = {
  jobs: Job[];
  loading: boolean;
  addJob: (job: Job) => Promise<void>;
  deleteJob: (id: string) => Promise<void>;
  updateJob: (job: Job) => Promise<void>;
  toggleFavorite: (id: string) => Promise<void>;
  addTimelineEntry: (jobId: string, message: string) => Promise<void>;
  updateJobRecruiter: (
    jobId: string,
    recruiter: Job["recruiter"]
  ) => Promise<void>;
};

const JobsContext = createContext<JobsContextType | undefined>(undefined);

export function JobsProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const supabase = createClient();

  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setJobs([]);
      setLoading(false);
      return;
    }

    const fetchJobs = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from("jobs")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching jobs:", error.message);
      } else {
        setJobs(data as Job[]);
      }

      setLoading(false);
    };

    fetchJobs();
  }, [user, supabase]);

  const addJob = async (job: Job) => {
    if (!user) return;

    const initialEntry: TimelineEntry = {
      id: crypto.randomUUID(),
      type: "created",
      message: "Job added to tracker",
      date: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from("jobs")
      .insert({
        user_id: user.id,
        company: job.company,
        position: job.position,
        location: job.location,
        salary: job.salary,
        link: job.link,
        notes: job.notes,
        status: job.status,
        priority: job.priority,
        favorite: false,
        timeline: [initialEntry],
      })
      .select()
      .single();

    if (error) {
      console.error("Error adding job:", error.message);
      return;
    }

    setJobs((prev) => [data as Job, ...prev]);
  };

  const deleteJob = async (id: string) => {
    const { error } = await supabase.from("jobs").delete().eq("id", id);

    if (error) {
      console.error("Error deleting job:", error.message);
      return;
    }

    setJobs((prev) => prev.filter((job) => job.id !== id));
  };

  const updateJob = async (updatedJob: Job) => {
    const existing = jobs.find((job) => job.id === updatedJob.id);
    let timeline = existing?.timeline ?? [];

    if (existing && existing.status !== updatedJob.status) {
      const entry: TimelineEntry = {
        id: crypto.randomUUID(),
        type: "status",
        message: `Status changed to ${updatedJob.status}`,
        date: new Date().toISOString(),
      };
      timeline = [...timeline, entry];
    }

    const { error } = await supabase
      .from("jobs")
      .update({
        company: updatedJob.company,
        position: updatedJob.position,
        location: updatedJob.location,
        salary: updatedJob.salary,
        link: updatedJob.link,
        notes: updatedJob.notes,
        status: updatedJob.status,
        priority: updatedJob.priority,
        timeline,
      })
      .eq("id", updatedJob.id);

    if (error) {
      console.error("Error updating job:", error.message);
      return;
    }

    setJobs((prev) =>
      prev.map((job) =>
        job.id === updatedJob.id ? { ...updatedJob, timeline } : job
      )
    );
  };

  const toggleFavorite = async (id: string) => {
    const job = jobs.find((j) => j.id === id);
    if (!job) return;

    const newFavorite = !job.favorite;

    const { error } = await supabase
      .from("jobs")
      .update({ favorite: newFavorite })
      .eq("id", id);

    if (error) {
      console.error("Error toggling favorite:", error.message);
      return;
    }

    setJobs((prev) =>
      prev.map((j) => (j.id === id ? { ...j, favorite: newFavorite } : j))
    );
  };

  const addTimelineEntry = async (jobId: string, message: string) => {
    const job = jobs.find((j) => j.id === jobId);
    if (!job) return;

    const entry: TimelineEntry = {
      id: crypto.randomUUID(),
      type: "note",
      message,
      date: new Date().toISOString(),
    };

    const newTimeline = [...(job.timeline ?? []), entry];

    const { error } = await supabase
      .from("jobs")
      .update({ timeline: newTimeline })
      .eq("id", jobId);

    if (error) {
      console.error("Error adding timeline entry:", error.message);
      return;
    }

    setJobs((prev) =>
      prev.map((j) => (j.id === jobId ? { ...j, timeline: newTimeline } : j))
    );
  };

  const updateJobRecruiter = async (
    jobId: string,
    recruiter: Job["recruiter"]
  ) => {
    const { error } = await supabase
      .from("jobs")
      .update({ recruiter })
      .eq("id", jobId);

    if (error) {
      console.error("Error updating recruiter:", error.message);
      return;
    }

    setJobs((prev) =>
      prev.map((j) => (j.id === jobId ? { ...j, recruiter } : j))
    );
  };

  return (
    <JobsContext.Provider
      value={{
        jobs,
        loading,
        addJob,
        deleteJob,
        updateJob,
        toggleFavorite,
        addTimelineEntry,
        updateJobRecruiter,
      }}
    >
      {children}
    </JobsContext.Provider>
  );
}

export function useJobs() {
  const context = useContext(JobsContext);
  if (!context) {
    throw new Error("useJobs must be used inside JobsProvider");
  }
  return context;
}