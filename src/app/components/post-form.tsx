"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getCategories } from "@/lib/actions/categories"
import type { Category } from "../../lib/types/database.types"

interface PostFormProps {
  action: (formData: FormData) => Promise<any>
  defaultValues?: {
    title?: string
    content?: string
    category_id?: string | null
  }
  submitLabel: string
}

export function PostForm({ action, defaultValues = {}, submitLabel }: PostFormProps) {
  const [title, setTitle] = useState(defaultValues.title || "")
  const [content, setContent] = useState(defaultValues.content || "")
  const [categoryId, setCategoryId] = useState(defaultValues.category_id || "none")
  const [categories, setCategories] = useState<Category[]>([])
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadCategories() {
      try {
        const data = await getCategories()
        setCategories(data)
      } catch (err) {
        console.error("Erro ao carregar categorias:", err)
      } finally {
        setIsLoading(false)
      }
    }

    loadCategories()
  }, [])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setIsSubmitting(true)

    try {
      const formData = new FormData(e.currentTarget)
      formData.set("category_id", categoryId)

      const result = await action(formData)

      if (result && !result.success) {
        setError(result.error)
        setIsSubmitting(false)
      }
    } catch (err) {
      setError("Ocorreu um erro ao salvar o post.")
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <div className="p-3 mb-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded dark:bg-red-900/30 dark:border-red-800 dark:text-red-400">
          {error}
        </div>
      )}

      <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-medium text-purple-700 dark:text-purple-300 mb-1">
          Título
        </label>
        <Input
          id="title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border-purple-300 focus:border-purple-500 focus:ring-purple-500 dark:border-purple-700 dark:bg-purple-900/50 dark:text-purple-100"
          placeholder="Um título para seu pensamento..."
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="category" className="block text-sm font-medium text-purple-700 dark:text-purple-300 mb-1">
          Categoria
        </label>
        <Select value={categoryId} onValueChange={setCategoryId}>
          <SelectTrigger className="border-purple-300 focus:border-purple-500 focus:ring-purple-500 dark:border-purple-700 dark:bg-purple-900/50 dark:text-purple-100">
            <SelectValue placeholder="Selecione uma categoria" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">Sem categoria</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="mb-6">
        <label htmlFor="content" className="block text-sm font-medium text-purple-700 dark:text-purple-300 mb-1">
          Conteúdo
        </label>
        <Textarea
          id="content"
          name="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="min-h-[200px] border-purple-300 focus:border-purple-500 focus:ring-purple-500 dark:border-purple-700 dark:bg-purple-900/50 dark:text-purple-100"
          placeholder="Escreva seu pensamento aqui..."
          required
        />
      </div>

      <Button
        type="submit"
        className="w-full bg-purple-700 hover:bg-purple-800 dark:bg-purple-600 dark:hover:bg-purple-700"
        disabled={isSubmitting || isLoading}
      >
        {isSubmitting ? "Salvando..." : submitLabel}
      </Button>
    </form>
  )
}
