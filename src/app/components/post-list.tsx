import { getPosts } from "@/lib/actions/posts"
import { Post } from "./post"

export async function PostList() {
  const posts = await getPosts()

  if (posts.length === 0) {
    return (
      <div className="text-center p-8 bg-white rounded-lg border border-purple-200 dark:bg-purple-900/50 dark:border-purple-800 dark:text-purple-300">
        <p className="text-purple-700 dark:text-purple-400">
          Nenhum post encontrado. Seja o primeiro a compartilhar um pensamento!
        </p>
      </div>
    )
  }

  return (
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
  )
}
