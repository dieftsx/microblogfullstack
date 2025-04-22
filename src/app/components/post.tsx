"use client"

import { CalendarDays, Tag, User } from "lucide-react"
import Link from "next/link"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface PostProps {
  id: string
  title: string
  content: string
  date: string
  author: string
  category?: {
    id: string
    name: string
    slug: string
  } | null
}

export function Post({ id, title, content, date, author, category }: PostProps) {
  return (
    <Link href={`/post/${id}`}>
      <Card className="border border-purple-200 bg-white shadow-sm hover:shadow-md transition-shadow dark:bg-purple-900/50 dark:border-purple-800">
        <CardHeader className="pb-2">
          <CardTitle className="font-serif text-xl text-purple-800 dark:text-purple-300">{title}</CardTitle>
          <div className="flex flex-wrap items-center justify-between text-xs text-purple-500 dark:text-purple-400 mt-1 gap-y-1">
            <div className="flex items-center">
              <CalendarDays className="h-3 w-3 mr-1" />
              {date}
            </div>
            <div className="flex items-center">
              <User className="h-3 w-3 mr-1" />
              {author}
            </div>
          </div>
          {category && (
            <div className="mt-2">
              <Link
                href={`/categoria/${category.slug}`}
                className="inline-flex items-center text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full hover:bg-purple-200 dark:bg-purple-800 dark:text-purple-300 dark:hover:bg-purple-700"
                onClick={(e) => e.stopPropagation()}
              >
                <Tag className="h-3 w-3 mr-1" />
                {category.name}
              </Link>
            </div>
          )}
        </CardHeader>
        <CardContent>
          <p className="text-purple-900 dark:text-purple-200 leading-relaxed line-clamp-3">{content}</p>
        </CardContent>
      </Card>
    </Link>
  )
}
