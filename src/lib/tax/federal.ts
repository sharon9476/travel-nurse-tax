import type { FilingStatus } from '@/types/tax'

export const TAX_YEAR = 2025

export const FICA = {
  socialSecurityRate: 0.062,
  socialSecurityWageBase: 184_500,
  medicareRate: 0.0145,
  additionalMedicareRate: 0.009,
  additionalMedicareThreshold: { single: 200_000, married_jointly: 250_000, head_of_household: 200_000 } as Record<FilingStatus, number>,
}

export const STANDARD_DEDUCTION: Record<FilingStatus, number> = {
  single: 15_000,
  married_jointly: 30_000,
  head_of_household: 22_500,
}

export const FEDERAL_BRACKETS: Record<FilingStatus, { rate: number; min: number; max: number }[]> = {
  single: [
    { rate: 0.10, min: 0,       max: 11_925 },
    { rate: 0.12, min: 11_925,  max: 48_475 },
    { rate: 0.22, min: 48_475,  max: 103_350 },
    { rate: 0.24, min: 103_350, max: 197_300 },
    { rate: 0.32, min: 197_300, max: 250_525 },
    { rate: 0.35, min: 250_525, max: 626_350 },
    { rate: 0.37, min: 626_350, max: Infinity },
  ],
  married_jointly: [
    { rate: 0.10, min: 0,        max: 23_850 },
    { rate: 0.12, min: 23_850,   max: 96_950 },
    { rate: 0.22, min: 96_950,   max: 206_700 },
    { rate: 0.24, min: 206_700,  max: 394_600 },
    { rate: 0.32, min: 394_600,  max: 501_050 },
    { rate: 0.35, min: 501_050,  max: 751_600 },
    { rate: 0.37, min: 751_600,  max: Infinity },
  ],
  head_of_household: [
    { rate: 0.10, min: 0,        max: 17_000 },
    { rate: 0.12, min: 17_000,   max: 64_850 },
    { rate: 0.22, min: 64_850,   max: 103_350 },
    { rate: 0.24, min: 103_350,  max: 197_300 },
    { rate: 0.32, min: 197_300,  max: 250_500 },
    { rate: 0.35, min: 250_500,  max: 626_350 },
    { rate: 0.37, min: 626_350,  max: Infinity },
  ],
}

export function calcFederalIncomeTax(taxableIncome: number, filingStatus: FilingStatus): number {
  const deduction = STANDARD_DEDUCTION[filingStatus]
  const agi = Math.max(0, taxableIncome - deduction)
  const brackets = FEDERAL_BRACKETS[filingStatus]
  let tax = 0
  for (const bracket of brackets) {
    if (agi <= bracket.min) break
    const taxableInBracket = Math.min(agi, bracket.max) - bracket.min
    tax += taxableInBracket * bracket.rate
  }
  return tax
}

export function calcFica(taxableIncome: number, filingStatus: FilingStatus): number {
  const ss = Math.min(taxableIncome, FICA.socialSecurityWageBase) * FICA.socialSecurityRate
  const medicare = taxableIncome * FICA.medicareRate
  const additionalThreshold = FICA.additionalMedicareThreshold[filingStatus]
  const additionalMedicare = Math.max(0, taxableIncome - additionalThreshold) * FICA.additionalMedicareRate
  return ss + medicare + additionalMedicare
}
