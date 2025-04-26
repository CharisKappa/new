'use client'

import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useProjectTransition } from '@/context/ProjectTransitionContext'
import { motion } from 'framer-motion'

interface ProjectTileProps {
  title: string
  description: string
  image: string
  slug: string
  className?: string
}

export default function ProjectTile({ 
  title, 
  description, 
  image, 
  slug,
  className = ''
}: ProjectTileProps) {
  const router = useRouter()
  const { startTransition, setPreviousPath } = useProjectTransition()

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    const img = e.currentTarget.querySelector('img')
    if (img) {
      setPreviousPath(window.location.pathname)
      startTransition(img, { src: image, alt: title })
      setTimeout(() => {
        router.push(`/projects/${slug}`)
      }, 100)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className={`group relative overflow-hidden rounded-lg ${className}`}
    >
      <a
        href={`/projects/${slug}`}
        onClick={handleClick}
        className="block relative aspect-[4/3]"
      >
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
            <p className="text-white/80 text-sm">{description}</p>
          </div>
        </div>
      </a>
    </motion.div>
  )
} 