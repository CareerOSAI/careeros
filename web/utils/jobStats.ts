import { Job } from "@/types/job";

export function getJobStats(jobs: Job[] = []) {
  const total = jobs.length;

  const wishlist = jobs.filter(j => j.status === "Wishlist").length;
  const applied = jobs.filter(j => j.status === "Applied").length;
  const interview = jobs.filter(j => j.status === "Interview").length;
  const offer = jobs.filter(j => j.status === "Offer").length;
  const rejected = jobs.filter(j => j.status === "Rejected").length;

  const conversionRate =
    applied === 0 ? 0 : Math.round((offer / applied) * 100);

  return {
    total,
    wishlist,
    applied,
    interview,
    offer,
    rejected,
    conversionRate,
  };
}