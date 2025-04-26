'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function About() {
  const aboutRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.from(aboutRef.current, {
      opacity: 0,
      y: 50,
      duration: 1,
      delay: 0.5
    })
  }, [])

  return (
    <div ref={aboutRef} id="about" className="max-w-4xl mx-auto px-4">
      <h2 className="text-4xl font-bold text-primary mb-8">About Me</h2>
      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <p className="text-secondary mb-6">
            I'm a passionate developer with a keen eye for design and user experience.
            My journey in web development started with a love for creating beautiful,
            functional interfaces that make a difference.
          </p>
          <p className="text-secondary mb-6">
            With expertise in modern web technologies and a focus on performance
            and accessibility, I strive to create digital experiences that are
            both visually stunning and technically robust.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {['React', 'Next.js', 'TypeScript', 'Three.js', 'GSAP', 'TailwindCSS'].map((skill) => (
              <span
                key={skill}
                className="px-4 py-2 bg-white/10 text-white rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 