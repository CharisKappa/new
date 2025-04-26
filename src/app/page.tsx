'use client'

import { useProjectTransition } from '@/context/ProjectTransitionContext'
import { motion, AnimatePresence } from 'framer-motion'
import { Suspense } from 'react'
import Hero from '../components/Hero'
import Testimonials from '../components/Testimonials'
import OurStory from '../components/OurStory'
import LoadingScreen from '../components/LoadingScreen'

export default function Home() {
  const { isHomepageVisible, isTransitioning } = useProjectTransition()

  return (
    <AnimatePresence>
      {isHomepageVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: isTransitioning ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-0"
        >
          <Suspense fallback={<LoadingScreen />}>
            <div className="w-full">
              <div className="container mx-auto">
                <Hero />
                <Testimonials />
                <OurStory />
              </div>
            </div>
          </Suspense>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
