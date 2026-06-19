import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'W2 vs 1099 Calculator for Travel Nurses | TravelNurseTax',
  description:
    'Should you take a W2 or 1099 travel nurse contract? Compare real after-tax take-home pay side by side. See exactly what 1099 rate you need to beat your W2 offer.',
  alternates: { canonical: 'https://www.travelnursetax.app/calculator/w2-vs-1099' },
  openGraph: {
    title: 'W2 vs 1099 Travel Nurse Calculator',
    description: 'Enter your W2 and 1099 contract details to see which pays more after taxes — including self-employment tax.',
  },
}

export default function W2Vs1099Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
