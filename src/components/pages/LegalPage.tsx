import type { ReactNode } from "react";

export function LegalPage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <article className="section bg-ivory pt-32">
      <div className="wrap max-w-3xl">
        <p className="eyebrow text-gold-deep">Placeholder</p>
        <h1 className="display mt-4 text-5xl md:text-6xl">{title}</h1>
        <div className="mt-8 space-y-4 text-muted">{children}</div>
      </div>
    </article>
  );
}
