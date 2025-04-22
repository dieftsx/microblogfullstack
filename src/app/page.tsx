
import { NavBar } from "./components/nav-bar"
import { PostList } from "./components/post-list"

export default function Home() {
  return (
    <div className="min-h-screen bg-purple-50">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-12 text-center">
          <h1 className="font-serif text-4xl font-bold text-purple-800 mb-2">Diário Virtual</h1>
          <p className="text-purple-600 italic">Seus pensamentos, preservados com simplicidade</p>
        </header>

        <div className="max-w-2xl mx-auto">
          <NavBar />
          <PostList />
        </div>
      </div>
    </div>
  )
}
