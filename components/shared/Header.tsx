'use client'

import { User } from 'lucide-react'
import Link from 'next/link'
import { logout } from '@/lib/actions/auth.actions'
import { Button } from './Button'

interface HeaderProps {
  userName?: string
  userRole?: 'user' | 'admin'
}

export function Header({ userName, userRole }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href={userRole === 'admin' ? '/admin/dashboard' : '/dashboard'}>
            <h1 className="text-xl font-bold text-gray-900">
              SAA エバンジェリスト
            </h1>
          </Link>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <User className="w-4 h-4" />
            <span>{userName || 'ユーザー'}</span>
          </div>
          
          <form action={logout}>
            <Button type="submit" variant="ghost" size="sm">
              ログアウト
            </Button>
          </form>
        </div>
      </div>
    </header>
  )
}
