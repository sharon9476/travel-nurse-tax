export type FilingStatus = 'single' | 'married_jointly' | 'head_of_household'
export type StateCode = string

export interface ContractInput {
  taxableHourlyRate: number
  hoursPerWeek: number
  housingStipendWeekly: number
  mealsStipendWeekly: number
  assignmentWeeks: number
  homeState: StateCode
  assignmentState: StateCode
  filingStatus: FilingStatus
  hasTaxHome: boolean
}

export interface ContractResult {
  taxableGross: number
  taxFreeStipends: number
  totalContractValue: number
  federalIncomeTax: number
  ficaTax: number
  homeStateTax: number
  assignmentStateTax: number
  totalTax: number
  effectiveTaxRate: number
  netTakeHome: number
  effectiveHourlyRate: number
  reciprocityApplies: boolean
  stipendsAreTaxFree: boolean
}

export interface PerDiemInput {
  city: string
  state: StateCode
  agencyHousingPerDay: number
  agencyMealsPerDay: number
}

export interface PerDiemResult {
  gsaHousingMax: number
  gsaMealsMax: number
  agencyHousingPerDay: number
  agencyMealsPerDay: number
  housingPercent: number
  mealsPercent: number
  weeklyGap: number
  assignmentGap: number
}

export interface QuizQuestion {
  id: string
  text: string
  subtext?: string
  options: { label: string; value: string; score: number }[]
}

export type TaxHomeRisk = 'strong' | 'moderate' | 'at_risk' | 'invalid'

export interface QuizResult {
  risk: TaxHomeRisk
  score: number
  headline: string
  explanation: string
  actions: string[]
}
