import type { FilingStatus } from '@/types/tax'
import { calcFederalIncomeTax, calcFica, FICA } from './federal'
import { calcStateIncomeTax } from './states'
import { hasReciprocity } from './reciprocity'

export interface W2Vs1099Input {
  // W2 contract
  w2TaxableHourly: number
  w2HousingWeekly: number
  w2MealsWeekly: number
  // 1099 contract
  contractorHourly: number
  contractorExpensesWeekly: number
  // Shared
  hoursPerWeek: number
  assignmentWeeks: number
  homeState: string
  assignmentState: string
  filingStatus: FilingStatus
  hasTaxHome: boolean
}

export interface W2Vs1099Result {
  w2TaxableGross: number
  w2Stipends: number
  w2TotalValue: number
  w2EmployeeFica: number
  w2FederalTax: number
  w2StateTax: number
  w2NetTakeHome: number
  w2EffectiveHourly: number

  contractorGross: number
  contractorExpenses: number
  contractorSETax: number
  contractorFederalTax: number
  contractorStateTax: number
  contractorNetTakeHome: number
  contractorEffectiveHourly: number

  netDifference: number        // positive = 1099 better, negative = W2 better
  breakEven1099Hourly: number  // 1099 rate that would produce the same net as W2
}

function calcStateTaxBothStates(
  income: number,
  homeState: string,
  assignmentState: string,
  filingStatus: FilingStatus,
): number {
  const reciprocityApplies = hasReciprocity(homeState, assignmentState)
  const homeTax = calcStateIncomeTax(income, homeState, filingStatus)
  const assignmentTax = (reciprocityApplies || homeState === assignmentState)
    ? 0
    : calcStateIncomeTax(income, assignmentState, filingStatus)
  return homeTax + assignmentTax
}

function calcSETax(netSEIncome: number): number {
  // SE tax applies to 92.35% of net SE income (IRS: 1 - 0.5 × 0.153 ≈ 0.9235)
  const subjectToSE = netSEIncome * 0.9235
  const ssTax = Math.min(subjectToSE, FICA.socialSecurityWageBase) * (FICA.socialSecurityRate * 2)
  const medicareTax = subjectToSE * (FICA.medicareRate * 2)
  return ssTax + medicareTax
}

function calcContractorNet(
  gross: number,
  expenses: number,
  homeState: string,
  assignmentState: string,
  filingStatus: FilingStatus,
): { seTax: number; federalTax: number; stateTax: number; net: number } {
  const netSEIncome = Math.max(0, gross - expenses)
  const seTax = calcSETax(netSEIncome)
  // Deduct half of SE tax from income before federal tax (IRS Schedule SE)
  const agiAfterSEDeduction = Math.max(0, netSEIncome - seTax * 0.5)
  const federalTax = calcFederalIncomeTax(agiAfterSEDeduction, filingStatus)
  const stateTax = calcStateTaxBothStates(netSEIncome, homeState, assignmentState, filingStatus)
  const net = gross - seTax - federalTax - stateTax
  return { seTax, federalTax, stateTax, net }
}

export function calculateW2Vs1099(input: W2Vs1099Input): W2Vs1099Result {
  const {
    w2TaxableHourly, w2HousingWeekly, w2MealsWeekly,
    contractorHourly, contractorExpensesWeekly,
    hoursPerWeek, assignmentWeeks,
    homeState, assignmentState, filingStatus, hasTaxHome,
  } = input

  const totalHours = hoursPerWeek * assignmentWeeks

  // --- W2 side ---
  const w2TaxableGross = w2TaxableHourly * totalHours
  const weeklyStipend = w2HousingWeekly + w2MealsWeekly
  const w2Stipends = hasTaxHome ? weeklyStipend * assignmentWeeks : 0
  const w2TaxableIncome = hasTaxHome
    ? w2TaxableGross
    : w2TaxableGross + weeklyStipend * assignmentWeeks
  const w2TotalValue = w2TaxableGross + weeklyStipend * assignmentWeeks

  const w2EmployeeFica = calcFica(w2TaxableIncome, filingStatus)
  const w2FederalTax = calcFederalIncomeTax(w2TaxableIncome, filingStatus)
  const w2StateTax = calcStateTaxBothStates(w2TaxableIncome, homeState, assignmentState, filingStatus)
  const w2NetTakeHome = w2TotalValue - w2EmployeeFica - w2FederalTax - w2StateTax
  const w2EffectiveHourly = totalHours > 0 ? w2NetTakeHome / totalHours : 0

  // --- 1099 side ---
  const contractorGross = contractorHourly * totalHours
  const contractorExpenses = contractorExpensesWeekly * assignmentWeeks
  const { seTax, federalTax: cFederal, stateTax: cState, net: contractorNet } =
    calcContractorNet(contractorGross, contractorExpenses, homeState, assignmentState, filingStatus)
  const contractorEffectiveHourly = totalHours > 0 ? contractorNet / totalHours : 0

  // --- Break-even: binary search for 1099 hourly that matches W2 net ---
  let lo = 0, hi = 300, breakEven = contractorHourly
  for (let i = 0; i < 60; i++) {
    const mid = (lo + hi) / 2
    const testGross = mid * totalHours
    const { net } = calcContractorNet(testGross, contractorExpenses, homeState, assignmentState, filingStatus)
    if (net < w2NetTakeHome) lo = mid
    else { breakEven = mid; hi = mid }
  }

  return {
    w2TaxableGross,
    w2Stipends,
    w2TotalValue,
    w2EmployeeFica,
    w2FederalTax,
    w2StateTax,
    w2NetTakeHome,
    w2EffectiveHourly,

    contractorGross,
    contractorExpenses,
    contractorSETax: seTax,
    contractorFederalTax: cFederal,
    contractorStateTax: cState,
    contractorNetTakeHome: contractorNet,
    contractorEffectiveHourly,

    netDifference: contractorNet - w2NetTakeHome,
    breakEven1099Hourly: breakEven,
  }
}
