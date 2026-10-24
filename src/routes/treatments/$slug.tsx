import { createFileRoute, notFound } from "@tanstack/react-router";
import { TreatmentDetail } from "@/components/treatments/TreatmentDetail";
import { getTreatment } from "@/data/catalogue";
import { pageMeta } from "@/lib/site";

export const Route = createFileRoute("/treatments/$slug")({
  loader: ({ params }) => {
    const treatment = getTreatment(params.slug);
    if (!treatment) throw notFound();
    return treatment;
  },
  head: ({ loaderData }) =>
    pageMeta(
      `${loaderData?.name ?? "Treatment"} · Aesthetics Universe`,
      loaderData?.summary ?? "Treatment detail",
      `/treatments/${loaderData?.slug ?? ""}`,
    ),
  component: TreatmentRoute,
  notFoundComponent: () => (
    <section className="section bg-ivory pt-32">
      <div className="wrap">
        <h1 className="font-serif text-5xl">That treatment is not in this universe.</h1>
      </div>
    </section>
  ),
});

function TreatmentRoute() {
  const treatment = Route.useLoaderData();
  return <TreatmentDetail treatment={treatment} />;
}
