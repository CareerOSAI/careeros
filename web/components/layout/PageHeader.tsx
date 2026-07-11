type Props = {
  title: string;
  description: string;
  children?: React.ReactNode;
};

export default function PageHeader({
  title,
  description,
  children,
}: Props) {
  return (
    <div className="flex items-center justify-between">

      <div>

        <h1 className="text-4xl font-bold">
          {title}
        </h1>

        <p className="mt-2 text-muted-foreground">
          {description}
        </p>

      </div>

      {children}

    </div>
  );
}