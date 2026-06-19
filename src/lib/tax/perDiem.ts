import type { PerDiemInput, PerDiemResult } from '@/types/tax'
import rates from '@/data/perDiemRates.json'

const STANDARD_LODGING = 110
const STANDARD_MEALS = 68

export function lookupGsaRates(city: string, state: string): { lodgingPerDay: number; mealsPerDay: number } {
  const match = rates.rates.find(
    r => r.state === state && r.city.toLowerCase() === city.toLowerCase()
  )
  return match
    ? { lodgingPerDay: match.lodgingPerDay, mealsPerDay: match.mealsPerDay }
    : { lodgingPerDay: STANDARD_LODGING, mealsPerDay: STANDARD_MEALS }
}

export function calculatePerDiem(input: PerDiemInput): PerDiemResult {
  const gsa = lookupGsaRates(input.city, input.state)
  const housingPercent = gsa.lodgingPerDay > 0
    ? (input.agencyHousingPerDay / gsa.lodgingPerDay) * 100
    : 0
  const mealsPercent = gsa.mealsPerDay > 0
    ? (input.agencyMealsPerDay / gsa.mealsPerDay) * 100
    : 0
  const dailyGap = (gsa.lodgingPerDay - input.agencyHousingPerDay) + (gsa.mealsPerDay - input.agencyMealsPerDay)
  const weeklyGap = dailyGap * 7
  const assignmentGap = dailyGap * 91

  return {
    gsaHousingMax: gsa.lodgingPerDay,
    gsaMealsMax: gsa.mealsPerDay,
    agencyHousingPerDay: input.agencyHousingPerDay,
    agencyMealsPerDay: input.agencyMealsPerDay,
    housingPercent,
    mealsPercent,
    weeklyGap,
    assignmentGap,
  }
}
