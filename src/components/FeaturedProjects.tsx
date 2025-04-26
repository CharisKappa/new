'use client'

import Image from 'next/image'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import ProjectTransition from './ProjectTransition'
import Link from 'next/link'
import { useProjectTransition } from '@/context/ProjectTransitionContext'
import { useScene } from '@/context/SceneContext'
import { projects } from '@/data/projects'
import { Project } from '@/types/project'

interface ContentSection {
  type: 'text' | 'image'
  content?: string
  src?: string
  caption?: string
}

export default function FeaturedProjects() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const transitionRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const router = useRouter()
  const { startTransition } = useProjectTransition()
  const { updateScene } = useScene()

  // Split projects into left and right columns
  const leftProjects = projects.filter((_, i) => i % 2 === 0)
  const rightProjects = projects.filter((_, i) => i % 2 === 1)

  const projectRefs = useRef<(HTMLDivElement | null)[]>([])
  const yOffsets = useRef<number[]>([])

  useEffect(() => {
    const projects = projectRefs.current.filter(Boolean) as HTMLDivElement[]
    const totalProjects = projects.length

    if (totalProjects === 0) return

    const leftColumnCount = Math.ceil(totalProjects / 2)
    const rightColumnCount = totalProjects - leftColumnCount

    // Initialize yOffsets
    yOffsets.current = Array(totalProjects).fill(0)

    // Update yOffsets based on scroll position
    const updateYOffsets = () => {
      const scrollY = window.scrollY
      const windowHeight = window.innerHeight

      projects.forEach((project, index) => {
        const rect = project.getBoundingClientRect()
        const isLeftColumn = index < leftColumnCount
        const progress = Math.max(0, Math.min(1, (rect.top + rect.height) / (windowHeight + rect.height)))
        
        if (isLeftColumn) {
          yOffsets.current[index] = progress * 20
        } else {
          yOffsets.current[index] = progress * 30
        }
      })

      // Apply transforms
      projects.forEach((project, index) => {
        project.style.transform = `translateY(${-yOffsets.current[index]}px)`
      })
    }

    window.addEventListener('scroll', updateYOffsets)
    updateYOffsets()

    return () => window.removeEventListener('scroll', updateYOffsets)
  }, [])

  const handleProjectClick = (project: Project, imageRef: HTMLImageElement) => {
    if (project.sceneProps) {
      updateScene(project.sceneProps)
    }
    startTransition(imageRef, {
      src: project.image || project.coverImage,
      alt: project.title.toLowerCase().replace(/\s+/g, '-')
    })
  }

  const handleCloseProject = () => {
    setIsTransitioning(true)
    if (transitionRef.current) {
      const element = transitionRef.current
      const rect = element.getBoundingClientRect()
      
      // Find the original project element
      const projectElement = document.querySelector(`[data-project-id="${selectedProject?.id}"]`)
      const originalRect = projectElement?.getBoundingClientRect()
      
      if (originalRect) {
        element.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
        element.style.left = `${originalRect.left}px`
        element.style.top = `${originalRect.top}px`
        element.style.width = `${originalRect.width}px`
        element.style.height = `${originalRect.height}px`
        element.style.borderRadius = '0.5rem'
        
        setTimeout(() => {
          setSelectedProject(null)
          setIsTransitioning(false)
        }, 500)
      } else {
        // Fallback if original element not found
        element.style.opacity = '0'
        setTimeout(() => {
          setSelectedProject(null)
          setIsTransitioning(false)
        }, 500)
      }
    }
  }

  const renderProject = (project: Project, index: number) => (
    <motion.div
      key={project.id}
      ref={(el) => {
        if (el) projectRefs.current[index] = el;
      }}
      className={`project-item relative cursor-pointer group ${project.size === 'large' ? 'col-span-2' : ''}`}
      onClick={(e) => {
        const img = e.currentTarget.querySelector('img')
        if (img) handleProjectClick(project, img)
      }}
    >
      <Link href={`/work/${project.slug}`} className="block w-full h-full">
        <div className="relative w-full" style={{ aspectRatio: project.aspect || '16/9' }}>
          <Image
            src={project.image || project.coverImage}
            alt={project.title}
            fill
            className="object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/40 rounded-lg transition-opacity duration-300 group-hover:opacity-0" />
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
            <p className="text-lg">{project.description}</p>
            {project.category && (
              <span className="inline-block mt-2 px-3 py-1 bg-white/20 rounded-full text-sm">
                {project.category}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  )

  return (
    <section className="py-32 relative overflow-hidden surface" ref={containerRef}>
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto mb-32">
          <blockquote className="text-3xl md:text-4xl font-light text-tertiary italic">
            "From crafting pixels to leading teams, every design decision shapes the future of human experience."
          </blockquote>
          <p className="text-right text-secondary mt-4">— Charis Kanellakopoulos</p>
        </div>
        
        <AnimatePresence>
          {selectedProject ? (
            <motion.div
              ref={transitionRef}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[9999] bg-white dark:bg-gray-900"
              style={{ 
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                zIndex: 9999
              }}
            >
              <img 
                ref={imageRef} 
                className="transition-all duration-500" 
                alt="Transition image"
              />
              <div className="absolute inset-0 overflow-y-auto">
                {/* Hero Section */}
                <div className="relative w-full h-[100vh]">
                  <Image
                    src={selectedProject.image || selectedProject.coverImage}
                    alt={selectedProject.title}
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-black/30" />
                  <motion.div 
                    className="absolute inset-0 flex items-center justify-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                  >
                    <div className="text-center">
                      <motion.span 
                        className="text-white/80 text-sm uppercase tracking-widest mb-4 block"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.5 }}
                      >
                        {selectedProject.category}
                      </motion.span>
                      <motion.h1 
                        className="text-6xl md:text-8xl font-bold text-white mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7, duration: 0.5 }}
                      >
                        {selectedProject.title}
                      </motion.h1>
                      <motion.p 
                        className="text-xl text-white/80 max-w-2xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 0.5 }}
                      >
                        {selectedProject.description}
                      </motion.p>
                    </div>
                  </motion.div>
                </div>

                {/* Content Section */}
                <div className="max-w-4xl mx-auto px-4 py-24 bg-white dark:bg-gray-900">
                  {selectedProject.content?.map((section: ContentSection, index: number) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.9 + index * 0.1, duration: 0.5 }}
                      className="mb-16"
                    >
                      {section.type === 'text' && (
                        <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                          {section.content}
                        </p>
                      )}
                      {section.type === 'image' && (
                        <motion.div 
                          className="my-8"
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 1 + index * 0.1, duration: 0.5 }}
                        >
                          <Image
                            src={section.src || ''}
                            alt={section.caption || ''}
                            width={1200}
                            height={800}
                            className="w-full rounded-lg"
                          />
                          {section.caption && (
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 text-center">
                              {section.caption}
                            </p>
                          )}
                        </motion.div>
                      )}
                    </motion.div>
                  ))}
                </div>

                {/* Close Button */}
                <motion.div 
                  className="fixed bottom-4 right-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.5, duration: 0.5 }}
                >
                  <button 
                    onClick={handleCloseProject}
                    className="px-6 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    Back to Projects
                  </button>
                </motion.div>
              </div>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-8">
                {leftProjects.map((project, index) => renderProject(project, index * 2))}
              </div>

              {/* Right Column */}
              <div className="space-y-8 md:mt-32">
                {rightProjects.map((project, index) => renderProject(project, index * 2 + 1))}
              </div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
} 