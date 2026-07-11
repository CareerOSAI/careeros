"use client";

import { useState, useRef } from "react";
import { Upload, FileText, Loader2 } from "lucide-react";
import { toast } from "sonner";

type Props = {
  onAnalyzed: (data: {
    analysis: any;
    extractedText: string;
    fileName: string;
  }) => void;
};

export default function CvUpload({ onAnalyzed }: Props) {
  const [loading, setLoading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    if (file.type !== "application/pdf") {
      toast.error("Please upload a PDF file.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/analyze-cv", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error ?? "Failed to analyze CV.");
        return;
      }

      toast.success("CV analyzed successfully!");
      onAnalyzed(data);
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setDragOver(true);
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragOver(false);
        const file = e.dataTransfer.files?.[0];
        if (file) handleFile(file);
      }}
      onClick={() => !loading && inputRef.current?.click()}
      className={`flex cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed p-16 text-center transition ${
        dragOver
          ? "border-primary bg-primary/5"
          : "border-border bg-card hover:bg-accent/30"
      }`}
    >
      <input
        ref={inputRef}
        type="file"
        accept="application/pdf"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
        }}
      />

      {loading ? (
        <>
          <Loader2 size={48} className="animate-spin text-primary" />
          <p className="mt-4 text-lg font-semibold">Analyzing your CV...</p>
          <p className="mt-1 text-sm text-muted-foreground">
            This can take up to 15 seconds.
          </p>
        </>
      ) : (
        <>
          <div className="rounded-2xl bg-primary/15 p-5">
            <Upload size={32} className="text-primary" />
          </div>
          <p className="mt-4 text-lg font-semibold">
            Drop your CV here or click to upload
          </p>
          <p className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
            <FileText size={14} /> PDF only, max 10MB
          </p>
        </>
      )}
    </div>
  );
}