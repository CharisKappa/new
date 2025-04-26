'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface ProjectSectionProps {
  title?: string
  children: React.ReactNode
  className?: string
}

interface ImageBlockProps {
  src: string
  alt: string
  caption?: string
  type?: 'full' | 'side' | 'grid'
  className?: string
}

interface QuoteCardProps {
  quote: string
  author: string
  role?: string
  className?: string
}

export function ProjectSection({ 
  title, 
  children, 
  className 
}: ProjectSectionProps) {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
      className={cn("container mx-auto px-4 py-16", className)}
    >
      <div className="max-w-4xl mx-auto">
        {title && (
          <h2 className="text-2xl md:text-3xl font-bold mb-8">{title}</h2>
        )}
        {children}
      </div>
    </motion.section>
  )
}

export function ImageBlock({ 
  src, 
  alt, 
  caption, 
  type = 'full',
  className 
}: ImageBlockProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
      className={cn(
        "my-8",
        type === 'side' && "md:flex md:gap-8 items-center",
        className
      )}
    >
      <div className={cn(
        "relative rounded-xl overflow-hidden shadow-xl",
        type === 'full' && "aspect-video",
        type === 'side' && "md:w-1/2 aspect-square",
        type === 'grid' && "aspect-square"
      )}>
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
        />
      </div>
      {caption && (
        <p className={cn(
          "text-sm text-muted-foreground mt-4",
          type === 'side' && "md:w-1/2"
        )}>
          {caption}
        </p>
      )}
    </motion.div>
  )
}

export function QuoteCard({ 
  quote, 
  author, 
  role,
  className 
}: QuoteCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
      className={cn(
        "p-8 rounded-xl border bg-card",
        className
      )}
    >
      <blockquote className="text-xl italic mb-4">"{quote}"</blockquote>
      <div>
        <p className="font-semibold">{author}</p>
        {role && <p className="text-sm text-muted-foreground">{role}</p>}
      </div>
    </motion.div>
  )
} 