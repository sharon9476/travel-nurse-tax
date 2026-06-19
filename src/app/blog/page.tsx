import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllPosts } from '@/lib/sanity/queries'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Travel nurse tax guides, contract tips, and IRS rule breakdowns written for nurses, not accountants.',
}

export default async function BlogPage() {
  const posts = await getAllPosts()

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <header className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Blog</h1>
        <p className="text-muted-foreground text-sm">
          Travel nurse tax guides written for nurses, not accountants.
        </p>
      </header>

      {posts.length === 0 ? (
        <p className="text-muted-foreground text-sm">No posts yet. Check back soon.</p>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <Link
              key={post._id}
              href={`/blog/${post.slug.current}`}
              className="group block bg-surface-raised rounded-xl border border-white/10 p-6 hover:border-teal/40 transition-colors space-y-2"
            >
              <p className="text-xs text-muted-foreground">
                {new Date(post.publishedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
              <h2 className="font-semibold text-foreground group-hover:text-teal transition-colors">
                {post.title}
              </h2>
              {post.excerpt && (
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                  {post.excerpt}
                </p>
              )}
              <span className="text-sm text-teal font-medium">Read more &rarr;</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
