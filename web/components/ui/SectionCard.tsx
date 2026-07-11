import { ReactNode } from "react";

type SectionCardProps = {
  title: string;
  children: ReactNode;
};

export default function SectionCard({
  title,
  children,
}: SectionCardProps) {
  return (
    <section
      className="
        rounded-2xl
        border
        border-border
        bg-card
        p-6
        shadow-sm
      "
    >
      <h2 className="text-xl font-semibold">
        {title}
      </h2>

      <div className="mt-6">
        {children}
      </div>
    </section>
  );
}