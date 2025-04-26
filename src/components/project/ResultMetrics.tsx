'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface Metric {
  label: string
  value: string
  change?: string
  type?: 'increase' | 'decrease'
}

interface ResultMetricsProps {
  title?: string
  metrics: Metric[]
  className?: string
}

export function ResultMetrics({ 
  title, 
  metrics, 
  className 
}: ResultMetricsProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
      className={cn("container mx-auto px-4 py-16", className)}
    >
      <div className="max-w-4xl mx-auto">
        {title && (
          <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center">
            {title}
          </h2>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="p-6 rounded-xl border bg-card"
            >
              <p className="text-sm text-muted-foreground mb-2">
                {metric.label}
              </p>
              <div className="flex items-baseline gap-2">
                <p className="text-3xl font-bold">
                  {metric.value}
                </p>
                {metric.change && (
                  <span className={cn(
                    "text-sm font-medium",
                    metric.type === 'increase' && "text-green-500",
                    metric.type === 'decrease' && "text-red-500"
                  )}>
                    {metric.change}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
} 