import type { ContractInput, ContractResult } from '@/types/tax'
import { calcFederalIncomeTax, calcFica } from './federal'
import { calcStateIncomeTax } from './states'
import { hasReciprocity } from './reciprocity'

export function calculateContractNetPay(input: ContractInput): ContractResult {
  const {
    taxableHourlyRate, hoursPerWeek, housingStipendWeekly, mealsStipendWeekly,
    assignmentWeeks, homeState, assignmentState, filingStatus, hasTaxHome,
  } = input

  const totalHours = hoursPerWeek * assignmentWeeks
  const taxableGross = taxableHourlyRate * totalHours
  const stipendsAreTaxFree = hasTaxHome
  const weeklyStipend = housingStipendWeekly + mealsStipendWeekly
  const taxFreeStipends = stipendsAreTaxFree ? weeklyStipend * assignmentWeeks : 0
  const taxableStipends = stipendsAreTaxFree ? 0 : weeklyStipend * assignmentWeeks
  const totalTaxableIncome = taxableGross + taxableStipends
  const totalContractValue = taxableGross + (weeklyStipend * assignmentWeeks)

  const federalIncomeTax = calcFederalIncomeTax(totalTaxableIncome, filingStatus)
  const ficaTax = calcFica(totalTaxableIncome, filingStatus)

  const reciprocityApplies = hasReciprocity(homeState, assignmentState)
  const homeStateTax = calcStateIncomeTax(totalTaxableIncome, homeState)
  const assignmentStateTax = (reciprocityApplies || homeState === assignmentState)
    ? 0
    : calcStateIncomeTax(totalTaxableIncome, assignmentState)

  const totalTax = federalIncomeTax + ficaTax + homeStateTax + assignmentStateTax
  const netTakeHome = totalContractValue - totalTax
  const effectiveTaxRate = totalTaxableIncome > 0 ? totalTax / totalTaxableIncome : 0
  const effectiveHourlyRate = totalHours > 0 ? netTakeHome / totalHours : 0

  return {
    taxableGross,
    taxFreeStipends,
    totalContractValue,
    federalIncomeTax,
    ficaTax,
    homeStateTax,
    assignmentStateTax,
    totalTax,
    effectiveTaxRate,
    netTakeHome,
    effectiveHourlyRate,
    reciprocityApplies,
    stipendsAreTaxFree,
  }
}
