export interface Project {
  id?: string
  slug: string
  title: string
  description: string
  coverImage: string
  image?: string
  size?: 'small' | 'medium' | 'large'
  aspect?: 'square' | 'portrait' | 'landscape'
  category?: string
  content?: Array<{
    type: 'text' | 'image'
    content?: string
    src?: string
    caption?: string
  }>
  sceneProps?: {
    color: string
    distortion: number
    rotationSpeed: number
    scale: number
    position: [number, number, number]
    isVisible: boolean
  }
  relatedProjects?: {
    slug: string
    title: string
    description: string
  }[]
} 