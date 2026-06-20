'use client'

import { useState, useRef, useEffect } from 'react'
import type { PerDiemInput } from '@/types/tax'
import { US_STATES } from '@/lib/tax/states'
import rates from '@/data/perDiemRates.json'

interface PerDiemFormProps {
  onSubmit: (input: PerDiemInput) => void
}

const CITY_SUGGESTIONS = [...new Set(rates.rates.map((r) => `${r.city}, ${r.state}`))]

export default function PerDiemForm({ onSubmit }: PerDiemFormProps) {
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [agencyHousing, setAgencyHousing] = useState('')
  const [agencyMeals, setAgencyMeals] = useState('')
  const [isWeekly, setIsWeekly] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const cityInputRef = useRef<HTMLInputElement>(null)
  const suggestionsRef = useRef<HTMLDivElement>(null)

  const filteredCities = city.length >= 2
    ? CITY_SUGGESTIONS.filter((c) => c.toLowerCase().startsWith(city.toLowerCase())).slice(0, 8)
    : []

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        cityInputRef.current && !cityInputRef.current.contains(e.target as Node) &&
        suggestionsRef.current && !suggestionsRef.current.contains(e.target as Node)
      ) {
        setShowSuggestions(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  function handleCitySelect(suggestion: string) {
    const parts = suggestion.split(', ')
    setCity(parts[0])
    if (parts[1]) setState(parts[1])
    setShowSuggestions(false)
  }

  function validate(): boolean {
    const newErrors: Record<string, string> = {}
    if (!city.trim()) newErrors.city = 'Enter a city'
    if (!state) newErrors.state = 'Select a state'
    if (agencyHousing === '' || parseFloat(agencyHousing) < 0) newErrors.agencyHousing = 'Enter agency housing amount (can be 0)'
    if (agencyMeals === '' || parseFloat(agencyMeals) < 0) newErrors.agencyMeals = 'Enter agency M&IE amount (can be 0)'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return

    const divisor = isWeekly ? 7 : 1
    onSubmit({
      city: city.trim(),
      state,
      agencyHousingPerDay: parseFloat(agencyHousing) / divisor,
      agencyMealsPerDay: parseFloat(agencyMeals) / divisor,
    })
  }

  const housingLabel = isWeekly ? 'Agency Housing Stipend (per week, $)' : 'Agency Housing Stipend (per day, $)'
  const mealsLabel = isWeekly ? 'Agency M&IE Stipend (per week, $)' : 'Agency M&IE Stipend (per day, $)'

  return (
    <form onSubmit={handleSubmit} className="bg-surface-raised rounded-xl border border-white/10 p-6 space-y-5">
      <h2 className="text-lg font-semibold text-foreground">Per Diem Details</h2>

      {/* City */}
      <div className="space-y-1 relative">
        <label htmlFor="city" className="block text-sm font-medium text-foreground">
          Assignment City <span className="text-destructive" aria-hidden="true">*</span>
        </label>
        <input
          ref={cityInputRef}
          id="city"
          type="text"
          value={city}
          onChange={(e) => { setCity(e.target.value); setShowSuggestions(true) }}
          onFocus={() => setShowSuggestions(true)}
          placeholder="e.g. San Francisco"
          autoComplete="off"
          className="w-full bg-navy border border-white/20 rounded-md px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-teal"
        />
        {errors.city && <p className="text-xs text-destructive">{errors.city}</p>}

        {showSuggestions && filteredCities.length > 0 && (
          <div
            ref={suggestionsRef}
            className="absolute z-10 top-full mt-1 w-full bg-surface-raised border border-white/20 rounded-md shadow-lg overflow-hidden"
          >
            {filteredCities.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => handleCitySelect(suggestion)}
                className="w-full text-left px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* State */}
      <div className="space-y-1">
        <label htmlFor="state" className="block text-sm font-medium text-foreground">
          Assignment State <span className="text-destructive" aria-hidden="true">*</span>
        </label>
        <select
          id="state"
          value={state}
          onChange={(e) => setState(e.target.value)}
          className="w-full bg-navy border border-white/20 rounded-md px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-teal"
        >
          <option value="">Select state...</option>
          {US_STATES.map((s) => (
            <option key={s.code} value={s.code}>{s.name}</option>
          ))}
        </select>
        {errors.state && <p className="text-xs text-destructive">{errors.state}</p>}
      </div>

      {/* Weekly toggle */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          role="switch"
          aria-checked={isWeekly}
          onClick={() => setIsWeekly((prev) => !prev)}
          className={`relative inline-flex h-6 w-11 items-center rounded-full border-2 transition-colors focus:outline-none focus:ring-2 focus:ring-teal ${
            isWeekly ? 'bg-teal border-teal' : 'bg-navy border-white/30'
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              isWeekly ? 'translate-x-5' : 'translate-x-0.5'
            }`}
          />
        </button>
        <span className="text-sm text-muted-foreground">My agency quotes stipends weekly</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Agency Housing */}
        <div className="space-y-1">
          <label htmlFor="agencyHousing" className="block text-sm font-medium text-foreground">
            {housingLabel} <span className="text-destructive" aria-hidden="true">*</span>
          </label>
          <input
            id="agencyHousing"
            type="number"
            min="0"
            step="1"
            value={agencyHousing}
            onChange={(e) => setAgencyHousing(e.target.value)}
            placeholder={isWeekly ? 'e.g. 1050' : 'e.g. 150'}
            className="w-full bg-navy border border-white/20 rounded-md px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-teal"
          />
          {errors.agencyHousing && <p className="text-xs text-destructive">{errors.agencyHousing}</p>}
        </div>

        {/* Agency M&IE */}
        <div className="space-y-1">
          <label htmlFor="agencyMeals" className="block text-sm font-medium text-foreground">
            {mealsLabel} <span className="text-destructive" aria-hidden="true">*</span>
          </label>
          <input
            id="agencyMeals"
            type="number"
            min="0"
            step="1"
            value={agencyMeals}
            onChange={(e) => setAgencyMeals(e.target.value)}
            placeholder={isWeekly ? 'e.g. 476' : 'e.g. 68'}
            className="w-full bg-navy border border-white/20 rounded-md px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-teal"
          />
          {errors.agencyMeals && <p className="text-xs text-destructive">{errors.agencyMeals}</p>}
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-teal text-teal-foreground font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition-opacity text-sm"
      >
        Compare to GSA Rates
      </button>
    </form>
  )
}
