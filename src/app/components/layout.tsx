
import type { ReactNode } from "react"
import { ThemeProvider } from "../components/theme-provider"

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-purple-50 dark:bg-purple-950 transition-colors duration-200">
        <div className="container mx-auto px-4 py-8">
          <header className="mb-12 text-center">
            <h1 className="font-serif text-4xl font-bold text-purple-800 dark:text-purple-300 mb-2">Diário Virtual</h1>
            <p className="text-purple-600 dark:text-purple-400 italic">
              Seus pensamentos, preservados com simplicidade
            </p>
          </header>
          {children}
        </div>
      </div>
    </ThemeProvider>
  )
}
