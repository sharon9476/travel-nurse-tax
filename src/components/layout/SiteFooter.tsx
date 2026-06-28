import Link from 'next/link'
import { DEFAULT_AUTHOR, authorPath } from '@/lib/author'

const TOOL_LINKS = [
  { href: '/calculator/contract-analyzer', label: 'Contract Analyzer' },
  { href: '/quiz/tax-home', label: 'Tax Home Quiz' },
  { href: '/calculator/per-diem', label: 'Per Diem Checker' },
  { href: '/calculator/w2-vs-1099', label: 'W2 vs 1099 Calculator' },
  { href: '/states', label: 'State Tax Guide' },
]

export default function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-navy border-t border-white/10 mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <div className="space-y-3">
            <p className="font-semibold text-foreground">TravelNurseTax</p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Free tax calculators built for how travel nursing actually works — stipends, dual-state filing, and tax home rules included.
            </p>
            <p className="text-sm text-muted-foreground">
              Built and maintained by{' '}
              <Link
                href={authorPath(DEFAULT_AUTHOR.slug)}
                className="text-foreground hover:text-teal transition-colors font-medium"
              >
                {DEFAULT_AUTHOR.name}
              </Link>
            </p>
          </div>

          {/* Tools */}
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Tools</p>
            <ul className="space-y-2">
              {TOOL_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Company</p>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 space-y-2 text-center">
          <p className="text-sm text-muted-foreground">
            &copy; {year} TravelNurseTax.app
          </p>
          <p className="text-xs text-muted-foreground max-w-2xl mx-auto">
            All calculations are estimates for informational purposes only and do not constitute tax advice.
            Consult a qualified tax professional before making financial decisions.
          </p>
        </div>
      </div>
    </footer>
  )
}
