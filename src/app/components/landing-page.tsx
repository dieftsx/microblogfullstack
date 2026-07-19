"use client"

import { useState } from "react"
import { Users, Heart, MessageCircle, PenLine } from "lucide-react"
import { signIn, signUp } from "@/lib/actions/auth"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export function LandingPage() {
  const [mode, setMode] = useState<"login" | "signup">("login")
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  async function handleLogin(formData: FormData) {
    setError(null)
    const result = await signIn(formData)
    if (!result.success) {
      setError(result.error ?? null)
    }
  }

  async function handleSignup(formData: FormData) {
    setError(null)
    setSuccess(false)
    const result = await signUp(formData)
    if (!result.success) {
      setError(result.error ?? null)
    } else {
      setSuccess(true)
    }
  }

  return (
    <div className="min-h-screen bg-purple-50 dark:bg-[#0f0a1a]">
      <div className="container mx-auto px-4 py-8 lg:py-16">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center max-w-6xl mx-auto">

          <div className="flex-1 text-center lg:text-left">
            <h1 className="font-serif text-5xl lg:text-6xl font-bold text-purple-800 dark:text-purple-300 mb-4">
              Diário Virtual
            </h1>
            <p className="text-lg text-purple-600 dark:text-purple-400 italic mb-8">
              Seus pensamentos, preservados com simplicidade
            </p>
            <p className="text-purple-700 dark:text-purple-300 mb-8 max-w-lg mx-auto lg:mx-0">
              Um espaço minimalista para registrar suas ideias, compartilhar pensamentos e conectar-se com pessoas que pensam como você.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto lg:mx-0">
              <div className="flex items-center gap-3 p-4 rounded-lg bg-white dark:bg-purple-900/50 border border-purple-200 dark:border-purple-800">
                <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-800">
                  <PenLine className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-purple-800 dark:text-purple-300 text-sm">Escreva</p>
                  <p className="text-xs text-purple-500 dark:text-purple-500">Compartilhe seus pensamentos</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 rounded-lg bg-white dark:bg-purple-900/50 border border-purple-200 dark:border-purple-800">
                <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-800">
                  <Heart className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-purple-800 dark:text-purple-300 text-sm">Curta</p>
                  <p className="text-xs text-purple-500 dark:text-purple-500">Reaja aos posts</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 rounded-lg bg-white dark:bg-purple-900/50 border border-purple-200 dark:border-purple-800">
                <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-800">
                  <MessageCircle className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-purple-800 dark:text-purple-300 text-sm">Comente</p>
                  <p className="text-xs text-purple-500 dark:text-purple-500">Interaja com a comunidade</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 rounded-lg bg-white dark:bg-purple-900/50 border border-purple-200 dark:border-purple-800">
                <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-800">
                  <Users className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-purple-800 dark:text-purple-300 text-sm">Conecte-se</p>
                  <p className="text-xs text-purple-500 dark:text-purple-500">Adicione amigos</p>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full max-w-md">
            <Card className="border border-purple-200 dark:bg-purple-900/50 dark:border-purple-800">
              <CardHeader>
                <div className="flex">
                  <button
                    onClick={() => { setMode("login"); setError(null); setSuccess(false) }}
                    className={`flex-1 pb-2 text-sm font-medium border-b-2 transition-colors ${
                      mode === "login"
                        ? "border-purple-600 text-purple-800 dark:text-purple-300"
                        : "border-transparent text-purple-500 hover:text-purple-700"
                    }`}
                  >
                    Entrar
                  </button>
                  <button
                    onClick={() => { setMode("signup"); setError(null); setSuccess(false) }}
                    className={`flex-1 pb-2 text-sm font-medium border-b-2 transition-colors ${
                      mode === "signup"
                        ? "border-purple-600 text-purple-800 dark:text-purple-300"
                        : "border-transparent text-purple-500 hover:text-purple-700"
                    }`}
                  >
                    Cadastrar
                  </button>
                </div>
              </CardHeader>
              <CardContent>
                {mode === "login" ? (
                  <form action={handleLogin} className="space-y-4">
                    {error && (
                      <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded dark:bg-red-900/30 dark:border-red-800 dark:text-red-400">
                        {error}
                      </div>
                    )}

                    <div className="space-y-1">
                      <label htmlFor="email" className="text-sm font-medium text-purple-700 dark:text-purple-300">
                        Email
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        className="border-purple-300 focus:border-purple-500 dark:border-purple-700 dark:bg-purple-900/50 dark:text-purple-100"
                      />
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="password" className="text-sm font-medium text-purple-700 dark:text-purple-300">
                        Senha
                      </label>
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        required
                        className="border-purple-300 focus:border-purple-500 dark:border-purple-700 dark:bg-purple-900/50 dark:text-purple-100"
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-purple-700 hover:bg-purple-800 dark:bg-purple-600 dark:hover:bg-purple-700"
                    >
                      Entrar
                    </Button>
                  </form>
                ) : (
                  <form action={handleSignup} className="space-y-4">
                    {error && (
                      <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded dark:bg-red-900/30 dark:border-red-800 dark:text-red-400">
                        {error}
                      </div>
                    )}

                    {success ? (
                      <div className="p-4 bg-green-50 border border-green-200 text-green-700 rounded text-center dark:bg-green-900/30 dark:border-green-800 dark:text-green-400">
                        <p className="font-medium mb-2">Cadastro realizado!</p>
                        <p className="text-sm">Verifique seu email para confirmar sua conta.</p>
                      </div>
                    ) : (
                      <>
                        <div className="space-y-1">
                          <label htmlFor="email" className="text-sm font-medium text-purple-700 dark:text-purple-300">
                            Email
                          </label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            required
                            className="border-purple-300 focus:border-purple-500 dark:border-purple-700 dark:bg-purple-900/50 dark:text-purple-100"
                          />
                        </div>

                        <div className="space-y-1">
                          <label htmlFor="username" className="text-sm font-medium text-purple-700 dark:text-purple-300">
                            Nome de usuário
                          </label>
                          <Input
                            id="username"
                            name="username"
                            required
                            className="border-purple-300 focus:border-purple-500 dark:border-purple-700 dark:bg-purple-900/50 dark:text-purple-100"
                          />
                        </div>

                        <div className="space-y-1">
                          <label htmlFor="fullName" className="text-sm font-medium text-purple-700 dark:text-purple-300">
                            Nome completo
                          </label>
                          <Input
                            id="fullName"
                            name="fullName"
                            required
                            className="border-purple-300 focus:border-purple-500 dark:border-purple-700 dark:bg-purple-900/50 dark:text-purple-100"
                          />
                        </div>

                        <div className="space-y-1">
                          <label htmlFor="password" className="text-sm font-medium text-purple-700 dark:text-purple-300">
                            Senha
                          </label>
                          <Input
                            id="password"
                            name="password"
                            type="password"
                            required
                            className="border-purple-300 focus:border-purple-500 dark:border-purple-700 dark:bg-purple-900/50 dark:text-purple-100"
                          />
                        </div>

                        <Button
                          type="submit"
                          className="w-full bg-purple-700 hover:bg-purple-800 dark:bg-purple-600 dark:hover:bg-purple-700"
                        >
                          Cadastrar
                        </Button>
                      </>
                    )}
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
