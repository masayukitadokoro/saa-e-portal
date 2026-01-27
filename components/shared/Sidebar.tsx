'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  BarChart3, 
  Calendar, 
  Video, 
  HelpCircle, 
  Mail, 
  User,
  Trophy
} from 'lucide-react'

interface NavItem {
  label: string
  href: string
  icon: React.ReactNode
}

const userNavItems: NavItem[] = [
  { label: 'ダッシュボード', href: '/dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
  { label: '実績', href: '/results', icon: <BarChart3 className="w-5 h-5" /> },
  { label: 'ランキング', href: '/ranking', icon: <Trophy className="w-5 h-5" /> },
  { label: '活動予定', href: '/events', icon: <Calendar className="w-5 h-5" /> },
  { label: '動画', href: '/videos', icon: <Video className="w-5 h-5" /> },
  { label: 'FAQ', href: '/faq', icon: <HelpCircle className="w-5 h-5" /> },
  { label: 'お問い合わせ', href: '/inquiry', icon: <Mail className="w-5 h-5" /> },
  { label: 'マイページ', href: '/mypage', icon: <User className="w-5 h-5" /> },
]

interface SidebarProps {
  items?: NavItem[]
}

export function Sidebar({ items = userNavItems }: SidebarProps) {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen">
      <nav className="p-4 space-y-1">
        {items.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-primary-50 text-primary-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              {item.icon}
              <span className="font-medium">{item.label}</span>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
