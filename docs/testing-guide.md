# Testing Guide - Sanook Kids Learning Landing Page

## Overview
This guide provides step-by-step instructions for manually testing the landing page across different devices and browsers.

---

## 8.1 Manual Testing Checklist

### 8.1.1 Mobile Testing (iOS Safari & Android Chrome)

#### iOS Safari Testing
**Devices:** iPhone 12/13/14/15 or newer

1. **Load Page:**
   - [ ] Page loads without errors
   - [ ] All sections visible and properly styled
   - [ ] Thai text displays correctly (no character encoding issues)

2. **Hero Section:**
   - [ ] Headline readable and properly sized
   - [ ] CTA buttons (Google/Facebook) are tappable (48px height)
   - [ ] Trust badge visible
   - [ ] Hero image/placeholder loads

3. **How It Works:**
   - [ ] 3 steps stack vertically on mobile
   - [ ] Icons display correctly
   - [ ] Text is readable

4. **Features Section:**
   - [ ] 6 feature cards stack vertically
   - [ ] Icons visible
   - [ ] Text doesn't overflow

5. **For Parents:**
   - [ ] Section displays properly
   - [ ] Trust signals visible
   - [ ] Text readable

6. **Preview/Screenshots:**
   - [ ] Carousel/swipe functionality works
   - [ ] Images load
   - [ ] Thai captions visible

7. **Final CTA:**
   - [ ] Background gradient displays
   - [ ] Buttons tappable
   - [ ] Text readable on gradient

8. **FAQ:**
   - [ ] Questions tappable
   - [ ] Expand/collapse animation smooth
   - [ ] Text readable when expanded

9. **Footer:**
   - [ ] Links stack vertically
   - [ ] All text readable
   - [ ] Social icons visible

10. **Interactions:**
    - [ ] CTA buttons show loading state when clicked
    - [ ] Error messages display correctly (if triggered)
    - [ ] FAQ expand/collapse works smoothly
    - [ ] Scroll performance is smooth

#### Android Chrome Testing
**Devices:** Samsung Galaxy S21/S22/S23 or Google Pixel

Repeat all tests from iOS Safari section above.

**Additional Android Checks:**
- [ ] Font rendering is clear
- [ ] Touch targets are easily tappable
- [ ] No layout shift on load

---

### 8.1.2 Tablet Testing (iPad & Android Tablet)

#### iPad Testing (Safari)
**Devices:** iPad Air, iPad Pro (10.9" or 12.9")

1. **Layout:**
   - [ ] Features display in 2-column grid
   - [ ] How It Works displays in 3 columns
   - [ ] Hero section uses side-by-side layout
   - [ ] All text is readable at tablet size

2. **Touch Targets:**
   - [ ] All buttons are easily tappable
   - [ ] FAQ items expand/collapse smoothly

3. **Orientation:**
   - [ ] Test both portrait and landscape
   - [ ] Layout adapts correctly to orientation changes

#### Android Tablet Testing
**Devices:** Samsung Galaxy Tab S8/S9

Repeat all tests from iPad section above.

---

### 8.1.3 Desktop Browser Testing

#### Chrome (Latest)
**Resolution:** 1920x1080

1. **Full Page Review:**
   - [ ] All 8 sections visible
   - [ ] Hero section fits above the fold
   - [ ] Footer at bottom

2. **Layout:**
   - [ ] Features in 3-column grid
   - [ ] How It Works in 3 columns
   - [ ] Hero uses 2-column layout (text + image)
   - [ ] Preview/Screenshots in 3-column grid

3. **Hover States:**
   - [ ] CTA buttons show hover effect
   - [ ] Feature cards show hover effect
   - [ ] Footer links show hover effect

4. **Responsive Testing:**
   - [ ] Resize browser window from 1920px to 375px
   - [ ] Layout breakpoints work correctly:
     - Desktop: 1024px+
     - Tablet: 768-1023px
     - Mobile: 0-767px

#### Safari, Firefox, Edge
Repeat all desktop tests in each browser.

---

### 8.1.4 Thai Text & Character Encoding

**Checklist:**
- [ ] All headlines display Thai characters correctly
- [ ] No "????" or garbled characters
- [ ] Thai font (Sarabun/Prompt/Kanit) loads properly
- [ ] Line breaks are logical in Thai text
- [ ] Spacing between Thai words is correct

**Test Sections:**
- [ ] Hero headline and subheadline
- [ ] How It Works step titles
- [ ] Feature card descriptions
- [ ] For Parents content
- [ ] FAQ questions and answers
- [ ] Footer text

---

### 8.1.5 CTA Button Testing

**Test All 3 CTA Locations:**

#### Hero Section:
- [ ] Google button: Click → shows loading → logs event
- [ ] Facebook button: Click → shows loading → logs event
- [ ] Loading spinner appears
- [ ] "กำลังโหลด..." text displays

#### Final CTA Section:
- [ ] Google button: Click → shows loading → logs event
- [ ] Facebook button: Click → shows loading → logs event
- [ ] Same behavior as Hero section

**Error Testing:**
- [ ] Trigger an error (if possible in dev mode)
- [ ] Error message displays in Thai
- [ ] Error message is dismissible (X button)
- [ ] Error clears when clicked again

---

### 8.1.6 FAQ Accordion Testing

**Test All 5 Questions:**

1. **ต้องเสียเงินไหม?**
   - [ ] Click → expands smoothly
   - [ ] Answer visible
   - [ ] Click again → collapses

2. **มีเนื้อหาวิชาอะไรบ้าง?**
   - [ ] Same as above

3. **เหมาะกับลูกอายุเท่าไหร่?**
   - [ ] Same as above

4. **สอดคล้องกับหลักสูตรโรงเรียนไหม?**
   - [ ] Same as above

5. **ต้องใช้อุปกรณ์อะไร?**
   - [ ] Same as above

**Additional Tests:**
- [ ] Only one FAQ can be open at a time
- [ ] Chevron icon rotates on expand
- [ ] Keyboard navigation works (Tab + Enter)
- [ ] Focus ring visible on keyboard focus

---

### 8.1.7 Image & Visual Asset Testing

**Verify All Visual Elements:**
- [ ] Hero image placeholder displays
- [ ] How It Works icons (SVG) render correctly
- [ ] Feature icons (6 total) render correctly
- [ ] For Parents icons render correctly
- [ ] Screenshot placeholders display
- [ ] No broken image icons
- [ ] No layout shift when images load

---

### 8.1.8 Scroll & Navigation Testing

**Smooth Scroll:**
- [ ] Page scrolls smoothly on all devices
- [ ] No janky animations
- [ ] FAQ expand doesn't cause scroll jump
- [ ] Footer links scroll smoothly (if implemented)

**Page Performance:**
- [ ] No flash of unstyled content (FOUC)
- [ ] No layout shift during load
- [ ] Fonts load without causing reflow

---

## Testing Notes

### Browser DevTools Console
Keep console open during testing and verify:
- [ ] No JavaScript errors
- [ ] Analytics events logged: `[Analytics] Event: cta_click`
- [ ] Auth events logged: `[Auth Hook] Sign-in successful`
- [ ] No 404 errors for assets

### Network Tab
- [ ] All assets load (no 404s)
- [ ] Images are WebP format
- [ ] JavaScript files are minified
- [ ] CSS is minified

---

## Test Result Template

```
Device: [iPhone 14 Pro / iPad Air / Desktop Chrome]
Date: [YYYY-MM-DD]
Tester: [Name]

✅ Pass | ⚠️ Issue | ❌ Fail

Section | Status | Notes
--------|--------|-------
Hero    | ✅     | All working
How It Works | ✅ | Animations smooth
Features | ⚠️    | Icon #3 slightly misaligned on mobile
...
```

---

## Quick Test Script (5 Minutes)

For rapid testing:

1. ✅ Load page → Check all sections visible
2. ✅ Click Google CTA → Verify loading state
3. ✅ Expand 2 FAQ items → Verify animation
4. ✅ Scroll to footer → Verify smooth scroll
5. ✅ Check console → No errors
6. ✅ Check Network tab → All assets loaded

---

**Testing Status:** Ready for manual testing  
**Automated Tests:** See Lighthouse audit results below  
**Last Updated:** October 2025

