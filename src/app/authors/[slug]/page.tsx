import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { AUTHORS, authorPersonJsonLd } from '@/lib/author'

interface PageProps {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return Object.keys(AUTHORS).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const author = AUTHORS[slug]
  if (!author) {
    return { title: 'Author Not Found', robots: { index: false, follow: false } }
  }
  const title = `${author.name} — ${author.role}`
  return {
    title,
    description: author.bio,
    alternates: { canonical: `/authors/${author.slug}` },
    openGraph: { title, description: author.bio, type: 'profile' },
  }
}

const initials = (name: string) =>
  name
    .split(/\s+/)
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

export default async function AuthorPage({ params }: PageProps) {
  const { slug } = await params
  const author = AUTHORS[slug]
  if (!author) notFound()

  const paragraphs = author.longBio ?? [author.bio]

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(authorPersonJsonLd(author)) }}
      />

      {/* Breadcrumb */}
      <nav className="text-sm text-muted-foreground" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-foreground transition-colors">
          Home
        </Link>
        <span className="mx-2">›</span>
        <Link href="/about" className="hover:text-foreground transition-colors">
          About
        </Link>
        <span className="mx-2">›</span>
        <span>{author.name}</span>
      </nav>

      {/* Header */}
      <header className="flex items-center gap-5">
        {author.image ? (
          <Image
            src={author.image}
            alt={author.name}
            width={96}
            height={96}
            className="rounded-full object-cover"
          />
        ) : (
          <div
            aria-hidden="true"
            className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-teal/15 border border-teal/30 text-2xl font-bold text-teal data-mono"
          >
            {initials(author.name)}
          </div>
        )}
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-foreground">{author.name}</h1>
          <p className="text-muted-foreground">{author.role}, TravelNurseTax</p>
          {author.links[0] && (
            <a
              href={author.links[0]}
              target="_blank"
              rel="noopener noreferrer me"
              className="inline-flex items-center gap-1 text-sm text-teal hover:opacity-80 transition-opacity font-medium"
            >
              LinkedIn &rarr;
            </a>
          )}
        </div>
      </header>

      {/* Bio */}
      <div className="space-y-5 text-muted-foreground leading-relaxed">
        {paragraphs.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>

      {/* Contact */}
      <div className="bg-surface-raised rounded-xl border border-white/10 p-6 space-y-3">
        <h2 className="text-lg font-semibold text-foreground">Spot something wrong?</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Found a calculation that looks off or a state rate that&apos;s out of date? Reach out — fixes
          from working nurses keep these tools accurate.
        </p>
        <a
          href="mailto:support@travelnursetax.app"
          className="text-sm text-teal hover:opacity-80 transition-opacity font-medium"
        >
          support@travelnursetax.app
        </a>
      </div>
    </div>
  )
}
