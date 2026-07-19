"use client"

import { useState, useEffect } from "react"
import { UserPlus, UserMinus, Clock, Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  addFriend,
  removeFriend,
  getFriendStatus,
  acceptFriend,
  rejectFriend,
  cancelFriendRequest,
} from "@/lib/actions/friends"

interface AddFriendButtonProps {
  userId: string
  currentUserId: string | null
}

export function AddFriendButton({ userId, currentUserId }: AddFriendButtonProps) {
  const [status, setStatus] = useState<string | null>(null)
  const [isRequester, setIsRequester] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!currentUserId || currentUserId === userId) {
      setIsLoading(false)
      return
    }
    getFriendStatus(userId).then((result) => {
      setStatus(result?.status || null)
      setIsRequester(result?.isRequester || false)
      setIsLoading(false)
    })
  }, [userId, currentUserId])

  if (!currentUserId || currentUserId === userId) return null

  async function handleAdd() {
    setIsLoading(true)
    const result = await addFriend(userId)
    if (result.success) {
      setStatus("pending")
      setIsRequester(true)
    }
    setIsLoading(false)
  }

  async function handleAccept() {
    setIsLoading(true)
    const result = await acceptFriend(userId)
    if (result.success) {
      setStatus("accepted")
    }
    setIsLoading(false)
  }

  async function handleReject() {
    setIsLoading(true)
    const result = await rejectFriend(userId)
    if (result.success) {
      setStatus(null)
    }
    setIsLoading(false)
  }

  async function handleCancel() {
    setIsLoading(true)
    const result = await cancelFriendRequest(userId)
    if (result.success) {
      setStatus(null)
    }
    setIsLoading(false)
  }

  async function handleRemove() {
    setIsLoading(true)
    const result = await removeFriend(userId)
    if (result.success) {
      setStatus(null)
    }
    setIsLoading(false)
  }

  if (status === "accepted") {
    return (
      <Button
        size="sm"
        variant="outline"
        onClick={handleRemove}
        disabled={isLoading}
        className="border-purple-600 text-purple-400 hover:bg-red-900/20 hover:text-red-400 hover:border-red-600"
      >
        <UserMinus className="h-4 w-4 mr-1" />
        Amigo
      </Button>
    )
  }

  if (status === "pending" && isRequester) {
    return (
      <Button
        size="sm"
        variant="outline"
        onClick={handleCancel}
        disabled={isLoading}
        className="border-purple-600 text-purple-400 hover:bg-purple-800"
      >
        <Clock className="h-4 w-4 mr-1" />
        Pendente
      </Button>
    )
  }

  if (status === "pending" && !isRequester) {
    return (
      <div className="flex gap-1">
        <Button
          size="sm"
          onClick={handleAccept}
          disabled={isLoading}
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          <Check className="h-4 w-4 mr-1" />
          Aceitar
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={handleReject}
          disabled={isLoading}
          className="border-red-600 text-red-400 hover:bg-red-900/20"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    )
  }

  return (
    <Button
      size="sm"
      onClick={handleAdd}
      disabled={isLoading}
      className="bg-purple-600 hover:bg-purple-700 text-white"
    >
      <UserPlus className="h-4 w-4 mr-1" />
      Adicionar
    </Button>
  )
}
