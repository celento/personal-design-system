# Hearth UI instructions for coding agents

This repository is the canonical visual language for dependency-free websites. When building or editing a page, reuse `styles.css` and the patterns below. Do not recreate these components with one-off CSS.

## Non-negotiable rules

1. Use plain semantic HTML and CSS.
2. Do not add a UI framework, CSS utility compiler, component runtime, build step, or package dependency.
3. Link `styles.css` once in the page `<head>`.
4. Use existing component classes before writing new CSS.
5. Use semantic color tokens; never copy raw component colors into page CSS.
6. Keep imports and stylesheet links at the top of their file or style block.
7. Preserve native HTML behavior and accessibility.
8. Verify every interface at desktop and mobile widths.

## Decision order

When implementing an interface:

1. Pick the correct semantic element (`button`, `a`, `label`, `table`, `details`, `dialog`).
2. Find the matching class in the quick reference below.
3. Compose it with `.stack`, `.cluster`, `.grid`, or `.container`.
4. Add one documented variant where needed.
5. Add page-specific CSS only for layout that cannot be expressed by existing primitives.
6. If a visual pattern will appear in multiple pages, add a reusable component to `styles.css` and document it in both `README.md` and `showcase.html`.

## Copy-ready page shell

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="Describe this page">
    <title>Page title</title>
    <link rel="stylesheet" href="styles.css">
  </head>
  <body>
    <header class="nav">
      <div class="container nav__inner">
        <a class="nav__brand" href="/">Product</a>
        <nav class="nav__links" aria-label="Main navigation">...</nav>
        <a class="btn btn--sm" href="/start">Get started</a>
      </div>
    </header>
    <main class="container">...</main>
  </body>
</html>
```

## Quick class reference

### Layout

| Need | Use |
| --- | --- |
| Centered max-width page | `.container` |
| Vertical rhythm | `.stack` |
| Wrapping horizontal row | `.cluster` |
| Responsive columns | `.grid .grid--2`, `.grid--3`, or `.grid--4` |
| Sidebar and content | `.sidebar-layout` |
| Horizontal rule | `.divider` |

Customize primitive gaps locally:

```html
<div class="stack" style="--stack-gap: 1.5rem">...</div>
<div class="cluster" style="--cluster-gap: 0.5rem">...</div>
```

### Actions

| Intent | Classes |
| --- | --- |
| Main action | `.btn` |
| Secondary action | `.btn .btn--secondary` |
| Neutral bordered action | `.btn .btn--outline` |
| Quiet action | `.btn .btn--ghost` |
| Dangerous action | `.btn .btn--destructive` |
| Inline link-like action | `.btn .btn--link` |
| Small / large | `.btn--sm` / `.btn--lg` |
| Square icon action | `.btn--icon` plus `aria-label` |

Use `<a class="btn">` when navigating and `<button class="btn">` when performing an action.

### Content

| Need | Use |
| --- | --- |
| Grouped surface | `.card`, `.card__header`, `.card__content`, `.card__footer` |
| Card heading | `.card__title`, `.card__description` |
| Status label | `.badge` with optional semantic variant |
| Person image/initials | `.avatar`; group with `.avatar-group` |
| Loading placeholder | `.skeleton` |
| No-results panel | `.empty-state`, `.empty-state__icon` |
| Completion meter | `.progress`, `.progress__bar` |
| Keyboard shortcut | `.kbd` |

### Forms

| Element | Use |
| --- | --- |
| Field wrapper | `.field` |
| Visible label | `.label` |
| Input | `.input` |
| Select | `.select` |
| Multiline input | `.textarea` |
| Hint / error | `.field__hint` / `.field__error` |
| Joined controls | `.input-group` |
| Checkbox / radio label | `.check` / `.radio` |
| Toggle | `.switch` with `.switch__track` |

For invalid fields, set `aria-invalid="true"` and link `.field__error` with `aria-describedby`.

### Feedback and overlays

| Need | Use |
| --- | --- |
| Neutral notice | `.alert` |
| Success notice | `.alert .alert--success` |
| Error notice | `.alert .alert--destructive` |
| Temporary message surface | `.toast` |
| Native disclosure list | `.accordion` wrapping `<details>` |
| CSS-only menu | `<details class="dropdown">` and `.dropdown__menu` |
| Native modal shell | `.dialog` and structural child classes |
| Supplemental hover/focus label | `.tooltip`, `.tooltip__content` |

### Navigation and data

| Need | Use |
| --- | --- |
| Sticky header | `.nav`, `.nav__inner`, `.nav__brand`, `.nav__links` |
| Section navigation | `.tabs`, `.tabs__list`, `.tabs__tab` |
| Location trail | `.breadcrumb` |
| Page list | `.pagination` |
| Data table | `.table-wrap` around `.table` |

## Visual hierarchy rules

- Each page gets one obvious primary action per region.
- Use outline or ghost buttons for supporting actions.
- Use destructive styling only for actions that delete, revoke, disconnect, or cannot easily be undone.
- Use cards to group related content, not as decoration around every block.
- Keep body copy muted; headings and labels use foreground color.
- Prefer whitespace and borders to large shadows.
- Keep content within `.container`.
- Use a maximum of three columns for substantial cards unless the content is compact.
- Empty states must explain what is missing and offer a next step.
- Errors must say what happened and how to recover.

## Responsive rules

- Start with one column. Add `.grid--2` or `.grid--3`; the stylesheet activates columns from 40rem upward.
- Do not set fixed page widths.
- Put tables inside `.table-wrap`.
- Put tab lists inside `.tabs`.
- Allow `.cluster` to wrap.
- Avoid fixed heights for text containers.
- On small screens, keep at least 1rem page gutters.
- Do not hide required functionality on mobile.
- Dialog actions become full-width automatically below 48rem.

## Accessibility rules

- Every image has meaningful `alt` text or `alt=""` when decorative.
- Every icon-only control has `aria-label`.
- Every input has a `<label>`.
- Every page has one `<main>` and a logical heading order.
- Active navigation uses `aria-current="page"`.
- Progress bars include `role="progressbar"` and numeric ARIA values.
- Decorative SVGs use `aria-hidden="true"`.
- Never put essential information only in a tooltip, color, placeholder, or icon.
- Do not remove built-in focus styles.
- Do not replace a native control with generic elements unless all keyboard and screen-reader behavior is implemented.

## When custom CSS is allowed

Page-specific CSS is appropriate for:

- a unique hero arrangement;
- an illustration;
- a product-specific data visualization;
- a layout that is not repeated elsewhere.

It is not appropriate for:

- alternate buttons, inputs, cards, badges, alerts, tabs, tables, menus, or dialogs;
- raw colors already represented by semantic tokens;
- duplicate spacing utilities;
- hiding focus outlines;
- desktop-only fixed dimensions.

Place local CSS in the page head only for a small standalone page. For a larger site, place it in a separate project stylesheet loaded after `styles.css`.

## Extending the system

New reusable classes must:

1. use the existing tokens;
2. follow the `.component`, `.component__part`, `.component--variant` naming scheme;
3. include hover, focus, disabled, invalid, open, or selected states when relevant;
4. work at 320px wide;
5. respect `prefers-reduced-motion`;
6. appear in `showcase.html`;
7. be documented in `README.md`;
8. avoid requiring JavaScript for visual presentation.

JavaScript may be added by consuming projects for behavior that HTML cannot provide, such as modal orchestration, live tabs, combobox search, or toasts. Keep visual state in existing classes and native attributes where possible.

## Required verification

Before declaring an interface complete:

1. Load the page with no console or asset errors.
2. Check at approximately 1440px desktop width.
3. Check at 375px mobile width.
4. Tab through links, buttons, and form controls.
5. Confirm no horizontal page overflow.
6. Open every `<details>` menu and accordion.
7. Check long labels and validation messages.
8. Confirm visible focus, hover, disabled, and error states.
9. If using dark mode, check the whole page under `data-theme="dark"`.

Use `showcase.html` as the canonical visual reference. `README.md` contains complete copy-ready examples and behavioral guidance.
