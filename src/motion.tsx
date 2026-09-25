import {
  createContext,
  useContext,
  useEffect,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from 'react'
import { MotionConfig } from 'motion/react'
import { readPreference, savePreference } from './theme'
const MotionContext = createContext({
  paused: false,
  reduced: false,
  enabled: true,
  toggle: () => {},
})
const subscribeReduced = (notify: () => void) => {
  const media = matchMedia('(prefers-reduced-motion: reduce)')
  media.addEventListener('change', notify)
  return () => media.removeEventListener('change', notify)
}
export function MotionProvider({ children }: { children: ReactNode }) {
  const reduced = useSyncExternalStore(
    subscribeReduced,
    () => matchMedia('(prefers-reduced-motion: reduce)').matches,
    () => false,
  )
  const [paused, setPaused] = useState(
    () => readPreference('pds-motion', 'on') === 'off',
  )
  const enabled = !paused && !reduced
  useEffect(() => {
    document.documentElement.dataset.motion = enabled ? 'on' : 'off'
    savePreference('pds-motion', paused ? 'off' : 'on')
  }, [enabled, paused])
  return (
    <MotionContext.Provider
      value={{ paused, reduced, enabled, toggle: () => setPaused((p) => !p) }}
    >
      <MotionConfig
        reducedMotion={enabled ? 'never' : 'always'}
        transition={{ type: 'spring', duration: 0.3, bounce: 0 }}
      >
        {children}
      </MotionConfig>
    </MotionContext.Provider>
  )
}
export function useMotionSettings() {
  return useContext(MotionContext)
}
const subscribeTheme = (notify: () => void) => {
  const observer = new MutationObserver(notify)
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class'],
  })
  return () => observer.disconnect()
}
export function useResolvedTheme(): 'dark' | 'light' {
  return useSyncExternalStore<'dark' | 'light'>(
    subscribeTheme,
    () =>
      document.documentElement.classList.contains('dark') ? 'dark' : 'light',
    () => 'light',
  )
}
