import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { STATE_TAX_RATES, formatTaxRate, getTopMarginalRate } from '@/lib/tax/states'
import { RECIPROCITY_MAP } from '@/lib/tax/reciprocity'

type Props = { params: Promise<{ state: string }> }

export async function generateStaticParams() {
  return Object.keys(STATE_TAX_RATES).map((code) => ({ state: code.toLowerCase() }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { state } = await params
  const code = state.toUpperCase()
  const cfg = STATE_TAX_RATES[code]
  if (!cfg) return {}
  const rateLabel = cfg.hasIncomeTax ? formatTaxRate(cfg) : 'no state income tax'
  return {
    title: `Travel Nurse Taxes in ${cfg.name} — 2026 Guide | TravelNurseTax`,
    description: `${cfg.name} has ${rateLabel}. See reciprocity agreements, per diem tips, and tools to calculate your real take-home pay as a travel nurse in ${cfg.name}.`,
    alternates: { canonical: `https://www.travelnursetax.app/states/${state}` },
    openGraph: {
      title: `Travel Nurse Tax Guide: ${cfg.name}`,
      description: `Income tax rates, reciprocity agreements, and take-home pay tools for travel nurses assigned to ${cfg.name}.`,
    },
  }
}

function BracketTable({ brackets }: { brackets: { rate: number; min: number; max: number }[] }) {
  return (
    <table className="w-full text-sm mt-3">
      <thead>
        <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <th className="text-left py-1.5 font-medium" style={{ color: 'var(--muted-foreground)' }}>Income</th>
          <th className="text-right py-1.5 font-medium" style={{ color: 'var(--muted-foreground)' }}>Rate</th>
        </tr>
      </thead>
      <tbody>
        {brackets.map((b, i) => (
          <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
            <td className="py-1.5">
              {b.max === Infinity
                ? `Over $${b.min.toLocaleString()}`
                : b.min === 0
                ? `$0 – $${b.max.toLocaleString()}`
                : `$${b.min.toLocaleString()} – $${b.max.toLocaleString()}`}
            </td>
            <td className="text-right py-1.5 data-mono">{(b.rate * 100).toFixed(2).replace(/\.?0+$/, '')}%</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default async function StatePage({ params }: Props) {
  const { state } = await params
  const code = state.toUpperCase()
  const cfg = STATE_TAX_RATES[code]
  if (!cfg) notFound()

  const recipStates = RECIPROCITY_MAP[code] ?? []
  const topRate = getTopMarginalRate(cfg)

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.travelnursetax.app' },
          { '@type': 'ListItem', position: 2, name: 'State Tax Guide', item: 'https://www.travelnursetax.app/states' },
          { '@type': 'ListItem', position: 3, name: cfg.name, item: `https://www.travelnursetax.app/states/${state}` },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: `Does ${cfg.name} have a state income tax?`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: cfg.hasIncomeTax
                ? `Yes. ${cfg.name} taxes wage income at ${formatTaxRate(cfg)} for 2026.`
                : `No. ${cfg.name} does not tax wage income, making it a popular assignment state for travel nurses who want to maximize take-home pay.`,
            },
          },
          ...(recipStates.length > 0 ? [{
            '@type': 'Question',
            name: `Does ${cfg.name} have tax reciprocity with other states?`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: `Yes. If you live in ${recipStates.map(s => STATE_TAX_RATES[s]?.name ?? s).join(', ')}, you may only owe income tax to your home state — not ${cfg.name} — on wages earned there. File the appropriate exemption form with your agency.`,
            },
          }] : []),
          {
            '@type': 'Question',
            name: `How do travel nurse stipends work in ${cfg.name}?`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: `Tax-free housing and M&IE stipends are not subject to ${cfg.name} state income tax, as long as you maintain a valid tax home. Only your taxable hourly wages count toward ${cfg.name} income tax.`,
            },
          },
        ],
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema)
            .replace(/</g, '\\u003c')
            .replace(/>/g, '\\u003e')
            .replace(/&/g, '\\u0026'),
        }}
      />
      <main className="min-h-screen" style={{ background: 'var(--navy)', color: 'var(--foreground)' }}>
        <div className="max-w-3xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <nav className="text-sm mb-6" style={{ color: 'var(--muted-foreground)' }}>
            <Link href="/" className="hover:underline">Home</Link>
            <span className="mx-2">›</span>
            <Link href="/states" className="hover:underline">State Tax Guide</Link>
            <span className="mx-2">›</span>
            <span>{cfg.name}</span>
          </nav>

          <h1 className="text-3xl font-bold mb-2">Travel Nurse Tax Guide: {cfg.name}</h1>
          <p className="mb-8" style={{ color: 'var(--muted-foreground)' }}>
            2026 income tax rates, reciprocity agreements, and tools to calculate your real take-home pay.
          </p>

          {/* Income Tax Card */}
          <div className="rounded-xl p-6 mb-6" style={{ background: 'var(--surface-raised)' }}>
            <h2 className="text-lg font-semibold mb-1">State Income Tax</h2>
            {!cfg.hasIncomeTax ? (
              <div className="flex items-center gap-3 mt-3">
                <span className="text-2xl font-bold" style={{ color: 'var(--teal)' }}>$0</span>
                <span className="text-sm px-2 py-1 rounded" style={{ background: 'rgba(46,191,165,0.15)', color: 'var(--teal)' }}>
                  No state income tax
                </span>
              </div>
            ) : cfg.flatRate !== undefined ? (
              <div className="flex items-center gap-3 mt-3">
                <span className="text-2xl font-bold data-mono" style={{ color: 'var(--amber)' }}>
                  {(cfg.flatRate * 100).toFixed(2).replace(/\.?0+$/, '')}%
                </span>
                <span className="text-sm" style={{ color: 'var(--muted-foreground)' }}>flat rate on all taxable wages</span>
              </div>
            ) : cfg.brackets ? (
              <>
                <div className="flex items-center gap-3 mt-3 mb-4">
                  <span className="text-2xl font-bold data-mono" style={{ color: 'var(--amber)' }}>
                    {(topRate * 100).toFixed(2).replace(/\.?0+$/, '')}%
                  </span>
                  <span className="text-sm" style={{ color: 'var(--muted-foreground)' }}>top marginal rate</span>
                </div>
                <BracketTable brackets={cfg.brackets} />
              </>
            ) : null}
            <p className="text-xs mt-4" style={{ color: 'var(--muted-foreground)' }}>
              Only your taxable hourly wages are subject to {cfg.name} state income tax. Tax-free stipends (housing, M&amp;IE) are excluded.
            </p>
          </div>

          {/* Reciprocity Card */}
          <div className="rounded-xl p-6 mb-6" style={{ background: 'var(--surface-raised)' }}>
            <h2 className="text-lg font-semibold mb-3">Reciprocity Agreements</h2>
            {recipStates.length === 0 ? (
              <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
                {cfg.name} does not have reciprocity agreements with other states. If you live in a different state, you&apos;ll file a non-resident return in {cfg.name} for wages earned here.
              </p>
            ) : (
              <>
                <p className="text-sm mb-4" style={{ color: 'var(--muted-foreground)' }}>
                  If you live in one of these states and your only {cfg.name} income is wages, you pay income tax only to your home state — not {cfg.name}:
                </p>
                <div className="flex flex-wrap gap-2">
                  {recipStates.map((s) => (
                    <Link
                      key={s}
                      href={`/states/${s.toLowerCase()}`}
                      className="px-3 py-1.5 rounded-lg text-sm font-medium hover:opacity-80 transition-opacity"
                      style={{ background: 'rgba(240,165,0,0.12)', color: 'var(--amber)', border: '1px solid rgba(240,165,0,0.25)' }}
                    >
                      {STATE_TAX_RATES[s]?.name ?? s}
                    </Link>
                  ))}
                </div>
                <p className="text-xs mt-4" style={{ color: 'var(--muted-foreground)' }}>
                  Give your agency the appropriate exemption form to stop withholding in the assignment state.
                </p>
              </>
            )}
          </div>

          {/* Tools CTA */}
          <div className="rounded-xl p-6 mb-6" style={{ background: 'var(--surface-raised)' }}>
            <h2 className="text-lg font-semibold mb-4">Calculate Your Take-Home in {cfg.name}</h2>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/calculator/contract-analyzer"
                className="flex-1 flex items-center justify-center rounded-lg px-4 py-3 text-sm font-medium transition-colors hover:opacity-80"
                style={{ background: 'var(--teal)', color: '#0F1E2E' }}
              >
                Analyze a Contract
              </Link>
              <Link
                href="/calculator/per-diem"
                className="flex-1 flex items-center justify-center rounded-lg px-4 py-3 text-sm font-medium transition-colors hover:opacity-80"
                style={{ background: 'rgba(46,191,165,0.12)', color: 'var(--teal)', border: '1px solid rgba(46,191,165,0.3)' }}
              >
                Check Per Diem Rates
              </Link>
            </div>
          </div>

          {/* FAQ */}
          <div className="mt-8">
            <h2 className="text-lg font-semibold mb-4">Common Questions</h2>
            <div className="space-y-4">
              <details className="rounded-lg p-4" style={{ background: 'var(--surface-raised)' }}>
                <summary className="cursor-pointer font-medium text-sm">
                  Does {cfg.name} have a state income tax?
                </summary>
                <p className="mt-2 text-sm" style={{ color: 'var(--muted-foreground)' }}>
                  {cfg.hasIncomeTax
                    ? `Yes. ${cfg.name} taxes wage income at ${formatTaxRate(cfg)} for 2026.`
                    : `No. ${cfg.name} does not tax wage income, making it a popular assignment state for travel nurses who want to maximize take-home pay.`}
                </p>
              </details>
              {recipStates.length > 0 && (
                <details className="rounded-lg p-4" style={{ background: 'var(--surface-raised)' }}>
                  <summary className="cursor-pointer font-medium text-sm">
                    Does {cfg.name} have tax reciprocity with other states?
                  </summary>
                  <p className="mt-2 text-sm" style={{ color: 'var(--muted-foreground)' }}>
                    Yes. If you live in {recipStates.map(s => STATE_TAX_RATES[s]?.name ?? s).join(', ')}, you may only owe income tax to your home state on wages earned in {cfg.name}. File the appropriate exemption form with your agency.
                  </p>
                </details>
              )}
              <details className="rounded-lg p-4" style={{ background: 'var(--surface-raised)' }}>
                <summary className="cursor-pointer font-medium text-sm">
                  How do travel nurse stipends work in {cfg.name}?
                </summary>
                <p className="mt-2 text-sm" style={{ color: 'var(--muted-foreground)' }}>
                  Tax-free housing and M&amp;IE stipends are not subject to {cfg.name} state income tax, as long as you maintain a valid tax home. Only your taxable hourly wages count toward {cfg.name} income tax.
                </p>
              </details>
            </div>
          </div>

          <p className="mt-10 text-xs" style={{ color: 'var(--muted-foreground)' }}>
            Rates reflect 2026 tax year. Tax estimates are for informational purposes only — not tax advice. Consult a tax professional for your specific situation.
          </p>
        </div>
      </main>
    </>
  )
}
