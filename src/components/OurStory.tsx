'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

export default function OurStory() {
  return (
    <section className="py-32">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-primary mb-8">My Journey</h2>
          <p className="text-xl text-secondary mb-8">
            From hands-on product design to leading design teams, my journey has been about creating meaningful digital experiences while mentoring the next generation of designers.
          </p>
          <div className="grid grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-primary mb-4">Product Design</h3>
              <p className="text-secondary">Crafting intuitive interfaces that solve real user problems and create meaningful experiences.</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-primary mb-4">Team Leadership</h3>
              <p className="text-secondary">Building and mentoring design teams to deliver exceptional work while fostering growth and innovation.</p>
            </motion.div>
          </div>
        </motion.div>
        <motion.div 
          className="relative aspect-square"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          viewport={{ once: true }}
        >
          <Image
            src="/images/profile_pic/04.png"
            alt="Our Studio"
            fill
            className="object-cover rounded-lg filter grayscale hover:grayscale-0 transition-all duration-500"
          />
          <div className="absolute inset-0 bg-black/20 hover:bg-black/0 transition-all duration-500 rounded-lg" />
        </motion.div>
      </div>
    </section>
  )
} 