'use client'

import { useArticle } from '@/context/ArticleContext'
import { motion, AnimatePresence } from 'framer-motion'
import Image from '@/components/ui/Image'

export default function ArticleView() {
  const { state, closeArticle } = useArticle()
  const { isOpen, article } = state

  if (!article) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm"
          onClick={closeArticle}
        >
          <div className="min-h-screen px-4 py-8">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-4xl mx-auto bg-white dark:bg-neutral-800 rounded-xl overflow-hidden shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <div className="relative aspect-video">
                <Image
                  src={article.image}
                  alt={article.title}
                  priority
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8">
                <h1 className="text-4xl font-bold mb-4 text-neutral-900 dark:text-white">
                  {article.title}
                </h1>
                <div className="flex gap-4 mb-6 text-sm text-neutral-500 dark:text-neutral-400">
                  <span>{article.date}</span>
                  <span>{article.readTime} min read</span>
                </div>
                <div 
                  className="prose prose-lg dark:prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: article.content }}
                />
                <div className="mt-8 flex flex-wrap gap-2">
                  {article.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-sm bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <button
                onClick={closeArticle}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/10 hover:bg-black/20 dark:bg-white/10 dark:hover:bg-white/20 transition-colors"
                aria-label="Close article"
              >
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 