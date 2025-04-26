import Image from 'next/image'
import { Tag } from '@/components/ui/Tag'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

interface ProjectDetailsProps {
  title: string
  description: string
  coverImage: string
  tags: string[]
  isDuotone?: boolean
  role: string
  timeline: string
  team: string
  tools: string[]
}

export default function ProjectDetails({
  title,
  description,
  coverImage,
  tags,
  isDuotone = false,
  role,
  timeline,
  team,
  tools,
}: ProjectDetailsProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <div ref={ref} className="space-y-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="relative aspect-video w-full overflow-hidden rounded-2xl shadow-2xl"
      >
        <Image
          src={coverImage}
          alt={title}
          fill
          className={`object-cover transition-all duration-700 hover:scale-105 ${
            isDuotone ? 'grayscale hover:grayscale-0' : ''
          }`}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="space-y-6"
      >
        <h1 className="text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300">
          {title}
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl">
          {description}
        </p>
        
        <div className="flex flex-wrap gap-3">
          {tags.map((tag) => (
            <Tag key={tag} className="bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
              {tag}
            </Tag>
          ))}
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 bg-gray-50 dark:bg-gray-900 p-8 rounded-2xl"
      >
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Role</h3>
          <p className="text-lg font-medium">{role}</p>
        </div>
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Timeline</h3>
          <p className="text-lg font-medium">{timeline}</p>
        </div>
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Team</h3>
          <p className="text-lg font-medium">{team}</p>
        </div>
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Tools</h3>
          <div className="flex flex-wrap gap-2">
            {tools.map((tool) => (
              <span key={tool} className="px-3 py-1 bg-gray-200 dark:bg-gray-800 rounded-full text-sm">
                {tool}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
} 