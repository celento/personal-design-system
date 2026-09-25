import { useEffect, useState } from 'react'
export type Theme = 'light' | 'dark' | 'system'
export function readPreference(key: string, fallback: string) {
  try {
    return localStorage.getItem(key) ?? fallback
  } catch {
    return fallback
  }
}
export function savePreference(key: string, value: string) {
  try {
    localStorage.setItem(key, value)
  } catch {
    /* Storage may be disabled. */
  }
}
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = readPreference('pds-theme', 'system')
    return saved === 'light' || saved === 'dark' ? saved : 'system'
  })
  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const apply = () => {
      const dark = theme === 'dark' || (theme === 'system' && media.matches)
      document.documentElement.classList.toggle('dark', dark)
      document.documentElement.dataset.theme = dark ? 'dark' : 'light'
      document.documentElement.style.colorScheme = dark ? 'dark' : 'light'
    }
    apply()
    savePreference('pds-theme', theme)
    media.addEventListener('change', apply)
    return () => media.removeEventListener('change', apply)
  }, [theme])
  return [theme, setTheme] as const
}
