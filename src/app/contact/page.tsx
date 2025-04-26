'use client'

import Contact from '@/components/Contact'
import { motion } from 'framer-motion'

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="w-full pt-16 md:pt-20 pb-32">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-24 px-4 pt-24"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-primary mb-8">Get in Touch</h1>
            <p className="text-xl text-secondary max-w-2xl mx-auto">
              Have a project in mind or want to discuss potential collaboration? I'd love to hear from you.
            </p>
          </motion.div>
          <Contact />
        </div>
      </div>
    </div>
  )
} 