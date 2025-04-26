'use client'

import { notFound } from 'next/navigation'
import { projects } from '@/data/projects'
import ProjectDetails from '@/components/projects/ProjectDetails'
import ProjectChallenges from '@/components/projects/ProjectChallenges'
import ProjectProcess from '@/components/projects/ProjectProcess'
import ProjectArtifacts from '@/components/projects/ProjectArtifacts'
import ProjectResults from '@/components/projects/ProjectResults'
import ProjectFeedback from '@/components/projects/ProjectFeedback'
import ProjectReflection from '@/components/projects/ProjectReflection'
import RelatedProjects from '@/components/projects/RelatedProjects'
import { motion } from 'framer-motion'

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug)

  if (!project) {
    notFound()
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800"
    >
      <div className="max-w-7xl mx-auto px-4 py-24 space-y-32">
        <ProjectDetails
          title={project.title}
          description={project.description}
          coverImage={project.coverImage}
          tags={project.tags}
          isDuotone={project.isDuotone || false}
          role={project.role || ''}
          timeline={project.timeline || ''}
          team={project.team || ''}
          tools={project.tools || []}
        />

        <motion.div variants={itemVariants}>
          <ProjectChallenges
            context={project.context}
            contextImage={project.contextImage}
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <ProjectProcess
            process={project.process}
            processImages={project.processImages}
          />
        </motion.div>

        {project.artifacts && project.artifacts.length > 0 && (
          <motion.div variants={itemVariants}>
            <ProjectArtifacts artifacts={project.artifacts} />
          </motion.div>
        )}

        <motion.div variants={itemVariants}>
          <ProjectResults
            results={project.results}
            resultMetrics={project.resultMetrics}
          />
        </motion.div>

        {project.quotes && project.quotes.length > 0 && (
          <motion.div variants={itemVariants}>
            <ProjectFeedback quotes={project.quotes} />
          </motion.div>
        )}

        <motion.div variants={itemVariants}>
          <ProjectReflection reflection={project.reflection} />
        </motion.div>

        {project.relatedProjects && project.relatedProjects.length > 0 && (
          <motion.div variants={itemVariants}>
            <RelatedProjects projects={project.relatedProjects} />
          </motion.div>
        )}
      </div>
    </motion.div>
  )
} 