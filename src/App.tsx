import { useEffect, useRef, useState } from 'react'
import {
  ArrowUp,
  Layers2,
  Monitor,
  Moon,
  Pause,
  Play,
  Search,
  Sun,
  X,
} from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
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
import { useTheme } from '@/lib/theme'
import { useMotionSettings } from '@/lib/motion'
import './App.css'

const allSpecimens = [...specimens, ...effectSpecimens]
const easeOut = [0.23, 1, 0.32, 1] as const
function App() {
  const [theme, setTheme] = useTheme()
  const { enabled, reduced, paused, toggle } = useMotionSettings()
  const [category, setCategory] = useState<Category>('All components')
  const [query, setQuery] = useState('')
  const [tab, setTab] = useState<'components' | 'foundations'>('components')
  const searchRef = useRef<HTMLInputElement>(null)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
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
      <div className="topbar-wrap" data-scrolled={scrolled || undefined}>
        <header className="topbar app-shell">
          <a
            className="brand"
            href="#top"
            aria-label="Home"
            onClick={() => {
              setTab('components')
              setCategory('All components')
              setQuery('')
            }}
          >
            <span className="brand-mark" aria-hidden="true">
              <Layers2 size={16} strokeWidth={2.4} />
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
                        ? { type: 'spring', duration: 0.3, bounce: 0 }
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
          </div>
        </header>
      </div>
      <div className="app-shell" id="top">
        <main id="main">
          <div className="page-heading">
            <motion.div
              className="page-title"
              key={tab}
              initial={
                enabled
                  ? {
                      opacity: 0,
                      transform: 'translateY(6px)',
                      filter: 'blur(2px)',
                    }
                  : false
              }
              animate={{
                opacity: 1,
                transform: 'translateY(0px)',
                filter: 'blur(0px)',
              }}
              transition={{ duration: 0.3, ease: easeOut }}
            >
              <h1>{tab === 'components' ? 'Components' : 'Foundations'}</h1>
              <p className="page-lede">
                {tab === 'components'
                  ? `${allSpecimens.length} components with keyboard support, light and dark themes, and touch sizing.`
                  : 'Color, type, spacing, radius, and motion shared by every component.'}
              </p>
            </motion.div>
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
                            ? { type: 'spring', duration: 0.3, bounce: 0 }
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
              <motion.div
                className="specimen-grid"
                id="components"
                layout={enabled}
              >
                <AnimatePresence mode="popLayout" initial={enabled}>
                  {visible.map((s, i) => (
                    <motion.section
                      layout={enabled ? 'position' : false}
                      id={slug(s.name)}
                      key={s.name}
                      className={`specimen ${s.category === 'Special' ? 'effect-specimen' : ''}`}
                      initial={
                        enabled
                          ? {
                              opacity: 0,
                              transform: 'translateY(12px) scale(0.98)',
                            }
                          : false
                      }
                      animate={{
                        opacity: 1,
                        transform: 'translateY(0px) scale(1)',
                        transition: {
                          duration: 0.3,
                          ease: easeOut,
                          delay: Math.min(i, 8) * 0.03,
                        },
                      }}
                      exit={{
                        opacity: 0,
                        transform: 'translateY(0px) scale(0.97)',
                        transition: { duration: 0.15, ease: easeOut },
                      }}
                    >
                      <div className="specimen-stage">{s.render()}</div>
                      <header className="specimen-header">
                        <div>
                          <h2>{s.name}</h2>
                          <p>{s.detail}</p>
                        </div>
                      </header>
                    </motion.section>
                  ))}
                </AnimatePresence>
              </motion.div>
              {visible.length === 0 && (
                <motion.div
                  className="empty-state"
                  initial={
                    enabled
                      ? { opacity: 0, transform: 'translateY(8px)' }
                      : false
                  }
                  animate={{ opacity: 1, transform: 'translateY(0px)' }}
                  transition={{ duration: 0.25, ease: easeOut }}
                >
                  <span className="empty-icon">
                    <Search size={20} />
                  </span>
                  <h2>No components found</h2>
                  <p>Try a different name or clear the filters.</p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setQuery('')
                      setCategory('All components')
                    }}
                  >
                    Clear filters
                  </Button>
                </motion.div>
              )}
            </>
          ) : (
            <Foundations />
          )}
          <footer className="page-footer">
            <a href="#top" className="to-top" aria-label="Back to top">
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
