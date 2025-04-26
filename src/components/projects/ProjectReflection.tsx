interface ProjectReflectionProps {
  reflection: string
}

export default function ProjectReflection({ reflection }: ProjectReflectionProps) {
  return (
    <section className="py-16">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">Reflection & Learnings</h2>
        
        <div className="prose prose-lg max-w-none">
          <p>{reflection}</p>
        </div>
      </div>
    </section>
  )
} 