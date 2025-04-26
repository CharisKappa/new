'use client'

import type { Article } from '@/types/article'
import { useArticle } from '@/context/ArticleContext'
import { motion } from 'framer-motion'
import Image from '@/components/ui/Image'

interface ArticleTileProps {
  article: Article
}

export default function ArticleTile({ article }: ArticleTileProps) {
  const { openArticle } = useArticle()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="group relative overflow-hidden rounded-xl cursor-pointer hover-lift"
      onClick={() => openArticle(article)}
    >
      <div className="relative aspect-video">
        <Image
          src={article.image}
          alt={article.title}
          priority={false}
          className="transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <div className="absolute inset-0 flex items-center justify-center p-4 text-center">
        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
          <h3 className="text-2xl font-bold text-white mb-2">{article.title}</h3>
          <p className="text-white/90">{article.description}</p>
        </div>
      </div>
    </motion.div>
  )
} 