import { createFileRoute } from "@tanstack/react-router";
import { TreatmentsBrowser, isTreatmentFilter, type TreatmentFilter } from "@/components/treatments/TreatmentsBrowser";
import { pageMeta } from "@/lib/site";

export const Route = createFileRoute("/treatments/")({
  validateSearch: (search: Record<string, unknown>): { category?: Exclude<TreatmentFilter, "all"> } => {
    const value = typeof search.category === "string" ? search.category : "";
    if (isTreatmentFilter(value) && value !== "all") return { category: value };
    return {};
  },
  head: () =>
    pageMeta(
      "Treatments · Aesthetics Universe",
      "A demonstration catalogue of skin, facial harmony, lip aesthetics and consultation. Illustrative prices in GBP. Not medical advice.",
      "/treatments",
    ),
  component: TreatmentsRoute,
});

function TreatmentsRoute() {
  const { category } = Route.useSearch();
  return <TreatmentsBrowser category={category ?? "all"} />;
}
