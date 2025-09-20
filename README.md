# SEO-Optimized Game Site

A simple Next.js 15 application for hosting browser-based games with WordPress CMS integration.

## Features

- 🎮 **Game Integration**: Secure iframe embedding with multiple game support
- 🚀 **Performance**: Optimized with bundle splitting and lazy loading
- 🔍 **SEO**: JSON-LD schemas, sitemaps, meta optimization
- 🌐 **i18n**: Centralized translations with server-side rendering
- 📱 **Responsive**: Mobile-first design with Tailwind CSS
- ⚡ **ISR**: On-demand revalidation via WordPress webhooks

## Quick Start

1. **Clone and Install**

   ```bash
   git clone <repository>
   cd single-game-template
   npm install
   ```

2. **Environment Setup**

   ```bash
   cp .env.example .env.local
   # Edit .env.local with your WordPress GraphQL URL and secrets
   ```

3. **Development**

   ```bash
   npm run dev
   # Visit http://localhost:3000
   ```

4. **Production Build**
   ```bash
   npm run build
   npm start
   ```

## Environment Variables

| Variable                     | Description                | Required |
| ---------------------------- | -------------------------- | -------- |
| `NEXT_PUBLIC_WP_GRAPHQL_URL` | WordPress GraphQL endpoint | ✅       |
| `REVALIDATION_SECRET`        | Secret for ISR webhooks    | ✅       |
| `PRIMARY_SITE_URL`           | Your site's primary URL    | ✅       |

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── game/[slug]/       # Dynamic game pages
│   ├── api/               # API routes
│   └── (pages)/           # Static pages
├── components/            # React components
├── lib/                   # Utilities and config
├── i18n/                  # Internationalization
├── config/                # Game configuration
└── deploy/                # Vercel deployment config
```

## Scripts

- `npm run dev` - Development server
- `npm run build` - Production build
- `npm run build:analyze` - Build with bundle analysis
- `npm run lint` - ESLint check
- `npm run type-check` - TypeScript check

## Deployment (Vercel)

1. Connect your repository to Vercel
2. Add environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_WP_GRAPHQL_URL`
   - `REVALIDATION_SECRET`
   - `PRIMARY_SITE_URL`
3. Deploy automatically on push

The `deploy/vercel.json` file is already configured for optimal deployment.

## WordPress Integration

### Required WordPress Plugins

- WPGraphQL
- Custom Post Types (for games)

### Game Content Structure

Games are managed in WordPress with these fields:

- Title, Description, Content
- Game URL (iframe src)
- Featured Image
- SEO Meta fields

### Webhook Setup

Configure WordPress to call revalidation endpoint on content updates:

```
POST /api/revalidate
Authorization: Bearer YOUR_REVALIDATION_SECRET
Content-Type: application/json

{
  "type": "path",
  "path": "/game/slug-name"
}
```

## Game Configuration

Add new games in `config/games.config.ts`:

```typescript
export const SECONDARY_GAMES = [
  {
    slug: 'new-game',
    title: 'New Game Title',
    isActive: true,
  },
];
```

Games must exist in WordPress with matching slugs.

## Health Check

The application includes a health check endpoint at `/api/health` that:

- Tests WordPress GraphQL connectivity
- Returns system status and response time
- Used for monitoring and deployment verification

## Contributing

1. Follow the existing code style
2. Run `npm run type-check && npm run lint` before committing
3. Test in both development and production modes

## License

ISC License - see LICENSE file for details.
