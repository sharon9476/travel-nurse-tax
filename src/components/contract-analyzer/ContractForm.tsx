'use client'

import { useState } from 'react'
import type { ContractInput, FilingStatus } from '@/types/tax'
import { US_STATES } from '@/lib/tax/states'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'

interface ContractFormProps {
  onSubmit: (input: ContractInput) => void
  initialValues?: Partial<ContractInput>
}

const FILING_STATUS_OPTIONS: { label: string; value: FilingStatus }[] = [
  { label: 'Single', value: 'single' },
  { label: 'Married Filing Jointly', value: 'married_jointly' },
  { label: 'Head of Household', value: 'head_of_household' },
]

const ASSIGNMENT_WEEK_OPTIONS = [
  { label: '8 weeks', value: 8 },
  { label: '13 weeks (standard)', value: 13 },
  { label: '26 weeks', value: 26 },
]

export default function ContractForm({ onSubmit, initialValues }: ContractFormProps) {
  const [taxableHourlyRate, setTaxableHourlyRate] = useState(initialValues?.taxableHourlyRate?.toString() ?? '')
  const [hoursPerWeek, setHoursPerWeek] = useState(initialValues?.hoursPerWeek?.toString() ?? '36')
  const [housingStipendWeekly, setHousingStipendWeekly] = useState(initialValues?.housingStipendWeekly?.toString() ?? '')
  const [mealsStipendWeekly, setMealsStipendWeekly] = useState(initialValues?.mealsStipendWeekly?.toString() ?? '')
  const [assignmentWeeks, setAssignmentWeeks] = useState<number | 'custom'>(initialValues?.assignmentWeeks ?? 13)
  const [customWeeks, setCustomWeeks] = useState('')
  const [homeState, setHomeState] = useState(initialValues?.homeState ?? '')
  const [assignmentState, setAssignmentState] = useState(initialValues?.assignmentState ?? '')
  const [filingStatus, setFilingStatus] = useState<FilingStatus>(initialValues?.filingStatus ?? 'single')
  const [hasTaxHome, setHasTaxHome] = useState(initialValues?.hasTaxHome ?? true)
  const [errors, setErrors] = useState<Record<string, string>>({})

  function validate(): boolean {
    const newErrors: Record<string, string> = {}
    if (!taxableHourlyRate || parseFloat(taxableHourlyRate) <= 0) newErrors.taxableHourlyRate = 'Enter a valid hourly rate'
    if (!hoursPerWeek || parseFloat(hoursPerWeek) <= 0) newErrors.hoursPerWeek = 'Enter valid hours per week'
    if (!housingStipendWeekly || parseFloat(housingStipendWeekly) < 0) newErrors.housingStipendWeekly = 'Enter a housing stipend (can be 0)'
    if (!mealsStipendWeekly || parseFloat(mealsStipendWeekly) < 0) newErrors.mealsStipendWeekly = 'Enter a M&IE stipend (can be 0)'
    if (assignmentWeeks === 'custom' && (!customWeeks || parseInt(customWeeks) <= 0)) newErrors.assignmentWeeks = 'Enter a valid number of weeks'
    if (!homeState) newErrors.homeState = 'Select your home state'
    if (!assignmentState) newErrors.assignmentState = 'Select your assignment state'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return
    const weeks = assignmentWeeks === 'custom' ? parseInt(customWeeks) : assignmentWeeks
    onSubmit({
      taxableHourlyRate: parseFloat(taxableHourlyRate),
      hoursPerWeek: parseFloat(hoursPerWeek),
      housingStipendWeekly: parseFloat(housingStipendWeekly),
      mealsStipendWeekly: parseFloat(mealsStipendWeekly),
      assignmentWeeks: weeks,
      homeState,
      assignmentState,
      filingStatus,
      hasTaxHome,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="bg-surface-raised rounded-xl border border-white/10 p-6 space-y-5">
      <h2 className="text-lg font-semibold text-foreground">Contract Details</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Taxable Hourly Rate */}
        <div className="space-y-1">
          <label htmlFor="taxableHourlyRate" className="block text-sm font-medium text-foreground">
            Taxable Hourly Rate ($)
          </label>
          <input
            id="taxableHourlyRate"
            type="number"
            min="0"
            step="0.01"
            value={taxableHourlyRate}
            onChange={(e) => setTaxableHourlyRate(e.target.value)}
            placeholder="e.g. 22.00"
            className="w-full bg-navy border border-white/20 rounded-md px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-teal"
          />
          {errors.taxableHourlyRate && <p className="text-xs text-destructive">{errors.taxableHourlyRate}</p>}
          <p className="text-xs text-muted-foreground">The taxable portion only — not counting stipends</p>
        </div>

        {/* Hours Per Week */}
        <div className="space-y-1">
          <label htmlFor="hoursPerWeek" className="block text-sm font-medium text-foreground">
            Hours Per Week
          </label>
          <input
            id="hoursPerWeek"
            type="number"
            min="1"
            max="84"
            step="1"
            value={hoursPerWeek}
            onChange={(e) => setHoursPerWeek(e.target.value)}
            className="w-full bg-navy border border-white/20 rounded-md px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-teal"
          />
          {errors.hoursPerWeek && <p className="text-xs text-destructive">{errors.hoursPerWeek}</p>}
        </div>

        {/* Housing Stipend */}
        <div className="space-y-1">
          <label htmlFor="housingStipendWeekly" className="block text-sm font-medium text-foreground">
            Housing Stipend (per week, $)
          </label>
          <input
            id="housingStipendWeekly"
            type="number"
            min="0"
            step="1"
            value={housingStipendWeekly}
            onChange={(e) => setHousingStipendWeekly(e.target.value)}
            placeholder="e.g. 1200"
            className="w-full bg-navy border border-white/20 rounded-md px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-teal"
          />
          {errors.housingStipendWeekly && <p className="text-xs text-destructive">{errors.housingStipendWeekly}</p>}
        </div>

        {/* M&IE Stipend */}
        <div className="space-y-1">
          <label htmlFor="mealsStipendWeekly" className="block text-sm font-medium text-foreground">
            M&amp;IE Stipend (per week, $)
          </label>
          <input
            id="mealsStipendWeekly"
            type="number"
            min="0"
            step="1"
            value={mealsStipendWeekly}
            onChange={(e) => setMealsStipendWeekly(e.target.value)}
            placeholder="e.g. 476"
            className="w-full bg-navy border border-white/20 rounded-md px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-teal"
          />
          {errors.mealsStipendWeekly && <p className="text-xs text-destructive">{errors.mealsStipendWeekly}</p>}
        </div>
      </div>

      {/* Assignment Length */}
      <div className="space-y-1">
        <label className="block text-sm font-medium text-foreground">Assignment Length</label>
        <div className="flex flex-wrap gap-2">
          {ASSIGNMENT_WEEK_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => setAssignmentWeeks(opt.value)}
              className={`px-4 py-2 rounded-md text-sm font-medium border transition-colors ${
                assignmentWeeks === opt.value
                  ? 'bg-teal text-teal-foreground border-teal'
                  : 'bg-navy border-white/20 text-muted-foreground hover:text-foreground hover:border-white/40'
              }`}
            >
              {opt.label}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setAssignmentWeeks('custom')}
            className={`px-4 py-2 rounded-md text-sm font-medium border transition-colors ${
              assignmentWeeks === 'custom'
                ? 'bg-teal text-teal-foreground border-teal'
                : 'bg-navy border-white/20 text-muted-foreground hover:text-foreground hover:border-white/40'
            }`}
          >
            Custom
          </button>
        </div>
        {assignmentWeeks === 'custom' && (
          <div className="mt-2">
            <label htmlFor="customWeeks" className="sr-only">Custom weeks</label>
            <input
              id="customWeeks"
              type="number"
              min="1"
              step="1"
              value={customWeeks}
              onChange={(e) => setCustomWeeks(e.target.value)}
              placeholder="Number of weeks"
              className="w-40 bg-navy border border-white/20 rounded-md px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-teal"
            />
          </div>
        )}
        {errors.assignmentWeeks && <p className="text-xs text-destructive">{errors.assignmentWeeks}</p>}
      </div>

      {/* States */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label htmlFor="homeState" className="block text-sm font-medium text-foreground">
            Home State
          </label>
          <select
            id="homeState"
            value={homeState}
            onChange={(e) => setHomeState(e.target.value)}
            className="w-full bg-navy border border-white/20 rounded-md px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-teal"
          >
            <option value="">Select state...</option>
            {US_STATES.map((s) => (
              <option key={s.code} value={s.code}>{s.name}</option>
            ))}
          </select>
          {errors.homeState && <p className="text-xs text-destructive">{errors.homeState}</p>}
        </div>

        <div className="space-y-1">
          <label htmlFor="assignmentState" className="block text-sm font-medium text-foreground">
            Assignment State
          </label>
          <select
            id="assignmentState"
            value={assignmentState}
            onChange={(e) => setAssignmentState(e.target.value)}
            className="w-full bg-navy border border-white/20 rounded-md px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-teal"
          >
            <option value="">Select state...</option>
            {US_STATES.map((s) => (
              <option key={s.code} value={s.code}>{s.name}</option>
            ))}
          </select>
          {errors.assignmentState && <p className="text-xs text-destructive">{errors.assignmentState}</p>}
        </div>
      </div>

      {/* Filing Status */}
      <div className="space-y-1">
        <label htmlFor="filingStatus" className="block text-sm font-medium text-foreground">
          Filing Status
        </label>
        <select
          id="filingStatus"
          value={filingStatus}
          onChange={(e) => setFilingStatus(e.target.value as FilingStatus)}
          className="w-full sm:w-64 bg-navy border border-white/20 rounded-md px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-teal"
        >
          {FILING_STATUS_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>

      {/* Tax Home Toggle */}
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-foreground">Tax Home Status</label>
          <Tooltip>
            <TooltipTrigger
              className="w-4 h-4 rounded-full bg-surface-raised border border-white/30 text-xs text-muted-foreground hover:text-foreground flex items-center justify-center"
              aria-label="What is a tax home?"
            >
              ?
            </TooltipTrigger>
            <TooltipContent className="max-w-xs text-xs">
              A tax home is your primary place of business or employment. Travel nurses with a valid tax home
              can receive housing and meal stipends tax-free. Without one, stipends are taxable income.
            </TooltipContent>
          </Tooltip>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            role="switch"
            aria-checked={hasTaxHome}
            onClick={() => setHasTaxHome((prev) => !prev)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full border-2 transition-colors focus:outline-none focus:ring-2 focus:ring-teal ${
              hasTaxHome ? 'bg-teal border-teal' : 'bg-navy border-white/30'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                hasTaxHome ? 'translate-x-5' : 'translate-x-0.5'
              }`}
            />
          </button>
          <span className="text-sm text-muted-foreground">
            {hasTaxHome ? 'I have a valid tax home (stipends are tax-free)' : 'I do not have a tax home (stipends are taxable)'}
          </span>
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-teal text-teal-foreground font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition-opacity text-sm"
      >
        Calculate My Take-Home Pay
      </button>
    </form>
  )
}
