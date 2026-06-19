import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tax Home Quiz — Check Your IRS Audit Risk in 8 Questions',
  description:
    "Eight questions based on the IRS three-factor test. Find out whether your tax home can survive an audit — and exactly what to fix if it can't.",
  alternates: {
    canonical: '/quiz/tax-home',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
