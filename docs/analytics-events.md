# Analytics Events Documentation

## Overview
This document describes all Google Analytics 4 (GA4) events tracked in the Sanook Kids Learning platform.

## Configuration
- **Platform:** Google Analytics 4 (GA4)
- **Implementation:** gtag.js
- **Environment Variable:** `NEXT_PUBLIC_GA_MEASUREMENT_ID`

## Events

### 1. CTA Click Events

**Event Name:** `cta_click`

**Description:** Tracks when users click on Call-to-Action buttons (Google or Facebook sign-in)

**Parameters:**
| Parameter | Type | Values | Description |
|-----------|------|---------|-------------|
| `cta_location` | string | `hero`, `how_it_works`, `final_cta` | Location of the CTA button |
| `auth_provider` | string | `google`, `facebook` | OAuth provider selected |
| `event_category` | string | `engagement` | Category for grouping |
| `event_label` | string | `{location}_{provider}` | Combined label for filtering |

**Example:**
```javascript
trackCTAClick('hero', 'google');
// Sends: { cta_location: 'hero', auth_provider: 'google', event_category: 'engagement', event_label: 'hero_google' }
```

---

### 2. Sign-Up Started

**Event Name:** `sign_up_started`

**Description:** Tracks when OAuth sign-in flow is initiated

**Parameters:**
| Parameter | Type | Values | Description |
|-----------|------|---------|-------------|
| `auth_provider` | string | `google`, `facebook` | OAuth provider |
| `event_category` | string | `conversion` | Category for grouping |

**Example:**
```javascript
trackSignUpStarted('google');
```

---

### 3. Sign-Up Completed

**Event Name:** `sign_up_completed`

**Description:** Tracks when OAuth sign-in succeeds and user is authenticated

**Parameters:**
| Parameter | Type | Values | Description |
|-----------|------|---------|-------------|
| `auth_provider` | string | `google`, `facebook` | OAuth provider |
| `event_category` | string | `conversion` | Category for grouping |

**Example:**
```javascript
trackSignUpCompleted('facebook');
```

---

### 4. FAQ Interaction

**Event Name:** `faq_interaction`

**Description:** Tracks when users expand or collapse FAQ items

**Parameters:**
| Parameter | Type | Values | Description |
|-----------|------|---------|-------------|
| `question_id` | string | `cost`, `subjects`, `age`, `curriculum`, `devices` | FAQ question identifier |
| `question_text` | string | Thai question text | Full question text in Thai |
| `action` | string | `expand`, `collapse` | User action |
| `event_category` | string | `engagement` | Category for grouping |

**Example:**
```javascript
trackFAQInteraction('cost', 'ต้องเสียเงินไหม?', 'expand');
```

---

### 5. Scroll Depth

**Event Name:** `scroll_depth`

**Description:** Tracks when users scroll to specific sections of the landing page

**Parameters:**
| Parameter | Type | Values | Description |
|-----------|------|---------|-------------|
| `section_name` | string | Section name | Name of the section reached |
| `depth_percentage` | number | 0-100 | Scroll depth percentage |
| `event_category` | string | `engagement` | Category for grouping |

**Example:**
```javascript
trackScrollDepth('features', 50);
```

**Tracked Sections:**
- Hero Section (0%)
- How It Works (25%)
- Key Features (40%)
- For Parents (60%)
- Preview/Screenshots (75%)
- Final CTA (85%)
- FAQ (90%)
- Footer (100%)

---

### 6. Section View

**Event Name:** `section_view`

**Description:** Tracks when a section becomes visible in the viewport (using Intersection Observer)

**Parameters:**
| Parameter | Type | Values | Description |
|-----------|------|---------|-------------|
| `section_name` | string | Section name | Name of the visible section |
| `event_category` | string | `engagement` | Category for grouping |

**Example:**
```javascript
trackSectionView('features');
```

---

### 7. Error Events

**Event Name:** `error`

**Description:** Tracks authentication errors and failures

**Parameters:**
| Parameter | Type | Values | Description |
|-----------|------|---------|-------------|
| `error_type` | string | Error code | Type of error (e.g., `popup_blocked`, `auth_failed`) |
| `error_message` | string | Error message | User-friendly Thai error message |
| `auth_provider` | string | `google`, `facebook` | OAuth provider (optional) |
| `event_category` | string | `error` | Category for grouping |

**Example:**
```javascript
trackError('popup_blocked', 'กรุณาอนุญาตให้เปิดหน้าต่างใหม่ในเบราว์เซอร์', 'google');
```

**Common Error Codes:**
- `popup_blocked` - Browser blocked OAuth popup
- `popup_closed` - User closed popup before completion
- `network_error` - Network connectivity issue
- `auth_failed` - Authentication failed
- `server_error` - Server-side error
- `permission_denied` - User denied permissions

---

### 8. Page View

**Event Name:** `page_view` (automatic)

**Description:** Automatically tracked by GA4 when users navigate pages

**Parameters:** (handled by GA4 automatically)
- `page_path` - URL path
- `page_location` - Full URL
- `page_title` - Page title

**Note:** This is automatically tracked by GA4 and the GAScript component.

---

## Event Categories

Events are grouped into the following categories for easier analysis:

| Category | Purpose | Events |
|----------|---------|--------|
| `engagement` | User interaction tracking | `cta_click`, `faq_interaction`, `scroll_depth`, `section_view` |
| `conversion` | Conversion funnel tracking | `sign_up_started`, `sign_up_completed` |
| `error` | Error monitoring | `error` |

---

## Development Testing

### Testing in Development

When `NEXT_PUBLIC_GA_MEASUREMENT_ID` is not set or equals `G-XXXXXXXXXX`:
- Events are **logged to console** instead of sent to GA4
- Look for logs prefixed with `[Analytics]`
- No actual data is sent to Google Analytics

### Testing with GA4 DebugView

1. Set `NEXT_PUBLIC_GA_MEASUREMENT_ID` in `.env.local`
2. Add `?debug_mode=true` to your URL
3. Open GA4 DebugView in Google Analytics console
4. Interact with the landing page
5. See events appear in real-time in DebugView

---

## Implementation Files

| File | Purpose |
|------|---------|
| `lib/analytics.ts` | Core analytics utilities and tracking functions |
| `components/analytics/GAScript.tsx` | GA4 script loader and page view tracking |
| `hooks/useAuth.ts` | Auth-related event tracking |
| `components/landing/HeroSection.tsx` | Hero CTA tracking |
| `components/landing/CTASection.tsx` | Final CTA tracking |
| `components/landing/FAQSection.tsx` | FAQ interaction tracking |

---

## Future Enhancements (PRD 0001+)

The following events will be added in future PRDs:

- **Lesson Started** - When user starts a lesson
- **Lesson Completed** - When user completes a lesson
- **Question Answered** - When user answers a practice question
- **Mastery Achieved** - When user achieves mastery in a topic
- **Video Watched** - Video playback events
- **Progress Milestone** - When user reaches progress milestones

---

**Last Updated:** October 2025  
**Version:** 1.0 (Landing Page Only)

