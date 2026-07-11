import { Job } from "@/types/job";
import { SortOption } from "@/components/jobs/SortSelect";

const STATUS_ORDER: Record<Job["status"], number> = {
  Wishlist: 0,
  Applied: 1,
  Interview: 2,
  Offer: 3,
  Rejected: 4,
};

function extractSalaryNumber(salary?: string): number {
  if (!salary) return 0;
  const digits = salary.replace(/[^0-9]/g, "");
  return digits ? parseInt(digits, 10) : 0;
}

export function sortJobs(jobs: Job[], sortBy: SortOption): Job[] {
  const sorted = [...jobs];

  switch (sortBy) {
    case "newest":
      return sorted.sort(
        (a, b) =>
          new Date(b.createdAt ?? 0).getTime() -
          new Date(a.createdAt ?? 0).getTime()
      );

    case "oldest":
      return sorted.sort(
        (a, b) =>
          new Date(a.createdAt ?? 0).getTime() -
          new Date(b.createdAt ?? 0).getTime()
      );

    case "company-asc":
      return sorted.sort((a, b) => a.company.localeCompare(b.company));

    case "company-desc":
      return sorted.sort((a, b) => b.company.localeCompare(a.company));

    case "status":
      return sorted.sort(
        (a, b) => STATUS_ORDER[a.status] - STATUS_ORDER[b.status]
      );

    case "salary-desc":
      return sorted.sort(
        (a, b) => extractSalaryNumber(b.salary) - extractSalaryNumber(a.salary)
      );

    case "salary-asc":
      return sorted.sort(
        (a, b) => extractSalaryNumber(a.salary) - extractSalaryNumber(b.salary)
      );

    default:
      return sorted;
  }
}