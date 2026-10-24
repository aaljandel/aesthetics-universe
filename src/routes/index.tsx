import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@/components/home/HomePage";
import { pageMeta, SITE } from "@/lib/site";

export const Route = createFileRoute("/")({
  head: () =>
    pageMeta(
      `${SITE.name} · ${SITE.tagline}`,
      "A fictional London aesthetics studio. Personalised skincare, facial harmony and unhurried consultations — a portfolio demonstration.",
      "/",
    ),
  component: HomePage,
});
