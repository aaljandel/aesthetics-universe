import { createFileRoute } from "@tanstack/react-router";
import { NotFoundPage } from "@/components/pages/NotFoundPage";
import { pageMeta } from "@/lib/site";

export const Route = createFileRoute("/$")({
  head: () => pageMeta("Page not found · Aesthetics Universe", "This page is not part of the Aesthetics Universe demonstration.", "/404"),
  component: NotFoundPage,
});
