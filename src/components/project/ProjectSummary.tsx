'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface Metric {
  label: string
  value: string
  highlight?: boolean
}

interface ProjectSummaryProps {
  role?: string
  timeline?: string
  team?: string
  tools?: string[]
  metrics?: Metric[]
  className?: string
}

export function ProjectSummary({
  role = '',
  timeline = '',
  team = '',
  tools = [],
  metrics = [],
  className
}: ProjectSummaryProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.8 }}
      className={cn("container mx-auto px-4 py-16", className)}
    >
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Basic Info */}
          <div className="space-y-6">
            {role && (
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Role</h3>
                <p className="text-lg">{role}</p>
              </div>
            )}
            {timeline && (
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Timeline</h3>
                <p className="text-lg">{timeline}</p>
              </div>
            )}
            {team && (
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Team</h3>
                <p className="text-lg">{team}</p>
              </div>
            )}
            {tools.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Tools</h3>
                <div className="flex flex-wrap gap-2">
                  {tools.map((tool) => (
                    <span 
                      key={tool}
                      className="px-3 py-1 bg-secondary/50 rounded-full text-sm"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Metrics */}
          {metrics.length > 0 && (
            <div className="space-y-6">
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Outcomes</h3>
              <div className="grid grid-cols-1 gap-4">
                {metrics.map((metric, index) => (
                  <div 
                    key={index}
                    className={cn(
                      "p-4 rounded-lg border",
                      metric.highlight && "bg-primary/5 border-primary"
                    )}
                  >
                    <p className="text-sm text-muted-foreground">{metric.label}</p>
                    <p className="text-xl font-semibold mt-1">{metric.value}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
} 