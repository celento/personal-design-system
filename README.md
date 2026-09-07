# Hearth UI

A dependency-free design system for polished static websites and small web products. It uses semantic HTML, one CSS file, and predictable class names—no build step, package manager, JavaScript framework, utility compiler, or runtime dependency.

Open [`showcase.html`](showcase.html) to see every component together.

## Quick start

Copy `styles.css` into a project and link it from the document head:

```html
<link rel="stylesheet" href="styles.css">
```

Then compose a base component class and, when needed, one variant:

```html
<button class="btn">Save changes</button>
<button class="btn btn--outline">Cancel</button>
```

The naming system is intentionally regular:

- `.component` is the required base class, such as `.btn`.
- `.component__part` is a structural child, such as `.card__header`.
- `.component--variant` changes appearance or size, such as `.btn--destructive`.
- Small utilities such as `.stack`, `.text-muted`, and `.w-full` handle common layout needs.

## Design principles

1. **Start with semantic HTML.** Use `button`, `a`, `label`, `table`, `details`, and `dialog` for their intended purpose.
2. **Compose instead of duplicating.** Never recreate button, card, or form styles in page-specific CSS.
3. **Use semantic tokens.** Components consume `--primary`, `--border`, and similar variables, not one-off color values.
4. **Keep variants meaningful.** Primary means the main action; destructive means irreversible or dangerous.
5. **Preserve accessibility.** Labels, focus indicators, native keyboard behavior, and reduced-motion preferences are built in.
6. **Design mobile-first.** Grids collapse, dialogs stack actions, and wide tables and tabs scroll safely.

## Foundations

### Color tokens

Override variables in `:root` to rebrand the entire system:

| Token | Purpose |
| --- | --- |
| `--background` / `--foreground` | Page surface and default text |
| `--card` / `--card-foreground` | Raised content surfaces |
| `--popover` / `--popover-foreground` | Menus, tooltips, and temporary surfaces |
| `--primary` / `--primary-foreground` | Main actions and high-emphasis elements |
| `--secondary` / `--secondary-foreground` | Lower-emphasis controls |
| `--muted` / `--muted-foreground` | Quiet surfaces and supporting text |
| `--accent` / `--accent-foreground` | Hover and selected states |
| `--destructive` / `--destructive-foreground` | Dangerous actions and errors |
| `--success` / `--success-foreground` | Successful and active states |
| `--warning` / `--warning-foreground` | Caution states |
| `--border`, `--input`, `--ring` | Dividers, form outlines, and focus |

Example brand override:

```css
:root {
  --primary: hsl(252 82% 56%);
  --primary-foreground: hsl(0 0% 100%);
  --ring: hsl(252 82% 56%);
  --radius: 0.75rem;
}
```

### Dark theme

Add `data-theme="dark"` to any ancestor, usually `<html>`:

```html
<html lang="en" data-theme="dark">
```

All components inherit the dark semantic tokens. A theme toggle needs a tiny product-specific script if users must switch at runtime; the design system itself remains script-free.

### Typography

System fonts are used by default, so there is no font download. Override `--font-sans` or `--font-mono` if the project already loads a typeface. Heading sizes are fluid, and body copy uses muted text by default.

### Layout primitives

```html
<div class="container">Centered content with a readable maximum width</div>

<div class="stack" style="--stack-gap: 1.5rem">
  <div>Vertical item</div>
  <div>Vertical item</div>
</div>

<div class="cluster justify-between">
  <span>Flexible row</span>
  <button class="btn">Action</button>
</div>

<div class="grid grid--3">
  <article class="card">...</article>
  <article class="card">...</article>
  <article class="card">...</article>
</div>
```

- `.container` centers content and caps it at `--content-width`.
- `.stack` creates a vertical flex layout. Change spacing with `--stack-gap`.
- `.cluster` creates a wrapping horizontal flex layout. Change spacing with `--cluster-gap`.
- `.grid` starts as one column. Add `.grid--2`, `.grid--3`, or `.grid--4` for responsive columns.
- `.sidebar-layout` creates a sidebar/content layout and collapses on smaller screens.
- `.divider` styles an `<hr>`.

## Components

### Buttons

Use a `<button>` for an action and `<a>` for navigation.

```html
<button class="btn">Primary</button>
<button class="btn btn--secondary">Secondary</button>
<button class="btn btn--outline">Outline</button>
<button class="btn btn--ghost">Ghost</button>
<button class="btn btn--destructive">Delete</button>
<button class="btn btn--link">Learn more</button>

<button class="btn btn--sm">Small</button>
<button class="btn btn--lg">Large</button>
<button class="btn btn--icon" aria-label="Add item">+</button>
```

Available classes:

- Base: `.btn`
- Appearance: `.btn--secondary`, `.btn--outline`, `.btn--ghost`, `.btn--destructive`, `.btn--link`
- Size: `.btn--sm`, `.btn--lg`, `.btn--icon`

Icon-only buttons require an accessible name with `aria-label`. Use `.icon` on inline SVG icons. Native `disabled` and `aria-disabled="true"` states are supported.

### Badges

```html
<span class="badge">Default</span>
<span class="badge badge--secondary">Draft</span>
<span class="badge badge--outline">Offline</span>
<span class="badge badge--success">Active</span>
<span class="badge badge--destructive">Blocked</span>
```

Badges describe state; they are not interactive controls.

### Cards

```html
<article class="card">
  <header class="card__header">
    <h3 class="card__title">Project name</h3>
    <p class="card__description">Supporting information.</p>
  </header>
  <div class="card__content">
    Main content
  </div>
  <footer class="card__footer">
    <button class="btn">Continue</button>
  </footer>
</article>
```

Omit any section that is not needed. Do not nest cards merely to create spacing; use `.stack` or `.grid`.

### Form fields

Every input must have a visible label unless the surrounding interface provides an unambiguous accessible name.

```html
<label class="field">
  <span class="label">Email</span>
  <input class="input" type="email" placeholder="you@example.com">
  <span class="field__hint">We never share your address.</span>
</label>
```

Error state:

```html
<label class="field">
  <span class="label">Email</span>
  <input
    class="input"
    type="email"
    aria-invalid="true"
    aria-describedby="email-error"
  >
  <span class="field__error" id="email-error">Enter a valid email.</span>
</label>
```

Select and textarea:

```html
<label class="field">
  <span class="label">Role</span>
  <select class="select">
    <option>Designer</option>
    <option>Developer</option>
  </select>
</label>

<label class="field">
  <span class="label">Message</span>
  <textarea class="textarea" placeholder="Write a message"></textarea>
</label>
```

Input group:

```html
<div class="input-group">
  <span class="btn btn--outline" aria-hidden="true">https://</span>
  <label class="sr-only" for="site-domain">Domain</label>
  <input class="input" id="site-domain" placeholder="example.com">
  <button class="btn">Save</button>
</div>
```

### Checkbox, radio, and switch

```html
<label class="check">
  <input type="checkbox" checked>
  <span>Remember me</span>
</label>

<label class="radio">
  <input type="radio" name="billing" checked>
  <span>Monthly</span>
</label>

<label class="switch">
  <input type="checkbox" checked>
  <span class="switch__track" aria-hidden="true"></span>
  <span>Email alerts</span>
</label>
```

Keep related radio buttons under the same `name`. Use a `<fieldset>` and `<legend>` for a group that needs a shared label.

### Alerts

```html
<div class="alert" role="status">
  <svg class="icon" aria-hidden="true">...</svg>
  <div>
    <div class="alert__title">Heads up</div>
    <p class="alert__description">Supporting detail.</p>
  </div>
</div>
```

Add `.alert--success` for confirmation or `.alert--destructive` for failure. Use `role="status"` for informational updates and `role="alert"` only when immediate announcement is warranted.

### Avatars

```html
<span class="avatar"><img src="person.jpg" alt="Ada Lovelace"></span>
<span class="avatar">AL</span>

<div class="avatar-group" aria-label="Project members">
  <span class="avatar">AL</span>
  <span class="avatar">GH</span>
</div>
```

Sizes are `.avatar--sm` and `.avatar--lg`. Initials are the fallback when an image is unavailable.

### Tabs

For navigation, use links and `aria-current`. For a dynamic tab interface, preserve the same classes but implement the standard keyboard behavior in project JavaScript.

```html
<nav class="tabs" aria-label="Account sections">
  <div class="tabs__list">
    <a class="tabs__tab" href="/overview" aria-current="page">Overview</a>
    <a class="tabs__tab" href="/billing">Billing</a>
  </div>
</nav>
```

The container scrolls horizontally on narrow screens.

### Table

```html
<div class="table-wrap">
  <table class="table">
    <thead>
      <tr><th>Name</th><th>Status</th></tr>
    </thead>
    <tbody>
      <tr><td>Launch</td><td><span class="badge">Active</span></td></tr>
    </tbody>
  </table>
</div>
```

Always preserve table semantics. `.table-wrap` gives wide tables horizontal scrolling without breaking the page.

### Accordion

Native `<details>` elements provide disclosure behavior without JavaScript:

```html
<div class="accordion">
  <details>
    <summary>What is included?</summary>
    <p class="accordion__content">Everything needed to begin.</p>
  </details>
</div>
```

Add `open` to show an item initially.

### Breadcrumb

```html
<nav aria-label="Breadcrumb">
  <ol class="breadcrumb">
    <li><a href="/">Home</a></li>
    <li><span aria-current="page">Settings</span></li>
  </ol>
</nav>
```

### Pagination

```html
<nav aria-label="Pagination">
  <ul class="pagination">
    <li><a href="?page=1" aria-label="Previous page">←</a></li>
    <li><span aria-current="page">2</span></li>
    <li><a href="?page=3" aria-label="Next page">→</a></li>
  </ul>
</nav>
```

### Progress

```html
<div
  class="progress"
  role="progressbar"
  aria-label="Upload progress"
  aria-valuenow="68"
  aria-valuemin="0"
  aria-valuemax="100"
>
  <div class="progress__bar" style="width: 68%"></div>
</div>
```

Keep visual width and `aria-valuenow` synchronized.

### Dropdown menu

The native disclosure version works without JavaScript:

```html
<details class="dropdown">
  <summary class="btn btn--outline">Open menu</summary>
  <div class="dropdown__menu">
    <div class="dropdown__label">Account</div>
    <hr class="dropdown__separator">
    <a class="dropdown__item" href="/profile">Profile</a>
    <button class="dropdown__item dropdown__item--destructive">Log out</button>
  </div>
</details>
```

Use this for simple menus. Complex application menus need project JavaScript for arrow-key navigation, focus management, and closing on outside click.

### Dialog

The styles target the native `<dialog>` element:

```html
<dialog class="dialog" id="confirm-dialog">
  <header class="dialog__header">
    <h3>Delete project?</h3>
  </header>
  <div class="dialog__body">
    <p>This cannot be undone.</p>
  </div>
  <footer class="dialog__footer">
    <button class="btn btn--outline">Cancel</button>
    <button class="btn btn--destructive">Delete</button>
  </footer>
</dialog>
```

Opening a modal requires calling `showModal()` from product code. Closing, focus restoration, and form submission behavior belong to that product logic.

### Tooltip and keyboard key

```html
<span class="tooltip">
  <button class="btn btn--icon" aria-describedby="save-tip">?</button>
  <span class="tooltip__content" id="save-tip" role="tooltip">Save changes</span>
</span>

<kbd class="kbd">⌘</kbd> <kbd class="kbd">S</kbd>
```

Tooltips appear on hover and keyboard focus. Never place essential information only in a tooltip.

### Toast

```html
<div class="toast" role="status">
  <div>
    <div class="toast__title">Saved</div>
    <p class="toast__description">Your changes are live.</p>
  </div>
  <button class="btn btn--ghost btn--sm">Undo</button>
</div>
```

Positioning and lifecycle are product concerns; `.toast` defines the visual surface only.

### Skeleton and empty state

```html
<div class="skeleton" style="width: 60%; height: 1rem"></div>

<div class="empty-state">
  <div class="stack">
    <div class="empty-state__icon">+</div>
    <h3>No projects yet</h3>
    <p>Create your first project.</p>
    <button class="btn">Create project</button>
  </div>
</div>
```

Skeletons should roughly match the eventual content dimensions. Respect for `prefers-reduced-motion` is built in.

### Navigation bar

```html
<header class="nav">
  <div class="container nav__inner">
    <a class="nav__brand" href="/">Product</a>
    <nav class="nav__links" aria-label="Main navigation">
      <a href="/features">Features</a>
      <a href="/pricing">Pricing</a>
    </nav>
    <a class="btn btn--sm" href="/start">Get started</a>
  </div>
</header>
```

`.nav__links` hides below 48rem. For a production mobile menu, add a separate `<details>` menu or project-specific disclosure control.

## Utility reference

Utilities are intentionally limited:

| Class | Effect |
| --- | --- |
| `.sr-only` | Visually hide content while keeping it accessible |
| `.text-muted`, `.text-destructive`, `.text-success` | Semantic text colors |
| `.text-sm`, `.text-xs` | Smaller text sizes |
| `.font-medium`, `.font-mono` | Font weight or family |
| `.w-full` | Full width |
| `.justify-between`, `.justify-end` | Flex alignment |
| `.items-start` | Cross-axis alignment |
| `.shadow-md` | Elevated shadow |

If a page needs many custom utilities, write a page-level component class instead of expanding this into a general utility framework.

## Accessibility checklist

- Use native elements before generic `<div>` elements.
- Give every form control a label.
- Give icon-only buttons an `aria-label`.
- Use `aria-current="page"` for the active navigation destination.
- Connect errors and hints with `aria-describedby` when they provide necessary context.
- Keep focus indicators visible; never remove outlines without an equivalent replacement.
- Use `role="status"` for polite updates and reserve `role="alert"` for urgent failures.
- Keep all text and controls usable at 200% zoom.
- Test keyboard navigation and a narrow viewport before shipping.
- Keep touch targets near the default 2.5rem button height or larger.

## Browser support

The stylesheet targets current evergreen browsers. It uses CSS layers, custom properties, `color-mix()`, grid, flexbox, and native `<dialog>`. If an older browser is a requirement, verify those features against the project support matrix.

## File map

- `styles.css` — the complete production stylesheet.
- `showcase.html` — visual reference and manual test page.
- `README.md` — human-facing component documentation.
- `AGENTS.md` — concise implementation rules for coding agents.

There is no generated output and no installation step. Serve the directory with any static server or open `showcase.html` directly.