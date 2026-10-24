import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/cn";

export function EclipseMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={cn("size-8 shrink-0", className)} aria-hidden="true">
      <circle cx="14.6" cy="16" r="9.2" fill="currentColor" />
      <circle cx="19.8" cy="14.5" r="7.6" className="fill-midnight" />
    </svg>
  );
}

export function Logo({ tone = "light", className }: { tone?: "light" | "dark"; className?: string }) {
  return (
    <Link
      to="/"
      className={cn("inline-flex items-center gap-3", tone === "light" ? "text-pearl" : "text-ink", className)}
      aria-label="Aesthetics Universe, home"
    >
      <EclipseMark className={tone === "light" ? "text-gold" : "text-gold-deep"} />
      <span className="flex flex-col leading-none">
        <span className="eyebrow micro">Aesthetics</span>
        <span className="font-serif text-xl tracking-wide">Universe</span>
      </span>
    </Link>
  );
}
