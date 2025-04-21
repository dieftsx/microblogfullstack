"use client"


import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"


interface PostFormProps {
  action: (formData: FormData) => Promise<any>
  defaultValues?: {
    title?: string
    content?: string
  }
  submitLabel: string

}

export function PostForm({ action, defaultValues, = { }, submitLabel}: PostFormProps) {
  const [title, setTitle] = useState(defaultValues.title || "")
  const [content, setContent] = useState(defaultValues.content || "")
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)


  async function handleSubmit(formData: formData) {
    setError(null)
    setIsSubmitting(true)

    try {
      const result = await action(formData)

      if (result && !result.success) {
        setError(result.error)
        setIsSubmitting(false)
      }
    } catch (err) {
      setError("Ocorreu um erro ao salvar o post...")
      setIsSubmitting(false)
    }
  }
  return (
    <form action={handleSubmit}>
      {error && <div className="p-3 mb-4 bg-red-50 border-red-200 text-red-700 text-sm  rounded">{error}</div>}
      <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-medium text-purple-700 mb-1">
          Título
        </label>
        <Input
          id="title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border-purple-300 focus:border-purple-500 focus: ring-purple-500"
          placeholder="Um título para o seu pensamento..."
          required
        />
      </div>

      <Button type="submit" className="w-full bg-purple-700 hover:bg-purple-800" disabled={isSubmitting}>
        {isSubmitting ? "Salvando..." : submitLabel}
      </Button>
    </form>



  )
}
