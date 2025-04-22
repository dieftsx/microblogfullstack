
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { getPostsByCategorySlug } from "../../../lib/actions/posts"
import { getCategoryBySlug } from "@/lib/actions/categories"
import { Post } from "../../components/post"
import { Layout } from "../../components/layout"
import { NavBar } from "../../components/nav-bar"

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const category = await getCategoryBySlug(params.slug)

  if (!category) {
    notFound()
  }

  const posts = await getPostsByCategorySlug(params.slug)

  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center text-purple-700 hover:text-purple-900 mb-6 dark:text-purple-400 dark:hover:text-purple-300"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar para todos os posts
        </Link>

        <h2 className="font-serif text-2xl text-purple-800 dark:text-purple-300 mb-6">Categoria: {category.name}</h2>

        <NavBar />

        {posts.length === 0 ? (
          <div className="text-center p-8 bg-white rounded-lg border border-purple-200 dark:bg-purple-900/50 dark:border-purple-800 dark:text-purple-300">
            <p className="text-purple-700 dark:text-purple-400">Nenhum post encontrado nesta categoria.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <Post
                key={post.id}
                id={post.id}
                title={post.title}
                content={post.content}
                date={new Date(post.created_at).toLocaleDateString("pt-BR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
                author={post.author.username}
                category={post.category}
              />
            ))}
          </div>
        )}
      </div>
    </Layout>
  )
}
