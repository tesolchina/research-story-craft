# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [Unreleased]

### Added
- Created `/docs` folder with architecture documentation
- Added `ARCHITECTURE.md` with system overview, data flow diagrams, and module descriptions
- Added `CHANGELOG.md` to track all project changes
- Created `docs/modules/` folder for module-specific documentation
- Added `MCCP.md` documenting the course module structure
- Added `COMPONENTS.md` documenting reusable components
- Created `src/utils/` folder for utility functions
- Added `logger.ts` with environment-aware logging utility
- Added `errorHandler.ts` with consistent error handling patterns

### Changed
- Refactored `WritingMaterialsPage.tsx` (1695 lines) into smaller, focused modules:
  - Extracted `IntroductionSection.tsx` - CARS model and centrality statements
  - Extracted `LiteratureReviewSection.tsx` - Literature review content
  - Extracted `ParaphrasingSections.tsx` - Paraphrasing and summarization
  - Extracted `AIWritingSection.tsx` - AI-assisted writing tasks
  - Extracted `WritingConstants.ts` - Shared data and constants
- Added inline comments throughout refactored files explaining purpose and logic
- Improved type safety with proper TypeScript interfaces

### Fixed
- Fixed 404 error for `/mccp/weeks2-4/writing` route (corrected to `/mccp/weeks2-4/writing-materials`)

### Documentation
- Added module dependency descriptions
- Included data flow diagrams in architecture docs
- Documented database schema and RLS policies

---

## Version History Format

Each release should follow this format:

```markdown
## [X.Y.Z] - YYYY-MM-DD

### Added
- New features

### Changed  
- Changes to existing functionality

### Deprecated
- Features to be removed in future versions

### Removed
- Removed features

### Fixed
- Bug fixes

### Security
- Security improvements
```

---

## Contributing

When making changes to this project:

1. Update this CHANGELOG.md with your changes under `[Unreleased]`
2. Use clear, descriptive commit messages
3. Reference related files and components
4. Document any breaking changes prominently
