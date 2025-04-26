'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const newsItems = [
  {
    id: '1',
    title: 'Awwwards Annual Nominee',
    description: 'Recognized for excellence in digital design and innovation',
    date: '2024'
  },
  {
    id: '2',
    title: 'Ottografie Site of the Year',
    description: 'Awarded for outstanding photography portfolio design',
    date: '2023'
  },
  {
    id: '3',
    title: 'FWA Awwward Aebele Interiors',
    description: 'Honored for exceptional interior design website',
    date: '2023'
  }
]

export default function News() {
  const newsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.from(newsRef.current, {
      opacity: 0,
      y: 50,
      duration: 1,
      delay: 0.5
    })
  }, [])

  return (
    <div ref={newsRef} className="max-w-7xl mx-auto px-4">
      <div className="text-center">
        <h2 className="text-4xl md:text-6xl font-bold text-primary mb-8">Recognition</h2>
        <p className="text-xl md:text-2xl text-secondary max-w-3xl mx-auto mb-12">
          My work has been recognized by leading design and technology platforms.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {newsItems.map((item) => (
            <div key={item.id} className="p-6 bg-white/5 rounded-lg backdrop-blur-sm">
              <span className="text-sm text-white/60 mb-2 block">{item.date}</span>
              <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
              <p className="text-secondary">{item.description}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <a href="#news" className="inline-block px-8 py-4 border border-white text-white rounded-full font-medium hover:bg-white/10 transition-colors">
            View All Achievements
          </a>
        </div>
      </div>
    </div>
  )
} 