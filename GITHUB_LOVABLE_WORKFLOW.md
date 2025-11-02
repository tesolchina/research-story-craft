# GitHub + Lovable Dual Development Workflow

## Overview

This project is a **Lovable project** that syncs bidirectionally with GitHub. You can work seamlessly between Lovable's web interface and your local GitHub repository.

## Project Details

- **Lovable Project URL**: https://lovable.dev/projects/08b1ecca-07ee-4308-8f16-b8063e9242a7
- **GitHub Repository**: https://github.com/tesolchina/research-story-craft.git
- **Tech Stack**: React + TypeScript + Vite + shadcn/ui + Tailwind CSS

## How the Integration Works

### 1. **Lovable → GitHub (Automatic Sync)**

When you make changes in Lovable:
- Changes are **automatically committed** to this GitHub repository
- You can see the commits appear in your GitHub history
- No manual git operations needed from Lovable side

### 2. **GitHub → Lovable (Automatic Sync)**

When you push changes to GitHub:
- Changes are **automatically reflected** in Lovable
- You'll see your local edits appear in the Lovable interface
- Works for any file in the repository

## Development Workflows

### Workflow A: Primary Development in Lovable

**Best for**: Quick prototyping, AI-assisted development, rapid iterations

1. Open [Lovable Project](https://lovable.dev/projects/08b1ecca-07ee-4308-8f16-b8063e9242a7)
2. Use prompts to create/modify components
3. Changes auto-commit to GitHub
4. Pull from GitHub when working locally to stay in sync

```bash
# Keep local repo in sync
git pull origin main
```

### Workflow B: Primary Development Locally

**Best for**: Complex refactoring, using your preferred IDE, offline work

1. Clone the repository locally
2. Make changes in your IDE
3. Commit and push to GitHub
4. Changes appear in Lovable automatically

```bash
# Setup
git clone https://github.com/tesolchina/research-story-craft.git
cd research-story-craft
npm install
npm run dev

# Make changes, then:
git add .
git commit -m "Your changes"
git push origin main
```

### Workflow C: Hybrid Approach (Recommended)

**Best for**: Leveraging both platforms' strengths

1. Use **Lovable** for:
   - Initial component creation
   - AI-assisted feature development
   - Quick UI iterations
   - Component prototyping

2. Use **Local IDE** for:
   - Complex logic refactoring
   - Type safety improvements
   - Performance optimization
   - Advanced git workflows (branches, PRs)
   - Debugging with browser dev tools
   - Integration testing

3. **Sync regularly**:
```bash
# Before starting local work
git pull origin main

# After local changes
git push origin main
```

## Key Technical Details

### Lovable Tagger

The project uses `lovable-tagger` in development mode:

```12:12:vite.config.ts
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
```

This tool:
- Runs only in development mode
- Helps Lovable identify and track components
- Does not affect production builds
- Enables better component understanding in Lovable's AI

### Project Structure

```
research-story-craft/
├── src/
│   ├── components/      # Reusable UI components
│   ├── pages/          # Route pages
│   ├── hooks/          # Custom React hooks
│   └── lib/            # Utilities
├── public/             # Static assets
└── package.json        # Dependencies (includes lovable-tagger)
```

## Best Practices

### 1. **Avoid Merge Conflicts**

- Pull before pushing: Always `git pull` before starting work
- Communicate: If working in Lovable, avoid local changes simultaneously
- Use branches: For major features, create feature branches locally

### 2. **File Management**

- **Include**: Source files, configs, README
- **Exclude**: `node_modules/`, `dist/`, build artifacts (already in `.gitignore`)

### 3. **Component Development**

- Create components in Lovable for quick iteration
- Refine and optimize locally for production
- Use Lovable's component recognition for AI assistance

### 4. **Testing Locally**

```bash
# Install dependencies
npm install

# Run development server (with lovable-tagger)
npm run dev

# Build for production (without lovable-tagger)
npm run build

# Preview production build
npm run preview
```

## Common Scenarios

### Scenario 1: Feature Added in Lovable
1. Feature appears in GitHub automatically
2. Pull locally: `git pull`
3. Test/refine locally if needed
4. Push improvements back: `git push`

### Scenario 2: Bug Fix Locally
1. Fix bug in local IDE
2. Test locally: `npm run dev`
3. Commit and push: `git push`
4. Fix appears in Lovable automatically

### Scenario 3: Collaborative Development
1. Team member works in Lovable → auto-commits
2. You work locally on different features
3. Pull regularly: `git pull` (resolve conflicts if any)
4. Push your changes: `git push`

## Troubleshooting

### Changes not syncing from Lovable?
- Check GitHub repository for recent commits
- Verify you're looking at the correct branch (usually `main`)
- Wait a few seconds for sync to complete

### Changes not appearing in Lovable?
- Ensure you pushed to the correct branch
- Verify the commit was successful: `git log`
- Check Lovable project is connected to correct repo

### Local development issues?
- Make sure dependencies are installed: `npm install`
- Check Node.js version compatibility
- Clear cache: `rm -rf node_modules && npm install`

## Deployment

- **Lovable Deployment**: Use Lovable's built-in publish feature
  - Go to Project → Share → Publish
  - Supports custom domains
  
- **Self-Hosting**: Build and deploy manually
  ```bash
  npm run build
  # Deploy dist/ folder to your hosting service
  ```

## Additional Resources

- [Lovable Documentation](https://docs.lovable.dev)
- [Project README](./README.md)
- Lovable Project: https://lovable.dev/projects/08b1ecca-07ee-4308-8f16-b8063e9242a7

---

**Note**: This workflow document is specific to this project. Adjust practices based on your team's needs and preferences.

