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

  // Determine which events to display based on UX rules:
  // - No selection => show all month events
  // - Selection => show ONLY events in the selected range
  const displayEvents = useMemo(() => {
    if (!dateRange.start) return monthEvents
    return monthEvents.filter((event) => isInSelectedRange(event.date))
  }, [monthEvents, dateRange])

  if (displayEvents.length === 0 && !dateRange.start) return null

  return (
    <div className="events-panel">
      <div className="events-header">
        <CalendarHeart size={13} style={{ opacity: 0.5 }} />
        <span className="events-title">
          {dateRange.start ? 'Selected Range Events' : 'Events'}
        </span>
        <span className="events-count">({displayEvents.length})</span>
      </div>

      <div className="events-list">
        <AnimatePresence mode="popLayout">
          {dateRange.start && displayEvents.length === 0 && (
             <motion.div
               key="no-events"
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               className="event-name"
               style={{ opacity: 0.5, fontSize: '0.65rem' }}
             >
               No events in selected range.
             </motion.div>
          )}

          {displayEvents.map(({ date, holiday }, i) => {
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
