/**
 * features/cv/templates/index.ts
 *
 * Șabloane vizuale disponibile pentru randarea unui Resume
 * (Resume.templateId din types/resume.ts referă o intrare de aici).
 *
 * TODO: definește o listă de șabloane (ex: "minimal", "modern",
 * "classic") + o componentă per șablon care primește Resume și
 * randează layout-ul corespunzător.
 */

export interface ResumeTemplate {
  id: string;
  name: string;
  previewImageUrl?: string;
}

// TODO: RESUME_TEMPLATES: ResumeTemplate[]
// TODO: <ResumeTemplateRenderer resume={Resume} templateId={string} />