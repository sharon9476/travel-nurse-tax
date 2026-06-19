# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev      # Start dev server (http://localhost:3000)
npm run build    # Production build — run this to catch type errors before pushing
npm run lint     # ESLint
```

There are no automated tests. Validate changes by running `npm run build` (zero errors required) and manually exercising the affected tool in the browser.

## Architecture

**Next.js 16 App Router** on Vercel. All tool pages are `'use client'` components because they hold form + result state. Metadata (title, description, canonical, OG) for each tool lives in a co-located `layout.tsx` — the only way to export `metadata` when the page itself is a Client Component.

### Route → file map

| URL | Page | Layout |
|---|---|---|
| `/` | `src/app/page.tsx` | `src/app/layout.tsx` |
| `/calculator/contract-analyzer` | `src/app/calculator/contract-analyzer/page.tsx` | `…/layout.tsx` |
| `/calculator/per-diem` | `src/app/calculator/per-diem/page.tsx` | `…/layout.tsx` |
| `/quiz/tax-home` | `src/app/quiz/tax-home/page.tsx` | `…/layout.tsx` |
| `/blog` | `src/app/blog/page.tsx` | — |
| `/blog/[slug]` | `src/app/blog/[slug]/page.tsx` | — |

### Tax calculation layer (`src/lib/tax/`)

Pure functions, no side effects, no React imports — safe to unit test in isolation.

- **`contractCalculator.ts`** — orchestrates the full contract analysis: taxable gross → federal tax → FICA → home state tax → assignment state tax → net take-home → effective hourly rate. Entry point: `calculateContractNetPay(input: ContractInput): ContractResult`.
- **`federal.ts`** — 2025 federal income tax brackets (`calcFederalIncomeTax`) and FICA (`calcFica`). Both are marginal-rate calculations against `totalTaxableIncome` (taxable wages + non-tax-home stipends).
- **`states.ts`** — flat/simplified state income tax rates for all 50 states. `calcStateIncomeTax(income, stateCode)`.
- **`reciprocity.ts`** — bilateral reciprocity agreement lookup. When `hasReciprocity(homeState, assignmentState)` is true, assignment-state tax is zeroed out.
- **`perDiem.ts`** — GSA rate lookup + gap calculation. Falls back to standard lodging ($110/day) and meals ($68/day) when a city isn't in the JSON. `calculatePerDiem(input: PerDiemInput): PerDiemResult`.

### Data files (`src/data/`)

- **`perDiemRates.json`** — FY2026 GSA per diem rates keyed by `{ state, city, lodgingPerDay, mealsPerDay }`.
- **`quizQuestions.ts`** — 8 quiz questions with weighted scoring options. `evaluateQuiz(answers)` maps total score → `TaxHomeRisk` tier (strong / moderate / at_risk / invalid) and generates the result object.

### Blog / CMS (`src/lib/sanity/`)

Sanity is the CMS for blog posts. The client is a no-op when `NEXT_PUBLIC_SANITY_PROJECT_ID` is not set (`isSanityConfigured` guard). The blog page and `[slug]` page both return empty/null gracefully without Sanity configured.

### Design system

Tailwind CSS v4 with custom CSS variables defined in `src/app/globals.css`. Key tokens:
- `--navy` (`#0F1E2E`) — page background
- `--teal` (`#2EBFA5`) — interactive / accent
- `--amber` (`#F0A500`) — hero numbers / highlights
- `--surface-raised` — card backgrounds (slightly lighter than navy)
- `.data-mono` — JetBrains Mono + tabular-nums, used for all dollar amounts

UI primitives are shadcn/ui components in `src/components/ui/`. `TooltipProvider` is mounted globally in the root layout.

### SEO / structured data

- `public/robots.txt` — AI crawler permissions + sitemap pointer
- `public/llms.txt` — plain-language tool descriptions for AI citation
- `src/app/sitemap.ts` — Next.js Metadata Route API, generates `/sitemap.xml`
- `src/app/opengraph-image.tsx` — Next.js ImageResponse, generates the 1200×630 OG card
- Homepage `PAGE_SCHEMA` in `src/app/page.tsx` uses `@graph` format: WebSite + Organization + SoftwareApplication + FAQPage

### Environment variables

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity project — blog is a no-op without it |
| `NEXT_PUBLIC_SANITY_DATASET` | Sanity dataset (default: `production`) |

## Key constraints

- **Images**: `next/image` with `remotePatterns` for `images.unsplash.com`. Do NOT add `unoptimized` — it was previously used as a Vercel free-plan workaround but has been removed. AVIF/WebP optimization must remain enabled.
- **`'use client'` pages cannot export `metadata`** — always put metadata in the sibling `layout.tsx`.
- **Tax calculations are estimates**, not tax advice. The `TaxDisclaimer` component must appear on every tool page result.
- **Production domain**: `https://www.travelnursetax.app` (canonical). GitHub repo `sharon9476/travel-nurse-tax` auto-deploys to Vercel on push to `master`.
