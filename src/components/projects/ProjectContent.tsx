import Image from 'next/image'
import ProjectHeader from './ProjectHeader'

interface ProjectContentProps {
  title: string;
  description: string;
  date: string;
  tags: string[];
  imageUrl: string;
  imageAlt: string;
  content: string;
}

export default function ProjectContent({
  title,
  description,
  date,
  tags,
  imageUrl,
  imageAlt,
  content,
}: ProjectContentProps) {
  return (
    <article className="max-w-4xl mx-auto py-8">
      <ProjectHeader
        title={title}
        description={description}
        date={date}
        tags={tags}
      />
      
      <div className="relative w-full h-[400px] mb-8">
        <Image
          src={imageUrl}
          alt={imageAlt}
          fill
          className="object-cover rounded-lg"
          priority
        />
      </div>

      <div className="prose prose-lg max-w-none">
        {content}
      </div>
    </article>
  )
} 