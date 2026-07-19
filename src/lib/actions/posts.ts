
"use server"

import { createServerSupabaseClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function getPosts() {
  const supabase = await createServerSupabaseClient()

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) return []

    const { data: sent } = await supabase
      .from("friends")
      .select("friend_id")
      .eq("user_id", user.id)
      .eq("status", "accepted")

    const { data: received } = await supabase
      .from("friends")
      .select("user_id")
      .eq("friend_id", user.id)
      .eq("status", "accepted")

    const friendIds = [...new Set([
      ...(sent || []).map((f) => f.friend_id),
      ...(received || []).map((f) => f.user_id),
    ])]

    const visibleIds = [user.id, ...friendIds]

    const { data, error } = await supabase
      .from("posts")
      .select(`
        *,
        author:profiles(*),
        category:categories(*)
      `)
      .in("author_id", visibleIds)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Erro ao buscar posts:", error.message)
      return []
    }

    return data || []
  } catch (error) {
    console.error("Erro ao buscar posts:", error)
    return []
  }
}

export async function getPostsByCategory(categoryId: string) {
  const supabase = await createServerSupabaseClient()

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) return []

    const { data: sent } = await supabase
      .from("friends")
      .select("friend_id")
      .eq("user_id", user.id)
      .eq("status", "accepted")

    const { data: received } = await supabase
      .from("friends")
      .select("user_id")
      .eq("friend_id", user.id)
      .eq("status", "accepted")

    const friendIds = [...new Set([
      ...(sent || []).map((f) => f.friend_id),
      ...(received || []).map((f) => f.user_id),
    ])]

    const visibleIds = [user.id, ...friendIds]

    const { data, error } = await supabase
      .from("posts")
      .select(`
        *,
        author:profiles(*),
        category:categories(*)
      `)
      .eq("category_id", categoryId)
      .in("author_id", visibleIds)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Erro ao buscar posts por categoria:", error.message)
      return []
    }

    return data || []
  } catch (error) {
    console.error("Erro ao buscar posts por categoria:", error)
    return []
  }
}

export async function getPostsByCategorySlug(slug: string) {
  const supabase = await createServerSupabaseClient()

  try {
    const { data: category, error: categoryError } = await supabase
      .from("categories")
      .select("id")
      .eq("slug", slug)
      .single()

    if (categoryError || !category) {
      console.error("Erro ao buscar categoria:", categoryError?.message)
      return []
    }

    return getPostsByCategory(category.id)
  } catch (error) {
    console.error("Erro ao buscar posts por categoria:", error)
    return []
  }
}

export async function getPost(id: string) {
  const supabase = await createServerSupabaseClient()

  try {
    const { data, error } = await supabase
      .from("posts")
      .select(`
        *,
        author:profiles(*),
        category:categories(*)
      `)
      .eq("id", id)
      .single()

    if (error) {
      console.error("Erro ao buscar post:", error.message)
      return null
    }

    return data
  } catch (error) {
    console.error("Erro ao buscar post:", error)
    return null
  }
}

export async function getPostsByAuthor(authorId: string) {
  const supabase = await createServerSupabaseClient()

  try {
    const { data, error } = await supabase
      .from("posts")
      .select(`
        *,
        author:profiles(*),
        category:categories(*)
      `)
      .eq("author_id", authorId)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Erro ao buscar posts do autor:", error.message)
      return []
    }

    return data || []
  } catch (error) {
    console.error("Erro ao buscar posts do autor:", error)
    return []
  }
}

export async function createPost(formData: FormData) {
  const supabase = await createServerSupabaseClient()

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      redirect("/login")
    }

    const title = formData.get("title") as string
    const content = formData.get("content") as string
    const categoryId = formData.get("category_id") as string

    // Se o valor for "none", defina como null
    const finalCategoryId = categoryId === "none" ? null : categoryId

    const { error } = await supabase.from("posts").insert({
      title,
      content,
      author_id: user.id,
      category_id: finalCategoryId,
    })

    if (error) {
      console.error("Erro ao criar post:", error.message)
      return { success: false, error: error.message }
    }

    revalidatePath("/")
    redirect("/")
  } catch (error) {
    console.error("Erro ao criar post:", error)
    return { success: false, error: "Ocorreu um erro ao criar o post." }
  }
}

export async function updatePost(id: string, formData: FormData) {
  const supabase = await createServerSupabaseClient()

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      redirect("/login")
    }

    const title = formData.get("title") as string
    const content = formData.get("content") as string
    const categoryId = formData.get("category_id") as string

    // Se o valor for "none", defina como null
    const finalCategoryId = categoryId === "none" ? null : categoryId

    const { error } = await supabase
      .from("posts")
      .update({
        title,
        content,
        category_id: finalCategoryId,
      })
      .eq("id", id)
      .eq("author_id", user.id)

    if (error) {
      console.error("Erro ao atualizar post:", error.message)
      return { success: false, error: error.message }
    }

    revalidatePath("/")
    revalidatePath(`/post/${id}`)
    redirect(`/post/${id}`)
  } catch (error) {
    console.error("Erro ao atualizar post:", error)
    return { success: false, error: "Ocorreu um erro ao atualizar o post." }
  }
}

export async function deletePost(id: string) {
  const supabase = await createServerSupabaseClient()

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      redirect("/login")
    }

    const { error } = await supabase.from("posts").delete().eq("id", id).eq("author_id", user.id)

    if (error) {
      console.error("Erro ao excluir post:", error.message)
      return { success: false, error: error.message }
    }

    revalidatePath("/")
    redirect("/")
  } catch (error) {
    console.error("Erro ao excluir post:", error)
    return { success: false, error: "Ocorreu um erro ao excluir o post." }
  }
}
