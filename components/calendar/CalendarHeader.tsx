'use client'

import { ChevronLeft, ChevronRight, CalendarDays, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { differenceInCalendarDays, format, parseISO } from 'date-fns'
import { useCalendar } from '@/hooks/useCalendar'
import { useDateRange } from '@/hooks/useDateRange'
import { useState } from 'react'
import { useAppDispatch } from '@/store/hooks'
import { goToToday } from '@/store/slices/calendarSlice'

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

export function CalendarHeader() {
  const { currentYear, currentMonth, monthName, prevMonth, nextMonth, goToToday: goToTodayFn } = useCalendar()
  const { dateRange, clearRange, hasRange } = useDateRange()
  const [showJump, setShowJump] = useState(false)
  const dispatch = useAppDispatch()

  const formatDate = (d: string) =>
    format(parseISO(d), 'MMM d')

  // Compute day count for range pill
  const dayCount = hasRange && dateRange.start && dateRange.end
    ? differenceInCalendarDays(parseISO(dateRange.end), parseISO(dateRange.start)) + 1
    : null

  const handleJump = (month: number) => {
    // Navigate to chosen month by dispatching enough prev/next
    const diff = month - currentMonth
    if (diff === 0) { setShowJump(false); return }
    // Use goToToday as base then adjust — simpler: just dispatch individual steps
    // We'll just dispatch actions directly
    const steps = Math.abs(diff)
    for (let i = 0; i < steps; i++) {
      diff > 0 ? dispatch({ type: 'calendar/goToNextMonth' }) : dispatch({ type: 'calendar/goToPrevMonth' })
    }
    setShowJump(false)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
      {/* Month + year + nav */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', position: 'relative' }}>
          {/* Clickable month name → jump popover */}
          <button
            onClick={() => setShowJump((s) => !s)}
            style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}
            aria-label="Jump to month"
          >
            <h2 className="calendar-month-title" style={{ borderBottom: showJump ? '1.5px dashed var(--cal-accent)' : '1.5px dashed transparent', transition: 'border-color 0.15s' }}>
              {monthName}
            </h2>
            <span className="calendar-year">{currentYear}</span>
          </button>

          {/* Jump-to-month popover */}
          <AnimatePresence>
            {showJump && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.93 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.95 }}
                transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  position: 'absolute',
                  top: 'calc(100% + 8px)',
                  left: 0,
                  zIndex: 50,
                  background: 'var(--cal-dropdown-bg)',
                  border: '1px solid var(--cal-card-border)',
                  borderRadius: '1rem',
                  padding: '0.5rem',
                  boxShadow: 'var(--cal-shadow)',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '0.25rem',
                  minWidth: '14rem',
                }}
                role="listbox"
                aria-label="Select month"
              >
                {MONTH_NAMES.map((name, idx) => (
                  <button
                    key={name}
                    role="option"
                    aria-selected={idx === currentMonth}
                    onClick={() => handleJump(idx)}
                    style={{
                      padding: '0.38rem 0.5rem',
                      borderRadius: '0.6rem',
                      fontSize: '0.72rem',
                      fontWeight: idx === currentMonth ? 700 : 500,
                      cursor: 'pointer',
                      background: idx === currentMonth ? 'var(--cal-range-bg)' : 'transparent',
                      color: idx === currentMonth ? 'var(--cal-range-fg)' : 'var(--cal-text)',
                      border: 'none',
                      transition: 'background 0.1s',
                    }}
                    onMouseEnter={(e) => { if (idx !== currentMonth) (e.currentTarget as HTMLElement).style.background = 'var(--cal-hover)' }}
                    onMouseLeave={(e) => { if (idx !== currentMonth) (e.currentTarget as HTMLElement).style.background = 'transparent' }}
                  >
                    {name.slice(0, 3)}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
          <button onClick={goToTodayFn} className="calendar-nav-btn" aria-label="Today">
            Today
          </button>
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.9 }}
            onClick={prevMonth}
            className="calendar-nav-btn"
            aria-label="Previous month"
            style={{ padding: '0.35rem 0.45rem' }}
          >
            <ChevronLeft size={14} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.9 }}
            onClick={nextMonth}
            className="calendar-nav-btn"
            aria-label="Next month"
            style={{ padding: '0.35rem 0.45rem' }}
          >
            <ChevronRight size={14} />
          </motion.button>
        </div>
      </div>

      {/* Range pill with day count */}
      <AnimatePresence>
        {dateRange.start && (
          <motion.div
            initial={{ opacity: 0, y: -6, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -4, height: 0 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="calendar-range-pill">
              <CalendarDays size={11} />
              {formatDate(dateRange.start)}
              {dateRange.end && dateRange.end !== dateRange.start && (
                <> → {formatDate(dateRange.end)}</>
              )}
              {dayCount && dayCount > 1 && (
                <span style={{
                  marginLeft: '0.25rem',
                  padding: '0.05rem 0.4rem',
                  borderRadius: '99px',
                  fontSize: '0.65rem',
                  fontWeight: 700,
                  background: 'var(--cal-accent)',
                  color: 'var(--cal-accent-fg)',
                }}>
                  {dayCount}d
                </span>
              )}
              {hasRange && (
                <button
                  onClick={clearRange}
                  aria-label="Clear range"
                  style={{
                    marginLeft: '0.2rem',
                    opacity: 0.55,
                    cursor: 'pointer',
                    background: 'none',
                    border: 'none',
                    color: 'inherit',
                    lineHeight: 1,
                    padding: '0 0.1rem',
                    display: 'inline-flex',
                    alignItems: 'center',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.55')}
                >
                  <X size={10} />
                </button>
              )}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay to close jump popover on outside click */}
      {showJump && (
        <div
          style={{ position: 'fixed', inset: 0, zIndex: 40 }}
          onClick={() => setShowJump(false)}
          aria-hidden="true"
        />
      )}
    </div>
  )
}
