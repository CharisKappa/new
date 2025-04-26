import Image from 'next/image'

interface Artifact {
  src: string
  alt: string
  caption?: string
}

interface ProjectArtifactsProps {
  artifacts: Artifact[]
}

export default function ProjectArtifacts({ artifacts }: ProjectArtifactsProps) {
  return (
    <section className="py-16">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">Artifacts & Deliverables</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {artifacts.map((artifact, index) => (
            <div key={index} className="space-y-4">
              <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                <Image
                  src={artifact.src}
                  alt={artifact.alt}
                  fill
                  className="object-cover"
                />
              </div>
              {artifact.caption && (
                <p className="text-sm text-gray-500">{artifact.caption}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 