'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

interface MediaItem {
  id: string
  title: string
  platform: string
  date: string
  link: string
}

const mediaItems: MediaItem[] = [
  {
    id: '1',
    title: 'Awwwards Annual Nominee',
    platform: 'Awwwards',
    date: '2024',
    link: '#'
  },
  {
    id: '2',
    title: 'Ottografie Site of the Year',
    platform: 'FWA',
    date: '2023',
    link: '#'
  },
  {
    id: '3',
    title: 'FWA Awwward Aebele Interiors',
    platform: 'CSS Design Awards',
    date: '2023',
    link: '#'
  }
]

export default function InTheMedia() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const container = containerRef.current
    if (!container) return

    const items = gsap.utils.toArray('.media-item') as HTMLElement[]

    items.forEach((item, index) => {
      gsap.from(item, {
        opacity: 0,
        x: -50,
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

  return (
    <section className="py-32">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-primary mb-4">Spread the News</h2>
        <p className="text-xl text-secondary max-w-2xl mx-auto">
          Find out more about our work on these leading design and technology platforms.
        </p>
      </div>
      <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {mediaItems.map((item) => (
          <div key={item.id} className="group">
            <a href={item.link} className="block p-6 bg-muted hover:bg-muted/80 rounded-lg transition-colors">
              <span className="text-sm text-muted-foreground mb-2 block">{item.platform}</span>
              <h3 className="text-xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                {item.title}
              </h3>
              <span className="text-sm text-muted-foreground">{item.date}</span>
            </a>
          </div>
        ))}
      </div>
      <div className="text-center mt-12">
        <Button asChild variant="outline" size="lg">
          <Link href="#all-news">Browse all news</Link>
        </Button>
      </div>
    </section>
  )
} 