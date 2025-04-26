interface ProjectHeaderProps {
  title: string;
  description: string;
  date: string;
  tags: string[];
}

export default function ProjectHeader({ title, description, date, tags }: ProjectHeaderProps) {
  return (
    <div className="mb-8">
      <h1 className="text-4xl font-bold mb-4">{title}</h1>
      <p className="text-lg text-gray-600 mb-4">{description}</p>
      <div className="flex items-center gap-4 text-sm text-gray-500">
        <span>{date}</span>
        <div className="flex gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-gray-100 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
} 