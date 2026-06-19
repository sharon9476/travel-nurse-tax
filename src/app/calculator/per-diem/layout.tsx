import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Per Diem Checker — Compare Agency Stipends to FY2026 GSA Rates',
  description:
    "Compare your agency's housing and M&IE stipends against FY2026 GSA rates for your assignment city. See exactly how much tax-free income you could be negotiating.",
  alternates: {
    canonical: '/calculator/per-diem',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
