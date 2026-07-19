import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, CalendarDays } from "lucide-react"

import { getProfileByUsername, getCurrentUser } from "@/lib/actions/auth"
import { getPostsByAuthor } from "@/lib/actions/posts"
import { getPostLikeInfo } from "@/lib/actions/likes"
import { getCommentsCount } from "@/lib/actions/comments"
import { PageLayout } from "@/components/page-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AddFriendButton } from "../../components/add-friend-button"
import { Post } from "../../components/post"

export default async function UserPage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params
  const profile = await getProfileByUsername(username)

  if (!profile) {
    notFound()
  }

  const userData = await getCurrentUser()
  const posts = await getPostsByAuthor(profile.id)

  const initials = profile.full_name
    ? profile.full_name
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .toUpperCase()
        .substring(0, 2)
    : profile.username.substring(0, 2).toUpperCase()

  const postsWithInfo = await Promise.all(
    posts.map(async (post: { id: string; title: string; content: string; created_at: string; author: { username: string; full_name?: string; avatar_url?: string | null } | null; category: { id: string; name: string; slug: string } | null }) => {
      const [likeInfo, commentsCount] = await Promise.all([
        getPostLikeInfo(post.id),
        getCommentsCount(post.id),
      ])
      return {
        ...post,
        likes_count: likeInfo.likes_count,
        user_has_liked: likeInfo.user_has_liked,
        comments_count: commentsCount,
      }
    }),
  )

  return (
    <PageLayout>
      <div className="max-w-2xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center text-purple-700 hover:text-purple-900 mb-6 dark:text-purple-400 dark:hover:text-purple-300"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar
        </Link>

        <Card className="border border-purple-200 bg-white shadow-sm dark:bg-purple-900/50 dark:border-purple-800 mb-8">
          <CardHeader>
            <div className="flex items-start justify-between">
              <CardTitle className="font-serif text-2xl text-purple-800 dark:text-purple-300 flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={profile.avatar_url || undefined} />
                  <AvatarFallback className="bg-purple-600 text-white">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p>{profile.full_name || profile.username}</p>
                  <p className="text-sm font-normal text-purple-500 dark:text-purple-400">@{profile.username}</p>
                </div>
              </CardTitle>

              {userData?.user && userData.user.id !== profile.id && (
                <AddFriendButton userId={profile.id} currentUserId={userData.user.id} />
              )}
            </div>
          </CardHeader>
          <CardContent>
            {profile.bio && (
              <p className="text-purple-700 dark:text-purple-300 mb-4">{profile.bio}</p>
            )}
            <div className="flex items-center gap-4 text-sm text-purple-500 dark:text-purple-400">
              <div className="flex items-center gap-1">
                <CalendarDays className="h-4 w-4" />
                Membro desde {new Date(profile.created_at).toLocaleDateString("pt-BR", {
                  month: "long",
                  year: "numeric",
                })}
              </div>
              <div>
                {posts.length} {posts.length === 1 ? "post" : "posts"}
              </div>
            </div>
          </CardContent>
        </Card>

        <h2 className="font-serif text-xl text-purple-800 dark:text-purple-300 mb-4">Posts</h2>

        {postsWithInfo.length === 0 ? (
          <div className="text-center p-8 bg-white rounded-lg border border-purple-200 dark:bg-purple-900/50 dark:border-purple-800">
            <p className="text-purple-700 dark:text-purple-400">
              Este usuário ainda não publicou nada.
            </p>
          </div>
        ) : (
          <div className="space-y-10">
            {postsWithInfo.map((post) => (
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
                author={post.author?.username || "Usuário desconhecido"}
                authorUsername={post.author?.username}
                category={post.category}
                likes_count={post.likes_count}
                comments_count={post.comments_count}
                user_has_liked={post.user_has_liked}
                currentUserId={userData?.user?.id}
              />
            ))}
          </div>
        )}
      </div>
    </PageLayout>
  )
}
