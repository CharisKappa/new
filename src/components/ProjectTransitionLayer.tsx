'use client'

import { useEffect, useRef } from 'react'
import { useProjectTransition } from '@/context/ProjectTransitionContext'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'

export default function ProjectTransitionLayer() {
  const { isTransitioning, transitionData, startTransition, endTransition } = useProjectTransition()
  const router = useRouter()
  const transitionRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (isTransitioning && transitionRef.current && imageRef.current) {
      const element = transitionRef.current
      const image = imageRef.current
      const rect = transitionData?.rect

      if (rect) {
        // Set initial styles
        element.style.position = 'fixed'
        element.style.left = `${rect.left}px`
        element.style.top = `${rect.top}px`
        element.style.width = `${rect.width}px`
        element.style.height = `${rect.height}px`
        element.style.zIndex = '100'
        element.style.overflow = 'hidden'
        element.style.borderRadius = '0.5rem'
        element.style.backgroundColor = 'transparent'
        element.style.willChange = 'transform, opacity'

        // Set up the image
        image.src = transitionData?.image.src || ''
        image.alt = transitionData?.image.alt || ''
        image.style.position = 'absolute'
        image.style.top = '0'
        image.style.left = '0'
        image.style.width = '100%'
        image.style.height = '100%'
        image.style.objectFit = 'cover'
        image.style.transition = 'all 1s cubic-bezier(0.4, 0, 0.2, 1)'

        // Trigger the animation
        requestAnimationFrame(() => {
          element.style.transition = 'all 1s cubic-bezier(0.4, 0, 0.2, 1)'
          element.style.left = '0'
          element.style.top = '0'
          element.style.width = '100vw'
          element.style.height = '100vh'
          element.style.borderRadius = '0'

          // After the transition completes
          setTimeout(() => {
            router.push(`/projects/${transitionData?.image.alt}`)
          }, 1000)
        })
      }
    }
  }, [isTransitioning, transitionData, router])

  return (
    <AnimatePresence>
      {isTransitioning && (
        <motion.div
          ref={transitionRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
          className="fixed inset-0 z-[100] bg-background"
        >
          <img
            ref={imageRef}
            className="w-full h-full object-cover"
            alt=""
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
} 