'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function Studio() {
  const studioRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.from(studioRef.current, {
      opacity: 0,
      y: 50,
      duration: 1,
      delay: 0.5
    })
  }, [])

  return (
    <div ref={studioRef} className="max-w-7xl mx-auto px-4">
      <div className="text-center">
        <h2 className="text-4xl md:text-6xl font-bold text-primary mb-8">The Studio</h2>
        <p className="text-xl md:text-2xl text-secondary max-w-3xl mx-auto mb-12">
          Global digital design studio partnering with brands and businesses that create exceptional experiences where people live, work, and unwind.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="p-6 bg-primary/5 rounded-lg backdrop-blur-sm">
            <h3 className="text-xl font-bold text-primary mb-4">Design</h3>
            <p className="text-secondary">Crafting beautiful, functional interfaces that tell your brand's story.</p>
          </div>
          <div className="p-6 bg-primary/5 rounded-lg backdrop-blur-sm">
            <h3 className="text-xl font-bold text-primary mb-4">Development</h3>
            <p className="text-secondary">Building robust, scalable solutions with cutting-edge technology.</p>
          </div>
          <div className="p-6 bg-primary/5 rounded-lg backdrop-blur-sm">
            <h3 className="text-xl font-bold text-primary mb-4">Experience</h3>
            <p className="text-secondary">Creating memorable digital journeys that engage and inspire.</p>
          </div>
        </div>
      </div>
    </div>
  )
} 