import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { categories, formatPrice, getTreatment, type CategoryId } from "@/data/catalogue";

const nodeLabel: Record<CategoryId, string> = {
  skin: "Skin",
  harmony: "Harmony",
  lips: "Lips",
  rejuvenation: "Renew",
  consultation: "Consult",
};

export function UniverseExplorer() {
  const [active, setActive] = useState<CategoryId>("skin");
  const [paused, setPaused] = useState(false);
  const current = categories.find((item) => item.id === active) ?? categories[0];

  return (
    <section id="universe" className="section bg-ivory">
      <div className="wrap">
        <div className="max-w-2xl">
          <p className="eyebrow text-gold-deep">The signature experience</p>
          <h2 className="display mt-4 text-5xl md:text-7xl">Explore Your Universe</h2>
          <p className="mt-5 max-w-xl text-muted">
            Five quiet orbits. Each one is a way of looking at treatment — skin, harmony, lips, renewal, or simply a
            conversation. Hover to read. Choose to go further. Nothing here decides for you.
          </p>
        </div>

        <div className="mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 lg:hidden">
          {categories.map((category) => {
            const selected = category.id === active;
            return (
              <article
                key={category.id}
                className={`w-[84%] shrink-0 snap-center border p-5 ${selected ? "border-gold-deep bg-pearl" : "border-line bg-pearl/40"}`}
              >
                <button type="button" className="w-full text-left" onClick={() => setActive(category.id)}>
                  <span className="eyebrow text-gold-deep">{category.short}</span>
                  <h3 className="mt-3 font-serif text-4xl">{category.name}</h3>
                  <p className="mt-3 text-sm text-muted">{category.description}</p>
                </button>
                {selected && <TreatmentList ids={category.treatments} />}
              </article>
            );
          })}
        </div>

        <div className="mt-14 hidden items-center gap-12 lg:grid lg:grid-cols-[minmax(0,1.2fr)_minmax(16rem,22rem)]">
          <div className={`orbit-stage relative mx-auto aspect-square w-full max-w-2xl ${paused ? "is-paused" : ""}`}>
            <div className="pointer-events-none absolute inset-[10%] rounded-full border border-gold/40" />
            <div className="pointer-events-none absolute inset-[22%] rounded-full border border-line" />
            <div className="pointer-events-none absolute inset-0 grid place-items-center">
              <div className="relative grid size-40 place-items-center rounded-full bg-midnight text-center text-pearl">
                <span className="moon absolute inset-2 rounded-full" />
                <span className="relative px-4">
                  <span className="eyebrow micro text-gold">Now viewing</span>
                  <span className="mt-1 block font-serif text-2xl leading-none">{current.name}</span>
                </span>
              </div>
            </div>
            <div className="orbit-spin absolute inset-0">
              {categories.map((category, index) => {
                const angle = (360 / categories.length) * index - 90;
                const selected = category.id === active;
                return (
                  <div
                    key={category.id}
                    className="absolute left-1/2 top-1/2 h-0 w-0"
                    style={{ transform: `rotate(${angle}deg) translateX(40cqi)` }}
                  >
                    <div className="orbit-counter">
                      <button
                        type="button"
                        className={`absolute left-0 top-0 grid size-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border px-2 text-center ${
                          selected ? "border-gold bg-midnight text-pearl" : "border-gold/70 bg-ivory text-ink"
                        }`}
                        onClick={() => setActive(category.id)}
                        onMouseEnter={() => setActive(category.id)}
                        onFocus={() => setActive(category.id)}
                        aria-pressed={selected}
                      >
                        <span className="font-serif text-lg leading-tight">{nodeLabel[category.id]}</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <aside className="border border-line bg-pearl p-6">
            <p className="eyebrow text-gold-deep">{current.short}</p>
            <h3 className="mt-3 font-serif text-4xl">{current.name}</h3>
            <p className="mt-4 text-sm text-muted">{current.description}</p>
            <TreatmentList ids={current.treatments} />
            <button type="button" className="btn btn-line mt-6" onClick={() => setPaused((value) => !value)}>
              {paused ? "Resume orbits" : "Pause orbits"}
            </button>
          </aside>
        </div>
      </div>
    </section>
  );
}

function TreatmentList({ ids }: { ids: string[] }) {
  return (
    <ul className="mt-5 space-y-3">
      {ids.map((id) => {
        const treatment = getTreatment(id);
        if (!treatment) return null;
        return (
          <li key={id} className="border-t border-line pt-3">
            <Link to="/treatments/$slug" params={{ slug: treatment.slug }} className="group block">
              <span className="font-serif text-2xl group-hover:text-gold-deep">{treatment.name}</span>
              <span className="mt-1 block text-xs tracking-wide text-muted">{formatPrice(treatment.priceFrom)}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
