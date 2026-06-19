import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'TravelNurseTax — Free Tax Calculators for Travel Nurses',
  description:
    'Free tax calculators built specifically for travel nurses. Analyze contracts, check your tax home eligibility, and verify GSA per diem rates in 60 seconds.',
}

const TOOLS = [
  {
    href: '/calculator/contract-analyzer',
    title: 'Contract Analyzer',
    description:
      'Enter your taxable rate, stipends, and states. Get your real effective hourly rate after federal, FICA, and multi-state taxes.',
    cta: 'Analyze a contract',
  },
  {
    href: '/quiz/tax-home',
    title: 'Tax Home Quiz',
    description:
      'Eight questions. Know whether your tax home can survive an IRS audit — and what to fix if it can\'t.',
    cta: 'Take the quiz',
  },
  {
    href: '/calculator/per-diem',
    title: 'Per Diem Checker',
    description:
      'Compare your agency\'s housing and M&IE stipends to FY2025 GSA rates. See exactly how much tax-free income you\'re leaving unclaimed.',
    cta: 'Check your per diem',
  },
]

const FAQ_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Are travel nurse stipends taxable?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Travel nurse stipends — housing and meals & incidental expenses (M&IE) — are tax-free only if you maintain a valid tax home. If you have a permanent residence you return to, pay duplicate living expenses while on assignment, and have local business connections, your stipends are generally not subject to federal or state income tax or FICA. If you do not have a valid tax home, the IRS considers you an itinerant worker and your stipends become taxable wages.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is a tax home for travel nurses?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A tax home is your primary place of business or employment — typically where you maintain a permanent residence and have ongoing professional connections. For travel nurses, a tax home generally requires: (1) a permanent home in your home state that you maintain and pay for, (2) regular work in your home area (per diem shifts or PRN work), and (3) a pattern of returning home between assignments. The IRS applies a three-factor test, and nurses who meet all three factors have the strongest position.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do travel nurses have to file taxes in every state they work in?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Generally, yes — travel nurses must file a non-resident tax return in each state where they earned income during the year, in addition to their home state return. However, there are exceptions: if your home state and work state have a reciprocity agreement, you only file in your home state. Additionally, states with no income tax (Florida, Texas, Nevada, Washington, etc.) require no return. A travel nurse who works in three different states in a year typically files three to four state returns.',
      },
    },
  ],
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
        {/* Hero */}
        <section className="text-center space-y-5">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight tracking-tight max-w-3xl mx-auto">
            Finally, tax tools built for how travel nursing{' '}
            <span className="text-teal">actually works.</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Stipends, dual-state filing, tax home rules — calculated in 60 seconds. Free.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <Link
              href="/calculator/contract-analyzer"
              className="bg-teal text-teal-foreground font-semibold px-6 py-3 rounded-lg hover:opacity-90 transition-opacity text-sm"
            >
              Analyze my contract
            </Link>
            <Link
              href="/quiz/tax-home"
              className="bg-surface-raised border border-white/15 text-foreground font-medium px-6 py-3 rounded-lg hover:bg-white/10 transition-colors text-sm"
            >
              Check my tax home
            </Link>
          </div>
        </section>

        {/* Tool Cards */}
        <section aria-labelledby="tools-heading">
          <h2 id="tools-heading" className="sr-only">Available calculators</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {TOOLS.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="group bg-surface-raised rounded-xl border border-white/10 p-6 hover:border-teal/40 transition-colors space-y-3"
              >
                <h3 className="font-semibold text-foreground group-hover:text-teal transition-colors">
                  {tool.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{tool.description}</p>
                <span className="text-sm text-teal font-medium inline-flex items-center gap-1">
                  {tool.cta} &rarr;
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Social proof */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Used by travel nurses across 47 states
          </p>
        </div>

        {/* Explainer */}
        <section className="max-w-3xl mx-auto space-y-6" aria-labelledby="explainer-heading">
          <h2 id="explainer-heading" className="text-xl font-bold text-foreground">
            Why travel nurse taxes are different
          </h2>

          <div className="space-y-5 text-sm text-muted-foreground leading-relaxed">
            <p>
              Most tax tools are built for W-2 employees in a single state. Travel nurses face a fundamentally
              different situation: income split between taxable wages and tax-free stipends, employment in
              multiple states throughout the year, and eligibility rules that hinge on whether the IRS
              recognizes your home as a legitimate &ldquo;tax home.&rdquo; Generic calculators get this badly wrong —
              they either ignore stipends entirely or treat them as income when they shouldn&apos;t be.
            </p>

            <p>
              The core mechanic of travel nurse compensation is the split package. Agencies divide your
              total compensation into a lower taxable hourly rate and larger tax-free stipends for housing
              and meals. If your tax home is valid, those stipends are completely exempt from federal and
              state income tax and FICA — dramatically reducing your effective tax rate. A nurse earning
              $22/hr taxable plus $1,700/week in stipends often takes home more than a staff nurse earning
              $45/hr, purely because of the tax treatment. But that advantage disappears entirely if the IRS
              determines you don&apos;t have a valid tax home.
            </p>

            <p>
              Multi-state filing is the other complexity most nurses underestimate. Every state where you
              earn wages generally requires a non-resident tax return. Some states have reciprocity agreements
              that eliminate the double filing. Others have no income tax, which creates assignment
              opportunities that are worth more than their headline rate suggests. The interaction between your
              home state tax rate, your assignment state&apos;s rate, and any reciprocity agreement determines
              your true after-tax income — and that number can vary by thousands of dollars for the same
              contract in different states. These calculators work through the actual math so you can
              compare offers on equal footing.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="max-w-3xl mx-auto space-y-4" aria-labelledby="faq-heading">
          <h2 id="faq-heading" className="text-xl font-bold text-foreground">
            Common questions
          </h2>

          <div className="space-y-4">
            {FAQ_SCHEMA.mainEntity.map((item) => (
              <div key={item.name} className="bg-surface-raised rounded-lg border border-white/10 p-5 space-y-2">
                <h3 className="text-sm font-semibold text-foreground">{item.name}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.acceptedAnswer.text}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  )
}
