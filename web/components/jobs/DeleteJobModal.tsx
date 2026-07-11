"use client";

type Props = {
  open: boolean;
  company: string;
  position: string;
  onCancel: () => void;
  onConfirm: () => void;
};

export default function DeleteJobModal({
  open,
  company,
  position,
  onCancel,
  onConfirm,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">

      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-2xl">

        <h2 className="text-2xl font-bold">
          Delete Job
        </h2>

        <p className="mt-4">
          Are you sure you want to delete this job?
        </p>

        <div className="mt-5 rounded-xl border border-border bg-background p-4">

          <p className="font-semibold">
            {company}
          </p>

          <p className="text-sm text-muted-foreground">
            {position}
          </p>

        </div>

        <p className="mt-4 text-sm text-red-500">
          This action cannot be undone.
        </p>

        <div className="mt-6 flex justify-end gap-3">

          <button
            onClick={onCancel}
            className="rounded-xl border border-border px-5 py-2 hover:bg-muted"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="rounded-xl bg-red-600 px-5 py-2 font-medium text-white hover:bg-red-700"
          >
            Delete
          </button>

        </div>

      </div>

    </div>
  );
}