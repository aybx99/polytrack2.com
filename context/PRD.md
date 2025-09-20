# PRD.md

## Product: SEO-Optimized Game Site (Next.js + Headless WordPress)

> Purpose-built for a Next.js frontend that embeds a **primary game** and maybe other (0 to 4) **secondary games** via `<iframe>`, with long, SEO-friendly content sourced from a **Headless WordPress** backend.

---

## 1) Goals & Scope

- Build an SEO-optimized web portal for a **main game** at `/` and other (~4) **secondary games** at `/game/{slug}`.
- Use **iframe** embeds for games.
- Serve **long-form, structured content** and robust SEO metadata.

> **Secondary games** are games related to the main game, like older or special versions, it could be no secondary games

---

## 2) Constraints & Preferences

- **Frontend:** Next.js (App Router), **TypeScript**, **Tailwind CSS**, **shadcn**. Avoid heavy client frameworks unless necessary.
- **CMS:** **Headless WordPress** with **WPGraphQL** plugin is the **single source of truth** for game content and SEO metadata. **Do not** hard-code game text/meta in the frontend.
- **Game Selection:** Main and secondary game slugs are managed via a local config file (`config/games.config.ts`) for flexible control without CMS changes.
- **Embed:** Games embedded via `<iframe>`. **No extra security validation is required** beyond what's specified here.
- **Routing**
  - `/` → main game (long SEO description) - slug from config
  - `/game/{slug}` → secondary games (long SEO description) - slugs from config
- **SEO:** 1200–2000+ words per page, FAQs, internal links, JSON-LD.

---

## 3) Data Model (WordPress → Next.js)

Custom post type: `game` with fields (as returned by GraphQL):

- `seo.title`, `seo.metaDesc` (strings for head tags)
- `gameContent.title` (string - canonical display title)
- `gameContent.slug` (string, unique)
- `gameContent.genre[]` (taxonomy)
- `gameContent.publishedAt` (ISO string)
- `gameContent.longDescription` (rich HTML)
- `gameFields.iframeUrl` (string; validated, https only)
- `gameFields.developer` (string)
- `gameFields.shortDescription` (text)

> Thumbnail/OG image is no longer provided by WordPress. It is sourced from local configuration in `config/games.config.ts` as a `thumbnail` path per game.

> **Rendering rule:** Sanitize CMS rich content on the server; never dangerously inject untrusted HTML without sanitization.

### Game Configuration

- **Local Config File**: `config/games.config.ts` stores main/secondary games and UI metadata
- **Structure**:

  ```typescript
  export interface GameConfig {
    slug: string; // WordPress post slug
    displayName?: string; // Optional nav/display override
    isActive: boolean; // Toggle visibility
    priority?: number; // Sort order (lower first)
    thumbnail?: string; // Local path for OG image and listings
  }

  export const gamesConfig = {
    mainGame: {
      slug: 'main-game',
      isActive: true,
      thumbnail: '/images/main.png',
    },
    secondaryGames: [
      {
        slug: 'secondary-1',
        isActive: true,
        thumbnail: '/images/secondary-1.png',
      },
      // ... up to 4 secondary games
    ],
    settings: {
      maxSecondaryGames: 4,
      showInactiveInDev: true,
      defaultCacheTTL: 3600,
    },
  } as const;
  ```

- **Purpose**: Centralized control over which games are displayed and which image is used for Open Graph/social previews, without modifying WordPress content

---

## 4) API Integration (GraphQL)

- **WordPress GraphQL API** via WPGraphQL plugin. Simple native fetch implementation:
  - GraphQL endpoint via env (`NEXT_PUBLIC_WP_GRAPHQL_URL`).
  - **No external GraphQL libraries** - use native `fetch` with POST requests.
  - Manual TypeScript interfaces for type safety.
  - Error handling (404, 5xx) → fallback UI + logging.

### GraphQL Query

```graphql
query GetGamePostBySlug($slug: ID!) {
  post(id: $slug, idType: SLUG) {
    seo {
      title
      metaDesc
    }
    gameContent {
      title
      slug
      genre
      publishedAt
      longDescription
    }
    gameFields {
      iframeUrl
      developer
      shortDescription
    }
  }
}
```

### Simple Client Implementation

```typescript
const response = await fetch(process.env.NEXT_PUBLIC_WP_GRAPHQL_URL!, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    query: `
      query GetGamePostBySlug($slug: ID!) {
        post(id: $slug, idType: SLUG) {
          seo { title metaDesc }
          gameContent { title slug genre publishedAt longDescription }
          gameFields { iframeUrl developer shortDescription }
        }
      }
    `,
    variables: { slug },
  }),
  next: { revalidate: 3600 },
});
```

### Wrapper Functions

- `getMainGame()` → calls `getGameBySlug(gamesConfig.mainGame.slug)` and merges `thumbnail` from config
- `getSecondaryGames()` → maps over `gamesConfig.secondaryGames` and fetches each; merge each with its config `thumbnail`
- Simple error handling with try/catch and null returns

- **Caching & Revalidation**
  - Use **ISR** with `revalidate` (e.g., 3600s).
  - Optional: **On-Demand Revalidation** webhook fired by WordPress on publish/update.

---

## 5) Delivery Strategy (Rendering)

- **Homepage `/`**: SSG + ISR. Pull main game using slug from `gamesConfig.mainGame`.
- **`/game/[slug]`**: SSG for games defined in `gamesConfig.secondaryGames` with ISR; 404 if not found. Consider `fallback: 'blocking'`.
- **`/sitemap.xml`**: include `/` and all `/game/*` slugs from `gamesConfig`.
- **`/robots.txt`**: allow crawl and point to sitemap.

---

## 6) Information Architecture

- **Core**: `/`, `/game/[slug]`
- **System**: `/sitemap.xml`, `/robots.txt`
- **Support**: `/about`, `/contact`, `/privacy-policy`, custom `404` page
- **Navigation**: Header links to Home + Games index; Footer links to legal pages

---

## 7) SEO Implementation Checklist

- **Head tags**: per-page `title`/`meta description` from `seo.title`/`seo.metaDesc`, canonical, Open Graph, Twitter cards
- **JSON-LD**: `@type: VideoGame` or `Game` with `name`, `description`, `image`, `genre`, `aggregateRating` (optional), `author`/`publisher` if applicable, and `applicationCategory: Game`
- **Content layout**: H1 (title), H2 sections (Overview, How to Play, Features, Controls, Tips, FAQs), internal links to other games
- **Media**: compressed images; `next/image` for optimization
- **URL hygiene**: lowercase, hyphenated slugs; stable permalinks mirroring WP

> **JSON-LD (Schema)** should be generated using a config file (shared between all games) and game fields from backend

> **Static generation** with periodic revalidation is ideal for organic traffic and low TTFB.

---

## 8) Performance & Accessibility

- **Iframe**: `loading="lazy"`, explicit `width/height`, `title`, `allow` minimal, `sandbox` with only needed flags
- **A11y**: semantic landmarks, alt text, focus states, keyboard nav

---

## 9) Quality Gates

- **Type Safety**: TypeScript strict mode
- **Lint/Format**: ESLint + Prettier

---

## 10) Vision & Tech Stack

- **Problem**: Build an SEO-optimized web portal for a main game plus ~4 secondary games (iframe-based).
- **Solution**: Next.js SSG/ISR frontend that pulls game content and SEO metadata from Headless WordPress.
- **Stack**: Next.js (TypeScript, App Router), Tailwind CSS, WordPress GraphQL (WPGraphQL), native fetch (no GraphQL client libs), ISR + on-demand revalidation, next-sitemap, next-seo.
- **Constraints/Preferences**: CMS is the source of truth; do not ship hard-coded content; favor simple, familiar UX.

---

## Appendices

### A) `<iframe>` Wrapper (minimal props per request)

- `src`, `title`, `width`, `height`
- `loading="lazy"` for performance

### B) SEO Long-Form Template (page content)

1. **H1**: Game Title
2. **Lead paragraph**: one-sentence hook
3. **Overview** (what/why)
4. **How to Play** (steps + controls)
5. **Features** (bullets)
6. **Tips & Strategies**
7. **FAQ** (3–6 Q&A)
8. **Related Games** (internal links)
9. **CTA** (Play Now)

### C) JSON-LD (Game) — sketch

```json
{
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "${title}",
  "description": "${plainText(long_description)}",
  "image": "${og_image}",
  "genre": ${genresJson},
  "url": "${canonical}",
  "applicationCategory": "Game"
}
```

### D) Environment Variables

- `NEXT_PUBLIC_WP_GRAPHQL_URL` (e.g., `https://game-distribution.com/graphql`)
- `REVALIDATION_SECRET` (on-demand ISR)
- `PRIMARY_SITE_URL` (e.g., `https://mydomain.com` for sitemap/canonicals)
