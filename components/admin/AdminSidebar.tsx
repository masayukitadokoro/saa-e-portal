'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  Video, 
  HelpCircle, 
  Mail,
  Settings,
  FileText
} from 'lucide-react'

const adminNavItems = [
  { label: 'ダッシュボード', href: '/admin/dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
  { label: 'エバンジェリスト', href: '/admin/evangelists', icon: <Users className="w-5 h-5" /> },
  { label: 'イベント', href: '/admin/events', icon: <Calendar className="w-5 h-5" /> },
  { label: '動画', href: '/admin/videos', icon: <Video className="w-5 h-5" /> },
  { label: 'FAQ', href: '/admin/faqs', icon: <HelpCircle className="w-5 h-5" /> },
  { label: 'お問い合わせ', href: '/admin/inquiries', icon: <Mail className="w-5 h-5" /> },
  { label: 'プログラム設定', href: '/admin/programs', icon: <FileText className="w-5 h-5" /> },
  { label: 'システム設定', href: '/admin/system', icon: <Settings className="w-5 h-5" /> },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-slate-800 min-h-screen">
      <div className="p-4 border-b border-slate-700">
        <p className="text-sm text-slate-400">管理者メニュー</p>
      </div>
      <nav className="p-4 space-y-1">
        {adminNavItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-slate-700 text-white'
                  : 'text-slate-300 hover:bg-slate-700 hover:text-white'
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
