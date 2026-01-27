# SAA エバンジェリストポータル

SAA Alumni向けエバンジェリストポータルサイト

## 技術スタック

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database/Auth**: Supabase
- **Hosting**: Vercel

## セットアップ

### 1. 依存パッケージのインストール

```bash
npm install
```

### 2. 環境変数の設定

`.env.local.example`を`.env.local`にコピーして、Supabaseの認証情報を設定:

```bash
cp .env.local.example .env.local
```

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### 3. Supabaseテーブル作成

Supabase SQL Editorで以下を実行:

```sql
-- ユーザーテーブル
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  status TEXT DEFAULT 'candidate' CHECK (status IN ('candidate', 'bronze', 'silver', 'gold')),
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  total_referrals INT DEFAULT 0,
  total_contracts INT DEFAULT 0,
  score INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS有効化
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- ユーザーは自分のデータのみ参照・更新可能
CREATE POLICY "Users can view own data" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own data" ON users
  FOR UPDATE USING (auth.uid() = id);

-- 管理者は全データ参照可能
CREATE POLICY "Admins can view all users" ON users
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
  );

-- 管理者は全データ更新可能
CREATE POLICY "Admins can update all users" ON users
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
  );
```

### 4. 開発サーバー起動

```bash
npm run dev
```

http://localhost:3000 でアクセス

## ディレクトリ構成

```
/app
  /(auth)         # 認証関連（ログイン）
  /(user)         # ユーザー向けページ
  /(admin)        # 管理者向けページ
/components
  /shared         # 共通コンポーネント
  /user           # ユーザー向けコンポーネント
  /admin          # 管理者向けコンポーネント
/lib
  /supabase       # Supabaseクライアント
  /actions        # Server Actions
  /services       # ビジネスロジック
/types            # 型定義
```

## 開発状況

### Slice 1: 認証 + 基本ダッシュボード ✅ 作成中

- [x] プロジェクト初期化
- [x] 認証フロー
- [x] ユーザーダッシュボード（静的）
- [x] 管理者ダッシュボード（静的）
- [x] マイページ
- [ ] Supabase接続テスト
- [ ] Vercelデプロイ
