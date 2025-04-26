'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

interface NodeSystemProps {
  totalSections: number
}

export default function NodeSystem({ totalSections }: NodeSystemProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const nodesRef = useRef<SVGCircleElement[]>([])
  const connectionsRef = useRef<SVGPathElement[]>([])

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const svg = svgRef.current
    if (!svg) return

    // Create initial nodes
    const nodes = Array.from({ length: 5 }, (_, i) => {
      const node = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
      node.setAttribute('r', '4')
      node.setAttribute('fill', 'white')
      node.setAttribute('opacity', '0.8')
      svg.appendChild(node)
      return node
    })
    nodesRef.current = nodes

    // Create connections
    const connections = Array.from({ length: 4 }, (_, i) => {
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
      path.setAttribute('stroke', 'white')
      path.setAttribute('stroke-width', '1')
      path.setAttribute('fill', 'none')
      path.setAttribute('opacity', '0.4')
      svg.appendChild(path)
      return path
    })
    connectionsRef.current = connections

    // Initial positions
    const centerX = svg.clientWidth / 2
    const centerY = svg.clientHeight / 2
    const radius = 100

    // Update positions based on scroll
    ScrollTrigger.create({
      trigger: 'main',
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        const progress = self.progress
        const sectionIndex = Math.floor(progress * totalSections)
        const sectionProgress = (progress * totalSections) % 1

        // Update node positions
        nodes.forEach((node, i) => {
          const angle = (i / nodes.length) * Math.PI * 2 + progress * Math.PI
          const x = centerX + Math.cos(angle) * radius
          const y = centerY + Math.sin(angle) * radius

          gsap.to(node, {
            attr: { cx: x, cy: y },
            duration: 0.3
          })
        })

        // Update connections
        connections.forEach((path, i) => {
          const startNode = nodes[i]
          const endNode = nodes[(i + 1) % nodes.length]
          const startX = parseFloat(startNode.getAttribute('cx') || '0')
          const startY = parseFloat(startNode.getAttribute('cy') || '0')
          const endX = parseFloat(endNode.getAttribute('cx') || '0')
          const endY = parseFloat(endNode.getAttribute('cy') || '0')

          const pathData = `M ${startX} ${startY} C ${startX + 50} ${startY}, ${endX - 50} ${endY}, ${endX} ${endY}`
          path.setAttribute('d', pathData)
        })
      }
    })

    return () => {
      nodes.forEach(node => node.remove())
      connections.forEach(connection => connection.remove())
    }
  }, [totalSections])

  return (
    <svg
      ref={svgRef}
      className="absolute top-0 left-0 w-full h-full pointer-events-none"
      style={{ zIndex: 30 }}
    />
  )
} 