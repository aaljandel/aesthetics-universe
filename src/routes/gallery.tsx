import { createFileRoute } from "@tanstack/react-router";
import { GalleryView } from "@/components/gallery/GalleryView";
import { pageMeta } from "@/lib/site";

export const Route = createFileRoute("/gallery")({
  head: () =>
    pageMeta(
      "Gallery · Aesthetics Universe",
      "An editorial gallery for a fictional aesthetics studio, with a clearly labelled illustrative comparison. Not patient results.",
      "/gallery",
    ),
  component: GalleryView,
});
