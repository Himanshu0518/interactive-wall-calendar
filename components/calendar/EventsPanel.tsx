'use client'

import { useMemo } from 'react'
import { CalendarHeart } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { format, parseISO } from 'date-fns'
import { useAppSelector } from '@/store/hooks'
import { getHolidaysForMonth } from '@/lib/holidays'

export function EventsPanel() {
  const { currentYear, currentMonth, dateRange } = useAppSelector(
    (s) => s.calendar
  )

  const monthEvents = useMemo(
    () => getHolidaysForMonth(currentYear, currentMonth),
    [currentYear, currentMonth]
  )

  // Check if a date falls within the selected range
  const isInSelectedRange = (date: string) => {
    if (!dateRange.start) return false
    const end = dateRange.end ?? dateRange.start
    const s = dateRange.start <= end ? dateRange.start : end
    const e = dateRange.start <= end ? end : dateRange.start
    return date >= s && date <= e
  }

  if (monthEvents.length === 0) return null

  return (
    <div className="events-panel">
      <div className="events-header">
        <CalendarHeart size={13} style={{ opacity: 0.5 }} />
        <span className="events-title">Events</span>
        <span className="events-count">({monthEvents.length})</span>
      </div>

      <div className="events-list">
        <AnimatePresence mode="popLayout">
          {monthEvents.map(({ date, holiday }, i) => {
            const inRange = isInSelectedRange(date)
            return (
              <motion.div
                key={date}
                className={`event-item${inRange ? ' event-item-active' : ''}`}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 12 }}
                transition={{
                  delay: i * 0.05,
                  duration: 0.22,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <span className="event-emoji">{holiday.emoji}</span>
                <div className="event-info">
                  <span className="event-name">{holiday.name}</span>
                  <span className="event-date">
                    {format(parseISO(date), 'MMM d')}
                  </span>
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
    </div>
  )
}
