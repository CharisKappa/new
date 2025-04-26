'use client'

import { createContext, useContext, ReactNode, useState, useCallback } from 'react'

interface TransitionImage {
  src: string
  alt: string
}

interface TransitionData {
  rect: DOMRect
  image: TransitionImage
}

interface TransitionState {
  isTransitioning: boolean
  isHomepageVisible: boolean
  transitionData: TransitionData | null
  previousPath: string | null
}

interface ProjectTransitionContextType extends TransitionState {
  startTransition: (element: HTMLElement, image: TransitionImage) => void
  endTransition: () => void
  setPreviousPath: (path: string) => void
}

const ProjectTransitionContext = createContext<ProjectTransitionContextType>({
  isTransitioning: false,
  isHomepageVisible: true,
  transitionData: null,
  previousPath: null,
  startTransition: () => {},
  endTransition: () => {},
  setPreviousPath: () => {}
})

export function ProjectTransitionProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<TransitionState>({
    isTransitioning: false,
    isHomepageVisible: true,
    transitionData: null,
    previousPath: null
  })

  const startTransition = useCallback((element: HTMLElement, image: TransitionImage) => {
    const rect = element.getBoundingClientRect()
    setState(prev => ({
      ...prev,
      isTransitioning: true,
      isHomepageVisible: false,
      transitionData: { rect, image }
    }))
  }, [])

  const endTransition = useCallback(() => {
    setState(prev => ({
      ...prev,
      isTransitioning: false,
      isHomepageVisible: true,
      transitionData: null
    }))
  }, [])

  const setPreviousPath = useCallback((path: string) => {
    setState(prev => ({
      ...prev,
      previousPath: path
    }))
  }, [])

  return (
    <ProjectTransitionContext.Provider
      value={{
        ...state,
        startTransition,
        endTransition,
        setPreviousPath
      }}
    >
      {children}
    </ProjectTransitionContext.Provider>
  )
}

export function useProjectTransition() {
  const context = useContext(ProjectTransitionContext)
  if (!context) {
    throw new Error('useProjectTransition must be used within a ProjectTransitionProvider')
  }
  return context
} 