'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface SharedLayoutProps {
  children: React.ReactNode
}

export default function SharedLayout({ children }: SharedLayoutProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [transitionImage, setTransitionImage] = useState<{
    src: string
    alt: string
    rect: DOMRect
  } | null>(null)

  const handleProjectClick = (e: React.MouseEvent, href: string) => {
    const target = e.currentTarget as HTMLElement
    const img = target.querySelector('img')
    
    if (img) {
      const rect = img.getBoundingClientRect()
      setTransitionImage({
        src: img.src,
        alt: img.alt,
        rect
      })

      // Start the transition
      setTimeout(() => {
        router.push(href)
      }, 100)
    }
  }

  return (
    <>
      <AnimatePresence mode="wait">
        {transitionImage && (
          <motion.div
            className="fixed inset-0 z-50 pointer-events-none"
            initial={{
              opacity: 1,
              x: transitionImage.rect.left,
              y: transitionImage.rect.top,
              width: transitionImage.rect.width,
              height: transitionImage.rect.height,
            }}
            animate={{
              x: 0,
              y: 0,
              width: '100%',
              height: '100%',
              transition: {
                duration: 0.5,
                ease: [0.4, 0, 0.2, 1]
              }
            }}
            exit={{
              opacity: 0,
              transition: {
                duration: 0.2
              }
            }}
          >
            <motion.img
              src={transitionImage.src}
              alt={transitionImage.alt}
              className="w-full h-full object-cover"
              initial={{ scale: 1 }}
              animate={{ scale: 1.1 }}
              transition={{ duration: 0.5 }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-0">
        {children}
      </div>
    </>
  )
} 