"use client";

import { useState } from "react";
import { toast } from "sonner";

import { useAuth } from "@/context/AuthContext";
import { createClient } from "@/lib/supabase/client";
import CvUpload from "@/components/cv/CvUpload";
import CvAnalysisResult from "@/components/cv/CvAnalysisResult";

export default function CvAnalyzerPage() {
  const { user } = useAuth();
  const supabase = createClient();

  const [analysis, setAnalysis] = useState<any>(null);

  const handleAnalyzed = async (data: {
    analysis: any;
    extractedText: string;
    fileName: string;
  }) => {
    setAnalysis(data.analysis);

    if (!user) return;

    const { error } = await supabase.from("cv_analyses").insert({
      user_id: user.id,
      file_name: data.fileName,
      extracted_text: data.extractedText,
      ats_score: data.analysis.atsScore,
      summary: data.analysis.summary,
      strengths: data.analysis.strengths,
      weaknesses: data.analysis.weaknesses,
      missing_skills: data.analysis.missingSkills,
      suggestions: data.analysis.suggestions,
      detected_skills: data.analysis.detectedSkills,
      seniority_level: data.analysis.seniorityLevel,
    });

    if (error) {
      console.error("Error saving analysis:", error.message);
      toast.error("Analysis complete, but couldn't save to history.");
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold">CV Analyzer</h1>
        <p className="mt-2 text-muted-foreground">
          Upload your CV and get instant AI-powered feedback.
        </p>
      </div>

      <CvUpload onAnalyzed={handleAnalyzed} />

      {analysis && <CvAnalysisResult analysis={analysis} />}
    </div>
  );
}