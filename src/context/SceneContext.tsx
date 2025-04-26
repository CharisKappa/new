'use client'

import { createContext, useContext, ReactNode, useState } from 'react'

interface SceneContextType {
  color: string
  rotationSpeed: number
  distortion: number
  scale: number
  position: [number, number, number]
  isVisible: boolean
  updateScene: (props: Partial<Omit<SceneContextType, 'updateScene'>>) => void
}

const SceneContext = createContext<SceneContextType>({
  color: '#ffffff',
  rotationSpeed: 0.2,
  distortion: 0.1,
  scale: 1,
  position: [0, 0, 0],
  isVisible: true,
  updateScene: () => {}
})

export function SceneProvider({ children }: { children: ReactNode }) {
  const [sceneState, setSceneState] = useState({
    color: '#ffffff',
    rotationSpeed: 0.2,
    distortion: 0.1,
    scale: 1,
    position: [0, 0, 0] as [number, number, number],
    isVisible: true
  })

  const updateScene = (newProps: Partial<Omit<SceneContextType, 'updateScene'>>) => {
    setSceneState(prev => ({ ...prev, ...newProps }))
  }

  return (
    <SceneContext.Provider value={{ ...sceneState, updateScene }}>
      {children}
    </SceneContext.Provider>
  )
}

export function useScene() {
  const context = useContext(SceneContext)
  if (!context) {
    throw new Error('useScene must be used within a SceneProvider')
  }
  return context
} 