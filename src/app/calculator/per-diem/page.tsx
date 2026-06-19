'use client'

import { useState } from 'react'
import type { PerDiemInput, PerDiemResult } from '@/types/tax'
import { calculatePerDiem } from '@/lib/tax/perDiem'
import PerDiemForm from '@/components/per-diem/PerDiemForm'
import PerDiemResultDisplay from '@/components/per-diem/PerDiemResult'
import TaxDisclaimer from '@/components/shared/TaxDisclaimer'

export default function PerDiemPage() {
  const [result, setResult] = useState<PerDiemResult | null>(null)
  const [lastInput, setLastInput] = useState<PerDiemInput | null>(null)

  function handleSubmit(input: PerDiemInput) {
    setLastInput(input)
    setResult(calculatePerDiem(input))
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <header className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Per Diem Checker</h1>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Compare your agency&apos;s housing and M&amp;IE stipends against FY2025 GSA rates for your assignment
          city. Know exactly how much tax-free income you could be negotiating for.
        </p>
      </header>

      <TaxDisclaimer />

      <PerDiemForm onSubmit={handleSubmit} />

      {result && lastInput && (
        <PerDiemResultDisplay result={result} city={lastInput.city} state={lastInput.state} />
      )}
    </div>
  )
}
