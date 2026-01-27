'use client'

import { useState } from 'react'
import { Button, Input } from '@/components/shared'
import { updateProfile } from '@/lib/actions/user.actions'

interface ProfileFormProps {
  userId: string
  initialData: {
    name: string
    email: string
  }
}

export function ProfileForm({ userId, initialData }: ProfileFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  async function handleSubmit(formData: FormData) {
    setIsLoading(true)
    setMessage(null)
    
    const result = await updateProfile(userId, formData)
    
    if (result.error) {
      setMessage({ type: 'error', text: result.error })
    } else {
      setMessage({ type: 'success', text: 'プロフィールを更新しました' })
    }
    
    setIsLoading(false)
  }

  return (
    <form action={handleSubmit} className="space-y-6">
      {message && (
        <div className={`p-3 rounded-lg text-sm ${
          message.type === 'success' 
            ? 'bg-green-50 text-green-700' 
            : 'bg-red-50 text-red-700'
        }`}>
          {message.text}
        </div>
      )}

      <Input
        id="name"
        name="name"
        label="名前"
        defaultValue={initialData.name}
        required
      />

      <Input
        id="email"
        name="email"
        type="email"
        label="メールアドレス"
        defaultValue={initialData.email}
        disabled
        className="bg-gray-50"
      />

      <div className="flex justify-end">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? '保存中...' : '保存する'}
        </Button>
      </div>
    </form>
  )
}
