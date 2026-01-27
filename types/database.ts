export type UserStatus = 'candidate' | 'bronze' | 'silver' | 'gold'
export type UserRole = 'user' | 'admin'

export interface User {
  id: string
  email: string
  name: string
  status: UserStatus
  role: UserRole
  total_referrals: number
  total_contracts: number
  score: number
  created_at: string
  updated_at: string
}

export interface Database {
  public: {
    Tables: {
      users: {
        Row: User
        Insert: Omit<User, 'created_at' | 'updated_at'> & {
          created_at?: string
          updated_at?: string
        }
        Update: Partial<Omit<User, 'id'>>
      }
    }
  }
}
