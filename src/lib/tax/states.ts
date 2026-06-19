import type { FilingStatus } from '@/types/tax'

export interface StateTaxConfig {
  name: string
  hasIncomeTax: boolean
  flatRate?: number
  brackets?: { rate: number; min: number; max: number }[]
  standardDeduction?: number
  notes?: string
}

export const STATE_TAX_RATES: Record<string, StateTaxConfig> = {
  AL: {
    name: 'Alabama',
    hasIncomeTax: true,
    brackets: [
      { rate: 0.02, min: 0,      max: 500 },
      { rate: 0.04, min: 500,    max: 3_000 },
      { rate: 0.05, min: 3_000,  max: Infinity },
    ],
    notes: 'Rates for single filers',
  },
  AK: {
    name: 'Alaska',
    hasIncomeTax: false,
  },
  AZ: {
    name: 'Arizona',
    hasIncomeTax: true,
    flatRate: 0.025,
  },
  AR: {
    name: 'Arkansas',
    hasIncomeTax: true,
    brackets: [
      { rate: 0.02,  min: 0,       max: 4_300 },
      { rate: 0.04,  min: 4_300,   max: 8_500 },
      { rate: 0.044, min: 8_500,   max: Infinity },
    ],
  },
  CA: {
    name: 'California',
    hasIncomeTax: true,
    brackets: [
      { rate: 0.01,  min: 0,         max: 10_412 },
      { rate: 0.02,  min: 10_412,    max: 24_684 },
      { rate: 0.04,  min: 24_684,    max: 38_959 },
      { rate: 0.06,  min: 38_959,    max: 54_081 },
      { rate: 0.08,  min: 54_081,    max: 68_350 },
      { rate: 0.093, min: 68_350,    max: 349_137 },
      { rate: 0.103, min: 349_137,   max: 418_961 },
      { rate: 0.113, min: 418_961,   max: 698_274 },
      { rate: 0.123, min: 698_274,   max: 1_000_000 },
      { rate: 0.133, min: 1_000_000, max: Infinity },
    ],
  },
  CO: {
    name: 'Colorado',
    hasIncomeTax: true,
    flatRate: 0.044,
  },
  CT: {
    name: 'Connecticut',
    hasIncomeTax: true,
    brackets: [
      { rate: 0.03,  min: 0,       max: 10_000 },
      { rate: 0.05,  min: 10_000,  max: 50_000 },
      { rate: 0.055, min: 50_000,  max: 100_000 },
      { rate: 0.06,  min: 100_000, max: 200_000 },
      { rate: 0.065, min: 200_000, max: 250_000 },
      { rate: 0.069, min: 250_000, max: 500_000 },
      { rate: 0.0699,min: 500_000, max: Infinity },
    ],
  },
  DE: {
    name: 'Delaware',
    hasIncomeTax: true,
    brackets: [
      { rate: 0.00,  min: 0,       max: 2_000 },
      { rate: 0.022, min: 2_000,   max: 5_000 },
      { rate: 0.039, min: 5_000,   max: 10_000 },
      { rate: 0.048, min: 10_000,  max: 20_000 },
      { rate: 0.052, min: 20_000,  max: 25_000 },
      { rate: 0.0555,min: 25_000,  max: 60_000 },
      { rate: 0.066, min: 60_000,  max: Infinity },
    ],
  },
  DC: {
    name: 'District of Columbia',
    hasIncomeTax: true,
    brackets: [
      { rate: 0.04,  min: 0,       max: 10_000 },
      { rate: 0.06,  min: 10_000,  max: 40_000 },
      { rate: 0.065, min: 40_000,  max: 60_000 },
      { rate: 0.085, min: 60_000,  max: 250_000 },
      { rate: 0.0925,min: 250_000, max: 500_000 },
      { rate: 0.0975,min: 500_000, max: 1_000_000 },
      { rate: 0.1075,min: 1_000_000,max: Infinity },
    ],
  },
  FL: {
    name: 'Florida',
    hasIncomeTax: false,
  },
  GA: {
    name: 'Georgia',
    hasIncomeTax: true,
    flatRate: 0.0519,
  },
  HI: {
    name: 'Hawaii',
    hasIncomeTax: true,
    brackets: [
      { rate: 0.014, min: 0,       max: 2_400 },
      { rate: 0.032, min: 2_400,   max: 4_800 },
      { rate: 0.055, min: 4_800,   max: 9_600 },
      { rate: 0.064, min: 9_600,   max: 14_400 },
      { rate: 0.068, min: 14_400,  max: 19_200 },
      { rate: 0.072, min: 19_200,  max: 24_000 },
      { rate: 0.076, min: 24_000,  max: 36_000 },
      { rate: 0.079, min: 36_000,  max: 48_000 },
      { rate: 0.0825,min: 48_000,  max: 150_000 },
      { rate: 0.09,  min: 150_000, max: 175_000 },
      { rate: 0.10,  min: 175_000, max: 200_000 },
      { rate: 0.11,  min: 200_000, max: Infinity },
    ],
  },
  ID: {
    name: 'Idaho',
    hasIncomeTax: true,
    flatRate: 0.053,
  },
  IL: {
    name: 'Illinois',
    hasIncomeTax: true,
    flatRate: 0.0495,
  },
  IN: {
    name: 'Indiana',
    hasIncomeTax: true,
    flatRate: 0.0295,
  },
  IA: {
    name: 'Iowa',
    hasIncomeTax: true,
    flatRate: 0.038,
  },
  KS: {
    name: 'Kansas',
    hasIncomeTax: true,
    brackets: [
      { rate: 0.031, min: 0,       max: 15_000 },
      { rate: 0.057, min: 15_000,  max: 30_000 },
      { rate: 0.057, min: 30_000,  max: Infinity },
    ],
  },
  KY: {
    name: 'Kentucky',
    hasIncomeTax: true,
    flatRate: 0.035,
  },
  LA: {
    name: 'Louisiana',
    hasIncomeTax: true,
    flatRate: 0.03,
  },
  ME: {
    name: 'Maine',
    hasIncomeTax: true,
    brackets: [
      { rate: 0.058, min: 0,       max: 24_500 },
      { rate: 0.0675,min: 24_500,  max: 58_050 },
      { rate: 0.0715,min: 58_050,  max: Infinity },
    ],
  },
  MD: {
    name: 'Maryland',
    hasIncomeTax: true,
    brackets: [
      { rate: 0.02,  min: 0,       max: 1_000 },
      { rate: 0.03,  min: 1_000,   max: 2_000 },
      { rate: 0.04,  min: 2_000,   max: 3_000 },
      { rate: 0.0475,min: 3_000,   max: 100_000 },
      { rate: 0.05,  min: 100_000, max: 125_000 },
      { rate: 0.0525,min: 125_000, max: 150_000 },
      { rate: 0.055, min: 150_000, max: 250_000 },
      { rate: 0.0575,min: 250_000, max: Infinity },
    ],
  },
  MA: {
    name: 'Massachusetts',
    hasIncomeTax: true,
    flatRate: 0.05,
    notes: 'Plus 4% surtax on income over $1M',
  },
  MI: {
    name: 'Michigan',
    hasIncomeTax: true,
    flatRate: 0.0425,
  },
  MN: {
    name: 'Minnesota',
    hasIncomeTax: true,
    brackets: [
      { rate: 0.0535,min: 0,       max: 31_690 },
      { rate: 0.068, min: 31_690,  max: 104_090 },
      { rate: 0.0785,min: 104_090, max: 193_240 },
      { rate: 0.0985,min: 193_240, max: Infinity },
    ],
  },
  MS: {
    name: 'Mississippi',
    hasIncomeTax: true,
    brackets: [
      { rate: 0.00, min: 0,      max: 10_000 },
      { rate: 0.04, min: 10_000, max: Infinity },
    ],
  },
  MO: {
    name: 'Missouri',
    hasIncomeTax: true,
    brackets: [
      { rate: 0.00,  min: 0,      max: 1_348 },
      { rate: 0.02,  min: 1_348,  max: 2_696 },
      { rate: 0.025, min: 2_696,  max: 4_044 },
      { rate: 0.03,  min: 4_044,  max: 5_392 },
      { rate: 0.035, min: 5_392,  max: 6_740 },
      { rate: 0.04,  min: 6_740,  max: 8_088 },
      { rate: 0.045, min: 8_088,  max: 9_436 },
      { rate: 0.047, min: 9_436,  max: Infinity },
    ],
  },
  MT: {
    name: 'Montana',
    hasIncomeTax: true,
    brackets: [
      { rate: 0.04, min: 0,       max: 20_500 },
      { rate: 0.055,min: 20_500,  max: Infinity },
    ],
  },
  NE: {
    name: 'Nebraska',
    hasIncomeTax: true,
    brackets: [
      { rate: 0.0246,min: 0,       max: 3_700 },
      { rate: 0.0351,min: 3_700,   max: 22_170 },
      { rate: 0.0501,min: 22_170,  max: 35_730 },
      { rate: 0.0584,min: 35_730,  max: Infinity },
    ],
  },
  NV: {
    name: 'Nevada',
    hasIncomeTax: false,
  },
  NH: {
    name: 'New Hampshire',
    hasIncomeTax: false,
    notes: 'No tax on wages; interest/dividend tax being phased out',
  },
  NJ: {
    name: 'New Jersey',
    hasIncomeTax: true,
    brackets: [
      { rate: 0.014, min: 0,        max: 20_000 },
      { rate: 0.0175,min: 20_000,   max: 35_000 },
      { rate: 0.035, min: 35_000,   max: 40_000 },
      { rate: 0.05525,min: 40_000,  max: 75_000 },
      { rate: 0.0637,min: 75_000,   max: 500_000 },
      { rate: 0.0897,min: 500_000,  max: 1_000_000 },
      { rate: 0.1075,min: 1_000_000,max: Infinity },
    ],
  },
  NM: {
    name: 'New Mexico',
    hasIncomeTax: true,
    brackets: [
      { rate: 0.017, min: 0,       max: 5_500 },
      { rate: 0.032, min: 5_500,   max: 11_000 },
      { rate: 0.047, min: 11_000,  max: 16_000 },
      { rate: 0.049, min: 16_000,  max: 210_000 },
      { rate: 0.059, min: 210_000, max: Infinity },
    ],
  },
  NY: {
    name: 'New York',
    hasIncomeTax: true,
    brackets: [
      { rate: 0.04,   min: 0,        max: 8_500 },
      { rate: 0.045,  min: 8_500,    max: 11_700 },
      { rate: 0.0525, min: 11_700,   max: 13_900 },
      { rate: 0.055,  min: 13_900,   max: 80_650 },
      { rate: 0.06,   min: 80_650,   max: 215_400 },
      { rate: 0.0685, min: 215_400,  max: 1_077_550 },
      { rate: 0.0965, min: 1_077_550,max: 5_000_000 },
      { rate: 0.103,  min: 5_000_000,max: 25_000_000 },
      { rate: 0.109,  min: 25_000_000,max: Infinity },
    ],
  },
  NC: {
    name: 'North Carolina',
    hasIncomeTax: true,
    flatRate: 0.0399,
  },
  ND: {
    name: 'North Dakota',
    hasIncomeTax: true,
    brackets: [
      { rate: 0.0195,min: 0,       max: 44_725 },
      { rate: 0.025, min: 44_725,  max: Infinity },
    ],
  },
  OH: {
    name: 'Ohio',
    hasIncomeTax: true,
    brackets: [
      { rate: 0.00,   min: 0,      max: 26_050 },
      { rate: 0.0275, min: 26_050, max: Infinity },
    ],
  },
  OK: {
    name: 'Oklahoma',
    hasIncomeTax: true,
    brackets: [
      { rate: 0.00,  min: 0,     max: 3_750 },
      { rate: 0.025, min: 3_750, max: 4_900 },
      { rate: 0.035, min: 4_900, max: 7_200 },
      { rate: 0.045, min: 7_200, max: Infinity },
    ],
  },
  OR: {
    name: 'Oregon',
    hasIncomeTax: true,
    brackets: [
      { rate: 0.0475,min: 0,       max: 18_400 },
      { rate: 0.0675,min: 18_400,  max: 46_200 },
      { rate: 0.0875,min: 46_200,  max: 250_000 },
      { rate: 0.099, min: 250_000, max: Infinity },
    ],
  },
  PA: {
    name: 'Pennsylvania',
    hasIncomeTax: true,
    flatRate: 0.0307,
  },
  RI: {
    name: 'Rhode Island',
    hasIncomeTax: true,
    brackets: [
      { rate: 0.0375,min: 0,       max: 77_450 },
      { rate: 0.0475,min: 77_450,  max: 176_050 },
      { rate: 0.0599,min: 176_050, max: Infinity },
    ],
  },
  SC: {
    name: 'South Carolina',
    hasIncomeTax: true,
    brackets: [
      { rate: 0.00, min: 0,      max: 3_460 },
      { rate: 0.03, min: 3_460,  max: 17_330 },
      { rate: 0.064,min: 17_330, max: Infinity },
    ],
  },
  SD: {
    name: 'South Dakota',
    hasIncomeTax: false,
  },
  TN: {
    name: 'Tennessee',
    hasIncomeTax: false,
    notes: 'Hall income tax on investment income was repealed in 2021; wages not taxed',
  },
  TX: {
    name: 'Texas',
    hasIncomeTax: false,
  },
  UT: {
    name: 'Utah',
    hasIncomeTax: true,
    flatRate: 0.0445,
  },
  VT: {
    name: 'Vermont',
    hasIncomeTax: true,
    brackets: [
      { rate: 0.0335,min: 0,       max: 45_400 },
      { rate: 0.066, min: 45_400,  max: 110_050 },
      { rate: 0.076, min: 110_050, max: 229_550 },
      { rate: 0.0875,min: 229_550, max: Infinity },
    ],
  },
  VA: {
    name: 'Virginia',
    hasIncomeTax: true,
    brackets: [
      { rate: 0.02,  min: 0,      max: 3_000 },
      { rate: 0.03,  min: 3_000,  max: 5_000 },
      { rate: 0.05,  min: 5_000,  max: 17_000 },
      { rate: 0.0575,min: 17_000, max: Infinity },
    ],
  },
  WA: {
    name: 'Washington',
    hasIncomeTax: false,
    notes: 'No income tax on wages; capital gains tax applies over threshold',
  },
  WV: {
    name: 'West Virginia',
    hasIncomeTax: true,
    brackets: [
      { rate: 0.0211, min: 0,      max: 10_000 },
      { rate: 0.0281, min: 10_000, max: 25_000 },
      { rate: 0.0316, min: 25_000, max: 40_000 },
      { rate: 0.0422, min: 40_000, max: 60_000 },
      { rate: 0.0458, min: 60_000, max: Infinity },
    ],
  },
  WI: {
    name: 'Wisconsin',
    hasIncomeTax: true,
    brackets: [
      { rate: 0.035, min: 0,       max: 14_320 },
      { rate: 0.044, min: 14_320,  max: 28_640 },
      { rate: 0.053, min: 28_640,  max: 315_310 },
      { rate: 0.0765,min: 315_310, max: Infinity },
    ],
  },
  WY: {
    name: 'Wyoming',
    hasIncomeTax: false,
  },
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function calcStateIncomeTax(income: number, stateCode: string, _filingStatus?: FilingStatus): number {
  const config = STATE_TAX_RATES[stateCode]
  if (!config || !config.hasIncomeTax) return 0
  if (config.flatRate !== undefined) return income * config.flatRate
  if (config.brackets) {
    let tax = 0
    for (const bracket of config.brackets) {
      if (income <= bracket.min) break
      tax += (Math.min(income, bracket.max) - bracket.min) * bracket.rate
    }
    return tax
  }
  return 0
}

export const US_STATES = Object.entries(STATE_TAX_RATES).map(([code, config]) => ({
  code,
  name: config.name,
})).sort((a, b) => a.name.localeCompare(b.name))

export function getTopMarginalRate(config: StateTaxConfig): number {
  if (!config.hasIncomeTax) return 0
  if (config.flatRate !== undefined) return config.flatRate
  if (config.brackets) {
    return config.brackets[config.brackets.length - 1].rate
  }
  return 0
}

export function formatTaxRate(config: StateTaxConfig): string {
  if (!config.hasIncomeTax) return 'No income tax'
  if (config.flatRate !== undefined) return `${(config.flatRate * 100).toFixed(2).replace(/\.?0+$/, '')}% flat`
  if (config.brackets) {
    const top = config.brackets[config.brackets.length - 1].rate
    return `Up to ${(top * 100).toFixed(2).replace(/\.?0+$/, '')}%`
  }
  return 'N/A'
}
