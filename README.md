# Design system

This repository is the design reference for web apps, tools, and
visualizations built by AI models. When a model is pointed here, it should
build with these components, these tokens, and these writing rules instead of
inventing its own look. The goal is that output from any model looks like it
came from the same product, and nobody has to fix the same mistakes by hand
every time.

The rules below apply unless the person you are building for says otherwise.
Their instructions always win. If a rule here doesn't cover a case, choose
the quietest option that fits the rest of the page.

To see every component live, run the gallery (see [Development](#development)).

To use it with a model, paste the repository link with something like:

```text
Use https://github.com/celento/personal-design-system as the design system
for this project. Read its README.md first, copy the files it lists, and
follow its rules for components, tokens, mobile sizing, motion, and copy.
```

## Contents

- [For models: how to use this repo](#for-models-how-to-use-this-repo)
- [Principles](#principles)
- [Writing copy](#writing-copy)
- [Color](#color)
- [Typography](#typography)
- [Spacing and layout](#spacing-and-layout)
- [Radius and elevation](#radius-and-elevation)
- [Motion](#motion)
- [Mobile and touch](#mobile-and-touch)
- [Choosing components](#choosing-components)
- [Component notes](#component-notes)
- [Accessibility](#accessibility)
- [Before you hand it back](#before-you-hand-it-back)
- [Development](#development)

## For models: how to use this repo

**Copy the files. Don't restyle them.** The look lives in these files:

| File                             | What it is                                                                                  |
| -------------------------------- | ------------------------------------------------------------------------------------------- |
| `src/styles/tokens.css`          | Every color, shadow, radius, motion, and field-size token, light and dark. Plain CSS.       |
| `src/components/materials.css`   | Styling and motion for every component, keyed off `data-slot` attributes.                   |
| `src/components/ui/*.tsx`        | The React components.                                                                       |
| `src/index.css`                  | Maps tokens to Tailwind v4 utilities (`bg-primary`, `text-muted-foreground`, `rounded-lg`). |
| `src/motion.tsx`, `src/theme.ts` | Reduced-motion handling and light/dark/system theme. `tabs.tsx` depends on `motion.tsx`.    |
| `src/lib/utils.ts`               | The `cn` class helper the components import.                                                |

For a React project, copy those files with the same paths, install the
runtime dependencies from `package.json`, import `index.css` once at the root,
and mount `<Toaster />` once. Components import from `@/components/ui/...`, so
keep the `@` alias pointing at `src`.

For a project that isn't React, still use the values in `tokens.css` and
follow every rule in this document. Rebuild the component with the same
sizes, radii, shadows, and states. Don't swap in another library's look.

Treat `src/demos.tsx` as usage examples. It shows each component with
realistic content, which is the fastest way to see how a piece is meant to
be put together.

Things a model should never do in a project that uses this system:

- Add new brand colors, gradients, or a second accent color.
- Change the font, the type scale, or the radii.
- Use a different component library alongside this one.
- Add taglines, marketing copy, status lights, or decorative badges (see
  [Writing copy](#writing-copy)).
- Add animation that isn't described in [Motion](#motion).

## Principles

1. **Content first.** The interface is there to show someone's data and let
   them act on it. Chrome, decoration, and explanation come second.
2. **One accent.** Orange marks the primary action, focus, selection, and
   progress. Everything else is warm neutral.
3. **Quiet by default.** No element should compete for attention unless it
   needs a response. When unsure, remove it.
4. **Say it once, plainly.** One heading, one sentence of context at most,
   then the thing itself.
5. **Motion explains, it doesn't decorate.** Things move to show where they
   came from or that something happened.
6. **Works with a thumb and a keyboard.** Every screen works on a phone, and
   every action works without a mouse.

## Writing copy

Most of what makes generated interfaces feel cheap is the words. Write like
a calm, competent person explaining the product to a colleague. Write no
more than the screen needs.

### Rules

- **Label things by what they are.** A page about invoices is titled
  "Invoices", not "Your financial command center".
- **No taglines, slogans, or hero copy** unless the person asked for a
  marketing page. An app screen doesn't need a pitch.
- **No filler descriptions.** Don't put a subtitle under every heading. Add a
  sentence only when it tells the reader something the heading doesn't.
- **Sentence case everywhere.** "Create project", not "Create Project".
  Proper nouns keep their capitals.
- **Buttons are verbs.** "Save changes", "Delete project", "Export CSV". Not
  "Submit", "OK", or "Let's go".
- **Numbers over adjectives.** "3 failed" beats "A few issues detected".
- **Errors say what happened and what to do.** "Couldn't save. Check your
  connection and try again." Not "Oops! Something went wrong 😕".
- **Empty states say what goes here and how to add it.** One sentence and
  one button.
- **Confirmations name the object and the consequence.** "Delete 'Q3
  report'? This can't be undone."
- **Use real-looking sample data.** Plausible names, dates, and values.
  Never "Lorem ipsum", "John Doe", or "Test 123".

### Never add these

| Don't                                                                                                    | Why                                                                                            |
| -------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| Pulsing "Live" dots, blinking status lights, "System operational" badges                                 | Implies monitoring that doesn't exist. Show real status only, as a static dot.                 |
| "© 2025 Company. All rights reserved." footers                                                           | App screens don't need legal footers. Add one only if asked.                                   |
| "Powered by…", "Built with…", "Made with ❤️"                                                             | Credits the tools, not the product.                                                            |
| "New", "Beta", "Pro", "AI-powered" badges on things that aren't                                          | Badges are for real state.                                                                     |
| Taglines under the logo or title                                                                         | Noise. The title is enough.                                                                    |
| Invented metrics ("99.9% uptime", "Trusted by 10,000+ teams")                                            | Fabricated. Show real data or nothing.                                                         |
| Emoji in UI text, headings, or buttons                                                                   | Reads as unserious. Use an icon if a visual is needed.                                         |
| Exclamation marks in UI text                                                                             | Everything becomes shouting.                                                                   |
| "Welcome back, User! 👋" greetings                                                                       | The person knows who they are. Start with their content.                                       |
| Words like seamless, powerful, effortless, robust, next-gen, supercharge, unlock, elevate, revolutionize | Marketing vocabulary with no information in it.                                                |
| Tooltips or helper text that repeat the label                                                            | If the label is clear, stop.                                                                   |
| Decorative gradients, glows, blobs, or glassmorphism behind content                                      | Competes with the content. The effects in the Special category are for explicit requests only. |

### Examples

| Instead of                                         | Write                                          |
| -------------------------------------------------- | ---------------------------------------------- |
| Supercharge your workflow with AI-powered insights | Insights                                       |
| Oops! We couldn't find anything 🔍                 | No results for "ledger". Try a different name. |
| Your changes have been successfully saved!         | Changes saved                                  |
| Get Started Now →                                  | Create project                                 |
| Real-time analytics dashboard • Live               | Analytics                                      |
| Are you sure?                                      | Delete 3 files? You can't undo this.           |

## Color

All values are in `src/styles/tokens.css`. Use the token name, never the hex
value, so dark mode works.

| Token                      | Light       | Dark                  | Use for                                            |
| -------------------------- | ----------- | --------------------- | -------------------------------------------------- |
| `--background`             | `#fcfcfb`   | `#0f0f0e`             | Page background                                    |
| `--foreground`             | `#111110`   | `#f4f3f1`             | Body text, headings                                |
| `--card` / `--surface`     | `#ffffff`   | `#161615` / `#1f1e1d` | Cards, fields, raised controls                     |
| `--popover`                | `#ffffff`   | `#1f1e1d`             | Menus, dialogs, toasts                             |
| `--muted`                  | `#f4f3f1`   | `#22211f`             | Disabled fields, quiet fills                       |
| `--muted-foreground`       | `#66635e`   | `#a3a09a`             | Secondary text, placeholders, icons                |
| `--secondary`              | `#f2f1ef`   | `#252422`             | Segmented controls, hover fills, secondary buttons |
| `--border`                 | 8% ink      | 8% white              | Dividers, card borders                             |
| `--input`                  | 13% ink     | 13% white             | Field borders                                      |
| `--primary`                | `#cc4b0a`   | `#ff8a3d`             | Primary buttons, links, checked controls           |
| `--primary-bright`         | `#f76b15`   | `#ff9a55`             | Focus rings, progress fills, icon accents          |
| `--primary-soft`           | `#fff1e7`   | 13% orange            | Selected rows, "on" toggles, accent badges         |
| `--destructive`            | `#c52635`   | `#ff7783`             | Errors and destructive actions only                |
| `--success`                | `#1f8a4c`   | `#4fd08a`             | Success status only                                |
| `--warning`                | `#c77700`   | `#f5b544`             | Warning status only                                |
| `--chart-1` to `--chart-5` | Orange ramp | Orange ramp           | Charts, in order                                   |

Rules:

- **Orange is for action and state.** The primary button, the focused field,
  the checked checkbox, the active page link, a progress fill. Never a large
  background, a section fill, or a heading color.
- **One primary button per view or dialog.** Everything else is secondary,
  outline, or ghost.
- **Status colors mean status.** Green, red, and amber only for success,
  error, and warning. Don't use them to decorate.
- **Tint, don't fill.** Status badges and alerts use a 7 to 14% tint of the
  status color with the full color for text or icon, not a solid block.
- **Text is foreground or muted-foreground.** No third gray. No colored body
  text.
- **Dark mode is not optional.** Theme follows the OS by default (`useTheme`
  in `src/theme.ts`); the `.dark` class on `<html>` switches tokens.
- **Charts** use `--chart-1` to `--chart-5` in order. For more than five series,
  group the rest as "Other" or use small multiples.

## Typography

Inter Variable, self-hosted (`@fontsource-variable/inter`). Monospace is the
system stack (`ui-monospace, SFMono-Regular, Consolas, monospace`) for code,
IDs, and keyboard shortcuts. Don't load other fonts.

| Role                   | Size                    | Weight     | Line height | Tracking | Use                                                     |
| ---------------------- | ----------------------- | ---------- | ----------- | -------- | ------------------------------------------------------- |
| Page title             | 44px (34px under 720px) | 600        | 1.05        | -0.035em | One per page, the `h1`                                  |
| Section title          | 18px                    | 600        | 1.3         | -0.02em  | Groups inside a page                                    |
| Dialog and sheet title | 17px                    | 600        | 1.3         | -0.02em  | Overlay headings                                        |
| Card title             | 14 to 15px              | 600        | 1.35        | -0.01em  | Card and list-item headings                             |
| Lead paragraph         | 15px (14px on mobile)   | 400        | 1.6         | 0        | Optional single sentence under a page title             |
| UI text                | 13px                    | 400 to 500 | 1.4         | 0        | Buttons, fields, menus, tables, body copy in components |
| Small                  | 12px                    | 400        | 1.45        | 0        | Descriptions, helper text, metadata, toasts             |
| Caption                | 11px                    | 500        | 1.3         | 0        | Badges, table footnotes. Nothing smaller than 11px.     |

Rules:

- **Two weights do most of the work:** 400 for text, 500 for labels and
  controls, 600 for titles. Don't use 700 or heavier.
- **Hierarchy comes from size and weight, then color.** Secondary text uses
  `--muted-foreground`, not a smaller size alone.
- **Numbers that change or line up use tabular figures**
  (`font-variant-numeric: tabular-nums`), for example counts, prices, and
  table columns.
- **Keep line length under about 70 characters** for paragraphs
  (`max-width: 620px` or so).
- **No all-caps headings.** Uppercase is acceptable only for very short
  labels like "UTC", and never with letter-spacing tricks.
- **On touch screens**, field text is 16px and labels are 15px (handled by
  the field tokens). Don't hardcode smaller sizes on inputs.

## Spacing and layout

Spacing is on a 4px grid. Use these steps: 4, 8, 12, 16, 20, 24, 32, 40, 56.

| Thing                        | Desktop    | Tablet (under 1120px) | Phone (under 720px)     |
| ---------------------------- | ---------- | --------------------- | ----------------------- |
| Content max width            | 1320px     | 1320px                | full                    |
| Page side padding            | 40px       | 28px                  | 16px                    |
| Header height                | 68px       | 68px                  | auto, 16px side padding |
| Space below page title block | 36px       | 36px                  | 20px                    |
| Grid gap between cards       | 20px       | 20px                  | 14px                    |
| Card padding                 | 20 to 24px | 20px                  | 16 to 20px              |
| Gap between form fields      | 16px       | 16px                  | 16px                    |
| Gap between label and field  | 8px        | 8px                   | 8px                     |
| Gap between sections         | 56px       | 48px                  | 40px                    |

Rules:

- **Grids:** three columns on desktop, two under 1120px, one under 580px.
- **Headers are sticky** and blur the content behind them once the page
  scrolls. Keep them to navigation and a few icon controls.
- **Don't nest cards inside cards.** Use a divider or spacing to group inside
  a card.
- **Align to one left edge.** Labels, fields, and headings in a column share
  the same x position.
- **Leave space empty.** Don't fill whitespace with illustrations, stats, or
  "tips".

## Radius and elevation

| Radius            | Used by                                                           |
| ----------------- | ----------------------------------------------------------------- |
| 6px               | Checkbox                                                          |
| 8px               | Tooltip                                                           |
| 10px              | Menu items, toast icon chip                                       |
| 12px (14px touch) | Text fields, select, combobox trigger, OTP slots                  |
| 14px              | Alerts                                                            |
| 16px              | Popovers, menus, command palette, toasts, scroll areas            |
| 20px              | Cards                                                             |
| 24px              | Dialogs, large panels                                             |
| Full (999px)      | Buttons, badges, tabs, switches, segmented controls, search field |

Nested corners get smaller: an inner element's radius is the outer radius
minus the padding between them.

Elevation has four levels. Use the shadow token, never a custom shadow:

| Level    | Token                     | For                                                |
| -------- | ------------------------- | -------------------------------------------------- |
| Flat     | `1px solid var(--border)` | Page sections, table rows                          |
| Resting  | `--card-shadow`           | Cards on the page                                  |
| Raised   | `--material-shadow`       | Buttons, fields, segmented controls, tab indicator |
| Floating | `--overlay-shadow`        | Menus, popovers, dialogs, sheets, toasts           |

## Motion

Tokens in `tokens.css`: `--duration-micro` 100ms, `--duration-quick` 150ms,
`--duration-fast` 200ms, `--duration-medium` 250ms, `--ease-out`
`cubic-bezier(0.23, 1, 0.32, 1)`, `--ease-in-out`
`cubic-bezier(0.77, 0, 0.175, 1)`, `--ease-drawer`
`cubic-bezier(0.32, 0.72, 0, 1)`.

| Interaction               | Duration                         | Easing       | What moves                                             |
| ------------------------- | -------------------------------- | ------------ | ------------------------------------------------------ |
| Button press              | 160ms                            | ease-out     | `scale(0.97)`                                          |
| Hover color change        | 150ms                            | ease         | Color only                                             |
| Tooltip (first open only) | 125ms                            | ease-out     | Fade + `scale(0.96)` from the trigger                  |
| Menu, popover, select     | 200ms                            | ease-out     | Fade + 6px slide from the trigger side + `scale(0.97)` |
| Dialog                    | 300ms in, 150ms out              | ease-out     | Fade + 8px rise + `scale(0.96)`                        |
| Sheet and drawer          | 400ms in, 250ms out              | drawer curve | Slide from the edge                                    |
| Toggle, switch, checkbox  | 150 to 200ms                     | ease-out     | Thumb or check only                                    |
| List entrance             | 300ms, 30ms stagger, max 8 items | ease-out     | Fade + 12px rise                                       |
| Tab or segment indicator  | Spring, no bounce, about 300ms   | spring       | Position                                               |

Rules:

- **Don't animate things people do many times a minute** (typing, keyboard
  shortcuts, opening the command palette, switching rows with arrow keys).
- **Never `ease-in` for UI**, never animate from `scale(0)`, never animate
  width, height, top, or left. Animate `transform` and `opacity`.
- **Keep UI motion under 300ms.** Only sheets and drawers go longer.
- **Menus grow from their trigger**, not from the center. Dialogs stay
  centered.
- **Hover motion only on real pointers:** wrap it in
  `@media (hover: hover) and (pointer: fine)`.
- **Respect reduced motion.** `MotionProvider` in `src/motion.tsx` and the
  rules at the end of `materials.css` already do this. Keep fades, drop
  movement.
- **No looping animation** except loading indicators (spinner, skeleton
  shimmer, progress sheen). No pulsing dots, floating shapes, or animated
  gradients.

## Mobile and touch

Design for 390px wide first, then check 1440px.

- **Fields:** 46px tall with 16px text on touch screens. This stops iOS from
  zooming when a field is focused. The field tokens handle it; never set an
  input's font size below 16px on touch.
- **Buttons:** 42px tall on touch (34px for small, 40px icon buttons). Tap
  targets are at least 40px in both directions.
- **Never disable zoom** with `maximum-scale` or `user-scalable=no`.
- **Overlays:** on phones, use a bottom `Drawer` instead of a centered
  `Dialog` for forms or anything taller than half the screen. Side `Sheet`s
  become full-width.
- **Toasts** sit at the bottom, full width with 16px side margins, and the
  close button is always visible.
- **No hover-only information.** `HoverCard` and `Tooltip` content must also
  be reachable another way (visible text, a tap target, or a details view).
- **One column** under 580px. Filters and chip rows may scroll sideways; the
  page never scrolls sideways.
- **Keep the sticky header short** so content stays visible.

## Choosing components

Pick with these rules before reaching for anything custom.

### Actions

| Need                                  | Use                                                                            |
| ------------------------------------- | ------------------------------------------------------------------------------ |
| The main thing to do on this view     | `Button` (default variant). One per view.                                      |
| Other actions                         | `Button` `secondary` or `outline`                                              |
| Low-emphasis or toolbar actions       | `Button` `ghost`                                                               |
| Icon-only actions                     | `Button size="icon"` with `aria-label` and a `Tooltip`                         |
| Deleting or other destructive actions | `Button variant="destructive"`. Add a confirmation only if it can't be undone. |
| Inline navigation in text             | `Button variant="link"` or a plain link                                        |
| On/off formatting or view options     | `Toggle` or `ToggleGroup`                                                      |

### Inputs

| Need                                                           | Use                                                                                         |
| -------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| Short text                                                     | `Input` with a `Label`                                                                      |
| Long text                                                      | `Textarea`                                                                                  |
| One choice from up to 5, all worth seeing                      | `RadioGroup`                                                                                |
| One choice from 6 to about 15                                  | `Select`                                                                                    |
| One choice from a long or searchable list                      | Combobox (`Popover` + `Command`)                                                            |
| On/off that applies immediately                                | `Switch`                                                                                    |
| On/off that is submitted with a form, or agreeing to something | `Checkbox`                                                                                  |
| Approximate number in a range                                  | `Slider`, always with the value shown                                                       |
| A date                                                         | Date picker (`Popover` + `Calendar`); `Calendar` inline only when the date is the main task |
| Verification codes                                             | `InputOTP`                                                                                  |

### Overlays

| Need                                                              | Use                                                                      |
| ----------------------------------------------------------------- | ------------------------------------------------------------------------ |
| A short, focused task that blocks the page (up to about 5 fields) | `Dialog`                                                                 |
| Confirming something irreversible                                 | `AlertDialog`. The confirm button repeats the action ("Delete project"). |
| Editing details or settings while keeping the page in view        | `Sheet` (right side)                                                     |
| Any of the above on a phone                                       | `Drawer` (bottom)                                                        |
| A few options tied to a button                                    | `DropdownMenu`                                                           |
| A small form or settings tied to a control                        | `Popover`                                                                |
| Naming an icon-only button                                        | `Tooltip`                                                                |
| Previewing a linked person or object                              | `HoverCard` (never the only place the info lives)                        |
| Shortcut actions on an item                                       | `ContextMenu`, always duplicated in a visible menu                       |
| Searching and running commands                                    | `Command` in a `Dialog`, opened with Cmd/Ctrl+K                          |

### Feedback

| Need                                                               | Use                                                                |
| ------------------------------------------------------------------ | ------------------------------------------------------------------ |
| Result of something the user just did                              | Toast (`toast.success`, `toast.error`)                             |
| An action that can be reversed                                     | Toast with an "Undo" action instead of a confirmation dialog       |
| Waiting on a request the user started                              | `toast.promise` or a spinner inside the button that started it     |
| A problem the user must fix, or information that must stay visible | `Alert` in the page                                                |
| An invalid field                                                   | `aria-invalid` on the field and 12px text under it. Never a toast. |
| Loading content for the first time                                 | `Skeleton` shaped like the content                                 |
| Known progress                                                     | `Progress` with the value shown                                    |
| Nothing to show yet                                                | Empty state (see below)                                            |

### Showing data

| Need                                        | Use                                                             |
| ------------------------------------------- | --------------------------------------------------------------- |
| Comparing many items across the same fields | `Table`                                                         |
| One object with its details and actions     | `Card`                                                          |
| Status of an item                           | `Badge` with a static dot. One badge per row is usually enough. |
| A person                                    | `Avatar` with initials fallback                                 |
| Switching between views of the same thing   | `Tabs`                                                          |
| Showing and hiding secondary detail         | `Accordion` (several sections) or `Collapsible` (one)           |
| Many pages of results                       | `Pagination`                                                    |
| Where the user is in a hierarchy            | `Breadcrumb`, only when there are 3+ levels                     |

## Component notes

**Button.** Sizes: default 36px, `sm` 30px, `icon` 36px (touch sizes above).
Put an icon before the label for actions (`<Plus /> New project`) and after it
only for direction (`Continue <ArrowRight />`). While a request runs, disable
the button, show `<Loader2 className="animate-spin" />`, and keep the label.

**Fields.** Every field has a visible `Label` above it. Placeholder text shows
an example ("you@example.com"), never the label. Leading icons use the
`.input-icon` pattern with `pl-9`. Helper and error text is 12px, 8px below the
field.

**Forms.** One column. Primary action at the bottom, left-aligned in pages and
right-aligned in dialog footers, with Cancel to its left. Validate on submit
and on blur, not on every keystroke.

**Toast.** Title is 2 to 4 words in sentence case with no final period ("Changes
saved"). Add a description only if it says something new. Success and error
toasts dismiss on their own; errors that need action go in an `Alert`
instead. Mount one `<Toaster position="bottom-right" closeButton />`.

**Dialog.** Title states the task ("Edit profile"). Description is optional and
one sentence. Footer: secondary button, then primary. Escape and the close
button always work.

**AlertDialog.** Title is the question ("Delete this project?"). Description is
the consequence. The confirm button names the action, and it's destructive
only when the action is.

**Sheet and Drawer.** Title, optional description, content, then a footer with
the primary action. Sheets float with a 10px inset and 22px radius.

**Badge.** Variants: default (orange tint), secondary, outline, destructive.
Status dots are 6px and never pulse.

**Table.** Headers are 12px muted, sentence case. Numbers right-aligned with
tabular figures. Row hover is a subtle fill. Put row actions in a ghost icon
button with a `DropdownMenu` at the end of the row.

**Empty state.** A 48px icon chip (surface background, raised shadow), a
16px title ("No invoices yet"), one 13px sentence, and one button. Centered in
the space the content would fill.

**Tabs and segmented controls.** Pill container on `--secondary`, active
segment on `--surface` with the raised shadow. Up to 5 options; beyond that,
use a `Select`.

**Icons.** `lucide-react` only. 16px in buttons and menus, 15px in fields
(18px on touch), 20px in empty states, default stroke. Icons sit in
`--muted-foreground` unless they carry status.

**Special.** The glowing and animated components (border beam, metal, thinking
orb, gooey, voice, bot avatar) are in the Special category. Use them only
when the person explicitly asks for that effect, and never on regular inputs,
buttons, or cards.

## Accessibility

- Text meets WCAG AA contrast in light and dark. The gallery is checked with
  axe in CI. Don't lighten text below `--muted-foreground`.
- Every interactive element is reachable by keyboard and shows a 2px focus
  ring in `--ring`.
- Every field has a label. Icon-only buttons have an `aria-label`.
- Don't rely on color alone. Errors have text, status badges have a word.
- Respect `prefers-reduced-motion` and the OS color scheme.

## Before you hand it back

Check the result against this list:

- [ ] Only tokens from `tokens.css`; no new colors, fonts, or shadows.
- [ ] One primary button per view.
- [ ] No taglines, footers, credits, status lights, emoji, or invented numbers.
- [ ] Headings and buttons in sentence case; buttons start with a verb.
- [ ] Works at 390px: no sideways scroll, 16px field text, 40px+ tap targets.
- [ ] Works in dark mode.
- [ ] Every action works with the keyboard; focus is visible.
- [ ] Motion stays under 300ms (sheets 400ms), nothing loops except loaders.
- [ ] Empty, loading, and error states exist for anything that fetches data.

## Development

Requires Node.js 22.12+ and npm.

```sh
npm ci
npm run dev
```

The gallery (`src/App.tsx`) shows every component in light and dark with
realistic content. Component examples live in `src/demos.tsx` and
`src/effect-demos.tsx`; the gallery shell styles are in `src/App.css`.

To add a component, create it in `src/components/ui/`, style it through its
`data-slot` in `materials.css` using tokens, register an example in
`src/demos.tsx`, and document it here. Overwriting existing components with
generated code replaces local styling and behavior, so review those changes
before accepting them.

```sh
npm run lint
npm run format:check
npm run build
npx playwright install chromium firefox
npm test
```

Tests run against the production build in Firefox, Chromium, and a narrow
viewport. They cover filtering, themes, forms, overlays, keyboard focus,
effect controls, reduced motion, and automated accessibility checks. CI runs
them on every push.

### Deploying

`vercel.json` configures Vite, `npm run build`, the `dist` output, and SPA
fallback. Use the repository root and Node.js 22.x. No environment variables
or backend services are required.
