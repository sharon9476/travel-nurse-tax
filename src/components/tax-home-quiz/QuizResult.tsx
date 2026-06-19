'use client'

import type { QuizResult, TaxHomeRisk } from '@/types/tax'
import TaxDisclaimer from '@/components/shared/TaxDisclaimer'
import CpaReferral from '@/components/shared/CpaReferral'

interface QuizResultProps {
  result: QuizResult
}

const RISK_CONFIG: Record<TaxHomeRisk, { label: string; badgeClass: string; borderClass: string }> = {
  strong: {
    label: 'Strong Tax Home',
    badgeClass: 'bg-emerald-900/40 text-emerald-400 border-emerald-700/50',
    borderClass: 'border-emerald-700/30',
  },
  moderate: {
    label: 'Moderate — Review Recommended',
    badgeClass: 'bg-yellow-900/40 text-yellow-400 border-yellow-700/50',
    borderClass: 'border-yellow-700/30',
  },
  at_risk: {
    label: 'At Risk — Take Action',
    badgeClass: 'bg-orange-900/40 text-orange-400 border-orange-700/50',
    borderClass: 'border-orange-700/30',
  },
  invalid: {
    label: 'Invalid Tax Home — Urgent',
    badgeClass: 'bg-red-900/40 text-red-400 border-red-700/50',
    borderClass: 'border-red-700/30',
  },
}

export default function QuizResultDisplay({ result }: QuizResultProps) {
  const config = RISK_CONFIG[result.risk]

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Risk Badge + Headline */}
      <div className={`bg-surface-raised rounded-xl border ${config.borderClass} p-6 space-y-3`}>
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${config.badgeClass}`}>
          {config.label}
        </span>
        <h2 className="text-xl font-bold text-foreground">{result.headline}</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">{result.explanation}</p>

      </div>

      {/* Action Items */}
      <div className="bg-surface-raised rounded-xl border border-white/10 p-6 space-y-3">
        <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">Recommended Actions</h3>
        <ul className="space-y-2">
          {result.actions.map((action, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
              <span className="mt-0.5 w-5 h-5 rounded-full bg-teal/20 text-teal flex-shrink-0 flex items-center justify-center text-xs font-bold">
                {i + 1}
              </span>
              <span>{action}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* CPA Referral for risky statuses */}
      {(result.risk === 'at_risk' || result.risk === 'invalid') && <CpaReferral />}

      <TaxDisclaimer />
    </div>
  )
}
