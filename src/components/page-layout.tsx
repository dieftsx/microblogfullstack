
import type { ReactNode } from "react"
import { ThemeProvider } from "@/app/components/theme-provider"
import { Sidebar } from "@/app/components/sidebar"
import { getCurrentUser } from "@/lib/actions/auth"

interface LayoutProps {
  children: ReactNode
  showSidebar?: boolean
}

export async function PageLayout({ children, showSidebar = true }: LayoutProps) {
  const userData = showSidebar ? await getCurrentUser() : null

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-purple-50 dark:bg-[#0f0a1a] transition-colors duration-200">
        {userData?.user ? (
          <div className="flex max-w-6xl mx-auto">
            <aside className="hidden md:block w-[72px] xl:w-[260px] shrink-0">
              <Sidebar user={userData.profile} />
            </aside>
            <main className="flex-1 min-w-0 min-h-screen max-w-[600px] border-x border-purple-200 dark:border-purple-800">
              {children}
            </main>
            <aside className="hidden lg:block w-[350px] shrink-0" />
          </div>
        ) : (
          <div className="flex justify-center">
            <main className="w-full max-w-[600px] min-h-screen border-x border-purple-200 dark:border-purple-800">
              {children}
            </main>
          </div>
        )}
      </div>
    </ThemeProvider>
  )
}
