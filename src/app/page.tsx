import type { Metadata } from 'next'
import Image from 'next/image'
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
    icon: (
      <svg width="44" height="44" viewBox="0 0 44 44" fill="none" aria-hidden="true">
        <rect x="4" y="2" width="28" height="36" rx="3" fill="#2EBFA5" fillOpacity="0.12" stroke="#2EBFA5" strokeWidth="1.5" />
        <path d="M24 2v8h8" stroke="#2EBFA5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="9" y1="16" x2="24" y2="16" stroke="#2EBFA5" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="9" y1="21" x2="24" y2="21" stroke="#2EBFA5" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="9" y1="26" x2="18" y2="26" stroke="#2EBFA5" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="34" cy="34" r="9" fill="#0F1E2E" stroke="#F0A500" strokeWidth="1.5" />
        <line x1="34" y1="27" x2="34" y2="41" stroke="#F0A500" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M37 30c0-1.1-1.3-2-3-2s-3 .9-3 2c0 1.1 1.3 1.6 3 2.1s3 .9 3 2.1-1.3 2-3 2-3-.9-3-2" stroke="#F0A500" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    href: '/quiz/tax-home',
    title: 'Tax Home Quiz',
    description:
      "Eight questions. Know whether your tax home can survive an IRS audit — and what to fix if it can't.",
    cta: 'Take the quiz',
    icon: (
      <svg width="44" height="44" viewBox="0 0 44 44" fill="none" aria-hidden="true">
        <path d="M4 22L22 6l18 16" stroke="#2EBFA5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8 20v18a1 1 0 0 0 1 1h26a1 1 0 0 0 1-1V20" fill="#2EBFA5" fillOpacity="0.1" stroke="#2EBFA5" strokeWidth="1.5" strokeLinecap="round" />
        <rect x="17" y="28" width="10" height="11" rx="1" stroke="#2EBFA5" strokeWidth="1.5" />
        <circle cx="34" cy="12" r="8" fill="#0F1E2E" stroke="#F0A500" strokeWidth="1.5" />
        <path d="M30 12l3 3 5.5-6" stroke="#F0A500" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    href: '/calculator/per-diem',
    title: 'Per Diem Checker',
    description:
      "Compare your agency's housing and M&IE stipends to FY2025 GSA rates. See exactly how much tax-free income you're leaving unclaimed.",
    cta: 'Check your per diem',
    icon: (
      <svg width="44" height="44" viewBox="0 0 44 44" fill="none" aria-hidden="true">
        <path d="M14 5C9.6 5 6 8.6 6 13c0 7.2 8 17 8 17s8-9.8 8-17c0-4.4-3.6-8-8-8z" fill="#2EBFA5" fillOpacity="0.12" stroke="#2EBFA5" strokeWidth="1.5" />
        <circle cx="14" cy="13" r="3" stroke="#2EBFA5" strokeWidth="1.5" />
        <path d="M14 30c5 5 11 4 15 0" stroke="#2EBFA5" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="3 2" strokeOpacity="0.5" />
        <path d="M30 13C26.7 13 24 15.7 24 19c0 5.5 6 13 6 13s6-7.5 6-13c0-3.3-2.7-6-6-6z" fill="#F0A500" fillOpacity="0.15" stroke="#F0A500" strokeWidth="1.5" />
        <circle cx="30" cy="19" r="2.5" stroke="#F0A500" strokeWidth="1.5" />
      </svg>
    ),
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

      {/* Hero — full-bleed photo with dark overlay */}
      <section className="relative min-h-[62vh] flex items-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=1920&q=80"
          alt="Smiling female travel nurse in white coat"
          fill
          className="object-cover object-center"
          priority
          unoptimized
        />
        {/* gradient fades to page bg at the bottom so tool cards blend in */}
        <div className="absolute inset-0 bg-gradient-to-b from-navy/70 via-navy/75 to-navy" />

        <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-28 text-center space-y-6">
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
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">

        {/* Tool Cards — with SVG illustrations */}
        <section aria-labelledby="tools-heading">
          <h2 id="tools-heading" className="sr-only">Available calculators</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {TOOLS.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="group bg-surface-raised rounded-xl border border-white/10 p-6 hover:border-teal/40 transition-colors space-y-3"
              >
                {tool.icon}
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
          <p className="text-sm text-muted-foreground">Used by travel nurses across 47 states</p>
        </div>

        {/* Explainer — text left, photo right */}
        <section aria-labelledby="explainer-heading">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 id="explainer-heading" className="text-xl font-bold text-foreground">
                Why travel nurse taxes are different
              </h2>
              <div className="space-y-5 text-sm text-muted-foreground leading-relaxed">
                <p>
                  Most tax tools are built for W-2 employees in a single state. Travel nurses face a
                  fundamentally different situation: income split between taxable wages and tax-free
                  stipends, employment in multiple states throughout the year, and eligibility rules
                  that hinge on whether the IRS recognizes your home as a legitimate &ldquo;tax
                  home.&rdquo; Generic calculators get this badly wrong — they either ignore stipends
                  entirely or treat them as income when they shouldn&apos;t be.
                </p>
                <p>
                  The core mechanic of travel nurse compensation is the split package. Agencies divide
                  your total compensation into a lower taxable hourly rate and larger tax-free stipends
                  for housing and meals. If your tax home is valid, those stipends are completely exempt
                  from federal and state income tax and FICA — dramatically reducing your effective tax
                  rate. A nurse earning $22/hr taxable plus $1,700/week in stipends often takes home
                  more than a staff nurse earning $45/hr, purely because of the tax treatment.
                </p>
                <p>
                  Multi-state filing is the other complexity most nurses underestimate. Every state
                  where you earn wages generally requires a non-resident tax return. Some states have
                  reciprocity agreements that eliminate the double filing. Others have no income tax,
                  which creates assignment opportunities worth more than their headline rate suggests.
                </p>
              </div>
            </div>

            {/* Photo with floating stat — hidden on mobile */}
            <div className="relative hidden md:block">
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1690306816872-91063f6de36b?auto=format&fit=crop&w=800&q=80"
                  alt="Travel nurse in scrubs with stethoscope"
                  fill
                  className="object-cover object-center"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/50 via-transparent to-transparent" />
              </div>
              {/* Floating stat chip */}
              <div className="absolute -bottom-4 -left-4 bg-surface-raised border border-white/15 rounded-xl px-5 py-4 shadow-xl">
                <p className="text-xs text-muted-foreground">Avg. tax-free stipends</p>
                <p className="data-mono text-2xl font-bold mt-0.5" style={{ color: 'var(--amber)' }}>
                  $1,650<span className="text-sm font-normal text-muted-foreground">/wk</span>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="max-w-3xl mx-auto space-y-4" aria-labelledby="faq-heading">
          <h2 id="faq-heading" className="text-xl font-bold text-foreground">
            Common questions
          </h2>
          <div className="space-y-4">
            {FAQ_SCHEMA.mainEntity.map((item) => (
              <div
                key={item.name}
                className="bg-surface-raised rounded-lg border border-white/10 p-5 space-y-2"
              >
                <h3 className="text-sm font-semibold text-foreground">{item.name}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.acceptedAnswer.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Photo attribution */}
        <p className="text-center text-xs text-muted-foreground/40">
          Photos via{' '}
          <a
            href="https://unsplash.com"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-muted-foreground transition-colors"
          >
            Unsplash
          </a>
        </p>
      </div>
    </>
  )
}
