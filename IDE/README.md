# IDE Integration Guide

This document provides instructions for updating the MCCP 6020 course pages via an IDE AI agent through GitHub.

## Repository Structure

The MCCP 6020 course pages are located in:

```
src/pages/
├── MCCP6020.tsx          # Main course page with sidebar navigation
└── mccp/
    ├── Week1.tsx         # Week 1: Introduction to the Course
    ├── Weeks2to4.tsx     # Weeks 2-4: Small Group Meetings
    ├── Weeks5to6.tsx     # Weeks 5-6: Oral Presentation - Research Paper
    ├── Weeks7to9.tsx     # Weeks 7-9: Small Group Meetings
    ├── Week10.tsx        # Week 10: Oral Presentation - Poster
    ├── Weeks11to12.tsx   # Weeks 11-12: Individual Consultations
    └── Week13.tsx        # Week 13: Oral Presentation - 3MT
```

## Routes

All routes are defined in `src/App.tsx`:

- `/mccp` - Main course page
- `/mccp/week1` - Week 1
- `/mccp/weeks2-4` - Weeks 2-4
- `/mccp/weeks5-6` - Weeks 5-6
- `/mccp/weeks7-9` - Weeks 7-9
- `/mccp/week10` - Week 10
- `/mccp/weeks11-12` - Weeks 11-12
- `/mccp/week13` - Week 13

## How to Update Content

### Updating Weekly Page Content

Each week page follows a consistent structure:

```tsx
import { Link } from "react-router-dom";
import { ArrowLeft, IconName } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const WeekX = () => {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Back navigation */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/mccp">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <p className="text-sm text-muted-foreground">Week X</p>
            <h1 className="text-2xl font-bold">Title</h1>
          </div>
        </div>

        {/* Content cards */}
        <Card>
          <CardHeader>
            <CardTitle>Section Title</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Add content here */}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WeekX;
```

### Adding New Sections

To add new content sections, use the Card component:

```tsx
<Card>
  <CardHeader>
    <CardTitle>New Section</CardTitle>
  </CardHeader>
  <CardContent>
    <p>Content goes here</p>
  </CardContent>
</Card>
```

### Adding Links/Resources

```tsx
<a 
  href="https://example.com" 
  target="_blank" 
  rel="noopener noreferrer"
  className="text-primary hover:underline"
>
  Link Text
</a>
```

### Adding Embedded Content

For iframes (videos, external tools):

```tsx
<div className="aspect-video rounded-lg overflow-hidden">
  <iframe
    src="https://example.com/embed"
    width="100%"
    height="100%"
    style={{ border: "none" }}
    allow="clipboard-write"
    title="Description"
  />
</div>
```

## Updating the Main Page (MCCP6020.tsx)

The main page contains:
- Sidebar navigation with collapsible weekly schedule
- Home section with course info
- API Key setup section
- Resources section

To modify the sidebar structure, edit the `weeklySchedule` array and `sidebarItems` in `MCCP6020.tsx`.

## Adding New Pages

1. Create a new component in `src/pages/mccp/`
2. Add the route in `src/App.tsx`
3. Add a link in the sidebar of `MCCP6020.tsx`

## Technology Stack

- **React** with TypeScript
- **Tailwind CSS** for styling
- **shadcn/ui** components (Card, Button, Input, etc.)
- **Lucide React** for icons
- **React Router** for navigation

## Available UI Components

Located in `src/components/ui/`:
- Accordion, Alert, Avatar, Badge
- Button, Card, Checkbox
- Dialog, Dropdown, Input
- Tabs, Toast, Tooltip
- And more...

## API Key Storage

The HKBU Gen AI API key is stored in localStorage with key: `hkbu-genai-api-key`

To access it in code:
```typescript
const apiKey = localStorage.getItem("hkbu-genai-api-key");
```

## Notes

- All changes pushed to GitHub will automatically sync to Lovable
- Use semantic color tokens from the design system (e.g., `text-primary`, `bg-muted`)
- Maintain responsive design using Tailwind's responsive prefixes
- Test changes locally before pushing if possible
