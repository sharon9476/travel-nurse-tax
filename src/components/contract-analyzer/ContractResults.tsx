'use client'

import { useState } from 'react'
import type { ContractResult, ContractInput } from '@/types/tax'
import { formatCurrency, formatPercent, formatHourlyRate } from '@/lib/utils'
import { STATE_TAX_RATES } from '@/lib/tax/states'
import ResultCard from '@/components/shared/ResultCard'
import TaxDisclaimer from '@/components/shared/TaxDisclaimer'
import CpaReferral from '@/components/shared/CpaReferral'

interface ContractResultsProps {
  result: ContractResult
  input: ContractInput
}

export default function ContractResults({ result, input }: ContractResultsProps) {
  const [breakdownOpen, setBreakdownOpen] = useState(false)

  const assignmentWeeks = input.assignmentWeeks
  const assignmentStateConfig = STATE_TAX_RATES[input.assignmentState]
  const homeStateConfig = STATE_TAX_RATES[input.homeState]

  return (
    <div className="space-y-6 mt-8">
      {/* Hero: Effective Hourly Rate */}
      <div className="bg-surface-raised rounded-xl border border-white/10 p-6 text-center">
        <p className="text-sm text-muted-foreground uppercase tracking-wider mb-2">
          Your real hourly rate
        </p>
        <p className="hero-number text-5xl md:text-7xl font-bold leading-none">
          {formatHourlyRate(result.effectiveHourlyRate)}/hr
        </p>
        <p className="text-sm text-muted-foreground mt-3">
          After all taxes over {assignmentWeeks} weeks
        </p>
      </div>

      {/* Summary Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <ResultCard
          label="Total Contract Value"
          value={formatCurrency(result.totalContractValue)}
          subtext="Taxable + stipends"
        />
        <ResultCard
          label="Total Tax"
          value={formatCurrency(result.totalTax)}
          subtext={`${formatPercent(result.effectiveTaxRate)} effective rate`}
        />
        <ResultCard
          label="Net Take-Home"
          value={formatCurrency(result.netTakeHome)}
          highlight
          subtext="After all taxes"
        />
        <ResultCard
          label="Effective Tax Rate"
          value={formatPercent(result.effectiveTaxRate)}
          subtext="On taxable income"
        />
      </div>

      {/* Contextual Flags */}
      <div className="space-y-2">
        {result.reciprocityApplies && (
          <div className="bg-surface-raised rounded-md border border-teal/30 px-4 py-3">
            <p className="text-sm text-foreground">
              <span className="text-teal font-medium">Reciprocity applies.</span>{' '}
              {homeStateConfig?.name} and {assignmentStateConfig?.name} have a reciprocity agreement,
              so you only pay income tax to your home state on this assignment.
            </p>
          </div>
        )}

        {!result.stipendsAreTaxFree && (
          <div className="bg-surface-raised rounded-md border border-amber/30 px-4 py-3">
            <p className="text-sm text-foreground">
              <span className="text-amber font-medium">No tax home — stipends are taxable.</span>{' '}
              Without a valid tax home, your housing and M&amp;IE stipends are treated as taxable wages.
              This significantly increases your tax burden. Take the Tax Home Quiz to assess your situation.
            </p>
          </div>
        )}

        {result.stipendsAreTaxFree && result.taxFreeStipends > 0 && (
          <div className="bg-surface-raised rounded-md border border-teal/30 px-4 py-3">
            <p className="text-sm text-foreground">
              <span className="text-teal font-medium">
                {formatCurrency(result.taxFreeStipends)} in tax-free stipends.
              </span>{' '}
              With a valid tax home, your housing and M&amp;IE allowances are not subject to federal or
              state income tax or FICA. Protect this status with good documentation.
            </p>
          </div>
        )}

        {!assignmentStateConfig?.hasIncomeTax && input.homeState !== input.assignmentState && (
          <div className="bg-surface-raised rounded-md border border-teal/30 px-4 py-3">
            <p className="text-sm text-foreground">
              <span className="text-teal font-medium">No state income tax on your assignment.</span>{' '}
              {assignmentStateConfig?.name} has no state income tax, so you only pay income tax to your home state.
            </p>
          </div>
        )}
      </div>

      {/* Tax Breakdown Collapsible */}
      <div className="bg-surface-raised rounded-xl border border-white/10 overflow-hidden">
        <button
          type="button"
          className="w-full flex items-center justify-between px-5 py-4 text-sm font-medium text-foreground hover:bg-white/5 transition-colors"
          onClick={() => setBreakdownOpen((prev) => !prev)}
          aria-expanded={breakdownOpen}
        >
          <span>Tax Breakdown</span>
          <svg
            className={`w-4 h-4 text-muted-foreground transition-transform ${breakdownOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {breakdownOpen && (
          <div className="px-5 pb-5 space-y-0 border-t border-white/10">
            <div className="divide-y divide-white/10">
              <BreakdownRow label="Taxable Gross" value={formatCurrency(result.taxableGross)} />
              {result.taxFreeStipends > 0 && (
                <BreakdownRow
                  label="Tax-Free Stipends"
                  value={formatCurrency(result.taxFreeStipends)}
                  note="Not subject to tax"
                  highlight
                />
              )}
              <BreakdownRow label="Total Contract Value" value={formatCurrency(result.totalContractValue)} />
              <BreakdownRow label="Federal Income Tax" value={`−${formatCurrency(result.federalIncomeTax)}`} deduction />
              <BreakdownRow label="FICA (SS + Medicare)" value={`−${formatCurrency(result.ficaTax)}`} deduction />
              <BreakdownRow
                label={`${homeStateConfig?.name ?? input.homeState} State Tax`}
                value={`−${formatCurrency(result.homeStateTax)}`}
                deduction
              />
              {result.assignmentStateTax > 0 && (
                <BreakdownRow
                  label={`${assignmentStateConfig?.name ?? input.assignmentState} State Tax`}
                  value={`−${formatCurrency(result.assignmentStateTax)}`}
                  deduction
                />
              )}
              {result.reciprocityApplies && result.assignmentStateTax === 0 && (
                <BreakdownRow
                  label={`${assignmentStateConfig?.name ?? input.assignmentState} State Tax`}
                  value="$0 (reciprocity)"
                  note="Reciprocity agreement applies"
                />
              )}
              <BreakdownRow label="Total Tax" value={`−${formatCurrency(result.totalTax)}`} deduction bold />
              <BreakdownRow label="Net Take-Home" value={formatCurrency(result.netTakeHome)} bold />
            </div>
          </div>
        )}
      </div>

      <TaxDisclaimer />
      <CpaReferral />
    </div>
  )
}

function BreakdownRow({
  label,
  value,
  deduction = false,
  bold = false,
  note,
  highlight = false,
}: {
  label: string
  value: string
  deduction?: boolean
  bold?: boolean
  note?: string
  highlight?: boolean
}) {
  return (
    <div className="flex items-center justify-between py-3">
      <div>
        <span className={`text-sm ${bold ? 'font-semibold text-foreground' : 'text-muted-foreground'}`}>
          {label}
        </span>
        {note && <span className="block text-xs text-muted-foreground">{note}</span>}
      </div>
      <span
        className={`text-sm data-mono font-medium ${
          bold ? 'text-foreground font-semibold' : deduction ? 'text-muted-foreground' : highlight ? 'text-teal' : 'text-foreground'
        }`}
      >
        {value}
      </span>
    </div>
  )
}
