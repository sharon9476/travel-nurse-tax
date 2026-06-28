import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with TravelNurseTax. Email us at support@travelnursetax.app for questions about calculators, tax data, or suggestions.',
  alternates: { canonical: '/contact' },
}

const FAQ = [
  {
    q: 'My calculation looks wrong — what should I include?',
    a: "Include your taxable hourly rate, hours per week, stipend amounts, home state, and assignment state. Screenshots of the results screen help us reproduce the issue quickly.",
  },
  {
    q: 'Can you help me file my taxes or review my contract?',
    a: "We can't provide individual tax advice or contract review — these tools are for planning estimates only. For professional help, look for a CPA who specializes in travel nurse taxation.",
  },
  {
    q: 'A state tax rate or GSA rate looks out of date.',
    a: "Please let us know which state or city and what the correct rate should be, with a link to the official source if you have one. We update rates when notified.",
  },
  {
    q: 'I have an idea for a new tool or feature.',
    a: "We'd love to hear it. Describe the problem you're trying to solve and we'll evaluate whether it fits the roadmap.",
  },
]

export default function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-14">

      {/* Breadcrumb */}
      <nav className="text-sm text-muted-foreground" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
        <span className="mx-2">›</span>
        <span>Contact</span>
      </nav>

      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-foreground">Contact Us</h1>
        <p className="text-muted-foreground leading-relaxed">
          For questions, bug reports, data corrections, or feature suggestions, email us directly.
          We typically respond within one to two business days.
        </p>
      </div>

      {/* Contact card */}
      <div className="bg-surface-raised rounded-xl border border-white/10 p-8 space-y-6">
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Email</p>
          <a
            href="mailto:support@travelnursetax.app"
            className="text-xl font-semibold text-teal hover:opacity-80 transition-opacity"
          >
            support@travelnursetax.app
          </a>
        </div>
        <div className="border-t border-white/10 pt-6 space-y-3">
          <p className="text-sm font-semibold text-foreground">What to include in your message</p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex gap-2"><span className="text-teal shrink-0">&rarr;</span> Which tool or page you&apos;re using</li>
            <li className="flex gap-2"><span className="text-teal shrink-0">&rarr;</span> What you entered and what result you got</li>
            <li className="flex gap-2"><span className="text-teal shrink-0">&rarr;</span> What you expected to see instead</li>
            <li className="flex gap-2"><span className="text-teal shrink-0">&rarr;</span> A screenshot if you have one</li>
          </ul>
        </div>
      </div>

      {/* FAQ */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-foreground">Before you write</h2>
        <div className="space-y-4">
          {FAQ.map((item) => (
            <div key={item.q} className="bg-surface-raised rounded-lg border border-white/10 p-5 space-y-2">
              <p className="text-sm font-semibold text-foreground">{item.q}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer note */}
      <p className="text-xs text-muted-foreground leading-relaxed">
        TravelNurseTax does not provide legal, financial, or tax advice. All tool outputs are
        estimates for planning purposes only. See our{' '}
        <Link href="/terms" className="underline hover:text-muted-foreground transition-colors">Terms of Service</Link>
        {' '}for details.
      </p>

    </div>
  )
}
