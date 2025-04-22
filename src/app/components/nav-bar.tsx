import Link from "next/link"
import { PenLine } from "lucide-react"
import { Button } from "@/components/ui/button"
import { UserMenu } from "../components/user-menu"
import { ThemeToggle } from "../components/theme-toggle"
import { getCurrentUser } from "@/lib/actions/auth"
import { CategoryFilter } from "../components/category-filter"

export async function NavBar() {
  const userData = await getCurrentUser()

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
      <div className="flex items-center gap-2">
        <h2 className="font-serif text-2xl text-purple-700 dark:text-purple-300">Meus Pensamentos</h2>
        <ThemeToggle />
      </div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
        <CategoryFilter />
        {userData?.user ? (
          <div className="flex items-center gap-4">
            <Link href="/newpost">
              <Button className="bg-purple-700 hover:bg-purple-800 dark:bg-purple-600 dark:hover:bg-purple-700">
                <PenLine className="mr-2 h-4 w-4" />
                Novo Pensamento
              </Button>
            </Link>
            <UserMenu user={userData.profile} />
          </div>
        ) : (
          <Link href="/login">
            <Button className="bg-purple-700 hover:bg-purple-800 dark:bg-purple-600 dark:hover:bg-purple-700">
              Entrar
            </Button>
          </Link>
        )}
      </div>
    </div>
  )
}
