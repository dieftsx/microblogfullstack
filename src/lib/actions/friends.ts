"use server"

import { createServerSupabaseClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function addFriend(friendId: string) {
  const supabase = await createServerSupabaseClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { success: false, error: "Não autenticado." }
  }

  if (user.id === friendId) {
    return { success: false, error: "Você não pode adicionar a si mesmo." }
  }

  const { data: existing } = await supabase
    .from("friends")
    .select("id, status")
    .or(`and(user_id.eq.${user.id},friend_id.eq.${friendId}),and(user_id.eq.${friendId},friend_id.eq.${user.id})`)
    .maybeSingle()

  if (existing) {
    if (existing.status === "pending") {
      return { success: false, error: "Pedido de amizade já enviado." }
    }
    return { success: false, error: "Já é seu amigo." }
  }

  const { error } = await supabase.from("friends").insert({
    user_id: user.id,
    friend_id: friendId,
    status: "pending",
  })

  if (error) {
    console.error("Erro ao adicionar amigo:", error.message)
    return { success: false, error: error.message }
  }

  revalidatePath("/")
  return { success: true }
}

export async function acceptFriend(friendId: string) {
  const supabase = await createServerSupabaseClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { success: false, error: "Não autenticado." }
  }

  const { error } = await supabase
    .from("friends")
    .update({ status: "accepted" })
    .eq("user_id", friendId)
    .eq("friend_id", user.id)
    .eq("status", "pending")

  if (error) {
    console.error("Erro ao aceitar amizade:", error.message)
    return { success: false, error: error.message }
  }

  revalidatePath("/")
  return { success: true }
}

export async function rejectFriend(friendId: string) {
  const supabase = await createServerSupabaseClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { success: false, error: "Não autenticado." }
  }

  const { error } = await supabase
    .from("friends")
    .delete()
    .eq("user_id", friendId)
    .eq("friend_id", user.id)
    .eq("status", "pending")

  if (error) {
    console.error("Erro ao rejeitar amizade:", error.message)
    return { success: false, error: error.message }
  }

  revalidatePath("/")
  return { success: true }
}

export async function cancelFriendRequest(friendId: string) {
  const supabase = await createServerSupabaseClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { success: false, error: "Não autenticado." }
  }

  const { error } = await supabase
    .from("friends")
    .delete()
    .eq("user_id", user.id)
    .eq("friend_id", friendId)
    .eq("status", "pending")

  if (error) {
    console.error("Erro ao cancelar pedido:", error.message)
    return { success: false, error: error.message }
  }

  revalidatePath("/")
  return { success: true }
}

export async function removeFriend(friendId: string) {
  const supabase = await createServerSupabaseClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { success: false, error: "Não autenticado." }
  }

  const { error } = await supabase
    .from("friends")
    .delete()
    .or(`and(user_id.eq.${user.id},friend_id.eq.${friendId}),and(user_id.eq.${friendId},friend_id.eq.${user.id})`)

  if (error) {
    console.error("Erro ao remover amigo:", error.message)
    return { success: false, error: error.message }
  }

  revalidatePath("/")
  return { success: true }
}

export async function getFriends() {
  const supabase = await createServerSupabaseClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return []

  const { data: sent } = await supabase
    .from("friends")
    .select("*, friend_profile:profiles!friends_friend_id_fkey(*)")
    .eq("user_id", user.id)
    .eq("status", "accepted")

  const { data: received } = await supabase
    .from("friends")
    .select("*, friend_profile:profiles!friends_user_id_fkey(*)")
    .eq("friend_id", user.id)
    .eq("status", "accepted")

  const allFriends = [
    ...(sent || []).map((f) => ({
      ...f,
      friend_profile: Array.isArray(f.friend_profile) ? f.friend_profile[0] : f.friend_profile,
    })),
    ...(received || []).map((f) => ({
      ...f,
      friend_profile: Array.isArray(f.friend_profile) ? f.friend_profile[0] : f.friend_profile,
    })),
  ]

  const seen = new Set<string>()
  return allFriends.filter((f) => {
    const id = f.friend_profile?.id || f.friend_id
    if (seen.has(id)) return false
    seen.add(id)
    return true
  })
}

export async function getPendingRequests() {
  const supabase = await createServerSupabaseClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return []

  const { data } = await supabase
    .from("friends")
    .select("*, requester:profiles!friends_user_id_fkey(*)")
    .eq("friend_id", user.id)
    .eq("status", "pending")

  return (data || []).map((f) => ({
    ...f,
    requester: Array.isArray(f.requester) ? f.requester[0] : f.requester,
  }))
}

export async function getFriendStatus(friendId: string) {
  const supabase = await createServerSupabaseClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return null

  const { data } = await supabase
    .from("friends")
    .select("status, user_id")
    .or(`and(user_id.eq.${user.id},friend_id.eq.${friendId}),and(user_id.eq.${friendId},friend_id.eq.${user.id})`)
    .maybeSingle()

  if (!data) return null

  return {
    status: data.status,
    isRequester: data.user_id === user.id,
  }
}

export async function searchUsers(query: string) {
  const supabase = await createServerSupabaseClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user || !query.trim()) return []

  const { data } = await supabase
    .from("profiles")
    .select("*")
    .neq("id", user.id)
    .ilike("username", `%${query}%`)
    .limit(10)

  return data || []
}
