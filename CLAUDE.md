# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Sanook Kids Learning** is a free, web-based educational platform for Thai students in Grade 4 and Grade 6. Built with Next.js 14+ App Router, it provides curriculum-aligned video lessons and interactive exercises in Mathematics and Science, inspired by Khan Academy's mastery learning model.

## Development Commands

### Essential Commands
```bash
# Development server (runs on port 5000)
npm run dev

# Production build
npm run build

# Start production server (port 5000)
npm start

# Linting
npm run lint
```

### Database Commands
```bash
# Generate Prisma client (after schema changes)
npx prisma generate

# Create migration
npx prisma migrate dev --name description

# Push schema changes without migration
npx prisma db push

# Open Prisma Studio
npx prisma studio
```

Note: The dev server and production server both run on port 5000 (not the Next.js default of 3000).

## Architecture Overview

### Tech Stack
- **Framework**: Next.js 15.5.4 with App Router
- **Language**: TypeScript 5.9.3
- **Styling**: Tailwind CSS 3.4.18
- **Authentication**: NextAuth 5.0 (beta) with Google OAuth
- **Database**: PostgreSQL with Prisma ORM
- **Database Adapter**: Neon serverless with Prisma adapter
- **Analytics**: Google Analytics 4
- **Hosting**: Vercel (Replit for development)

### Key Architectural Patterns

#### 1. Authentication Flow
- NextAuth.js configuration in root `auth.ts` file
- OAuth providers: Google (Facebook configured but not enabled)
- Database-backed sessions using Prisma
- Custom Prisma client location: `lib/generated/prisma` (not default)
- Middleware handles route protection and user flow redirection (middleware.ts:5-42)
- Flow: Landing page → OAuth sign-in → Grade selection → Dashboard
- Users without grade level are redirected to `/auth/grade-selection`
- Authenticated users on landing page are redirected based on grade level status

#### 2. Database Schema (Prisma)
Located in `prisma/schema.prisma`:
- **Custom output path**: Generated client outputs to `lib/generated/prisma` (not default)
- **User model**: Links social OAuth with grade level selection
- **Enums**: `SocialProvider` (GOOGLE, FACEBOOK), `GradeLevel` (GRADE_4, GRADE_6)
- **Unique constraint**: Users identified by provider + provider ID combination

#### 3. App Router Structure
```
app/
├── layout.tsx              # Root layout with SEO metadata and GA4 script
├── page.tsx                # Landing page (public)
├── globals.css             # Global styles and Tailwind directives
├── api/
│   ├── auth/[...nextauth]/ # NextAuth API routes
│   └── user/grade/         # Grade selection API endpoint
├── auth/
│   └── grade-selection/    # Grade selection page for new users
└── dashboard/              # Protected dashboard area
    ├── layout.tsx
    └── page.tsx
```

#### 4. Component Organization
```
components/
├── landing/          # Landing page sections (8 components)
│   ├── HeroSection.tsx
│   ├── HowItWorksSection.tsx
│   ├── FeaturesSection.tsx
│   ├── ForParentsSection.tsx
│   ├── PreviewSection.tsx
│   ├── CTASection.tsx
│   ├── FAQSection.tsx
│   └── Footer.tsx
├── dashboard/        # Dashboard components
├── ui/               # Reusable UI components
└── analytics/        # GA4 analytics components
    └── GAScript.tsx
```

#### 5. Library Organization
```
lib/
├── auth.ts           # Auth utility functions (OAuth initiation, error handling)
├── db.ts             # Prisma client singleton
├── analytics.ts      # GA4 tracking functions
├── session.ts        # Session management utilities
└── generated/
    └── prisma/       # Generated Prisma client (custom location)
```

#### 6. Server Actions
Located in `app/actions/`:
- `auth.ts`: Server action for OAuth sign-in initiation
- Handles provider-specific sign-in flows
- Error handling with Thai language messages

#### 7. Path Aliases
TypeScript configured with `@/*` alias pointing to project root:
```typescript
import { Component } from '@/components/ui/Component';
import { prisma } from '@/lib/db';
```

### Analytics Implementation

Google Analytics 4 is integrated throughout the application:
- Event tracking defined in `lib/analytics.ts`
- Events: `cta_click`, `sign_up_started`, `sign_up_completed`, `faq_interaction`, `scroll_depth`, `section_view`, `error`
- Full documentation in `docs/analytics-events.md`
- In development (no GA ID), events log to console with `[Analytics]` prefix

### Middleware Flow

The middleware (`middleware.ts`) enforces:
1. Protected routes: `/dashboard`, `/lessons`, `/auth/grade-selection`
2. Unauthenticated users → Redirect to landing page (`/`)
3. Authenticated users on landing page:
   - With grade level → Redirect to `/dashboard`
   - Without grade level → Redirect to `/auth/grade-selection`
4. Users with grade level cannot access grade selection page
5. Users without grade level cannot access dashboard

### SEO & Metadata

Root layout (`app/layout.tsx`) includes:
- Comprehensive Open Graph tags
- Twitter Card metadata
- Schema.org structured data (EducationalOrganization)
- Thai language optimization
- Viewport and robots configuration

## PRD-Driven Development Workflow

This project follows a structured PRD-driven workflow documented in `prd-driven-workflow/`:

### Workflow Steps
1. **Create PRD**: `prd-driven-workflow/01-create-prd.md` - Transform requirements into comprehensive PRD
2. **Generate Tasks**: `prd-driven-workflow/02-generate-tasks.md` - Break down PRD into actionable tasks
3. **Process Tasks**: `prd-driven-workflow/03-process-tasks.md` - Execute tasks with testing and commits

### PRD Documents
Located in `tasks/` directory:
- `0000-prd-landing-page.md` - Landing page (completed)
- `0001-prd-user-authentication.md` - Social login (completed)
- `0002-prd-content-navigation.md` - Content browsing
- `0003-prd-learning-mastery-system.md` - Learning engine
- `0004-prd-progress-tracking.md` - Progress dashboard

When working on new features, reference the relevant PRD for requirements and acceptance criteria.

## Important Notes

### Database Connection
- Uses Neon serverless PostgreSQL with Prisma adapter
- Connection pooling handled by `@neondatabase/serverless`
- Database URL in `.env` file (never commit this)

### Environment Variables
Required variables (see `env.local.example`):
- `NEXT_PUBLIC_GA_MEASUREMENT_ID` - Google Analytics 4 ID
- `GOOGLE_CLIENT_ID` - Google OAuth client ID
- `GOOGLE_CLIENT_SECRET` - Google OAuth secret
- `NEXT_PUBLIC_SITE_URL` - Site URL for SEO and redirects
- `DATABASE_URL` - PostgreSQL connection string
- `AUTH_SECRET` - NextAuth secret key (auto-generated)

### Thai Language Considerations
- All user-facing text is in Thai
- Fonts: Sarabun (main), Prompt (display), Kanit (alternative)
- Error messages in `lib/auth.ts` are in Thai
- SEO metadata includes Thai keywords and descriptions
- Test Thai character rendering across browsers

### Custom Prisma Configuration
**Important**: The Prisma client is generated to a custom location:
- **Location**: `lib/generated/prisma` (not `node_modules/@prisma/client`)
- **Import from**: `@/lib/generated/prisma` or `./lib/generated/prisma`
- After schema changes, run `npx prisma generate` to regenerate client

### Port Configuration
The application runs on **port 5000** (not 3000):
- Dev server: `npm run dev` → http://localhost:5000
- Production: `npm start` → http://localhost:5000
- Configured in `package.json` scripts with `-p 5000` flag

### Testing
Currently manual testing only (see `docs/testing-guide.md`):
- Mobile: iOS Safari, Android Chrome
- Tablet: iPad, Android tablets
- Desktop: Chrome, Safari, Firefox, Edge
- Focus areas: Thai text rendering, CTA functionality, responsive layouts

### Design System
Primary colors (defined in landing components):
- Primary: #14bf96 (Khan Academy-inspired green)
- Secondary: #ff9500 (Warm orange)
- Trust: #1865f2 (Blue for credibility)

## Common Development Tasks

### Adding a New Landing Section
1. Create component in `components/landing/`
2. Import and add to `app/page.tsx`
3. Add analytics tracking if interactive
4. Test responsive behavior (mobile, tablet, desktop)

### Adding Analytics Events
1. Define event in `lib/analytics.ts`
2. Document in `docs/analytics-events.md`
3. Call tracking function in component
4. Test with console logs (no GA ID) or GA4 DebugView

### Modifying Database Schema
1. Update `prisma/schema.prisma`
2. Run `npx prisma generate` to regenerate client
3. Create migration: `npx prisma migrate dev --name description`
4. Update TypeScript types if needed
5. Remember: client is in `lib/generated/prisma`

### Adding Protected Routes
1. Add route path to `middleware.ts` protected routes array
2. Ensure route checks for authentication
3. Handle grade level requirements if applicable
4. Test redirect behavior for unauthenticated users

### Updating NextAuth Configuration
1. Modify `auth.ts` in project root
2. Update session callbacks for new user properties
3. Extend TypeScript declarations if adding to session/user
4. Test OAuth flow thoroughly

## Current Project Status

- **Version**: 1.0.0
- **Stage**: Active Development
- **Completed PRDs**: 0000 (Landing Page), 0001 (Authentication)
- **Active PRD**: None (ready for next feature)
- **Last Updated**: October 7, 2025

## Git Workflow

Main branch: `main`
- Create descriptive commit messages
- Reference PRD numbers in commits when applicable
- Follow conventional commits format when possible
