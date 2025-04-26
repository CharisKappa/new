'use client'

import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { createPortal } from 'react-dom'

interface ImageTransitionProps {
  src: string
  alt: string
  isOpen: boolean
  initialRect: DOMRect | null
  onClose: () => void
}

export default function ImageTransition({ src, alt, isOpen, initialRect, onClose }: ImageTransitionProps) {
  const portalRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    portalRef.current = document.getElementById('portal-root') || document.body
  }, [])

  if (!portalRef.current || !initialRect) return null

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-background"
          onClick={onClose}
        >
          <motion.img
            src={src}
            alt={alt}
            initial={{
              x: initialRect.x,
              y: initialRect.y,
              width: initialRect.width,
              height: initialRect.height,
            }}
            animate={{
              x: 0,
              y: 0,
              width: '100%',
              height: '100vh',
            }}
            transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
            className="object-cover"
          />
        </motion.div>
      )}
    </AnimatePresence>,
    portalRef.current
  )
} 