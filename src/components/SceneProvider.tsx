'use client'

import { createContext, useContext, ReactNode, useState, useEffect } from 'react'
import Scene from './Scene'

interface SceneContextType {
  color: string
  rotationSpeed: number
  distortion: number
  scale: number
  position: [number, number, number]
  isVisible: boolean
  updateScene: (props: Partial<Omit<SceneContextType, 'updateScene'>>) => void
}

export const SceneContext = createContext<SceneContextType>({
  color: '#ffffff',
  rotationSpeed: 0.2,
  distortion: 0.1,
  scale: 1,
  position: [0, 0, 0],
  isVisible: true,
  updateScene: () => {}
})

export function useScene() {
  const context = useContext(SceneContext)
  if (!context) {
    throw new Error('useScene must be used within a SceneProvider')
  }
  return context
}

interface SceneProviderProps {
  children: ReactNode
}

export function SceneProvider({ children }: SceneProviderProps) {
  const [sceneState, setSceneState] = useState({
    color: '#ffffff',
    rotationSpeed: 0.2,
    distortion: 0.1,
    scale: 1,
    position: [0, 0, 0] as [number, number, number],
    isVisible: true
  })

  useEffect(() => {
    console.log('SceneProvider mounted with state:', sceneState)
    return () => {
      console.log('SceneProvider unmounted')
    }
  }, [sceneState])

  const updateScene = (newProps: Partial<Omit<SceneContextType, 'updateScene'>>) => {
    console.log('Updating scene with:', newProps)
    setSceneState(prev => {
      const updated = { ...prev, ...newProps }
      console.log('New scene state:', updated)
      return updated
    })
  }

  return (
    <SceneContext.Provider value={{ ...sceneState, updateScene }}>
      <div className="relative w-full min-h-screen">
        <Scene {...sceneState} />
        <div className="relative z-10">
          {children}
        </div>
      </div>
    </SceneContext.Provider>
  )
} 