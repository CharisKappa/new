import Image from 'next/image'
import Link from 'next/link'

interface RelatedProject {
  slug: string
  title: string
  description: string
  image: string
}

interface RelatedProjectsProps {
  projects: RelatedProject[]
}

export default function RelatedProjects({ projects }: RelatedProjectsProps) {
  return (
    <section className="py-16">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">Related Projects</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <Link 
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="group block"
            >
              <div className="relative aspect-video w-full overflow-hidden rounded-lg mb-4">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-primary">
                {project.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {project.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
} 