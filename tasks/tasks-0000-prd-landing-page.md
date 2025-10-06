# Task List: Landing Page & First Visitor Experience
**Based on:** `0000-prd-landing-page.md`

## Current State Assessment

**Codebase Status:** Greenfield project (no existing code)
- No package.json or existing framework detected
- No components, utilities, or infrastructure in place
- Fresh start - full implementation required

**Technology Stack Decision:**
Based on PRD requirements for SEO, performance, and mobile-first design, recommending:
- **Framework:** Next.js 14+ (App Router) with React 18+
- **Language:** TypeScript for type safety
- **Styling:** Tailwind CSS for mobile-first responsive design
- **Analytics:** Google Analytics 4
- **Hosting:** Vercel (optimized for Next.js) or similar
- **Rationale:** Next.js provides server-side rendering for SEO, built-in image optimization, excellent performance, and is similar to Khan Academy's tech stack

## Relevant Files

*Files to be created:*

### Configuration & Setup
- `package.json` - Project dependencies and scripts
- `tsconfig.json` - TypeScript configuration
- `tailwind.config.ts` - Tailwind CSS configuration
- `next.config.js` - Next.js configuration (image domains, i18n for Thai language)
- `.env.local.example` - Environment variables template (OAuth credentials, GA tracking ID)
- `.eslintrc.json` - Linting rules

### Landing Page Implementation
- `app/page.tsx` - Main landing page component (Next.js App Router)
- `app/layout.tsx` - Root layout with metadata, fonts, analytics
- `app/globals.css` - Global styles and Tailwind imports

### Components (Sections)
- `components/landing/HeroSection.tsx` - Hero section with headline, CTAs, hero image
- `components/landing/HowItWorksSection.tsx` - 3-step process explanation
- `components/landing/FeaturesSection.tsx` - 6 key features grid
- `components/landing/ForParentsSection.tsx` - Parent-focused messaging
- `components/landing/PreviewSection.tsx` - Platform screenshots/preview
- `components/landing/CTASection.tsx` - Final call-to-action before footer
- `components/landing/FAQSection.tsx` - Expandable FAQ accordion
- `components/landing/Footer.tsx` - Footer with links and copyright

### Reusable Components
- `components/ui/Button.tsx` - Reusable button component (CTA buttons)
- `components/ui/SocialSignInButton.tsx` - Google/Facebook branded sign-in buttons
- `components/ui/FeatureCard.tsx` - Individual feature card component
- `components/ui/StepCard.tsx` - "How It Works" step card component

### Analytics & Tracking
- `lib/analytics.ts` - Google Analytics 4 initialization and event tracking utilities
- `components/analytics/GAScript.tsx` - Google Analytics script component

### Types
- `types/landing.ts` - TypeScript types for landing page data structures

### Public Assets
- `public/images/hero/` - Hero section images
- `public/images/features/` - Feature section icons (SVG)
- `public/images/screenshots/` - Platform preview screenshots
- `public/images/how-it-works/` - Step icons
- `public/favicon.ico` - Site favicon

### Testing (Optional for V1, but listed for completeness)
- `__tests__/landing/HeroSection.test.tsx` - Hero section tests
- `__tests__/components/ui/Button.test.tsx` - Button component tests

### Documentation
- `README.md` - Project setup and development instructions
- `docs/landing-page-copy.md` - All Thai language copy for easy editing by content team

## Tasks

- [ ] **1.0 Project Setup & Infrastructure**
  - [ ] 1.1 Initialize Next.js 14 project with TypeScript (`npx create-next-app@latest sanook-kids-learning --typescript --tailwind --app --eslint`)
  - [ ] 1.2 Install required dependencies: `next`, `react`, `react-dom`, `typescript`, `tailwindcss`, `@types/react`, `@types/node`
  - [ ] 1.3 Configure `tailwind.config.ts` with custom colors (Khan Academy-inspired green #14bf96, warm orange, Thai-friendly palette)
  - [ ] 1.4 Set up Thai-friendly fonts in `next.config.js` and `app/layout.tsx` (Google Fonts: Sarabun, Prompt, or Kanit)
  - [ ] 1.5 Configure `next.config.js` for image optimization (add domains for external images if needed)
  - [ ] 1.6 Create `.env.local.example` with placeholders for `NEXT_PUBLIC_GA_MEASUREMENT_ID`, `GOOGLE_OAUTH_CLIENT_ID`, `FACEBOOK_APP_ID`
  - [ ] 1.7 Set up project folder structure (`components/`, `lib/`, `types/`, `public/images/`)
  - [ ] 1.8 Configure ESLint and Prettier for code consistency
  - [ ] 1.9 Create `types/landing.ts` with TypeScript interfaces for Feature, Step, FAQ, etc.
  - [ ] 1.10 Update `README.md` with project setup instructions, development commands, and tech stack overview

- [ ] **2.0 Hero Section Implementation (Above the Fold)**
  - [ ] 2.1 Create `components/landing/HeroSection.tsx` component structure
  - [ ] 2.2 Implement headline: "เรียนรู้ในจังหวะของคุณ พิชิตหลักสูตรป.4 และ ป.6" with large, attention-grabbing typography (FR-2, FR-3)
  - [ ] 2.3 Add subheadline explaining value proposition in Thai
  - [ ] 2.4 Create `components/ui/SocialSignInButton.tsx` for Google and Facebook sign-in buttons with official branding
  - [ ] 2.5 Implement hero image/illustration (placeholder or actual Thai student imagery) with responsive sizing
  - [ ] 2.6 Add trust badge: "ฟรี ไม่มีค่าใช้จ่าย ตลอดไป" with prominent styling
  - [ ] 2.7 Ensure entire hero section is visible above the fold on mobile devices (FR-4)
  - [ ] 2.8 Make hero section fully responsive (mobile: stacked vertical layout, desktop: side-by-side)
  - [ ] 2.9 Implement CTA button click tracking (prepare event handlers for analytics)
  - [ ] 2.10 Optimize hero image for performance (use Next.js Image component with WebP format)

- [ ] **3.0 Core Content Sections Implementation**
  - [ ] 3.1 **How It Works Section:**
    - [ ] 3.1.1 Create `components/landing/HowItWorksSection.tsx` component
    - [ ] 3.1.2 Implement 3-step layout with icons: 1) ลงทะเบียนฟรี, 2) เลือกชั้นเรียน, 3) เริ่มเรียน (FR-5)
    - [ ] 3.1.3 Create `components/ui/StepCard.tsx` for individual step cards with number, icon, title, description (FR-6)
    - [ ] 3.1.4 Add secondary CTA button: "เริ่มเรียนเลย" after the 3 steps (FR-7)
    - [ ] 3.1.5 Make section responsive (3 columns on desktop, stacked on mobile)
  - [ ] 3.2 **Key Features Section:**
    - [ ] 3.2.1 Create `components/landing/FeaturesSection.tsx` component
    - [ ] 3.2.2 Create `components/ui/FeatureCard.tsx` for individual feature cards (icon + title + description) (FR-9)
    - [ ] 3.2.3 Implement all 6 features with Thai text and icons: Curriculum-aligned, Mastery learning, Short videos, Unlimited practice, Progress tracking, 100% Free (FR-8)
    - [ ] 3.2.4 Source or create 6 SVG icons for each feature
    - [ ] 3.2.5 Implement grid layout (3 columns on desktop, 2 on tablet, 1 on mobile) (FR-21)
  - [ ] 3.3 **For Parents Section:**
    - [ ] 3.3.1 Create `components/landing/ForParentsSection.tsx` component
    - [ ] 3.3.2 Add section header: "สำหรับผู้ปกครอง" (For Parents) (FR-10)
    - [ ] 3.3.3 Implement 4 key parent messages in Thai (FR-11)
    - [ ] 3.3.4 Add trust signals: Ministry of Education alignment, PDPA compliance, device accessibility (FR-12)
    - [ ] 3.3.5 Style with credibility-focused design (blue trust colors, professional typography)
  - [ ] 3.4 **Preview/Screenshots Section:**
    - [ ] 3.4.1 Create `components/landing/PreviewSection.tsx` component
    - [ ] 3.4.2 Prepare 3 high-quality screenshots: Dashboard, Lesson page, Progress tracking (FR-13)
    - [ ] 3.4.3 Add Thai captions for each screenshot (FR-14)
    - [ ] 3.4.4 Implement responsive layout (swipeable carousel on mobile, grid on desktop) (FR-21)
    - [ ] 3.4.5 Optimize screenshot images (compress, use WebP format, lazy loading)

- [ ] **4.0 Supporting Sections & Footer**
  - [ ] 4.1 **Final CTA Section:**
    - [ ] 4.1.1 Create `components/landing/CTASection.tsx` component
    - [ ] 4.1.2 Implement large headline: "พร้อมที่จะเริ่มเรียนแล้วหรือยัง?" (FR-15)
    - [ ] 4.1.3 Add subtext: "ลงทะเบียนฟรี เริ่มเรียนได้ทันที"
    - [ ] 4.1.4 Include Google and Facebook sign-in buttons (reuse `SocialSignInButton` component)
    - [ ] 4.1.5 Style with high-contrast, attention-grabbing design
  - [ ] 4.2 **FAQ Section:**
    - [ ] 4.2.1 Create `components/landing/FAQSection.tsx` with expandable/collapsible accordion (FR-17)
    - [ ] 4.2.2 Implement all 5 FAQ questions and answers in Thai (FR-16)
    - [ ] 4.2.3 Add expand/collapse functionality (can use `useState` for client-side interactivity)
    - [ ] 4.2.4 Style with clear visual indicators for expanded/collapsed states
    - [ ] 4.2.5 Ensure keyboard accessibility (Enter key to expand/collapse)
  - [ ] 4.3 **Footer:**
    - [ ] 4.3.1 Create `components/landing/Footer.tsx` component
    - [ ] 4.3.2 Add copyright notice: "© 2025 Sanook Kids Learning" (FR-18)
    - [ ] 4.3.3 Add placeholder links for Privacy Policy and Terms of Service
    - [ ] 4.3.4 Add contact information or email (if available)
    - [ ] 4.3.5 Optionally add social media link placeholders
    - [ ] 4.3.6 Make footer responsive (stack elements vertically on mobile)

- [ ] **5.0 OAuth Integration & CTA Functionality**
  - [ ] 5.1 Research and plan OAuth integration approach (will connect to PRD 0001 authentication system)
  - [ ] 5.2 Implement CTA button click handlers to prepare for OAuth flow (FR-19)
  - [ ] 5.3 Add loading state to CTA buttons when clicked (spinner or "กำลังโหลด..." text) (FR-19)
  - [ ] 5.4 Create placeholder function for triggering OAuth popup (to be implemented with backend in PRD 0001)
  - [ ] 5.5 Ensure all CTA buttons throughout the page trigger the same authentication flow (FR-20)
  - [ ] 5.6 Add error handling for authentication failures (display user-friendly Thai error message)
  - [ ] 5.7 Test CTA button accessibility (48px height for mobile tap targets) (FR-19, FR-22)
  - [ ] 5.8 Implement proper Google and Facebook branding guidelines (logos, colors, text)

- [ ] **6.0 Performance Optimization & SEO**
  - [ ] 6.1 **Performance:**
    - [ ] 6.1.1 Optimize all images (convert to WebP format with JPEG fallback) (FR-25)
    - [ ] 6.1.2 Implement lazy loading for below-the-fold images (screenshots, features icons) (FR-25)
    - [ ] 6.1.3 Configure Next.js Image component for all images with proper sizes and priority settings
    - [ ] 6.1.4 Inline critical CSS for above-the-fold content (hero section) (FR-26)
    - [ ] 6.1.5 Defer or async load all non-critical JavaScript (FR-27)
    - [ ] 6.1.6 Run Lighthouse audit and optimize for >90 performance score (FR-24, target <2 sec load)
    - [ ] 6.1.7 Enable browser caching in `next.config.js`
    - [ ] 6.1.8 Minify CSS and JavaScript (handled by Next.js build, verify)
  - [ ] 6.2 **SEO:**
    - [ ] 6.2.1 Add proper metadata in `app/layout.tsx`: title, description, Open Graph tags (FR-28)
    - [ ] 6.2.2 Set page title: "Sanook Kids Learning - เรียนฟรี ป.4 และ ป.6 คณิตศาสตร์ วิทยาศาสตร์"
    - [ ] 6.2.3 Write compelling meta description (150-160 characters in Thai, keyword-rich)
    - [ ] 6.2.4 Add Open Graph tags for social sharing (og:title, og:description, og:image, og:url)
    - [ ] 6.2.5 Set Thai language tag: `<html lang="th">` in `app/layout.tsx`
    - [ ] 6.2.6 Ensure semantic HTML structure with proper heading hierarchy (H1 → H2 → H3) (FR-29)
    - [ ] 6.2.7 Add schema.org markup for Educational Organization (JSON-LD) (FR-30)
    - [ ] 6.2.8 Add alt text in Thai for all images (FR-28, accessibility requirement)
    - [ ] 6.2.9 Create `public/robots.txt` allowing indexing
    - [ ] 6.2.10 Create `app/sitemap.ts` for XML sitemap generation
    - [ ] 6.2.11 Add favicon and app icons in `public/` directory

- [ ] **7.0 Analytics Integration & Tracking**
  - [ ] 7.1 Install Google Analytics 4 by adding gtag script to `app/layout.tsx`
  - [ ] 7.2 Create `lib/analytics.ts` with utility functions for tracking events
  - [ ] 7.3 Create `components/analytics/GAScript.tsx` component to load GA4 script
  - [ ] 7.4 Implement page view tracking (automatic in GA4, verify)
  - [ ] 7.5 Implement event tracking for all CTA clicks (Hero CTA, Secondary CTA, Final CTA)
  - [ ] 7.6 Implement scroll depth tracking (track when users reach Features section, For Parents section, Footer)
  - [ ] 7.7 Track FAQ item expansion events
  - [ ] 7.8 Track sign-up flow events: "Sign-up Started" when OAuth popup opens (prepare for integration)
  - [ ] 7.9 Test analytics in development environment (use GA4 DebugView)
  - [ ] 7.10 Document all tracked events in `docs/analytics-events.md` for reference

- [ ] **8.0 Testing & Quality Assurance**
  - [ ] 8.1 **Manual Testing:**
    - [ ] 8.1.1 Test landing page on mobile devices (iOS Safari, Android Chrome)
    - [ ] 8.1.2 Test landing page on tablet (iPad, Android tablet)
    - [ ] 8.1.3 Test landing page on desktop browsers (Chrome, Safari, Firefox, Edge)
    - [ ] 8.1.4 Verify all text is in Thai language and displays correctly (no character encoding issues)
    - [ ] 8.1.5 Test all CTA buttons are clickable and show loading states
    - [ ] 8.1.6 Test FAQ accordion expand/collapse functionality
    - [ ] 8.1.7 Verify all images load correctly and are optimized
    - [ ] 8.1.8 Test responsive breakpoints (mobile: 0-767px, tablet: 768-1023px, desktop: 1024px+)
  - [ ] 8.2 **Performance Testing:**
    - [ ] 8.2.1 Run Lighthouse performance audit (target: >90 score)
    - [ ] 8.2.2 Test page load speed on simulated 4G connection (target: <2 seconds)
    - [ ] 8.2.3 Verify Core Web Vitals: LCP, FID, CLS meet "Good" thresholds
    - [ ] 8.2.4 Test image lazy loading is working correctly
  - [ ] 8.3 **SEO & Accessibility Testing:**
    - [ ] 8.3.1 Run Lighthouse SEO audit (target: 100 score)
    - [ ] 8.3.2 Verify meta tags are correct (view page source)
    - [ ] 8.3.3 Test social sharing preview (Facebook Sharing Debugger, Twitter Card Validator)
    - [ ] 8.3.4 Run Lighthouse accessibility audit (target: >95 score)
    - [ ] 8.3.5 Test keyboard navigation (Tab through all interactive elements)
    - [ ] 8.3.6 Verify color contrast meets WCAG AA standards (4.5:1 for text)
    - [ ] 8.3.7 Test with screen reader (VoiceOver on Mac, NVDA on Windows)
  - [ ] 8.4 **Cross-Browser Testing:**
    - [ ] 8.4.1 Test in Chrome (latest version)
    - [ ] 8.4.2 Test in Safari (latest version, including iOS)
    - [ ] 8.4.3 Test in Firefox (latest version)
    - [ ] 8.4.4 Test in Edge (latest version)
  - [ ] 8.5 **Analytics Testing:**
    - [ ] 8.5.1 Verify GA4 page views are being tracked
    - [ ] 8.5.2 Test all CTA click events are firing correctly
    - [ ] 8.5.3 Test scroll depth tracking is working
    - [ ] 8.5.4 Verify events appear in GA4 DebugView in real-time
  - [ ] 8.6 **Content Review:**
    - [ ] 8.6.1 Review all Thai language text for grammar and tone
    - [ ] 8.6.2 Have a native Thai speaker review all copy
    - [ ] 8.6.3 Verify all copy matches the PRD requirements
    - [ ] 8.6.4 Check for consistency in terminology (e.g., "ป.4" vs "ชั้น ป.4")
  - [ ] 8.7 **Final Checklist:**
    - [ ] 8.7.1 All 30 functional requirements from PRD are implemented
    - [ ] 8.7.2 All 8 sections of the page are complete and functional
    - [ ] 8.7.3 Mobile-first design confirmed (looks great on phones first)
    - [ ] 8.7.4 Page loads in <2 seconds on 4G
    - [ ] 8.7.5 All CTA buttons are ready for OAuth integration (PRD 0001)
    - [ ] 8.7.6 No console errors in browser developer tools
    - [ ] 8.7.7 Create `docs/landing-page-copy.md` with all Thai text for easy content team editing

---

## Notes

- **Content Dependencies:** This task list assumes you have or will create hero images, feature icons, and screenshots. Use placeholder images initially and replace with final assets later.
- **OAuth Integration:** Task 5.0 prepares the buttons and handlers, but full OAuth implementation comes from PRD 0001. For now, buttons can console.log or show an alert.
- **Thai Language:** All copy must be reviewed by a native Thai speaker for grammar, tone, and cultural appropriateness.
- **Testing Priority:** Focus on mobile testing first (mobile-first approach), then tablet and desktop.
- **Performance is Critical:** The <2 second load time target on 4G is essential for good user experience in Thailand.
- **Next.js Benefits:** Automatic code splitting, image optimization, and SSR for SEO are built into Next.js - leverage these features.

## Success Criteria

✅ Landing page loads in <2 seconds on 4G mobile  
✅ All 8 sections implemented per PRD specifications  
✅ Lighthouse scores: Performance >90, SEO 100, Accessibility >95  
✅ Works perfectly on mobile devices (primary user device)  
✅ All Thai text is grammatically correct and culturally appropriate  
✅ CTAs are ready for OAuth integration  
✅ Analytics tracking is functional and verified  

---

**Total Sub-tasks:** 93 actionable items across 8 parent tasks
**Estimated Timeline:** 2-3 weeks for experienced developer, 3-4 weeks for junior developer
**Priority:** High - This is the first user touchpoint and critical for conversions

