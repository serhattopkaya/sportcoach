# SportCoach

A tablet-first web app for sport teachers to demonstrate drills and exercises during class with kids aged 12-16.

## Sports

- Basketball (12 drills)
- Soccer / Football (12 drills)
- Volleyball (10 drills)
- Handball (10 drills)

## Features

- **Step-by-Step Guides** -- Swipeable cards walking through each drill with coaching tips
- **Animated Demos** -- Watch player movements on the court with play/pause, speed control, and timeline scrubbing
- **Bilingual** -- Full German and English support with a language toggle
- **Tablet-First** -- Designed for landscape tablet use with large touch targets
- **PWA** -- Installable to home screen, works offline
- **Screen Wake Lock** -- Keeps the screen on during class

## Tech Stack

- React 19 + TypeScript
- Vite 8
- Tailwind CSS 4
- react-konva (Konva.js) for court rendering and animations
- Motion (Framer Motion) for page transitions and swipe gestures
- Zustand for state management
- i18next for internationalization

## Getting Started

```bash
npm install
npm run dev
```

Open http://localhost:5173 on your tablet or browser.

## Install as App

Open the URL in Safari (iPad) or Chrome (Android), then use "Add to Home Screen" to install it as a standalone app.

## Project Structure

```
src/
  components/    UI components (layout, court, common)
  pages/         Route pages (home, drill library, guide, animation)
  data/          Static drill library (44 drills with guides + animations)
  hooks/         Custom hooks (animation loop, wake lock)
  lib/           Utilities (animation engine, court config, colors)
  store/         Zustand state
  types/         TypeScript type definitions
  i18n/          Translation files (en.json, de.json)
  assets/courts/ SVG court diagrams
```

## Build

```bash
npm run build
```

Production output goes to `dist/` (~1.1 MB).
