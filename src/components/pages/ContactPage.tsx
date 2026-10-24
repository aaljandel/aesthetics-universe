import { useState, type FormEvent, type ReactNode } from "react";
import { FaqList } from "@/components/ui/FaqList";
import { useBooking } from "@/components/booking/booking";
import { treatments, homeFaqs } from "@/data/catalogue";
import { SITE } from "@/lib/site";

type Fields = {
  name: string;
  email: string;
  phone: string;
  interest: string;
  message: string;
  consent: boolean;
};

const empty: Fields = {
  name: "",
  email: "",
  phone: "",
  interest: "skin-consultation",
  message: "",
  consent: false,
};

export function ContactPage() {
  const { openBooking } = useBooking();
  const [fields, setFields] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [done, setDone] = useState(false);

  function update<K extends keyof Fields>(key: K, value: Fields[K]) {
    setFields((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  }

  function submit(event: FormEvent) {
    event.preventDefault();
    const next: Partial<Record<keyof Fields, string>> = {};
    if (fields.name.trim().length < 2) next.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim())) next.email = "Enter a valid email address.";
    if (fields.phone.trim() && fields.phone.trim().length < 8) next.phone = "That phone number looks incomplete.";
    if (fields.message.trim().length < 12) next.message = "Please write at least a short sentence.";
    if (!fields.consent) next.consent = "Please confirm you understand this is a demonstration.";
    setErrors(next);
    if (Object.keys(next).length > 0) return;
    setDone(true);
    setFields(empty);
  }

  return (
    <>
      <section className="bg-midnight pt-32 pb-16 text-pearl">
        <div className="wrap">
          <p className="eyebrow text-gold">Contact</p>
          <h1 className="display mt-4 max-w-3xl text-5xl md:text-7xl">Write, or open the diary.</h1>
          <p className="mt-5 max-w-xl text-blush">
            Both are demonstrations. The form checks itself in your browser and then forgets what you typed.
          </p>
        </div>
      </section>
      <section className="section bg-ivory">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            {done ? (
              <div className="border border-gold bg-pearl p-6" role="status">
                <p className="eyebrow text-gold-deep">Not sent</p>
                <h2 className="mt-3 font-serif text-4xl">Thank you. This demonstration did not send or store your message.</h2>
                <button type="button" className="btn btn-ink mt-6" onClick={() => setDone(false)}>
                  Write another note
                </button>
              </div>
            ) : (
              <form className="grid gap-5" onSubmit={submit} noValidate>
                <Field label="Name" error={errors.name} id="name">
                  <input
                    id="name"
                    value={fields.name}
                    onChange={(event) => update("name", event.target.value)}
                    className="field"
                    autoComplete="name"
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? "name-error" : undefined}
                  />
                </Field>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Email" error={errors.email} id="email">
                    <input
                      id="email"
                      type="email"
                      value={fields.email}
                      onChange={(event) => update("email", event.target.value)}
                      className="field"
                      autoComplete="email"
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? "email-error" : undefined}
                    />
                  </Field>
                  <Field label="Phone, optional" error={errors.phone} id="phone">
                    <input
                      id="phone"
                      value={fields.phone}
                      onChange={(event) => update("phone", event.target.value)}
                      className="field"
                      autoComplete="tel"
                      aria-invalid={Boolean(errors.phone)}
                      aria-describedby={errors.phone ? "phone-error" : undefined}
                    />
                  </Field>
                </div>
                <Field label="Starting point" id="interest">
                  <select
                    id="interest"
                    value={fields.interest}
                    onChange={(event) => update("interest", event.target.value)}
                    className="field"
                  >
                    {treatments.map((item) => (
                      <option key={item.slug} value={item.slug}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="Message" error={errors.message} id="message">
                  <textarea
                    id="message"
                    value={fields.message}
                    onChange={(event) => update("message", event.target.value)}
                    className="field min-h-36"
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? "message-error" : undefined}
                  />
                </Field>
                <label className="flex items-start gap-3 text-sm">
                  <input
                    type="checkbox"
                    className="mt-1 size-4"
                    checked={fields.consent}
                    onChange={(event) => update("consent", event.target.checked)}
                    aria-invalid={Boolean(errors.consent)}
                  />
                  <span>I understand this is a demonstration form. Nothing will be sent or stored.</span>
                </label>
                {errors.consent && (
                  <p className="text-sm text-plum" role="alert">
                    {errors.consent}
                  </p>
                )}
                <button type="submit" className="btn btn-ink w-fit">
                  Submit demonstration
                </button>
              </form>
            )}
          </div>
          <aside className="lg:col-span-5">
            <div className="border border-line bg-pearl p-6">
              <p className="eyebrow text-gold-deep">Placeholder studio</p>
              <p className="mt-4 font-serif text-3xl leading-tight">{SITE.address}</p>
              <p className="mt-4 text-sm">
                <a href={SITE.phoneHref}>{SITE.phoneDisplay}</a>
                <br />
                <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
              </p>
              <ul className="mt-5 space-y-2 text-sm">
                {SITE.hours.map(([day, time]) => (
                  <li key={day} className="flex justify-between gap-4 border-b border-line pb-2">
                    <span>{day}</span>
                    <span>{time}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-muted">
                Please do not travel. The street and the telephone number are fictional placeholders, including an
                Ofcom drama number.
              </p>
              <button type="button" className="btn btn-gold mt-6" onClick={() => openBooking()}>
                Open demonstration diary
              </button>
            </div>
            <div className="mt-6">
              <p className="eyebrow text-gold-deep">Social placeholders</p>
              <p className="mt-3 text-sm text-muted">
                Instagram and Pinterest would live here for a real studio. They route to this page so the links are
                never dead ends.
              </p>
            </div>
          </aside>
        </div>
      </section>
      <section className="section bg-pearl">
        <div className="wrap max-w-3xl">
          <h2 className="font-serif text-4xl">Before you write</h2>
          <div className="mt-6">
            <FaqList items={homeFaqs.slice(0, 4)} />
          </div>
        </div>
      </section>
    </>
  );
}

function Field({
  label,
  id,
  error,
  children,
}: {
  label: string;
  id: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <label className="grid gap-2 text-sm" htmlFor={id}>
      {label}
      {children}
      {error && (
        <span id={`${id}-error`} className="text-plum" role="alert">
          {error}
        </span>
      )}
    </label>
  );
}
