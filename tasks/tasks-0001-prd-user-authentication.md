# Task List: User Authentication (Social Login)
**Based on:** `0001-prd-user-authentication.md`

## Current State Assessment

**Codebase Status:** Partial foundation exists
- Landing page with sign-in buttons implemented
- `lib/auth.ts` with placeholder OAuth functions
- `hooks/useAuth.ts` for client-side auth state
- Environment variables template ready
- No database or backend exists yet

**What Needs to be Built:**
- Database setup and user schema
- Backend API routes for OAuth
- Session management system
- Grade selection screen
- Dashboard page
- Protected route middleware
- Complete OAuth integration (Google & Facebook)

## Relevant Files

*Files to be created or modified:*

### Database & Schema
- `prisma/schema.prisma` - Prisma schema for user model
- `prisma/migrations/` - Database migrations
- `lib/db.ts` - Database client singleton

### Backend API Routes (Next.js App Router)
- `app/api/auth/google/route.ts` - Google OAuth initiation endpoint
- `app/api/auth/google/callback/route.ts` - Google OAuth callback handler
- `app/api/auth/facebook/route.ts` - Facebook OAuth initiation endpoint
- `app/api/auth/facebook/callback/route.ts` - Facebook OAuth callback handler
- `app/api/auth/logout/route.ts` - Logout endpoint
- `app/api/auth/session/route.ts` - Get current session/user
- `app/api/user/grade/route.ts` - Update user grade level

### Session Management
- `lib/session.ts` - Session token creation, validation, and management
- `middleware.ts` - Next.js middleware for protecting routes

### Frontend Pages
- `app/auth/grade-selection/page.tsx` - Grade selection screen for new users
- `app/dashboard/page.tsx` - Main dashboard (placeholder for now)
- `app/dashboard/layout.tsx` - Dashboard layout with logout button

### Updated Existing Files
- `lib/auth.ts` - Replace placeholder with real OAuth logic
- `hooks/useAuth.ts` - Update to call real backend APIs
- `app/page.tsx` - Ensure landing page redirects if already authenticated

### Types
- `types/user.ts` - TypeScript interfaces for User, Session, AuthProvider
- `types/auth.ts` - Auth-related types

## Tasks

- [x] **1.0 Database Setup & User Schema**
  - [x] 1.1 Create PostgreSQL database using Replit's database tool (automatically sets `DATABASE_URL` secret)
  - [x] 1.2 Install Prisma and database dependencies (`npm install prisma @prisma/client @prisma/adapter-neon`)
  - [x] 1.3 Install Prisma as dev dependency (`npm install -D prisma`)
  - [x] 1.4 Initialize Prisma (`npx prisma init`)
  - [x] 1.5 Configure `prisma/schema.prisma` datasource to use `DATABASE_URL` from env (automatically provided by Replit)
  - [x] 1.6 Create User model in `prisma/schema.prisma` with fields: `id`, `socialProvider` (enum: GOOGLE, FACEBOOK), `socialProviderId`, `name`, `email`, `gradeLevel` (nullable, enum: GRADE_4, GRADE_6), `createdAt`, `updatedAt`
  - [x] 1.7 Add unique constraint on `socialProvider` + `socialProviderId` combination
  - [x] 1.8 Run first migration (`npx prisma migrate dev --name init_user_table`)
  - [x] 1.9 Generate Prisma Client (`npx prisma generate`)
  - [x] 1.10 Create `lib/db.ts` with Prisma Client singleton pattern (prevents multiple instances in dev)
  - [x] 1.11 Verify database connection works (test query in dev)

- [x] **2.0 OAuth Backend Implementation** (Google only, Facebook skipped)
  - [x] 2.1 Install NextAuth.js (`npm install next-auth@beta` for v5 with App Router support)
  - [x] 2.2 Create `auth.ts` (NextAuth configuration) at project root with Google provider
  - [x] 2.3 Configure Google Provider in `auth.ts` (clientId, clientSecret from Replit Secrets)
  - [x] 2.4 ~~Configure Facebook Provider~~ (skipped - Google only for now)
  - [x] 2.5 Add OAuth callback URLs to Google Cloud Console (Replit dev URL configured)
  - [x] 2.6 ~~Add OAuth redirect URIs to Facebook~~ (skipped - Google only for now)
  - [x] 2.7 Create `app/api/auth/[...nextauth]/route.ts` to handle all auth routes (NextAuth.js App Router pattern)
  - [x] 2.8 Implement custom `signIn` callback in `auth.ts` to check if user exists in database
  - [x] 2.9 If new user: create user record with `socialProvider`, `socialProviderId`, `name`, `email` (leave `gradeLevel` null)
  - [x] 2.10 If returning user: load user from database by `socialProvider` + `socialProviderId`
  - [x] 2.11 Store user data in session (include `id`, `name`, `email`, `gradeLevel`, `isNewUser` flag)
  - [x] 2.12 Add secrets to Replit Secrets panel: `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `NEXTAUTH_SECRET`
  - [x] 2.13 Add `NEXTAUTH_SECRET` to Replit Secrets (user completed)
  - [x] 2.14 Add `NEXTAUTH_URL` to Replit Secrets (user completed)

- [x] **3.0 Session Management & Security**
  - [x] 3.1 Configure NextAuth session strategy as `jwt` in `auth.ts` (for serverless compatibility)
  - [x] 3.2 Set session `maxAge` to 30 days (2592000 seconds) in auth config
  - [x] 3.3 Enable `httpOnly: true` and `secure: true` (production) for session cookies
  - [x] 3.4 Implement `jwt` callback in `auth.ts` to add custom user fields (`gradeLevel`, `userId`) to token
  - [x] 3.5 Implement `session` callback in `auth.ts` to add custom fields from token to session object
  - [x] 3.6 Create `lib/session.ts` with helper function `getServerSession()` using NextAuth's `auth()`
  - [x] 3.7 Create `middleware.ts` at project root to protect routes (e.g., `/dashboard`, `/lessons`)
  - [x] 3.8 In middleware, check if user is authenticated; if not, redirect to landing page
  - [x] 3.9 Add CSRF protection (validate OAuth `state` parameter - NextAuth handles this)
  - [x] 3.10 Add error handling for expired or invalid sessions

- [x] **4.0 Grade Selection & User Onboarding**
  - [x] 4.1 Create `app/auth/grade-selection/page.tsx` for grade selection screen
  - [x] 4.2 Add page title: "นักเรียนอยู่ชั้นอะไรเอ่ย?" (Which grade are you in?)
  - [x] 4.3 Create two large, tappable card components for "ชั้น ป.4" and "ชั้น ป.6"
  - [x] 4.4 Add icons and descriptions to cards (e.g., "อายุ 9-10 ปี, คณิตศาสตร์และวิทยาศาสตร์")
  - [x] 4.5 Create `app/api/user/grade/route.ts` API endpoint (POST) to update user's `gradeLevel`
  - [x] 4.6 In grade API route, verify user is authenticated using `getServerSession()`
  - [x] 4.7 Update user record in database with selected `gradeLevel`
  - [x] 4.8 After grade update, redirect user to `/dashboard`
  - [x] 4.9 Add loading state to grade selection cards while saving
  - [x] 4.10 Add error handling if grade update fails (show Thai error message)
  - [x] 4.11 Make grade selection screen responsive (mobile-first design)
  - [x] 4.12 Ensure grade selection is only shown to users with `gradeLevel === null`

- [x] **5.0 Dashboard & Protected Routes**
  - [x] 5.1 Create `app/dashboard/page.tsx` as placeholder dashboard (will be enhanced in future PRDs)
  - [x] 5.2 Create `app/dashboard/layout.tsx` with navigation bar including logout button
  - [x] 5.3 Add "ออกจากระบบ" (Logout) button to navigation bar (top-right corner)
  - [x] 5.4 Implement logout click handler that calls `/api/auth/signout` (NextAuth endpoint)
  - [x] 5.5 Display welcome message on dashboard: "ยินดีต้อนรับ {name}!" (Welcome {name}!)
  - [x] 5.6 Show user's grade level on dashboard (e.g., "คุณกำลังเรียนชั้น ป.4")
  - [x] 5.7 Add placeholder content sections on dashboard (will be filled in Content Navigation PRD)
  - [x] 5.8 Verify dashboard is only accessible to authenticated users (test middleware)
  - [x] 5.9 Style dashboard with Tailwind CSS matching landing page theme
  - [x] 5.10 Make dashboard responsive (mobile, tablet, desktop)

- [x] **6.0 Integration & Testing**
  - [x] 6.1 Update landing page - redirects handled by middleware
  - [x] 6.2 If authenticated and has `gradeLevel`, redirect to `/dashboard` (middleware handles)
  - [x] 6.3 If authenticated but no `gradeLevel`, redirect to `/auth/grade-selection` (middleware handles)
  - [x] 6.4 Update `lib/auth.ts` to use real NextAuth sign-in instead of placeholder
  - [x] 6.5 Update `hooks/useAuth.ts` to work with NextAuth session
  - [x] 6.6 Added SessionProvider wrapper to app layout
  - [x] 6.7 Removed Facebook OAuth from UI (skipped per user request)
  - [x] 6.8 Cleaned up unused Facebook state from useAuth hook  
  - [x] 6.9 Google OAuth credentials configured in Replit Secrets
  - [x] 6.10 Middleware protecting routes correctly verified
  - [x] 6.11 Thai language UI verified across all screens
  - [x] 6.12 TypeScript/LSP checks pass (no errors)
  - [x] 6.13 Code reviewed and approved by architect
  - [x] 6.14 All major authentication flows implemented and ready for user testing

---

## Notes

- **Database:** Using Replit's built-in PostgreSQL database with Prisma ORM
- **Secrets Management:** All API keys and secrets stored in Replit Secrets (accessed via `process.env`)
- **OAuth Libraries:** Using `next-auth` (Auth.js v5) with built-in Google/Facebook providers
- **Session Strategy:** JWT tokens stored in HttpOnly cookies (secure, serverless-compatible)
- **Replit Environment:** Development uses Replit's webview URL; OAuth callbacks must be configured with this URL
- **Testing Priority:** Focus on OAuth flow end-to-end first, then edge cases

## Success Criteria

✅ Users can sign in with Google (Facebook skipped for now)  
✅ New users are prompted for grade selection (Thai UI: ป.4 or ป.6)  
✅ Returning users go directly to dashboard  
✅ Sessions persist for 30 days with JWT  
✅ Logout works and clears session  
✅ All Thai language text is correct  
✅ Middleware protects routes correctly  
✅ Code passes TypeScript/LSP checks  
✅ Architect-reviewed and approved  

---

**Ready for sub-task generation.**  
**User: Respond with 'Go' to proceed.**

