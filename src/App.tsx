import { useEffect, useRef, useState } from 'react'
import {
  ArrowUp,
  ArrowUpRight,
  Code2,
  Layers2,
  Monitor,
  Moon,
  Pause,
  Play,
  Search,
  Sun,
  X,
} from 'lucide-react'
import { motion } from 'motion/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  TooltipProvider,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Toaster } from '@/components/ui/sonner'
import { Foundations } from '@/components/foundations'
import { categories, specimens, slug, type Category } from './demos'
import { effectSpecimens } from './effect-demos'
import { useTheme } from './theme'
import { useMotionSettings } from './motion'
import './App.css'
import './components/materials.css'

const allSpecimens = [...effectSpecimens, ...specimens]
function App() {
  const [theme, setTheme] = useTheme()
  const { enabled, reduced, paused, toggle } = useMotionSettings()
  const [category, setCategory] = useState<Category>('All components')
  const [query, setQuery] = useState('')
  const [tab, setTab] = useState<'components' | 'foundations'>('components')
  const searchRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setTab('components')
        requestAnimationFrame(() => searchRef.current?.focus())
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])
  const visible = allSpecimens.filter(
    (s) =>
      (category === 'All components' || s.category === category) &&
      `${s.name} ${s.detail} ${s.category}`
        .toLowerCase()
        .includes(query.toLowerCase()),
  )
  return (
    <TooltipProvider delayDuration={200}>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <div className="app-shell" id="top">
        <header className="topbar">
          <a
            className="brand"
            href="#top"
            onClick={() => {
              setTab('components')
              setCategory('All components')
              setQuery('')
            }}
          >
            <Layers2 size={23} strokeWidth={2.4} />
            <span>
              personal<span className="brand-dot">.</span>
            </span>
          </a>
          <nav className="view-tabs" aria-label="Views">
            {(['components', 'foundations'] as const).map((t) => (
              <button
                key={t}
                aria-current={tab === t ? 'page' : undefined}
                onClick={() => setTab(t)}
              >
                {tab === t && (
                  <motion.span
                    className="view-indicator"
                    layoutId="view-indicator"
                    transition={
                      enabled
                        ? { type: 'spring', stiffness: 400, damping: 32 }
                        : { duration: 0 }
                    }
                  />
                )}
                <span>{t === 'components' ? 'Components' : 'Foundations'}</span>
              </button>
            ))}
          </nav>
          <div className="topbar-tools">
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  className="icon-control"
                  aria-label={
                    reduced
                      ? 'Reduced motion enabled'
                      : paused
                        ? 'Resume animations'
                        : 'Pause animations'
                  }
                  aria-pressed={!enabled}
                  onClick={toggle}
                  disabled={reduced}
                >
                  {enabled ? <Pause size={15} /> : <Play size={15} />}
                </button>
              </TooltipTrigger>
              <TooltipContent>
                {reduced
                  ? 'Reduced motion'
                  : paused
                    ? 'Resume animations'
                    : 'Pause animations'}
              </TooltipContent>
            </Tooltip>
            <div className="theme-switch" role="group" aria-label="Color theme">
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
                      <Icon size={14} />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    {value[0].toUpperCase() + value.slice(1)}
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
            <a
              className="icon-control github-link"
              href="https://github.com/celento/personal-design-system"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub repository"
            >
              <Code2 size={17} />
            </a>
          </div>
        </header>
        <main id="main">
          <div className="page-heading">
            <h1>{tab === 'components' ? 'Components' : 'Foundations'}</h1>
            {tab === 'components' && (
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
            )}
          </div>
          {tab === 'components' ? (
            <>
              <nav className="category-tabs" aria-label="Component categories">
                {categories.map((c) => (
                  <button
                    key={c}
                    aria-pressed={category === c}
                    onClick={() => setCategory(c)}
                  >
                    {category === c && (
                      <motion.span
                        className="category-indicator"
                        layoutId="category-indicator"
                        transition={
                          enabled
                            ? { type: 'spring', stiffness: 420, damping: 35 }
                            : { duration: 0 }
                        }
                      />
                    )}
                    <span>{c === 'All components' ? 'All' : c}</span>
                    {category === c && (
                      <span className="category-count">
                        {
                          allSpecimens.filter(
                            (s) => c === 'All components' || s.category === c,
                          ).length
                        }
                      </span>
                    )}
                  </button>
                ))}
              </nav>
              <div className="specimen-grid" id="components">
                {visible.map((s) => (
                  <section
                    id={slug(s.name)}
                    key={s.name}
                    className={`specimen ${s.category === 'Effects' ? 'effect-specimen' : ''}`}
                  >
                    <div className="specimen-stage">{s.render()}</div>
                    <header className="specimen-header">
                      <h2>{s.name}</h2>
                      <a
                        href={
                          s.docs ??
                          `https://ui.shadcn.com/docs/components/${s.name === 'Switch & Checkbox' ? 'switch' : s.name === 'Toggle & Toggle Group' ? 'toggle-group' : s.name === 'Form' ? 'input' : slug(s.name)}`
                        }
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`${s.name} documentation`}
                      >
                        <ArrowUpRight size={15} />
                      </a>
                    </header>
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
            <Foundations />
          )}
          <footer className="page-footer">
            <a href="#top" aria-label="Back to top">
              <ArrowUp size={15} />
            </a>
          </footer>
        </main>
      </div>
      <Toaster position="bottom-right" closeButton theme={theme} />
    </TooltipProvider>
  )
}
export default App
