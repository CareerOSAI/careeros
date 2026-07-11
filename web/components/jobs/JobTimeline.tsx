"use client";

import { useState } from "react";
import { Clock, MessageSquare, PlusCircle } from "lucide-react";

import { Job } from "@/types/job";
import { useJobs } from "@/context/JobsContext";

type Props = {
  job: Job;
};

export default function JobTimeline({ job }: Props) {
  const { addTimelineEntry } = useJobs();
  const [note, setNote] = useState("");

  const entries = [...(job.timeline ?? [])].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const handleAdd = () => {
    if (!note.trim()) return;
    addTimelineEntry(job.id, note.trim());
    setNote("");
  };

  const iconFor = (type: string) => {
    if (type === "status") return <Clock size={18} className="text-blue-400" />;
    if (type === "created")
      return <PlusCircle size={18} className="text-green-400" />;
    return <MessageSquare size={18} className="text-muted-foreground" />;
  };

  return (
    <section className="rounded-3xl border border-border bg-card p-8">
      <h2 className="text-2xl font-bold">Timeline</h2>

      <div className="mt-6 flex gap-3">
        <input
          value={note}
          onChange={(e) => setNote(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleAdd();
          }}
          placeholder="Add a note to the timeline..."
          className="flex-1 rounded-xl border border-border bg-background px-4 py-3"
        />
        <button
          onClick={handleAdd}
          className="rounded-xl bg-primary px-5 py-3 font-medium text-primary-foreground transition hover:opacity-90"
        >
          Add
        </button>
      </div>

      <div className="mt-8 space-y-6">
        {entries.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No timeline entries yet.
          </p>
        ) : (
          entries.map((entry) => (
            <div key={entry.id} className="flex gap-4">
              <div className="mt-1">{iconFor(entry.type)}</div>

              <div>
                <p className="font-medium">{entry.message}</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(entry.date).toLocaleString("ro-RO", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}