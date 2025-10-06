# Sanook Kids Learning - Project Documentation

## Overview

Sanook Kids Learning is a free Thai educational platform for Grade 4 (ป.4) and Grade 6 (ป.6) students. The platform provides math and science education through short videos and interactive exercises, all in Thai language.

**Current Status:** User authentication system complete and ready for testing.

---

## Recent Changes

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
- **Authentication:** Google OAuth only for now, Facebook to be added later
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
- `name`: String (optional)
- `image`: String (optional) 
- `gradeLevel`: Enum (GRADE_4 | GRADE_6, optional)
- `provider`: Enum (GOOGLE | FACEBOOK)
- `providerId`: String (unique)
- `createdAt`: DateTime
- `updatedAt`: DateTime

### Authentication Flow

1. **New User:**
   - Landing page → Click "ลงชื่อเข้าใช้ด้วย Google"
   - Google OAuth consent screen
   - Callback → `/auth/grade-selection` (new user)
   - Select grade (ป.4 or ป.6)
   - Redirect to `/dashboard`

2. **Returning User:**
   - Landing page → Auto-redirect to `/dashboard` (if authenticated and has grade)
   - Dashboard displays: "ยินดีต้อนรับ {name}! คุณกำลังเรียนชั้น {grade}"

3. **Logout:**
   - Click "ออกจากระบบ" button in dashboard nav
   - Session cleared → Redirect to landing page

### Route Protection (Middleware)

- `/` - Public (redirects to dashboard if authenticated)
- `/dashboard` - Protected (requires auth + gradeLevel)
- `/auth/grade-selection` - Protected (requires auth, no grade yet)
- All other routes - Public

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
- [ ] Google OAuth sign-in flow (new user)
- [ ] Grade selection saves correctly
- [ ] Dashboard displays user info and grade
- [ ] Logout clears session
- [ ] Returning user auto-redirects to dashboard
- [ ] Protected routes redirect unauthenticated users
- [ ] Thai text displays correctly on all devices
- [ ] Mobile responsive design works

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

Last Updated: October 6, 2025
