/**
 * features/cv/builder/index.ts
 *
 * Constructorul de CV — formular pe secțiuni (contact, experiență,
 * educație, proiecte, skill-uri), producând un obiect Resume
 * (types/resume.ts, deja definit).
 *
 * NOTĂ: distinct de app/(app)/cv-analyzer/ existent (care analizează
 * un PDF încărcat cu Gemini) — acesta ar construi un CV de la zero,
 * în format structurat, în aplicație.
 *
 * TODO: componente per secțiune (ContactForm, ExperienceForm,
 * EducationForm, ProjectsForm, SkillsForm), toate scriind într-un
 * singur obiect Resume, posibil prin un context propriu sau
 * useState local + persistare Supabase (tabel resumes, de creat).
 */

export type { Resume, ResumeExperienceEntry, ResumeEducationEntry, ResumeProjectEntry, ResumeSkillGroup } from "@/types/resume";

// TODO: <ResumeBuilder initialResume?: Resume, onSave: (r: Resume) => void />