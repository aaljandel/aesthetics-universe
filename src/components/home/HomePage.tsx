import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { BeforeAfter } from "@/components/gallery/BeforeAfter";
import { JourneyDial } from "@/components/journey/JourneyDial";
import { UniverseExplorer } from "@/components/universe/UniverseExplorer";
import { FaqList } from "@/components/ui/FaqList";
import { Reveal } from "@/components/ui/Reveal";
import { useBooking } from "@/components/booking/booking";
import {
  categoryLabel,
  formatPrice,
  getTreatment,
  homeFaqs,
  principles,
  testimonials,
} from "@/data/catalogue";
import { usePrefersReducedMotion } from "@/lib/motion";

const hero = "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=1600&q=75";
const editorial = "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=1600&q=75";
const studio = "https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&w=1400&q=75";

const featuredSlugs = ["facial-balancing", "skin-boosters", "microneedling"];

export function HomePage() {
  const { openBooking } = useBooking();
  return (
    <>
      <section className="relative min-h-svh overflow-hidden bg-midnight text-pearl">
        <div className="wrap grid min-h-svh items-end gap-10 pb-16 pt-32 lg:grid-cols-12 lg:items-center lg:pb-20 lg:pt-28">
          <div className="lg:col-span-6">
            <p className="eyebrow text-gold">London · demonstration studio</p>
            <h1 className="display mt-5 text-6xl sm:text-7xl lg:text-8xl">
              Your Beauty.
              <span className="mt-2 block italic text-gold">Your Universe.</span>
            </h1>
            <p className="mt-6 max-w-md text-base text-blush">
              Discover a world of personalised aesthetics, advanced skincare and confidence — composed with the
              quiet of a private studio, not the noise of a trend.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/" hash="universe" className="btn btn-gold">
                Explore Our Universe
              </Link>
              <Link to="/treatments" className="btn btn-line">
                Discover Treatments
              </Link>
            </div>
            <p className="mt-8 max-w-sm text-xs tracking-wide text-blush/80">
              A portfolio demonstration. Not a trading clinic. No results are promised and nothing is booked.
            </p>
          </div>
          <div className="relative lg:col-span-6">
            <div className="pointer-events-none absolute -left-8 top-8 hidden size-64 rounded-full border border-gold/50 lg:block" />
            <div className="pointer-events-none absolute -left-2 top-16 hidden size-48 rounded-full bg-midnight lg:block" />
            <div className="hero-frame relative overflow-hidden bg-plum">
              <img
                src={hero}
                alt="Editorial portrait in soft side light, used as atmosphere for the demonstration brand."
                width={1200}
                height={1600}
                fetchPriority="high"
                decoding="async"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <UniverseExplorer />

      <section className="section bg-pearl">
        <div className="wrap">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="eyebrow text-gold-deep">Selected work</p>
                <h2 className="display mt-3 text-5xl md:text-6xl">Featured treatments</h2>
              </div>
              <Link to="/treatments" className="btn btn-ghost">
                All treatments
              </Link>
            </div>
          </Reveal>
          <div className="mt-10 grid gap-5 lg:grid-cols-12">
            {featuredSlugs.map((slug, index) => {
              const treatment = getTreatment(slug);
              if (!treatment) return null;
              return (
                <article key={slug} className={index === 0 ? "lg:col-span-7" : "lg:col-span-5"}>
                  <Link to="/treatments/$slug" params={{ slug }} className="group block">
                    <div className={`overflow-hidden bg-plum ${index === 0 ? "aspect-cinema" : "aspect-cinema"}`}>
                      <img
                        src={treatment.image}
                        alt={treatment.imageAlt}
                        loading="lazy"
                        decoding="async"
                        className="zoom-img h-full w-full object-cover"
                      />
                    </div>
                    <p className="eyebrow mt-4 text-gold-deep">{categoryLabel[treatment.category]}</p>
                    <h3 className="mt-2 font-serif text-4xl">{treatment.name}</h3>
                    <p className="mt-2 max-w-md text-sm text-muted">{treatment.summary}</p>
                    <p className="mt-3 text-xs tracking-widest text-ink uppercase">{formatPrice(treatment.priceFrom)}</p>
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-plum text-pearl">
        <div className="grid lg:grid-cols-2">
          <div className="media-panel">
            <img
              src={editorial}
              alt="Natural-light portrait used beside the studio philosophy."
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
          <Reveal>
            <div className="section flex flex-col justify-center px-6 md:px-12 lg:px-16">
              <p className="eyebrow text-gold">The art of aesthetics</p>
              <h2 className="display mt-4 text-5xl md:text-6xl">Beauty, read the way a face actually is.</h2>
              <p className="mt-6 max-w-md text-blush">
                Aesthetics Universe borrows its manners from couture fittings and its metaphors from orbits: each
                feature has a path, and the work is to notice the path before altering it. We do not invent medical
                titles. We do insist on daylight, plain English and the option to leave unchanged.
              </p>
              <p className="mt-6 max-w-md font-serif text-2xl italic text-gold">
                “The most expensive thing in the room should be the attention.”
              </p>
              <Link to="/about" className="btn btn-line mt-8 w-fit">
                Our philosophy
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <JourneyDial />

      <section className="section bg-midnight text-pearl">
        <div className="wrap grid items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow text-gold">Treatment gallery</p>
            <h2 className="display mt-4 text-5xl md:text-6xl">Light, not evidence.</h2>
            <p className="mt-5 max-w-md text-blush">
              The pictures on this site are editorial. The slider beside them is a colour grade of a single
              portrait, labelled so it can never be mistaken for a clinical result.
            </p>
            <Link to="/gallery" className="btn btn-gold mt-8">
              Open the gallery
            </Link>
          </Reveal>
          <BeforeAfter />
        </div>
      </section>

      <section className="section bg-ivory">
        <div className="wrap">
          <Reveal>
            <p className="eyebrow text-gold-deep">Why Aesthetics Universe</p>
            <h2 className="display mt-4 max-w-3xl text-5xl md:text-6xl">A philosophy you can hold someone to.</h2>
          </Reveal>
          <ol className="mt-12 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            {principles.map((item) => (
              <li key={item.n}>
                <p className="eyebrow text-gold-deep">{item.n}</p>
                <h3 className="mt-3 font-serif text-3xl">{item.title}</h3>
                <p className="mt-3 text-sm text-muted">{item.copy}</p>
              </li>
            ))}
          </ol>
          <div className="mt-14 grid items-center gap-8 border border-line bg-pearl p-6 md:grid-cols-2 md:p-10">
            <img
              src={studio}
              alt="A warm studio interior with stone and filtered light."
              loading="lazy"
              decoding="async"
              className="aspect-cinema h-full w-full object-cover"
            />
            <div>
              <h3 className="font-serif text-4xl">The consultation is the treatment you can always have.</h3>
              <p className="mt-4 text-sm text-muted">
                Personalisation here means a plan written for one face and one calendar. It does not mean a loyalty
                scheme, a diagnosis from a quiz, or a claim we are qualified to make. The people on the About page
                are fictional. In life, you would check a register.
              </p>
              <Link to="/about" className="btn btn-ink mt-6">
                Meet the fiction
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Stories />

      <section id="faq" className="section bg-ivory">
        <div className="wrap grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow text-gold-deep">Questions</p>
            <h2 className="display mt-4 text-5xl">Asked plainly.</h2>
          </div>
          <div className="lg:col-span-8">
            <FaqList items={homeFaqs} />
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-midnight text-pearl">
        <div className="eclipse-drift pointer-events-none absolute top-1/2 -right-10 size-80 rounded-full border border-gold/40" />
        <div className="moon eclipse-drift pointer-events-none absolute top-1/2 right-16 size-56 rounded-full bg-midnight-2" />
        <div className="section wrap relative">
          <p className="eyebrow text-gold">Begin here</p>
          <h2 className="display mt-4 max-w-3xl text-5xl md:text-7xl">A conversation, held in good light.</h2>
          <p className="mt-5 max-w-md text-blush">
            Open the demonstration diary. Choose a treatment, a sample day and a time that only looks available.
            You will be told, explicitly, that nothing was booked.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button type="button" className="btn btn-gold" onClick={() => openBooking("skin-consultation")}>
              Book consultation
            </button>
            <Link to="/discover" className="btn btn-line">
              Find a starting point
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function Stories() {
  const [index, setIndex] = useState(0);
  const reduced = usePrefersReducedMotion();
  const item = testimonials[index] ?? testimonials[0];

  useEffect(() => {
    if (reduced) return;
    const timer = window.setInterval(() => {
      setIndex((value) => (value + 1) % testimonials.length);
    }, 7000);
    return () => window.clearInterval(timer);
  }, [reduced]);

  return (
    <section className="section bg-blush text-ink" aria-roledescription="carousel" aria-label="Sample client reflections">
      <div className="wrap">
        <p className="eyebrow text-plum">Client experiences · fictional samples</p>
        <blockquote className="mt-6 max-w-4xl">
          <p className="font-serif text-4xl leading-tight md:text-6xl">“{item.quote}”</p>
          <footer className="mt-6 text-sm tracking-widest uppercase">
            {item.name} · {item.place} · sample reflection, not a review
          </footer>
        </blockquote>
        <div className="mt-8 flex gap-3">
          <button type="button" className="btn btn-line" onClick={() => setIndex((value) => (value + testimonials.length - 1) % testimonials.length)}>
            Previous
          </button>
          <button type="button" className="btn btn-ink" onClick={() => setIndex((value) => (value + 1) % testimonials.length)}>
            Next
          </button>
        </div>
      </div>
    </section>
  );
}
