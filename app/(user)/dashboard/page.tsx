import { createClient } from '@/lib/supabase/server'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/shared'
import { StatusCard } from '@/components/user/StatusCard'
import { 
  BarChart3, 
  Calendar, 
  Video, 
  HelpCircle 
} from 'lucide-react'

export default async function UserDashboard() {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  const { data: profile } = await supabase
    .from('users')
    .select('*')
    .eq('id', user?.id)
    .single()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">ダッシュボード</h1>
        <p className="text-gray-600 mt-1">
          こんにちは、{profile?.name || 'ユーザー'}さん
        </p>
      </div>

      {/* Status Card */}
      <StatusCard 
        status={profile?.status || 'candidate'}
        totalReferrals={profile?.total_referrals || 0}
        totalContracts={profile?.total_contracts || 0}
        score={profile?.score || 0}
      />

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="flex items-center space-x-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <BarChart3 className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">今月の紹介</p>
              <p className="text-2xl font-bold text-gray-900">0件</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center space-x-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <Calendar className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">今後の予定</p>
              <p className="text-2xl font-bold text-gray-900">0件</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center space-x-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Video className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">新着動画</p>
              <p className="text-2xl font-bold text-gray-900">0本</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center space-x-4">
            <div className="p-3 bg-orange-100 rounded-lg">
              <HelpCircle className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">FAQ</p>
              <p className="text-2xl font-bold text-gray-900">検索</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Activity & Events Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>最近の活動</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500 text-center py-8">
              まだ活動記録がありません
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>今後の予定</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500 text-center py-8">
              予定されているイベントはありません
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
