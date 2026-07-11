import { Job } from "@/types/job";
import { getJobStats } from "@/utils/jobStats";

export type DashboardTask = {
  id: string;
  title: string;
  completed: boolean;
};

export function getDashboardTasks(jobs: Job[]): DashboardTask[] {
  const stats = getJobStats(jobs);
  const tasks: DashboardTask[] = [];

  if (stats.wishlist > 0) {
    tasks.push({
      id: "apply-wishlist",
      title: `Apply to ${stats.wishlist} job${stats.wishlist > 1 ? "s" : ""} in your Wishlist`,
      completed: false,
    });
  }

  if (stats.interview > 0) {
    tasks.push({
      id: "prepare-interview",
      title: `Prepare for ${stats.interview} upcoming interview${stats.interview > 1 ? "s" : ""}`,
      completed: false,
    });
  }

  if (stats.offer > 0) {
    tasks.push({
      id: "review-offer",
      title: `Review and respond to ${stats.offer} offer${stats.offer > 1 ? "s" : ""}`,
      completed: false,
    });
  }

  if (stats.total === 0) {
    tasks.push({
      id: "add-first-job",
      title: "Add your first job to the tracker",
      completed: false,
    });
  }

  return tasks;
}

export function getDashboardSuggestion(jobs: Job[]): string {
  const stats = getJobStats(jobs);

  if (stats.total === 0) {
    return "Start by adding a job to your tracker, then come back for personalized suggestions.";
  }

  if (stats.interview > 0) {
    return `You have ${stats.interview} interview${stats.interview > 1 ? "s" : ""} coming up. Review the job notes and prepare your answers.`;
  }

  if (stats.wishlist > stats.applied) {
    return `You have ${stats.wishlist} jobs in your Wishlist. Try applying to at least one today to keep momentum.`;
  }

  if (stats.offer > 0) {
    return `You have ${stats.offer} active offer${stats.offer > 1 ? "s" : ""}. Take time to review and negotiate before deciding.`;
  }

  return "Keep tracking your applications consistently — small daily actions add up.";
}