'use client'

import { useEffect, useRef } from 'react'
import { useScene } from '@/context/SceneContext'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { useProjectTransition } from '@/context/ProjectTransitionContext'

interface ProjectSectionProps {
  title: string
  description: string
  sceneProps: {
    color: string
    distortion: number
    rotation: number
    position: [number, number, number]
  }
  index: number
}

export default function ProjectSection({ title, description, sceneProps, index }: ProjectSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const { updateScene } = useScene()
  const { startTransition } = useProjectTransition()

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      // Content fade-in animation
      gsap.from(contentRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top center+=100',
          toggleActions: 'play none none reverse'
        }
      })

      // Background color transition
      gsap.to(sectionRef.current, {
        backgroundColor: `rgba(${index * 30}, ${index * 20}, ${index * 40}, 0.1)`,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top center',
          end: 'bottom center',
          scrub: true
        }
      })
    })

    return () => ctx.revert()
  }, [index])

  const handleClick = () => {
    if (imageRef.current) {
      updateScene(sceneProps)
      startTransition(imageRef.current, {
        src: `/images/project-${index + 1}/hero.jpg`,
        alt: `project-${index + 1}`
      })
    }
  }

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div
        ref={contentRef}
        className="container mx-auto px-4 py-24 relative z-10"
      >
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-4">{title}</h2>
          <p className="text-xl md:text-2xl text-gray-300 mb-8">{description}</p>
          <div
            className="relative w-full h-64 md:h-96 cursor-pointer group"
            onClick={handleClick}
          >
            <img
              ref={imageRef}
              src={`/images/project-${index + 1}/hero.jpg`}
              alt={title}
              className="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
          </div>
        </div>
      </div>
    </section>
  )
} 