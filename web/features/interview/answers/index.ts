/**
 * features/interview/answers/index.ts
 *
 * Capturarea răspunsurilor userului la întrebările de interviu,
 * folosind InterviewAnswer (types/interview.ts).
 *
 * TODO: componentă AnswerInput (text sau, ulterior, înregistrare
 * audio/video) care produce un InterviewAnswer, trimis către
 * evaluateAnswer() din services/ai/interview-coach.ts (schelet).
 */

export type { InterviewAnswer } from "@/types/interview";

// TODO: <AnswerInput questionId={string} onSubmit={(answer: InterviewAnswer) => void} />