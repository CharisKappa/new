'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger)

const careerMilestones = [
  {
    year: '2023',
    title: 'Senior Full Stack Developer',
    description: 'Led development of enterprise-level web applications, implementing modern architectures and mentoring junior developers.',
    highlight: true
  },
  {
    year: '2022',
    title: 'Full Stack Developer',
    description: 'Developed and deployed scalable web applications using Next.js, React, and Node.js.',
    highlight: true
  },
  {
    year: '2021',
    title: 'Frontend Developer',
    description: 'Specialized in creating responsive and interactive user interfaces with modern web technologies.',
    highlight: true
  },
  {
    year: '2020',
    title: 'Web Developer',
    description: 'Built and maintained client websites while learning advanced development practices.',
    highlight: false
  },
  {
    year: '2019',
    title: 'Junior Developer',
    description: 'Started professional journey in web development, focusing on frontend technologies.',
    highlight: false
  },
  {
    year: '2018',
    title: 'Computer Science Graduate',
    description: 'Graduated with honors, specializing in web technologies and software development.',
    highlight: false
  }
]

export default function Timeline() {
  const timelineRef = useRef<HTMLDivElement>(null)
  const itemsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      itemsRef.current.forEach((item) => {
        if (!item) return

        gsap.from(item, {
          opacity: 0,
          x: -30,
          duration: 0.8,
          scrollTrigger: {
            trigger: item,
            start: 'top bottom-=100',
            toggleActions: 'play none none reverse'
          }
        })
      })
    }, timelineRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={timelineRef} className="relative py-20 pl-4 md:pl-0">
      {/* Timeline line */}
      <div 
        className="absolute left-0 md:left-[200px] top-0 bottom-0 w-[2px]"
        style={{
          background: 'repeating-linear-gradient(to bottom, transparent, transparent 4px, var(--primary-color) 4px, var(--primary-color) 8px)'
        }}
      />

      <div className="space-y-16">
        {careerMilestones.map((milestone, index) => (
          <div
            key={index}
            ref={(el) => { itemsRef.current[index] = el }}
            className="relative"
          >
            {/* Year marker and line */}
            <div className="absolute left-[-5px] md:left-[195px] top-0 flex items-center">
              <div className={`relative w-3 h-3 ${milestone.highlight ? 'scale-125' : ''} transition-transform duration-300`}>
                <div className={`absolute w-full h-full rounded-full ${
                  milestone.highlight 
                    ? 'bg-primary ring-4 ring-primary/20' 
                    : 'bg-primary/40 ring-2 ring-primary/10'
                }`} />
              </div>
              <div className="h-[1px] w-8 bg-gradient-to-r from-primary/40 to-transparent ml-2" />
            </div>

            {/* Content */}
            <div className="ml-8 md:ml-[240px] max-w-2xl">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="relative group"
              >
                <div className={`absolute -left-[100px] top-0 font-mono text-sm transition-colors duration-300 ${
                  milestone.highlight ? 'text-primary' : 'text-black/60 dark:text-white/60 group-hover:text-primary/80'
                }`}>
                  {milestone.year}
                </div>
                <h3 className={`text-xl font-medium mb-2 transition-colors duration-300 ${
                  milestone.highlight ? 'text-black dark:text-white' : 'text-black/80 dark:text-white/80 group-hover:text-black dark:group-hover:text-white'
                }`}>
                  {milestone.title}
                </h3>
                <p className={`text-sm leading-relaxed transition-colors duration-300 ${
                  milestone.highlight ? 'text-black/80 dark:text-white/80' : 'text-black/60 dark:text-white/60 group-hover:text-black/80 dark:group-hover:text-white/80'
                }`}>
                  {milestone.description}
                </p>
              </motion.div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 