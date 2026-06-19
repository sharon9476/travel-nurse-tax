import type { QuizQuestion, QuizResult, TaxHomeRisk } from '@/types/tax'

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'permanent_home',
    text: 'Do you maintain a permanent home in your tax home state?',
    subtext: 'This means a place you own or rent that you keep available year-round — not a parent\'s address or storage unit.',
    options: [
      { label: 'Yes — I own or rent a place and keep it available when I\'m away', value: 'yes_own_rent', score: 3 },
      { label: 'Yes — I contribute to household expenses at a family member\'s home', value: 'yes_family', score: 2 },
      { label: 'I use a family member\'s address but pay nothing toward housing there', value: 'family_free', score: 0 },
      { label: 'No — I gave up my home when I started travel nursing', value: 'no', score: 0 },
    ],
  },
  {
    id: 'local_work',
    text: 'Did you work in your tax home area during the past year?',
    subtext: 'The IRS looks for a pattern of local employment. This doesn\'t have to be your main income source.',
    options: [
      { label: 'Yes — I do per diem or PRN shifts locally between assignments', value: 'yes_prn', score: 3 },
      { label: 'Yes — I worked locally at least once in the past 12 months', value: 'yes_once', score: 2 },
      { label: 'Not recently — it\'s been over a year since I worked locally', value: 'not_recently', score: 1 },
      { label: 'No — I\'ve never worked in my tax home state as a nurse', value: 'never', score: 0 },
    ],
  },
  {
    id: 'return_home',
    text: 'How often do you return to your tax home between assignments?',
    subtext: 'Frequency of return trips is strong evidence that your tax home is your real home.',
    options: [
      { label: 'After every assignment (at least 2-3 times a year)', value: 'every_assignment', score: 3 },
      { label: 'At least once a year for extended stays', value: 'once_year', score: 2 },
      { label: 'Occasionally — a few short visits per year', value: 'occasionally', score: 1 },
      { label: 'Rarely or never — I stay near assignment locations', value: 'rarely', score: 0 },
    ],
  },
  {
    id: 'living_expenses',
    text: 'Do you pay duplicate living expenses — housing in both your tax home and assignment location?',
    subtext: 'This "double burden" is one of the core IRS tests for a valid tax home.',
    options: [
      { label: 'Yes — I pay for both my home AND my assignment housing simultaneously', value: 'yes_both', score: 3 },
      { label: 'Partially — my agency covers assignment housing but I still pay at home', value: 'partial', score: 2 },
      { label: 'No — I\'ve sublet or vacated my home when on assignment', value: 'no_sublet', score: 1 },
      { label: 'No — I have no housing costs at my "home" location', value: 'no_costs', score: 0 },
    ],
  },
  {
    id: 'drivers_license',
    text: 'Where is your driver\'s license, vehicle registration, and voter registration?',
    subtext: 'These administrative ties help establish domicile in your claimed tax home state.',
    options: [
      { label: 'All in my tax home state', value: 'all_home', score: 3 },
      { label: 'Most in my tax home state — one or two things are different', value: 'most_home', score: 2 },
      { label: 'Mixed — split between states', value: 'mixed', score: 1 },
      { label: 'None in my claimed tax home state', value: 'none_home', score: 0 },
    ],
  },
  {
    id: 'assignment_length',
    text: 'How long have you been continuously working outside your tax home state?',
    subtext: 'Extended absence (over a year in one location) can trigger the "itinerant worker" classification.',
    options: [
      { label: 'I take 13-week contracts and move to different states regularly', value: 'rotating', score: 3 },
      { label: 'I\'ve been in the same state for 6-12 months', value: 'medium', score: 2 },
      { label: 'I\'ve been in the same state for over a year but plan to move', value: 'long', score: 1 },
      { label: 'I\'ve been continuously working outside my home state for 2+ years', value: 'very_long', score: 0 },
    ],
  },
  {
    id: 'banking_mail',
    text: 'Where do you receive your mail, bank, and file your taxes?',
    subtext: 'Using your tax home state address for banking and filing reinforces your tax home claim.',
    options: [
      { label: 'All banking, mail, and tax filing uses my home state address', value: 'all_home', score: 3 },
      { label: 'Most financial ties are in my home state', value: 'most_home', score: 2 },
      { label: 'I use various addresses depending on where I am', value: 'mixed', score: 1 },
      { label: 'I primarily use addresses outside my claimed home state', value: 'elsewhere', score: 0 },
    ],
  },
  {
    id: 'agency_acknowledgment',
    text: 'Does your travel agency and contract acknowledge your tax home?',
    subtext: 'Some agencies require documentation that you maintain a tax home to offer tax-free stipends.',
    options: [
      { label: 'Yes — I\'ve provided documentation and my agency is aware', value: 'yes_documented', score: 2 },
      { label: 'My agency offers stipends but hasn\'t asked for documentation', value: 'stipends_no_docs', score: 1 },
      { label: 'My contract doesn\'t mention tax home status', value: 'no_mention', score: 1 },
      { label: 'I\'m not sure / I\'ve never discussed this with my agency', value: 'unsure', score: 0 },
    ],
  },
]

export const QUIZ_RESULTS: Record<TaxHomeRisk, Omit<QuizResult, 'score' | 'risk'>> = {
  strong: {
    headline: 'Your tax home appears strong.',
    explanation:
      'Based on your answers, you have solid evidence supporting your tax home claim. You maintain a permanent residence, return home regularly, bear duplicate living expenses, and have administrative ties in your home state. Keep documenting these facts — agency audits happen, and your records are your protection.',
    actions: [
      'Keep receipts for your home rent/mortgage payments while on assignment',
      'Document each return trip home (dates, purpose, any local shifts worked)',
      'Maintain a log of PRN or per diem shifts in your home area',
      'Store your signed tax home acknowledgment form from your agency',
      'File state returns correctly — home state on worldwide income, assignment state on income earned there',
    ],
  },
  moderate: {
    headline: 'Your tax home is defensible but has some gaps.',
    explanation:
      'You have meaningful ties to your claimed tax home, but a few factors could be strengthened. The IRS weighs time, business connections, and personal ties together. Nurses in your situation are generally fine, but you should address the weaker areas before your next assignment — especially if your stipends are significant.',
    actions: [
      'Consider taking at least one local per diem shift per quarter to establish local business connections',
      'If you haven\'t already, make sure your driver\'s license and voter registration are in your home state',
      'Talk to your agency about a formal tax home acknowledgment letter',
      'Consider consulting a travel nurse tax specialist to review your specific situation',
      'Keep detailed records of all housing costs at both locations',
    ],
  },
  at_risk: {
    headline: 'Your tax home has significant vulnerabilities.',
    explanation:
      'Several of your answers indicate risk factors that could lead the IRS to classify your stipends as taxable income. This doesn\'t mean you\'ve done anything wrong, but it does mean you should take action before your next assignment. Tax home issues can result in substantial back taxes plus penalties and interest if audited.',
    actions: [
      'Do not accept tax-free stipends until you\'ve consulted a travel nurse CPA',
      'Consider establishing a legitimate tax home — this may mean renting a place in your home state and working there periodically',
      'Get your driver\'s license, registration, and voter registration updated to your intended home state',
      'Ask your agency to review your tax home documentation requirements',
      'Consult a specialist immediately — a CPA can help you either strengthen your tax home or correctly report stipends as taxable income',
    ],
  },
  invalid: {
    headline: 'You may not have a valid tax home.',
    explanation:
      'Based on your answers, the IRS would likely classify you as an "itinerant worker" — someone who travels so extensively that they have no fixed tax home. This means your housing and meal stipends are likely taxable income, not tax-free reimbursements. If you\'ve been accepting tax-free stipends, you may owe back taxes. This is a serious situation that requires professional guidance.',
    actions: [
      'Stop accepting tax-free stipends until you speak with a travel nurse tax professional',
      'Consult a CPA who specializes in travel nurse taxes as soon as possible',
      'Consider whether you want to establish a legitimate tax home going forward — this is achievable with planning',
      'Review your past returns with a professional to assess your exposure',
      'Do not ignore this — amended returns filed voluntarily carry far lower penalties than IRS-discovered issues',
    ],
  },
}

export function evaluateQuiz(answers: Record<string, number>): QuizResult {
  const score = Object.values(answers).reduce((sum, v) => sum + v, 0)
  let risk: TaxHomeRisk

  if (score >= 18) {
    risk = 'strong'
  } else if (score >= 12) {
    risk = 'moderate'
  } else if (score >= 6) {
    risk = 'at_risk'
  } else {
    risk = 'invalid'
  }

  return {
    risk,
    score,
    ...QUIZ_RESULTS[risk],
  }
}
