# PRD: Progress Tracking & Visualization

## 1. Introduction/Overview

This feature implements a comprehensive progress tracking system that saves all user learning achievements and visualizes their progress throughout the platform. It ensures that mastery status is persisted across sessions and devices, and provides motivating visual feedback on the user's learning journey.

**Problem it solves:** Students and parents need to see what has been learned and what remains to be studied. Without progress tracking, students may feel lost or unmotivated, and have no way to return to their learning on different devices.

**Goal:** Create a robust progress persistence and visualization system that saves mastery achievements to user accounts and displays progress indicators throughout the navigation hierarchy (dashboard, subject pages, unit pages).

## 2. Goals

1. Persist all mastery achievements to the database linked to user accounts
2. Display mastery status (checkmarks) on completed lessons in unit pages
3. Show progress bars/percentages on unit cards indicating completion
4. Show overall subject progress on dashboard cards
5. Ensure progress is synced across all devices when user logs in
6. Provide a clear visual distinction between mastered and unmastered content

## 3. User Stories

1. **As a student**, I want to see a checkmark next to lessons I've completed so I know what I've already mastered.

2. **As a student**, I want to log in from my school computer and see all the progress I made at home so I can continue learning.

3. **As a parent**, I want to see at a glance how much of the Math unit my child has completed so I can track their learning.

4. **As a student**, I want to see a progress bar fill up as I complete more lessons so I feel motivated to finish the whole unit.

5. **As a returning user**, I want to easily identify what I should work on next by seeing what isn't completed yet.

6. **As a student**, I want to see my overall progress across all subjects on my dashboard so I can decide what to study today.

## 4. Functional Requirements

### Database Schema & Data Persistence

**FR-1:** The system must maintain a `user_progress` table (or equivalent) to track mastery, with the following fields:
  - `user_id` (foreign key to users table)
  - `lesson_id` (foreign key to lessons table)
  - `mastered` (boolean: true when ≥80% achieved)
  - `attempts` (integer: number of practice attempts)
  - `best_score` (integer: highest score achieved)
  - `mastered_at` (timestamp: when mastery was first achieved)
  - `last_attempted_at` (timestamp: most recent practice attempt)

**FR-2:** When a student achieves mastery (≥80% on practice):
  - A new record must be created in `user_progress` (or existing record updated)
  - `mastered` must be set to `true`
  - `mastered_at` must be set to current timestamp (if first time)

**FR-3:** User progress data must be linked to the authenticated user's `user_id`.

**FR-4:** Progress must persist across browser sessions, devices, and logins.

### Unit Page - Lesson Mastery Indicators

**FR-5:** On the Unit Page (lesson list), each lesson item must display a visual mastery indicator:
  - If mastered: Show a green checkmark icon (✓) or "ผ่านแล้ว" badge
  - If not mastered: Show neutral state (no checkmark, gray or default color)

**FR-6:** Mastered lessons should have visual distinction:
  - Text could be a different color (e.g., green) or have a subtle background color
  - Checkmark should be prominently visible

**FR-7:** The mastery indicator must update immediately after a student achieves mastery on a lesson (either by page refresh or live update).

### Subject Page - Unit Progress Cards

**FR-8:** On the Subject Page, each unit card must display a progress indicator showing completion within that unit.

**FR-9:** Progress can be displayed as:
  - **Option A:** Fraction (e.g., "3/8 บทเรียน" - "3/8 lessons")
  - **Option B:** Percentage (e.g., "38% เสร็จแล้ว" - "38% complete")
  - **Option C:** Progress bar (visual bar that fills up)
  - **Recommended:** Use a progress bar + fraction/percentage for clarity

**FR-10:** Progress calculation for a unit:
  - Count total lessons in the unit
  - Count how many of those lessons the user has mastered
  - Display: `(mastered_count / total_count) * 100%`

**FR-11:** Units with 0% progress should still be clearly accessible (not grayed out or locked).

**FR-12:** Units with 100% completion should have a clear visual celebration (e.g., gold star, "สำเร็จแล้ว!" badge).

### Dashboard - Subject Progress Overview

**FR-13:** On the Dashboard, each subject card must display overall progress across all units in that subject.

**FR-14:** Subject-level progress calculation:
  - Count total lessons across all units in the subject
  - Count how many of those lessons the user has mastered
  - Display as percentage and/or progress bar

**FR-15:** Subjects with higher completion should feel rewarding (e.g., progress bar in bright green).

### Loading User Progress

**FR-16:** When a user logs in and navigates to any page:
  - The system must query the database for all `user_progress` records for that `user_id`
  - Progress indicators must be calculated and displayed

**FR-17:** Progress data should be loaded efficiently:
  - Consider caching user progress on the frontend after initial load
  - Only re-fetch when progress is updated

**FR-18:** If a user has no progress yet (new user), all lessons/units should show 0% progress clearly.

### Real-Time Progress Updates

**FR-19:** When a user achieves mastery on a lesson:
  - The lesson page should show the celebration screen
  - When the user returns to the Unit page, the checkmark should appear immediately (without requiring a full page reload)

**FR-20:** Progress bars on unit and subject cards should update when returning from a lesson.

### Multi-Device Sync

**FR-21:** User progress must be stored server-side (not just in browser local storage).

**FR-22:** When a user logs in from a different device, all progress must be immediately available and visible.

**FR-23:** If a user attempts the same lesson from two devices simultaneously, the system should handle conflicts gracefully (e.g., most recent mastery wins).

## 5. Non-Goals (Out of Scope)

- Detailed analytics dashboard (which questions were missed, time spent, etc.)
- Progress reports or export functionality
- Goal-setting features (e.g., "Complete 3 lessons this week")
- Learning streaks or daily practice tracking
- Comparison with other students or class averages
- Parent/teacher portal to view student progress
- Reset or undo mastery status
- Certificate generation upon unit/subject completion
- Progress notifications or reminders
- Historical progress graphs or charts

## 6. Design Considerations

### Visual Design - Khan Academy Inspired

**Checkmarks:**
- Use a clear, bold checkmark icon (✓)
- Color: Green (#00a862 or similar Khan Academy green)
- Size: Should be easily visible without being overwhelming
- Consider subtle animation when checkmark first appears

**Progress Bars:**
- Clean, modern progress bar design
- Empty state: Light gray background
- Filled state: Bright green (matching checkmark color)
- Should have smooth animation when filling
- Include percentage or fraction text near the bar

**Completed Units/Subjects:**
- Could show a gold star ⭐ or special badge
- "100%" should be prominently displayed
- Consider subtle celebration animation

**Layout:**
- Progress indicators should not clutter the interface
- On cards: Place progress bar at bottom of card
- On lesson lists: Place checkmark to the left of lesson name

### Responsive Design

- Progress bars should scale appropriately on all screen sizes
- Checkmarks should remain visible and clear on mobile
- Progress text should remain readable (don't shrink too small)

### Accessibility

- Don't rely solely on color to indicate mastery (use icon + color)
- Screen readers should announce "mastered" or "completed" status
- Progress percentages should be available as text for screen readers

## 7. Technical Considerations

### Database Design

**User Progress Table Example:**
```sql
CREATE TABLE user_progress (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  lesson_id INT NOT NULL,
  mastered BOOLEAN DEFAULT FALSE,
  attempts INT DEFAULT 0,
  best_score INT,
  mastered_at TIMESTAMP,
  last_attempted_at TIMESTAMP,
  UNIQUE(user_id, lesson_id),
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (lesson_id) REFERENCES lessons(id)
);
```

### API Endpoints Needed

- `GET /api/user/:userId/progress` - Fetch all progress for a user
- `GET /api/user/:userId/progress/subject/:subjectId` - Progress for one subject
- `GET /api/user/:userId/progress/unit/:unitId` - Progress for one unit
- `POST /api/user/:userId/lesson/:lessonId/mastery` - Record mastery achievement
- `GET /api/user/:userId/stats` - Overall statistics (for future analytics)

### Performance Considerations

- Cache user progress data after initial fetch
- Use efficient database queries (proper indexing on user_id, lesson_id)
- Progress calculations should be fast (<100ms)
- Consider server-side calculation of progress percentages to reduce client load

### Data Integrity

- Prevent duplicate mastery records (use UNIQUE constraint or upsert logic)
- Validate that lesson_id exists before saving progress
- Ensure user_id matches authenticated user (security)

### Dependencies

- User authentication system (PRD 0001) - must know who the user is
- Content structure (PRD 0002) - must have subjects, units, lessons defined
- Mastery achievement system (PRD 0003) - triggers progress updates

## 8. Success Metrics

1. **Progress Visibility:** 100% of mastered lessons show checkmarks within 2 seconds of page load
2. **Data Persistence:** 100% of mastery achievements are successfully saved to database
3. **Multi-Device Sync:** >99% of progress correctly appears when logging in from different device
4. **User Engagement:** Students with visible progress complete 2x more lessons than those without (A/B test hypothesis)
5. **Return Rate:** Students who can see their progress return to the platform 1.5x more frequently
6. **Page Load Performance:** Progress data loading adds <500ms to page load time

## 9. Open Questions

1. Should we allow students to re-attempt mastered lessons and update their best score? (Recommendation: Yes, allow re-practice but keep mastery status)
2. Should we show dates of when lessons were mastered? (Recommendation: Not in V1, maybe in profile page later)
3. What happens if content team removes or reorganizes lessons? How do we handle orphaned progress records? (Recommendation: Soft delete, keep historical records)
4. Should we implement an "Undo mastery" feature for testing purposes? (Recommendation: Admin-only feature)
5. Should progress data ever expire? (e.g., mastery from 2 years ago) (Recommendation: No, keep forever to motivate long-term users)
6. Should we track partial lesson completion (e.g., watched video but didn't practice)? (Recommendation: Defer to V2)

---

**Related PRDs:**
- `0001-prd-user-authentication.md` (Progress is linked to authenticated user accounts)
- `0002-prd-content-navigation.md` (Progress indicators displayed throughout navigation)
- `0003-prd-learning-mastery-system.md` (Mastery achievement triggers progress updates)

**Privacy Note:**
User progress data is personal information and must be handled in compliance with Thailand's Personal Data Protection Act (PDPA). Progress should only be visible to the authenticated user (and potentially parents/teachers in future features).

