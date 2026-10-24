import { createFileRoute } from "@tanstack/react-router";
import { AboutPage } from "@/components/pages/AboutPage";
import { pageMeta } from "@/lib/site";

export const Route = createFileRoute("/about")({
  head: () =>
    pageMeta(
      "About · Aesthetics Universe",
      "The philosophy of a fictional London aesthetics studio: proportion, plain English and permission to wait.",
      "/about",
    ),
  component: AboutPage,
});
