import { Link } from "@tanstack/react-router";
import { principles, team } from "@/data/catalogue";
import { useBooking } from "@/components/booking/booking";

const hero = "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1800&q=75";

export function AboutPage() {
  const { openBooking } = useBooking();
  return (
    <>
      <section className="grid min-h-svh lg:grid-cols-2">
        <div className="media-panel min-h-svh">
          <img
            src={hero}
            alt="Hands resting during a calm treatment, used as atmosphere."
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
        <div className="flex flex-col justify-end bg-ivory px-6 pt-32 pb-16 md:px-12">
          <p className="eyebrow text-gold-deep">About the studio</p>
          <h1 className="display mt-4 text-5xl md:text-7xl">A universe small enough to be personal.</h1>
          <p className="mt-6 max-w-md text-muted">
            Aesthetics Universe is a fictional London brand, written for a portfolio. The philosophy is sincere.
            The address, the team and the diary are not.
          </p>
        </div>
      </section>

      <section className="section bg-pearl">
        <div className="wrap grid gap-10 lg:grid-cols-12">
          <h2 className="display text-5xl lg:col-span-5">The brief we would give ourselves.</h2>
          <div className="space-y-5 text-lg lg:col-span-6 lg:col-start-7">
            <p>
              Most aesthetics websites shout a menu. This one tries to behave like a fitting room: less light from
              above, more time, and a person who will say when a treatment would be a costume rather than a
              correction.
            </p>
            <p>
              The celestial notes — orbits, eclipses, a thin gold line — are there to slow the eye. They are not a
              claim that skincare is science fiction. The face remains the subject.
            </p>
            <p>
              We do not invent regulated qualifications. If this were a real studio, every practitioner’s name would
              be accompanied by a registration you could check. Here, the portraits are placeholders and labelled
              as such.
            </p>
          </div>
        </div>
      </section>

      <section className="section bg-midnight text-pearl">
        <div className="wrap">
          <p className="eyebrow text-gold">Values</p>
          <ol className="mt-10 grid gap-8 md:grid-cols-2">
            {principles.map((item) => (
              <li key={item.n} className="border-t border-line-dark pt-5">
                <p className="eyebrow text-gold">{item.n}</p>
                <h3 className="mt-3 font-serif text-4xl">{item.title}</h3>
                <p className="mt-3 max-w-md text-sm text-blush">{item.copy}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section bg-ivory">
        <div className="wrap">
          <p className="eyebrow text-gold-deep">Team profiles · fictional</p>
          <h2 className="display mt-4 text-5xl">Faces for the story, not a register.</h2>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {team.map((person) => (
              <article key={person.name}>
                <div className="aspect-frame overflow-hidden bg-plum">
                  <img src={person.image} alt={person.imageAlt} loading="lazy" decoding="async" className="h-full w-full object-cover" />
                </div>
                <h3 className="mt-4 font-serif text-3xl">{person.name}</h3>
                <p className="mt-1 text-xs tracking-widest text-gold-deep uppercase">{person.role}</p>
                <p className="mt-3 text-sm text-muted">{person.bio}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-plum text-pearl">
        <div className="wrap grid gap-8 lg:grid-cols-2">
          <div>
            <p className="eyebrow text-gold">Consultation</p>
            <h2 className="display mt-4 text-5xl">What the hour is for.</h2>
          </div>
          <div className="space-y-4 text-blush">
            <p>To look at skin in daylight, not in a ring light.</p>
            <p>To ask what you want people to notice, and what you are afraid they will.</p>
            <p>To name downtime before naming a price.</p>
            <p>To leave with permission to do nothing.</p>
            <button type="button" className="btn btn-gold mt-4" onClick={() => openBooking("skin-consultation")}>
              Open the demonstration diary
            </button>
            <Link to="/contact" className="btn btn-line ml-3">
              Write instead
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
