import Image from 'next/image'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

interface ProcessImage {
  src: string
  alt: string
  type: 'full' | 'side' | 'grid'
  caption?: string
}

interface ProjectProcessProps {
  process: string
  processImages?: ProcessImage[]
}

export default function ProjectProcess({
  process,
  processImages = []
}: ProjectProcessProps) {
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
            Process & Methodology
          </h2>
          
          <div className="prose prose-lg max-w-none dark:prose-invert mb-12">
            <p className="text-xl leading-relaxed text-gray-600 dark:text-gray-300">
              {process}
            </p>
          </div>

          {processImages.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-12"
            >
              {processImages.map((image, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  className={`relative overflow-hidden rounded-2xl shadow-2xl ${
                    image.type === 'full' ? 'aspect-video w-full' :
                    image.type === 'side' ? 'aspect-square w-1/2' :
                    'aspect-square w-full'
                  }`}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  {image.caption && (
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <p className="text-white text-lg font-medium">{image.caption}</p>
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  )
}

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
} 