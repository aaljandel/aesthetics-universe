import { Link } from "@tanstack/react-router";
import { useBooking } from "@/components/booking/booking";
import { FaqList } from "@/components/ui/FaqList";
import { categoryLabel, formatPrice, getTreatment, type Treatment } from "@/data/catalogue";

export function TreatmentDetail({ treatment }: { treatment: Treatment }) {
  const { openBooking } = useBooking();
  const related = treatment.related.map((slug) => getTreatment(slug)).filter((item) => item != null);

  return (
    <article>
      <section className="veil-hero relative bg-midnight text-pearl">
        <img
          src={treatment.image}
          alt={treatment.imageAlt}
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover opacity-60"
        />
        <div className="veil absolute inset-0" />
        <div className="wrap veil-hero relative flex flex-col justify-end pt-32 pb-12">
          <p className="eyebrow text-gold">{categoryLabel[treatment.category]}</p>
          <h1 className="display mt-3 max-w-3xl text-5xl md:text-7xl">{treatment.name}</h1>
          <p className="mt-4 max-w-xl text-blush">{treatment.summary}</p>
        </div>
      </section>
      <section className="section bg-ivory">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="eyebrow text-gold-deep">Overview</p>
            <p className="mt-4 text-lg">{treatment.overview}</p>
            <h2 className="mt-12 font-serif text-4xl">What people often hope for</h2>
            <ul className="mt-4 space-y-3">
              {treatment.seeks.map((item) => (
                <li key={item} className="border-t border-line pt-3">
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-muted">
              These are hopes, not outcomes. Nothing on this page is guaranteed, and this is not a recommendation
              that the treatment is right for you.
            </p>
            <h2 className="mt-12 font-serif text-4xl">How a visit tends to unfold</h2>
            <p className="mt-4">{treatment.procedure}</p>
            <h2 className="mt-12 font-serif text-4xl">In consultation</h2>
            <p className="mt-4">{treatment.consultation}</p>
            <h2 className="mt-12 font-serif text-4xl">Recovery and aftercare</h2>
            <p className="mt-4">{treatment.aftercare}</p>
            <h2 className="mt-12 font-serif text-4xl">Questions</h2>
            <div className="mt-4">
              <FaqList items={treatment.faqs} />
            </div>
          </div>
          <aside className="h-fit border border-line bg-pearl p-6 lg:sticky lg:top-28 lg:col-span-5">
            <p className="eyebrow text-gold-deep">Demonstration notes</p>
            <dl className="mt-5 space-y-4 text-sm">
              <div className="flex justify-between gap-4 border-b border-line pb-3">
                <dt>Duration</dt>
                <dd>{treatment.duration}</dd>
              </div>
              <div className="flex justify-between gap-4 border-b border-line pb-3">
                <dt>Downtime</dt>
                <dd className="text-right">{treatment.downtime}</dd>
              </div>
              <div className="flex justify-between gap-4 border-b border-line pb-3">
                <dt>Price</dt>
                <dd className="text-right">{formatPrice(treatment.priceFrom)}</dd>
              </div>
            </dl>
            <button type="button" className="btn btn-ink mt-6 w-full" onClick={() => openBooking(treatment.slug)}>
              Book consultation
            </button>
            <p className="mt-4 text-xs text-muted">
              Opens a mock diary. No appointment is created and no personal data is stored.
            </p>
          </aside>
        </div>
      </section>
      <section className="section bg-pearl">
        <div className="wrap">
          <h2 className="font-serif text-4xl">Related reading</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {related.map((item) => (
              <Link key={item.slug} to="/treatments/$slug" params={{ slug: item.slug }} className="group border border-line bg-ivory">
                <div className="aspect-cinema overflow-hidden bg-plum">
                  <img src={item.image} alt="" loading="lazy" className="zoom-img h-full w-full object-cover" />
                </div>
                <span className="block p-4 font-serif text-2xl">{item.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}
