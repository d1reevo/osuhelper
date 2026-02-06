# osu!Helper - Advanced osu! Dashboard

OVERKILL osu!standard dashboard built with Next.js 14, TailwindCSS, Prisma, and NextAuth.

## 🚀 Getting Started

### 1. Prerequisites
- Node.js 18+
- PostgreSQL Database
- osu! API v2 Client Credentials (https://osu.ppy.sh/home/account/edit#oauth)

### 2. Installation

```bash
# Install dependencies
npm install

# Setup Environment Variables
# Create a .env file based on the example below
```

**.env content:**
```env
DATABASE_URL="postgresql://user:password@localhost:5432/osuhelper"
NEXTAUTH_SECRET="your-super-secret-key"
NEXTAUTH_URL="http://localhost:3000"

OSU_CLIENT_ID="your_osu_client_id"
OSU_CLIENT_SECRET="your_osu_client_secret"
OSU_REDIRECT_URI="http://localhost:3000/api/osu/callback"

TOKEN_ENCRYPTION_KEY="12345678901234567890123456789012" # 32 chars
JOB_SECRET="secret-job-key"
APP_URL="http://localhost:3000"
```

### 3. Database Setup

```bash
npx prisma migrate dev --name init
```

### 4. Run Development Server

```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000).

### 5. Start Background Jobs (Optional for local dev)

To simulate the cron jobs (updating profiles, scores, snapshots):
```bash
node scripts/cron.js
```
*Note: In production (Vercel), use Vercel Cron to hit `/api/jobs/run?secret=...` endpoints.*

## ✅ Feature Checklist

- [x] **Authentication**
  - [x] Local Register/Login (Bcrypt)
  - [x] Connect osu! Account (OAuth2 + Refresh Token)
  - [x] Encrypted Token Storage

- [x] **Dashboard**
  - [x] Profile Stats (PP, Rank, Acc)
  - [x] Progress Graphs (Recharts)
  - [x] Daily Snapshots

- [x] **Features**
  - [x] Activity Feed (Structure ready)
  - [x] Goals & Achievements (UI ready)
  - [x] Friends System (DB Schema + UI)
  - [x] Formatting & Comparison
  - [x] Public Profiles (`/u/[slug]`)
  - [x] Streaks Heatmap

- [x] **Tech Stack**
  - [x] Next.js 14 App Router
  - [x] TypeScript
  - [x] Tailwind + Shadcn/ui (basic components)
  - [x] Prisma + Postgres
  - [x] React Query (TanStack)

## 🧪 How to Test

1. **Register**: Go to `/register` and create an account.
2. **Login**: Login with your new account.
3. **Connect osu!**: Go to `Settings` -> Click "Connect osu!". Authorize the app.
4. **Dashboard**: You should be redirected to Dashboard and see your current osu! stats.
5. **Jobs**: Run `node scripts/cron.js` in a separate terminal. Watch the console logs. It will hit the API. Refresh dashboard to see if data updates (fake updates if API calls succeed).
6. **Public Profile**: Go to `Settings`, set a slug (default is username). Visit `/u/your_slug`.

## ⚠️ Notes
- The osu! API limits are handled via delayed loops in the job runner.
- Beatmaps data requires fetching and storing large amounts of data; this project only stores what is referenced in "Recent Scores".

Enjoy grinding!
