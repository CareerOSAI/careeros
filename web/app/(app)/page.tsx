"use client";

import { Sparkles } from "lucide-react";

import { useAuth } from "@/context/AuthContext";
import { useJobs } from "@/context/JobsContext";
import DashboardStats from "@/components/dashboard/DashboardStats";
import RecentActivity from "@/components/dashboard/RecentActivity";
import SectionCard from "@/components/ui/SectionCard";
import TaskCard from "@/components/dashboard/TaskCard";
import SuggestionCard from "@/components/dashboard/SuggestionCard";

import { getDashboardTasks, getDashboardSuggestion } from "@/utils/dashboardInsights";

export default function DashboardPage() {
  const { user } = useAuth();
  const { jobs } = useJobs();

  const tasks = getDashboardTasks(jobs);
  const suggestion = getDashboardSuggestion(jobs);

  const firstName = user?.email?.split("@")[0] ?? "there";

  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-border bg-card p-10">
        <p className="text-lg font-semibold">
          Welcome back, {firstName} 👋
        </p>

        <h1 className="mt-4 text-6xl font-bold tracking-tight">
          CareerOS Dashboard
        </h1>

        <p className="mt-6 max-w-3xl text-lg text-muted-foreground">
          Build your career faster with AI-powered learning,
          CV analysis, job tracking and coaching.
        </p>
      </section>

      <DashboardStats jobs={jobs} />

      <div className="grid gap-8 xl:grid-cols-2">
        <SectionCard title="Current Tasks">
          <div className="space-y-4">
            {tasks.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No tasks right now — you&apos;re all caught up.
              </p>
            ) : (
              tasks.map((task) => (
                <TaskCard
                  key={task.id}
                  title={task.title}
                  completed={task.completed}
                />
              ))
            )}
          </div>
        </SectionCard>

        <RecentActivity />
      </div>

      <SuggestionCard
        icon={Sparkles}
        title="AI Suggestion"
        description={suggestion}
      />
    </div>
  );
}