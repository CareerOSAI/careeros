/**
 * features/cv/export/index.ts
 *
 * Export al unui Resume în format PDF (sau alt format), pornind de
 * la randarea din features/cv/preview/.
 *
 * TODO: funcție exportResumeToPdf(resume: Resume, templateId: string)
 * — posibil folosind o bibliotecă de randare HTML→PDF pe server,
 * sau print nativ din browser ca prim pas simplu.
 */

export type { Resume } from "@/types/resume";

// TODO: async function exportResumeToPdf(resume: Resume, templateId: string): Promise<Blob>