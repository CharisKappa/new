'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/Button'
import ThemeToggle from '@/components/ThemeToggle'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

interface HeaderProps {
  totalSections: number
}

export default function Header({ totalSections }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const menuItems = [
    { name: 'Work', href: '/work' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' }
  ]

  return (
    <header 
      ref={headerRef}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-background/80 backdrop-blur-md',
        isScrolled && 'bg-background/90'
      )}
    >
      <div className="container flex items-center justify-between h-16 md:h-20">
        <Link 
          href="/" 
          className="flex items-center gap-3 text-xl font-medium text-foreground hover:text-primary/80 transition-colors"
        >
          <span className="w-3 h-3 rounded-full bg-foreground"></span>
          Charis Kanellakopoulos
        </Link>

        <div className="flex items-center gap-8">
          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center space-x-6">
            {menuItems.map((item) => (
              <Link 
                key={item.href}
                href={item.href} 
                className="text-sm font-medium text-foreground hover:text-primary/80 transition-colors"
              >
                {item.name}
              </Link>
            ))}
            <ThemeToggle />
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden relative z-50"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span className={cn(
                'block w-full h-0.5 bg-foreground transition-all duration-300',
                isMenuOpen && 'rotate-45 translate-y-2'
              )} />
              <span className={cn(
                'block w-full h-0.5 bg-foreground transition-all duration-300',
                isMenuOpen && 'opacity-0'
              )} />
              <span className={cn(
                'block w-full h-0.5 bg-foreground transition-all duration-300',
                isMenuOpen && '-rotate-45 -translate-y-2'
              )} />
            </div>
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 bg-background md:hidden"
            />
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-50 md:hidden overflow-y-auto"
            >
              <nav className="container flex flex-col justify-center min-h-screen">
                <div className="space-y-8">
                  {menuItems.map((item, index) => (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <Link 
                        href={item.href} 
                        className="group block text-4xl md:text-5xl font-bold text-foreground hover:text-primary/80 transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <span className="relative inline-block">
                          {item.name}
                          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                        </span>
                      </Link>
                    </motion.div>
                  ))}
                </div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: menuItems.length * 0.1 }}
                  className="mt-16"
                >
                  <ThemeToggle />
                </motion.div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  )
} 