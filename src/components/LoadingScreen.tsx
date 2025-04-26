'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import styles from '../styles/components/LoadingScreen.module.css'

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0)
  const [count, setCount] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 1
      })
    }, 20)

    const countInterval = setInterval(() => {
      setCount((prev) => {
        if (prev >= 100) {
          clearInterval(countInterval)
          return 100
        }
        return prev + 1
      })
    }, 20)

    return () => {
      clearInterval(interval)
      clearInterval(countInterval)
    }
  }, [])

  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className={styles.count}
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {count}%
      </motion.div>
      
      <div className={styles.progressContainer}>
        <motion.div
          className={styles.progressBar}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
      </div>

      <motion.div
        className={styles.text}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        LOADING EXPERIENCE
      </motion.div>
    </motion.div>
  )
} 