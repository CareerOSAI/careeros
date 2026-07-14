/**
 * features/cv/preview/index.ts
 *
 * Randare live a unui Resume, folosind șablonul ales din
 * features/cv/templates/, pentru a fi afișat în timp ce userul
 * completează features/cv/builder/.
 *
 * TODO: componentă ResumePreview care primește Resume +
 * templateId și randează folosind ResumeTemplateRenderer.
 */

export type { Resume } from "@/types/resume";

// TODO: <ResumePreview resume={Resume} templateId={string} />