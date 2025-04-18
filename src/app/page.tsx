import Link from "next/link"
import { PenLine } from "lucide-react"

import { Button } from "@/components/ui/button"
import { PostList } from "@/app/components/post-list"

export default function Home() {
  return (
    <div className="min-h-screen bg-purple-50">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-12 text-center">
          <h1 className="font-serif text-4xl font-bold text-purple-800 mb-2">Diário Virtual</h1>
          <p className="text-purple-600 italic">Seus pensamentos, preservados com simplicidade</p>
        </header>

        <div className="max-w-2xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="font-serif text-2xl text-purple-700">Meus Pensamentos</h2>
            <Link href="/novo-post">
              <Button className="bg-purple-700 hover:bg-purple-800">
                <PenLine className="mr-2 h-4 w-4" />
                Novo Pensamento
              </Button>
            </Link>
          </div>

          <PostList />
        </div>
      </div>
    </div>
  )
}
