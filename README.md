# Aesthetics Universe

Fictional London aesthetics studio. Portfolio demonstration only — not a clinic, not medical advice, and not a booking system.

Primary domain (canonical): `aestheticsuniverse.co.uk`  
Alternate domain: `aestheticsuniverse.com` should 301-redirect to the primary host so canonicals stay singular. Change the origin in `src/lib/site.ts` before a real launch. Do not publish either domain without explicit approval.

## Scripts

```bash
npm install
npm run dev
npm run typecheck
npm run build
```

The app is a TanStack Start (React, TypeScript, Vite, Tailwind) front end. Client routes are file-based in `src/routes`.

## Deploy

This workspace builds with the included Vercel/Nitro preset (`npm run build`). For Cloudflare Pages, use a TanStack Start Cloudflare target only if you replace that preset deliberately; do not serve the `.com` and `.co.uk` hosts as two separate sites with the same canonical.

No environment secrets are required. There is no database, auth, or payment integration.

## Notes

- Enquiry form and diary are client-side demonstrations. They validate, then discard input. They do not store or transmit personal data.
- Prices are illustrative GBP figures.
- Gallery comparisons are colour grades of a single photograph, labelled as simulations.
- Team profiles and testimonials are fictional. No regulated medical qualifications are claimed.
- Prescription-only medicines are not named or advertised.
