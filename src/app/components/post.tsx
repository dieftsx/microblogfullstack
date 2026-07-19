"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LikeButton } from "./like-button"
import { MessageCircle, Share2 } from "lucide-react"

interface PostProps {
  id: string
  title: string
  content: string
  date: string
  author: string
  authorUsername?: string
  authorAvatar?: string | null
  category?: {
    id: string
    name: string
    slug: string
  } | null
  likes_count?: number
  comments_count?: number
  user_has_liked?: boolean
  currentUserId?: string | null
}

export function Post({
  id,
  title,
  content,
  date,
  author,
  authorUsername,
  authorAvatar,
  category,
  likes_count = 0,
  comments_count = 0,
  user_has_liked = false,
  currentUserId,
}: PostProps) {
  const router = useRouter()

  const initials = authorUsername
    ? authorUsername.substring(0, 2).toUpperCase()
    : "??"

  return (
    <article
      className="flex gap-3 px-4 py-3 border-b border-purple-200 dark:border-purple-800 hover:bg-purple-100/50 dark:hover:bg-purple-900/30 transition-colors cursor-pointer"
      onClick={() => router.push(`/post/${id}`)}
    >
      <Link
        href={authorUsername ? `/user/${authorUsername}` : "#"}
        className="shrink-0"
        onClick={(e) => e.stopPropagation()}
      >
        <Avatar className="h-10 w-10">
          <AvatarImage src={authorAvatar || undefined} />
          <AvatarFallback className="bg-purple-600 text-white text-sm">
            {initials}
          </AvatarFallback>
        </Avatar>
      </Link>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 text-sm">
          <Link
            href={authorUsername ? `/user/${authorUsername}` : "#"}
            className="font-bold text-purple-800 dark:text-purple-200 hover:underline truncate"
            onClick={(e) => e.stopPropagation()}
          >
            {author}
          </Link>
          {authorUsername && (
            <span className="text-purple-500 dark:text-purple-400 truncate">@{authorUsername}</span>
          )}
          <span className="text-purple-500 dark:text-purple-400">·</span>
          <span className="text-purple-500 dark:text-purple-400 whitespace-nowrap">{date}</span>
        </div>

        <h3 className="font-bold text-purple-800 dark:text-purple-200 mt-0.5 line-clamp-1">{title}</h3>

        {category && (
          <Link
            href={`/categoria/${category.slug}`}
            className="inline-block text-xs text-purple-500 dark:text-purple-400 hover:underline mt-1"
            onClick={(e) => e.stopPropagation()}
          >
            #{category.name}
          </Link>
        )}

        <p className="text-purple-700 dark:text-purple-300 leading-relaxed mt-1 line-clamp-4 whitespace-pre-wrap break-words">
          {content}
        </p>

        <div className="flex items-center gap-8 mt-3 text-purple-500 dark:text-purple-400">
          <button
            className="flex items-center gap-1.5 hover:text-purple-600 dark:hover:text-purple-300 transition-colors group"
            onClick={(e) => {
              e.stopPropagation()
              router.push(`/post/${id}`)
            }}
          >
            <div className="p-1.5 rounded-full group-hover:bg-purple-100 dark:group-hover:bg-purple-900/50 transition-colors">
              <MessageCircle className="h-4 w-4" />
            </div>
            {comments_count > 0 && <span className="text-sm">{comments_count}</span>}
          </button>

          <LikeButton
            postId={id}
            initialLiked={user_has_liked}
            initialCount={likes_count}
            currentUserId={currentUserId || null}
          />

          <button
            className="flex items-center gap-1.5 hover:text-purple-600 dark:hover:text-purple-300 transition-colors group"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-1.5 rounded-full group-hover:bg-purple-100 dark:group-hover:bg-purple-900/50 transition-colors">
              <Share2 className="h-4 w-4" />
            </div>
          </button>
        </div>
      </div>
    </article>
  )
}
