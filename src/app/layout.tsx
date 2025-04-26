import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from 'next-themes'
import { ArticleProvider } from '@/context/ArticleContext'
import ArticleView from '@/components/ArticleView'
import { SceneProvider } from '@/context/SceneContext'
import { SharedLayoutProvider } from '@/context/SharedLayoutContext'
import SharedLayout from '@/components/SharedLayout'
import LayoutWrapper from '@/components/LayoutWrapper'
import ProjectTransitionLayer from '@/components/ProjectTransitionLayer'
import { ProjectModalProvider } from '@/context/ProjectModalContext'
import ProjectModal from '@/components/ProjectModal'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'A showcase of my work and projects',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-background text-foreground antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SceneProvider>
            <SharedLayoutProvider>
              <ProjectModalProvider>
                <ArticleProvider>
                  <SharedLayout>
                    <LayoutWrapper>
                      <main className="flex-1">
                        {children}
                      </main>
                    </LayoutWrapper>
                    <ProjectTransitionLayer />
                    <ProjectModal />
                  </SharedLayout>
                  <ArticleView />
                </ArticleProvider>
              </ProjectModalProvider>
            </SharedLayoutProvider>
          </SceneProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
