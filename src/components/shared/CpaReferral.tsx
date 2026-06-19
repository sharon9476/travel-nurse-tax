import Link from 'next/link'

export default function CpaReferral() {
  return (
    <div className="bg-surface-raised rounded-lg border border-white/10 p-5">
      <h3 className="text-sm font-semibold text-foreground mb-1">Want a precise number?</h3>
      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
        Travel nurse taxes are complex. A specialist CPA can file all your state returns, protect your
        stipends from an audit, and often saves more than their fee.
      </p>
      <Link
        href="/resources/find-a-cpa"
        className="inline-flex items-center text-sm font-medium text-teal hover:text-foreground transition-colors"
      >
        Find a travel nurse CPA &rarr;
      </Link>
    </div>
  )
}
