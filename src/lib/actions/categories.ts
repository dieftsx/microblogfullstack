
"use server"

import { createServerSupabaseClient } from "@/lib/supabase/server"
import type { Category } from "../types/database.types"

export async function getCategories(): Promise<Category[]> {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase.from("categories").select("*").order("name")

  if (error) {
    console.error("Erro ao buscar categorias:", error)
    return []
  }

  return data
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase.from("categories").select("*").eq("slug", slug).single()

  if (error) {
    console.error("Erro ao buscar categoria:", error)
    return null
  }

  return data
}
