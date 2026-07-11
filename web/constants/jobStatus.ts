/**
 * Statusul intern al unui job în Job Tracker.
 * Valorile trebuie să rămână sincronizate cu constants/jobstatus.ts
 * (JOB_STATUSES).
 */
export type JobStatus =
  | "Wishlist"
  | "Applied"
  | "Interview"
  | "Offer"
  | "Rejected";