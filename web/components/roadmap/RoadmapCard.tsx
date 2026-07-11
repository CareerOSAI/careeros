"use client";

import { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Code2,
  Braces,
  BadgeCheck,
  Atom,
  Rocket,
} from "lucide-react";

import ProgressBar from "@/components/dashboard/ProgressBar";
import LessonItem from "./LessonItem";

const icons = {
  code2: Code2,
  braces: Braces,
  badgecheck: BadgeCheck,
  atom: Atom,
  rocket: Rocket,
};

type Lesson = {
  id: number;
  title: string;
  completed: boolean;
};

type Props = {
  title: string;
  description: string;
  progress: number;
  status: string;
  icon: keyof typeof icons;
  lessons: Lesson[];
};

export default function RoadmapCard({
  title,
  description,
  progress,
  status,
  icon,
  lessons,
}: Props) {
  const [open, setOpen] = useState(false);

  const Icon = icons[icon];

  return (
    <div className="rounded-3xl border border-border bg-card p-6">
      <div
        className="flex cursor-pointer items-start justify-between"
        onClick={() => setOpen(!open)}
      >
        <div className="flex gap-4">
          <div className="rounded-xl bg-primary/10 p-3">
            <Icon className="h-6 w-6 text-primary" />
          </div>

          <div>
            <h2 className="text-2xl font-bold">
              {title}
            </h2>

            <p className="text-muted-foreground">
              {description}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <span className="rounded-full bg-primary/10 px-3 py-1 text-xs">
            {status}
          </span>

          {open ? (
            <ChevronUp />
          ) : (
            <ChevronDown />
          )}
        </div>
      </div>

      <ProgressBar value={progress} />

      {open && (
        <div className="mt-8 space-y-1">
          {lessons.map((lesson) => (
            <LessonItem
              key={lesson.id}
              title={lesson.title}
              completed={lesson.completed}
            />
          ))}
        </div>
      )}
    </div>
  );
}