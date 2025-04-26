'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/Button'

export default function Hero() {
  const textRef = useRef<HTMLDivElement>(null)
  const avatarRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme } = useTheme()
  const animationRef = useRef<gsap.Context | null>(null)

  useEffect(() => {
    console.log('Hero mounted')
    setMounted(true)
    return () => {
      console.log('Hero unmounted')
      setMounted(false)
    }
  }, [])

  useEffect(() => {
    if (!mounted) return

    console.log('Setting up Hero animations')
    animationRef.current = gsap.context(() => {
      gsap.registerPlugin(ScrollTrigger)

      // Initial loading animation
      const tl = gsap.timeline({
        defaults: {
          ease: "power3.out",
          duration: 1
        }
      })

      // Set initial states
      gsap.set(['.hero-image', '.title-word', '.hero-paragraph', '.hero-buttons'], {
        willChange: 'transform, opacity'
      })

      // Set initial states
      gsap.set('.hero-image', { 
        clipPath: 'polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)',
        opacity: 0
      })

      gsap.set('.title-word', { 
        y: 100,
        opacity: 0,
        rotateX: -15
      })

      gsap.set('.hero-paragraph', {
        y: 40,
        opacity: 0
      })

      gsap.set('.hero-buttons', {
        y: 20,
        opacity: 0
      })

      // Smooth reveal animation sequence
      tl.to('.hero-image', {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        opacity: 1,
        duration: 1.2,
        ease: 'power2.inOut'
      })

      // Animate title words with a more natural stagger
      tl.to('.title-word', {
        y: 0,
        rotateX: 0,
        opacity: 1,
        duration: 1.4,
        stagger: {
          each: 0.1,
          ease: "power2.out"
        }
      }, '-=0.8')

      // Fade in paragraph with a slight delay
      tl.to('.hero-paragraph', {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power2.out"
      }, '-=1')

      // Fade in buttons
      tl.to('.hero-buttons', {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out"
      }, '-=0.9')

      // Cleanup will-change after animation
      tl.add(() => {
        gsap.set(['.hero-image', '.title-word', '.hero-paragraph', '.hero-buttons'], {
          willChange: 'auto'
        })
      })
    })

    return () => {
      console.log('Cleaning up Hero animations')
      animationRef.current?.revert()
    }
  }, [mounted])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!textRef.current) return

    const { clientX, clientY } = e
    const { left, top, width, height } = textRef.current.getBoundingClientRect()
    const x = (clientX - left) / width
    const y = (clientY - top) / height

    gsap.to('.title-word', {
      x: (x - 0.5) * 8,
      y: (y - 0.5) * 8,
      duration: 1.5,
      ease: 'power3.out'
    })
  }

  if (!mounted) {
    return null
  }

  return (
    <motion.div 
      ref={sectionRef} 
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-transparent" 
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero Image */}
      <div ref={avatarRef} className="absolute right-0 top-1/2 -translate-y-1/2 w-full md:w-1/2 h-[60%] md:h-[80%] overflow-hidden hero-image">
        <div className="relative w-full h-full">
          <Image
            src={resolvedTheme === 'dark' ? "/images/profile_pic/06.png" : "/images/profile_pic/01.png"}
            alt="Hero Image"
            fill
            className="object-cover object-center"
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            key={resolvedTheme}
          />
        </div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 hero-content">
        <div ref={textRef} className="space-y-2 md:space-y-4 perspective-1000">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold text-foreground">
            <span className="title-word block cursor-pointer">Craft</span>
            <span className="title-word block cursor-pointer">Structure</span>
            <span className="title-word block cursor-pointer">Impact</span>
          </h1>
          <p className="hero-paragraph text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-2xl mx-auto my-8 md:my-12">
            I build design teams and systems that scale.<br />
            From chaotic environments to clear, user-centered experiences,I lead with empathy, structure, and vision.
          </p>
        </div>
        <div className="hero-buttons flex flex-col md:flex-row items-center justify-center gap-4 mt-8 md:mt-12">
          <Button 
            asChild 
            variant={resolvedTheme === 'dark' ? 'primary-dark' : 'primary-light-inverted'} 
            size="lg"
            className="w-full md:w-auto"
          >
            <Link href="/work">View My Work</Link>
          </Button>
          <Button 
            asChild 
            variant={resolvedTheme === 'dark' ? 'secondary-dark' : 'secondary-light-inverted'} 
            size="lg"
            className="w-full md:w-auto"
          >
            <Link href="/contact">Let's Connect</Link>
          </Button>
        </div>
      </div>

      {/* Animation Setup */}
      <style jsx global>{`
        .perspective-1000 {
          perspective: 1000px;
          transform-style: preserve-3d;
        }
        .title-word {
          transform-origin: center center;
          backface-visibility: hidden;
        }
      `}</style>
    </motion.div>
  )
} 