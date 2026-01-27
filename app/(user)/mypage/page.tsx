import { createClient } from '@/lib/supabase/server'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/shared'
import { ProfileForm } from '@/components/user/ProfileForm'

export default async function MyPage() {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  const { data: profile } = await supabase
    .from('users')
    .select('*')
    .eq('id', user?.id)
    .single()

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">マイページ</h1>
        <p className="text-gray-600 mt-1">プロフィール情報を確認・編集できます</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>プロフィール編集</CardTitle>
        </CardHeader>
        <CardContent>
          <ProfileForm 
            userId={user?.id || ''}
            initialData={{
              name: profile?.name || '',
              email: profile?.email || '',
            }}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>アカウント情報</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm text-gray-500">ステータス</p>
            <p className="font-medium">{profile?.status || 'candidate'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">登録日</p>
            <p className="font-medium">
              {profile?.created_at 
                ? new Date(profile.created_at).toLocaleDateString('ja-JP')
                : '-'
              }
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
