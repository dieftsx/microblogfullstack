
import { PostList } from "./components/post-list"
import { FriendsSidebar } from "./components/friends-sidebar"
import { getCurrentUser } from "@/lib/actions/auth"
import { LandingPage } from "./components/landing-page"
import { Sidebar } from "./components/sidebar"
import { CategoryFilter } from "./components/category-filter"

export default async function Home() {
  const userData = await getCurrentUser()

  if (!userData?.user) {
    return <LandingPage />
  }

  return (
    <div className="min-h-screen bg-purple-50 dark:bg-[#0f0a1a]">
      <div className="flex max-w-6xl mx-auto">
        <aside className="hidden md:block w-[72px] xl:w-[260px] shrink-0">
          <Sidebar user={userData.profile} />
        </aside>

        <main className="flex-1 min-w-0 border-x border-purple-200 dark:border-purple-800 min-h-screen max-w-[600px]">
          <div className="sticky top-0 z-10 bg-purple-50/80 dark:bg-[#0f0a1a]/80 backdrop-blur-sm border-b border-purple-200 dark:border-purple-800 px-4 py-3">
            <h2 className="font-serif text-xl font-bold text-purple-800 dark:text-purple-300">Início</h2>
          </div>

          <div className="px-4 py-2 border-b border-purple-200 dark:border-purple-800">
            <CategoryFilter />
          </div>

          <PostList />
        </main>

        <aside className="hidden lg:block w-[350px] shrink-0 pl-6 pr-2">
          <div className="sticky top-0 py-4 space-y-4">
            <div className="p-4 rounded-xl border border-purple-200 bg-white dark:bg-purple-900/50 dark:border-purple-800">
              <FriendsSidebar />
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
