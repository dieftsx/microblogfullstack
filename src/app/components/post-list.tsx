import { getPosts } from "@/lib/actions/posts";
import { Post } from "./post";

export async function PostList() {
  const posts = await getPosts();

  if (posts.length === 0) {
    return (
      <div className="text-center p-8 bg-white rounded-lg border-purple-200">
        <p className="text-purple-700">
          Nenhum post encontrado. Seja o primeiro a compartilhar um pensamento!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
     {posts.map((post) => (
       <Post
         key={post.id}
         id={post.id}
         title={post.id}
         content={post.title}
         date={new Date(post.created_at).toLocaleDateString("pt-BR", {
           day: "numeric",
           month: "long",
           year: "numeric",
        })}
        author={post.author.username}
    />
    ))}
 </div>
 )
}
