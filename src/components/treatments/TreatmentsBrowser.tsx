import { Link, useNavigate } from "@tanstack/react-router";
import { categoryLabel, categories, formatPrice, treatments, type CategoryId } from "@/data/catalogue";

const filters = ["all", ...categories.map((item) => item.id)] as const;
export type TreatmentFilter = (typeof filters)[number];

const labels: Record<TreatmentFilter, string> = {
  all: "All",
  skin: "Skin",
  harmony: "Harmony",
  lips: "Lips",
  rejuvenation: "Rejuvenation",
  consultation: "Consultation",
};

export function isTreatmentFilter(value: string): value is TreatmentFilter {
  return (filters as readonly string[]).includes(value);
}

export function TreatmentsBrowser({ category }: { category: TreatmentFilter }) {
  const navigate = useNavigate();
  const visible = treatments.filter((item) => category === "all" || item.category === category);

  return (
    <>
      <section className="bg-midnight pt-32 pb-16 text-pearl">
        <div className="wrap grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="eyebrow text-gold">Treatments</p>
            <h1 className="display mt-4 text-5xl md:text-7xl">A catalogue, not a prescription.</h1>
          </div>
          <p className="max-w-md text-blush lg:col-span-5 lg:pt-16">
            Filter by the orbit that interests you. Prices, where shown, are demonstration figures in pounds.
            Prescription-only medicines are not named. Suitability is never decided on this page.
          </p>
        </div>
      </section>
      <section className="section bg-ivory">
        <div className="wrap">
          <div className="flex gap-2 overflow-x-auto pb-2" role="toolbar" aria-label="Filter treatments">
            {filters.map((item) => (
              <button
                key={item}
                type="button"
                className={`min-h-11 shrink-0 border px-4 text-sm ${category === item ? "border-midnight bg-midnight text-pearl" : "border-line"}`}
                aria-pressed={category === item}
                onClick={() => {
                  void navigate({
                    to: "/treatments",
                    search: item === "all" ? {} : { category: item },
                  });
                }}
              >
                {labels[item]}
              </button>
            ))}
          </div>
          <div key={category} className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((treatment) => (
              <article key={treatment.slug} className="card-in border border-line bg-pearl">
                <Link to="/treatments/$slug" params={{ slug: treatment.slug }} className="group block">
                  <div className="aspect-frame overflow-hidden bg-plum">
                    <img
                      src={treatment.image}
                      alt={treatment.imageAlt}
                      loading="lazy"
                      decoding="async"
                      className="zoom-img h-full w-full object-cover"
                    />
                  </div>
                  <div className="p-5">
                    <p className="eyebrow text-gold-deep">{categoryLabel[treatment.category as CategoryId]}</p>
                    <h2 className="mt-2 font-serif text-3xl">{treatment.name}</h2>
                    <p className="mt-2 text-sm text-muted">{treatment.summary}</p>
                    <p className="mt-4 text-xs tracking-widest uppercase">{formatPrice(treatment.priceFrom)}</p>
                  </div>
                </Link>
              </article>
            ))}
          </div>
          {visible.length === 0 && <p className="mt-8 text-muted">Nothing sits in this orbit yet.</p>}
        </div>
      </section>
    </>
  );
}
