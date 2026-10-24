import { createFileRoute } from "@tanstack/react-router";
import { TreatmentFinder } from "@/components/finder/TreatmentFinder";
import { pageMeta } from "@/lib/site";

export const Route = createFileRoute("/discover")({
  head: () =>
    pageMeta(
      "Discover · Aesthetics Universe",
      "A constellation-style treatment finder. It suggests reading, not a diagnosis or a recommendation.",
      "/discover",
    ),
  component: DiscoverPage,
});

function DiscoverPage() {
  return (
    <>
      <section className="bg-midnight pt-32 pb-10 text-pearl">
        <div className="wrap">
          <p className="eyebrow text-gold">Interactive finder</p>
          <h1 className="display mt-4 max-w-3xl text-5xl md:text-7xl">Trace a constellation.</h1>
          <p className="mt-5 max-w-xl text-blush">
            Select the interests that sound familiar. Lines join them in the order you choose, and the treatments
            underneath are only invitations to read. A practitioner, not this page, would decide what is suitable.
          </p>
        </div>
      </section>
      <section className="section bg-midnight pt-0 text-pearl">
        <div className="wrap">
          <TreatmentFinder />
        </div>
      </section>
    </>
  );
}
