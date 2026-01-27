import { Card, CardContent } from '@/components/shared'
import { Award } from 'lucide-react'

interface StatusCardProps {
  status: 'candidate' | 'bronze' | 'silver' | 'gold'
  totalReferrals: number
  totalContracts: number
  score: number
}

const statusConfig = {
  candidate: {
    label: '候補者',
    icon: '📝',
    color: 'bg-gray-100 text-gray-700',
    borderColor: 'border-gray-300',
  },
  bronze: {
    label: 'ブロンズ',
    icon: '🥉',
    color: 'bg-amber-100 text-amber-800',
    borderColor: 'border-amber-400',
  },
  silver: {
    label: 'シルバー',
    icon: '🥈',
    color: 'bg-slate-100 text-slate-700',
    borderColor: 'border-slate-400',
  },
  gold: {
    label: 'ゴールド',
    icon: '🥇',
    color: 'bg-yellow-100 text-yellow-800',
    borderColor: 'border-yellow-400',
  },
}

export function StatusCard({ status, totalReferrals, totalContracts, score }: StatusCardProps) {
  const config = statusConfig[status]
  
  return (
    <Card className={`border-l-4 ${config.borderColor}`}>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className={`px-4 py-2 rounded-full ${config.color} flex items-center space-x-2`}>
              <span className="text-2xl">{config.icon}</span>
              <span className="font-bold text-lg">{config.label}</span>
            </div>
            
            <div className="flex items-center space-x-2 text-gray-600">
              <Award className="w-5 h-5" />
              <span className="font-medium">スコア: {score}pt</span>
            </div>
          </div>
          
          <div className="flex space-x-8 text-center">
            <div>
              <p className="text-3xl font-bold text-gray-900">{totalReferrals}</p>
              <p className="text-sm text-gray-500">総紹介数</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-primary-600">{totalContracts}</p>
              <p className="text-sm text-gray-500">成約数</p>
            </div>
          </div>
        </div>
        
        {/* Progress to next status */}
        {status !== 'gold' && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>次のランクまで</span>
              <span>あと {getRequiredForNext(status, totalContracts)} 成約</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-primary-600 rounded-full h-2 transition-all"
                style={{ width: `${getProgressPercent(status, totalContracts)}%` }}
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function getRequiredForNext(status: string, current: number): number {
  const thresholds = { candidate: 0, bronze: 1, silver: 5, gold: Infinity }
  const nextThreshold = status === 'candidate' ? 0 : status === 'bronze' ? 1 : status === 'silver' ? 5 : 0
  return Math.max(0, nextThreshold - current)
}

function getProgressPercent(status: string, current: number): number {
  if (status === 'gold') return 100
  const thresholds = { candidate: 0, bronze: 1, silver: 5 }
  const target = status === 'candidate' ? 0 : status === 'bronze' ? 1 : 5
  if (target === 0) return 0
  return Math.min(100, (current / target) * 100)
}
