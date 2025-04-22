"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { signUp } from "@/lib/actions/auth"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Layout } from "../components/layout"

export default function SignUp() {
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  async function handleSubmit(formData: FormData) {
    setError(null)
    setSuccess(false)

    const result = await signUp(formData)

    if (!result.success) {
      setError(result.error)
    } else {
      setSuccess(true)
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
              Criar Conta
            </CardTitle>
          </CardHeader>
          <CardContent>
            {success ? (
              <div className="p-4 bg-green-50 border border-green-200 text-green-700 rounded text-center dark:bg-green-900/30 dark:border-green-800 dark:text-green-400">
                <p className="font-medium mb-2">Cadastro realizado com sucesso!</p>
                <p className="text-sm">Verifique seu email para confirmar sua conta.</p>
              </div>
            ) : (
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
              </form>
            )}

            <div className="mt-4 text-center text-sm">
              <p className="text-purple-600 dark:text-purple-400">
                Já tem uma conta?{" "}
                <Link href="/login" className="text-purple-800 hover:underline dark:text-purple-300">
                  Entrar
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}
