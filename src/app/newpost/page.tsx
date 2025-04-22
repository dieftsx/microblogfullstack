
import { redirect } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { createPost } from "@/lib/actions/posts"
import { getCurrentUser } from "@/lib/actions/auth"
import { PostForm } from "../components/post-form"
import { Layout } from "../components/layout"
export default async function NewPost() {
  const userData = await getCurrentUser()

  if (!userData?.user) {
    redirect("/login")
  }

  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center text-purple-700 hover:text-purple-900 mb-6 dark:text-purple-400 dark:hover:text-purple-300"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar
        </Link>

        <div className="bg-white p-6 rounded-lg border border-purple-200 shadow-sm dark:bg-purple-900/50 dark:border-purple-800">
          <h2 className="font-serif text-2xl text-purple-700 dark:text-purple-300 mb-6">Novo Pensamento</h2>

          <PostForm action={createPost} submitLabel="Salvar Pensamento" />
        </div>
      </div>
    </Layout>
  )
}
