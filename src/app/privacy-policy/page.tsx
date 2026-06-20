import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'TravelNurseTax privacy policy — what data we collect, how we use it, and your rights.',
  alternates: { canonical: '/privacy-policy' },
}

const EFFECTIVE_DATE = 'June 20, 2026'

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">

      {/* Breadcrumb */}
      <nav className="text-sm text-muted-foreground" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
        <span className="mx-2">›</span>
        <span>Privacy Policy</span>
      </nav>

      {/* Header */}
      <div className="space-y-3">
        <h1 className="text-3xl font-bold text-foreground">Privacy Policy</h1>
        <p className="text-sm text-muted-foreground">Effective date: {EFFECTIVE_DATE}</p>
        <p className="text-muted-foreground leading-relaxed">
          This policy describes what information TravelNurseTax (&ldquo;we,&rdquo; &ldquo;us,&rdquo;
          &ldquo;our&rdquo;) collects when you use{' '}
          <Link href="/" className="text-teal hover:opacity-80 transition-opacity">
            travelnursetax.app
          </Link>
          , how we use it, and what choices you have.
        </p>
      </div>

      <div className="space-y-10 text-sm text-muted-foreground leading-relaxed">

        <section className="space-y-4">
          <h2 className="text-lg font-bold text-foreground">1. Information we collect</h2>

          <div className="space-y-3">
            <h3 className="font-semibold text-foreground">Information you enter into our tools</h3>
            <p>
              Our calculators ask for financial inputs such as hourly rates, stipend amounts, states,
              and filing status. <strong className="text-foreground">This data is processed entirely
              in your browser.</strong> It is never sent to our servers and we do not store it.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-foreground">Usage data via Google Analytics</h3>
            <p>
              We use Google Analytics 4 to understand how visitors use the site — which pages are
              visited, how long sessions last, and which tools are used most. Google Analytics
              collects standard internet log data including your approximate IP address, browser
              type, device type, and pages visited. This data is aggregated and does not identify
              you personally.
            </p>
            <p>
              Google Analytics sets cookies on your device to track sessions across visits. You can
              opt out of Google Analytics tracking by installing the{' '}
              <a
                href="https://tools.google.com/dlpage/gaoptout"
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal hover:opacity-80 transition-opacity"
              >
                Google Analytics Opt-out Browser Add-on
              </a>
              {' '}or by using a browser extension that blocks analytics scripts.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-foreground">Email communications</h3>
            <p>
              If you contact us at{' '}
              <a href="mailto:support@travelnursetax.app" className="text-teal hover:opacity-80 transition-opacity">
                support@travelnursetax.app
              </a>
              , we receive your email address and the contents of your message. We use this only to
              respond to your inquiry and do not add you to any mailing list.
            </p>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-bold text-foreground">2. How we use information</h2>
          <ul className="space-y-2 list-disc list-inside">
            <li>To understand which tools and pages are most useful so we can improve them</li>
            <li>To respond to support requests and bug reports sent via email</li>
            <li>To monitor site performance and diagnose technical issues</li>
          </ul>
          <p>We do not sell your data. We do not use your data for advertising.</p>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-bold text-foreground">3. Cookies</h2>
          <p>
            The only cookies set on this site are those placed by Google Analytics for session
            tracking. We do not set any first-party cookies. You can disable cookies in your browser
            settings; this will not affect your ability to use any of the calculators.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-bold text-foreground">4. Third-party services</h2>
          <div className="space-y-3">
            <div className="bg-surface-raised rounded-lg border border-white/10 p-4 space-y-1">
              <p className="font-semibold text-foreground">Google Analytics</p>
              <p>Used for aggregated usage statistics. Governed by the{' '}
                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-teal hover:opacity-80 transition-opacity">
                  Google Privacy Policy
                </a>.
              </p>
            </div>
            <div className="bg-surface-raised rounded-lg border border-white/10 p-4 space-y-1">
              <p className="font-semibold text-foreground">Vercel</p>
              <p>This site is hosted on Vercel. Vercel may log standard web server access logs
              (IP address, request URL, timestamp) for security and performance purposes. See the{' '}
                <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-teal hover:opacity-80 transition-opacity">
                  Vercel Privacy Policy
                </a>.
              </p>
            </div>
            <div className="bg-surface-raised rounded-lg border border-white/10 p-4 space-y-1">
              <p className="font-semibold text-foreground">Unsplash</p>
              <p>Hero and illustrative images are served from Unsplash&apos;s CDN. Unsplash may
              log image requests. See the{' '}
                <a href="https://unsplash.com/privacy" target="_blank" rel="noopener noreferrer" className="text-teal hover:opacity-80 transition-opacity">
                  Unsplash Privacy Policy
                </a>.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-bold text-foreground">5. Data retention</h2>
          <p>
            Because we do not collect or store calculator inputs, there is no user data for us to
            retain or delete. Google Analytics data is retained per Google&apos;s default settings
            (26 months). Email correspondence is retained for as long as needed to resolve your
            inquiry, typically no longer than one year.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-bold text-foreground">6. Children&apos;s privacy</h2>
          <p>
            This site is not directed at children under 13. We do not knowingly collect personal
            information from children under 13.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-bold text-foreground">7. Changes to this policy</h2>
          <p>
            We may update this policy from time to time. The effective date at the top of the page
            will reflect the most recent revision. Continued use of the site after a revision
            constitutes acceptance of the updated policy.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-bold text-foreground">8. Contact</h2>
          <p>
            For privacy-related questions, email us at{' '}
            <a href="mailto:support@travelnursetax.app" className="text-teal hover:opacity-80 transition-opacity">
              support@travelnursetax.app
            </a>.
          </p>
        </section>

      </div>
    </div>
  )
}
