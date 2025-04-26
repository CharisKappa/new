'use client'

import { motion } from 'framer-motion'
import { useProjectTransition } from '@/context/ProjectTransitionContext'
import { useEffect, useRef } from 'react'

interface Project {
  title: string
  subtitle: string
  year: string
  role: string
  client: string
  overview: string
  challenge: string
  solution: string
  results: string
  images: {
    hero: string
    process: string[]
    final: string[]
  }
  technologies: string[]
}

interface ProjectArticleProps {
  project: Project
}

export default function ProjectArticle({ project }: ProjectArticleProps) {
  const { isTransitioning, transitionData } = useProjectTransition()
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.style.opacity = '0'
      setTimeout(() => {
        if (contentRef.current) {
          contentRef.current.style.opacity = '1'
        }
      }, 800)
    }
  }, [])

  return (
    <div className="relative w-full h-full">
      <motion.div
        className="absolute inset-0"
        initial={{
          opacity: 1,
          scale: 1.1
        }}
        animate={{
          opacity: 1,
          scale: 1,
          transition: {
            duration: 0.8,
            ease: [0.4, 0, 0.2, 1]
          }
        }}
      >
        <img
          src={project.images.hero}
          alt={project.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
      </motion.div>

      <div
        ref={contentRef}
        className="relative z-10 container mx-auto px-4 py-24 text-white transition-opacity duration-500"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4">{project.title}</h1>
          <h2 className="text-2xl md:text-3xl text-gray-300 mb-8">{project.subtitle}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div>
              <h3 className="text-xl font-semibold mb-4">Overview</h3>
              <p className="text-gray-300">{project.overview}</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Challenge</h3>
              <p className="text-gray-300">{project.challenge}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div>
              <h3 className="text-xl font-semibold mb-4">Solution</h3>
              <p className="text-gray-300">{project.solution}</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Results</h3>
              <p className="text-gray-300">{project.results}</p>
            </div>
          </div>

          <div className="mb-12">
            <h3 className="text-xl font-semibold mb-4">Technologies</h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-white/10 rounded-full text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Process</h3>
              <div className="grid grid-cols-2 gap-4">
                {project.images.process.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Process ${index + 1}`}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Final Result</h3>
              <div className="grid grid-cols-2 gap-4">
                {project.images.final.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Final ${index + 1}`}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
} 