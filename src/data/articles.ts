import { Article } from '@/types/article'

export const articles: Article[] = [
  {
    id: '1',
    slug: 'the-future-of-web-design',
    title: 'The Future of Web Design',
    description: 'Exploring the latest trends and technologies shaping the future of web design.',
    image: '/images/articles/future-of-web-design.jpg',
    content: '...',
    date: '2024-04-16',
    readTime: 5,
    tags: ['Web Design', 'Technology', 'Trends']
  },
  {
    id: '2',
    slug: 'ux-principles',
    title: 'Essential UX Principles',
    description: 'Key principles every designer should know to create better user experiences.',
    image: '/images/articles/ux-principles.jpg',
    content: '...',
    date: '2024-04-15',
    readTime: 4,
    tags: ['UX', 'Design', 'Principles']
  },
  {
    id: 'ecommerce',
    slug: 'ecommerce-redesign',
    title: 'E-commerce Platform Redesign',
    description: 'A complete redesign of an e-commerce platform focusing on user experience and conversion optimization.',
    image: '/images/projects/ecommerce/hero.jpg',
    content: `
      <h2>Project Overview</h2>
      <p>This project involved a complete redesign of an existing e-commerce platform to improve user experience and increase conversion rates.</p>
      
      <h3>Key Features</h3>
      <ul>
        <li>Streamlined checkout process</li>
        <li>Enhanced product discovery</li>
        <li>Improved mobile experience</li>
        <li>Personalized recommendations</li>
      </ul>
      
      <h3>Results</h3>
      <p>The redesign resulted in a 35% increase in conversion rates and a 20% reduction in cart abandonment.</p>
    `,
    date: '2024-04-14',
    readTime: 6,
    tags: ['E-commerce', 'UX', 'Redesign']
  },
  {
    id: 'cosmote',
    slug: 'cosmote-app',
    title: 'Cosmote Mobile App',
    description: 'Designing a mobile app for Greece\'s leading telecommunications provider.',
    image: '/images/projects/cosmote/hero.jpg',
    content: `
      <h2>Project Overview</h2>
      <p>Development of a mobile application for Cosmote, Greece's leading telecommunications provider.</p>
      
      <h3>Key Features</h3>
      <ul>
        <li>Account management</li>
        <li>Bill payment</li>
        <li>Service activation</li>
        <li>Customer support</li>
      </ul>
      
      <h3>Results</h3>
      <p>The app achieved over 1 million downloads in its first month and received a 4.8/5 rating on app stores.</p>
    `,
    date: '2024-04-13',
    readTime: 5,
    tags: ['Mobile', 'App', 'Telecommunications']
  },
  {
    id: 'alpha-bank',
    slug: 'alpha-bank-website',
    title: 'Alpha Bank Website',
    description: 'Redesigning the website for one of Greece\'s largest banks.',
    image: '/images/projects/alpha-bank/hero.jpg',
    content: `
      <h2>Project Overview</h2>
      <p>Complete redesign of Alpha Bank's corporate website to improve user experience and accessibility.</p>
      
      <h3>Key Features</h3>
      <ul>
        <li>Responsive design</li>
        <li>Accessibility improvements</li>
        <li>Performance optimization</li>
        <li>Content strategy</li>
      </ul>
      
      <h3>Results</h3>
      <p>The redesign resulted in a 40% increase in user engagement and improved accessibility scores.</p>
    `,
    date: '2024-04-12',
    readTime: 4,
    tags: ['Banking', 'Web', 'Redesign']
  }
] 