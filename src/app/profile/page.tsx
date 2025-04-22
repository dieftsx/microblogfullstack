
import { redirect } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

import { getCurrentUser } from "@/lib/actions/auth"
import { Layout } from "../components/layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ProfileForm } from "../components/profile-form"

export default async function ProfilePage() {
  const userData = await getCurrentUser()

  if (!userData?.user) {
    redirect("/login")
  }

  const { profile } = userData

  const initials = profile?.full_name
    ? profile.full_name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .substring(0, 2)
    : profile?.username.substring(0, 2).toUpperCase()

  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center text-purple-700 hover:text-purple-900 mb-6 dark:text-purple-400 dark:hover:text-purple-300"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar
        </Link>

        <Card className="border border-purple-200 bg-white shadow-sm dark:bg-purple-900/50 dark:border-purple-800">
          <CardHeader>
            <CardTitle className="font-serif text-2xl text-purple-800 dark:text-purple-300 flex items-center gap-3">
              <Avatar className="h-10 w-10 bg-purple-200 dark:bg-purple-700">
                {profile?.avatar_url ? (
                  <img src={profile.avatar_url || "/placeholder.svg"} alt={profile.username} />
                ) : (
                  <AvatarFallback className="bg-purple-700 text-white dark:bg-purple-500">{initials}</AvatarFallback>
                )}
              </Avatar>
              Meu Perfil
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ProfileForm profile={profile} />
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}
