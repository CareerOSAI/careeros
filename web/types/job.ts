export type JobStatus =
  | "Wishlist"
  | "Applied"
  | "Interview"
  | "Offer"
  | "Rejected";

export type JobPriority = "High" | "Medium" | "Low";

export type TimelineEntryType = "created" | "status" | "note";

export interface TimelineEntry {
  id: string;
  type: TimelineEntryType;
  message: string;
  date: string;
}

export interface RecruiterInfo {
  name: string;
  email: string;
  phone: string;
  linkedin: string;
}

export interface Job {
  id: string;
  company: string;
  position: string;
  location?: string;
  salary?: string;
  notes?: string;
  link?: string;
  status: JobStatus;
  priority?: JobPriority;
  favorite?: boolean;
  createdAt: string;
  timeline?: TimelineEntry[];
  recruiter?: RecruiterInfo;
}