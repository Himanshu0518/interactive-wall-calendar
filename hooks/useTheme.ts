import { useCallback, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { setTheme, cycleTheme } from '@/store/slices/themeSlice'
import type { Theme } from '@/store/slices/themeSlice'

export const THEMES: { value: Theme; label: string; emoji: string }[] = [
  { value: 'light', label: 'Classic', emoji: '☀️' },
  { value: 'dark', label: 'Midnight', emoji: '🌙' },
  { value: 'forest', label: 'Forest', emoji: '🌿' },
  { value: 'ocean', label: 'Ocean', emoji: '🌊' },
  { value: 'sunset', label: 'Sunset', emoji: '🌅' },
]

export function useTheme() {
  const dispatch = useAppDispatch()
  const { theme } = useAppSelector((s) => s.theme)

  // Apply theme class to <html> element
  useEffect(() => {
    const root = document.documentElement
    root.setAttribute('data-theme', theme)
    // Also toggle dark class for shadcn dark mode support
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }, [theme])

  const changeTheme = useCallback(
    (t: Theme) => dispatch(setTheme(t)),
    [dispatch]
  )

  const nextTheme = useCallback(() => dispatch(cycleTheme()), [dispatch])

  return { theme, changeTheme, nextTheme, themes: THEMES }
}
