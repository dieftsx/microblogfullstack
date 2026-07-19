"use client"

import { useState, useEffect } from "react"
import { Bell, Check, X } from "lucide-react"
import { getPendingRequests, acceptFriend, rejectFriend } from "@/lib/actions/friends"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import type { Profile } from "@/lib/types/database.types"

interface RequestItem {
  id: string
  user_id: string
  requester: Profile
}

export function FriendRequests() {
  const [requests, setRequests] = useState<RequestItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getPendingRequests().then((data) => {
      setRequests(data as RequestItem[])
      setIsLoading(false)
    })
  }, [])

  async function handleAccept(requesterId: string) {
    const result = await acceptFriend(requesterId)
    if (result.success) {
      setRequests((prev) => prev.filter((r) => r.user_id !== requesterId))
    }
  }

  async function handleReject(requesterId: string) {
    const result = await rejectFriend(requesterId)
    if (result.success) {
      setRequests((prev) => prev.filter((r) => r.user_id !== requesterId))
    }
  }

  if (isLoading) return null
  if (requests.length === 0) return null

  return (
    <div className="mb-4 p-3 rounded-lg border border-purple-200 bg-white dark:bg-purple-900/50 dark:border-purple-800">
      <div className="flex items-center gap-2 mb-3">
        <Bell className="h-4 w-4 text-purple-500" />
        <h3 className="text-sm font-medium text-purple-800 dark:text-purple-300">
          Pedidos de amizade ({requests.length})
        </h3>
      </div>
      <div className="space-y-2">
        {requests.map((request) => (
          <div key={request.id} className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <Avatar className="h-7 w-7 shrink-0">
                <AvatarImage src={request.requester?.avatar_url || undefined} />
                <AvatarFallback className="bg-purple-600 text-white text-xs">
                  {request.requester?.username?.substring(0, 2).toUpperCase() || "??"}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm text-purple-700 dark:text-purple-300 truncate">
                @{request.requester?.username}
              </span>
            </div>
            <div className="flex gap-1 shrink-0">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => handleAccept(request.user_id)}
                className="h-7 w-7 p-0 text-green-500 hover:text-green-600 hover:bg-green-100 dark:hover:text-green-400 dark:hover:bg-green-900/20"
              >
                <Check className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => handleReject(request.user_id)}
                className="h-7 w-7 p-0 text-red-500 hover:text-red-600 hover:bg-red-100 dark:hover:text-red-400 dark:hover:bg-red-900/20"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
