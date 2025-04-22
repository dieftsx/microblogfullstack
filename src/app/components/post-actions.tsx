
"use client"

import Link from "next/link"
import { Edit, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { deletePost } from "@/lib/actions/posts"
import { useState } from "react"

interface PostActionsProps {
  postId: string
}

export function PostActions({ postId }: PostActionsProps) {
  const [isDeleting, setIsDeleting] = useState(false)

  async function handleDelete() {
    setIsDeleting(true)
    try {
      await deletePost(postId)
    } catch (error) {
      console.error("Erro ao excluir post:", error)
      setIsDeleting(false)
    }
  }

  return (
    <div className="flex gap-2 mt-8 pt-4 border-t border-purple-100 dark:border-purple-800">
      <form action={handleDelete}>
        <Button type="submit" variant="destructive" size="sm" disabled={isDeleting}>
          <Trash className="h-4 w-4 mr-1" />
          {isDeleting ? "Excluindo..." : "Excluir"}
        </Button>
      </form>
      <Link href={`/post/${postId}/edit`}>
        <Button variant="outline" size="sm" className="dark:border-purple-700 dark:text-purple-300">
          <Edit className="h-4 w-4 mr-1" />
          Editar
        </Button>
      </Link>
    </div>
  )
}
