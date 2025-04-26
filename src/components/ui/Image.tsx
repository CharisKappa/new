'use client'

import { useState } from 'react'
import NextImage from 'next/image'

interface ImageProps {
  src: string
  alt: string
  className?: string
  priority?: boolean
}

export default function Image({ src, alt, className = '', priority = false }: ImageProps) {
  const [error, setError] = useState(false)

  // Check if the image is external
  const isExternal = src.startsWith('http')

  if (error) {
    return (
      <div className={`bg-muted flex items-center justify-center ${className}`}>
        <span className="text-muted-foreground">Image not available</span>
      </div>
    )
  }

  if (isExternal) {
    return (
      <NextImage
        src={src}
        alt={alt}
        width={1200}
        height={800}
        className={className}
        priority={priority}
        onError={() => setError(true)}
      />
    )
  }

  // For local images, use a regular img tag
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setError(true)}
    />
  )
} 