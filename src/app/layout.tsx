import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import SiteHeader from '@/components/layout/SiteHeader'
import SiteFooter from '@/components/layout/SiteFooter'
import { TooltipProvider } from '@/components/ui/tooltip'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
})

export const metadata: Metadata = {
  title: {
    default: 'TravelNurseTax — Free Tax Calculators for Travel Nurses',
    template: '%s | TravelNurseTax',
  },
  description:
    'Free tax calculators built specifically for travel nurses. Analyze contracts, check your tax home eligibility, and verify GSA per diem rates.',
  metadataBase: new URL('https://travelnursetax.app'),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-screen bg-navy text-foreground">
        <TooltipProvider>
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
        </TooltipProvider>
      </body>
    </html>
  )
}
