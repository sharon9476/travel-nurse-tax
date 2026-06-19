import Link from 'next/link'
import { STATE_TAX_RATES, formatTaxRate } from '@/lib/tax/states'
import { RECIPROCITY_MAP } from '@/lib/tax/reciprocity'

const NO_TAX_STATES = Object.entries(STATE_TAX_RATES)
  .filter(([, cfg]) => !cfg.hasIncomeTax)
  .map(([code, cfg]) => ({ code, name: cfg.name }))
  .sort((a, b) => a.name.localeCompare(b.name))

const TAX_STATES = Object.entries(STATE_TAX_RATES)
  .filter(([, cfg]) => cfg.hasIncomeTax)
  .map(([code, cfg]) => ({ code, name: cfg.name, rateLabel: formatTaxRate(cfg) }))
  .sort((a, b) => a.name.localeCompare(b.name))

export default function StatesPage() {
  return (
    <main className="min-h-screen" style={{ background: 'var(--navy)', color: 'var(--foreground)' }}>
      <div className="max-w-5xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-10">
          <nav className="text-sm mb-4" style={{ color: 'var(--muted-foreground)' }}>
            <Link href="/" className="hover:underline">Home</Link>
            <span className="mx-2">›</span>
            <span>State Tax Guide</span>
          </nav>
          <h1 className="text-3xl font-bold mb-3">Travel Nurse State Tax Guide</h1>
          <p className="text-lg max-w-2xl" style={{ color: 'var(--muted-foreground)' }}>
            Every state&apos;s income tax rate, reciprocity agreements, and what you need to know before accepting an assignment. Select your assignment state to get started.
          </p>
        </div>

        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium" style={{ background: 'rgba(46,191,165,0.15)', color: 'var(--teal)' }}>
              No Income Tax
            </span>
            States with No Income Tax ({NO_TAX_STATES.length})
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {NO_TAX_STATES.map(({ code, name }) => (
              <Link
                key={code}
                href={`/states/${code.toLowerCase()}`}
                className="flex items-center justify-between rounded-lg px-4 py-3 transition-colors hover:opacity-80"
                style={{ background: 'var(--surface-raised)', border: '1px solid rgba(46,191,165,0.2)' }}
              >
                <span className="font-medium text-sm">{name}</span>
                <span className="text-xs ml-2" style={{ color: 'var(--teal)' }}>{code}</span>
              </Link>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">States with Income Tax ({TAX_STATES.length})</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {TAX_STATES.map(({ code, name, rateLabel }) => {
              const hasRecip = code in RECIPROCITY_MAP
              return (
                <Link
                  key={code}
                  href={`/states/${code.toLowerCase()}`}
                  className="flex items-center justify-between rounded-lg px-4 py-3 transition-colors hover:opacity-80"
                  style={{ background: 'var(--surface-raised)', border: '1px solid rgba(255,255,255,0.06)' }}
                >
                  <div>
                    <div className="font-medium text-sm">{name}</div>
                    <div className="text-xs mt-0.5" style={{ color: 'var(--muted-foreground)' }}>{rateLabel}</div>
                  </div>
                  <div className="flex flex-col items-end gap-1 ml-2 shrink-0">
                    <span className="text-xs" style={{ color: 'var(--muted-foreground)' }}>{code}</span>
                    {hasRecip && (
                      <span className="text-xs px-1.5 py-0.5 rounded" style={{ background: 'rgba(240,165,0,0.15)', color: 'var(--amber)' }}>
                        Reciprocity
                      </span>
                    )}
                  </div>
                </Link>
              )
            })}
          </div>
        </section>

        <p className="mt-10 text-xs" style={{ color: 'var(--muted-foreground)' }}>
          Rates reflect 2026 tax year. Tax estimates are for informational purposes only — not tax advice.
        </p>
      </div>
    </main>
  )
}
