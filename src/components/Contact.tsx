'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { useTheme } from 'next-themes'

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null)
  const infoRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate info section
      gsap.from(infoRef.current, {
        opacity: 0,
        x: -50,
        duration: 0.8,
        scrollTrigger: {
          trigger: infoRef.current,
          start: 'top bottom-=100',
          toggleActions: 'play none none reverse'
        }
      })

      // Animate form elements
      const formElements = formRef.current?.querySelectorAll('div')
      formElements?.forEach((element, index) => {
        gsap.from(element, {
          opacity: 0,
          y: 30,
          duration: 0.6,
          delay: index * 0.1,
          scrollTrigger: {
            trigger: element,
            start: 'top bottom-=50',
            toggleActions: 'play none none reverse'
          }
        })
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <div id="contact" className="max-w-4xl mx-auto px-4 py-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl font-bold text-primary mb-4">Get in Touch</h2>
        <p className="text-xl text-secondary max-w-2xl mx-auto">
          Have a project in mind or want to discuss potential collaboration?
          I'd love to hear from you.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-12">
        <div ref={infoRef}>
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Email</h3>
              <a 
                href="mailto:give.me.an.idea@gmail.com" 
                className="text-secondary hover:text-primary transition-colors"
              >
                give.me.an.idea@gmail.com
              </a>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Phone</h3>
              <a 
                href="tel:+1234567890" 
                className="text-secondary hover:text-primary transition-colors"
              >
                +1 (234) 567-890
              </a>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Location</h3>
              <p className="text-secondary">New York, NY</p>
            </div>
          </div>
        </div>

        <form ref={formRef} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary focus:border-primary dark:focus:border-primary text-foreground placeholder:text-muted-foreground transition-colors"
              placeholder="Your name"
              required
              aria-required="true"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary focus:border-primary dark:focus:border-primary text-foreground placeholder:text-muted-foreground transition-colors"
              placeholder="your.email@example.com"
              required
              aria-required="true"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
              Message
            </label>
            <textarea
              id="message"
              rows={4}
              className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary focus:border-primary dark:focus:border-primary text-foreground placeholder:text-muted-foreground resize-none transition-colors"
              placeholder="Tell me about your project..."
              required
              aria-required="true"
            />
          </div>
          <Button 
            type="submit" 
            variant={theme === 'dark' ? 'primary-dark' : 'primary-light-inverted'} 
            size="lg" 
            className="w-full"
          >
            Send Message
          </Button>
        </form>
      </div>
    </div>
  )
} 