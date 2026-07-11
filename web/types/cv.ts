export type CvAnalysis = {
  id: string;
  file_name: string | null;
  extracted_text: string;
  ats_score: number;
  summary: string;
  strengths: string[];
  weaknesses: string[];
  missing_skills: string[];
  suggestions: string[];
  detected_skills: string[];
  seniority_level: string;
  created_at: string;
};