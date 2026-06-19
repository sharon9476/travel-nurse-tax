import type { MetadataRoute } from 'next'
import { STATE_TAX_RATES } from '@/lib/tax/states'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://www.travelnursetax.app'

  const statePages: MetadataRoute.Sitemap = Object.keys(STATE_TAX_RATES).map((code) => ({
    url: `${base}/states/${code.toLowerCase()}`,
    lastModified: new Date(),
    changeFrequency: 'yearly',
    priority: 0.7,
  }))

  return [
    {
      url: base,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${base}/calculator/contract-analyzer`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${base}/quiz/tax-home`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${base}/calculator/per-diem`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${base}/calculator/w2-vs-1099`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${base}/states`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.8,
    },
    ...statePages,
  ]
}
