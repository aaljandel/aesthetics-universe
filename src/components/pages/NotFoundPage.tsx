import { Link } from "@tanstack/react-router";

export function NotFoundPage() {
  return (
    <section className="flex min-h-svh items-center bg-midnight text-pearl">
      <div className="wrap py-32">
        <p className="eyebrow text-gold">404</p>
        <h1 className="display mt-4 max-w-3xl text-6xl md:text-7xl">This orbit is empty.</h1>
        <p className="mt-5 max-w-md text-blush">
          The page is not part of Aesthetics Universe. The studio you came for is still here.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/" className="btn btn-gold">
            Return home
          </Link>
          <Link to="/treatments" className="btn btn-line">
            View treatments
          </Link>
        </div>
      </div>
    </section>
  );
}
