// AQUI É ONDE O SUPABASE VAI TRATAR OS POSTS DOS USUÁRIOS

"use server"

import { createServerSupabaseClient } from "../supabase/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import type { PostWithAuthor } from "../types/database.types"



export async function getPosts(): Promise<PostWithAuthor[]> {

  const supabase = createServerSupabaseClient()

  const { data: posts, error } = await supabase
  .from("posts")
  .select(
    '*, author:profiles(*)')
  .order("created_at", { ascending: false })

  if (error) {
    console.error("erro ao buscar posts:", error)
    return[]
  }

 return posts as PostWithAuthor[]
}

 export async function getPost(id: string): Promise<PostWithAuthor | null>{
  const supabase = createServerSupabaseClient()

  const {data, error } = await supabase
  .from("posts")
  .select('*, author: profiles(*)')
  .eq("id", id)
  .single()

  if (error) {
    console.error("Erro ao buscar post:", error)
      return null
  }
  return data as PostWithAuthor
 }



export async function createPost(formData: formData) {
  const supabase = createServerSupabaseClient()


  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
}
 const title = formData.get("title") as string
 const content = formData.get("content") as string

 const { error } = await supabase.from("posts").insert({
  title,
  content,
  author_id: user.id,
 })

 if (error) {
    console.error("Erro ao criar post:", error)
    return { success: false, error: error.message }
 }
 revalidatePath("/")
 redirect("/")
}

export async function updatePost(id: string, formData: formData) {
  const supabase = createServerSupabaseClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  const title = formData.get("title") as string
  const content = formData.get("content") as string

  const { error } = await supabase
  .from("posts")
  .update({
    title,
    content,
  })
  .eq("id", id)
  .eq("author_id", user.id)

  if (error) {
  console.error("Erro ao atualizar post:", error)
  return { success: false, error: error.message }
  }

  revalidatePath("/")
  revalidatePath(`/post/${id}`)
  redirect(`/post/${id}`)
}

export async function deletePost(id: string) {
 const supabase = createServerSupabaseClient()

 const {
   data: { user },
 } = await supabase.auth.getUser()

 if (!user) {
   redirect("/login")

}
  const { error } = await supabase.from("posts").delete().eq("id", id).eq("author_id", user.id)

  if (error) {
    console.error ("Erro ao excluir post:", error)
    return { success: false, error: error.message }
  }
  revalidatePath("/")
  redirect("/")

}
