import { CalendarDays, User } from "lucide-react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface PostProps {
  id: string
  title: string
  content: string
  date: string
  author: string
}

export function Post({ id, title, content, date, author }: PostProps) {
  return (
    <Link href={`/post/${id}`}>
    <Card className="border border-purple-200 bg-white shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <CardTitle className="font-serif text-xl text-purple-800">{title}</CardTitle>
        <div className="flex items-center text-xs text-purple-500 mt-1">
          <CalendarDays className="h-3 w-3 mr-1" />
          {date}
        </div>
        <div className="flex items-center">
           <User className="h-3 w-3 mr-1" />
              {author}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-purple-900 leading-relaxed">{content}</p>
      </CardContent>
    </Card>
    </Link>
  )
}
