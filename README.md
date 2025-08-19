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

Endpoint: `POST /api/waitlist`

Request body:

```json
{ "name": "Ada Lovelace", "email": "ada@example.com" }
```

Responses:

- `200` `{ ok: true }` on success (idempotent for duplicate emails)
- `400` `{ error: "Invalid input" }` if name/email invalid
- `500` `{ error: "Server error" }` on unexpected errors

Persistence: submissions are stored in `data/waitlist.json`. The file and folder are ensured at runtime if missing.

## Deployment

This app works well on platforms like Vercel.

Build and start locally to simulate production:

```bash
npm run build
npm run start
```

## Notes

- `node_modules/` is ignored via `.gitignore`.
- No environment variables are required for local development; the API writes to the local filesystem.
