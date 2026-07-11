"use client";

import { useRef, useState } from "react";
import { Paperclip, X, Upload, FileText } from "lucide-react";

type LocalAttachment = {
  id: string;
  name: string;
  size: number;
};

export default function JobAttachments() {
  const [attachments, setAttachments] = useState<LocalAttachment[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (files: FileList | null) => {
    if (!files) return;

    const newAttachments: LocalAttachment[] = Array.from(files).map(
      (file) => ({
        id: crypto.randomUUID(),
        name: file.name,
        size: file.size,
      })
    );

    setAttachments((prev) => [...prev, ...newAttachments]);
  };

  const removeAttachment = (id: string) => {
    setAttachments((prev) => prev.filter((a) => a.id !== id));
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <section className="rounded-3xl border border-border bg-card p-8">
      <div className="flex items-center gap-2">
        <Paperclip size={20} className="text-primary" />
        <h2 className="text-2xl font-bold">Attachments</h2>
      </div>

      <p className="mt-1 text-sm text-muted-foreground">
        Store CVs, cover letters, or offer documents related to this job.
      </p>

      <input
        ref={inputRef}
        type="file"
        multiple
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />

      <button
        onClick={() => inputRef.current?.click()}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border py-8 text-sm text-muted-foreground transition hover:bg-accent/30"
      >
        <Upload size={18} />
        Click to upload files
      </button>

      {attachments.length > 0 && (
        <div className="mt-6 space-y-2">
          {attachments.map((file) => (
            <div
              key={file.id}
              className="flex items-center justify-between rounded-xl border border-border p-4"
            >
              <div className="flex items-center gap-3">
                <FileText size={18} className="text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">{file.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatSize(file.size)}
                  </p>
                </div>
              </div>

              <button
                onClick={() => removeAttachment(file.id)}
                className="rounded-lg p-2 text-muted-foreground transition hover:bg-red-500/10 hover:text-red-500"
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* TODO: wire to Supabase Storage — needs a `job_attachments` table
          (job_id, file_name, file_url, uploaded_at) and a storage bucket.
          Currently local-only, resets on page refresh. */}
    </section>
  );
}