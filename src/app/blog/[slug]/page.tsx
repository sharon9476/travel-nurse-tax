import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { PortableText, type PortableTextBlock } from '@portabletext/react'
import { getAllPostSlugs, getPostBySlug } from '@/lib/sanity/queries'

export const revalidate = 3600

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return {}
  return {
    title: post.seoTitle ?? post.title,
    description: post.seoDescription ?? post.excerpt,
  }
}

const RELATED_TOOL_CONFIG = {
  'contract-analyzer': {
    label: 'Analyze your next contract',
    href: '/calculator/contract-analyzer',
    description: 'Run the numbers on your offer — taxable rate, stipends, multi-state taxes — in 60 seconds.',
  },
  'tax-home-quiz': {
    label: 'Check your tax home status',
    href: '/quiz/tax-home',
    description: 'Eight questions to find out if your tax home can survive an IRS audit.',
  },
  'per-diem-checker': {
    label: 'Check your per diem rates',
    href: '/calculator/per-diem',
    description: 'See how your agency\'s stipends compare to FY2025 GSA rates for your assignment city.',
  },
  'w2-vs-1099': {
    label: 'Compare W2 vs. 1099 take-home',
    href: '/calculator/w2-vs-1099',
    description: 'Enter your contract details and see the real after-tax difference between W2 and 1099 pay.',
  },
} as const

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) notFound()

  const relatedTool = post.relatedTool ? RELATED_TOOL_CONFIG[post.relatedTool] : null

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <header className="space-y-3">
        <Link
          href="/blog"
          className="text-xs text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
        >
          &larr; All posts
        </Link>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground leading-snug">
          {post.title}
        </h1>
        <p className="text-xs text-muted-foreground">
          {new Date(post.publishedAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
      </header>

      <article className="prose prose-invert prose-sm max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-teal prose-strong:text-foreground">
        {post.body && <PortableText value={post.body as PortableTextBlock[]} />}
      </article>

      {relatedTool && (
        <div className="bg-surface-raised rounded-xl border border-teal/30 p-6 space-y-3">
          <p className="text-xs text-teal font-semibold uppercase tracking-wider">Related tool</p>
          <h2 className="text-base font-semibold text-foreground">{relatedTool.label}</h2>
          <p className="text-sm text-muted-foreground">{relatedTool.description}</p>
          <Link
            href={relatedTool.href}
            className="inline-flex items-center text-sm font-medium text-teal hover:text-foreground transition-colors"
          >
            Try it free &rarr;
          </Link>
        </div>
      )}
    </div>
  )
}
