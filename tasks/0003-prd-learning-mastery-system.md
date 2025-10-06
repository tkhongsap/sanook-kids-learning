# PRD: Learning Content & Mastery System

## 1. Introduction/Overview

This is the core learning experience of Sanook Kids Learning. This feature defines how students consume educational content (video lessons) and demonstrate understanding (practice exercises), culminating in achieving "mastery" of a topic.

**Problem it solves:** Students need an engaging way to learn new concepts and get immediate feedback on their understanding. The mastery-based approach (inspired by Khan Academy) ensures students truly understand material before moving forward.

**Goal:** Create an effective learning loop where students watch a focused video, practice with interactive questions, receive instant feedback, and achieve mastery when they demonstrate understanding.

## 2. Goals

1. Provide an embedded video player for educational content
2. Implement an interactive practice question system with instant feedback
3. Define and implement a clear mastery criteria (≥80% correct)
4. Create a rewarding mastery confirmation experience
5. Allow students to retry if mastery is not achieved
6. Ensure the learning page is distraction-free and focused

## 3. User Stories

1. **As a Grade 4 student**, I want to watch a short video that explains a math concept clearly in Thai so I can understand what my teacher was teaching.

2. **As a student**, I want to answer practice questions right after watching the video so I can check if I really understood it.

3. **As a student**, I want to know immediately if my answer is right or wrong so I can learn from my mistakes.

4. **As a student**, I want to see a celebration when I master a topic so I feel proud and want to learn more.

5. **As a student who didn't pass**, I want to watch the video again or try new questions so I can master the topic.

6. **As a parent**, I want my child to truly understand the material, not just memorize answers, so the mastery system should ensure comprehension.

## 4. Functional Requirements

### Lesson Page Structure

**FR-1:** Each lesson page must have a clean, two-section layout:
  - **Top Section:** Video player (embedded)
  - **Bottom Section:** Practice question module

**FR-2:** No other distracting content, ads, or navigation should be prominently visible on the lesson page. Only a "Back to Unit" breadcrumb link should be available for exit.

**FR-3:** The lesson page must display the lesson title clearly at the top.

### Video Content & Player

**FR-4:** The system must support embedding videos from external platforms (YouTube or Vimeo).

**FR-5:** Each lesson must have exactly one associated video.

**FR-6:** The video player must:
  - Be responsive (adjust to screen size)
  - Support standard controls (play, pause, volume, fullscreen)
  - Auto-size to fill the top section appropriately

**FR-7:** Videos should be stored/hosted on YouTube or Vimeo (not self-hosted for V1).

**FR-8:** Video metadata to track:
  - Video URL/ID
  - Video title (should match lesson title)
  - Duration (for analytics)

**FR-9:** The system must allow the video to be played multiple times without restriction.

### Practice Question System

**FR-10:** After watching the video (or at any time), the student can scroll down to access practice questions.

**FR-11:** Each lesson must have a bank of at least 10-15 unique multiple-choice questions.

**FR-12:** Each practice attempt must randomly select 5 questions from the question bank.

**FR-13:** Each question must:
  - Have clear question text in Thai
  - Have 3-4 answer choices (single correct answer)
  - Answer choices should be unambiguous

**FR-14:** Questions must be presented one at a time (not all 5 simultaneously).

**FR-15:** After the student selects an answer and clicks "ส่งคำตอบ" (Submit Answer):
  - The system must immediately show visual feedback
  - If correct: Display "ถูกต้อง!" (Correct!) with green color/checkmark animation
  - If incorrect: Display "ลองอีกครั้ง" (Try Again) with orange/red color and show the correct answer

**FR-16:** The student cannot change their answer after submission.

**FR-17:** After feedback is shown, a "ถัดไป" (Next) button should appear to proceed to the next question.

**FR-18:** The system must track which questions were answered correctly/incorrectly in the current attempt.

### Mastery Calculation & Logic

**FR-19:** Mastery is achieved when a student answers **≥80% of questions correctly** in a single attempt.
  - For 5 questions: Must get at least 4 correct (4/5 = 80%)

**FR-20:** After all 5 questions are answered, the system must:
  - Calculate the score (number correct / total questions)
  - Determine if mastery threshold is met

**FR-21:** If mastery is achieved (≥80%):
  - Display a large, celebratory confirmation screen
  - Show message: "เก่งมาก! ผ่านแล้วนะ!" (Excellent! You've mastered it!)
  - Include positive animations (confetti, stars, checkmark)
  - Save the mastery status to the user's profile (see PRD 0004)
  - Provide a button: "กลับไปหน่วยเรียน" (Return to Unit)

**FR-22:** If mastery is NOT achieved (<80%):
  - Display an encouraging message: "เกือบได้แล้ว! ลองอีกครั้งนะ" (Almost there! Try again!)
  - Show the score (e.g., "คุณตอบถูก 3 จาก 5 ข้อ" - You got 3 out of 5 correct)
  - Provide two clear options:
    - "ดูวิดีโออีกครั้ง" (Watch Video Again) - scrolls back to video
    - "ลองทำแบบฝึกหัดชุดใหม่" (Try New Practice Set) - loads 5 new random questions

**FR-23:** Students can retry the practice as many times as needed until mastery is achieved.

**FR-24:** Each retry should pull a new random set of 5 questions from the question bank to prevent answer memorization.

### Question Data Structure

**FR-25:** Each question should be stored with:
  - `question_id` (unique identifier)
  - `lesson_id` (which lesson it belongs to)
  - `question_text` (in Thai)
  - `options` (array of 3-4 answer choices)
  - `correct_answer` (index or ID of correct option)
  - `explanation` (optional: brief explanation in Thai - for future use)

### Edge Cases

**FR-26:** If a student navigates away before completing all 5 questions:
  - Progress is not saved
  - Next visit to the same lesson starts a fresh practice attempt

**FR-27:** If a lesson has fewer than 10 questions in the bank:
  - Log a warning for content team
  - System should still function but may repeat questions on retry

## 5. Non-Goals (Out of Scope)

- Multiple question types (short answer, drag-and-drop, etc.) - Only multiple choice for V1
- Timed quizzes or exams
- Detailed analytics per question (which questions are hardest, etc.)
- Adaptive difficulty (questions getting harder/easier based on performance)
- Hints or help buttons during practice
- Peer comparison or leaderboards
- Question explanations shown after each answer (future enhancement)
- Self-hosted video content
- Live or interactive video features
- Note-taking functionality during video watching
- Video transcripts or subtitles (future accessibility feature)

### Future Enhancements (V2+) - Inspired by Khan Academy

The following features are explicitly out of scope for V1 but should be considered for future releases to match Khan Academy's effectiveness:

**Hints System:**
- Progressive hints during practice (1-3 hints per question)
- First hint: General guidance ("Think about what operation to use")
- Final hint: Step-by-step walkthrough
- *Khan Academy Reference:* See how [Khan Academy provides hints](https://www.khanacademy.org/) that scaffold learning without giving away answers

**Related Video Clips:**
- "Watch a video about this" button when student gets stuck
- Deep links to specific timestamps in the lesson video
- Short 30-60 second refresher clips for specific concepts

**Multiple Question Types:**
- Numeric input (type the answer)
- Drag-and-drop elements
- Fill-in-the-blank
- Drawing/graphing tools for math problems
- *This significantly increases engagement and assesses deeper understanding*

**Scratchpad/Calculator:**
- Digital scratchpad for working out problems
- Basic calculator tool (especially for complex arithmetic)
- *Mirrors how students work on paper but keeps them in the app*

**Question Explanations:**
- Detailed explanation shown after each answer (correct or incorrect)
- Helps students understand *why* an answer is correct
- Could include mini-video explanations for complex questions

## 6. Design Considerations

### UI/UX Requirements - Khan Academy Inspired

**Video Section:**
- Large, prominent video player (similar to Khan Academy's video layout)
- Clean black or dark background around player for focus
- Video takes up most of screen width on desktop, full width on mobile

**Practice Section:**
- Clean white background
- Question text in large, readable font (appropriate for 9-year-olds)
- Answer choices as large, clickable buttons/cards
- Clear visual hierarchy: Question → Options → Submit button

**Feedback Design:**
- Instant, animated feedback for correct/incorrect answers
- Use color + icons (don't rely on color alone)
- Correct: Green background, ✓ checkmark icon
- Incorrect: Orange/Red background, ✗ icon, show correct answer

**Mastery Celebration:**
- Full-screen overlay or large modal
- Bright, encouraging visuals (stars, confetti animation)
- Large "เก่งมาก!" text
- Prominent return button

### Responsive Design

- Desktop: Video 60-70% of viewport width, centered
- Tablet: Video full width, practice section stacks below
- Mobile: All elements stack vertically, full width

### Accessibility

- Video player must support keyboard controls
- Answer buttons must be keyboard accessible
- Screen reader support for feedback messages

### Content Creation Guidance (Video Production)

To ensure videos are effective and aligned with Khan Academy's proven approach:

**Instructor Voice & Delivery:**
- Warm, encouraging tone (not overly excited or monotone)
- Speaking pace: Moderate, with natural pauses for comprehension
- Use Thai colloquial expressions familiar to Grade 4-6 students
- Avoid formal/academic language that might intimidate young learners

**Visual Style - "Digital Blackboard":**
- Dark background (black or dark blue) with bright colors for writing
- Hand-drawn explanations as concepts are narrated (like Khan Academy)
- Use multiple colors to differentiate concepts (e.g., blue for problems, green for solutions)
- Simple, clear handwriting/drawings (not overly artistic)

**Content Structure:**
- Start with a real-world Thai example or question
- Break down concept into 2-3 key steps
- Include pause points (2-3 seconds) after introducing new concepts
- End with a brief recap: "สรุปคือ..." (In summary...)
- Connect to Thai cultural context where possible (e.g., use baht for money problems)

**Technical Quality:**
- Clear audio (no background noise)
- Consistent volume throughout
- Visual clarity (writing must be easily readable on mobile screens)

**Khan Academy Reference:** Study [Khan Academy's math videos](https://www.khanacademy.org/math) for the "blackboard" style, pacing, and voice characteristics.

## 7. Technical Considerations

### Video Integration

- Use YouTube or Vimeo embed API
- Store only the video ID or URL in database, not the video file itself
- Consider privacy-enhanced YouTube embed (youtube-nocookie.com)

### Question Randomization

- Implement server-side randomization to prevent client-side manipulation
- Ensure the same 5 questions aren't repeated on immediate retry

### Performance

- Lazy load the practice section (don't load all questions upfront)
- Optimize feedback animations to be smooth even on older devices
- Video should start loading immediately when page opens

### Data Persistence

- Save mastery achievement to database immediately upon reaching 80%
- API endpoint: `POST /api/lessons/:lessonId/mastery` with user_id and score

### Dependencies

- Content team must create:
  - Educational videos (<7 minutes each)
  - At least 10-15 questions per lesson
  - Curriculum-aligned content for Grade 4 and Grade 6
- User authentication (PRD 0001) to track who achieved mastery
- Progress tracking system (PRD 0004) to display mastery status elsewhere

## 8. Success Metrics

1. **Mastery Rate:** >60% of students achieve mastery on their first attempt (indicates good content quality)
2. **Average Attempts to Mastery:** <2.5 attempts on average (if too high, content may be too difficult)
3. **Video Completion Rate:** >70% of students watch at least 80% of the video
4. **Practice Engagement:** >85% of students who watch the video also attempt practice questions
5. **Retry Rate:** % of students who retry after failing (high rate = good motivation/design)
6. **Time to Mastery:** Track median time from opening lesson to achieving mastery

## 9. Open Questions

1. Should we track which specific questions a user got wrong for future analytics? (Recommendation: Yes, for content improvement insights)
2. Should students be able to skip the video and go straight to practice? (Recommendation: Yes, for returning students who want to practice again)
3. Should we show question explanations after each answer to enhance learning? (Recommendation: V2 feature)
4. What should happen if a student achieves mastery and wants to practice more? (Recommendation: Allow "practice again" option even after mastery)
5. Should we limit retry attempts? (Recommendation: No limits for V1 - encourage persistent learning)
6. Video loading time: What should we show while video loads? (Recommendation: Simple loading animation)

---

**Related PRDs:**
- `0002-prd-content-navigation.md` (Navigation from Unit page to Lesson page)
- `0004-prd-progress-tracking.md` (Mastery status is saved and displayed as progress)

**Content Requirements Note:**
All video content must be in Thai language, created using a "digital blackboard" style similar to Khan Academy (instructor narrates while drawing/writing concepts). Content must align with Thai Ministry of Education curriculum for Grade 4 and Grade 6.

