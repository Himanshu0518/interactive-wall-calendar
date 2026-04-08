'use client'

import { useTheme } from '@/hooks/useTheme'
import { usePersistence } from '@/hooks/usePersistence'
import { HeroImage } from './calendar/HeroImage'
import { CalendarHeader } from './calendar/CalendarHeader'
import { CalendarGrid } from './calendar/CalendarGrid'
import { NotesPanel } from './notes/NotesPanel'
import { ThemeSwitcher } from './ThemeSwitcher'

export function WallCalendar() {
  useTheme()          // applies data-theme to <html>
  usePersistence()    // hydrates + persists to localStorage

  return (
    <div className="wall-calendar-container">
      <div className="wall-calendar-card">

        {/* ── Top binding strip (real div, not pseudo-element) ── */}
        <div className="calendar-binding-strip" aria-hidden="true">
          {/* Binding holes */}
          {[...Array(6)].map((_, i) => (
            <div key={i} className="binding-hole" />
          ))}
        </div>

        {/* ── Top bar ── */}
        <div className="calendar-topbar">
          <div className="flex items-center gap-2">
            <span className="calendar-brand">📅 Wall Calendar</span>
          </div>
          <ThemeSwitcher />
        </div>

        {/* ── Main layout: hero + calendar+notes ── */}
        <div className="calendar-body">

          {/* Left panel: hero image */}
          <div className="calendar-hero-col">
            <HeroImage />
          </div>

          {/* Right panel: header + grid + notes */}
          <div className="calendar-main-col">
            <CalendarHeader />

            <div className="calendar-grid-wrapper">
              <CalendarGrid />
            </div>

            <div className="calendar-divider" />

            <div className="calendar-notes-wrapper">
              <NotesPanel />
            </div>
          </div>

        </div>

        {/* ── Bottom holes ── */}
        <div className="calendar-footer-strip" aria-hidden="true">
          <div className="binding-hole-sm" />
          <div className="binding-hole-sm" />
          <div className="binding-hole-sm" />
        </div>

      </div>
    </div>
  )
}
