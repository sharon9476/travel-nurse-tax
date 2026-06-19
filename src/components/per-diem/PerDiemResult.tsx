'use client'

import type { PerDiemResult } from '@/types/tax'
import { formatCurrency } from '@/lib/utils'
import TaxDisclaimer from '@/components/shared/TaxDisclaimer'
import CpaReferral from '@/components/shared/CpaReferral'

interface PerDiemResultProps {
  result: PerDiemResult
  city: string
  state: string
}

function ProgressBar({ percent, label }: { percent: number; label: string }) {
  const capped = Math.min(100, Math.max(0, percent))
  const isOver = percent > 100

  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs">
        <span className="text-muted-foreground">{label}</span>
        <span className={isOver ? 'text-amber font-medium' : 'text-teal font-medium'}>
          {percent.toFixed(0)}% of GSA max
        </span>
      </div>
      <div className="w-full bg-navy rounded-full h-2.5 overflow-hidden">
        <div
          className={`h-2.5 rounded-full transition-all ${isOver ? 'bg-amber' : 'bg-teal'}`}
          style={{ width: `${capped}%` }}
          role="progressbar"
          aria-valuenow={capped}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={label}
        />
      </div>
    </div>
  )
}

export default function PerDiemResultDisplay({ result, city, state }: PerDiemResultProps) {
  const gap = result.assignmentGap
  const hasGap = gap > 0

  return (
    <div className="space-y-6 mt-8">
      {/* Hero callout */}
      {hasGap ? (
        <div className="bg-surface-raised rounded-xl border border-amber/30 p-6 text-center space-y-2">
          <p className="text-sm text-muted-foreground uppercase tracking-wider">
            Over a 13-week assignment, you&apos;re leaving
          </p>
          <p className="hero-number text-4xl md:text-6xl font-bold">
            {formatCurrency(gap)}
          </p>
          <p className="text-sm text-muted-foreground">
            in potential tax-free income on the table
          </p>
        </div>
      ) : (
        <div className="bg-surface-raised rounded-xl border border-teal/30 p-6 text-center space-y-2">
          <p className="text-sm text-muted-foreground">Your agency meets or exceeds GSA rates for</p>
          <p className="text-lg font-semibold text-foreground">{city}, {state}</p>
          <p className="text-sm text-teal">Your stipends are at or above the GSA maximum.</p>
        </div>
      )}

      {/* Comparison Table */}
      <div className="bg-surface-raised rounded-xl border border-white/10 overflow-hidden">
        <div className="px-5 py-4 border-b border-white/10">
          <h2 className="text-sm font-semibold text-foreground">
            GSA vs. Agency Rates — {city}, {state} (FY2025)
          </h2>
        </div>

        <div className="p-5 space-y-6">
          {/* Housing comparison */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Lodging</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-muted-foreground mb-0.5">GSA Maximum</p>
                <p className="text-xl font-semibold data-mono text-foreground">
                  {formatCurrency(result.gsaHousingMax)}<span className="text-sm font-normal text-muted-foreground">/day</span>
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-0.5">Your Agency</p>
                <p className={`text-xl font-semibold data-mono ${result.housingPercent >= 100 ? 'text-teal' : 'text-foreground'}`}>
                  {formatCurrency(result.agencyHousingPerDay)}<span className="text-sm font-normal text-muted-foreground">/day</span>
                </p>
              </div>
            </div>
            <ProgressBar percent={result.housingPercent} label="Agency housing as % of GSA max" />
          </div>

          {/* Meals comparison */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Meals &amp; Incidental Expenses (M&amp;IE)</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-muted-foreground mb-0.5">GSA Maximum</p>
                <p className="text-xl font-semibold data-mono text-foreground">
                  {formatCurrency(result.gsaMealsMax)}<span className="text-sm font-normal text-muted-foreground">/day</span>
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-0.5">Your Agency</p>
                <p className={`text-xl font-semibold data-mono ${result.mealsPercent >= 100 ? 'text-teal' : 'text-foreground'}`}>
                  {formatCurrency(result.agencyMealsPerDay)}<span className="text-sm font-normal text-muted-foreground">/day</span>
                </p>
              </div>
            </div>
            <ProgressBar percent={result.mealsPercent} label="Agency M&IE as % of GSA max" />
          </div>

          {/* Weekly gap */}
          {hasGap && (
            <div className="pt-2 border-t border-white/10 flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Weekly gap vs. GSA max</span>
              <span className="text-sm font-semibold text-amber data-mono">
                {formatCurrency(result.weeklyGap)}/week
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Negotiation tip */}
      {hasGap && (
        <div className="bg-surface-raised rounded-xl border border-white/10 p-5 space-y-2">
          <h3 className="text-sm font-semibold text-foreground">Negotiation Tip</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            The GSA rates represent the IRS-sanctioned maximum for tax-free reimbursement. Agencies are
            not required to pay the full GSA rate, but you can negotiate. When comparing offers, convert
            everything to an all-in daily rate — a lower taxable hourly rate paired with higher stipends
            often yields significantly more take-home pay.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            If an agency is paying above GSA maximum, the excess is technically taxable — though this
            situation is uncommon. Agencies paying substantially below GSA rates may simply have more
            room to negotiate.
          </p>
        </div>
      )}

      <TaxDisclaimer />
      <CpaReferral />
    </div>
  )
}
