"use server"

import { createServerSupabaseClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function toggleLike(postId: string) {
  const supabase = await createServerSupabaseClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { success: false, error: "Não autenticado." }
  }

  const { data: existing } = await supabase
    .from("likes")
    .select("id")
    .eq("user_id", user.id)
    .eq("post_id", postId)
    .maybeSingle()

  if (existing) {
    const { error } = await supabase.from("likes").delete().eq("id", existing.id)
    if (error) {
      console.error("Erro ao descurtir:", error.message)
      return { success: false, error: error.message }
    }
  } else {
    const { error } = await supabase.from("likes").insert({
      user_id: user.id,
      post_id: postId,
    })
    if (error) {
      console.error("Erro ao curtir:", error.message)
      return { success: false, error: error.message }
    }
  }

  revalidatePath("/")
  return { success: true, liked: !existing }
}

export async function getPostLikeInfo(postId: string) {
  const supabase = await createServerSupabaseClient()

  const { count } = await supabase
    .from("likes")
    .select("id", { count: "exact", head: true })
    .eq("post_id", postId)

  const {
    data: { user },
  } = await supabase.auth.getUser()

  let userHasLiked = false
  if (user) {
    const { data } = await supabase
      .from("likes")
      .select("id")
      .eq("user_id", user.id)
      .eq("post_id", postId)
      .maybeSingle()

    userHasLiked = !!data
  }

  return { likes_count: count || 0, user_has_liked: userHasLiked }
}
