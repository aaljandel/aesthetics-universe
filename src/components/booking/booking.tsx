import {
  createContext,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { treatments, formatPrice } from "@/data/catalogue";

type BookingContextValue = {
  open: boolean;
  openBooking: (slug?: string) => void;
  closeBooking: () => void;
};

const BookingContext = createContext<BookingContextValue | null>(null);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [slug, setSlug] = useState<string | null>(null);

  const value = useMemo(
    () => ({
      open,
      openBooking: (next?: string) => {
        setSlug(next ?? null);
        setOpen(true);
      },
      closeBooking: () => setOpen(false),
    }),
    [open],
  );

  return (
    <BookingContext.Provider value={value}>
      {children}
      <BookingModal open={open} initialSlug={slug} onClose={() => setOpen(false)} />
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking must be used within BookingProvider");
  return ctx;
}

const SLOTS = ["10:00", "11:30", "13:00", "14:30", "16:00", "17:30"];

function buildDays() {
  const days: Date[] = [];
  const start = new Date();
  start.setHours(12, 0, 0, 0);
  for (let i = 1; days.length < 8 && i < 24; i += 1) {
    const day = new Date(start);
    day.setDate(start.getDate() + i);
    if (day.getDay() === 0) continue;
    days.push(day);
  }
  return days;
}

function slotTaken(key: string, slot: string) {
  const total = [...`${key}${slot}`].reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return total % 5 === 0;
}

type Step = "treatment" | "date" | "time" | "details" | "done";

function BookingModal({
  open,
  initialSlug,
  onClose,
}: {
  open: boolean;
  initialSlug: string | null;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const [step, setStep] = useState<Step>("treatment");
  const [slug, setSlug] = useState(initialSlug ?? treatments[8]?.slug ?? "skin-consultation");
  const [days, setDays] = useState<Date[]>([]);
  const [dateKey, setDateKey] = useState("");
  const [slot, setSlot] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState<"Email" | "Phone">("Email");
  const [error, setError] = useState("");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (open && !el.open) {
      setStep("treatment");
      setSlug(initialSlug ?? "skin-consultation");
      setDateKey("");
      setSlot("");
      setName("");
      setEmail("");
      setError("");
      setDays(buildDays());
      el.showModal();
    } else if (!open && el.open) {
      el.close();
    }
  }, [open, initialSlug]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const handle = () => onClose();
    el.addEventListener("close", handle);
    return () => el.removeEventListener("close", handle);
  }, [onClose]);

  const treatment = treatments.find((item) => item.slug === slug) ?? treatments[0];
  const dateLabel = days.find((day) => day.toISOString().slice(0, 10) === dateKey);

  function nextFromTreatment() {
    setError("");
    setStep("date");
  }

  function nextFromDate() {
    if (!dateKey) {
      setError("Choose a demonstration day.");
      return;
    }
    setError("");
    setSlot("");
    setStep("time");
  }

  function nextFromTime() {
    if (!slot) {
      setError("Choose a sample time.");
      return;
    }
    setError("");
    setStep("details");
  }

  function confirm(event: React.FormEvent) {
    event.preventDefault();
    if (name.trim().length < 2) {
      setError("Please add a first name for the demonstration.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Enter an email address so the summary can display it. It will not be sent.");
      return;
    }
    setError("");
    setStep("done");
    setName("");
    setEmail("");
  }

  return (
    <dialog ref={ref} className="modal" aria-labelledby={titleId}>
      <div className="p-6 md:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="eyebrow text-gold-deep">Demonstration diary</p>
            <h2 id={titleId} className="display mt-2 text-4xl">
              Book a conversation
            </h2>
          </div>
          <button type="button" className="btn btn-line min-h-11 px-4" onClick={onClose}>
            Close
          </button>
        </div>
        <p className="mt-4 max-w-xl text-sm text-muted">
          Sample times only. Confirming this screen does not reserve anything, contact the studio, or
          store what you type.
        </p>

        <ol className="mt-6 flex flex-wrap gap-3 text-xs tracking-widest uppercase text-muted">
          {["Treatment", "Date", "Time", "Details", "Done"].map((label, index) => (
            <li key={label} className={index === ["treatment", "date", "time", "details", "done"].indexOf(step) ? "text-ink" : undefined}>
              0{index + 1} {label}
            </li>
          ))}
        </ol>

        {step === "treatment" && (
          <div className="mt-6 grid gap-2">
            {treatments.map((item) => (
              <label
                key={item.slug}
                className={`flex cursor-pointer items-center justify-between gap-4 border px-4 py-3 ${
                  slug === item.slug ? "border-gold-deep bg-pearl" : "border-line"
                }`}
              >
                <span>
                  <input
                    type="radio"
                    name="treatment"
                    className="mr-3 accent-gold-deep"
                    checked={slug === item.slug}
                    onChange={() => setSlug(item.slug)}
                  />
                  {item.name}
                </span>
                <span className="text-xs text-muted">{formatPrice(item.priceFrom)}</span>
              </label>
            ))}
            <button type="button" className="btn btn-ink mt-4 w-fit" onClick={nextFromTreatment}>
              Continue
            </button>
          </div>
        )}

        {step === "date" && (
          <div className="mt-6">
            <div className="flex gap-2 overflow-x-auto pb-2">
              {days.map((day) => {
                const key = day.toISOString().slice(0, 10);
                const label = new Intl.DateTimeFormat("en-GB", {
                  weekday: "short",
                  day: "numeric",
                  month: "short",
                }).format(day);
                return (
                  <button
                    key={key}
                    type="button"
                    className={`min-w-24 shrink-0 border px-3 py-3 text-sm ${
                      dateKey === key ? "border-midnight bg-midnight text-pearl" : "border-line"
                    }`}
                    onClick={() => setDateKey(key)}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
            {error && <p className="mt-3 text-sm text-plum">{error}</p>}
            <div className="mt-4 flex gap-3">
              <button type="button" className="btn btn-line" onClick={() => setStep("treatment")}>
                Back
              </button>
              <button type="button" className="btn btn-ink" onClick={nextFromDate}>
                Continue
              </button>
            </div>
          </div>
        )}

        {step === "time" && (
          <div className="mt-6">
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {SLOTS.map((time) => {
                const taken = slotTaken(dateKey, time);
                return (
                  <button
                    key={time}
                    type="button"
                    disabled={taken}
                    className={`min-h-11 border px-3 py-3 text-sm disabled:cursor-not-allowed disabled:opacity-40 ${
                      slot === time ? "border-midnight bg-midnight text-pearl" : "border-line"
                    }`}
                    onClick={() => setSlot(time)}
                  >
                    {time}
                    {taken ? " · taken" : ""}
                  </button>
                );
              })}
            </div>
            {error && <p className="mt-3 text-sm text-plum">{error}</p>}
            <div className="mt-4 flex gap-3">
              <button type="button" className="btn btn-line" onClick={() => setStep("date")}>
                Back
              </button>
              <button type="button" className="btn btn-ink" onClick={nextFromTime}>
                Continue
              </button>
            </div>
          </div>
        )}

        {step === "details" && (
          <form className="mt-6 grid gap-4" onSubmit={confirm} noValidate>
            <label className="grid gap-2 text-sm">
              First name
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="min-h-11 border border-line bg-pearl px-3"
                autoComplete="given-name"
              />
            </label>
            <label className="grid gap-2 text-sm">
              Email
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="min-h-11 border border-line bg-pearl px-3"
                autoComplete="email"
              />
            </label>
            <fieldset>
              <legend className="text-sm">Preferred contact for this demonstration</legend>
              <div className="mt-2 flex gap-3">
                {(["Email", "Phone"] as const).map((option) => (
                  <label key={option} className="flex min-h-11 items-center gap-2 text-sm">
                    <input
                      type="radio"
                      name="contact"
                      checked={contact === option}
                      onChange={() => setContact(option)}
                    />
                    {option}
                  </label>
                ))}
              </div>
            </fieldset>
            {error && (
              <p className="text-sm text-plum" role="alert">
                {error}
              </p>
            )}
            <div className="flex gap-3">
              <button type="button" className="btn btn-line" onClick={() => setStep("time")}>
                Back
              </button>
              <button type="submit" className="btn btn-gold">
                Show demonstration summary
              </button>
            </div>
          </form>
        )}

        {step === "done" && (
          <div className="mt-6 border border-gold bg-pearl p-5" role="status">
            <p className="eyebrow text-gold-deep">Not booked</p>
            <p className="mt-3 font-serif text-3xl leading-tight">
              This is a demonstration. No appointment has been made.
            </p>
            <p className="mt-3 text-sm text-muted">
              {treatment?.name} ·{" "}
              {dateLabel
                ? new Intl.DateTimeFormat("en-GB", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                  }).format(dateLabel)
                : "Date"}{" "}
              · {slot} · contact by {contact.toLowerCase()}. The name and email you typed were cleared
              and were not transmitted.
            </p>
            <button type="button" className="btn btn-ink mt-5" onClick={onClose}>
              Close demonstration
            </button>
          </div>
        )}
      </div>
    </dialog>
  );
}
