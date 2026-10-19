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

Submit a waitlist signup with optional source tracking and referral code.

Request body:

```json
{
  "name": "Ada Lovelace",
  "email": "ada@example.com",
  "utm_source": "instagram",
  "utm_medium": "bio",
  "utm_campaign": "meta_exodus",
  "heard_from": "Instagram",
  "referred_by": "a1b2c3d4"
}
```

Only `name` and `email` are required. All other fields are optional:
- `utm_source`, `utm_medium`, `utm_campaign`: UTM parameters captured from landing URL
- `heard_from`: One of `"Instagram"`, `"Threads"`, `"X"`, `"A friend"`, `"Other"`
- `referred_by`: Referral code from another user's invite link

Responses:

- `200` `{ ok: true, storage: "mongodb" | "file", ref_code: "a1b2c3d4" }` on success (idempotent for duplicate emails)
- `400` `{ error: "Invalid input" }` if name/email invalid
- `500` `{ error: "Server error" }` on unexpected errors
- `503` `{ error: "Storage unavailable" }` if file system is read-only

### `GET /api/waitlist/stats`

Protected endpoint for read-only analytics. Returns aggregate counts only (no emails or codes).

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
  "by_heard_from": { "Instagram": 450, "Threads": 320, "A friend": 280 },
  "with_referral": 234,
  "organic": 1289,
  "daily_by_source_last_30d": {
    "2026-10-19": { "instagram": 45, "threads": 23 }
  }
}
```

**Note**: Stats endpoint only works with MongoDB storage. Returns `404` if `WAITLIST_STATS_TOKEN` is not set, and `401` if the token is incorrect.

### Persistence

- By default, submissions are stored in `data/waitlist.json`.
- If `MONGODB_URI` is set, submissions are stored in MongoDB with unique indexes on `email` and `ref_code`.

Each signup receives a unique 8-character referral code. Duplicate email submissions return the existing code.

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
- `ref_code` (string, unique, 8 chars): Personal referral code
- `utm_source` (string, optional): UTM source parameter
- `utm_medium` (string, optional): UTM medium parameter
- `utm_campaign` (string, optional): UTM campaign parameter
- `heard_from` (string, optional): Self-reported discovery source
- `referred_by` (string, optional): Referral code that brought this signup

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
