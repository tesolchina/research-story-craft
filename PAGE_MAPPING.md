# MCCP 6020 Page-to-File Mapping

This document provides a mapping between the web application routes and their corresponding source files in the `lovable` project.

## Core Routes

| Route Path | Source File | Description |
|------------|-------------|-------------|
| `/` | `src/pages/Home.tsx` | Main landing page |
| `/registration` | `src/pages/Registration.tsx` | Registration page |
| `/ai-workshops` | `src/pages/AIWorkshops.tsx` | AI Workshops directory |
| `/mccp` | `src/pages/mccp/MCCPLayout.tsx` | **Main Layout** (Sidebar, Header, Outlet) |
| `/mccp` (index) | `src/pages/mccp/MCCPHome.tsx` | MCCP Dashboard / Home |

## MCCP 6020 Specific Pages

| Route Path | Source File | Content Source |
|------------|-------------|----------------|
| `/mccp/week1/introduction` | `src/pages/mccp/Week1Introduction.tsx` | Course intro & syllabus overview |
| `/mccp/week1/ai-agent-ide` | `src/pages/mccp/Week1AIAgentIDE.tsx` | AI IDE technical setup |
| `/mccp/weeks2-4` | `src/pages/mccp/Weeks2to4.tsx` | Group meeting schedule |
| `/mccp/weeks2-4/writing` | `src/pages/mccp/WritingComponent.tsx` | **Written Assignment** (Intro & Lit Review) |
| `/mccp/weeks5-6` | `src/pages/mccp/Weeks5to6.tsx` | **Oral Presentation 1** (Research Storytelling) |
| `/mccp/week10` | `src/pages/mccp/Week10.tsx` | **Oral Presentation 2** (Poster Presentation) |
| `/mccp/week13` | `src/pages/mccp/Week13.tsx` | **Oral Presentation 3** (3MT Presentation) |
| `/mccp/api-key` | `src/pages/mccp/ApiKeyPage.tsx` | LLM API key configuration |
| `/mccp/resources` | `src/pages/mccp/ResourcesPage.tsx` | General course resources |
| `/mccp/feedback` | `src/pages/mccp/FeedbackPage.tsx` | Course feedback forms |

## Technical Support Files

| Purpose | File Path |
|---------|-----------|
| Routing Configuration | `src/App.tsx` |
| Sidebar Navigation | `src/pages/mccp/MCCPLayout.tsx` |
| Supabase Client | `src/integrations/supabase/client.ts` |
| Global Styles | `src/index.css` |
| Shared Components | `src/components/mccp/` |

---
*Last updated: January 4, 2026*

