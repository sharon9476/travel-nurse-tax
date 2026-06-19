import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import SiteHeader from '@/components/layout/SiteHeader'
import SiteFooter from '@/components/layout/SiteFooter'
import { TooltipProvider } from '@/components/ui/tooltip'
import { GoogleAnalytics } from '@next/third-parties/google'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.travelnursetax.app'),
  title: {
    default: 'TravelNurseTax — Free Tax Calculators for Travel Nurses',
    template: '%s | TravelNurseTax',
  },
  description:
    'Free tax calculators built specifically for travel nurses. Analyze contracts, check your tax home eligibility, and verify GSA per diem rates — calculated in 60 seconds.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.travelnursetax.app',
    siteName: 'TravelNurseTax',
    title: 'TravelNurseTax — Free Tax Calculators for Travel Nurses',
    description:
      'Free tax calculators built specifically for travel nurses. Analyze contracts, check your tax home eligibility, and verify GSA per diem rates — calculated in 60 seconds.',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'TravelNurseTax — Free Tax Calculators for Travel Nurses',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TravelNurseTax — Free Tax Calculators for Travel Nurses',
    description:
      'Free tax calculators built specifically for travel nurses. Analyze contracts, check your tax home eligibility, and verify GSA per diem rates — calculated in 60 seconds.',
    images: ['/opengraph-image'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
      </head>
      <body className="min-h-screen bg-navy text-foreground">
        <TooltipProvider>
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
        </TooltipProvider>
        <GoogleAnalytics gaId="G-NX0YQKWD2T" />
      </body>
    </html>
  )
}
