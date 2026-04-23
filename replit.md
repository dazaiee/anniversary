# Babe - Balloon Pop App

## Overview
A romantic interactive web application where users pop digital balloons to reveal heartfelt messages ("reasons why I love you"). Features 365+ messages, animated balloon popping with a pin launcher, a progress counter, and a final celebration phase.

## Tech Stack
- **Frontend**: React 19 + TypeScript
- **Styling**: Tailwind CSS 4.0
- **Animations**: Framer Motion
- **Build Tool**: Vite 6
- **Package Manager**: npm

## Project Structure
- `src/App.tsx` — Main application controller (state management)
- `src/components/` — UI components (BalloonGrid, PinLauncher, RevealMessageCard, HeaderCounter, PageIndicator, FloatingHearts, FinalCelebration)
- `src/data/reasons.ts` — Array of 365+ romantic messages
- `src/utils/pagination.ts` — Balloon pagination logic
- `public/` — Static assets (favicon, icons)

## Development
```bash
npm run dev   # Start dev server on port 5000
npm run build # Build for production (output: dist/)
```

## Configuration
- Dev server: `0.0.0.0:5000` with `allowedHosts: true` for Replit proxy support
- Deployment: Static site, builds to `dist/`

## Workflow
- **Start application**: `npm run dev` on port 5000 (webview)
