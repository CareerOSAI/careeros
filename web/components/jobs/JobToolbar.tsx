"use client";

import { Star, Edit, Trash2, ExternalLink, Share2 } from "lucide-react";

import { Job } from "@/types/job";

type Props = {
  job: Job;
  onEdit: () => void;
  onDelete: () => void;
  onToggleFavorite: () => void;
};

export default function JobToolbar({
  job,
  onEdit,
  onDelete,
  onToggleFavorite,
}: Props) {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${job.position} at ${job.company}`,
          url: job.link || window.location.href,
        });
      } catch {
        // user cancelled share, ignore
      }
    } else if (job.link) {
      navigator.clipboard.writeText(job.link);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-border bg-card p-4">
      <button
        onClick={onToggleFavorite}
        className="flex items-center gap-2 rounded-xl border border-border px-4 py-2 text-sm transition hover:bg-accent"
      >
        <Star
          size={16}
          className={job.favorite ? "fill-yellow-400 text-yellow-400" : ""}
        />
        {job.favorite ? "Favorited" : "Favorite"}
      </button>

      <button
        onClick={onEdit}
        className="flex items-center gap-2 rounded-xl border border-yellow-500 px-4 py-2 text-sm text-yellow-500 transition hover:bg-yellow-500 hover:text-black"
      >
        <Edit size={16} />
        Edit
      </button>

      {job.link && (
        
          <a href={job.link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-xl border border-border px-4 py-2 text-sm transition hover:bg-accent"
        >
          <ExternalLink size={16} />
          Original Posting
        </a>
      )}

      <button
        onClick={handleShare}
        className="flex items-center gap-2 rounded-xl border border-border px-4 py-2 text-sm transition hover:bg-accent"
      >
        <Share2 size={16} />
        Share
      </button>

      <button
        onClick={onDelete}
        className="ml-auto flex items-center gap-2 rounded-xl border border-red-500 px-4 py-2 text-sm text-red-500 transition hover:bg-red-500 hover:text-white"
      >
        <Trash2 size={16} />
        Delete
      </button>
    </div>
  );
}