# Project Changelog

All notable changes to this project are documented here.

## [2025-09-20] - Complete I18n to English-Only Strings Config Migration

### Added

- New centralized strings configuration system in src/config/strings.config.ts
- Helper functions for dynamic content (formatReadingTime, formatBookmarkPrompt, formatCopyright)
- Comprehensive TypeScript types for all string categories
- 140+ English strings organized by functional categories (navigation, game, action, error, etc.)

### Changed

- **BREAKING**: Completely removed complex i18n internationalization system
- Migrated all 16 components (9 server + 7 client) from i18n to strings config:
  - Server components: Header.tsx, Footer.tsx, GameContent.tsx, not-found.tsx, and all legal pages
  - Client components: GameIframe.tsx, DesktopGameBanner.tsx, ErrorFallback.tsx, GameIframeCore.tsx, OfflineIndicator.tsx, MobileFullScreenGame.tsx
- Replaced all `useTranslation()` hooks with direct `strings` imports
- Replaced all `getServerTranslations()` calls with direct `strings` access
- Updated error handling functions to use strings config instead of translation parameters
- Removed TranslationProvider from app/layout.tsx root layout

### Removed

- Entire src/i18n directory (6 files: index.tsx, config.ts, server.ts, utils.ts, locales/en.json)
- All i18n-related imports and dependencies
- Complex locale detection, storage, and management logic
- Translation context providers and hooks
- Variable interpolation and pluralization systems
- Support for multiple locales (10 were defined but only English was active)

### Improved

- **Performance**: Direct string access eliminates translation function call overhead
- **Bundle Size**: Removed unused i18n infrastructure and locale management code
- **Maintainability**: Single configuration file for all UI strings
- **Type Safety**: Direct TypeScript access to strings with autocomplete
- **Simplicity**: Aligned with PRD requirement for English-only shipping
- **Developer Experience**: Cleaner imports and more readable component code

### Technical Impact

- Reduced codebase complexity by removing 500+ lines of i18n infrastructure
- Faster build times without locale processing and translation loading
- Simplified deployment without locale-specific considerations
- Better Core Web Vitals with eliminated client-side translation loading

## [2025-09-14 15:54 UTC] - Frontend-Only Game Rating System

### Added

- Star rating display component showing average rating and count above game iframe
- Interactive rating input modal with 1-5 star selection
- Rate button in desktop game banner control panel
- localStorage persistence for user ratings and game rating data
- useGameRating hook for managing rating state and localStorage
- Translation keys for all rating UI elements
- Prevent multiple votes per game per user

### Changed

- Updated GameData TypeScript interface to include rating and ratingCount fields
- Modified GraphQL queries to fetch rating data from WordPress backend
- Enhanced GameIframe component to display ratings above the game
- Updated DesktopGameBanner with Rate button functionality

### Technical Details

- Ratings stored locally in browser localStorage (no backend persistence)
- Average calculation: newAvg = (rating \* ratingCount + userStars) / newCount
- Empty state shows "Be the first to rate" message
- User votes tracked by game slug to prevent duplicates

## [2025-09-09 23:15 UTC] - Site Configuration Cleanup

### Removed

- Deleted helper functions: getContactEmail(), getLegalDates()
- Removed SEO_CONFIG backward compatibility export
- Eliminated unnecessary function abstractions

### Changed

- All components now use siteConfig directly instead of helper functions
- Updated 8 files to use direct config access: siteConfig.contact.email, siteConfig.legal
- Simplified site.config.ts from 84 to 75 lines (11% further reduction)
- Direct property access improves code clarity and performance

### Improved

- More direct, readable code without unnecessary indirection
- Reduced function call overhead throughout the application
- Cleaner import statements across all files

## [2025-09-09 23:10 UTC] - Site Configuration Consolidation

### Removed

- Deleted separate seo.config.ts file (19 lines)
- Removed verbose comments and unnecessary boilerplate

### Changed

- Merged SEO configuration into unified site.config.ts
- Reorganized config structure: seo, branding, contact, legal sections
- Simplified helper functions and reduced code from 113 to 84 lines
- Combined support settings with contact information

### Improved

- Single source of truth for all site configuration
- Cleaner, more maintainable code structure
- Backward compatibility maintained with SEO_CONFIG export

## [2025-09-09 23:00 UTC] - Logo Configuration Enhancement

### Added

- Logo configuration to site.config.ts with branding section
- logoPath and logoAlt fields for centralized logo management

### Changed

- Updated Header component to use logo configuration from site.config.ts
- Logo path and alt text now configurable in single location

## [2025-09-09 22:30 UTC] - SEO System Refactoring and Cleanup

### Removed

- Deleted unused useSeo.tsx client-side hook (243 lines)
- Removed empty hooks folder
- Eliminated unused exports: GAME_SEO_CONFIG, PAGE_SEO_CONFIGS, STRUCTURED_DATA_TEMPLATES, SeoHelpers class
- Removed duplicate JSON-LD generation logic

### Changed

- Simplified seo.config.ts from 216 to 31 lines (86% reduction)
- Refactored Seo.tsx to use centralized JsonLdGenerator for all JSON-LD creation
- Consolidated duplicate JSON-LD logic from pages into single generator
- Simplified MetadataGenerator API by removing unused parameters

### Improved

- Unified JSON-LD generation for both homepage and game pages
- Cleaner code structure with single source of truth for structured data
- Better separation of concerns between metadata and structured data

## [2025-09-07 01:25 UTC] - Build Process Fixes & Code Formatting

### Fixed

- Resolved all Prettier formatting issues across legal pages (DMCA, Privacy Policy, Terms of Service)
- Fixed unescaped quotes in Terms of Service page (converted to &quot; entities)
- Corrected formatting inconsistencies in Footer component and site configuration
- Fixed all ESLint warnings and errors throughout the codebase

### Improved

- Ensured all code follows consistent formatting standards
- Verified successful Next.js 15 production build with no compilation errors
- Confirmed TypeScript strict mode compliance with zero type errors
- Optimized build output with proper static page generation (16 pages total)

## [2025-09-06] - Focus Ring Removal, Background Consistency & Complete Theme Color Migration

### Changed

- Applied consistent background gradient (bg-body) to all support pages
- Updated about, contact, and privacy policy pages to use the same gradient background as game pages
- Replaced all hardcoded colors with theme variables across support pages:
  - Replaced text-gray-900 with text-foreground
  - Replaced text-gray-600 with text-muted-foreground
  - Replaced text-blue-600 with text-primary
  - Replaced bg-white with bg-card
  - Replaced bg-blue-50/bg-gray-50 with bg-secondary
  - Replaced border-gray-200 with border-border
  - Updated button colors to use primary theme colors
- Fixed unused 't' variable warning in about page
- Replaced all hardcoded colors in component files with theme variables:
  - ErrorFallback: red/yellow/blue/gray colors → destructive/warning/primary/muted theme colors
  - GameContent: gray/blue colors → foreground/primary/muted theme colors
  - MobileMenu & GamesDropdown: gray/blue colors → theme colors
  - DesktopGameBanner: green colors → success-bright theme color
  - LoadingSpinner & OptimizedImage: gray/blue colors → muted/primary theme colors
  - OfflineIndicator: orange colors → warning theme colors
  - ServerRichContent: prose gray/blue colors → theme colors
  - GameIframe & GameIframeCore: gray-900/white → foreground/background theme colors

### Removed

- Completely removed focus ring outline styles that appeared when selecting elements
- Disabled focus-visible outline globally
- Removed ring styles from .focus-ring utility class
- Removed unused getServerTranslations import from about page

## [2025-09-06 02:06 UTC] - SEO Enhancement & Code Refactoring (3 commits)

### Added

- Enhanced SEO components with centralized `MetadataGenerator` class
- New `generateAboutPageMetadata` method for dedicated about page SEO
- Keywords extraction functionality for improved search optimization
- Integration with centralized `SEO_CONFIG` constants

### Changed

- Renamed `generateGameMetadata` to `generateGamePageMetadata` for clarity
- Refactored page metadata generation across app/about, app/game/[slug], and app/page
- Simplified metadata handling with centralized configuration
- Updated i18n utilities with improved translation handling
- Enhanced mobile menu and navigation components

### Removed

- Unused `RichContent.tsx` component (125 lines)
- Duplicate `getTranslations` function from i18n/index.tsx
- Obsolete API test utilities and unused sanitization code
- Multiple offline indicator components consolidated into single implementation
- Redundant test API page (392 lines)
- Playwright test screenshots and temporary files

### Fixed

- Regex escape sequence bug in i18n utils (corrected `\\{FILE_STRUCTURE}` to `\\$&`)
- Component integration issues and code formatting consistency
- Translation key handling and variable interpolation

### Performance

- Reduced codebase size by ~670 lines across 3 commits
- Streamlined API layer and removed unused utilities
- Consolidated offline indicator components for better performance

## [2025-09-05 22:20 UTC] - Complete Game UI Redesign & Unified Card Implementation

### Changed

- Removed short description from all game pages (homepage and /game/[slug])
- Short description now only appears on the about page for better content organization
- Removed "Play Now" heading from game pages
- Enhanced background colors: replaced flat gray with smooth visible gradient system
- Removed mesh pattern overlay to eliminate all square/checkerboard tiling effects
- Increased gradient contrast to be visible while maintaining smoothness (3-4% lightness difference)
- Achieved smooth diagonal gradients from light to slightly darker tones
- No patterns or squares - pure smooth color transitions
- Merged control panel (DesktopGameBanner) with game iframe into single unified card design
- Eliminated separate shadows and spacing between components for cleaner visual hierarchy
- Positioned control banner below the game iframe for better UX flow
- Updated both pre-play and playing states to show banner at bottom
- Added light divider (border-top) between iframe and control panel
- Updated GameIframe.tsx to wrap both components in single glass-medium container
- Modified DesktopGameBanner styling to integrate seamlessly as card footer
- Cleaned up unused CSS classes (bg-dots, bg-mesh, bg-section-alt) for leaner codebase

### Improved

- Visual cohesion with single shadow instead of multiple component shadows
- Cleaner UI appearance with unified card structure
- Better visual hierarchy with game content prioritized above controls
- Cleaner separation between game area and control panel
- Consistent positioning across all game states
- Better component integration and spacing consistency
- Improved control banner contrast with glass effect and better button colors

## [2025-09-05 21:58 UTC] - GraphQL Schema Refactor

### Changed

- Updated WordPress GraphQL response structure to nested format (seo, gameContent, gameFields)
- Migrated thumbnail handling from WordPress to local configuration in games.config.ts
- Refactored API client to transform nested responses into flat GameData structure
- Updated TypeScript interfaces to match new GraphQL schema

### Added

- New fields from WordPress: developer and publishedAt for game metadata
- Transform function to convert nested GraphQL response to flat structure
- Local thumbnail configuration merged with WordPress data

## [2025-09-05 01:45 UTC] - Configurable Support Pages Enhancement

### Added

- Site configuration system (src/config/site.config.ts) with single configurable email
- Dynamic about page that fetches main game data from WordPress backend

### Changed

- Contact page now uses configurable email from site config instead of hardcoded addresses
- Privacy policy page uses configurable email for all contact references
- About page displays actual main game title and short_description from backend
- Simplified from multiple email addresses to single configurable contact email
- Updated all helper functions to use unified getContactEmail() approach

## [2025-09-03 02:10 UTC] - Mobile Full-Screen Gaming Module

### Added

- Mobile full-screen gaming experience with auto-launch for devices <768px
- Device orientation detection with landscape rotation prompts
- MobileFullScreenGame.tsx component with touch optimization
- Floating back button and ESC key support for exit
- Internationalization keys for mobile gaming messages
- Custom spin-slow animation for rotation indicators

### Changed

- GameIframe.tsx now dynamically imports mobile component based on device detection
- Enhanced accessibility with ARIA labels and keyboard navigation
- Updated TypeScript interfaces with new translation keys

## [2025-09-03 01:05 UTC] - Beautiful Background System Implementation

### Added

- Light gradient background system for header and body sections
- Dark footer background for visual contrast
- Mesh pattern overlay for subtle texture
- CSS custom properties for centralized gradient management
- Backdrop blur effects for modern glass appearance

### Changed

- Layout.tsx, Header.tsx, Footer.tsx with new background classes
- Extended Tailwind config with footer color tokens
- Enhanced visual hierarchy with multi-layer backgrounds

## [2025-09-03 00:55 UTC] - Comprehensive Design System Implementation

### Added

- Nunito font family with complete weight range (200-900)
- Gaming-focused color palette with semantic naming
- CSS custom properties for design tokens
- Pre-built utility classes for consistent UI patterns
- Gradient button system with hover effects

### Changed

- Complete UI overhaul across all components
- Tailwind config extended with comprehensive theme system
- Typography scale with responsive sizing
- Focus management and accessibility improvements

## [2025-09-03 00:42 UTC] - Mobile Header UI Fixes

### Fixed

- Mobile header title visibility issues
- Mobile menu positioning and overlay problems
- Dropdown functionality changed from hover to click-based
- Navigation container positioning for proper dropdown placement

### Changed

- Header.tsx with responsive title sizing and truncation
- MobileMenu.tsx with absolute positioning and z-index
- GamesDropdown.tsx with click interaction and smooth animations

## [2025-09-03 00:35 UTC] - Thumbnail Size Optimization

### Changed

- Reduced inner thumbnail sizes for better visual proportions
- Updated responsive sizing: 192px (small), 224px (medium), 256px (large)
- Optimized image sizes attribute for performance

## [2025-09-03 00:32 UTC] - Beautiful UI Redesign

### Added

- Glassmorphism-inspired design with backdrop blur effects
- Multi-layered animated play button with gradient transitions
- Hover scale effects and animated shine sweep
- Purple glow shadows on button hover

### Changed

- Removed white wrapper cards for cleaner design
- Enhanced thumbnail with gradient overlays
- Improved typography with drop-shadow effects

## [2025-09-03 00:28 UTC] - Small Screen Optimization

### Added

- Conditional visibility for mobile vs desktop screens
- Larger play button size for mobile devices

### Changed

- Hide thumbnail and title on screens <640px
- Show full interface on medium+ screens for better UX

## [2025-09-03 00:25 UTC] - Responsive Thumbnail and Play Button Enhancement

### Added

- Responsive padding and spacing classes
- Text sizing and line-clamp for long titles
- Optimized image loading with responsive sizes

### Changed

- Enhanced breakpoint design for mobile, tablet, and desktop
- Improved play card layout with max-width constraints

## [2025-09-03 00:22 UTC] - Dynamic 16:9 Game Frame Implementation

### Added

- Dynamic aspect-video (16:9) Tailwind CSS class
- Automatic scaling across all screen sizes

### Changed

- Replaced fixed height props with responsive aspect ratio
- Modified GameIframe.tsx, GameIframeCore.tsx, and GameContent.tsx
- Removed width/height props for dynamic scaling

### Fixed

- Game frame cards now maintain consistent 16:9 aspect ratio
