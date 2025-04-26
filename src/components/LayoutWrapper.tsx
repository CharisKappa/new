'use client'

import { usePathname } from 'next/navigation'
import LoadingScreen from './LoadingScreen'
import Header from './Header'
import Footer from './Footer'
import BackButton from './BackButton'
import { useEffect, useState } from 'react'

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [isLoading, setIsLoading] = useState(true)
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    const hasVisited = document.cookie.includes('hasVisited')
    if (!hasVisited) {
      document.cookie = 'hasVisited=true; path=/; max-age=31536000' // 1 year
      setIsLoading(true)
      // Show loading screen for 2 seconds
      const timer = setTimeout(() => {
        setIsLoading(false)
        setShowContent(true)
      }, 2000)
      return () => clearTimeout(timer)
    } else {
      setIsLoading(false)
      setShowContent(true)
    }
  }, [])

  return (
    <>
      {isLoading && <LoadingScreen />}
      <div className={`relative flex min-h-screen flex-col bg-transparent ${isLoading ? 'hidden' : ''}`}>
        <Header totalSections={4} />
        <BackButton />
        <main className="flex-1 bg-transparent">{children}</main>
        <Footer />
      </div>
    </>
  )
} 