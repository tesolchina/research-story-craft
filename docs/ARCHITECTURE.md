# MCCP 6020 Course Platform - Architecture Documentation

## Overview

This is a React-based academic course platform for MCCP 6020 (Advanced English for Academic Purposes). The application provides course materials, interactive learning activities, student progress tracking, and AI-assisted writing feedback.

## Technology Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + shadcn/ui components
- **State Management**: React Query (TanStack Query)
- **Routing**: React Router DOM v6
- **Backend**: Supabase (Database, Auth, Edge Functions)
- **Charts**: Recharts

## Project Structure

```
src/
├── assets/                    # Static assets (images, slides)
├── components/
│   ├── ui/                    # Reusable UI components (shadcn/ui)
│   └── mccp/                  # MCCP-specific business components
│       ├── StudentEntry.tsx   # Student ID verification
│       ├── MCQuiz.tsx         # Multiple choice quiz component
│       ├── WritingTask.tsx    # AI-assisted writing tasks
│       ├── AIChatDialog.tsx   # AI chat interface
│       ├── DiscussionBoard.tsx # Student discussion forum
│       └── TeacherDashboard.tsx # Instructor view
├── hooks/                     # Custom React hooks
│   ├── use-mobile.tsx         # Mobile detection hook
│   └── use-toast.ts           # Toast notification hook
├── integrations/
│   └── supabase/              # Supabase client and types
│       ├── client.ts          # Auto-generated Supabase client
│       └── types.ts           # Auto-generated database types
├── lib/                       # General utilities
│   └── utils.ts               # Tailwind class merging utility
├── pages/                     # Page components
│   ├── mccp/                  # MCCP course pages (main section)
│   │   ├── MCCPLayout.tsx     # Layout with sidebar navigation
│   │   ├── Week1.tsx          # Week 1 course content
│   │   ├── Week1Activity*.tsx # Individual activities
│   │   ├── WritingMaterialsPage.tsx # Writing reference hub
│   │   └── ...                # Other week pages
│   ├── Home.tsx               # Landing page
│   ├── AIWorkshops.tsx        # AI workshops section
│   └── ...                    # Other pages
├── utils/                     # Utility functions (NEW)
│   ├── logger.ts              # Logging utility
│   └── errorHandler.ts        # Error handling utilities
├── App.tsx                    # Main app component with routing
├── main.tsx                   # Application entry point
└── index.css                  # Global styles and CSS variables

supabase/
├── config.toml                # Supabase configuration
├── functions/                 # Edge functions
│   └── generate-writing-feedback/  # AI writing feedback
└── migrations/                # Database migrations

docs/
├── ARCHITECTURE.md            # This file
├── CHANGELOG.md               # Change log
└── modules/                   # Module-specific documentation
    ├── MCCP.md                # MCCP module documentation
    └── COMPONENTS.md          # Component documentation
```

## Data Flow Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        React Application                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────────┐  │
│  │   Pages/     │    │  Components  │    │     Hooks        │  │
│  │   Routes     │◄──►│  (UI + MCCP) │◄──►│  (useToast etc)  │  │
│  └──────┬───────┘    └──────┬───────┘    └────────┬─────────┘  │
│         │                   │                      │            │
│         └───────────────────┼──────────────────────┘            │
│                             ▼                                    │
│                    ┌────────────────┐                           │
│                    │ Supabase Client│                           │
│                    │  (React Query) │                           │
│                    └────────┬───────┘                           │
└─────────────────────────────┼───────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      Supabase Backend                            │
├─────────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐  │
│  │   Database   │  │ Edge         │  │   Storage            │  │
│  │   (Postgres) │  │ Functions    │  │   (Files)            │  │
│  │              │  │              │  │                      │  │
│  │ - students   │  │ - generate-  │  │ - Course materials   │  │
│  │ - progress   │  │   writing-   │  │ - Student uploads    │  │
│  │ - pseudonyms │  │   feedback   │  │                      │  │
│  │ - discussions│  │              │  │                      │  │
│  └──────────────┘  └──────────────┘  └──────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

## Database Schema

### Tables

| Table | Purpose |
|-------|---------|
| `students` | Student records with codes |
| `student_pseudonyms` | Anonymous identifiers for student participation |
| `students_progress` | Quiz answers, writing task progress, AI feedback |
| `discussions` | Discussion board messages |
| `teacher_credentials` | Teacher authentication |
| `login_attempts` | Security audit log |

### Row-Level Security (RLS)

All tables have RLS policies to ensure:
- Students can only access their own progress
- Teachers have read access to all student data
- Public discussions are readable by all authenticated users

## Key Modules

### 1. MCCP Course Module (`/mccp/*`)

The main course content organized by weeks:
- **Week 1**: Course introduction, AI agent setup, activities
- **Weeks 2-4**: Small group meetings, writing materials
- **Weeks 5-6**: Research paper presentation
- **Week 10**: Poster presentation
- **Week 13**: 3MT presentation

### 2. Writing Materials Hub

A comprehensive writing reference (`WritingMaterialsPage.tsx`) containing:
- Introduction writing theory (CARS model)
- Literature review guidance
- Paraphrasing and summarization
- AI-assisted writing tasks

### 3. Student Progress Tracking

Components for tracking student learning:
- `MCQuiz.tsx`: Multiple choice quizzes with persistence
- `WritingTask.tsx`: Writing submissions with AI feedback
- `StudentEntry.tsx`: Pseudonymous student identification

### 4. AI Integration

- Edge function for generating writing feedback
- Chat interface for AI assistance
- API key management for external AI services

## Routing Structure

```
/                     → Home page
/mccp                 → MCCP course (redirects to /mccp/week1)
/mccp/week1           → Week 1 content
/mccp/week1/activity-1 → Individual activities
/mccp/weeks2-4        → Weeks 2-4 overview
/mccp/assessment      → Assessment details
/ai-workshops         → AI workshops section
/learning-apps        → Learning apps hub
```

## Environment Variables

```env
VITE_SUPABASE_URL          # Supabase project URL
VITE_SUPABASE_PUBLISHABLE_KEY  # Supabase anon key
VITE_SUPABASE_PROJECT_ID   # Project identifier
```

## Best Practices

1. **Component Size**: Keep files under 600 lines; split into focused modules
2. **Error Handling**: Use the `errorHandler` utility for consistent error management
3. **Logging**: Use the `logger` utility for debugging (disabled in production)
4. **Type Safety**: Leverage TypeScript and generated Supabase types
5. **Styling**: Use Tailwind CSS with design tokens from `index.css`

## Related Documentation

- [Module Documentation](./modules/MCCP.md)
- [Component Guide](./modules/COMPONENTS.md)
- [Changelog](./CHANGELOG.md)
