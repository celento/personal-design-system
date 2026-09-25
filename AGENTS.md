# Agent instructions

This repository is a design system. Read `README.md` before building or
changing any interface, in this repo or in a project that uses it. It
defines the tokens, type scale, component choices, motion, mobile sizing,
and writing rules.

## Rules that apply to every change

- Use the components in `src/components/ui/` and the tokens in
  `src/styles/tokens.css`. Don't add colors, fonts, shadows, radii, or
  another component library.
- One primary (orange) button per view. Orange is for action, focus,
  selection, and progress only.
- Write plain, specific UI copy in sentence case. No taglines, marketing
  phrases, emoji, exclamation marks, "Powered by" credits, copyright
  footers, invented metrics, or pulsing "live" indicators.
- Every screen works at 390px wide and in dark mode. Fields use 16px text
  on touch screens; tap targets are at least 40px.
- Motion stays under 300ms (sheets and drawers 400ms), uses `transform`
  and `opacity` with ease-out, and respects reduced motion. Nothing loops
  except loading indicators.
- Components in the Special category (glows and animated effects) are only
  for explicit requests.
- The person's instructions override this file and the README.

## Working on this repository

- Style components through their `data-slot` in
  `src/components/materials.css`, using tokens. Keep new values in
  `tokens.css`.
- When you add or change a component, update its example in
  `src/demos.tsx` and its guidance in `README.md`.
- Before committing, run `npm run lint`, `npm run format:check`,
  `npm run build`, and `npm test`.
