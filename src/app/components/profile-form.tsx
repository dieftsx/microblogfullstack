
"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { updateProfile } from "@/lib/actions/profile"
import type { Profile } from "../../lib/types/database.types"

interface ProfileFormProps {
  profile: Profile | null
}

export function ProfileForm({ profile }: ProfileFormProps) {
  const [username, setUsername] = useState(profile?.username || "")
  const [fullName, setFullName] = useState(profile?.full_name || "")
  const [avatarUrl, setAvatarUrl] = useState(profile?.avatar_url || "")
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setSuccess(false)
    setIsSubmitting(true)

    try {
      const formData = new FormData(e.currentTarget)
      const result = await updateProfile(formData)

      if (!result.success) {
        setError(result.error)
      } else {
        setSuccess(true)
      }
    } catch (err) {
      setError("Ocorreu um erro ao atualizar o perfil.")
    } finally {
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

      {success && (
        <div className="p-3 mb-4 bg-green-50 border border-green-200 text-green-700 text-sm rounded dark:bg-green-900/30 dark:border-green-800 dark:text-green-400">
          Perfil atualizado com sucesso!
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-purple-700 dark:text-purple-300 mb-1">
            Nome de usuário
          </label>
          <Input
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border-purple-300 focus:border-purple-500 focus:ring-purple-500 dark:border-purple-700 dark:bg-purple-900/50 dark:text-purple-100"
            required
          />
        </div>

        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-purple-700 dark:text-purple-300 mb-1">
            Nome completo
          </label>
          <Input
            id="fullName"
            name="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="border-purple-300 focus:border-purple-500 focus:ring-purple-500 dark:border-purple-700 dark:bg-purple-900/50 dark:text-purple-100"
          />
        </div>

        <div>
          <label htmlFor="avatarUrl" className="block text-sm font-medium text-purple-700 dark:text-purple-300 mb-1">
            URL da foto de perfil
          </label>
          <Input
            id="avatarUrl"
            name="avatarUrl"
            value={avatarUrl}
            onChange={(e) => setAvatarUrl(e.target.value)}
            className="border-purple-300 focus:border-purple-500 focus:ring-purple-500 dark:border-purple-700 dark:bg-purple-900/50 dark:text-purple-100"
            placeholder="https://exemplo.com/imagem.jpg"
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-purple-700 hover:bg-purple-800 dark:bg-purple-600 dark:hover:bg-purple-700"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Salvando..." : "Atualizar Perfil"}
        </Button>
      </div>
    </form>
  )
}
