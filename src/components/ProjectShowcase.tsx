import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'
import { motion } from 'framer-motion'

gsap.registerPlugin(ScrollTrigger)

interface Project {
  id: string
  title: string
  description: string
  image: string
  tags: string[]
}

const projects: Project[] = [
  {
    id: '1',
    title: 'Product Design',
    description: 'Crafting intuitive digital experiences that users love',
    image: '/images/profile_pic/01.png',
    tags: ['UI/UX', 'Product Strategy', 'User Research']
  },
  {
    id: '2',
    title: 'Brand Identity',
    description: 'Building memorable brand experiences that stand out',
    image: '/images/profile_pic/ 06.png',
    tags: ['Branding', 'Visual Design', 'Art Direction']
  },
  {
    id: '3',
    title: 'Web Development',
    description: 'Creating modern web applications with cutting-edge tech',
    image: '/images/profile_pic/01.png',
    tags: ['Development', 'Frontend', 'React']
  }
]

export default function ProjectShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const projectRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      // Pin the section
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=100%',
        pin: true,
        pinSpacing: false,
      })

      // Parallax effect for each project
      projectRefs.current.forEach((project, index) => {
        if (!project) return

        gsap.to(project.querySelector('.project-image'), {
          scrollTrigger: {
            trigger: project,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5
          },
          y: '40%',
          scale: 1.15,
          ease: 'none'
        })

        // Animate title and description
        gsap.from(project.querySelector('.project-title'), {
          scrollTrigger: {
            trigger: project,
            start: 'top bottom',
            end: 'top center',
            scrub: 1
          },
          y: 200,
          opacity: 0,
          ease: 'power2.out'
        })

        gsap.from(project.querySelector('.project-description'), {
          scrollTrigger: {
            trigger: project,
            start: 'top bottom',
            end: 'top center',
            scrub: 1
          },
          y: 150,
          opacity: 0,
          ease: 'power2.out'
        })

        // Animate tags
        gsap.from(project.querySelectorAll('.project-tag'), {
          scrollTrigger: {
            trigger: project,
            start: 'top bottom',
            end: 'top center',
            scrub: 1
          },
          y: 50,
          opacity: 0,
          stagger: 0.1,
          ease: 'power2.out'
        })
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative w-full min-h-screen py-32">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              ref={el => { projectRefs.current[index] = el }}
              className={`relative group cursor-pointer ${
                index === 0 ? 'md:col-span-2 md:aspect-[21/9]' : 
                index === 1 ? 'md:aspect-[4/3] md:mt-[-10%]' : 
                'md:aspect-[3/4] md:mt-[10%]'
              }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
              viewport={{ once: true }}
            >
              <div className="relative w-full h-full overflow-hidden rounded-2xl">
                <div className="project-image absolute inset-0">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    priority
                  />
                </div>
                
                {/* Overlay content */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent">
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <h3 className="project-title text-5xl md:text-6xl font-bold text-white mb-4">
                      {project.title}
                    </h3>
                    <p className="project-description text-white/90 text-xl mb-6">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span key={tag} className="project-tag px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm text-white">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 