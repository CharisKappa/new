'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowLeft, ExternalLink } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useScene } from '@/context/SceneContext'

interface Project {
  title: string;
  description: string;
  image: string;
  year: string;
  role: string;
  client: string;
  challenge: string;
  solution: string;
  results: string;
  technologies: string[];
  content?: Array<{
    type: 'text' | 'image';
    content?: string;
    src?: string;
    caption?: string;
  }>;
  sceneProps?: {
    color: string;
    rotationSpeed: number;
    distortion: number;
    scale: number;
    position: [number, number, number];
    isVisible: boolean;
  };
}

interface ProjectPageProps {
  project: Project;
}

export default function ProjectPage({ project }: ProjectPageProps) {
  const router = useRouter()
  const { updateScene } = useScene()
  const [imageError, setImageError] = useState(false)
  const [mounted, setMounted] = useState(false)
  const isExternalImage = project.image.startsWith('http')

  useEffect(() => {
    setMounted(true)
    return () => {
      setMounted(false)
    }
  }, [])

  const handleClose = () => {
    const defaultSceneProps = {
      color: '#ffffff',
      rotationSpeed: 0.2,
      distortion: 0.1,
      scale: 1,
      position: [0, 0, 5] as [number, number, number],
      isVisible: true
    }
    updateScene(defaultSceneProps)
    router.back()
  }

  if (imageError) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background z-50">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Image Error</h1>
          <p className="text-xl mb-8">Sorry, there was an error loading the project image.</p>
          <button 
            onClick={handleClose}
            className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-lg"
          >
            Close
          </button>
        </div>
      </div>
    )
  }

  if (!mounted) return null

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 overflow-y-auto bg-background"
    >
      <button 
        onClick={handleClose}
        className="fixed top-4 left-4 z-50 p-2 hover:bg-background/20 rounded-full transition-colors"
      >
        <ArrowLeft className="w-6 h-6" />
      </button>

      <div className="container mx-auto px-4 py-32">
        {/* Hero Section */}
        <div className="relative h-[60vh] w-full overflow-hidden mb-32">
          <motion.div 
            className="absolute inset-0 z-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/40 to-background/80 z-10" />
            {isExternalImage ? (
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
                onError={() => setImageError(true)}
                unoptimized
              />
            ) : (
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
                onError={() => setImageError(true)}
              />
            )}
          </motion.div>
          
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <div className="text-center px-4 max-w-4xl">
              <motion.h1 
                className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight tracking-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                {project.title}
              </motion.h1>
              <motion.p 
                className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto leading-relaxed font-light"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
              >
                {project.description}
              </motion.p>
            </div>
          </motion.div>
        </div>

        {/* Project Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-muted-foreground">Year</h3>
            <p className="text-lg">{project.year}</p>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-muted-foreground">Role</h3>
            <p className="text-lg">{project.role}</p>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-muted-foreground">Client</h3>
            <p className="text-lg">{project.client}</p>
          </div>
        </div>

        {/* Challenge & Solution */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-32">
          <div>
            <h2 className="text-3xl font-bold mb-6">The Challenge</h2>
            <p className="text-lg leading-relaxed text-muted-foreground">
              {project.challenge}
            </p>
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-6">Our Solution</h2>
            <p className="text-lg leading-relaxed text-muted-foreground">
              {project.solution}
            </p>
          </div>
        </div>

        {/* Results */}
        <div className="mb-32">
          <h2 className="text-3xl font-bold mb-6">Results</h2>
          <p className="text-lg leading-relaxed text-muted-foreground max-w-3xl">
            {project.results}
          </p>
        </div>

        {/* Technologies */}
        <div className="mb-32">
          <h2 className="text-3xl font-bold mb-6">Technologies Used</h2>
          <div className="flex flex-wrap gap-4">
            {project.technologies.map((tech, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Content Sections */}
        {project.content?.map((section, index) => (
          <div key={index} className="mb-32">
            {section.type === 'text' && (
              <div className="prose prose-lg max-w-none">
                <p className="text-lg leading-relaxed text-muted-foreground">
                  {section.content}
                </p>
              </div>
            )}
            {section.type === 'image' && (
              <div className="relative aspect-video rounded-xl overflow-hidden">
                {section.src?.startsWith('http') ? (
                  <Image
                    src={section.src}
                    alt={section.caption || ''}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                ) : (
                  <img
                    src={section.src || ''}
                    alt={section.caption || ''}
                    className="w-full h-full object-cover"
                  />
                )}
                {section.caption && (
                  <p className="text-sm text-muted-foreground mt-4">
                    {section.caption}
                  </p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  )
} 