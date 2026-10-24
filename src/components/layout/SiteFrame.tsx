import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { Logo } from "@/components/brand/Logo";
import { useBooking } from "@/components/booking/booking";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/cn";

const links = [
  { to: "/discover", label: "Discover" },
  { to: "/treatments", label: "Treatments" },
  { to: "/gallery", label: "Gallery" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteFrame({ children }: { children: ReactNode }) {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <ScrollProgress />
      <Header />
      <main id="main">{children}</main>
      <Footer />
      <FloatingCta />
      <OrbitalCursor />
    </>
  );
}

function Header() {
  const path = useRouterState({ select: (state) => state.location.pathname });
  const { openBooking } = useBooking();
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const home = path === "/";
  const solid = scrolled || !home || menu;
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const el = dialogRef.current;
    if (!el) return;
    if (menu && !el.open) el.showModal();
    if (!menu && el.open) el.close();
  }, [menu]);

  useEffect(() => {
    setMenu(false);
  }, [path]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        solid ? "border-b border-line bg-ivory/95 text-ink backdrop-blur-md" : "bg-transparent text-pearl",
      )}
    >
      <div className="wrap flex h-20 items-center justify-between gap-4">
        <Logo tone={solid ? "dark" : "light"} />
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          <Link to="/" hash="universe" className="nav-link">
            Universe
          </Link>
          {links.map((link) => (
            <Link key={link.to} to={link.to} className="nav-link">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <button type="button" className={cn("btn hidden sm:inline-flex", solid ? "btn-ink" : "btn-gold")} onClick={() => openBooking()}>
            Book consultation
          </button>
          <button
            type="button"
            className="btn btn-line min-w-11 px-3 lg:hidden"
            aria-expanded={menu}
            aria-controls="mobile-nav"
            onClick={() => setMenu(true)}
          >
            Menu
          </button>
        </div>
      </div>
      <dialog
        id="mobile-nav"
        ref={dialogRef}
        className="sheet text-pearl"
        aria-labelledby={titleId}
        onClose={() => setMenu(false)}
      >
        <div className="flex h-full flex-col px-6 py-6">
          <div className="flex items-center justify-between">
            <Logo tone="light" />
            <button type="button" className="btn btn-line px-4" onClick={() => setMenu(false)}>
              Close
            </button>
          </div>
          <nav className="mt-12 flex flex-col gap-5" aria-label="Mobile">
            <p id={titleId} className="sr-only">
              Menu
            </p>
            <Link to="/" hash="universe" className="font-serif text-5xl" onClick={() => setMenu(false)}>
              Universe
            </Link>
            {links.map((link) => (
              <Link key={link.to} to={link.to} className="font-serif text-5xl" onClick={() => setMenu(false)}>
                {link.label}
              </Link>
            ))}
          </nav>
          <button
            type="button"
            className="btn btn-gold mt-auto w-fit"
            onClick={() => {
              setMenu(false);
              openBooking();
            }}
          >
            Book consultation
          </button>
        </div>
      </dialog>
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-midnight text-pearl">
      <div className="wrap grid gap-12 py-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <Logo tone="light" />
          <p className="mt-5 max-w-sm text-sm text-blush">
            A fictional Mayfair demonstration. Not a clinic, not medical advice, and not a place to travel to.
          </p>
          <svg viewBox="0 0 120 48" className="mt-8 h-12 w-28 text-gold" aria-hidden="true">
            <circle cx="28" cy="24" r="14" fill="none" stroke="currentColor" />
            <circle cx="40" cy="22" r="12" fill="#101624" stroke="currentColor" />
            <path d="M62 24h48" stroke="currentColor" strokeWidth="0.6" />
          </svg>
        </div>
        <div className="md:col-span-3">
          <p className="eyebrow text-gold">Visit</p>
          <p className="mt-4 text-sm leading-relaxed">
            {SITE.address}
            <br />
            {SITE.phoneDisplay}
            <br />
            {SITE.email}
          </p>
          <ul className="mt-4 space-y-1 text-sm text-blush">
            {SITE.hours.map(([day, time]) => (
              <li key={day} className="flex justify-between gap-4">
                <span>{day}</span>
                <span>{time}</span>
              </li>
            ))}
          </ul>
        </div>
        <nav className="md:col-span-2" aria-label="Footer">
          <p className="eyebrow text-gold">Explore</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link to="/discover">Treatment finder</Link>
            </li>
            <li>
              <Link to="/treatments">Treatments</Link>
            </li>
            <li>
              <Link to="/gallery">Gallery</Link>
            </li>
            <li>
              <Link to="/about">Philosophy</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </nav>
        <div className="md:col-span-2">
          <p className="eyebrow text-gold">Notes</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link to="/privacy">Privacy placeholder</Link>
            </li>
            <li>
              <Link to="/terms">Terms placeholder</Link>
            </li>
            <li>
              <Link to="/contact">Instagram · placeholder</Link>
            </li>
            <li>
              <Link to="/contact">Pinterest · placeholder</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line-dark">
        <p className="wrap py-5 text-xs text-blush">
          © {new Date().getFullYear()} {SITE.name}. Demonstration only. Primary domain {SITE.primaryHost}.{" "}
          {SITE.alternateHost} is intended to redirect here.
        </p>
      </div>
    </footer>
  );
}

function FloatingCta() {
  const { open, openBooking } = useBooking();
  const path = useRouterState({ select: (state) => state.location.pathname });
  if (open || path === "/contact") return null;
  return (
    <button
      type="button"
      className="btn btn-gold fixed bottom-4 left-1/2 z-40 -translate-x-1/2 sm:hidden"
      onClick={() => openBooking()}
    >
      Book a conversation
    </button>
  );
}

function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const height = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(height > 0 ? Math.min(1, window.scrollY / height) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const radius = 16;
  const circ = 2 * Math.PI * radius;
  return (
    <>
      <div className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-px bg-line-dark" aria-hidden="true">
        <div className="h-full origin-left bg-gold" style={{ transform: `scaleX(${progress})` }} />
      </div>
      <div className="pointer-events-none fixed bottom-6 left-6 z-40 hidden text-gold lg:block" aria-hidden="true">
        <svg width="46" height="46" viewBox="0 0 46 46">
          <circle cx="23" cy="23" r={radius} fill="none" stroke="currentColor" opacity="0.25" />
          <circle
            cx="23"
            cy="23"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray={circ}
            strokeDashoffset={circ * (1 - progress)}
            transform="rotate(-90 23 23)"
          />
        </svg>
      </div>
    </>
  );
}

function OrbitalCursor() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const el = ref.current;
    if (!el || !fine.matches || reduce.matches) return;
    el.hidden = false;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let cx = x;
    let cy = y;
    let frame = 0;
    const move = (event: PointerEvent) => {
      x = event.clientX;
      y = event.clientY;
    };
    const loop = () => {
      cx += (x - cx) * 0.16;
      cy += (y - cy) * 0.16;
      el.style.transform = `translate(${cx}px, ${cy}px)`;
      frame = requestAnimationFrame(loop);
    };
    window.addEventListener("pointermove", move);
    frame = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", move);
    };
  }, []);
  return (
    <div
      ref={ref}
      hidden
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[70] size-7 -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/80"
    />
  );
}
