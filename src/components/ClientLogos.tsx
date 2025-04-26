'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { useTheme } from 'next-themes'

const clients = {
  light: [
    { 
      id: 1, 
      name: 'Alpha Bank', 
      logo: '/images/logos/alpha-bank-light.svg'
    },
    { 
      id: 2, 
      name: 'Cosmote', 
      logo: '/images/logos/cosmote-dark.png'
    },
    { 
      id: 3, 
      name: 'Peiraeus Bank', 
      logo: '/images/logos/peiraeus-light.svg'
    },
    { 
      id: 4, 
      name: 'SETE', 
      logo: '/images/logos/sete-light.svg'
    },
    { 
      id: 5, 
      name: 'EDEE', 
      logo: '/images/logos/edee-light.svg'
    },
    { 
      id: 6, 
      name: 'Sklavenitis', 
      logo: '/images/logos/sklavenitis-light.png'
    },
    { 
      id: 7, 
      name: 'Philips', 
      logo: '/images/logos/philips-light.svg'
    },
    { 
      id: 8, 
      name: 'Eurolife', 
      logo: '/images/logos/eurolife-light.png'
    },
    { 
      id: 9, 
      name: 'Aegean Airlines', 
      logo: '/images/logos/aegean-light.svg'
    },
    { 
      id: 10, 
      name: 'BMW', 
      logo: 'https://upload.wikimedia.org/wikipedia/commons/4/44/BMW.svg'
    },
    { 
      id: 11, 
      name: 'Mercedes-Benz', 
      logo: 'https://upload.wikimedia.org/wikipedia/commons/9/90/Mercedes-Logo.svg'
    },
    { 
      id: 12, 
      name: 'Audi', 
      logo: 'https://upload.wikimedia.org/wikipedia/commons/9/92/Audi-Logo_2016.svg'
    }
  ],
  dark: [
    { 
      id: 1, 
      name: 'Alpha Bank', 
      logo: '/images/logos/alpha-bank-dark.svg'
    },
    { 
      id: 2, 
      name: 'Cosmote', 
      logo: '/images/logos/cosmote-dark.png'
    },
    { 
      id: 3, 
      name: 'Peiraeus Bank', 
      logo: '/images/logos/peiraeus-dark.svg'
    },
    { 
      id: 4, 
      name: 'SETE', 
      logo: '/images/logos/sete-dark.svg'
    },
    { 
      id: 5, 
      name: 'EDEE', 
      logo: '/images/logos/edee-dark.svg'
    },
    { 
      id: 6, 
      name: 'Sklavenitis', 
      logo: '/images/logos/sklavenitis-dark.png'
    },
    { 
      id: 7, 
      name: 'Philips', 
      logo: '/images/logos/philips-dark.svg'
    },
    { 
      id: 8, 
      name: 'Eurolife', 
      logo: '/images/logos/eurolife-dark.png'
    },
    { 
      id: 9, 
      name: 'Aegean Airlines', 
      logo: '/images/logos/aegean-dark.svg'
    },
    { 
      id: 10, 
      name: 'BMW', 
      logo: 'https://upload.wikimedia.org/wikipedia/commons/4/44/BMW.svg'
    },
    { 
      id: 11, 
      name: 'Mercedes-Benz', 
      logo: 'https://upload.wikimedia.org/wikipedia/commons/9/90/Mercedes-Logo.svg'
    },
    { 
      id: 12, 
      name: 'Audi', 
      logo: 'https://upload.wikimedia.org/wikipedia/commons/9/92/Audi-Logo_2016.svg'
    }
  ]
}

export default function ClientLogos() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()
  const currentClients = theme === 'dark' ? clients.dark : clients.light

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      }
    })

    // Initial state
    tl.set('.client-logo', {
      opacity: 0,
      y: 50,
      scale: 0.8
    })

    // Animate logos in sequentially
    tl.to('.client-logo', {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.5,
      ease: 'power2.out',
      stagger: 0.1
    })

    return () => {
      tl.kill()
    }
  }, [])

  return (
    <section 
      ref={sectionRef}
      className="py-24 bg-background relative overflow-hidden"
    >
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-4xl md:text-5xl font-bold text-foreground text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          viewport={{ once: true }}
        >
          Clients
        </motion.h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {currentClients.map((client) => (
            <motion.div
              key={client.id}
              className="client-logo relative aspect-square bg-muted rounded-lg overflow-hidden p-8 flex items-center justify-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <Image
                src={client.logo}
                alt={client.name}
                width={120}
                height={120}
                className="object-contain w-full h-full"
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx global>{`
        .client-logo {
          backdrop-filter: blur(10px);
          border: 1px solid var(--border);
        }
      `}</style>
    </section>
  )
} 