'use client'

import { motion } from 'framer-motion'
import Timeline from '@/components/Timeline'

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <div className="w-full pt-16 md:pt-20 pb-32">
        <div className="container mx-auto">
          {/* Page Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-24 px-4 pt-24"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-black dark:text-white mb-8">My Journey</h1>
            <p className="text-xl text-black/80 dark:text-white/80 max-w-2xl mx-auto">
              A timeline of my career progression, showcasing my growth and development in the tech industry.
            </p>
          </motion.div>

          {/* Timeline */}
          <Timeline />
        </div>
      </div>
    </main>
  )
} 