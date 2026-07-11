"use client";

import {
  CheckCircle2,
  XCircle,
  Lightbulb,
  Sparkles,
  Award,
} from "lucide-react";

type Analysis = {
  atsScore: number;
  summary: string;
  strengths: string[];
  weaknesses: string[];
  missingSkills: string[];
  suggestions: string[];
  detectedSkills: string[];
  seniorityLevel: string;
};

type Props = {
  analysis: Analysis;
};

function scoreColor(score: number) {
  if (score >= 75) return "text-green-500 border-green-500";
  if (score >= 50) return "text-yellow-500 border-yellow-500";
  return "text-red-500 border-red-500";
}

export default function CvAnalysisResult({ analysis }: Props) {
  return (
    <div className="space-y-8">
      {/* SCORE + SUMMARY */}
      <div className="flex flex-col items-center gap-6 rounded-3xl border border-border bg-card p-8 sm:flex-row">
        <div
          className={`flex h-32 w-32 shrink-0 items-center justify-center rounded-full border-4 text-4xl font-bold ${scoreColor(analysis.atsScore)}`}
        >
          {analysis.atsScore}
        </div>

        <div>
          <div className="flex items-center gap-2">
            <Award size={18} className="text-primary" />
            <span className="rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold text-primary">
              {analysis.seniorityLevel} Level
            </span>
          </div>
          <p className="mt-3 text-lg leading-relaxed">{analysis.summary}</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* STRENGTHS */}
        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={20} className="text-green-500" />
            <h3 className="text-lg font-semibold">Strengths</h3>
          </div>
          <ul className="mt-4 space-y-2">
            {analysis.strengths.map((s, i) => (
              <li key={i} className="text-sm text-muted-foreground">
                • {s}
              </li>
            ))}
          </ul>
        </div>

        {/* WEAKNESSES */}
        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="flex items-center gap-2">
            <XCircle size={20} className="text-red-500" />
            <h3 className="text-lg font-semibold">Weaknesses</h3>
          </div>
          <ul className="mt-4 space-y-2">
            {analysis.weaknesses.map((s, i) => (
              <li key={i} className="text-sm text-muted-foreground">
                • {s}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* SUGGESTIONS */}
      <div className="rounded-2xl border border-border bg-card p-6">
        <div className="flex items-center gap-2">
          <Lightbulb size={20} className="text-yellow-500" />
          <h3 className="text-lg font-semibold">Suggestions</h3>
        </div>
        <ul className="mt-4 space-y-2">
          {analysis.suggestions.map((s, i) => (
            <li key={i} className="text-sm text-muted-foreground">
              • {s}
            </li>
          ))}
        </ul>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* DETECTED SKILLS */}
        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="flex items-center gap-2">
            <Sparkles size={20} className="text-primary" />
            <h3 className="text-lg font-semibold">Detected Skills</h3>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {analysis.detectedSkills.map((skill, i) => (
              <span
                key={i}
                className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* MISSING SKILLS */}
        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="flex items-center gap-2">
            <XCircle size={20} className="text-muted-foreground" />
            <h3 className="text-lg font-semibold">Missing Skills</h3>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {analysis.missingSkills.map((skill, i) => (
              <span
                key={i}
                className="rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}