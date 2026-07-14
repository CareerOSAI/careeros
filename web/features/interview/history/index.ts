/**
 * features/interview/history/index.ts
 *
 * Istoricul sesiunilor de interviu completate, folosind
 * InterviewHistoryEntry (types/interview.ts).
 *
 * TODO: componentă InterviewHistoryList, similară conceptual cu
 * JobList.tsx existent, dar pentru InterviewHistoryEntry[] în loc
 * de Job[].
 */

export type { InterviewHistoryEntry } from "@/types/interview";

// TODO: <InterviewHistoryList entries={InterviewHistoryEntry[]} />