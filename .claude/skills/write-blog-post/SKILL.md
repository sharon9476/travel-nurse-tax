---
name: write-blog-post
description: End-to-end workflow for researching, writing, and publishing SEO/GEO-optimized blog posts to TravelNurseTax.app via Sanity CMS
---

# Blog Post Workflow — TravelNurseTax.app

## Site context

- **Audience**: Travel nurses — predominantly RNs, LPNs, allied health professionals working 13-week assignments
- **Domain**: `https://www.travelnursetax.app` (canonical)
- **Sanity project ID**: `d6zuwu9e` / dataset: `production`
- **Schema type**: `post` — fields: `title`, `slug.current`, `publishedAt`, `excerpt`, `body` (PortableText), `seoTitle`, `seoDescription`, `relatedTool`
- **relatedTool values**: `contract-analyzer` | `tax-home-quiz` | `per-diem-checker` | `w2-vs-1099`

---

## Phase 1 — Topic research

### Default behavior: proactive topic discovery
**If the user does not specify a topic, find one.** Do not ask — research and pick the best underserved angle, then write.

Discovery process:
1. Search Reddit (r/TravelNurses, r/nursing) and NurseFly forums for recurring unanswered questions
2. Search Google for high-priority cluster keywords (see table below) and examine what the top 10 results are missing
3. Check "People also ask" results for long-tail variants not covered by existing content
4. Pick the single best angle — high specificity, traffic potential, and a clear gap — and proceed to Phase 2

Only ask the user for a topic if they explicitly request it or if discovery surfaces multiple equally strong candidates that require a judgment call.

### Find underserved angles
When evaluating a candidate topic (whether discovered or user-supplied):

1. **What's missing**: What questions do nurses ask that the top results don't fully answer?
2. **Keyword gaps**: Target long-tail queries — "travel nurse tax home IRS audit red flags", "Illinois travel nurse reciprocity Ohio" — not broad terms like "travel nurse taxes"
3. **Freshness gap**: Many top results use outdated rates (pre-2025). 2026 data is a differentiator — always use it
4. **Pillar vs. supporting**: Pillar posts (2000+ words, broad topic) earn links; supporting posts (800–1200 words, specific topic) target long-tail keywords and link back to the pillar

### High-priority topic clusters

| Cluster | Pillar | Supporting articles |
|---|---|---|
| Tax home | "Travel nurse tax home: complete guide" | IRS audit triggers, tax home vs domicile, maintaining ties |
| Compensation | "W2 vs 1099 travel nurse: real numbers" | agency vs independent, SE tax explained, LLC for 1099 |
| State taxes | "Best states for travel nurses (tax guide)" | Per-state supporting pages already exist at `/states/[code]` |
| Per diem | "Travel nurse stipends: what's taxable and what's not" | GSA rates explained, non-duplicative housing, M&IE breakdown |
| Filing | "How to file taxes as a travel nurse" | Multi-state returns, Form 2555, estimated quarterly taxes |

---

## Phase 2 — SEO structure

### URL slug
- All lowercase, hyphens only, no stop words
- Max 4–5 words: `travel-nurse-tax-home-guide`, `w2-vs-1099-travel-nurse`
- Must match the `slug.current` field in Sanity exactly

### Title tag (`seoTitle`)
- 50–60 characters
- Lead with the primary keyword: "Travel Nurse Tax Home: Complete 2026 Guide"
- Include year when the content is time-sensitive

### Meta description (`seoDescription`)
- 140–155 characters
- Answer the search intent directly in the first sentence
- End with a soft CTA: "Use our free calculator to see your numbers."

### H1 / heading hierarchy
```
H1: matches title (only one)
  H2: major topic sections (3–6 per post)
    H3: sub-questions, specific scenarios
```

### Keyword placement
- Primary keyword in H1, first paragraph, one H2, and the `seoTitle`
- Secondary keywords naturally in H2s and body copy
- Do NOT stuff — write for the nurse, not the crawler

---

## Phase 3 — GEO optimization (AI search)

Google AI Overviews, ChatGPT, and Perplexity pull **citable passages** — short, self-contained, factually dense chunks. Structure every post to produce these:

### Techniques
1. **Definition boxes**: Start every new concept with a 1–2 sentence definition written as a standalone fact. E.g.: *"A tax home is the general area of your main place of business, regardless of where your family lives. The IRS uses this to determine whether travel expense stipends are tax-free."*
2. **Numbered rules**: When the IRS has specific tests (e.g., the 3-part tax home test), present them as a numbered list — AI models cite lists reliably
3. **Direct answers first**: Put the conclusion before the explanation. "Travel nurses on W2 contracts pay less total tax than 1099 in most cases — here's why."
4. **Data claims with source inline**: "The 2026 standard federal mileage rate is 70 cents/mile (IRS Rev. Proc. 2025-XX)." — inline attribution makes passages more citable
5. **FAQ section**: End every post with 4–6 Q&A pairs targeting "People also ask" variants. These map directly to AI overview triggers.

### llms.txt signal
The site already has `public/llms.txt`. After publishing a post, add a one-line entry for it if the topic is high-value enough for AI citation.

---

## Phase 4 — Internal links

Every post must link to at least **2 tools** and **2 other content pages**.

### Tool CTAs (contextual, not just footer)
Insert tool CTAs inline when the topic naturally leads there:

| If writing about... | Link to |
|---|---|
| Contract comparison, take-home pay | `/calculator/contract-analyzer` |
| W2 vs 1099 decision | `/calculator/w2-vs-1099` |
| Whether stipends are tax-free | `/quiz/tax-home` |
| GSA rates, housing gap | `/calculator/per-diem` |
| Specific assignment state | `/states/[state-code]` |

**CTA phrasing**: Make it a value proposition, not a generic "click here":
> "See exactly how this plays out with your numbers → [Contract Analyzer]"

### Cross-post links
- Always link to the relevant pillar post from supporting posts
- Link supporting posts from the pillar post's body (not just a "related articles" list)
- Link to state guide pages when a specific state is mentioned: "If you're taking an assignment in [Ohio](/states/oh), reciprocity may eliminate your assignment-state tax entirely."

---

## Phase 5 — External links and source verification

**Policy**: Every factual claim about tax law, IRS rules, or rates must cite a primary source. No citing other blogs as sources.

### Authoritative sources

| Topic | Source | URL pattern |
|---|---|---|
| Federal tax brackets | IRS Revenue Procedure | irs.gov/newsroom or irs.gov/pub/irs-drop/ |
| FICA / SE tax rates | IRS Publication 15 / Schedule SE | irs.gov/publications |
| Tax home definition | IRS Publication 463 | irs.gov/pub/irs-pdf/p463.pdf |
| GSA per diem rates | GSA FY2026 | gsa.gov/travel/plan-book/per-diem-rates |
| State income tax rates | Tax Foundation | taxfoundation.org/data/all/state/ |
| State-specific rates | Official state tax commission sites | (see `/states/[code]` pages for per-state links) |
| Reciprocity agreements | Tax Foundation bilateral pairs + official state withholding forms | |

### Link hygiene
- Use descriptive anchor text: "IRS Publication 463 (Travel Expenses)" not "click here"
- Open external links without nofollow — these are authoritative government/research sites
- Verify every URL resolves before publishing

---

## Phase 6 — Content quality checklist

Before publishing, verify:

- [ ] All tax rates and dollar thresholds are 2026 values, verified from primary source
- [ ] Post ends with a disclaimer that the content is for informational purposes, not tax advice — recommend consulting a CPA
- [ ] At least one concrete numeric example (not just "it depends")
- [ ] No passive hedging in the intro — lead with the answer
- [ ] Reading level: aim for Flesch-Kincaid Grade 10–12 (specific, not dumbed-down)
- [ ] All internal tool links use the exact path from the route map
- [ ] `relatedTool` field set to the single most relevant tool
- [ ] `excerpt` is 1–2 sentences, 160 characters max, usable as a standalone teaser

---

## Phase 7 — Sanity publishing

Use the Sanity MCP tools (`mcp__Sanity__create_documents`, `mcp__Sanity__publish_documents`). The project ID `d6zuwu9e` and dataset `production` must be active in the MCP context.

### Document structure
```json
{
  "_type": "post",
  "title": "...",
  "slug": { "_type": "slug", "current": "kebab-case-url" },
  "publishedAt": "2026-06-19T00:00:00Z",
  "excerpt": "160-char teaser...",
  "seoTitle": "50-60 char title tag",
  "seoDescription": "140-155 char meta description",
  "relatedTool": "contract-analyzer",
  "body": [ /* PortableText blocks */ ]
}
```

### PortableText body format
- Normal paragraph: `{ "_type": "block", "style": "normal", "children": [{ "_type": "span", "text": "..." }] }`
- H2: `{ "_type": "block", "style": "h2", "children": [{ "_type": "span", "text": "..." }] }`
- H3: `{ "_type": "block", "style": "h3", ... }`
- Bullet list item: `{ "_type": "block", "style": "normal", "listItem": "bullet", "level": 1, ... }`
- Bold span: `{ "_type": "span", "text": "...", "marks": ["strong"] }`

### Hyperlinks in PortableText (required for CTAs)
Links use `markDefs` on the block, referenced by key in the span's `marks` array. **Every CTA must be a real link — never just bold text.**

```json
{
  "_type": "block",
  "_key": "p1",
  "style": "normal",
  "markDefs": [
    { "_key": "lnk1", "_type": "link", "href": "/calculator/w2-vs-1099" }
  ],
  "children": [
    { "_type": "span", "_key": "s1", "text": "See your exact numbers → " },
    { "_type": "span", "_key": "s2", "text": "W2 vs. 1099 Calculator", "marks": ["lnk1"] }
  ]
}
```

For external links, use the full URL in `href`. Each block that contains a link needs its own `markDefs` array.

### Prose quality rules
- **Write paragraphs, not bullet walls.** Use flowing prose for explanations. Reserve bullet lists for genuinely enumerable items (3+ parallel items with no narrative connective tissue).
- **Never use pipes (`|`) inside bullet text** to simulate a table — write a real sentence instead.
- **One CTA per major section** — embedded naturally in a prose paragraph, not appended as a standalone line.
- **Vary sentence length.** Short punchy sentences for key facts; longer sentences for nuance.
- Read the post aloud before publishing. If it sounds like a spec sheet, rewrite it as a conversation.

After `create_documents`, call `publish_documents` with the document ID to move draft → published.

### Verify env var in Vercel
`NEXT_PUBLIC_SANITY_PROJECT_ID` must be set to `d6zuwu9e` in Vercel for the blog to render. Check with `vercel env ls` if the blog 404s after publishing.

---

## Quick-start checklist for a new post

1. Search Reddit/Google for the topic — note the top 3 gaps not answered by existing results
2. Draft outline: H1 → H2s → key facts per section → FAQ questions
3. Write body: definition first, answer before explanation, inline source citations
4. Insert internal CTAs at natural decision points
5. Fill `seoTitle`, `seoDescription`, `excerpt`, `relatedTool`
6. Verify all rates against primary sources
7. Publish: `create_documents` → `publish_documents`
8. Confirm render at `https://www.travelnursetax.app/blog/[slug]`
