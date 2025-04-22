
"use server"

import { createServerSupabaseClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function updateProfile(formData: FormData) {
  const supabase = createServerSupabaseClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  const username = formData.get("username") as string
  const fullName = formData.get("fullName") as string
  const avatarUrl = formData.get("avatarUrl") as string

  // Verificar se o nome de usuário já existe (exceto para o usuário atual)
  const { data: existingUser, error: checkError } = await supabase
    .from("profiles")
    .select("id")
    .eq("username", username)
    .neq("id", user.id)
    .single()

  if (existingUser) {
    return { success: false, error: "Este nome de usuário já está em uso." }
  }

  const { error } = await supabase
    .from("profiles")
    .update({
      username,
      full_name: fullName || null,
      avatar_url: avatarUrl || null,
    })
    .eq("id", user.id)

  if (error) {
    console.error("Erro ao atualizar perfil:", error)
    return { success: false, error: error.message }
  }

  revalidatePath("/perfil")
  return { success: true }
}
