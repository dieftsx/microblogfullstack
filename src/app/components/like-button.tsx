"use client"

import { useState } from "react"
import { Heart } from "lucide-react"
import { toggleLike } from "@/lib/actions/likes"

interface LikeButtonProps {
  postId: string
  initialLiked: boolean
  initialCount: number
  currentUserId: string | null
}

export function LikeButton({ postId, initialLiked, initialCount, currentUserId }: LikeButtonProps) {
  const [liked, setLiked] = useState(initialLiked)
  const [count, setCount] = useState(initialCount)
  const [isLoading, setIsLoading] = useState(false)

  if (!currentUserId) return null

  async function handleToggle() {
    if (isLoading) return
    setIsLoading(true)

    setLiked(!liked)
    setCount(liked ? count - 1 : count + 1)

    const result = await toggleLike(postId)
    if (!result.success) {
      setLiked(liked)
      setCount(count)
    }
    setIsLoading(false)
  }

  return (
    <button
      onClick={(e) => {
        e.stopPropagation()
        handleToggle()
      }}
      disabled={isLoading}
      className="flex items-center gap-1.5 text-purple-500 dark:text-purple-400 transition-colors group"
    >
      <div className={`p-1.5 rounded-full transition-colors ${
        liked
          ? "text-pink-500"
          : "group-hover:text-pink-500 group-hover:bg-pink-100 dark:group-hover:bg-pink-900/30"
      }`}>
        <Heart
          className={`h-4 w-4 transition-colors ${
            liked ? "fill-pink-500 text-pink-500" : ""
          }`}
        />
      </div>
      {count > 0 && <span className="text-sm">{count}</span>}
    </button>
  )
}
