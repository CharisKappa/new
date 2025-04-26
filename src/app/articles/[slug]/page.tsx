import { notFound } from 'next/navigation'
import { articles } from '@/data/articles'
import Image from '@/components/ui/Image'
import Link from 'next/link'

interface ArticlePageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.slug,
  }))
}

export default function ArticlePage({ params }: ArticlePageProps) {
  const article = articles.find((a) => a.slug === params.slug)

  if (!article) {
    notFound()
  }

  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      <nav className="mb-8">
        <Link href="/articles" className="text-primary hover:underline">
          ← Back to Articles
        </Link>
      </nav>

      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
        <div className="flex items-center gap-4 text-muted-foreground">
          <time dateTime={article.date}>{article.date}</time>
          <span>•</span>
          <span>{article.readTime} min read</span>
        </div>
      </header>

      <div className="relative aspect-video mb-8">
        <Image
          src={article.image}
          alt={article.title}
          className="rounded-lg object-cover"
          priority
        />
      </div>

      <div className="prose prose-lg dark:prose-invert max-w-none">
        {article.content}
      </div>
    </article>
  )
} 