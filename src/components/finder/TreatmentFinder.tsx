import { Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { finderInterests, formatPrice, getTreatment, starPositions } from "@/data/catalogue";

export function TreatmentFinder() {
  const [selected, setSelected] = useState<string[]>([]);

  function toggle(id: string) {
    setSelected((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));
  }

  const matches = useMemo(() => {
    const ids = new Set<string>();
    finderInterests
      .filter((interest) => selected.includes(interest.id))
      .forEach((interest) => interest.treatments.forEach((slug) => ids.add(slug)));
    return [...ids].map((slug) => getTreatment(slug)).filter((item) => item != null);
  }, [selected]);

  const points = finderInterests.map((interest, index) => ({
    ...interest,
    ...(starPositions[index] ?? { x: 50, y: 50 }),
  }));

  return (
    <div>
      <p className="max-w-2xl text-sm text-blush">
        Choose the interests that sound like you. This draws a small constellation and lists treatments to read
        about. It does not diagnose, prescribe or decide that any treatment is suitable.
      </p>

      <div className="relative mt-8 hidden h-[28rem] border border-line-dark bg-midnight-2 md:block">
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          {selected.map((id, index) => {
            if (index === 0) return null;
            const from = points.find((point) => point.id === selected[index - 1]);
            const to = points.find((point) => point.id === id);
            if (!from || !to) return null;
            return (
              <line
                key={`${from.id}-${to.id}`}
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                stroke="#cbb38c"
                strokeWidth="0.35"
              />
            );
          })}
        </svg>
        {points.map((point) => {
          const on = selected.includes(point.id);
          return (
            <button
              key={point.id}
              type="button"
              className={`absolute grid min-h-14 min-w-28 -translate-x-1/2 -translate-y-1/2 place-items-center px-3 text-center ${
                on ? "bg-gold text-midnight" : "bg-midnight text-pearl"
              }`}
              style={{ left: `${point.x}%`, top: `${point.y}%` }}
              aria-pressed={on}
              onClick={() => toggle(point.id)}
            >
              <span className="text-xs tracking-widest uppercase">{point.label}</span>
            </button>
          );
        })}
      </div>

      <ul className="mt-6 grid gap-3 md:hidden">
        {finderInterests.map((interest) => {
          const on = selected.includes(interest.id);
          return (
            <li key={interest.id}>
              <button
                type="button"
                className={`w-full border px-4 py-4 text-left ${on ? "border-gold bg-gold text-midnight" : "border-line-dark text-pearl"}`}
                aria-pressed={on}
                onClick={() => toggle(interest.id)}
              >
                <span className="font-serif text-3xl">{interest.label}</span>
                <span className="mt-1 block text-sm opacity-80">{interest.hint}</span>
              </button>
            </li>
          );
        })}
      </ul>

      <div className="mt-8" aria-live="polite">
        {selected.length === 0 ? (
          <p className="text-sm text-blush">Select at least one star to see related reading.</p>
        ) : (
          <ul className="grid gap-4 md:grid-cols-2">
            {matches.map((treatment) => (
              <li key={treatment.slug} className="border border-line-dark p-5">
                <p className="eyebrow text-gold">{formatPrice(treatment.priceFrom)}</p>
                <h3 className="mt-2 font-serif text-3xl">{treatment.name}</h3>
                <p className="mt-2 text-sm text-blush">{treatment.summary}</p>
                <Link to="/treatments/$slug" params={{ slug: treatment.slug }} className="btn btn-line mt-4 text-pearl">
                  Read the treatment
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
