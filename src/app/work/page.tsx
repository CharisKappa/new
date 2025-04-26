'use client'

import { useRef } from 'react'
import { projects } from '@/data/projects'
import { useProjectModal } from '@/context/ProjectModalContext'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'

export default function WorkPage() {
  const { openModal } = useProjectModal()
  const router = useRouter()
  const imageRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})

  const handleProjectClick = (project: typeof projects[0]) => {
    const imageRect = imageRefs.current[project.slug]?.getBoundingClientRect()
    if (imageRect) {
      // Open modal for smooth transition
      openModal(project, imageRect)
      // Update URL after a short delay to allow modal animation
      setTimeout(() => {
        router.push(`/work/${project.slug}`)
      }, 300)
    }
  }

  return (
    <main className="min-h-screen">
      <div className="w-full pt-16 md:pt-20 pb-32">
        <div className="container mx-auto">
          {/* Page Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-24 px-4 pt-24"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-black dark:text-white mb-8">My Work</h1>
            <p className="text-xl text-black/80 dark:text-white/80 max-w-2xl mx-auto">
              A collection of my projects, showcasing my skills and experience in web development and design.
            </p>
          </motion.div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
            {projects.map((project) => (
              <div 
                key={project.slug}
                ref={(el) => { imageRefs.current[project.slug] = el }}
                onClick={() => handleProjectClick(project)}
                className="group block cursor-pointer"
              >
                <div className="relative aspect-video w-full overflow-hidden rounded-lg mb-4">
                  <Image
                    src={project.coverImage}
                    alt={project.title}
                    fill
                    className={`object-cover transition-transform group-hover:scale-105 ${
                      project.isDuotone ? 'grayscale' : ''
                    }`}
                  />
                </div>
                <h2 className="text-xl font-semibold mb-2 group-hover:text-primary">
                  {project.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span 
                      key={tag}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
} 