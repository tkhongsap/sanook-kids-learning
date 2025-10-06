# Sanook Kids Learning - Replit Project Documentation

## Overview
Free educational platform for Thai Grade 4 and Grade 6 students to learn Math and Science. Built with Next.js 15, React 19, TypeScript, and Tailwind CSS.

## Recent Changes

### October 6, 2025 - Vercel to Replit Migration
Successfully migrated the project from Vercel to Replit with the following changes:

1. **Port Configuration**: Updated dev and start scripts to bind to `0.0.0.0:5000` for Replit compatibility
2. **Cache Headers**: Added `no-cache` headers for HTML pages in `next.config.js` to prevent iframe caching issues
3. **Missing Files**: Created `lib/analytics.ts` and `lib/auth.ts` with placeholder implementations
   - Analytics: Tracks user events with Google Analytics 4 (console fallback when GA not configured)
   - Auth: Placeholder OAuth implementation (to be fully implemented in PRD 0001)
4. **Dependencies**: Installed all npm packages (388 packages, 0 vulnerabilities)
5. **Workflow**: Configured development server to run on port 5000
6. **Deployment**: Set up autoscale deployment configuration

## Project Architecture

### Tech Stack
- **Framework**: Next.js 15.5.4 with App Router
- **UI**: React 19.2.0, TypeScript 5.9.3
- **Styling**: Tailwind CSS 3.4.18
- **Language**: Thai (primary) with English fallbacks

### Directory Structure
```
├── app/              # Next.js app router pages
├── components/       # React components
│   ├── analytics/   # Google Analytics integration
│   ├── landing/     # Landing page sections
│   └── ui/          # Reusable UI components
├── hooks/           # Custom React hooks
├── lib/             # Utility libraries (analytics, auth)
├── types/           # TypeScript type definitions
├── tasks/           # PRD task documentation
└── public/          # Static assets
```

### Key Features (Current)
- ✅ Landing page with Thai content
- ✅ Google Analytics 4 integration (optional)
- ✅ OAuth sign-in UI (Google & Facebook)
- ⏳ Full authentication (PRD 0001 - not yet implemented)
- ⏳ Learning content (PRD 0002-0004)

## Environment Variables

### Optional (for production)
- `NEXT_PUBLIC_GA_MEASUREMENT_ID`: Google Analytics 4 Measurement ID
- `NEXT_PUBLIC_SITE_URL`: Public URL of the site (for SEO/sitemap)

### Future (PRD 0001)
- `GOOGLE_OAUTH_CLIENT_ID`: Google OAuth credentials
- `GOOGLE_OAUTH_CLIENT_SECRET`: Google OAuth credentials
- `FACEBOOK_APP_ID`: Facebook OAuth credentials
- `FACEBOOK_APP_SECRET`: Facebook OAuth credentials

## Development

### Running Locally
```bash
npm run dev    # Development server on port 5000
npm run build  # Production build
npm run start  # Production server on port 5000
```

### Deployment
- **Type**: Autoscale (stateless web app)
- **Build**: `npm run build`
- **Start**: `npm run start`
- **Port**: 5000 (configured for Replit)

## User Preferences
- None documented yet

## Known Issues
- OAuth authentication is not yet implemented (placeholder in `lib/auth.ts`)
- Shows user-friendly error messages in Thai when sign-in is attempted
- This is intentional and will be implemented in PRD 0001

## Next Steps
See tasks/ directory for detailed PRDs:
- PRD 0001: User Authentication System
- PRD 0002: Content Navigation
- PRD 0003: Learning Mastery System
- PRD 0004: Progress Tracking
