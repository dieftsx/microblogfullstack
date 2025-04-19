'use server'

import { createServerSupabaseClient } from "../supabase/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"


export async function signUp(formData: FormData) {
    const supabase = createServerSupabaseClient()


    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const username = formData.get("username") as string
    const fullName = formData.get("fullName") as string

    const { data, error } = await supabase.auth.signUp({
     email,
     password,
     options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
        data: {
          username,
          full_name: fullName,
        },
     },

 })

 if (error) {
    return {success: false, error: error.message}
 }

  if (data.user) {
    await supabase.from("profiles").insert({
      id: data.user.id,
      username,
      full_name: fullName,
    })
  }

  return { success: true }

}

export async function signIn(formData: FormData){
  const supabase = createServerSupabaseClient()

  const email = formData.get("email") as string
  const password = formData.get("password") as string

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password
  })

  if ( error) {
    return { success: false, error: error.message}
  }

  revalidatePath("/")
  redirect("/")

}



export async function signOut(){
    const supabase = createServerSupabaseClient()
    await supabase.auth.signOut()
    revalidatePath("/")
    redirect("/")
}



export async function getCurrentUser(){
  const supabase = createServerSupabaseClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    return null
  }

  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  return { user, profile } }
