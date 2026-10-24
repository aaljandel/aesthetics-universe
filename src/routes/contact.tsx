import { createFileRoute } from "@tanstack/react-router";
import { ContactPage } from "@/components/pages/ContactPage";
import { pageMeta } from "@/lib/site";

export const Route = createFileRoute("/contact")({
  head: () =>
    pageMeta(
      "Contact · Aesthetics Universe",
      "Demonstration enquiry form and sample diary for a fictional Mayfair studio. Nothing is sent or stored.",
      "/contact",
    ),
  component: ContactPage,
});
