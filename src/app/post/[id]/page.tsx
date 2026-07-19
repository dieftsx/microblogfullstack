import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, CalendarDays, Tag, User } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getPost } from "@/lib/actions/posts"
import { getPostLikeInfo } from "@/lib/actions/likes"
import { getCurrentUser } from "@/lib/actions/auth"
import { PageLayout } from "@/components/page-layout"
import { PostActions } from "../../components/post-actions"
import { LikeButton } from "../../components/like-button"
import { CommentSection } from "../../components/comment-section"

export default async function PostPage({ params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const post = await getPost(id)
    const userData = await getCurrentUser()

    if (!post) {
      notFound()
    }

    const isAuthor = userData?.user?.id === post.author_id
    const formattedDate = new Date(post.created_at).toLocaleDateString("pt-BR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })

    const likeInfo = await getPostLikeInfo(post.id)

    return (
      <PageLayout>
        <div className="max-w-2xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center text-purple-700 hover:text-purple-900 mb-6 dark:text-purple-400 dark:hover:text-purple-300"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar para todos os posts
          </Link>

          <Card className="border border-purple-200 bg-white shadow-sm dark:bg-purple-900/50 dark:border-purple-800">
            <CardHeader className="pb-2">
              <CardTitle className="font-serif text-2xl text-purple-800 dark:text-purple-300">{post.title}</CardTitle>
              <div className="flex flex-wrap items-center justify-between text-sm text-purple-500 dark:text-purple-400 mt-2 gap-y-2">
                <div className="flex items-center">
                  <CalendarDays className="h-4 w-4 mr-1" />
                  {formattedDate}
                </div>
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-1" />
                  {post.author?.username || "Usuário desconhecido"}
                </div>
              </div>
              {post.category && (
                <div className="mt-3">
                  <Link
                    href={`/categoria/${post.category.slug}`}
                    className="inline-flex items-center text-sm bg-purple-100 text-purple-700 px-3 py-1 rounded-full hover:bg-purple-200 dark:bg-purple-800 dark:text-purple-300 dark:hover:bg-purple-700"
                  >
                    <Tag className="h-4 w-4 mr-1" />
                    {post.category.name}
                  </Link>
                </div>
              )}
            </CardHeader>
            <CardContent className="pt-4">
              <div className="prose prose-purple max-w-none dark:prose-invert">
                <p className="text-purple-900 dark:text-purple-200 leading-relaxed whitespace-pre-wrap">
                  {post.content}
                </p>
              </div>

              <div className="flex items-center gap-4 mt-6 pt-4 border-t border-purple-100 dark:border-purple-800">
                <LikeButton
                  postId={post.id}
                  initialLiked={likeInfo.user_has_liked}
                  initialCount={likeInfo.likes_count}
                  currentUserId={userData?.user?.id || null}
                />
              </div>

              {isAuthor && <PostActions postId={post.id} />}

              <CommentSection
                postId={post.id}
                currentUserId={userData?.user?.id || null}
              />
            </CardContent>
          </Card>
        </div>
      </PageLayout>
    )
  } catch (error) {
    console.error("Erro ao renderizar página do post:", error)
    return (
      <PageLayout>
        <div className="max-w-2xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center text-purple-700 hover:text-purple-900 mb-6 dark:text-purple-400 dark:hover:text-purple-300"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar para todos os posts
          </Link>

          <Card className="border border-purple-200 bg-white shadow-sm dark:bg-purple-900/50 dark:border-purple-800">
            <CardContent className="py-8">
              <div className="text-center">
                <h2 className="text-xl font-serif text-purple-800 dark:text-purple-300 mb-2">
                  Erro ao carregar o post
                </h2>
                <p className="text-purple-600 dark:text-purple-400">
                  Não foi possível carregar o post. Por favor, tente novamente mais tarde.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </PageLayout>
    )
  }
}
