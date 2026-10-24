import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/pages/LegalPage";
import { pageMeta } from "@/lib/site";

export const Route = createFileRoute("/privacy")({
  head: () =>
    pageMeta(
      "Privacy · Aesthetics Universe",
      "Placeholder privacy note for a fictional demonstration website that does not collect personal data.",
      "/privacy",
    ),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <LegalPage title="Privacy, as a placeholder.">
      <p>
        Aesthetics Universe does not operate a clinic and does not collect enquiries. The contact form and the
        demonstration diary validate what you type in the browser and then discard it. Nothing is written to a
        database, sent by email, or kept in local storage.
      </p>
      <p>
        If this design were later used by a real clinic, that clinic would need its own privacy notice, a lawful
        basis for health data, and a processor arrangement. This page is not that notice.
      </p>
    </LegalPage>
  );
}
