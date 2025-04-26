export interface Article {
  id: string
  title: string
  description: string
  image: string
  content: string
  metadata?: {
    date?: string
    author?: string
    category?: string
    tags?: string[]
    readTime?: string
  }
} 