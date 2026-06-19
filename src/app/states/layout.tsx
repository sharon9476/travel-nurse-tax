import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Travel Nurse State Tax Guide — All 50 States | TravelNurseTax',
  description:
    'State income tax rates, reciprocity agreements, and per diem tips for travel nurses in all 50 states. Find your assignment state and know what you owe.',
  alternates: { canonical: 'https://www.travelnursetax.app/states' },
}

export default function StatesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
