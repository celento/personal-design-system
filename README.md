# Design system

A component library built with React, TypeScript, Vite, and Tailwind CSS v4.
Every component handles keyboard interaction, focus management, and semantics.

## Development

Requires Node.js 22.12+ and npm.

```sh
npm ci
npm run dev
```

## Components

49 interactive examples, searchable by name, category, and state. The original
43 specimens share a warm neutral palette with an orange accent, pill controls,
dotted inset stages, material shadows, and spring-based motion (filtering,
overlay entrances, toggles, and card hover states). Six additional examples
show animated effects:

- Border beam: animated borders, composer, primary action, and focused input.
- Metal: silver, chromatic, and gold controls, with a static CSS metal rim when WebGL2 is unavailable.
- Thinking orb: working, searching, and solving states.
- Gooey: expanding quick actions with crisp DOM controls.
- Voice: manually controlled level and processing animation. No microphone access.
- Bot avatar: idle, working, and sleeping animated avatars.

Light, dark, and system appearance are supported. System is the default. Inter
is self-hosted. The motion control pauses effects and persists across reloads;
OS reduced-motion settings take priority. The effects pause rendering
offscreen where supported. Menus and forms remain usable without animation.

Examples use local state and preview notifications; they do not submit data to
a server or modify repository files. This is a component library, not a backend.

## Customization

- `src/components/ui/`: editable primitives. Tabs use a shared sliding indicator.
- `src/components/materials.css`: material styling and motion for all primitives, including portalled overlays.
- `src/components/effects/`: reusable theme-aware BeamSurface, BeamInput, and MetalSurface adapters.
- `src/index.css`: semantic light/dark tokens and shared motion values.
- `src/App.css`: gallery shell and example layout.
- `src/theme.ts`: persisted appearance and OS theme handling.
- `src/motion.tsx`: animation preference, OS reduced motion, and resolved theme.
- `src/demos.tsx`, `src/effect-demos.tsx`: specimen registries and interactions.
- `src/components/foundations.tsx`: token reference.

To add a component, create it in `src/components/ui/` and register a specimen in
`src/demos.tsx`. Overwriting existing components with generated code replaces
local styling and behavior, so review those changes before accepting them.

## Verification

```sh
npm run lint
npm run format:check
npm run build
npx playwright install chromium firefox
npm test
```

Tests run against the production build in Firefox, Chromium, and a narrow
Firefox viewport. They cover filtering, themes, forms, overlays, keyboard focus,
effect controls, reduced motion, legacy preference isolation, and accessibility.
CI runs these checks for pushes and pull requests.

## Vercel

Import `celento/personal-design-system`. `vercel.json` sets Vite, `npm run build`,
`dist`, and SPA fallback. Use the repository root and Node.js 22.x. No environment
variables or backend services are required.
