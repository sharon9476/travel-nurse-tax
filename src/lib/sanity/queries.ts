import { client, isSanityConfigured } from './client'
import type { PortableTextBlock } from '@portabletext/react'

export interface PostSummary {
  _id: string
  title: string
  slug: { current: string }
  publishedAt: string
  excerpt: string
}

export interface Post extends PostSummary {
  body: PortableTextBlock[]
  seoTitle?: string
  seoDescription?: string
  relatedTool?: 'contract-analyzer' | 'tax-home-quiz' | 'per-diem-checker'
}

export async function getAllPosts(): Promise<PostSummary[]> {
  if (!isSanityConfigured) return []
  return client.fetch(
    `*[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      publishedAt,
      excerpt
    }`
  )
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  if (!isSanityConfigured) return null
  return client.fetch(
    `*[_type == "post" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      publishedAt,
      excerpt,
      body,
      seoTitle,
      seoDescription,
      relatedTool
    }`,
    { slug }
  )
}

export async function getAllPostSlugs(): Promise<string[]> {
  if (!isSanityConfigured) return []
  const results: { slug: { current: string } }[] = await client.fetch(
    `*[_type == "post"] { slug }`
  )
  return results.map((r) => r.slug.current)
}
