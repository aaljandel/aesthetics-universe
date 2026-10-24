/**
 * Build-time site identity.
 * aestheticsuniverse.co.uk is the primary host.
 * aestheticsuniverse.com should redirect to the primary host at the DNS or
 * hosting layer so every canonical URL stays on a single origin.
 */
export const SITE = {
  name: "Aesthetics Universe",
  tagline: "Your Beauty. Your Universe.",
  description:
    "A fictional London demonstration studio for personalised aesthetics, advanced skincare and unhurried consultations.",
  primaryHost: "aestheticsuniverse.co.uk",
  alternateHost: "aestheticsuniverse.com",
  url: "https://aestheticsuniverse.co.uk",
  email: "hello@aestheticsuniverse.co.uk",
  phoneDisplay: "+44 (0)20 7946 0188",
  phoneHref: "tel:+442079460188",
  address: "14 Example Crescent, Mayfair, London W1K 0AA",
  hours: [
    ["Monday – Friday", "10:00 – 19:00"],
    ["Saturday", "10:00 – 17:00"],
    ["Sunday", "Closed"],
  ] as const,
} as const;

export function canonical(path: string) {
  if (path === "/" || path === "") return `${SITE.url}/`;
  return `${SITE.url}${path.startsWith("/") ? path : `/${path}`}`;
}

export function pageMeta(title: string, description: string, path: string) {
  return {
    meta: [
      { title },
      { name: "description", content: description },
    ],
    links: [{ rel: "canonical", href: canonical(path) }],
  };
}
