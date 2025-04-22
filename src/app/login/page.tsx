"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { signIn } from "@/lib/actions/auth"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Layout } from "../components/layout"

export default function Login() {
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(formData: FormData) {
    setError(null)
    const result = await signIn(formData)

    if (!result.success) {
      setError(result.error)
    }
  }

  return (
    <Layout>
      <div className="max-w-md mx-auto">
        <Link
          href="/"
          className="inline-flex items-center text-purple-700 hover:text-purple-900 mb-6 dark:text-purple-400 dark:hover:text-purple-300"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar
        </Link>

        <Card className="border border-purple-200 dark:bg-purple-900/50 dark:border-purple-800">
          <CardHeader>
            <CardTitle className="font-serif text-2xl text-center text-purple-800 dark:text-purple-300">
              Entrar
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form action={handleSubmit} className="space-y-4">
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

            <div className="mt-4 text-center text-sm">
              <p className="text-purple-600 dark:text-purple-400">
                Não tem uma conta?{" "}
                <Link href="/signup" className="text-purple-800 hover:underline dark:text-purple-300">
                  Cadastre-se
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}
