"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Search, X, Users } from "lucide-react"
import { getFriends, searchUsers, removeFriend } from "@/lib/actions/friends"
import { FriendRequests } from "./friend-requests"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { Profile } from "@/lib/types/database.types"

interface FriendItem {
  id: string
  friend_id: string
  friend_profile: Profile
}

export function FriendsSidebar() {
  const router = useRouter()
  const [friends, setFriends] = useState<FriendItem[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<Profile[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getFriends().then((data) => {
      setFriends(data as FriendItem[])
      setIsLoading(false)
    })
  }, [])

  async function handleSearch(query: string) {
    setSearchQuery(query)
    if (!query.trim()) {
      setSearchResults([])
      setIsSearching(false)
      return
    }
    setIsSearching(true)
    const results = await searchUsers(query)
    setSearchResults(results)
  }

  async function handleRemoveFriend(friendId: string) {
    const result = await removeFriend(friendId)
    if (result.success) {
      setFriends((prev) => prev.filter((f) => f.friend_id !== friendId))
    }
  }

  return (
    <div className="w-full">
      <FriendRequests />

      <div className="flex items-center gap-2 mb-4">
        <Users className="h-4 w-4 text-purple-500 dark:text-purple-400" />
        <h3 className="font-serif text-lg text-purple-700 dark:text-purple-300">Amigos</h3>
      </div>

      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-purple-400" />
        <Input
          placeholder="Buscar usuário..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="pl-9 bg-purple-50 dark:bg-purple-900/50 border-purple-200 dark:border-purple-700 text-purple-800 dark:text-purple-200 placeholder:text-purple-400"
        />
        {isSearching && (
          <button
            onClick={() => {
              setSearchQuery("")
              setSearchResults([])
              setIsSearching(false)
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2"
          >
            <X className="h-4 w-4 text-purple-400" />
          </button>
        )}
      </div>

      {isSearching && searchResults.length > 0 && (
        <div className="mb-4 p-2 rounded-lg bg-purple-50 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-700/50 space-y-1">
          {searchResults.map((user) => (
            <div
              key={user.id}
              className="flex items-center gap-2 p-2 rounded hover:bg-purple-100 dark:hover:bg-purple-800/30 cursor-pointer"
              onClick={() => router.push(`/user/${user.username}`)}
            >
              <Avatar className="h-7 w-7">
                <AvatarImage src={user.avatar_url || undefined} />
                <AvatarFallback className="bg-purple-600 text-white text-xs">
                  {user.username.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm text-purple-700 dark:text-purple-200">@{user.username}</span>
            </div>
          ))}
        </div>
      )}

      {isSearching && searchResults.length === 0 && searchQuery.trim() && (
        <p className="text-sm text-purple-500 mb-4">Nenhum usuário encontrado.</p>
      )}

      {isLoading ? (
        <p className="text-sm text-purple-500">Carregando...</p>
      ) : friends.length === 0 ? (
        <p className="text-sm text-purple-500">Nenhum amigo ainda. Busque acima para adicionar.</p>
      ) : (
        <div className="space-y-1">
          {friends.map((f) => (
            <div
              key={f.id}
              className="flex items-center justify-between p-2 rounded hover:bg-purple-100 dark:hover:bg-purple-800/30 group cursor-pointer"
              onClick={() => router.push(`/user/${f.friend_profile?.username}`)}
            >
              <div className="flex items-center gap-2 min-w-0">
                <Avatar className="h-8 w-8 shrink-0">
                  <AvatarImage src={f.friend_profile?.avatar_url || undefined} />
                  <AvatarFallback className="bg-purple-600 text-white text-xs">
                    {f.friend_profile?.username?.substring(0, 2).toUpperCase() || "??"}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-purple-800 dark:text-purple-200 truncate">
                    {f.friend_profile?.full_name || f.friend_profile?.username}
                  </p>
                  <p className="text-xs text-purple-500 truncate">@{f.friend_profile?.username}</p>
                </div>
              </div>
              <Button
                size="sm"
                variant="ghost"
                onClick={(e) => {
                  e.stopPropagation()
                  handleRemoveFriend(f.friend_id)
                }}
                className="opacity-0 group-hover:opacity-100 text-purple-500 hover:text-red-400 h-7 text-xs transition-opacity shrink-0"
              >
                Remover
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
