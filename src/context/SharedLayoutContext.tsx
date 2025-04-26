'use client'

import { createContext, useContext, ReactNode } from 'react'

interface SharedLayoutContextType {
  handleProjectClick: (e: React.MouseEvent, href: string) => void
}

const SharedLayoutContext = createContext<SharedLayoutContextType | undefined>(undefined)

export function SharedLayoutProvider({ children }: { children: ReactNode }) {
  const handleProjectClick = (e: React.MouseEvent, href: string) => {
    // This will be implemented in the SharedLayout component
    console.log('Project clicked:', href)
  }

  return (
    <SharedLayoutContext.Provider value={{ handleProjectClick }}>
      {children}
    </SharedLayoutContext.Provider>
  )
}

export function useSharedLayout() {
  const context = useContext(SharedLayoutContext)
  if (context === undefined) {
    throw new Error('useSharedLayout must be used within a SharedLayoutProvider')
  }
  return context
} 