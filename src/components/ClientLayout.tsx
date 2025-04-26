'use client'

import { ReactNode } from 'react'
import { SceneProvider } from './SceneProvider'
import Header from './Header'
import Footer from './Footer'

interface ClientLayoutProps {
  children: ReactNode
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <SceneProvider>
      <div className="relative w-full min-h-screen">
        <Header totalSections={5} />
        {children}
        <Footer />
      </div>
    </SceneProvider>
  )
} 