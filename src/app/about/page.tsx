import type { Metadata } from 'next'
import Link from 'next/link'
import { DEFAULT_AUTHOR, authorPath } from '@/lib/author'

export const metadata: Metadata = {
  title: 'About TravelNurseTax',
  description:
    'TravelNurseTax is a free suite of tax calculators built specifically for travel nurses — handling stipends, dual-state filing, and tax home rules that generic tools ignore.',
  alternates: { canonical: '/about' },
}

const TOOLS = [
  { href: '/calculator/contract-analyzer', label: 'Contract Analyzer', desc: 'Real after-tax take-home across federal, FICA, and multi-state taxes.' },
  { href: '/quiz/tax-home', label: 'Tax Home Quiz', desc: 'Eight questions that tell you exactly where your tax home stands with the IRS.' },
  { href: '/calculator/per-diem', label: 'Per Diem Checker', desc: 'Compare your agency stipends to FY2026 GSA rates by city.' },
  { href: '/calculator/w2-vs-1099', label: 'W2 vs 1099 Calculator', desc: 'Side-by-side after-tax comparison including self-employment tax and the SE deduction.' },
  { href: '/states', label: 'State Tax Guide', desc: 'Income tax rates, reciprocity agreements, and assignment context for all 50 states.' },
]

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">

      {/* Breadcrumb */}
      <nav className="text-sm text-muted-foreground" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
        <span className="mx-2">›</span>
        <span>About</span>
      </nav>

      {/* Hero */}
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-foreground">About TravelNurseTax</h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          TravelNurseTax is a free set of tax calculators built for the specific financial reality
          of travel nursing — not for the W-2 employee in a single state that every generic tax tool
          assumes you are.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          Travel nurses earn income in a way that most calculators handle badly: a split package of
          taxable wages and tax-free stipends, assignments across multiple states each year, and
          eligibility rules tied to whether the IRS recognizes your home as a legitimate &ldquo;tax
          home.&rdquo; Getting any of those pieces wrong can mean paying thousands more in taxes than
          you owe — or discovering after an audit that your stipends were never tax-free at all.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          These tools were built to close that gap. Every calculation accounts for the mechanics that
          matter to travel nurses: the taxable/stipend split, state reciprocity agreements, GSA per
          diem limits, the self-employment tax difference between W2 and 1099 contracts, and the
          three-factor IRS test for tax home validity.
        </p>
      </div>

      {/* What we built */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-foreground">What&apos;s here</h2>
        <div className="space-y-3">
          {TOOLS.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="group flex gap-4 bg-surface-raised rounded-xl border border-white/10 p-5 hover:border-teal/40 transition-colors"
            >
              <div className="space-y-1">
                <p className="text-sm font-semibold text-foreground group-hover:text-teal transition-colors">
                  {tool.label} &rarr;
                </p>
                <p className="text-sm text-muted-foreground">{tool.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Accuracy + limits */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-foreground">Accuracy and limits</h2>
        <p className="text-muted-foreground leading-relaxed">
          All calculations use 2025–2026 IRS federal tax brackets, current FICA rates, FY2026 GSA
          per diem tables, and simplified flat state income tax rates. They are designed to give you
          an accurate estimate for planning — not a tax return. State tax law changes frequently,
          reciprocity agreements can be modified, and individual situations vary in ways no calculator
          can fully capture.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          These tools are not a substitute for a qualified tax professional. If your contract is
          large, your tax home is unclear, or you are filing in three or more states, working with a
          travel nurse&ndash;specialist CPA will pay for itself quickly.
        </p>
      </div>

      {/* Who's behind this */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-foreground">Who&apos;s behind this</h2>
        <div className="flex items-start gap-5">
          <div
            aria-hidden="true"
            className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-teal/15 border border-teal/30 text-lg font-bold text-teal data-mono"
          >
            SB
          </div>
          <div className="space-y-2">
            <p className="text-muted-foreground leading-relaxed">
              TravelNurseTax is built and maintained by{' '}
              <Link
                href={authorPath(DEFAULT_AUTHOR.slug)}
                className="text-teal hover:opacity-80 transition-opacity font-medium"
              >
                {DEFAULT_AUTHOR.name}
              </Link>
              , its founder. {DEFAULT_AUTHOR.bio.replace(/^Sharon Ben-Moshe is the founder of TravelNurseTax\. /, '')}
            </p>
            <Link
              href={authorPath(DEFAULT_AUTHOR.slug)}
              className="text-sm text-teal hover:opacity-80 transition-opacity font-medium inline-flex items-center gap-1"
            >
              More about {DEFAULT_AUTHOR.name.split(' ')[0]} &rarr;
            </Link>
          </div>
        </div>
      </div>

      {/* Contact */}
      <div className="bg-surface-raised rounded-xl border border-white/10 p-6 space-y-3">
        <h2 className="text-lg font-semibold text-foreground">Questions or feedback?</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          If you find a calculation that looks wrong, a state rate that&apos;s out of date, or have
          a suggestion for a tool we should build, reach out.
        </p>
        <a
          href="mailto:support@travelnursetax.app"
          className="text-sm text-teal hover:opacity-80 transition-opacity font-medium"
        >
          support@travelnursetax.app
        </a>
      </div>

    </div>
  )
}
