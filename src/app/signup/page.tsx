"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { signIn } from "@/lib/actions/auth";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Login() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false)

  async function handleSubmit(formData: FormData) {
    setError(null);
    setSuccess(false)
    const result = await signIn(formData);

    if (!result.success) {
      setError(result.error);
    } else {
      setSuccess(true)
    }
  }

  return (
    <div className="min-h-screen bg-purple-50">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-12 text-center">
          <h1 className="font-serif text-4xl font-bold text-purple-800 mb-2">
            Diário Virtual
          </h1>
          <p className="text-purple-600 italic">
            Seus pensamentos, preservados com simplicidade
          </p>
        </header>

        <div className="max-w-md mx-auto">
          <Link
            href="/"
            className="inline-flex items-center text-purple-700 hover:text-purple-900 mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
          </Link>
          <Card className="border border-purple-200">
            <CardHeader>
              <CardTitle className="font-serif text-2xl text-center text-purple-800">
                Criar Conta
              </CardTitle>
            </CardHeader>
            <CardContent>
            {success ? (
              <div className="p-4 bg-green-50 border border-green-200 text-green-700 rounded text-center">
                <p className="font-medium mb-2">
                  Cadastro realizado com sucesso!
                </p>
                <p className="text-sm">
                  Verifique seu email para confirmar sua conta.
                </p>
              </div>
              ) : (
              <form action={handleSubmit} className="space-y-4">
                {error && (
                  <div className="p-3 bg-red-50 border-red-200 text-red-700 text-sm rounded">
                    {error}
                  </div>
                )}

                <div className="space-y-1">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-purple-700"
                  >
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="border-purple-300 focus:border-purple-500"
                  />
                </div>

                <div className="space-y-1">
                  <label
                    htmlFor="username"
                    className="text-sm font-medium text-purple-700"
                  >
                    Nome de usuário
                  </label>
                  <Input
                    id="username"
                    name="username"
                    type="username"
                    required
                    className="border-purple-300 focus:border-purple-500"
                  />
                </div>

                <div className="space-y-1">
                  <label
                    htmlFor="fullName"
                    className="text-sm font-medium text-purple-700"
                  >
                    Nome completo
                  </label>
                  <Input
                    id="fullName"
                    name="fullName"
                    type="fullName"
                    required
                    className="border-purple-300 focus:border-purple-500"
                  />
                </div>

                <div className="space-y-1">
                  <label
                    htmlFor="password"
                    className="text-sm font-medium text-purple-700"
                  >
                    Senha
                  </label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="border-purple-300 focus:border-purple-500"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-purple-700 hover:bg-purple-800"
                >
                  Cadastrar
                </Button>
                </form>
              )}
              <div className="mt-4 text-center text-sm">
                <p className="text-purple-600">
                  Já tem conta?{" "}
                  <Link href="/login" className="tet-purple800 hover:underline">
                    Entrar
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
