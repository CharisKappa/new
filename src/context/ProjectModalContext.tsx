'use client'

import { createContext, useContext, useState, useCallback } from 'react'
import { Project } from '@/data/projects'

interface ModalState {
  isOpen: boolean
  project: Project | null
  imageRect: DOMRect | null
}

interface ProjectModalContextType {
  state: ModalState
  openModal: (project: Project, imageRect: DOMRect) => void
  closeModal: () => void
}

const ProjectModalContext = createContext<ProjectModalContextType | undefined>(undefined)

export function ProjectModalProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<ModalState>({
    isOpen: false,
    project: null,
    imageRect: null
  })

  const openModal = useCallback((project: Project, imageRect: DOMRect) => {
    setState({
      isOpen: true,
      project,
      imageRect
    })
  }, [])

  const closeModal = useCallback(() => {
    setState({
      isOpen: false,
      project: null,
      imageRect: null
    })
  }, [])

  return (
    <ProjectModalContext.Provider value={{ state, openModal, closeModal }}>
      {children}
    </ProjectModalContext.Provider>
  )
}

export function useProjectModal() {
  const context = useContext(ProjectModalContext)
  if (context === undefined) {
    throw new Error('useProjectModal must be used within a ProjectModalProvider')
  }
  return context
} 