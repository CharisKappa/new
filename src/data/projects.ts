export interface Project {
  slug: string
  title: string
  description: string
  coverImage: string
  tags: string[]
  isDuotone?: boolean
  role?: string
  timeline?: string
  team?: string
  tools?: string[]
  context: string
  contextImage?: string
  process: string
  processImages?: {
    src: string
    alt: string
    type: 'full' | 'side' | 'grid'
    caption?: string
  }[]
  artifacts?: {
    src: string
    alt: string
    caption?: string
  }[]
  results: string
  resultMetrics?: {
    label: string
    value: string
    change?: string
    type?: 'increase' | 'decrease'
  }[]
  quotes?: {
    text: string
    author: string
    role: string
  }[]
  reflection: string
  relatedProjects?: {
    slug: string
    title: string
    description: string
    image: string
  }[]
}

export const projects: Project[] = [
  {
    slug: 'sample-project',
    title: 'Sample Project',
    description: 'A demonstration of the project showcase components',
    coverImage: '/images/projects/sample/cover.jpg',
    tags: ['Web Development', 'UI/UX Design'],
    role: 'Lead Developer',
    timeline: 'Q1 2024',
    team: '3 members',
    tools: ['React', 'TypeScript', 'Next.js'],
    context: 'This is a sample project to demonstrate the various components of the project showcase. It includes different sections like challenges, process, artifacts, results, and reflections.',
    contextImage: '/images/projects/sample/context.jpg',
    process: 'The project followed an agile methodology with regular sprints and stakeholder feedback sessions. We focused on user-centered design and iterative development.',
    processImages: [
      {
        src: '/images/projects/sample/process-1.jpg',
        alt: 'Initial wireframes',
        type: 'full',
        caption: 'Initial wireframes showing the user flow'
      }
    ],
    artifacts: [
      {
        src: '/images/projects/sample/artifact-1.jpg',
        alt: 'Final design',
        caption: 'Final UI design implementation'
      }
    ],
    results: 'The project successfully achieved its goals, improving user engagement and satisfaction metrics.',
    resultMetrics: [
      {
        label: 'User Engagement',
        value: '+45%',
        change: 'increase',
        type: 'increase'
      }
    ],
    quotes: [
      {
        text: 'The team delivered an exceptional product that exceeded our expectations.',
        author: 'John Doe',
        role: 'Product Manager'
      }
    ],
    reflection: 'This project taught us valuable lessons about user-centered design and the importance of regular stakeholder feedback.',
    relatedProjects: [
      {
        slug: 'another-project',
        title: 'Another Project',
        description: 'A related project with similar technologies',
        image: '/images/projects/another/cover.jpg'
      }
    ]
  }
] 