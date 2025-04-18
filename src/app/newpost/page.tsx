"use client"

import type React from "react"

import { useState } from "react"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"

export default function NovoPost() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aqui seria implementada a lógica para salvar o post
    // Por enquanto apenas simulamos e redirecionamos
    console.log({ title, content })
    window.location.href = "/"
  }

  return (
    <div className="min-h-screen bg-purple-50">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-12 text-center">
          <h1 className="font-serif text-4xl font-bold text-purple-800 mb-2">Diário Virtual</h1>
          <p className="text-purple-600 italic">Seus pensamentos, preservados com simplicidade</p>
        </header>

        <div className="max-w-2xl mx-auto">
          <Link href="/" className="inline-flex items-center text-purple-700 hover:text-purple-900 mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
          </Link>

          <div className="bg-white p-6 rounded-lg border border-purple-200 shadow-sm">
            <h2 className="font-serif text-2xl text-purple-700 mb-6">Novo Pensamento</h2>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-medium text-purple-700 mb-1">
                  Título
                </label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="border-purple-300 focus:border-purple-500 focus:ring-purple-500"
                  placeholder="Um título para seu pensamento..."
                  required
                />
              </div>

              <div className="mb-6">
                <label htmlFor="content" className="block text-sm font-medium text-purple-700 mb-1">
                  Conteúdo
                </label>
                <Textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="min-h-[200px] border-purple-300 focus:border-purple-500 focus:ring-purple-500"
                  placeholder="Escreva seu pensamento aqui..."
                  required
                />
              </div>

              <Button type="submit" className="w-full bg-purple-700 hover:bg-purple-800">
                Salvar Pensamento
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
