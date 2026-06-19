'use client'

import { useState } from 'react'
import type { FilingStatus } from '@/types/tax'
import { US_STATES } from '@/lib/tax/states'
import { calculateW2Vs1099, type W2Vs1099Input, type W2Vs1099Result } from '@/lib/tax/w2Vs1099'
import TaxDisclaimer from '@/components/shared/TaxDisclaimer'

const FILING_OPTIONS: { label: string; value: FilingStatus }[] = [
  { label: 'Single', value: 'single' },
  { label: 'Married Filing Jointly', value: 'married_jointly' },
  { label: 'Head of Household', value: 'head_of_household' },
]

const WEEK_OPTIONS = [
  { label: '8 weeks', value: 8 },
  { label: '13 weeks (standard)', value: 13 },
  { label: '26 weeks', value: 26 },
]

function fmt(n: number) {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })
}
function fmtHr(n: number) {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null
  return <p className="text-xs mt-1" style={{ color: '#f87171' }}>{msg}</p>
}

function InputField({
  label, id, value, onChange, placeholder = '0', hint, error,
}: {
  label: string; id: string; value: string; onChange: (v: string) => void
  placeholder?: string; hint?: string; error?: string
}) {
  return (
    <div className="space-y-1">
      <label htmlFor={id} className="block text-sm font-medium">{label}</label>
      {hint && <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>{hint}</p>}
      <div className="relative flex items-center">
        <span className="absolute left-3 text-sm" style={{ color: 'var(--muted-foreground)' }}>$</span>
        <input
          id={id}
          type="number"
          min="0"
          step="0.01"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-lg px-3 py-2 pl-7 text-sm"
          style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', color: 'var(--foreground)' }}
        />
      </div>
      <FieldError msg={error} />
    </div>
  )
}

export default function W2Vs1099Page() {
  const [w2Hourly, setW2Hourly] = useState('')
  const [w2Housing, setW2Housing] = useState('')
  const [w2Meals, setW2Meals] = useState('')
  const [contractorHourly, setContractorHourly] = useState('')
  const [contractorExpenses, setContractorExpenses] = useState('0')
  const [hoursPerWeek, setHoursPerWeek] = useState('36')
  const [assignmentWeeks, setAssignmentWeeks] = useState<number | 'custom'>(13)
  const [customWeeks, setCustomWeeks] = useState('')
  const [homeState, setHomeState] = useState('')
  const [assignmentState, setAssignmentState] = useState('')
  const [filingStatus, setFilingStatus] = useState<FilingStatus>('single')
  const [hasTaxHome, setHasTaxHome] = useState(true)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [result, setResult] = useState<W2Vs1099Result | null>(null)

  function validate(): boolean {
    const e: Record<string, string> = {}
    if (!w2Hourly || parseFloat(w2Hourly) <= 0) e.w2Hourly = 'Enter W2 taxable rate'
    if (!w2Housing || parseFloat(w2Housing) < 0) e.w2Housing = 'Enter housing stipend (0 if none)'
    if (!w2Meals || parseFloat(w2Meals) < 0) e.w2Meals = 'Enter M&IE stipend (0 if none)'
    if (!contractorHourly || parseFloat(contractorHourly) <= 0) e.contractorHourly = 'Enter 1099 hourly rate'
    if (!hoursPerWeek || parseFloat(hoursPerWeek) <= 0) e.hoursPerWeek = 'Enter hours per week'
    if (assignmentWeeks === 'custom' && (!customWeeks || parseInt(customWeeks) <= 0)) e.assignmentWeeks = 'Enter number of weeks'
    if (!homeState) e.homeState = 'Select home state'
    if (!assignmentState) e.assignmentState = 'Select assignment state'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault()
    if (!validate()) return
    const weeks = assignmentWeeks === 'custom' ? parseInt(customWeeks) : assignmentWeeks
    const input: W2Vs1099Input = {
      w2TaxableHourly: parseFloat(w2Hourly),
      w2HousingWeekly: parseFloat(w2Housing),
      w2MealsWeekly: parseFloat(w2Meals),
      contractorHourly: parseFloat(contractorHourly),
      contractorExpensesWeekly: parseFloat(contractorExpenses) || 0,
      hoursPerWeek: parseFloat(hoursPerWeek),
      assignmentWeeks: weeks,
      homeState,
      assignmentState,
      filingStatus,
      hasTaxHome,
    }
    setResult(calculateW2Vs1099(input))
    setTimeout(() => document.getElementById('w2-results')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50)
  }

  const selectClass = "w-full rounded-lg px-3 py-2 text-sm"
  const selectStyle = { background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', color: 'var(--foreground)' }
  const cardStyle = { background: 'var(--surface-raised)', border: '1px solid rgba(255,255,255,0.08)' }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <header className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold">W2 vs 1099 Travel Nurse Calculator</h1>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
          Compare real after-tax take-home pay between a W2 and a 1099 contract. Accounts for self-employment tax,
          the SE tax deduction, stipends, and multi-state taxes.
        </p>
      </header>

      <TaxDisclaimer />

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* W2 */}
          <div className="rounded-xl p-5 space-y-4" style={cardStyle}>
            <h2 className="font-semibold" style={{ color: 'var(--teal)' }}>W2 Contract</h2>
            <InputField label="Taxable Hourly Rate" id="w2Hourly" value={w2Hourly} onChange={setW2Hourly}
              hint="Your hourly rate subject to income tax (not stipends)" error={errors.w2Hourly} />
            <InputField label="Weekly Housing Stipend" id="w2Housing" value={w2Housing} onChange={setW2Housing}
              hint="Tax-free if you have a valid tax home" error={errors.w2Housing} />
            <InputField label="Weekly M&IE Stipend" id="w2Meals" value={w2Meals} onChange={setW2Meals}
              hint="Meals & incidental expenses" error={errors.w2Meals} />
          </div>

          {/* 1099 */}
          <div className="rounded-xl p-5 space-y-4" style={cardStyle}>
            <h2 className="font-semibold" style={{ color: 'var(--amber)' }}>1099 Contract</h2>
            <InputField label="Hourly Rate (all-in)" id="contractorHourly" value={contractorHourly} onChange={setContractorHourly}
              hint="Your total pay per hour — typically no separate stipends" error={errors.contractorHourly} />
            <InputField label="Weekly Business Expenses" id="contractorExpenses" value={contractorExpenses} onChange={setContractorExpenses}
              hint="Deductible expenses (housing, travel, etc.) — reduces SE tax" />
            <div className="rounded-lg p-3 text-xs" style={{ background: 'rgba(240,165,0,0.08)', color: 'var(--muted-foreground)' }}>
              As a 1099 contractor you pay the full 15.3% self-employment tax (vs 7.65% as a W2 employee). You can deduct half of SE tax and legitimate business expenses.
            </div>
          </div>
        </div>

        {/* Shared inputs */}
        <div className="rounded-xl p-5 space-y-5" style={cardStyle}>
          <h2 className="font-semibold">Shared Details</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label htmlFor="hoursPerWeek" className="block text-sm font-medium">Hours / Week</label>
              <input id="hoursPerWeek" type="number" min="1" max="84" value={hoursPerWeek}
                onChange={(e) => setHoursPerWeek(e.target.value)} className={selectClass} style={selectStyle} />
              <FieldError msg={errors.hoursPerWeek} />
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium">Assignment Length</label>
              <div className="flex gap-2 flex-wrap">
                {WEEK_OPTIONS.map(({ label, value }) => (
                  <button key={value} type="button" onClick={() => setAssignmentWeeks(value)}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
                    style={assignmentWeeks === value
                      ? { background: 'var(--teal)', color: '#0F1E2E' }
                      : { background: 'rgba(255,255,255,0.06)', color: 'var(--muted-foreground)', border: '1px solid rgba(255,255,255,0.1)' }}>
                    {label}
                  </button>
                ))}
                <button type="button" onClick={() => setAssignmentWeeks('custom')}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
                  style={assignmentWeeks === 'custom'
                    ? { background: 'var(--teal)', color: '#0F1E2E' }
                    : { background: 'rgba(255,255,255,0.06)', color: 'var(--muted-foreground)', border: '1px solid rgba(255,255,255,0.1)' }}>
                  Custom
                </button>
              </div>
              {assignmentWeeks === 'custom' && (
                <input type="number" min="1" max="52" value={customWeeks}
                  onChange={(e) => setCustomWeeks(e.target.value)} placeholder="Weeks"
                  className={`${selectClass} mt-2 w-28`} style={selectStyle} />
              )}
              <FieldError msg={errors.assignmentWeeks} />
            </div>

            <div className="space-y-1">
              <label htmlFor="homeState" className="block text-sm font-medium">Home State</label>
              <select id="homeState" value={homeState} onChange={(e) => setHomeState(e.target.value)} className={selectClass} style={selectStyle}>
                <option value="">Select state</option>
                {US_STATES.map(({ code, name }) => <option key={code} value={code}>{name}</option>)}
              </select>
              <FieldError msg={errors.homeState} />
            </div>

            <div className="space-y-1">
              <label htmlFor="assignmentState" className="block text-sm font-medium">Assignment State</label>
              <select id="assignmentState" value={assignmentState} onChange={(e) => setAssignmentState(e.target.value)} className={selectClass} style={selectStyle}>
                <option value="">Select state</option>
                {US_STATES.map(({ code, name }) => <option key={code} value={code}>{name}</option>)}
              </select>
              <FieldError msg={errors.assignmentState} />
            </div>

            <div className="space-y-1">
              <label htmlFor="filingStatus" className="block text-sm font-medium">Filing Status</label>
              <select id="filingStatus" value={filingStatus} onChange={(e) => setFilingStatus(e.target.value as FilingStatus)} className={selectClass} style={selectStyle}>
                {FILING_OPTIONS.map(({ label, value }) => <option key={value} value={value}>{label}</option>)}
              </select>
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium">Tax Home Status</label>
              <div className="flex gap-2">
                {([{ label: 'Valid tax home', value: true }, { label: 'No tax home', value: false }] as const).map(({ label, value }) => (
                  <button key={String(value)} type="button" onClick={() => setHasTaxHome(value)}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
                    style={hasTaxHome === value
                      ? { background: 'var(--teal)', color: '#0F1E2E' }
                      : { background: 'rgba(255,255,255,0.06)', color: 'var(--muted-foreground)', border: '1px solid rgba(255,255,255,0.1)' }}>
                    {label}
                  </button>
                ))}
              </div>
              <p className="text-xs mt-1" style={{ color: 'var(--muted-foreground)' }}>Affects whether W2 stipends are tax-free</p>
            </div>
          </div>
        </div>

        <button type="submit" className="w-full py-3 rounded-xl font-semibold transition-opacity hover:opacity-90"
          style={{ background: 'var(--teal)', color: '#0F1E2E' }}>
          Compare Contracts
        </button>
      </form>

      {result && (
        <div id="w2-results" className="space-y-6">
          <div className="rounded-xl p-5 text-center"
            style={{
              background: result.netDifference > 0 ? 'rgba(240,165,0,0.12)' : result.netDifference < 0 ? 'rgba(46,191,165,0.12)' : 'rgba(255,255,255,0.06)',
              border: `1px solid ${result.netDifference > 0 ? 'rgba(240,165,0,0.3)' : result.netDifference < 0 ? 'rgba(46,191,165,0.3)' : 'rgba(255,255,255,0.1)'}`,
            }}>
            {result.netDifference === 0 ? (
              <p className="font-semibold">These contracts pay the same after taxes.</p>
            ) : result.netDifference > 0 ? (
              <>
                <p className="text-lg font-bold" style={{ color: 'var(--amber)' }}>1099 pays more — by {fmt(result.netDifference)}</p>
                <p className="text-sm mt-1" style={{ color: 'var(--muted-foreground)' }}>The 1099 contract produces a higher net take-home over this assignment.</p>
              </>
            ) : (
              <>
                <p className="text-lg font-bold" style={{ color: 'var(--teal)' }}>W2 pays more — by {fmt(Math.abs(result.netDifference))}</p>
                <p className="text-sm mt-1" style={{ color: 'var(--muted-foreground)' }}>The W2 contract produces a higher net take-home over this assignment.</p>
              </>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-xl p-5 space-y-3"
              style={{ ...cardStyle, borderColor: result.netDifference < 0 ? 'rgba(46,191,165,0.4)' : 'rgba(255,255,255,0.08)' }}>
              <h3 className="font-semibold" style={{ color: 'var(--teal)' }}>W2 Contract</h3>
              <div className="space-y-2 text-sm">
                {([
                  ['Taxable wages', fmt(result.w2TaxableGross)],
                  ['Tax-free stipends', fmt(result.w2Stipends)],
                  ['Total contract value', fmt(result.w2TotalValue)],
                  ['— Employee FICA', `−${fmt(result.w2EmployeeFica)}`],
                  ['— Federal income tax', `−${fmt(result.w2FederalTax)}`],
                  ['— State taxes', `−${fmt(result.w2StateTax)}`],
                ] as [string, string][]).map(([label, value]) => (
                  <div key={label} className="flex justify-between">
                    <span style={{ color: 'var(--muted-foreground)' }}>{label}</span>
                    <span className="data-mono">{value}</span>
                  </div>
                ))}
                <div className="flex justify-between pt-2 font-semibold" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                  <span>Net take-home</span>
                  <span className="data-mono" style={{ color: 'var(--teal)' }}>{fmt(result.w2NetTakeHome)}</span>
                </div>
                <div className="flex justify-between text-xs" style={{ color: 'var(--muted-foreground)' }}>
                  <span>Effective hourly</span>
                  <span className="data-mono">{fmtHr(result.w2EffectiveHourly)}/hr</span>
                </div>
              </div>
            </div>

            <div className="rounded-xl p-5 space-y-3"
              style={{ ...cardStyle, borderColor: result.netDifference > 0 ? 'rgba(240,165,0,0.4)' : 'rgba(255,255,255,0.08)' }}>
              <h3 className="font-semibold" style={{ color: 'var(--amber)' }}>1099 Contract</h3>
              <div className="space-y-2 text-sm">
                {([
                  ['Gross income', fmt(result.contractorGross)],
                  ['Business expenses', result.contractorExpenses > 0 ? `−${fmt(result.contractorExpenses)}` : '$0'],
                  ['— Self-employment tax (15.3%)', `−${fmt(result.contractorSETax)}`],
                  ['— Federal income tax', `−${fmt(result.contractorFederalTax)}`],
                  ['— State taxes', `−${fmt(result.contractorStateTax)}`],
                ] as [string, string][]).map(([label, value]) => (
                  <div key={label} className="flex justify-between">
                    <span style={{ color: 'var(--muted-foreground)' }}>{label}</span>
                    <span className="data-mono">{value}</span>
                  </div>
                ))}
                <div className="flex justify-between pt-2 font-semibold" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                  <span>Net take-home</span>
                  <span className="data-mono" style={{ color: 'var(--amber)' }}>{fmt(result.contractorNetTakeHome)}</span>
                </div>
                <div className="flex justify-between text-xs" style={{ color: 'var(--muted-foreground)' }}>
                  <span>Effective hourly</span>
                  <span className="data-mono">{fmtHr(result.contractorEffectiveHourly)}/hr</span>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-xl p-5" style={cardStyle}>
            <h3 className="font-semibold mb-2">Break-Even Analysis</h3>
            <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
              To match this W2 contract&apos;s net take-home, a 1099 contract needs to pay at least{' '}
              <span className="font-semibold data-mono" style={{ color: 'var(--amber)' }}>
                {fmtHr(result.breakEven1099Hourly)}/hr
              </span>.{' '}
              Your 1099 rate is{' '}
              <span className="font-semibold">
                {parseFloat(contractorHourly) >= result.breakEven1099Hourly ? 'above' : 'below'}
              </span>{' '}
              the break-even point.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
