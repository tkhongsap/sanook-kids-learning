# Sanook Kids Learning - Project Documentation

## Overview

Sanook Kids Learning is a free Thai educational platform for Grade 4 (ป.4) and Grade 6 (ป.6) students. The platform provides math and science education through short videos and interactive exercises, all in Thai language.

**Current Status:** Multi-grade selection system complete. Users can now select and study content from both ป.4 and ป.6 simultaneously.

---

## Recent Changes

### October 9, 2025 - Multi-Grade Selection System

✅ **Completed Features:**
- Users can select multiple grades (both ป.4 and ป.6) during onboarding
- Changed from single `gradeLevel` to `gradeLevels` array in database schema
- Updated grade selection UI from radio buttons to checkboxes
- Dashboard displays content for all selected grades
- Session update mechanism using `useSession().update()` to refresh JWT tokens
- Dev bypass button for development testing (skips login, goes directly to grade selection)

**Key Design Decision:** Grades determine content difficulty and type, not restrictions. Users can study content at different levels based on their interests and learning needs.

### October 7, 2025 - Email/Password Authentication Added

✅ **Completed Features:**
- Email/password authentication alongside Google OAuth
- Secure password hashing with bcryptjs
- Admin account support with isAdmin flag
- Dual login UI with tab-based interface (Google / Email)
- Admin account created: `tkhongsap` (ensure by running `npm run db:seed`)

### October 6, 2025 - User Authentication System Complete (PRD 0001)

✅ **Completed Features:**
- Google OAuth sign-in with NextAuth.js v5
- Grade selection onboarding for new users (ป.4 or ป.6)
- Protected dashboard with user welcome and grade display
- Session management with JWT (30-day persistence)
- Logout functionality
- Route protection middleware
- Thai language UI throughout

**Note:** Facebook OAuth was skipped per user request. Infrastructure in place to add it later.

---

## User Preferences

- **Language:** All UI text must be in Thai
- **Authentication:** Google OAuth and email/password, Facebook to be added later
- **Design:** Clean, mobile-first design with Tailwind CSS
- **Target Users:** Thai students in Grade 4 (ป.4) and Grade 6 (ป.6)

---

## Project Architecture

### Tech Stack
- **Framework:** Next.js 15.5.4 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Authentication:** NextAuth.js v5 (Auth.js)
- **Database:** Replit PostgreSQL (Neon-backed) with Prisma ORM
- **Analytics:** Google Analytics 4 (placeholder, not configured yet)

### Key Files & Structure

```
/
├── auth.ts                          # NextAuth configuration
├── middleware.ts                    # Route protection and redirects
├── prisma/
│   └── schema.prisma               # Database schema with User model
├── lib/
│   ├── db.ts                       # Prisma client singleton
│   ├── session.ts                  # Server-side session helper
│   └── auth.ts                     # OAuth sign-in wrapper
├── hooks/
│   └── useAuth.ts                  # Client-side auth hook
├── app/
│   ├── page.tsx                    # Landing page
│   ├── layout.tsx                  # Root layout with SessionProvider
│   ├── api/
│   │   ├── auth/[...nextauth]/route.ts  # NextAuth API route
│   │   └── user/grade/route.ts     # Grade update API
│   ├── auth/
│   │   └── grade-selection/page.tsx # Grade onboarding screen
│   └── dashboard/
│       ├── layout.tsx              # Dashboard layout with nav
│       └── page.tsx                # Dashboard home
├── components/
│   ├── landing/                    # Landing page sections
│   ├── dashboard/
│   │   └── DashboardNav.tsx       # Dashboard navigation with logout
│   └── providers/
│       └── SessionProvider.tsx    # NextAuth session wrapper
└── tasks/
    └── tasks-0001-prd-user-authentication.md  # PRD task tracker
```

### Database Schema

**User Model:**
- `id`: String (cuid)
- `email`: String (unique, required)
- `name`: String (required)
- `password`: String (optional, hashed with bcrypt, only for email/password users)
- `isAdmin`: Boolean (default: false)
- `gradeLevels`: GradeLevel[] (array of GRADE_4 | GRADE_6, default: [])
- `socialProvider`: Enum (GOOGLE | FACEBOOK, optional)
- `socialProviderId`: String (optional, unique with socialProvider)
- `createdAt`: DateTime
- `updatedAt`: DateTime

**Note:** Changed from single `gradeLevel` to `gradeLevels` array to support multi-grade selection.

**Authentication Methods:**
- OAuth users: Have `socialProvider` and `socialProviderId`, no password
- Email/password users: Have `password` (hashed), no social provider fields
- Admin users: Set `isAdmin: true` for special privileges

### Authentication Flow

1. **Google OAuth - New User:**
   - Landing page → Click "ลงชื่อเข้าใช้ด้วย Google"
   - Google OAuth consent screen
   - Callback → `/auth/grade-selection` (new user)
   - Select grades (ป.4 and/or ป.6) using checkboxes → Click "ดำเนินการต่อ"
   - Session updates with selected grades using `useSession().update()`
   - Redirect to `/dashboard`

2. **Email/Password - Login:**
   - Landing page → Switch to "อีเมล/รหัสผ่าน" tab
   - Enter email and password
   - If account exists and password matches → `/auth/grade-selection` or `/dashboard`

3. **Dev Bypass (Development Only):**
   - Landing page → Click "Dev: Skip Login" button (only visible in development)
   - Automatically creates/logs in as dev user → `/auth/grade-selection`
   - Used for quick testing without OAuth setup

4. **Returning User:**
   - Landing page → Auto-redirect to `/dashboard` (if authenticated and has grades)
   - Dashboard displays content for all selected grades

4. **Logout:**
   - Click "ออกจากระบบ" button in dashboard nav
   - Session cleared → Redirect to landing page

**Admin Account:**
- Email: `tkhongsap`
- Password: `sthought`
- Has `isAdmin: true` flag for special privileges
- Seed locally with `npm run db:seed` (supports overrides via admin-related env vars)

### Route Protection (Middleware)

- `/` - Public (redirects to dashboard if authenticated with grades)
- `/dashboard` - Protected (requires auth + at least one grade selected)
- `/auth/grade-selection` - Protected (requires auth, redirects here if no grades selected)
- All other routes - Public

**Session Update Flow:**
- After grade selection, `useSession().update()` triggers JWT callback with `trigger: 'update'`
- JWT token is refreshed with new gradeLevels array
- Full page reload ensures middleware sees updated session

### Environment Variables

**Required Secrets (configured in Replit Secrets):**
- `GOOGLE_CLIENT_ID` - Google OAuth client ID
- `GOOGLE_CLIENT_SECRET` - Google OAuth client secret
- `NEXTAUTH_SECRET` - NextAuth encryption secret
- `NEXTAUTH_URL` - OAuth callback URL (Replit domain)
- `DATABASE_URL` - PostgreSQL connection string (auto-configured)

---

## Known Issues / TODO

### Immediate Items
- None - authentication system is complete and approved by architect

### Future Enhancements (Next PRDs)
- Add Facebook OAuth support when requested
- Build content navigation for math and science lessons
- Add progress tracking
- Implement video player and exercises
- Parent dashboard for monitoring progress

---

## Development Commands

```bash
# Start dev server
npm run dev

# Database commands
npm run db:push        # Push Prisma schema changes to database
npm run db:push --force # Force push (use if data loss warning)

# Code quality
npm run lint          # Run ESLint
npm run type-check    # Run TypeScript compiler
```

---

## Testing Notes

### Manual Testing Checklist
- [x] Google OAuth sign-in flow (new user)
- [x] Multi-grade selection with checkboxes
- [x] Grade selection saves correctly and updates session
- [x] Dashboard displays content for all selected grades
- [x] Dev bypass button for quick testing (development only)
- [x] Logout clears session
- [x] Returning user auto-redirects to dashboard
- [x] Protected routes redirect unauthenticated users
- [x] Thai text displays correctly on all devices
- [x] Mobile responsive design works

### OAuth Testing
**Callback URL:** Use your Replit domain from `env | grep DOMAIN`  
Example: `https://xxx-xxx.replit.dev/api/auth/callback/google`

---

## Design System

### Colors
- **Primary:** `#10B981` (Green - math/science)
- **Secondary:** `#F59E0B` (Orange - energy/fun)
- **Primary Light:** `#D1FAE5`
- **Secondary Light:** `#FEF3C7`

### Typography
- **Headings:** Bold, large sizes for Thai text readability
- **Body:** Text-lg (18px) for comfortable reading
- **Language:** All UI text in Thai

### Components
- Buttons: Large, rounded, with clear Thai labels
- Cards: Rounded corners, shadows, ample padding
- Navigation: Sticky top bar with logout in top-right
- Mobile-first: All components responsive

---

## Deployment Notes

**Not yet deployed to production.**

When ready to deploy:
1. Configure production secrets in Replit
2. Update `NEXTAUTH_URL` to production domain
3. Update Google OAuth callback URLs
4. Test full authentication flow in production

---

Last Updated: October 9, 2025

