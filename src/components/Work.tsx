'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'

const projects = [
  {
    id: '1',
    title: 'Ottografie',
    description: 'Seamless Photographic Journey',
    image: '/images/projects/ottografie.jpg',
    category: 'Photography'
  },
  {
    id: '2',
    title: 'Amaterasu',
    description: 'Frontier Health Innovation',
    image: '/images/projects/amaterasu.jpg',
    category: 'Health'
  },
  {
    id: '3',
    title: 'Columbia Pictures',
    description: 'Celebrating a Century of Cinema',
    image: '/images/projects/columbia.jpg',
    category: 'Entertainment'
  },
  {
    id: '4',
    title: 'Cambium',
    description: 'Pioneering Sustainable Solutions',
    image: '/images/projects/cambium.jpg',
    category: 'Sustainability'
  }
]

export default function Work() {
  const workRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.from(workRef.current, {
      opacity: 0,
      y: 50,
      duration: 1,
      delay: 0.5
    })
  }, [])

  return (
    <div ref={workRef} className="max-w-7xl mx-auto px-4">
      <h2 className="text-4xl md:text-6xl font-bold text-primary mb-12 text-center">Featured Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project) => (
          <div key={project.id} className="group relative aspect-[4/3] overflow-hidden rounded-lg">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <span className="text-sm text-primary/80 mb-2 block">{project.category}</span>
                <h3 className="text-2xl font-bold text-primary mb-2">{project.title}</h3>
                <p className="text-primary/80">{project.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-12">
        <a href="#work" className="inline-block px-8 py-4 border border-primary text-primary rounded-full font-medium hover:bg-primary/10 transition-colors">
          Browse all work
        </a>
      </div>
    </div>
  )
} 