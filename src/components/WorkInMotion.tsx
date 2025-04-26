'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

const workItems = [
  {
    id: '1',
    title: 'Interactive Design',
    description: 'Bringing ideas to life through motion and interaction',
    image: '/images/profile_pic/01.png',
    aspect: 'landscape',
    align: 'left'
  },
  {
    id: '2',
    title: 'Digital Experience',
    description: 'Creating immersive digital journeys',
    image: '/images/profile_pic/02.png',
    aspect: 'portrait',
    align: 'right'
  },
  {
    id: '3',
    title: 'Brand Identity',
    description: 'Crafting memorable brand experiences',
    image: '/images/profile_pic/03.png',
    aspect: 'portrait',
    align: 'left'
  },
  {
    id: '4',
    title: 'Modern Solutions',
    description: 'Building the future of digital experiences',
    image: '/images/profile_pic/04.png',
    aspect: 'landscape',
    align: 'right'
  },
  {
    id: '5',
    title: 'Creative Vision',
    description: 'Shaping unique visual narratives',
    image: '/images/profile_pic/05.png',
    aspect: 'landscape',
    align: 'left'
  },
  {
    id: '6',
    title: 'Design Innovation',
    description: 'Pushing boundaries in digital design',
    image: '/images/profile_pic/ 06.png',
    aspect: 'portrait',
    align: 'right'
  }
]

export default function WorkInMotion() {
  return (
    <section className="py-32">
      <h2 className="text-4xl font-bold text-primary mb-24 text-center">Work in Motion</h2>
      <div className="max-w-[90rem] mx-auto px-4">
        <div className="space-y-32">
          {workItems.map((item, index) => (
            <motion.div 
              key={item.id}
              className={`flex items-center gap-8 ${
                item.align === 'right' ? 'flex-row-reverse' : ''
              }`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              {/* Image */}
              <div className={`relative w-1/2 ${
                item.aspect === 'landscape' 
                  ? 'aspect-[16/9]' 
                  : 'aspect-[3/4]'
              } overflow-hidden group`}>
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700 ease-out transform group-hover:scale-105"
                  sizes="50vw"
                  priority={index < 2}
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-all duration-500" />
                
                {/* Hover Content */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                    <span className="inline-block px-6 py-2 border border-white/20 rounded-full text-white/90 text-sm backdrop-blur-sm">
                      View Project
                    </span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className={`w-1/2 ${
                item.align === 'right' ? 'text-right' : 'text-left'
              }`}>
                <motion.div
                  initial={{ opacity: 0, x: item.align === 'right' ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                >
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">{item.title}</h3>
                  <p className="text-lg text-secondary max-w-md mx-auto">{item.description}</p>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 