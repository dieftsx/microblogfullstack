"use client"

import { useState, useEffect } from "react"
import { MessageCircle, Trash2 } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { createComment, deleteComment, getComments } from "@/lib/actions/comments"
import type { Profile } from "@/lib/types/database.types"

interface CommentItem {
  id: string
  content: string
  created_at: string
  user_id: string
  author: Profile
}

interface CommentSectionProps {
  postId: string
  currentUserId: string | null
}

export function CommentSection({ postId, currentUserId }: CommentSectionProps) {
  const [comments, setComments] = useState<CommentItem[]>([])
  const [newComment, setNewComment] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    getComments(postId).then((data) => {
      setComments(data as CommentItem[])
      setIsLoading(false)
    })
  }, [postId])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!newComment.trim() || isSubmitting) return

    setIsSubmitting(true)
    const result = await createComment(postId, newComment)
    if (result.success) {
      const updated = await getComments(postId)
      setComments(updated as CommentItem[])
      setNewComment("")
    }
    setIsSubmitting(false)
  }

  async function handleDelete(commentId: string) {
    const result = await deleteComment(commentId, postId)
    if (result.success) {
      setComments((prev) => prev.filter((c) => c.id !== commentId))
    }
  }

  return (
    <div className="mt-8 pt-6 border-t border-purple-800/50">
      <div className="flex items-center gap-2 mb-4">
        <MessageCircle className="h-4 w-4 text-purple-400" />
        <h3 className="font-serif text-lg text-purple-300">
          Comentários {comments.length > 0 && `(${comments.length})`}
        </h3>
      </div>

      {currentUserId && (
        <form onSubmit={handleSubmit} className="mb-6">
          <Textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Escreva um comentário..."
            className="mb-2 bg-purple-900/50 border-purple-700 text-purple-100 placeholder:text-purple-500 min-h-[80px]"
          />
          <Button
            type="submit"
            size="sm"
            disabled={!newComment.trim() || isSubmitting}
            className="bg-purple-600 hover:bg-purple-700 text-white"
          >
            {isSubmitting ? "Enviando..." : "Comentar"}
          </Button>
        </form>
      )}

      {isLoading ? (
        <p className="text-sm text-purple-500">Carregando comentários...</p>
      ) : comments.length === 0 ? (
        <p className="text-sm text-purple-500">Nenhum comentário ainda. Seja o primeiro!</p>
      ) : (
        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="flex gap-3 p-3 rounded-lg bg-purple-900/30">
              <Avatar className="h-8 w-8 shrink-0">
                <AvatarImage src={comment.author?.avatar_url || undefined} />
                <AvatarFallback className="bg-purple-600 text-white text-xs">
                  {comment.author?.username?.substring(0, 2).toUpperCase() || "??"}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <span className="text-sm font-medium text-purple-300">
                      {comment.author?.full_name || comment.author?.username}
                    </span>
                    <span className="text-xs text-purple-500 ml-2">
                      @{comment.author?.username}
                    </span>
                  </div>
                  {currentUserId === comment.user_id && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(comment.id)}
                      className="h-6 w-6 p-0 text-purple-500 hover:text-red-400"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  )}
                </div>
                <p className="text-sm text-purple-200 mt-1 whitespace-pre-wrap">{comment.content}</p>
                <p className="text-xs text-purple-600 mt-1">
                  {new Date(comment.created_at).toLocaleDateString("pt-BR", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
