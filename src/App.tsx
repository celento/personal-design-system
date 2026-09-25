import { useEffect, useRef, useState } from 'react'
import {
  ArrowDown,
  ArrowUpRight,
  Circle,
  Component,
  Code2,
  Grid2X2,
  Layers2,
  Menu,
  Monitor,
  Moon,
  Search,
  Sun,
  X,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  TooltipProvider,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Toaster } from '@/components/ui/sonner'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { categories, specimens, slug, type Category } from './demos'
import { useTheme } from './theme'
import './App.css'

function App() {
  const [theme, setTheme] = useTheme()
  const [category, setCategory] = useState<Category>('All components')
  const [query, setQuery] = useState('')
  const [tab, setTab] = useState<'components' | 'foundations'>('components')
  const [mobileOpen, setMobileOpen] = useState(false)
  const searchRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        searchRef.current?.focus()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])
  const visible = specimens.filter(
    (s) =>
      (category === 'All components' || s.category === category) &&
      `${s.name} ${s.detail} ${s.category}`
        .toLowerCase()
        .includes(query.toLowerCase()),
  )
  const navigate = (cat: Category) => {
    setCategory(cat)
    setTab('components')
    setQuery('')
    setMobileOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  const nav = (
    <>
      <button
        className={`nav-item ${tab === 'components' && category === 'All components' ? 'active' : ''}`}
        onClick={() => navigate('All components')}
      >
        <Grid2X2 size={16} />
        All components<span>{specimens.length}</span>
      </button>
      <button
        className={`nav-item ${tab === 'foundations' ? 'active' : ''}`}
        onClick={() => {
          setTab('foundations')
          setMobileOpen(false)
        }}
      >
        <Layers2 size={16} />
        Foundations<span>04</span>
      </button>
      <div className="nav-divider" />
      {categories.slice(1).map((c) => (
        <button
          key={c}
          className={`nav-item ${tab === 'components' && category === c ? 'active' : ''}`}
          onClick={() => navigate(c)}
        >
          <Circle size={6} />
          {c}
          <span>
            {String(specimens.filter((s) => s.category === c).length).padStart(
              2,
              '0',
            )}
          </span>
        </button>
      ))}
    </>
  )
  return (
    <TooltipProvider delayDuration={200}>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <div className="app-shell" id="top">
        <aside className="sidebar">
          <a
            className="brand"
            href="#top"
            onClick={() => navigate('All components')}
          >
            <span className="brand-mark">
              p<span>·</span>
            </span>
            <div>personal</div>
          </a>
          <nav aria-label="Component categories">{nav}</nav>
        </aside>
        <div className="workspace">
          <header className="topbar">
            <div className="flex items-center gap-3">
              <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="mobile-menu"
                    aria-label="Open navigation"
                  >
                    <Menu />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="mobile-nav">
                  <SheetHeader>
                    <SheetTitle>Personal</SheetTitle>
                  </SheetHeader>
                  <nav aria-label="Mobile categories">{nav}</nav>
                </SheetContent>
              </Sheet>
              <span>
                personal / {tab === 'components' ? 'Components' : 'Foundations'}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <div
                className="theme-switch"
                role="group"
                aria-label="Color theme"
              >
                {(
                  [
                    { value: 'light', Icon: Sun },
                    { value: 'system', Icon: Monitor },
                    { value: 'dark', Icon: Moon },
                  ] as const
                ).map(({ value, Icon }) => (
                  <Tooltip key={value}>
                    <TooltipTrigger asChild>
                      <button
                        aria-label={`${value[0].toUpperCase() + value.slice(1)} theme`}
                        aria-pressed={theme === value}
                        onClick={() => setTheme(value)}
                      >
                        <Icon size={15} />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      {value[0].toUpperCase() + value.slice(1)}
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>
              <a
                className="github-link"
                href="https://github.com/celento/personal-design-system"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub repository"
              >
                <Code2 size={18} />
              </a>
            </div>
          </header>
          <main id="main">
            <div className="page-heading">
              <div>
                <h1>{tab === 'components' ? 'Components' : 'Foundations'}</h1>
              </div>
            </div>
            <div className="view-tabs">
              <button
                className={tab === 'components' ? 'selected' : ''}
                onClick={() => setTab('components')}
              >
                <Component size={15} />
                Components<span>{specimens.length}</span>
              </button>
              <button
                className={tab === 'foundations' ? 'selected' : ''}
                onClick={() => setTab('foundations')}
              >
                <Layers2 size={15} />
                Foundations
              </button>
            </div>
            {tab === 'components' ? (
              <>
                <div className="gallery-toolbar" id="components">
                  <div className="filter-title">
                    <h2>{category === 'All components' ? 'All' : category}</h2>
                    <span>{visible.length}</span>
                  </div>
                  <div className="component-search">
                    <Search size={15} />
                    <Input
                      ref={searchRef}
                      aria-label="Search components"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Search components…"
                    />
                    {query ? (
                      <button
                        aria-label="Clear search"
                        onClick={() => setQuery('')}
                      >
                        <X size={14} />
                      </button>
                    ) : (
                      <kbd>⌘ K</kbd>
                    )}
                  </div>
                </div>
                <div className="mobile-category-filter">
                  <label htmlFor="category-filter">Category</label>
                  <select
                    id="category-filter"
                    value={category}
                    onChange={(e) => setCategory(e.target.value as Category)}
                  >
                    {categories.map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div className="specimen-grid">
                  {visible.map((s) => (
                    <section
                      id={slug(s.name)}
                      key={s.name}
                      className={`specimen ${s.wide ? 'specimen-wide' : ''}`}
                    >
                      <div className="specimen-header">
                        <div>
                          <h3>{s.name}</h3>
                        </div>
                        <a
                          href={`https://ui.shadcn.com/docs/components/${s.name === 'Switch & Checkbox' ? 'switch' : s.name === 'Toggle & Toggle Group' ? 'toggle-group' : s.name === 'Form' ? 'input' : slug(s.name)}`}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`${s.name} documentation`}
                        >
                          <ArrowUpRight size={15} />
                        </a>
                      </div>
                      <div className="specimen-stage">{s.render()}</div>
                    </section>
                  ))}
                </div>
                {visible.length === 0 && (
                  <div className="empty-state">
                    <Search size={24} />
                    <h2>No components found</h2>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setQuery('')
                        setCategory('All components')
                      }}
                    >
                      Clear filters
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div className="foundations">
                <section>
                  <div className="foundation-title">
                    <h2>Color</h2>
                    <span>01</span>
                  </div>
                  <div className="color-grid">
                    {[
                      'background',
                      'foreground',
                      'primary',
                      'secondary',
                      'muted',
                      'accent',
                      'border',
                      'destructive',
                    ].map((c) => (
                      <div className="color-token" key={c}>
                        <div style={{ background: `var(--${c})` }} />
                        <span>{c}</span>
                        <code>--{c}</code>
                      </div>
                    ))}
                  </div>
                </section>
                <section>
                  <div className="foundation-title">
                    <h2>Typography</h2>
                    <span>02</span>
                  </div>
                  <div className="type-sample">
                    <p className="text-5xl tracking-tight">Inter</p>
                    <span className="mono">
                      Aa Bb Cc Dd Ee Ff Gg 0123456789
                    </span>
                  </div>
                  {[
                    { label: 'Heading', size: 32 },
                    { label: 'Title', size: 24 },
                    { label: 'Body', size: 14 },
                    { label: 'Label', size: 12 },
                  ].map((t) => (
                    <div className="type-row" key={t.label}>
                      <span>{t.label}</span>
                      <p style={{ fontSize: t.size }}>The quick brown fox</p>
                      <code>{t.size}px</code>
                    </div>
                  ))}
                </section>
                <div className="foundation-pair">
                  <section>
                    <div className="foundation-title">
                      <h2>Spacing</h2>
                      <span>03</span>
                    </div>
                    {[4, 8, 12, 16, 24, 32, 48, 64].map((n) => (
                      <div className="spacing-row" key={n}>
                        <code>{n.toString().padStart(2, '0')}</code>
                        <div style={{ width: n * 3 }} />
                      </div>
                    ))}
                  </section>
                  <section>
                    <div className="foundation-title">
                      <h2>Radius</h2>
                      <span>04</span>
                    </div>
                    <div className="radius-grid">
                      {[0, 4, 8, 12, 16, 999].map((n) => (
                        <div key={n}>
                          <div style={{ borderRadius: n }} />
                          <code>{n === 999 ? 'Full' : n + 'px'}</code>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>
              </div>
            )}
            <footer className="page-footer">
              <a href="#top">
                Back to top <ArrowDown className="rotate-180" size={13} />
              </a>
            </footer>
          </main>
        </div>
      </div>
      <Toaster position="bottom-right" closeButton theme={theme} />
    </TooltipProvider>
  )
}
export default App
