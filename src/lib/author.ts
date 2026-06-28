// Single source of truth for author / founder identity.
// Reused by the author page, About page, blog bylines, structured data, and the sitemap so the
// name, role, and verifying links never drift out of sync. Keyed by slug to allow more writers later.

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.travelnursetax.app'
const ORG_NAME = 'TravelNurseTax'

export interface Author {
  slug: string
  name: string
  role: string
  bio: string // short bio — used in the byline context and as Person.description
  longBio?: string[] // paragraphs for the dedicated author page
  image?: string // path under /public, e.g. "/sharon-ben-moshe.jpg"; omit until a real one exists
  links: string[] // profiles that verify identity (Person.sameAs): LinkedIn, X, GitHub, …
}

export const AUTHORS: Record<string, Author> = {
  'sharon-ben-moshe': {
    slug: 'sharon-ben-moshe',
    name: 'Sharon Ben-Moshe',
    role: 'Founder & Editor',
    bio:
      'Sharon Ben-Moshe is the founder of TravelNurseTax. She built these calculators to give travel ' +
      'nurses tax tools that actually account for stipends, dual-state filing, and tax home rules - the ' +
      'things generic calculators get wrong.',
    longBio: [
      'I built TravelNurseTax because every tax calculator I could find assumed you were a W-2 employee ' +
        'in a single state - the one thing travel nurses never are. The goal is a set of free tools that ' +
        'model the split-package, multi-state reality of travel nursing honestly, instead of pretending it ' +
        "doesn't exist.",
      "I`m the developer behind the tools, not a CPA. Every calculation is built from published sources - " +
        'IRS federal income tax brackets, current FICA rates, FY2026 GSA per diem tables, and state ' +
        'income-tax rules - and each result shows the assumptions it used. The tools are designed for ' +
        'planning and estimation; they are not tax advice. For anything complex - an unclear tax home, a ' +
        'large contract, or filing in three or more states - I point nurses to a travel-nurse-specialist CPA.',
      "If you find a calculation that looks wrong or a rate that`s gone out of date, I want to hear about " +
        'it - corrections from working nurses are how these tools stay accurate.',
    ],
    image: '/sharon-ben-moshe.jpg', // ← set after adding a headshot to /public
    links: ['https://www.linkedin.com/in/sharon-ben-moshe/'],
  },
}

export const DEFAULT_AUTHOR = AUTHORS['sharon-ben-moshe']

// Organization.sameAs (company profiles). Seeded with the founder's profile so the entity has at least
// one verifying URL today; swap in a dedicated company LinkedIn / X / Crunchbase page when one exists.
export const COMPANY_SAME_AS: string[] = [DEFAULT_AUTHOR.links[0]]

export const authorPath = (slug: string) => `/authors/${slug}` // internal links (relative)
export const authorUrl = (slug: string) => `${SITE_URL}/authors/${slug}` // schema url/@id (absolute)

/** Full Person node for a dedicated author page. */
export function authorPersonJsonLd(a: Author) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: a.name,
    url: authorUrl(a.slug),
    jobTitle: a.role,
    description: a.bio,
    ...(a.image ? { image: `${SITE_URL}${a.image}` } : {}),
    sameAs: a.links,
    worksFor: { '@type': 'Organization', name: ORG_NAME, url: SITE_URL },
  }
}

/** Lightweight Person reference for embedding as Article.author / Organization.founder. */
export function authorRefJsonLd(a: Author) {
  return {
    '@type': 'Person',
    name: a.name,
    url: authorUrl(a.slug),
    ...(a.links.length ? { sameAs: a.links } : {}),
  }
}
