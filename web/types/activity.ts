export type ActivityType =
  | "add-job"
  | "delete-job"
  | "roadmap"
  | "cv"
  | "ai";

export interface Activity {
  id: number;
  type: ActivityType;
  title: string;
  date: string;
}