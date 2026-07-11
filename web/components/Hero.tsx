import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center px-6 text-center">

      <span className="mb-4 rounded-full bg-gray-100 px-4 py-2 text-sm font-medium">
        🚀 AI Career Operating System
      </span>

      <h1 className="max-w-4xl text-6xl font-bold tracking-tight">
        Build your career
        <br />
        with AI.
      </h1>

      <p className="mt-8 max-w-2xl text-xl text-gray-600">
        CareerOS creates your personalized roadmap, helps you learn new
        skills, tracks your progress and prepares you for your next job.
      </p>

      <div className="mt-10 flex gap-4">
        <Button size="lg">
          Get Started
        </Button>

        <Button variant="outline" size="lg">
          View Demo
        </Button>
      </div>

    </section>
  );
}