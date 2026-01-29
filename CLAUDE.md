# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

NextWave IA is a full-stack web application with a React frontend and Express backend. The project uses a monorepo structure with client, server, and shared code directories. It's configured for deployment on Vercel as a static build.

## Development Commands

**Start development servers:**
```bash
npm run dev          # Start Express backend server on port 5004
npm run dev:client   # Start Vite dev server on port 5000 (standalone client)
```

In development, `npm run dev` runs the Express server which integrates the Vite dev server with HMR support via middleware. The server serves both API routes and the client app.

**Build and production:**
```bash
npm run build        # Build both client and server for production
npm start            # Run production server (requires build first)
npm run check        # TypeScript type checking
```

**Database:**
```bash
npm run db:push      # Push schema changes to PostgreSQL database using Drizzle Kit
```

The database uses PostgreSQL with Drizzle ORM. Schema is defined in `shared/schema.ts` and migrations go to `./migrations`.

## Architecture

### Directory Structure

- `client/` - React frontend (Vite + React 19)
  - `src/App.tsx` - Main app component with Wouter routing
  - `src/pages/` - Page components
  - `src/components/ui/` - shadcn/ui components
  - `src/lib/queryClient.ts` - TanStack Query configuration
- `server/` - Express backend
  - `index.ts` - Entry point, middleware setup, server initialization
  - `routes.ts` - API route registration (prefix all with `/api`)
  - `storage.ts` - Storage interface and in-memory implementation
  - `vite.ts` - Vite dev server middleware integration
  - `static.ts` - Production static file serving
- `shared/` - Code shared between client and server
  - `schema.ts` - Drizzle ORM schema and Zod validation schemas
- `script/build.ts` - Production build script (uses esbuild for server, Vite for client)

### Key Architecture Patterns

**Monorepo with path aliases:**
- `@/*` maps to `client/src/*`
- `@shared/*` maps to `shared/*`
- `@assets/*` maps to `attached_assets/*`

**Client-server split:**
- Client is a SPA using Wouter for routing (not React Router)
- Server handles all `/api/*` routes
- In development: Express integrates Vite middleware for HMR
- In production: Express serves static files from `dist/public`

**Storage abstraction:**
The `storage` interface in `server/storage.ts` provides a CRUD abstraction. The default is `MemStorage` (in-memory), but this should be replaced with a real database implementation (likely using Drizzle ORM) when DATABASE_URL is configured.

**Build process:**
- Client: Vite builds to `dist/public`
- Server: esbuild bundles to `dist/index.cjs` (CJS format for Node)
- Allowlisted dependencies are bundled with the server to reduce cold start times
- Vercel deployment configured for static builds only (outputs `dist/public`)

**Port requirements:**
The server MUST run on the port specified in `process.env.PORT` (default 5000). This is the only non-firewalled port and serves both API and client.

### UI Framework

Uses shadcn/ui components built on:
- Radix UI primitives
- Tailwind CSS v4 (via `@tailwindcss/vite`)
- Framer Motion for animations
- Sonner for toast notifications

### State Management

- TanStack Query (React Query) for server state
- Query client configured with:
  - No automatic refetching
  - Infinite stale time
  - Custom `apiRequest` and `getQueryFn` helpers in `lib/queryClient.ts`

## Environment Variables

Required in `.env.local`:
- `DATABASE_URL` - PostgreSQL connection string (required for Drizzle)
- `PORT` - Server port (defaults to 5000 if not set)

## Deployment

Vercel configuration (`vercel.json`):
- Static build targeting `dist/public`
- All routes rewrite to `/index.html` (SPA routing)
- Build command: `npm run build`

The current deployment is static-only (no serverless functions), so API routes won't work in production unless the Vercel config is updated.
