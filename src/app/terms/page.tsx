import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'TravelNurseTax terms of service — calculator outputs are estimates for planning purposes only and do not constitute tax advice.',
  alternates: { canonical: '/terms' },
}

const EFFECTIVE_DATE = 'June 20, 2026'

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">

      {/* Breadcrumb */}
      <nav className="text-sm text-muted-foreground" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
        <span className="mx-2">›</span>
        <span>Terms of Service</span>
      </nav>

      {/* Header */}
      <div className="space-y-3">
        <h1 className="text-3xl font-bold text-foreground">Terms of Service</h1>
        <p className="text-sm text-muted-foreground">Effective date: {EFFECTIVE_DATE}</p>
        <p className="text-muted-foreground leading-relaxed">
          By using{' '}
          <Link href="/" className="text-teal hover:opacity-80 transition-opacity">
            travelnursetax.app
          </Link>
          {' '}(&ldquo;the site&rdquo;), you agree to these terms. If you do not agree, please do
          not use the site.
        </p>
      </div>

      {/* Critical disclaimer callout */}
      <div className="border-l-4 border-amber bg-surface-raised rounded-r-xl px-5 py-4 space-y-2">
        <p className="text-sm font-semibold text-foreground">Important — Not tax advice</p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          All outputs from TravelNurseTax calculators are <strong className="text-foreground">estimates
          for planning purposes only</strong>. They do not constitute tax advice, legal advice, or
          financial advice. Tax situations vary by individual. Consult a qualified tax professional
          before making any financial decisions.
        </p>
      </div>

      <div className="space-y-10 text-sm text-muted-foreground leading-relaxed">

        <section className="space-y-4">
          <h2 className="text-lg font-bold text-foreground">1. Nature of the service</h2>
          <p>
            TravelNurseTax provides free web-based calculators and informational content designed to
            help travel nurses estimate their tax obligations and compare contract compensation. The
            site is intended for general informational and planning purposes only.
          </p>
          <p>
            The calculations use publicly available data including IRS tax brackets, FICA rates, GSA
            per diem tables, and simplified state income tax rates. These inputs change over time and
            may not reflect the most current figures at the time you use the site.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-bold text-foreground">2. No professional relationship</h2>
          <p>
            Use of this site does not create a client-advisor relationship of any kind — including
            tax, legal, financial, or fiduciary. No information provided by this site should be
            construed as professional advice.
          </p>
          <p>
            TravelNurseTax is not a licensed tax preparer, CPA, enrolled agent, or financial
            advisor. The site does not review your individual circumstances, cannot account for all
            factors affecting your tax liability, and is not a substitute for professional advice
            tailored to your situation.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-bold text-foreground">3. Accuracy and limitations</h2>
          <p>
            We make reasonable efforts to keep tax rates, brackets, and per diem figures current and
            accurate. However, we make no warranties, express or implied, regarding the accuracy,
            completeness, or fitness for a particular purpose of any calculation or information on
            this site.
          </p>
          <p>Calculations may be inaccurate due to, among other things:</p>
          <ul className="space-y-1 list-disc list-inside">
            <li>Changes to tax law after the data on this site was last updated</li>
            <li>Simplified rate assumptions that do not apply to your jurisdiction</li>
            <li>Individual circumstances not captured by the calculator inputs</li>
            <li>Rounding differences between estimate and actual liability</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-bold text-foreground">4. Limitation of liability</h2>
          <p>
            To the fullest extent permitted by applicable law, TravelNurseTax and its operators
            shall not be liable for any direct, indirect, incidental, special, consequential, or
            punitive damages arising out of your use of, or reliance on, this site or its
            calculator outputs — including but not limited to tax underpayments, penalties, interest,
            or professional fees incurred as a result of relying on information provided here.
          </p>
          <p>
            Your sole remedy for dissatisfaction with the site or its content is to stop using the
            site.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-bold text-foreground">5. User responsibilities</h2>
          <p>You agree to use the site only for lawful purposes and in a manner that does not:</p>
          <ul className="space-y-1 list-disc list-inside">
            <li>Infringe the rights of others</li>
            <li>Attempt to scrape, crawl, or systematically copy site content at scale</li>
            <li>Interfere with the operation of the site or its underlying infrastructure</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-bold text-foreground">6. Intellectual property</h2>
          <p>
            All site content — including text, calculation logic, icons, and design — is the property
            of TravelNurseTax and is protected by applicable intellectual property law. You may share
            individual calculation results for personal, non-commercial purposes with attribution to
            travelnursetax.app.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-bold text-foreground">7. External links</h2>
          <p>
            The site may link to external resources such as IRS publications, GSA rate tables, and
            state tax authority websites. We do not control those sites and are not responsible for
            their content or accuracy.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-bold text-foreground">8. Changes to these terms</h2>
          <p>
            We may revise these terms at any time. The effective date at the top of this page
            reflects the most recent revision. Continued use of the site after a change constitutes
            acceptance of the updated terms.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-bold text-foreground">9. Governing law</h2>
          <p>
            These terms are governed by the laws of the United States, without regard to conflict
            of law principles. Any disputes arising from these terms or your use of the site shall
            be resolved in a court of competent jurisdiction in the United States.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-bold text-foreground">10. Contact</h2>
          <p>
            Questions about these terms?{' '}
            <a href="mailto:support@travelnursetax.app" className="text-teal hover:opacity-80 transition-opacity">
              support@travelnursetax.app
            </a>
          </p>
        </section>

      </div>

      {/* Related links */}
      <div className="border-t border-white/10 pt-8 flex flex-wrap gap-4 text-sm">
        <Link href="/privacy-policy" className="text-teal hover:opacity-80 transition-opacity">
          Privacy Policy
        </Link>
        <Link href="/contact" className="text-teal hover:opacity-80 transition-opacity">
          Contact Us
        </Link>
        <Link href="/about" className="text-teal hover:opacity-80 transition-opacity">
          About
        </Link>
      </div>

    </div>
  )
}
