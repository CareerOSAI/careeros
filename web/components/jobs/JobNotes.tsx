type Props = {
  notes: string;
};

export default function JobNotes({
  notes,
}: Props) {
  return (
    <section className="rounded-3xl border border-border bg-card p-8">

      <h2 className="mb-6 text-2xl font-bold">
        Notes
      </h2>

      {notes ? (
        <p className="leading-7 whitespace-pre-wrap">
          {notes}
        </p>
      ) : (
        <p className="text-muted-foreground">
          No notes yet.
        </p>
      )}

    </section>
  );
}