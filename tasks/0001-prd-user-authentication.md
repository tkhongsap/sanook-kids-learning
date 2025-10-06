# PRD: User Authentication (Social Login)

## 1. Introduction/Overview

This feature enables users to sign up and sign in to the Sanook Kids Learning platform using their existing Google or Facebook accounts. This removes the barrier of creating yet another username/password combination, making it easy for parents to quickly get their children started with learning.

**Problem it solves:** Parents want a quick, frictionless way to get their child started without managing another password. Students need to access their saved progress from any device.

**Goal:** Implement a secure, simple social authentication system that allows users to sign up and log in within 1-2 clicks.

## 2. Goals

1. Enable users to authenticate using Google OAuth 2.0
2. Enable users to authenticate using Facebook Login
3. Create and persist user profiles in the database upon first login
4. Maintain user sessions across browser sessions
5. Provide a clear logout mechanism
6. Handle authentication errors gracefully

## 3. User Stories

1. **As a parent**, I want to sign my child up quickly using my Google account so we don't need to create and remember another password.

2. **As a student**, I want to log in with one click so I can get back to my lessons right away without typing anything.

3. **As a returning user**, I want the system to remember me when I come back so I can continue where I left off.

4. **As a user**, I want to be able to log out when I'm done, especially if I'm using a shared device.

5. **As a new user**, I want to be asked which grade I'm in right after I sign up so the system shows me the right content.

## 4. Functional Requirements

### Authentication Flow

**FR-1:** The system must display a landing page with two clear sign-in options:
  - "ลงชื่อเข้าใช้ด้วย Google" (Sign in with Google)
  - "ลงชื่อเข้าใช้ด้วย Facebook" (Sign in with Facebook)

**FR-2:** The system must integrate with Google OAuth 2.0 API to handle Google authentication.

**FR-3:** The system must integrate with Facebook Login API to handle Facebook authentication.

**FR-4:** Upon successful authentication from a social provider, the system must receive at minimum:
  - User ID (from provider)
  - Name
  - Email address

### User Profile Creation

**FR-5:** For new users (first-time login), the system must:
  - Create a new user record in the database
  - Store: `user_id` (internal), `social_provider` (Google/Facebook), `social_provider_id`, `name`, `email`, `created_at`
  - Redirect the user to a Grade Selection screen

**FR-6:** The Grade Selection screen must ask "นักเรียนอยู่ชั้นอะไรเอ่ย?" (Which grade are you in?) and present two options:
  - "ชั้น ป.4" (Grade 4)
  - "ชั้น ป.6" (Grade 6)

**FR-7:** Once a grade is selected, the system must:
  - Save `grade_level` to the user's profile
  - Redirect the user to their personalized dashboard

### Returning Users

**FR-8:** For returning users (users already in the database), the system must:
  - Recognize them by their `social_provider_id`
  - Load their saved profile data including `grade_level`
  - Redirect them directly to their dashboard (skip Grade Selection)

### Session Management

**FR-9:** The system must create a secure session token upon successful authentication.

**FR-10:** User sessions must persist after the browser tab is closed and reopened.

**FR-11:** Sessions should remain valid for at least 30 days of inactivity.

### Logout

**FR-12:** A clear "ออกจากระบบ" (Logout) button must be visible in the main navigation bar on all authenticated pages.

**FR-13:** When a user clicks logout:
  - The system must invalidate the current session
  - Redirect the user to the landing page
  - The user should not be able to use the back button to access authenticated pages

### Error Handling

**FR-14:** If authentication fails (user cancels, network error, API error), the system must:
  - Display a friendly error message in Thai
  - Provide an option to try again
  - Not crash or show technical error details

**FR-15:** If a user's email is not provided by the social provider, the system should still allow sign-up but log this for monitoring.

## 5. Non-Goals (Out of Scope)

- Email/password authentication (Future: Post-V1)
- User profile editing (e.g., changing name, email)
- Account deletion
- Line or other social providers
- Multi-user profiles per account (e.g., multiple children)
- Two-factor authentication
- Role-based access (admin, teacher roles)

## 6. Design Considerations

### UI/UX Requirements

- The sign-in buttons should be large, prominent, and use the official Google/Facebook branding guidelines
- The landing page should feel welcoming and educational (see Section 6.1 of main PRD: bright, positive colors)
- The Grade Selection screen should have large, easy-to-tap cards for Grade 4 and Grade 6
- All text must be in Thai language
- The logout button should be visible but not overly prominent (e.g., in a top-right user menu)

### Responsive Design

- Must work on desktop, tablet, and mobile devices
- Touch targets must be at least 44x44px for mobile usability

### Khan Academy Onboarding Reference

Study Khan Academy's sign-up and onboarding experience for best practices:

**Landing Page:**
- [Khan Academy Homepage](https://www.khanacademy.org/): Note the clear value proposition and prominent sign-up CTA
- Clean, trustworthy design that appeals to both parents and students
- Social proof elements (if applicable: "Join 100,000+ Thai students learning...")

**Sign-In Flow:**
- Khan Academy uses Google/Facebook/Apple sign-in options prominently
- Simple, one-click authentication reduces friction
- Clear privacy messaging to build trust

**Grade/Level Selection:**
- Khan Academy asks "What would you like to learn?" with clear visual options
- Large cards with icons make selection easy and engaging
- Consider adding brief descriptions (e.g., "ป.4: อายุ 9-10 ปี, คณิตศาสตร์และวิทยาศาสตร์")

**First-Time User Experience:**
- After sign-up, immediate value: show the dashboard with available content
- Optional: Brief 3-step walkthrough (skip-able) explaining how to use the platform
- Welcoming message: "ยินดีต้อนรับ [Name]! มาเริ่มเรียนกันเลย" (Welcome [Name]! Let's start learning)

## 7. Technical Considerations

### Integration Points

- Must integrate with the existing database schema (or create initial user schema)
- Should use environment variables for OAuth client IDs and secrets (never hardcode)
- Must use HTTPS for all authentication flows (security requirement)

### Security

- All communication must be over HTTPS
- Session tokens must be HttpOnly and Secure cookies
- Must comply with Thailand's Personal Data Protection Act (PDPA)
- OAuth state parameter must be validated to prevent CSRF attacks

### Dependencies

- Google OAuth 2.0 API access
- Facebook Login API access
- Backend framework with OAuth library support
- Database for storing user profiles

### Suggested Tech Stack Considerations

- For OAuth: Consider using established libraries (e.g., `passport.js` for Node.js, `social-auth` for Python/Django)
- For session management: Consider using secure session middleware
- Database: Should support standard user authentication patterns

## 8. Success Metrics

1. **Conversion Rate:** \>90% of users who click a social login button successfully complete authentication
2. **Sign-up Time:** Average time from landing page to dashboard is <60 seconds for new users
3. **Session Persistence:** \>95% of returning users are automatically logged in without re-authenticating
4. **Error Rate:** <2% of authentication attempts result in errors
5. **User Adoption:** Track ratio of Google vs. Facebook logins to inform future provider priorities

## 9. Open Questions

1. Should we allow users to change their selected grade level after initial selection? (Decision: Defer to Progress Tracking PRD)
2. What should happen if a user signs in with Google one time and Facebook another time using the same email? (Recommendation: Treat as separate accounts for V1, merge capability in future)
3. Should we collect any analytics data during sign-up? (e.g., how they found the site)
4. What is the desired behavior for users under 13 years old per COPPA/privacy regulations?

---

**Related PRDs:**
- `0002-prd-content-navigation.md` (Grade Selection leads to Content Navigation)
- `0004-prd-progress-tracking.md` (Authentication enables progress tracking)

