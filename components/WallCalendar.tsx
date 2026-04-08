'use client'

import { useTheme } from '@/hooks/useTheme'
import { usePersistence } from '@/hooks/usePersistence'
import { HeroImage } from './calendar/HeroImage'
import { CalendarHeader } from './calendar/CalendarHeader'
import { CalendarGrid } from './calendar/CalendarGrid'
import { EventsPanel } from './calendar/EventsPanel'
import { NotesPanel } from './notes/NotesPanel'
import { ThemeSwitcher } from './ThemeSwitcher'
import { motion } from 'framer-motion'

export function WallCalendar() {
  useTheme()
  usePersistence()

  return (
    <div className="wall-calendar-container">
      <motion.div
        className="wall-calendar-card"
        initial={{ opacity: 0, y: 32, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >

        {/* ── Top binding strip ── */}
        <div className="calendar-binding-strip" aria-hidden="true">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="binding-hole"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ delay: 0.12 + i * 0.04, duration: 0.22, ease: 'backOut' }}
            />
          ))}
        </div>

        {/* ── Top bar ── */}
        <div className="calendar-topbar">
          <div className="flex items-center gap-2">
            <motion.span
              className="calendar-brand"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.35, duration: 0.3 }}
            >
              📅 Wall Calendar
            </motion.span>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.35, duration: 0.3 }}
          >
            <ThemeSwitcher />
          </motion.div>
        </div>

        {/* ── Main layout: hero + calendar + notes ── */}
        <div className="calendar-body">

          {/* Left panel: hero image */}
          <motion.div
            className="calendar-hero-col"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <HeroImage />
          </motion.div>

          {/*  header + grid + notes */}
          <motion.div
            className="calendar-main-col"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <CalendarHeader />

            <div className="calendar-grid-wrapper">
              <CalendarGrid />
            </div>

            <div className="calendar-divider" />

            <div className="calendar-events-wrapper">
              <EventsPanel />
            </div>

            <div className="calendar-divider" />

            <div className="calendar-notes-wrapper">
              <NotesPanel />
            </div>
          </motion.div>

        </div>

        {/* ── Bottom holes ── */}
        <div className="calendar-footer-strip" aria-hidden="true">
          <div className="binding-hole-sm" />
          <div className="binding-hole-sm" />
          <div className="binding-hole-sm" />
        </div>

      </motion.div>
    </div>
  )
}
