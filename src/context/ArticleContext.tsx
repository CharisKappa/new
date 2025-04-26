'use client'

import { createContext, useContext, useState, useCallback } from 'react'
import { Article } from '@/types/article'

interface ArticleState {
  isOpen: boolean
  article: Article | null
}

interface ArticleContextType {
  state: ArticleState
  openArticle: (article: Article) => void
  closeArticle: () => void
}

const ArticleContext = createContext<ArticleContextType | undefined>(undefined)

export function ArticleProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<ArticleState>({
    isOpen: false,
    article: null
  })

  const openArticle = useCallback((article: Article) => {
    setState({
      isOpen: true,
      article
    })
  }, [])

  const closeArticle = useCallback(() => {
    setState({
      isOpen: false,
      article: null
    })
  }, [])

  return (
    <ArticleContext.Provider value={{ state, openArticle, closeArticle }}>
      {children}
    </ArticleContext.Provider>
  )
}

export function useArticle() {
  const context = useContext(ArticleContext)
  if (context === undefined) {
    throw new Error('useArticle must be used within an ArticleProvider')
  }
  return context
} 