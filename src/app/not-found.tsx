import Link from 'next/link'

const TOOL_LINKS = [
  { href: '/calculator/contract-analyzer', label: 'Contract Analyzer' },
  { href: '/quiz/tax-home', label: 'Tax Home Quiz' },
  { href: '/calculator/per-diem', label: 'Per Diem Checker' },
  { href: '/calculator/w2-vs-1099', label: 'W2 vs 1099 Calculator' },
  { href: '/states', label: 'State Tax Guide' },
]

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center space-y-8">
        <div className="space-y-3">
          <p className="text-6xl font-bold text-teal">404</p>
          <h1 className="text-2xl font-bold text-foreground">Page not found</h1>
          <p className="text-muted-foreground leading-relaxed">
            That URL doesn&apos;t exist — it may have moved or you may have followed an old link.
          </p>
        </div>

        <div className="space-y-4">
          <Link
            href="/"
            className="inline-block bg-teal text-teal-foreground font-semibold px-6 py-3 rounded-lg hover:opacity-90 transition-opacity text-sm"
          >
            Back to homepage
          </Link>

          <div className="bg-surface-raised rounded-xl border border-white/10 p-6 text-left space-y-3">
            <p className="text-sm font-semibold text-foreground">Jump to a tool:</p>
            <ul className="space-y-2">
              {TOOL_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-teal hover:opacity-80 transition-opacity flex items-center gap-1"
                  >
                    {label} &rarr;
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
