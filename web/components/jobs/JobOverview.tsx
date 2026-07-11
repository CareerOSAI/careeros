type Props = {
  company: string;
  position: string;
  status: string;
  location: string;
  salary: string;
  link: string;
};

export default function JobOverview({
  company,
  position,
  status,
  location,
  salary,
  link,
}: Props) {
  return (
    <section className="rounded-3xl border border-border bg-card p-8">

      <h1 className="text-4xl font-bold">
        {company}
      </h1>

      <p className="mt-2 text-xl text-muted-foreground">
        {position}
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-2">

        <div>
          <p className="text-sm text-muted-foreground">Status</p>
          <p className="font-semibold">{status}</p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">Location</p>
          <p className="font-semibold">
            {location || "-"}
          </p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">Salary</p>
          <p className="font-semibold">
            {salary || "-"}
          </p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">Job Link</p>

          {link ? (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              Open Job
            </a>
          ) : (
            "-"
          )}

        </div>

      </div>

    </section>
  );
}