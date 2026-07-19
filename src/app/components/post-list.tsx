import { getPosts } from "@/lib/actions/posts"
import { getPostLikeInfo } from "@/lib/actions/likes"
import { getCommentsCount } from "@/lib/actions/comments"
import { getCurrentUser } from "@/lib/actions/auth"
import { Post } from "./post"
import type { PostWithAuthor } from "@/lib/types/database.types"

export async function PostList() {
  const posts = await getPosts()
  const userData = await getCurrentUser()

  if (!posts || posts.length === 0) {
    return (
      <div className="text-center p-8 text-purple-500 dark:text-purple-400">
        <p className="text-lg font-bold text-purple-700 dark:text-purple-300 mb-1">Bem-vindo ao seu Diário Virtual!</p>
        <p className="text-sm">Adicione amigos para ver posts aqui, ou seja o primeiro a pensar.</p>
      </div>
    )
  }

  const postsWithInfo = await Promise.all(
    posts.map(async (post) => {
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
    <div>
      {postsWithInfo.map((post) => {
        const author = (post as unknown as PostWithAuthor).author
        return (
          <Post
            key={post.id}
            id={post.id}
            title={post.title}
            content={post.content}
            date={new Date(post.created_at).toLocaleDateString("pt-BR", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
            author={author?.full_name || author?.username || "Usuário"}
            authorUsername={author?.username}
            authorAvatar={author?.avatar_url}
            category={post.category}
            likes_count={(post as { likes_count?: number }).likes_count}
            comments_count={(post as { comments_count?: number }).comments_count}
            user_has_liked={(post as { user_has_liked?: boolean }).user_has_liked}
            currentUserId={userData?.user?.id}
          />
        )
      })}
    </div>
  )
}
