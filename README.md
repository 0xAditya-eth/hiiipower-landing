# HiiiPower Landing

Landing page for HiiiPower built with Next.js App Router, React, Tailwind CSS v4, and Framer Motion.

## Tech Stack

- Next.js 15 (App Router)
- React 19
- Tailwind CSS v4
- Framer Motion

## Getting Started

Prerequisites: Node.js 18+ (20+ recommended) and npm.

Install dependencies and run the dev server:

```bash
npm install
npm run dev
```

Open `http://localhost:3000` in your browser.

## Scripts

- `npm run dev`: Start development server (with Turbopack)
- `npm run build`: Build for production
- `npm run start`: Start production server
- `npm run lint`: Run ESLint

## Project Structure

```
app/
  api/waitlist/route.ts   # POST /api/waitlist endpoint
  layout.tsx              # App shell
  page.tsx                # Landing page
components/
  dynamic-bg.tsx          # Scroll-reactive background
  ui/button.tsx           # Button component
  waitlist-modal.tsx      # Join waitlist modal
data/
  waitlist.json           # Local persistence for waitlist
public/                   # Static assets
```

## Waitlist API

### `POST /api/waitlist`

Submit a waitlist signup with optional UTM source tracking.

Request body:

```json
{
  "name": "Ada Lovelace",
  "email": "ada@example.com",
  "utm_source": "instagram",
  "utm_medium": "bio",
  "utm_campaign": "meta_exodus"
}
```

Only `name` and `email` are required. UTM parameters are optional and captured from landing URL query strings.

Responses:

- `200` `{ ok: true }` on success (idempotent for duplicate emails)
- `400` `{ error: "Invalid input" }` if name/email invalid
- `500` `{ error: "Server error" }` on unexpected errors
- `503` `{ error: "Storage unavailable" }` if file system is read-only

### `GET /api/waitlist/stats`

Protected endpoint for read-only analytics. Returns aggregate counts only (no emails).

**Authentication**: Requires `Authorization: Bearer <token>` header where token matches `WAITLIST_STATS_TOKEN` environment variable.

Optional query parameters:
- `from`: ISO date string (e.g. `2026-10-01`)
- `to`: ISO date string

Example:

```bash
curl -H "Authorization: Bearer your-token-here" \
  "https://hiiipower.app/api/waitlist/stats?from=2026-10-01&to=2026-10-31"
```

Response:

```json
{
  "total": 1523,
  "by_utm_source": { "instagram": 823, "threads": 401, "x": 299 },
  "by_utm_medium": { "bio": 1523 },
  "by_utm_campaign": { "meta_exodus": 1523 },
  "daily_by_source_last_30d": {
    "2026-10-19": { "instagram": 45, "threads": 23 }
  }
}
```

When `from` or `to` parameters are provided, the daily series respects those filters and the field name changes to `daily_by_source` instead of `daily_by_source_last_30d`.

**Errors**:
- `404` if `WAITLIST_STATS_TOKEN` is not set
- `401` if the token is incorrect
- `400` if `from` or `to` are invalid dates
- `503` if MongoDB is not configured

### Persistence

- By default, submissions are stored in `data/waitlist.json`.
- If `MONGODB_URI` is set, submissions are stored in MongoDB with a unique index on `email`.

### Environment variables

Create a `.env.local` at the project root:

```bash
# MongoDB connection (required for production)
MONGODB_URI=your-mongodb-connection-string

# Optional: override database name (otherwise uses the default from URI)
MONGODB_DB=your-db-name

# Stats API token (optional, but required to enable GET /api/waitlist/stats)
# Generate with: openssl rand -hex 32
WAITLIST_STATS_TOKEN=your-secure-random-token
```

### Stored Fields

Each waitlist entry stores:
- `name` (string): Derived from email username
- `email` (string, unique): User's email address
- `createdAt` (ISO date): Signup timestamp
- `utm_source` (string, optional): UTM source parameter
- `utm_medium` (string, optional): UTM medium parameter
- `utm_campaign` (string, optional): UTM campaign parameter

## Deployment

This app works well on platforms like Vercel.

Build and start locally to simulate production:

```bash
npm run build
npm run start
```

## Notes

- `node_modules/` is ignored via `.gitignore`.
- Env files (`.env*`) are ignored by default.
- No environment variables are required for local development (falls back to file-based storage), but you can set `MONGODB_URI` to use MongoDB.
