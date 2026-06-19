'use client'

import { useState, useEffect } from 'react'
import type { ContractInput, ContractResult } from '@/types/tax'
import { calculateContractNetPay } from '@/lib/tax/contractCalculator'
import ContractForm from '@/components/contract-analyzer/ContractForm'
import ContractResults from '@/components/contract-analyzer/ContractResults'
import TaxDisclaimer from '@/components/shared/TaxDisclaimer'

export default function ContractAnalyzerPage() {
  const [result, setResult] = useState<ContractResult | null>(null)
  const [lastInput, setLastInput] = useState<ContractInput | null>(null)

  useEffect(() => {
    if (result) {
      document.getElementById('contract-results')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [result])

  function handleSubmit(input: ContractInput) {
    setLastInput(input)
    setResult(calculateContractNetPay(input))
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <header className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Contract Analyzer</h1>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Enter your contract details to see your real effective hourly rate after federal income tax,
          FICA, and state taxes — with stipends handled correctly based on your tax home status.
        </p>
      </header>

      <TaxDisclaimer />

      <ContractForm onSubmit={handleSubmit} initialValues={lastInput ?? undefined} />

      {result && lastInput && (
        <div id="contract-results">
          <ContractResults result={result} input={lastInput} />
        </div>
      )}
    </div>
  )
}
