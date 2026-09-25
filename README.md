# Personal design system

A React + TypeScript component playground built with Vite, Tailwind CSS v4, and locally owned shadcn/ui components (Radix / New York).

## Development

Requires Node.js 22.12+ and npm.

```sh
npm ci
npm run dev
```

## Playground

- 43 interactive specimens, searchable by name, category, and state.
- Buttons, input controls, date pickers, menus, dialogs, sheets, drawers, tables, navigation, feedback, and layout primitives.
- Foundations: semantic color tokens, typography, spacing, and corner radius.
- Light, dark, and system appearance. System is the initial default and responds to OS changes immediately.
- Persistent accent and radius controls. Preferences are local to each browser; Reset restores the defaults.
- Responsive navigation, keyboard controls, reduced-motion support, and self-hosted Geist fonts.

Examples use local state and preview notifications; they do not send data or modify repository files. The gallery does not include every specialized block in the upstream registry.

## Customization

- `src/components/ui/`: editable shadcn primitives.
- `src/index.css`: Tailwind setup and base semantic tokens.
- `src/App.css`: personal palette, layout, responsive rules, and specimen styles.
- `src/theme.ts`: appearance preference and OS theme handling.
- `src/demos.tsx`: specimen registry and interactive examples.
- `src/App.tsx`: playground shell, search, filters, and foundations.
- `components.json`: shadcn CLI configuration.

Add a primitive with `npx shadcn@latest add <component>`, then register a specimen in `src/demos.tsx`. Commit local component changes before using the CLI's overwrite option.

## Verification

```sh
npm run lint
npm run build
npx playwright install chromium firefox
npm test
```

Browser tests cover desktop Firefox and Chromium, a narrow Firefox viewport, filtering, theme synchronization and persistence, dialogs, selections, forms, navigation, and overflow. CI runs the same checks for pushes and pull requests.

## Vercel

Import `celento/personal-design-system` into Vercel. `vercel.json` configures the Vite framework, `npm run build`, the `dist` output, and SPA fallback. Use the repository root and Node.js 22.x. No environment variables or backend services are required.

```sh
npm run build
npm run preview
```

## Upstream

[shadcn/ui documentation](https://ui.shadcn.com/docs) · [Vite](https://vite.dev) · [Radix](https://www.radix-ui.com)

shadcn/ui component source is distributed under the MIT license; see `THIRD_PARTY_NOTICES.md`.
