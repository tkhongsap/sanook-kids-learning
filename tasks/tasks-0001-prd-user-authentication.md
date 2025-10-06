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

- [ ] **1.0 Database Setup & User Schema**
  - [ ] 1.1 Install Prisma and database dependencies (`npm install prisma @prisma/client`, `npm install -D prisma`)
  - [ ] 1.2 Initialize Prisma (`npx prisma init`)
  - [ ] 1.3 Configure database connection in `.env` (choose PostgreSQL for production or SQLite for dev simplicity)
  - [ ] 1.4 Create User model in `prisma/schema.prisma` with fields: `id`, `socialProvider` (enum: GOOGLE, FACEBOOK), `socialProviderId`, `name`, `email`, `gradeLevel` (nullable, enum: GRADE_4, GRADE_6), `createdAt`, `updatedAt`
  - [ ] 1.5 Add unique constraint on `socialProvider` + `socialProviderId` combination
  - [ ] 1.6 Run first migration (`npx prisma migrate dev --name init_user_table`)
  - [ ] 1.7 Generate Prisma Client (`npx prisma generate`)
  - [ ] 1.8 Create `lib/db.ts` with Prisma Client singleton pattern (prevents multiple instances in dev)
  - [ ] 1.9 Add `DATABASE_URL` to `env.local.example` with example connection string
  - [ ] 1.10 Verify database connection works (test query in dev)

- [ ] **2.0 OAuth Backend Implementation**
  - [ ] 2.1 Install NextAuth.js (`npm install next-auth@beta` for v5 with App Router support)
  - [ ] 2.2 Create `auth.ts` (NextAuth configuration) at project root with Google and Facebook providers
  - [ ] 2.3 Configure Google Provider in `auth.ts` (clientId, clientSecret from env variables)
  - [ ] 2.4 Configure Facebook Provider in `auth.ts` (appId, appSecret from env variables)
  - [ ] 2.5 Add OAuth callback URLs to Google Cloud Console (e.g., `http://localhost:3000/api/auth/callback/google`)
  - [ ] 2.6 Add OAuth redirect URIs to Facebook App Dashboard
  - [ ] 2.7 Create `app/api/auth/[...nextauth]/route.ts` to handle all auth routes (NextAuth.js App Router pattern)
  - [ ] 2.8 Implement custom `signIn` callback in `auth.ts` to check if user exists in database
  - [ ] 2.9 If new user: create user record with `socialProvider`, `socialProviderId`, `name`, `email` (leave `gradeLevel` null)
  - [ ] 2.10 If returning user: load user from database by `socialProvider` + `socialProviderId`
  - [ ] 2.11 Store user data in session (include `id`, `name`, `email`, `gradeLevel`, `isNewUser` flag)
  - [ ] 2.12 Update `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `FACEBOOK_APP_ID`, `FACEBOOK_APP_SECRET` in `env.local.example`
  - [ ] 2.13 Add `NEXTAUTH_SECRET` to `.env` (generate with `openssl rand -base64 32`)
  - [ ] 2.14 Add `NEXTAUTH_URL` to `.env` (e.g., `http://localhost:3000` for dev)

- [ ] **3.0 Session Management & Security**
  - [ ] 3.1 Configure NextAuth session strategy as `jwt` in `auth.ts` (for serverless compatibility)
  - [ ] 3.2 Set session `maxAge` to 30 days (2592000 seconds) in auth config
  - [ ] 3.3 Enable `httpOnly: true` and `secure: true` (production) for session cookies
  - [ ] 3.4 Implement `jwt` callback in `auth.ts` to add custom user fields (`gradeLevel`, `userId`) to token
  - [ ] 3.5 Implement `session` callback in `auth.ts` to add custom fields from token to session object
  - [ ] 3.6 Create `lib/session.ts` with helper function `getServerSession()` using NextAuth's `auth()`
  - [ ] 3.7 Create `middleware.ts` at project root to protect routes (e.g., `/dashboard`, `/lessons`)
  - [ ] 3.8 In middleware, check if user is authenticated; if not, redirect to landing page
  - [ ] 3.9 Add CSRF protection (validate OAuth `state` parameter - NextAuth handles this)
  - [ ] 3.10 Add error handling for expired or invalid sessions

- [ ] **4.0 Grade Selection & User Onboarding**
  - [ ] 4.1 Create `app/auth/grade-selection/page.tsx` for grade selection screen
  - [ ] 4.2 Add page title: "นักเรียนอยู่ชั้นอะไรเอ่ย?" (Which grade are you in?)
  - [ ] 4.3 Create two large, tappable card components for "ชั้น ป.4" and "ชั้น ป.6"
  - [ ] 4.4 Add icons and descriptions to cards (e.g., "อายุ 9-10 ปี, คณิตศาสตร์และวิทยาศาสตร์")
  - [ ] 4.5 Create `app/api/user/grade/route.ts` API endpoint (POST) to update user's `gradeLevel`
  - [ ] 4.6 In grade API route, verify user is authenticated using `getServerSession()`
  - [ ] 4.7 Update user record in database with selected `gradeLevel`
  - [ ] 4.8 After grade update, redirect user to `/dashboard`
  - [ ] 4.9 Add loading state to grade selection cards while saving
  - [ ] 4.10 Add error handling if grade update fails (show Thai error message)
  - [ ] 4.11 Make grade selection screen responsive (mobile-first design)
  - [ ] 4.12 Ensure grade selection is only shown to users with `gradeLevel === null`

- [ ] **5.0 Dashboard & Protected Routes**
  - [ ] 5.1 Create `app/dashboard/page.tsx` as placeholder dashboard (will be enhanced in future PRDs)
  - [ ] 5.2 Create `app/dashboard/layout.tsx` with navigation bar including logout button
  - [ ] 5.3 Add "ออกจากระบบ" (Logout) button to navigation bar (top-right corner)
  - [ ] 5.4 Implement logout click handler that calls `/api/auth/signout` (NextAuth endpoint)
  - [ ] 5.5 Display welcome message on dashboard: "ยินดีต้อนรับ {name}!" (Welcome {name}!)
  - [ ] 5.6 Show user's grade level on dashboard (e.g., "คุณกำลังเรียนชั้น ป.4")
  - [ ] 5.7 Add placeholder content sections on dashboard (will be filled in Content Navigation PRD)
  - [ ] 5.8 Verify dashboard is only accessible to authenticated users (test middleware)
  - [ ] 5.9 Style dashboard with Tailwind CSS matching landing page theme
  - [ ] 5.10 Make dashboard responsive (mobile, tablet, desktop)

- [ ] **6.0 Integration & Testing**
  - [ ] 6.1 Update landing page (`app/page.tsx`) to check if user is already authenticated
  - [ ] 6.2 If authenticated and has `gradeLevel`, redirect to `/dashboard`
  - [ ] 6.3 If authenticated but no `gradeLevel`, redirect to `/auth/grade-selection`
  - [ ] 6.4 Update `lib/auth.ts` to use real NextAuth sign-in instead of placeholder
  - [ ] 6.5 Update `hooks/useAuth.ts` to work with NextAuth session (use `useSession` from `next-auth/react`)
  - [ ] 6.6 Remove placeholder loading states from landing page CTAs (now handled by NextAuth)
  - [ ] 6.7 Test full flow: Landing → Google Sign-In → Grade Selection → Dashboard
  - [ ] 6.8 Test full flow: Landing → Facebook Sign-In → Grade Selection → Dashboard
  - [ ] 6.9 Test returning user flow: Landing → Auto-redirect to Dashboard (skip grade selection)
  - [ ] 6.10 Test logout: Dashboard → Logout → Landing page (session cleared)
  - [ ] 6.11 Test protected routes: Try accessing `/dashboard` without auth → Should redirect to landing
  - [ ] 6.12 Test error cases: Cancel OAuth popup, network errors, invalid credentials
  - [ ] 6.13 Test session persistence: Close browser, reopen, verify still logged in
  - [ ] 6.14 Test analytics: Verify `trackSignUpStarted` and `trackSignUpCompleted` events fire correctly
  - [ ] 6.15 Verify all Thai text is grammatically correct and culturally appropriate
  - [ ] 6.16 Test on mobile devices (iOS Safari, Android Chrome)
  - [ ] 6.17 Test on desktop browsers (Chrome, Safari, Firefox, Edge)
  - [ ] 6.18 Run ESLint and TypeScript checks (no errors)
  - [ ] 6.19 Create documentation for OAuth setup in `docs/auth-setup.md`
  - [ ] 6.20 Update README with authentication section and environment variables

---

## Notes

- **Database Choice:** Recommending Prisma + PostgreSQL (or SQLite for development) for Next.js compatibility
- **OAuth Libraries:** Will use `next-auth` (Auth.js v5) which has built-in Google/Facebook providers
- **Session Strategy:** JWT tokens stored in HttpOnly cookies (secure, serverless-compatible)
- **Environment Variables:** Google Client ID/Secret and Facebook App ID/Secret must be configured
- **Testing Priority:** Focus on OAuth flow end-to-end first, then edge cases

## Success Criteria

✅ Users can sign in with Google  
✅ Users can sign in with Facebook  
✅ New users are prompted for grade selection  
✅ Returning users go directly to dashboard  
✅ Sessions persist for 30 days  
✅ Logout works and clears session  
✅ All Thai language text is correct  

---

**Ready for sub-task generation.**  
**User: Respond with 'Go' to proceed.**

