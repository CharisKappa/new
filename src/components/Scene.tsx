'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { useRef, useEffect, useState } from 'react'
import { Environment } from '@react-three/drei'
import * as THREE from 'three'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

interface SceneProps {
  color?: string
  rotationSpeed?: number
  distortion?: number
  scale?: number
  position?: [number, number, number]
  isVisible?: boolean
}

interface Node {
  position: THREE.Vector3
  size: number
  opacity: number
}

function NodeNetwork({ color = '#ffffff', rotationSpeed = 0.2, distortion = 0.1, scale = 1, position = [0, 0, 0], isVisible = true }: SceneProps) {
  const groupRef = useRef<THREE.Group>(null)
  const nodesRef = useRef<THREE.Points>(null)
  const linesRef = useRef<THREE.LineSegments>(null)
  const scrollProgress = useRef(0)
  const [nodes, setNodes] = useState<Node[]>([])
  const [connections, setConnections] = useState<[number, number][]>([])
  const [targetNodes, setTargetNodes] = useState<Node[]>([])
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    if (!isVisible) return

    gsap.registerPlugin(ScrollTrigger)

    // Generate initial nodes
    const nodeCount = 30
    const newNodes: Node[] = []
    for (let i = 0; i < nodeCount; i++) {
      const isFeatureNode = Math.random() < 0.2
      newNodes.push({
        position: new THREE.Vector3(
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 10
        ),
        size: isFeatureNode ? 0.3 : 0.1,
        opacity: isFeatureNode ? 1 : 0.5
      })
    }
    setNodes(newNodes)
    setIsInitialized(true)

    // Generate connections
    const newConnections: [number, number][] = []
    for (let i = 0; i < newNodes.length; i++) {
      for (let j = i + 1; j < newNodes.length; j++) {
        if (Math.random() < 0.2) {
          newConnections.push([i, j])
        }
      }
    }
    setConnections(newConnections)

    return () => {
      setIsInitialized(false)
    }
  }, [isVisible])

  useFrame((state, delta) => {
    if (!isInitialized || !isVisible || !groupRef.current) return

    groupRef.current.rotation.y += rotationSpeed * delta
    groupRef.current.position.set(...position)
    groupRef.current.scale.setScalar(scale)

    if (nodesRef.current) {
      const material = nodesRef.current.material as THREE.ShaderMaterial
      material.uniforms.distortion.value = distortion
    }
  })

  if (!isVisible || !isInitialized) return null

  return (
    <group ref={groupRef}>
      <points ref={nodesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={nodes.length}
            array={new Float32Array(nodes.flatMap(node => [node.position.x, node.position.y, node.position.z]))}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-size"
            count={nodes.length}
            array={new Float32Array(nodes.map(node => node.size))}
            itemSize={1}
          />
          <bufferAttribute
            attach="attributes-opacity"
            count={nodes.length}
            array={new Float32Array(nodes.map(node => node.opacity))}
            itemSize={1}
          />
        </bufferGeometry>
        <shaderMaterial
          uniforms={{
            color: { value: new THREE.Color(color) },
            distortion: { value: distortion }
          }}
          vertexShader={`
            attribute float size;
            attribute float opacity;
            varying float vOpacity;
            void main() {
              vOpacity = opacity;
              vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
              gl_PointSize = size * (300.0 / -mvPosition.z);
              gl_Position = projectionMatrix * mvPosition;
            }
          `}
          fragmentShader={`
            uniform vec3 color;
            varying float vOpacity;
            void main() {
              float r = distance(gl_PointCoord, vec2(0.5));
              float opacity = smoothstep(0.5, 0.0, r) * vOpacity;
              gl_FragColor = vec4(color, opacity);
            }
          `}
          transparent
          depthWrite={false}
        />
      </points>
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={connections.length * 2}
            array={new Float32Array(connections.flatMap(([i, j]) => [
              nodes[i].position.x, nodes[i].position.y, nodes[i].position.z,
              nodes[j].position.x, nodes[j].position.y, nodes[j].position.z
            ]))}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color={color} transparent opacity={0.2} />
      </lineSegments>
    </group>
  )
}

export default function Scene(props: SceneProps) {
  const { isVisible = true } = props

  if (!isVisible) return null

  return (
    <Canvas
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none'
      }}
      camera={{ position: [0, 0, 5], fov: 75 }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <NodeNetwork {...props} />
      <Environment preset="city" />
    </Canvas>
  )
} 