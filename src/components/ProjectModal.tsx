'use client'

import { useProjectModal } from '@/context/ProjectModalContext'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useScene } from '@/context/SceneContext'
import Image from 'next/image'
import { projects } from '@/data/projects'
import { Project } from '@/types/project'

export default function ProjectModal() {
  const { state, closeModal, openModal } = useProjectModal()
  const { updateScene } = useScene()
  const router = useRouter()

  const handleClose = () => {
    updateScene({
      color: '#000000',
      distortion: 0.1,
      rotationSpeed: 0.2,
      scale: 1,
      position: [0, 0, 0],
      isVisible: true
    })
    closeModal()
    router.push('/work')
  }

  if (!state.project || !state.imageRect) return null

  const isExternalImage = state.project.coverImage.startsWith('http')
  const imagePath = isExternalImage ? state.project.coverImage : state.project.coverImage

  return (
    <AnimatePresence>
      {state.isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 overflow-y-auto bg-background"
        >
          <button 
            onClick={handleClose}
            className="fixed top-4 left-4 z-50 p-2 hover:bg-background/20 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          <motion.div
            initial={{
              x: state.imageRect.x,
              y: state.imageRect.y,
              width: state.imageRect.width,
              height: state.imageRect.height,
            }}
            animate={{
              x: 0,
              y: 0,
              width: '100%',
              height: '100vh',
            }}
            transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
            className="relative"
          >
            {isExternalImage ? (
              <Image
                src={imagePath}
                alt={state.project.title}
                fill
                className="object-cover"
                unoptimized
              />
            ) : (
              <img
                src={imagePath}
                alt={state.project.title}
                className="w-full h-full object-cover"
              />
            )}
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="text-center px-4 max-w-4xl">
                <motion.h1 
                  className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  {state.project.title}
                </motion.h1>
                <motion.p 
                  className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                >
                  {state.project.description}
                </motion.p>
              </div>
            </motion.div>
          </motion.div>

          <div className="relative z-10 bg-background">
            <div className="container mx-auto px-4 py-32">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.5 }}
                className="max-w-4xl mx-auto"
              >
                <div className="mb-24">
                  <h2 className="text-2xl font-bold mb-6">Context</h2>
                  <p className="text-xl leading-relaxed text-foreground/90">
                    {state.project.context}
                  </p>
                  {state.project.contextImage && (
                    <div className="mt-8">
                      <Image
                        src={state.project.contextImage}
                        alt="Project Context"
                        width={1200}
                        height={800}
                        className="rounded-lg"
                      />
                    </div>
                  )}
                </div>

                <div className="mb-24">
                  <h2 className="text-2xl font-bold mb-6">Process</h2>
                  <p className="text-xl leading-relaxed text-foreground/90">
                    {state.project.process}
                  </p>
                  {state.project.processImages && state.project.processImages.length > 0 && (
                    <div className="mt-8 space-y-8">
                      {state.project.processImages.map((image, index) => (
                        <div key={index} className="relative aspect-video rounded-lg overflow-hidden">
                          <Image
                            src={image.src}
                            alt={image.alt}
                            fill
                            className="object-cover"
                          />
                          {image.caption && (
                            <p className="mt-4 text-sm text-muted-foreground text-center">
                              {image.caption}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {state.project.artifacts && state.project.artifacts.length > 0 && (
                  <div className="mb-24">
                    <h2 className="text-2xl font-bold mb-6">Artifacts</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {state.project.artifacts.map((artifact, index) => (
                        <div key={index} className="relative aspect-video rounded-lg overflow-hidden">
                          <Image
                            src={artifact.src}
                            alt={artifact.alt}
                            fill
                            className="object-cover"
                          />
                          {artifact.caption && (
                            <p className="mt-4 text-sm text-muted-foreground text-center">
                              {artifact.caption}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mb-24">
                  <h2 className="text-2xl font-bold mb-6">Results</h2>
                  <p className="text-xl leading-relaxed text-foreground/90">
                    {state.project.results}
                  </p>
                  {state.project.resultMetrics && state.project.resultMetrics.length > 0 && (
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                      {state.project.resultMetrics.map((metric, index) => (
                        <div key={index} className="p-6 bg-secondary/10 rounded-lg">
                          <p className="text-sm text-muted-foreground mb-2">{metric.label}</p>
                          <p className="text-3xl font-bold">
                            {metric.value}
                            {metric.change && (
                              <span className={`ml-2 text-sm ${metric.type === 'increase' ? 'text-green-500' : 'text-red-500'}`}>
                                {metric.change}
                              </span>
                            )}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {state.project.quotes && state.project.quotes.length > 0 && (
                  <div className="mb-24">
                    <h2 className="text-2xl font-bold mb-6">Feedback</h2>
                    <div className="space-y-8">
                      {state.project.quotes.map((quote, index) => (
                        <div key={index} className="p-8 bg-secondary/10 rounded-lg">
                          <p className="text-xl italic mb-4">"{quote.text}"</p>
                          <div>
                            <p className="font-semibold">{quote.author}</p>
                            <p className="text-sm text-muted-foreground">{quote.role}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mb-24">
                  <h2 className="text-2xl font-bold mb-6">Reflection</h2>
                  <p className="text-xl leading-relaxed text-foreground/90">
                    {state.project.reflection}
                  </p>
                </div>

                {state.project.relatedProjects && state.project.relatedProjects.length > 0 && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6">Related Projects</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {state.project.relatedProjects.map((relatedProject, index) => {
                        const fullProject = projects.find((p: Project) => p.slug === relatedProject.slug)
                        if (!fullProject) return null
                        
                        return (
                          <div 
                            key={index} 
                            className="group cursor-pointer"
                            onClick={() => {
                              const element = document.getElementById(fullProject.slug)
                              if (element) {
                                const rect = element.getBoundingClientRect()
                                openModal(fullProject, rect)
                                router.push(`/work/${fullProject.slug}`)
                              }
                            }}
                          >
                            <div className="relative aspect-video rounded-lg overflow-hidden mb-4">
                              <Image
                                src={fullProject.coverImage}
                                alt={fullProject.title}
                                fill
                                className="object-cover transition-transform group-hover:scale-105"
                              />
                            </div>
                            <h3 className="text-xl font-semibold mb-2 group-hover:text-primary">
                              {fullProject.title}
                            </h3>
                            <p className="text-muted-foreground">
                              {fullProject.description}
                            </p>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 