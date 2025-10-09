# PRD: Content Structure & Navigation

## 1. Introduction/Overview

This feature establishes the structural organization and navigation system for all learning content on the Sanook Kids Learning platform. It defines how subjects, units, and lessons are organized, displayed, and accessed by students.

**Problem it solves:** Students need an intuitive, visual way to browse available content, understand what topics are available, and navigate to specific lessons they want to study.

**Goal:** Create a clear, hierarchical content structure (Grade → Subject → Unit → Lesson) with an intuitive navigation system that a 9-year-old can use independently.

## 2. Goals

1. Implement a grade-specific dashboard showing available subjects
2. Create subject pages displaying units as visual cards
3. Build unit pages listing all lessons/topics within that unit
4. Provide clear breadcrumb or back navigation at all levels
5. Display visual progress indicators on units showing completion status
6. Ensure all navigation is intuitive for primary school students

## 3. User Stories

1. **As a Grade 4 student**, I want to see Math and Science subjects for my selected grade on my dashboard so I'm not overwhelmed with too many choices.

1a. **As a multi-grade learner**, I want to see content organized by grade level when I've selected multiple grades so I can choose which grade's content to study.

2. **As a student**, I want to click on Math and see all the different topics (units) I can learn, displayed as cards with pictures, so I can easily find what I'm studying in school.

3. **As a parent helping my child**, I want to find a specific topic like "Fractions" quickly so we can work on homework together.

4. **As a student**, I want to see a list of all lessons inside a unit so I know what order to study them in.

5. **As a student**, I want to easily go back to the subject page or my dashboard without getting lost.

6. **As a student**, I want to see which units I've already completed so I know what to do next.

## 4. Functional Requirements

### Content Hierarchy

**FR-1:** The system must organize content in the following hierarchy:
```
Grade Level (ป.4 or ป.6)
  └─ Subject (วิชา) - e.g., Mathematics, Science
      └─ Unit (หน่วยการเรียน) - e.g., Fractions, Electricity
          └─ Lesson/Topic (บทเรียน) - e.g., "Introduction to Fractions"
```

**FR-2:** For Version 1, the system must support:
  - 2 Grade Levels: Grade 4 (ป.4) and Grade 6 (ป.6)
  - 2 Subjects: Mathematics (คณิตศาสตร์) and Science (วิทยาศาสตร์)
  - Multiple Units per subject (exact number determined by content team)
  - Multiple Lessons per unit (exact number determined by content team)

### Dashboard (Grade-Level View)

**FR-3:** Upon login, users must land on their personalized dashboard showing content for all their selected grade levels.

**FR-3a:** For users with a single grade level selected:
  - Display subjects (Math and Science) for that grade level

**FR-3b:** For users with multiple grade levels selected:
  - Organize content by grade level (e.g., sections for "ชั้น ป.4" and "ชั้น ป.6")
  - Each grade section displays its subjects (Math and Science)
  - OR provide a grade level selector/toggle to switch between grade views

**FR-4:** The dashboard must display the available subjects (Math and Science) as large, clickable cards for each selected grade level.

**FR-5:** Each subject card must include:
  - Subject name in Thai (e.g., "คณิตศาสตร์ ป.4" or "วิทยาศาสตร์ ป.6")
  - Grade level indicator when multiple grades are selected
  - A relevant, friendly icon or illustration
  - A progress bar showing overall completion percentage across all units

**FR-6:** The dashboard must display the current user's name and selected grade levels prominently (e.g., "สวัสดี [Name]" with grade indicators)

### Subject Page (Unit Grid View)

**FR-7:** When a user clicks on a subject card, they must be taken to the Subject Page for that subject.

**FR-8:** The Subject Page must display:
  - Subject name as a page header
  - All units within that subject as a grid of cards

**FR-9:** Each unit card must display:
  - Unit name in Thai (e.g., "เศษส่วน" for Fractions)
  - A simple icon or illustration representing the unit
  - A progress indicator showing how many lessons in the unit are mastered (e.g., "3/8 completed" or a progress bar)

**FR-10:** Unit cards must be clickable and navigate to the Unit Page.

**FR-11:** A "กลับไปหน้าหลัก" (Back to Dashboard) button or breadcrumb must be visible.

### Unit Page (Lesson List View)

**FR-12:** When a user clicks on a unit card, they must be taken to the Unit Page for that specific unit.

**FR-13:** The Unit Page must display:
  - Unit name as a page header
  - A list of all lessons/topics within that unit

**FR-14:** Each lesson item in the list must show:
  - Lesson number and name (e.g., "1. Introduction to Fractions")
  - A clear visual indicator if the lesson is mastered (e.g., green checkmark ✓)
  - If not mastered, it should appear in a neutral/pending state

**FR-15:** For desktop view, a left-hand sidebar should display the lesson list persistently, allowing easy navigation between lessons.

**FR-16:** For mobile/tablet view, the lesson list can be in a collapsible menu or sequential layout.

**FR-17:** Lessons must be clickable and navigate to the Lesson Page (defined in PRD 0003).

**FR-18:** Breadcrumb navigation must be visible showing the path (e.g., "Dashboard > Mathematics > Fractions").

### Navigation Requirements

**FR-19:** All navigation elements (cards, buttons, links) must have click/tap targets of at least 44x44 pixels for mobile usability.

**FR-20:** The currently active page in breadcrumbs should be visually distinct (e.g., bold, different color).

**FR-21:** Users must be able to use browser back button to navigate backward through the hierarchy.

### Responsive Design

**FR-22:** On desktop (>1024px):
  - Subject cards: 2 columns
  - Unit cards: 3-4 columns
  - Left sidebar navigation active on Unit pages

**FR-23:** On tablet (768px-1024px):
  - Subject cards: 2 columns
  - Unit cards: 2-3 columns

**FR-24:** On mobile (<768px):
  - Subject cards: 1 column
  - Unit cards: 1 column
  - All navigation stacks vertically

## 5. Non-Goals (Out of Scope)

- Search functionality for finding lessons
- Filtering or sorting units/lessons
- User-customizable layout or favorites
- Lesson prerequisites or locked content (all content is accessible)
- Recommendations engine ("You might like...")
- Thai Language, English, Social Studies subjects (Post-V1)
- Grades 1-3, 5 (Post-V1)
- Cross-grade comparisons or difficulty indicators

## 6. Design Considerations

### UI/UX Requirements - Inspired by Khan Academy

**Visual Design:**
- Use a card-based layout for subjects and units (similar to Khan Academy's course grid)
- Abundant white space to keep interface clean and focused
- Friendly, educational color palette: blues, greens, oranges (not overly cartoon-like)
- Large, clear typography appropriate for young readers

**Icons & Illustrations:**
- Each subject and unit should have a simple, recognizable icon
- Icons should be consistent in style and size
- Consider using illustrations of Thai cultural elements where appropriate

**Progress Indicators:**
- Progress bars should be prominent and satisfying to watch fill up
- Use green checkmarks (✓) for mastered lessons
- Unmastered lessons in neutral gray/light color

**Layout Reference:**
- Dashboard: Similar to Khan Academy's subject selection page
- Subject Page: Grid of unit cards like Khan Academy's course page
- Unit Page: Left sidebar lesson list like Khan Academy's unit view

**Khan Academy UI Examples to Study:**
- [Khan Academy Course Page](https://www.khanacademy.org/math/arithmetic): Note the clean card grid, progress circles, and clear unit organization
- [Khan Academy Unit Page](https://www.khanacademy.org/): Observe the left sidebar navigation with lesson list, progress indicators, and focused content area
- Color scheme: Khan Academy uses #14bf96 (teal) for primary actions and progress - consider similar Thai-friendly colors
- Typography: Large, readable fonts (16-18px for body text, 24-32px for headers)

### Accessibility

- All navigation must be keyboard accessible (Tab, Enter, Escape keys)
- Focus states must be clearly visible
- Color should not be the only indicator of status (use icons + color)

## 7. Technical Considerations

### Data Structure

**Content should be stored with the following relationships:**
```
Grade → has many → Subjects
Subject → has many → Units
Unit → has many → Lessons
```

### API/Data Requirements

- API endpoint to fetch all subjects for a given grade level
- API endpoint to fetch all units for a given subject
- API endpoint to fetch all lessons for a given unit
- Each response should include progress data for the authenticated user

### Routing Structure

Suggested URL structure:
```
/dashboard (grade-specific, determined by user profile)
/subject/:subjectId (e.g., /subject/math)
/subject/:subjectId/unit/:unitId (e.g., /subject/math/unit/fractions)
/subject/:subjectId/unit/:unitId/lesson/:lessonId (defined in PRD 0003)
```

### Performance

- Subject and unit data should be cached to avoid repeated database queries
- Card images/icons should be optimized for fast loading
- Initial page load should be <3 seconds on 4G connection

### Dependencies

- User authentication must be complete (PRD 0001) to personalize dashboard
- Progress tracking system (PRD 0004) to show completion status
- Content database populated with curriculum-aligned subjects, units, and lessons

## 8. Success Metrics

1. **Navigation Success Rate:** >95% of users can navigate from dashboard to a specific lesson within 3 clicks
2. **Time to Lesson:** Average time from login to clicking first lesson is <30 seconds
3. **Bounce Rate:** <10% of users leave the site from the dashboard without clicking a subject
4. **Mobile Usability:** Navigation works smoothly on mobile devices (test with actual students)
5. **Breadcrumb Usage:** Track how often users use breadcrumbs vs. back button to optimize navigation

## 9. Open Questions

1. Should units be presented in a recommended/sequential order, or can students access any unit in any order? (Recommendation: Free access for V1, prerequisites in future)
2. How many units per subject should we target for V1 launch? (Decision needed from content team)
3. Should there be a way to "favorite" or "bookmark" specific units? (Recommendation: Defer to Post-V1)
4. Should we show unit difficulty level or time estimates? (Recommendation: Not for V1)
5. What happens when a student completes 100% of content in their grade? (Recommendation: Celebratory message + suggest exploring other grade level if selected)
6. **NEW:** For multi-grade users, should the dashboard show all grades in one scrollable view, or use tabs/toggles to switch between grades? (Recommendation: Start with sections in one view, add toggle if needed based on user feedback)
7. **NEW:** Should progress be tracked separately per grade level, or combined? (Recommendation: Track separately - a student might master Grade 4 Math but be starting Grade 6 Math)

---

**Related PRDs:**
- `0001-prd-user-authentication.md` (Requires authentication to show personalized dashboard)
- `0003-prd-learning-mastery-system.md` (Navigation leads to lesson pages)
- `0004-prd-progress-tracking.md` (Shows progress indicators on cards)

**Content Alignment Note:**
All subjects, units, and lesson topics must be verified by subject matter experts to align with the Thai Ministry of Education's Basic Education Core Curriculum for Prathom 4 and Prathom 6.

