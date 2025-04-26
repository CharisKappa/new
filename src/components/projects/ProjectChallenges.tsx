import Image from 'next/image'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

interface ProjectChallengesProps {
  context: string
  contextImage?: string
}

export default function ProjectChallenges({
  context,
  contextImage
}: ProjectChallengesProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <section ref={ref} className="py-16">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <h2 className="text-4xl font-bold mb-12 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300">
            Challenges & Context
          </h2>
          
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p className="text-xl leading-relaxed text-gray-600 dark:text-gray-300">
              {context}
            </p>
          </div>

          {contextImage && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-12 relative aspect-video w-full overflow-hidden rounded-2xl shadow-2xl"
            >
              <Image
                src={contextImage}
                alt="Project context"
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  )
} 