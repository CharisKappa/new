'use client'

import { ReactNode } from 'react'
import Header from '../Header'
import Footer from '../Footer'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300">
      <Header totalSections={5} />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  )
} 