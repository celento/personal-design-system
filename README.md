# Personal design system

React, TypeScript, Vite, Tailwind CSS v4, and locally owned shadcn/ui components.
Visuals and motion are adapted from [Libraries.dev](https://github.com/Jakubantalik/Libraries.dev), with Radix retaining keyboard interaction, focus management, and semantics.

## Development

Requires Node.js 22.12+ and npm.

```sh
npm ci
npm run dev
```

## Components

49 interactive examples, searchable by name, category, and state. The original
43 specimens share a neutral surface palette, pill controls, inset stages,
material shadows, and consistent motion. Six additional examples use actual
Libraries.dev packages:

- `border-beam`: animated borders, composer, primary action, and focused input.
- `metal-fx`: silver, chromatic, and gold controls, with a static CSS metal rim when WebGL2 is unavailable.
- `thinking-orbs`: working, searching, and solving states.
- `liquid-gooey`: expanding quick actions with crisp DOM controls.
- `voice-glow`: manually controlled level and processing animation. No microphone access.
- `bot-avatars`: idle, working, and sleeping animated avatars.

Light, dark, and system appearance are supported. System is the default. Inter
is self-hosted. The motion control pauses effects and persists across reloads;
OS reduced-motion settings take priority. The effect libraries pause rendering
offscreen where supported. Menus and forms remain usable without animation.

Examples use local state and preview notifications; they do not submit data to
a server or modify repository files. This is a component library, not a backend.

## Customization

- `src/components/ui/`: editable shadcn/Radix primitives. Tabs use a shared spring indicator.
- `src/components/materials.css`: material styling and motion for all primitives, including portalled overlays.
- `src/components/effects/`: reusable theme-aware BeamSurface, BeamInput, and MetalSurface adapters.
- `src/index.css`: semantic light/dark tokens and shared motion values.
- `src/App.css`: gallery shell and example layout.
- `src/theme.ts`: persisted appearance and OS theme handling.
- `src/motion.tsx`: animation preference, OS reduced motion, and resolved theme.
- `src/demos.tsx`, `src/effect-demos.tsx`: specimen registries and interactions.
- `src/components/foundations.tsx`: token reference.

Add a primitive with `npx shadcn@latest add <component>`, then register a specimen.
The shadcn registry configuration is Radix/Nova, but the current visual system
is customized. Reapplying the old preset or overwriting components would replace
local behavior; review CLI changes before accepting them.

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

## Attribution

See [THIRD_PARTY_NOTICES.md](./THIRD_PARTY_NOTICES.md) for shadcn/ui and Libraries.dev
license notices. The implementation uses public MIT packages and source;
no paid Studio exports or proprietary font assets are included.
