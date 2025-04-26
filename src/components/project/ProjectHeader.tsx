'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Badge } from '@/components/ui/Badge'
import { cn } from '@/lib/utils'

interface ProjectHeaderProps {
  title: string
  subtitle: string
  coverImage: string
  tags?: string[]
  isDuotone?: boolean
}

export function ProjectHeader({ 
  title, 
  subtitle, 
  coverImage, 
  tags = [], 
  isDuotone = false 
}: ProjectHeaderProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="relative w-full"
    >
      {/* Cover Image */}
      <div className="relative w-full h-[60vh] min-h-[500px]">
        <Image
          src={coverImage}
          alt={title}
          fill
          className={cn(
            "object-cover",
            isDuotone && "grayscale"
          )}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/0 to-background/80" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 -mt-32 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Tags */}
          {tags.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
              className="flex flex-wrap gap-2 mb-6"
            >
              {tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </motion.div>
          )}

          {/* Title */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            {title}
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
            className="text-xl md:text-2xl text-muted-foreground"
          >
            {subtitle}
          </motion.p>
        </div>
      </div>
    </motion.div>
  )
} 