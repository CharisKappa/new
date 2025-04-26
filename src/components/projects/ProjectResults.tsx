import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

interface Metric {
  label: string
  value: string
  change?: string
  type?: 'increase' | 'decrease'
}

interface ProjectResultsProps {
  results: string
  resultMetrics?: Metric[]
}

export default function ProjectResults({
  results,
  resultMetrics = []
}: ProjectResultsProps) {
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
            Results & Impact
          </h2>
          
          <div className="prose prose-lg max-w-none dark:prose-invert mb-12">
            <p className="text-xl leading-relaxed text-gray-600 dark:text-gray-300">
              {results}
            </p>
          </div>

          {resultMetrics.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {resultMetrics.map((metric, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  className="p-8 rounded-2xl bg-white dark:bg-gray-800 shadow-xl hover:shadow-2xl transition-shadow duration-300"
                >
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">
                    {metric.label}
                  </p>
                  <div className="flex items-baseline gap-3">
                    <p className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300">
                      {metric.value}
                    </p>
                    {metric.change && (
                      <span className={`text-sm font-medium px-3 py-1 rounded-full ${
                        metric.type === 'increase' 
                          ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
                          : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                      }`}>
                        {metric.change}
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  )
} 