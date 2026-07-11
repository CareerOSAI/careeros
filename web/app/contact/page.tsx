import Link from "next/link";
import { Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import Logo from "@/components/Logo";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background px-6 py-16 text-foreground">
      <div className="mx-auto max-w-3xl">
        <Link href="/login">
          <Logo />
        </Link>

        <h1 className="mt-12 text-5xl font-bold tracking-tight">
          Get in Touch
        </h1>

        <p className="mt-4 text-lg text-muted-foreground">
          Questions, feedback, or partnership ideas? We&apos;d love to hear
          from you.
        </p>

        <div className="mt-10 space-y-4">
          <a
            href="mailto:hello@careeros.app"
            className="flex items-center gap-4 rounded-2xl border border-border bg-card p-6 transition hover:bg-accent"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15">
              <Mail size={20} className="text-primary" />
            </div>
            <div>
              <p className="font-semibold">Email</p>
              <p className="text-sm text-muted-foreground">
                hello@careeros.app
              </p>
            </div>
          </a>

          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 rounded-2xl border border-border bg-card p-6 transition hover:bg-accent"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15">
              <FaGithub size={20} className="text-primary" />
            </div>
            <div>
              <p className="font-semibold">GitHub</p>
              <p className="text-sm text-muted-foreground">
                Follow the project&apos;s progress
              </p>
            </div>
          </a>

          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 rounded-2xl border border-border bg-card p-6 transition hover:bg-accent"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15">
              <FaLinkedin size={20} className="text-primary" />
            </div>
            <div>
              <p className="font-semibold">LinkedIn</p>
              <p className="text-sm text-muted-foreground">
                Connect with us
              </p>
            </div>
          </a>
        </div>

        <Link
          href="/about"
          className="mt-10 inline-block text-primary hover:underline"
        >
          ← Back to About
        </Link>
      </div>
    </div>
  );
}
