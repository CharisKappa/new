'use client'

import { Project } from '@/types/project'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

interface ProjectCardProps {
  project: Project
  index: number
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.2
      }
    }
  }

  const imagePath = project.image || project.coverImage

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="visible"
      className="group cursor-pointer"
    >
      <Link href={`/work/${project.slug}`}>
        <div className="relative aspect-video w-full overflow-hidden rounded-lg mb-4">
          <Image
            src={imagePath}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/40 rounded-lg transition-opacity duration-300 group-hover:opacity-0" />
        </div>
        <h3 className="text-xl font-semibold mb-2 group-hover:text-primary">
          {project.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          {project.description}
        </p>
      </Link>
    </motion.div>
  )
} 