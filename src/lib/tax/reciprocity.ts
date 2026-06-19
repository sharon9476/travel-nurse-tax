export const RECIPROCITY_MAP: Record<string, string[]> = {
  IL: ['IN', 'IA', 'KY', 'MI', 'WI'],
  IN: ['IL', 'KY', 'MI', 'OH', 'PA', 'WI'],
  IA: ['IL'],
  KY: ['IL', 'IN', 'MI', 'OH', 'VA', 'WI', 'WV'],
  MD: ['DC', 'PA', 'VA', 'WV'],
  MI: ['IL', 'IN', 'KY', 'MN', 'OH', 'WI'],
  MN: ['MI', 'ND'],
  MT: ['ND'],
  NJ: ['PA'],
  ND: ['MN', 'MT'],
  OH: ['IN', 'KY', 'MI', 'PA', 'WV'],
  PA: ['IN', 'MD', 'NJ', 'OH', 'VA', 'WV'],
  VA: ['DC', 'KY', 'MD', 'PA', 'WV'],
  WI: ['IL', 'IN', 'KY', 'MI'],
  WV: ['KY', 'MD', 'OH', 'PA', 'VA'],
  DC: ['MD', 'VA'],
}

export function hasReciprocity(homeState: string, workState: string): boolean {
  return RECIPROCITY_MAP[homeState]?.includes(workState) ?? false
}
