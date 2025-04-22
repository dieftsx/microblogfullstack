
"use server"

import { createServerSupabaseClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function getPosts() {
  const supabase = createServerSupabaseClient()

  try {
    const { data: posts, error } = await supabase
      .from("posts")
      .select(`
        *,
        author:profiles(*),
        category:categories(*)
      `)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Erro ao buscar posts:", error)
      return []
    }

    return posts
  } catch (error) {
    console.error("Erro ao buscar posts:", error)
    return []
  }
}

export async function getPostsByCategory(categoryId: string) {
  const supabase = createServerSupabaseClient()

  try {
    const { data: posts, error } = await supabase
      .from("posts")
      .select(`
        *,
        author:profiles(*),
        category:categories(*)
      `)
      .eq("category_id", categoryId)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Erro ao buscar posts por categoria:", error)
      return []
    }

    return posts
  } catch (error) {
    console.error("Erro ao buscar posts por categoria:", error)
    return []
  }
}

export async function getPostsByCategorySlug(slug: string) {
  const supabase = createServerSupabaseClient()

  try {
    const { data: category, error: categoryError } = await supabase
      .from("categories")
      .select("id")
      .eq("slug", slug)
      .single()

    if (categoryError || !category) {
      console.error("Erro ao buscar categoria:", categoryError)
      return []
    }

    return getPostsByCategory(category.id)
  } catch (error) {
    console.error("Erro ao buscar posts por categoria:", error)
    return []
  }
}

export async function getPost(id: string) {
  const supabase = createServerSupabaseClient()

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
      console.error("Erro ao buscar post:", error)
      return null
    }

    return data
  } catch (error) {
    console.error("Erro ao buscar post:", error)
    return null
  }
}

export async function createPost(formData: FormData) {
  const supabase = createServerSupabaseClient()

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
      console.error("Erro ao criar post:", error)
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
  const supabase = createServerSupabaseClient()

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
      console.error("Erro ao atualizar post:", error)
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
  const supabase = createServerSupabaseClient()

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      redirect("/login")
    }

    const { error } = await supabase.from("posts").delete().eq("id", id).eq("author_id", user.id)

    if (error) {
      console.error("Erro ao excluir post:", error)
      return { success: false, error: error.message }
    }

    revalidatePath("/")
    redirect("/")
  } catch (error) {
    console.error("Erro ao excluir post:", error)
    return { success: false, error: "Ocorreu um erro ao excluir o post." }
  }
}
