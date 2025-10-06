# Sanook Kids Learning

A free, web-based educational platform for Thai students in Grade 4 (Prathom 4) and Grade 6 (Prathom 6). Inspired by Khan Academy's mastery learning model, providing curriculum-aligned video lessons and interactive exercises in Mathematics and Science.

## 🎯 Project Overview

**Sanook Kids Learning** aims to make quality supplementary education accessible, engaging, and effective for children across Thailand, regardless of their location or socioeconomic status.

### Key Features

- 🎓 **Curriculum-Aligned**: Content matches Thai Ministry of Education standards
- 🏆 **Mastery-Based Learning**: Students must demonstrate understanding before progressing
- 📹 **Short Video Lessons**: Under 7 minutes, in Thai language
- 🔄 **Unlimited Practice**: Retry as many times as needed
- 📊 **Progress Tracking**: See your learning journey on any device
- 💯 **100% Free**: No cost, no ads, forever

## 🚀 Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Analytics**: Google Analytics 4
- **Hosting**: Vercel (recommended)

## 📋 Prerequisites

- Node.js 18.17 or later
- npm or yarn package manager
- Git

## 🛠️ Development Setup

### 1. Clone the Repository

```bash
git clone https://github.com/tkhongsap/sanook-kids-learning.git
cd sanook-kids-learning
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Variables

Copy the example environment file and fill in your values:

```bash
cp env.local.example .env.local
```

Edit `.env.local` with your actual values:
- Google Analytics Measurement ID
- OAuth credentials (will be configured later)

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
sanook-kids-learning/
├── app/                      # Next.js App Router pages
│   ├── layout.tsx            # Root layout with metadata
│   ├── page.tsx              # Landing page
│   └── globals.css           # Global styles
├── components/
│   ├── landing/              # Landing page sections
│   ├── ui/                   # Reusable UI components
│   └── analytics/            # Analytics components
├── lib/                      # Utility functions
├── types/                    # TypeScript type definitions
├── public/
│   └── images/               # Static images
├── tasks/                    # PRDs and task lists
├── prd-driven-workflow/      # Development workflow docs
└── docs/                     # Project documentation
```

## 🎨 Design System

### Colors

- **Primary**: #14bf96 (Khan Academy-inspired green)
- **Secondary**: #ff9500 (Warm orange)
- **Trust**: #1865f2 (Blue for credibility)

### Typography

- **Main Font**: Sarabun (Thai-friendly)
- **Display Font**: Prompt
- **Alternative**: Kanit

## 📝 Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## 🧪 Testing

Testing will be implemented in future tasks.

## 📚 Documentation

- [Product Requirements](./00-prd-sanook-kids-learning.md)
- [Landing Page PRD](./tasks/0000-prd-landing-page.md)
- [Task Lists](./tasks/)
- [Development Workflow](./prd-driven-workflow/)

## 🗺️ Roadmap

### Current Phase: Landing Page (PRD 0000)
- ✅ Project setup and infrastructure
- 🔄 Hero section implementation (in progress)
- ⏳ Core content sections
- ⏳ Performance optimization & SEO

### Upcoming
- **PRD 0001**: User Authentication (Social Login)
- **PRD 0002**: Content Navigation
- **PRD 0003**: Learning & Mastery System
- **PRD 0004**: Progress Tracking

## 🤝 Contributing

This is a private educational project. For questions or contributions, please contact the project maintainer.

## 📄 License

ISC

## 👥 Authors

- Product Development: Gemini AI
- Implementation: Development Team

## 🙏 Acknowledgments

- Inspired by [Khan Academy](https://www.khanacademy.org/)
- Built for Thai students and families

---

**Status**: 🚧 Active Development  
**Version**: 1.0.0  
**Last Updated**: October 6, 2025
