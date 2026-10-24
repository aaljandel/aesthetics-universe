import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/pages/LegalPage";
import { pageMeta } from "@/lib/site";

export const Route = createFileRoute("/terms")({
  head: () =>
    pageMeta(
      "Terms · Aesthetics Universe",
      "Placeholder terms for a fictional demonstration website. Not a contract for treatment.",
      "/terms",
    ),
  component: TermsPage,
});

function TermsPage() {
  return (
    <LegalPage title="Terms, as a placeholder.">
      <p>
        This website is a design demonstration. It does not offer treatment, sell products, or form a contract.
        Demonstration prices are illustrative. Sample diary slots are not appointments.
      </p>
      <p>
        Copy is written in UK English for a fictional London studio. It is not medical advice and it does not
        advertise prescription-only medicines. Do not rely on it for a decision about your health.
      </p>
    </LegalPage>
  );
}
