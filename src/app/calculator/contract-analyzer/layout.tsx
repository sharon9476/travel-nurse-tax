import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contract Analyzer — See Your Real Hourly Rate After Taxes',
  description:
    'Enter your travel nurse contract — taxable rate, stipends, and states — to calculate your real effective hourly rate after federal income tax, FICA, and multi-state taxes.',
  alternates: {
    canonical: '/calculator/contract-analyzer',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
