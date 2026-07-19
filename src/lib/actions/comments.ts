"use server"

import { createServerSupabaseClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function createComment(postId: string, content: string) {
  const supabase = await createServerSupabaseClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { success: false, error: "Não autenticado." }
  }

  if (!content.trim()) {
    return { success: false, error: "O comentário não pode estar vazio." }
  }

  const { error } = await supabase.from("comments").insert({
    user_id: user.id,
    post_id: postId,
    content: content.trim(),
  })

  if (error) {
    console.error("Erro ao criar comentário:", error.message)
    return { success: false, error: error.message }
  }

  revalidatePath(`/post/${postId}`)
  return { success: true }
}

export async function deleteComment(commentId: string, postId: string) {
  const supabase = await createServerSupabaseClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { success: false, error: "Não autenticado." }
  }

  const { error } = await supabase
    .from("comments")
    .delete()
    .eq("id", commentId)
    .eq("user_id", user.id)

  if (error) {
    console.error("Erro ao deletar comentário:", error.message)
    return { success: false, error: error.message }
  }

  revalidatePath(`/post/${postId}`)
  return { success: true }
}

export async function getComments(postId: string) {
  const supabase = await createServerSupabaseClient()

  const { data, error } = await supabase
    .from("comments")
    .select("*, author:profiles(*)")
    .eq("post_id", postId)
    .order("created_at", { ascending: true })

  if (error) {
    console.error("Erro ao buscar comentários:", error.message)
    return []
  }

  return data || []
}

export async function getCommentsCount(postId: string) {
  const supabase = await createServerSupabaseClient()

  const { count } = await supabase
    .from("comments")
    .select("id", { count: "exact", head: true })
    .eq("post_id", postId)

  return count || 0
}
