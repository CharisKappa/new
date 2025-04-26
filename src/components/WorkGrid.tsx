'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

interface Project {
  id: string
  title: string
  description: string
  image: string
  tags: string[]
}

interface WorkGridProps {
  projects: Project[]
}

export default function WorkGrid({ projects }: WorkGridProps) {
  const gridRef = useRef<HTMLDivElement>(null)
  const [imageErrors, setImageErrors] = useState<{[key: string]: boolean}>({})

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const grid = gridRef.current
    if (!grid) return

    const items = gsap.utils.toArray('.grid-item') as HTMLElement[]

    items.forEach((item, index) => {
      gsap.from(item, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        delay: index * 0.1,
        scrollTrigger: {
          trigger: item,
          start: 'top bottom-=100',
          toggleActions: 'play none none reverse'
        }
      })
    })
  }, [])

  const handleImageError = (projectId: string) => {
    setImageErrors(prev => ({...prev, [projectId]: true}))
    console.error(`Failed to load image for project ${projectId}`)
  }

  return (
    <div className="max-w-7xl mx-auto px-4">
      <h2 className="text-4xl font-bold text-white mb-12 text-center">Featured Work</h2>
      <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <div key={project.id} className="grid-item group">
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-gray-800">
              {!imageErrors[project.id] && (
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={() => handleImageError(project.id)}
                  priority
                />
              )}
              <div className={`absolute inset-0 ${!imageErrors[project.id] ? 'bg-gradient-to-t from-black/60 to-transparent' : 'bg-gray-700'} opacity-100 group-hover:opacity-100 transition-opacity duration-300`}>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 bg-white/10 text-white text-sm rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-2xl font-bold text-primary mb-2">{project.title}</h3>
                  <p className="text-secondary">{project.description}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 