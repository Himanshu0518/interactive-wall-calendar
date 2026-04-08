'use client'

import { useState, useRef, useEffect } from 'react'
import { Palette } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
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
      <motion.button
        onClick={() => setOpen((o) => !o)}
        className="theme-switcher-btn"
        aria-label="Change theme"
        aria-haspopup="listbox"
        aria-expanded={open}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.93 }}
        transition={{ type: 'spring', stiffness: 400, damping: 18 }}
      >
        <Palette size={13} />
        <span>{current?.emoji} {current?.label}</span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.94 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="theme-dropdown"
            role="listbox"
            aria-label="Theme options"
          >
            {THEMES.map((t, i) => (
              <motion.button
                key={t.value}
                role="option"
                aria-selected={theme === t.value}
                onClick={() => { changeTheme(t.value); setOpen(false) }}
                className={`theme-option${theme === t.value ? ' theme-option-active' : ''}`}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04, duration: 0.15 }}
                whileHover={{ x: 3 }}
              >
                <span>{t.emoji}</span>
                <span>{t.label}</span>
                {theme === t.value && (
                  <motion.span
                    layoutId="theme-check"
                    style={{ marginLeft: 'auto', fontSize: '0.65rem' }}
                  >
                    ✓
                  </motion.span>
                )}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
