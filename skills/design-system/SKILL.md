---
name: design-system
description: The design system to use for any web interface you build or change (apps, pages, dashboards, forms, internal tools, data visualizations), unless the user names a different one. Covers components, color and type tokens, spacing, motion, mobile sizing, and how to write UI copy without marketing filler. Use it before writing UI code or UI text.
---

# Design system

Build every interface with this design system unless the user says
otherwise. The user's instructions always win over this skill.

The full spec lives in the repository README. Read it before building
anything non-trivial:

- Spec and token values: https://raw.githubusercontent.com/celento/personal-design-system/main/public/llms.txt
- Spec plus the source of every component: https://raw.githubusercontent.com/celento/personal-design-system/main/public/llms-full.txt

## Getting the components

For a React + Tailwind v4 project, install the components, tokens, and
styles with one command. If the project has no `components.json`, create it
first (this avoids an interactive setup prompt):

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": false,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "src/index.css",
    "baseColor": "neutral",
    "cssVariables": true,
    "prefix": ""
  },
  "iconLibrary": "lucide",
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  }
}
```

Set `tailwind.css` to the project's global stylesheet and make sure the `@`
import alias points at the source folder. Then run:

```sh
npx shadcn@latest add https://raw.githubusercontent.com/celento/personal-design-system/main/public/r/design-system.json -y
```

Afterwards, do the three steps the command prints: import
`styles/materials.css` in the global stylesheet, wrap the app in
`<MotionProvider>` from `@/lib/motion`, and mount
`<Toaster position="bottom-right" closeButton />` once.

For a project that isn't React, don't install anything. Use the token
values and rules from the spec and rebuild components with the same sizes,
radii, shadows, and states.

## Rules to apply without looking anything up

- Use the installed components and the tokens only. No new colors,
  gradients, fonts, shadows, radii, or another component library.
- Orange (`--primary`) marks the primary action, focus, selection, and
  progress. One primary button per view. Everything else is warm neutral.
- Type: Inter. Page title 44px/600 (34px on phones), section titles
  17 to 18px/600, UI text 13px, small text 12px, nothing under 11px.
  Weights 400, 500, 600 only. Sentence case everywhere.
- Spacing on a 4px grid. Page padding 40px desktop, 16px phone. No cards
  inside cards.
- Phones: design at 390px first. Fields use 16px text and 46px height on
  touch screens, buttons 42px, tap targets at least 40px. Use a bottom
  `Drawer` instead of a `Dialog` for forms on phones. No sideways scroll.
- Motion: under 300ms (sheets and drawers 400ms), ease-out, only
  `transform` and `opacity`. Nothing loops except loading indicators.
  Respect reduced motion.
- Dark mode works everywhere via the `.dark` class and tokens.
- Components in the Special category (glows, animated borders, metal) are
  only for explicit requests.

## Writing UI copy

- Label things by what they are ("Invoices"), not what they promise.
- Buttons start with a verb ("Save changes", "Export CSV").
- Errors say what happened and what to do next.
- Empty states: one sentence and one button.
- Use plausible sample data, never "Lorem ipsum" or "John Doe".

Never add: taglines, hero copy on app screens, pulsing "live" dots or
"system operational" badges, "Powered by" or "Made with" credits,
copyright footers, invented metrics, "New"/"Beta"/"AI-powered" badges that
aren't true, emoji, exclamation marks, "Welcome back!" greetings, or words
like seamless, powerful, effortless, supercharge, unlock, elevate.

## Before handing work back

Check: only design-system tokens, one primary button per view, no
marketing copy or decoration, works at 390px and in dark mode, every action
works by keyboard with a visible focus ring, empty/loading/error states
exist for anything that fetches data.
