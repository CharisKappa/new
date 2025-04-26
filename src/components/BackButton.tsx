'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'

export default function BackButton() {
  const pathname = usePathname()
  const isProjectPage = pathname.startsWith('/projects/')

  if (!isProjectPage) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className=""
    >
      <div className="container mx-auto px-4 py-4">
        <Link 
          href="/"
          className="inline-flex items-center gap-2 text-foreground/80 hover:text-foreground transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm font-medium">Back to Home</span>
        </Link>
      </div>
    </motion.div>
  )
} 