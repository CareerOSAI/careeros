/**
 * features/analytics/response-rate/index.ts
 *
 * Rata de răspuns a companiilor la aplicările userului, folosind
 * ResponseRateStats (types/analytics.ts).
 *
 * NOTĂ: necesită o definiție clară a ce înseamnă "răspuns" în
 * modelul curent de Job (ex: tranziția din status "Applied" în
 * "Interview" sau "Rejected" ar putea conta ca răspuns — de
 * clarificat quando se implementează logica reală).
 *
 * TODO: buildResponseRateStats(jobs: Job[]): ResponseRateStats
 */

export type { ResponseRateStats } from "@/types/analytics";

// TODO: buildResponseRateStats(jobs: Job[]): ResponseRateStats