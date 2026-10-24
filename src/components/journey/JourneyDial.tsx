import { useEffect, useState } from "react";
import { journey } from "@/data/catalogue";
import { usePrefersReducedMotion } from "@/lib/motion";

export function JourneyDial() {
  const [index, setIndex] = useState(0);
  const [held, setHeld] = useState(false);
  const reduced = usePrefersReducedMotion();
  const current = journey[index] ?? journey[0];

  useEffect(() => {
    if (reduced || held) return;
    const timer = window.setInterval(() => {
      setIndex((value) => (value + 1) % journey.length);
    }, 4600);
    return () => window.clearInterval(timer);
  }, [reduced, held]);

  return (
    <section id="journey" className="section bg-ivory">
      <div className="wrap">
        <p className="eyebrow text-gold-deep">The signature sequence</p>
        <h2 className="display mt-4 max-w-3xl text-5xl md:text-7xl">Discover. Consult. Personalise. Experience.</h2>
        <div
          className="mt-12 hidden items-center gap-12 lg:grid lg:grid-cols-2"
          onMouseEnter={() => setHeld(true)}
          onMouseLeave={() => setHeld(false)}
        >
          <div className="journey-dial relative mx-auto aspect-square w-full max-w-md">
            <div className="absolute inset-8 rounded-full border border-line" />
            <div className="pointer-events-none absolute inset-0 grid place-items-center px-16 text-center">
              <div>
                <p className="eyebrow text-gold-deep">{current.n}</p>
                <h3 className="mt-2 font-serif text-5xl">{current.title}</h3>
              </div>
            </div>
            {journey.map((step, stepIndex) => {
              const angle = (360 / journey.length) * stepIndex - 90;
              return (
                <div
                  key={step.n}
                  className="absolute left-1/2 top-1/2 size-0"
                  style={{ transform: `rotate(${angle}deg) translate(34cqi)` }}
                >
                  <div style={{ transform: `rotate(${-angle}deg)` }}>
                    <button
                      type="button"
                      className={`absolute left-0 top-0 grid size-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border font-serif text-lg ${
                        stepIndex === index ? "border-gold bg-midnight text-pearl" : "border-line bg-pearl text-ink"
                      }`}
                      aria-pressed={stepIndex === index}
                      onClick={() => setIndex(stepIndex)}
                    >
                      {step.n}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          <div>
            <p className="font-serif text-3xl leading-snug italic text-plum md:text-4xl">{current.copy}</p>
            <div className="mt-8 flex flex-wrap gap-2">
              {journey.map((step, stepIndex) => (
                <button
                  key={step.title}
                  type="button"
                  className={`min-h-11 border px-4 text-sm ${stepIndex === index ? "border-midnight bg-midnight text-pearl" : "border-line"}`}
                  onClick={() => setIndex(stepIndex)}
                >
                  {step.title}
                </button>
              ))}
            </div>
          </div>
        </div>
        <ol className="mt-10 grid gap-8 lg:hidden">
          {journey.map((step) => (
            <li key={step.n}>
              <p className="eyebrow text-gold-deep">{step.n}</p>
              <h3 className="mt-2 font-serif text-3xl">{step.title}</h3>
              <p className="mt-2 text-sm text-muted">{step.copy}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
