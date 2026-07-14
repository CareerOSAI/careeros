/**
 * features/interview/questions/index.ts
 *
 * Afișarea întrebărilor generate pentru o sesiune de interviu,
 * folosind InterviewQuestion (types/interview.ts) și
 * services/ai/interview-coach.ts (schelet, neimplementat încă).
 *
 * TODO: componentă QuestionCard (afișează o InterviewQuestion) +
 * QuestionsList care le parcurge secvențial într-o InterviewSession.
 */

export type { InterviewQuestion, InterviewSession } from "@/types/interview";

// TODO: <QuestionCard question={InterviewQuestion} onAnswer={...} />