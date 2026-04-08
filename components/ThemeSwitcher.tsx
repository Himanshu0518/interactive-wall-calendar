'use client'

import { useState, useRef, useEffect } from 'react'
import { Palette } from 'lucide-react'
import { useTheme, THEMES } from '@/hooks/useTheme'

export function ThemeSwitcher() {
  const { theme, changeTheme } = useTheme()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const current = THEMES.find((t) => t.value === theme)

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="theme-switcher-btn"
        aria-label="Change theme"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <Palette size={13} />
        <span style={{ display: 'none' }} className="sm-show">{current?.emoji} {current?.label}</span>
        <span>{current?.emoji}</span>
      </button>

      {open && (
        <div className="theme-dropdown" role="listbox" aria-label="Theme options">
          {THEMES.map((t) => (
            <button
              key={t.value}
              role="option"
              aria-selected={theme === t.value}
              onClick={() => { changeTheme(t.value); setOpen(false) }}
              className={`theme-option${theme === t.value ? ' theme-option-active' : ''}`}
            >
              <span>{t.emoji}</span>
              <span>{t.label}</span>
              {theme === t.value && (
                <span style={{ marginLeft: 'auto', fontSize: '0.65rem' }}>✓</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
