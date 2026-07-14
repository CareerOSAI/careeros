/**
 * features/interview/feedback/index.ts
 *
 * Afișarea feedback-ului AI pentru răspunsurile date, folosind
 * InterviewFeedback / InterviewSessionSummary (types/interview.ts).
 *
 * TODO: componentă FeedbackCard (per răspuns individual) +
 * SessionSummaryPanel (rezumat complet al sesiunii, folosind
 * summarizeInterviewSession() din services/ai/interview-coach.ts,
 * schelet).
 */

export type { InterviewFeedback, InterviewSessionSummary } from "@/types/interview";

// TODO: <FeedbackCard feedback={InterviewFeedback} />
// TODO: <SessionSummaryPanel summary={InterviewSessionSummary} />