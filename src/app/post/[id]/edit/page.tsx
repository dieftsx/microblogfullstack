import { notFound, redirect } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { getPost, updatePost } from "@/lib/actions/posts"
import { getCurrentUser } from "@/lib/actions/auth"
import { PostForm } from "../../../components/post-form"
import { Layout } from "../../../components/layout"

export default async function EditPostPage({ params }: { params: { id: string } }) {
  const post = await getPost(params.id)
  const userData = await getCurrentUser()

  if (!post) {
    notFound()
  }

  if (!userData?.user || userData.user.id !== post.author_id) {
    redirect("/")
  }

  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        <Link
          href={`/post/${post.id}`}
          className="inline-flex items-center text-purple-700 hover:text-purple-900 mb-6 dark:text-purple-400 dark:hover:text-purple-300"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar para o post
        </Link>

        <div className="bg-white p-6 rounded-lg border border-purple-200 shadow-sm dark:bg-purple-900/50 dark:border-purple-800">
          <h2 className="font-serif text-2xl text-purple-700 dark:text-purple-300 mb-6">Editar Pensamento</h2>

          <PostForm
            action={(formData) => updatePost(post.id, formData)}
            defaultValues={{
              title: post.title,
              content: post.content,
              category_id: post.category_id,
            }}
            submitLabel="Salvar Alterações"
          />
        </div>
      </div>
    </Layout>
  )
}
