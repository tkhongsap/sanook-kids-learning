### **Product Requirements Document: Sanook Kids Learning**

| | |
| :--- | :--- |
| **Version:** | 2.0 |
| **Status:** | Final |
| **Date:** | October 6, 2025 |
| **Author:** | Gemini AI |
| **Stakeholders:** | Product, Engineering, Design, Content |

### **1. Introduction**

**1.1. Executive Summary**
LearnThai Kids is a free, web-based educational platform designed to supplement the formal education of Thai students in Grade 4 (Prathom 4) and Grade 6 (Prathom 6). Inspired by the mastery learning model of Khan Academy, this platform provides curriculum-aligned video lessons and interactive exercises in core subjects like Mathematics and Science. By leveraging simple, intuitive design and social media authentication for progress tracking, LearnThai Kids aims to make quality supplementary education accessible, engaging, and effective for children across Thailand, regardless of their location or socioeconomic status.

**1.2. Problem Statement**
Students in Thailand often require extra help outside the classroom to master key subjects. However, access to quality tutoring or supplementary tools can be limited by cost and geography. Existing global platforms are not fully aligned with the Thai national curriculum or presented in the native language, creating a significant barrier for young learners. There is a clear need for a free, localized, and self-paced learning tool that helps students build confidence and achieve mastery.

**1.3. Vision & Mission**
* **Vision:** To be the most trusted and accessible digital learning companion for primary school students in Thailand.
* **Mission:** To provide a free, high-quality, and engaging learning platform that empowers Thai students to master their school curriculum at their own pace.

**1.4. Goals & Objectives**
* **Student Goal:** To understand and master core academic concepts, track their progress, and build confidence for school.
* **Product Goal:** To deliver a seamless and motivating learning journey—from easy sign-on to topic mastery—that encourages repeat usage.
* **Business Goal:** To achieve 10,000 registered monthly active users and a 15% 28-day retention rate within the first year.

### **2. Target Audience**

* **Primary Persona: "Nong Som" (Grade 4 Student)**
    * **Age:** 9-10 years old.
    * **Behavior:** Uses a shared family tablet or computer. Is comfortable with YouTube and simple mobile games. Needs visual cues and immediate positive reinforcement.
    * **Needs:** Short, fun video lessons ($<7$ minutes). Interactive questions that feel like a game. A clear sense of accomplishment.
    * **Frustrations:** Long texts, complex navigation, and fear of being wrong.

* **Secondary Persona: "P' Chai" (Grade 6 Student)**
    * **Age:** 11-12 years old.
    * **Behavior:** Has more defined homework needs and is beginning to prepare for exams like the O-NET. May use a smartphone for learning.
    * **Needs:** Clear explanations for specific topics he finds difficult. The ability to practice for exams. A way to see what he has already learned.
    * **Frustrations:** Not being able to find help for one specific problem. Falling behind and not knowing how to catch up.

### **3. User Scenarios & Journey**

**3.1. Scenario 1: Nong Som's First Learning Session**
1.  Nong Som's mother hears about LearnThai Kids and navigates to the website on their family tablet.
2.  The landing page is bright and welcoming. Her mom sees the "ลงชื่อเข้าใช้ด้วย Google" (Sign in with Google) button and clicks it, using her own Google account.
3.  A prompt asks, "นักเรียนอยู่ชั้นอะไรเอ่ย?" (Which grade are you in?). Her mom selects "ชั้น ป.4" for Som.
4.  They are taken to the Grade 4 dashboard, showing "คณิตศาสตร์" (Math) and "วิทยาศาสตร์" (Science). Som clicks on Math.
5.  She sees a list of units. Her mom helps her find the "เศษส่วน" (Fractions) unit, which she's learning in school.
6.  She clicks the first lesson, watches a 5-minute animated video explaining basic fractions.
7.  After the video, a set of 5 multiple-choice questions appears. She gets the first 4 correct. The site shows a "ถูกต้อง!" (Correct!) animation each time.
8.  After the 4th correct answer, a large, celebratory message appears: "เก่งมาก! ผ่านแล้วนะ!" (Excellent! You've mastered it!).
9.  She feels proud. Back on the Fractions unit page, a green checkmark now appears next to the lesson she just completed.

**3.2. User Journey Flow**
A user's journey is mapped as follows:
*Landing Page -> Social Auth -> Grade Selection (first time only) -> Subject Dashboard -> Unit Page -> Lesson (Video + Practice) -> Mastery Confirmation -> Return to Unit Page*

### **4. Product Features & Requirements**

**4.1. Feature: User Authentication (Social Login)**
* **Description:** Allows users to sign up and sign in seamlessly using their existing Google or Facebook accounts.
* **User Stories:**
    * "As a parent, I want to sign my child up quickly using my Google account so we don't need another password."
    * "As a student, I want to log in with one click so I can get back to my lessons right away."
* **Functional Requirements:**
    * The system must integrate with OAuth 2.0 for Google Sign-In and Facebook Login.
    * On successful authentication for a new user, a user profile must be created in the database, storing `user_id`, `name`, `email` (from social provider), and the chosen `grade_level`.
    * On subsequent logins, the system must recognize the user and load their saved progress.
    * The user session must persist after closing the browser tab.
    * A clear "ออกจากระบบ" (Logout) button must be present in the user navigation.
    * Error handling must be in place for failed authentication attempts.

**4.2. Feature: Learning Content & Mastery System**
* **Description:** The core learning loop where students watch a video, practice with exercises, and achieve mastery.
* **User Stories:**
    * "As a student, I want to watch a video to understand a topic, and then answer questions to make sure I really know it."
    * "As a student, I want to know when I've passed a lesson so I can feel confident moving to the next one."
* **Functional Requirements:**
    * The platform must support an embedded video player (e.g., YouTube, Vimeo).
    * The practice module must support multiple-choice questions with a single correct answer.
    * Feedback (Correct/Incorrect) must be provided instantly after a user submits an answer.
    * **Mastery Rule:** A topic is marked as "Mastered" when a user answers $\ge 80\%$ of the questions correctly in a single attempt (e.g., 4 out of 5).
    * Upon mastery, a clear, positive, and rewarding confirmation message must be displayed.
    * If mastery is not achieved, the user should be prompted to either "ดูวิดีโออีกครั้ง" (Watch video again) or "ลองทำแบบฝึกหัดชุดใหม่" (Try a new set of questions).

**4.3. Feature: Progress Tracking & Dashboard**
* **Description:** Provides visual feedback on the user's learning journey and saves all progress to their account.
* **User Stories:**
    * "As a student, I want to see all the lessons I've already finished so I know what to work on next."
    * "As a user, I want to log in from any computer and see my progress."
* **Functional Requirements:**
    * All mastered topics must be linked to the `user_id` in the database.
    * On the Subject/Unit pages, mastered topics must be visually distinct from unattempted or unmastered topics (e.g., using a checkmark, color change, or filled-in progress bar).
    * The dashboard must default to the user's selected grade level upon login.

### **5. Non-Functional Requirements (NFRs)**

* **5.1. Performance:**
    * Page load time for all key pages (Dashboard, Lesson) must be under 3 seconds on a standard 4G connection.
    * The system should support 1,000 concurrent users without significant degradation in performance.
* **5.2. Security:**
    * All user data must be handled securely. The platform must comply with Thailand's Personal Data Protection Act (PDPA).
    * Communication between the client and server must be encrypted via HTTPS.
* **5.3. Usability & Accessibility:**
    * The UI must be intuitive for a 9-year-old. This includes large click targets, clear iconography, and minimal text.
    * The platform must be responsive and fully functional on major web browsers (Chrome, Safari, Firefox) on desktop, tablet, and mobile devices.
* **5.4. Localization:**
    * All UI text, instructional content, and video/audio content must be in the Thai language.

### **6. Content Strategy**

* **Curriculum:** All educational content must be strictly aligned with the Thai Ministry of Education's Basic Education Core Curriculum for Prathom 4 and Prathom 6.
* **Subjects for V1:** Mathematics and Science.
* **Content Format:** Each topic will consist of one short video ($<7$ minutes) and a bank of at least 10-15 unique practice questions to allow for retries.
* **Dependency:** The creation of high-quality, engaging video and question content is the highest priority dependency for this project's success.

### **7. Assumptions & Dependencies**

* **Assumptions:**
    * Target users have access to a device (smartphone, tablet, or computer) and a stable internet connection.
    * Users (or their parents) have an active Google or Facebook account.
* **Dependencies:**
    * Availability of subject matter experts to create and verify curriculum-aligned content.
    * Continued access to Google and Facebook authentication APIs.

### **8. Success Metrics & KPIs**

| Metric Category | KPI | Target (Year 1) |
| :--- | :--- | :--- |
| **Acquisition** | New User Sign-ups | 1,500 per month |
| **Engagement** | Monthly Active Users (MAU) | 10,000 |
| | Lessons Mastered per User per Month | 5 |
| **Retention** | 28-Day User Retention Rate | 15% |
| **Quality** | User Satisfaction (via simple 1-5 star survey) | Average rating of 4.0 |

### **9. Future Scope / Roadmap (Post-V1)**

The following features are explicitly out of scope for the initial launch but are key candidates for future releases:

* **Parent/Teacher Portal:** A dashboard for adults to monitor a child's progress.
* **Expanded Gamification:** Introducing points, badges, avatars, and learning streaks.
* **More Subjects:** Adding Thai Language, English, and Social Studies.
* **More Grade Levels:** Expanding to cover all of primary school (Prathom 1-6).
* **Native Mobile Apps:** Developing dedicated iOS and Android applications.
* **Email/Password Authentication:** Adding a traditional sign-up method.