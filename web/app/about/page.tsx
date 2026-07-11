import Link from "next/link";
import Logo from "@/components/Logo";
import { BRAND } from "@/constants/brand";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background px-6 py-16 text-foreground">
      <div className="mx-auto max-w-3xl">
        <Link href="/login">
          <Logo />
        </Link>

        <h1 className="mt-12 text-5xl font-bold tracking-tight">
          About {BRAND.name}
        </h1>

        <p className="mt-4 text-xl text-primary">{BRAND.motto}</p>

        <div className="mt-10 space-y-6 text-lg leading-relaxed text-muted-foreground">
          <p>{BRAND.description}</p>

          <p>
            Unlike platforms focused on a single country&apos;s job market,
            CareerOS is built with an <strong className="text-foreground">international-first mindset</strong>.
            Most of the opportunities surfaced through our platform are
            remote or open to candidates across borders — because your next
            role shouldn&apos;t be limited by your postal code.
          </p>

          <p>
            We combine AI-powered CV analysis, a personal career coach,
            and a job tracker built specifically for tech professionals —
            developers, QA engineers, DevOps, mobile, UI/UX, and product
            roles — into a single, focused workspace.
          </p>
        </div>

        <div className="mt-12 flex gap-4">
          <Link
            href="/register"
            className="rounded-xl bg-primary px-6 py-3 font-medium text-primary-foreground transition hover:opacity-90"
          >
            Get Started
          </Link>
          <Link
            href="/contact"
            className="rounded-xl border border-border px-6 py-3 font-medium transition hover:bg-accent"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}