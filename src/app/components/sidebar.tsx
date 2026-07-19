"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, User, LogOut, Bookmark } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { signOut } from "@/lib/actions/auth"
import { ThemeToggle } from "./theme-toggle"
import type { Profile } from "@/lib/types/database.types"

interface SidebarProps {
  user: Profile
}

const navItems = [
  { href: "/", label: "Início", icon: Home },
  { href: "/notifications", label: "Notificações", icon: Bookmark },
  { href: "/profile", label: "Perfil", icon: User },
]

export function Sidebar({ user }: SidebarProps) {
  const pathname = usePathname()

  const initials = user.full_name
    ? user.full_name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .substring(0, 2)
    : user.username.substring(0, 2).toUpperCase()

  return (
    <div className="flex flex-col h-screen sticky top-0 justify-between py-4 pr-4">
      <div>
        <Link href="/" className="flex items-center gap-2 px-4 mb-6">
          <div className="p-2 rounded-full bg-purple-600">
            <span className="text-white font-bold text-lg">DV</span>
          </div>
          <span className="font-serif text-xl font-bold text-purple-800 dark:text-purple-300 hidden xl:block">
            Diário Virtual
          </span>
        </Link>

        <nav className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-4 px-4 py-3 rounded-full transition-colors ${
                  isActive
                    ? "bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-300 font-bold"
                    : "text-purple-700 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/30"
                }`}
              >
                <item.icon className="h-6 w-6 shrink-0" />
                <span className="text-lg hidden xl:block">{item.label}</span>
              </Link>
            )
          })}

          <Link
            href="/newpost"
            className="flex items-center gap-4 px-4 py-3 rounded-full bg-purple-600 hover:bg-purple-700 text-white transition-colors mt-2"
          >
            <span className="text-lg font-bold hidden xl:block w-full text-center">Pensar</span>
            <span className="xl:hidden text-lg font-bold">+</span>
          </Link>
        </nav>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between px-4">
          <ThemeToggle />
        </div>

        <button
          onClick={() => signOut()}
          className="flex items-center gap-4 px-4 py-3 rounded-full text-purple-700 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/30 transition-colors w-full"
        >
          <LogOut className="h-6 w-6 shrink-0" />
          <span className="text-lg hidden xl:block">Sair</span>
        </button>

        <Link
          href="/profile"
          className="flex items-center gap-3 px-4 py-3 rounded-full hover:bg-purple-50 dark:hover:bg-purple-900/30 transition-colors"
        >
          <Avatar className="h-10 w-10">
            <AvatarImage src={user.avatar_url || undefined} />
            <AvatarFallback className="bg-purple-600 text-white text-sm">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="hidden xl:block text-left min-w-0">
            <p className="text-sm font-medium text-purple-800 dark:text-purple-300 truncate">
              {user.full_name || user.username}
            </p>
            <p className="text-xs text-purple-500 truncate">@{user.username}</p>
          </div>
        </Link>
      </div>
    </div>
  )
}
