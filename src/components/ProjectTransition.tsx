'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useRouter } from 'next/navigation'
import { useProjectTransition } from '@/context/ProjectTransitionContext'

interface ProjectTransitionProps {
  projectId: string
  children: React.ReactNode
  className?: string
}

export default function ProjectTransition({ projectId, children, className }: ProjectTransitionProps) {
  const router = useRouter()
  const { startTransition } = useProjectTransition()
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    
    const container = containerRef.current
    const content = contentRef.current
    const image = imageRef.current
    if (!container || !content || !image) return

    // Get the position and dimensions of the clicked element
    const rect = container.getBoundingClientRect()
    const windowWidth = window.innerWidth
    const windowHeight = window.innerHeight

    // Store the image source for the transition
    const imageSrc = image.src

    // Create a timeline for the exit animation
    const tl = gsap.timeline({
      onComplete: () => {
        // Start the transition
        startTransition(image, { src: imageSrc, alt: image.alt })
        
        // Navigate to the project page after a short delay
        setTimeout(() => {
          router.push(`/projects/${projectId}`)
        }, 100)
      }
    })

    // First, create a clone of the image for the transition
    const clone = image.cloneNode(true) as HTMLImageElement
    clone.style.position = 'fixed'
    clone.style.top = `${rect.top}px`
    clone.style.left = `${rect.left}px`
    clone.style.width = `${rect.width}px`
    clone.style.height = `${rect.height}px`
    clone.style.objectFit = 'cover'
    clone.style.zIndex = '9999'
    clone.style.borderRadius = '0.5rem'
    document.body.appendChild(clone)

    // Hide the original content
    gsap.set(content, { opacity: 0 })

    // Animate the clone to full screen
    tl.to(clone, {
      top: 0,
      left: 0,
      width: windowWidth,
      height: windowHeight,
      borderRadius: 0,
      duration: 1.2,
      ease: 'power2.inOut'
    })

    // Scale up the image slightly
    tl.to(clone, {
      scale: 1.1,
      duration: 1.2,
      ease: 'power2.inOut'
    }, '-=1.2')

    // Fade out the clone
    tl.to(clone, {
      opacity: 0,
      duration: 0.4,
      ease: 'power2.in',
      onComplete: () => {
        document.body.removeChild(clone)
      }
    })
  }

  return (
    <div 
      ref={containerRef}
      className={className}
      onClick={handleClick}
      style={{ position: 'relative', cursor: 'pointer' }}
    >
      <div ref={contentRef}>
        {children}
      </div>
    </div>
  )
} 