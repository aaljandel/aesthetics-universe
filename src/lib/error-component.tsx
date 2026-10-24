import type { ErrorComponentProps } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";

const FALLBACK_MESSAGE = "An unexpected error occurred. Try reloading the page.";

function errorMessage(error: unknown): string {
  if (error instanceof Error && error.message) return error.message;
  if (typeof error === "string" && error) return error;
  return FALLBACK_MESSAGE;
}

export function AppErrorComponent({ error }: ErrorComponentProps) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-5 bg-midnight px-6 text-center text-pearl">
      <p className="eyebrow text-gold">Aesthetics Universe</p>
      <h1 className="display text-5xl">Something went wrong</h1>
      <p className="max-w-md text-sm break-words text-blush">{errorMessage(error)}</p>
      <Link to="/" className="btn btn-gold">
        Return home
      </Link>
    </main>
  );
}
