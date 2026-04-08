'use client'

import { memo } from 'react'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { useDateRange } from '@/hooks/useDateRange'
import { useNotes } from '@/hooks/useNotes'
import { getHoliday } from '@/lib/holidays'
import type { DayCell } from '@/hooks/useCalendar'

interface DayCellProps {
  cell: DayCell
}

export const DayCellComponent = memo(function DayCellComponent({ cell }: DayCellProps) {
  const { handleDayClick, handleDayHover, isStart, isEnd, isInRange, isRangePreview } =
    useDateRange()
  const { hasNotesOnDate } = useNotes()

  const start   = isStart(cell.date)
  const end     = isEnd(cell.date)
  const inRange = isInRange(cell.date)
  const preview = isRangePreview(cell.date)
  const hasNote = hasNotesOnDate(cell.date)
  const holiday = cell.isCurrentMonth ? getHoliday(cell.date) : null

  const isEndpoint = start || end

  return (
    <motion.button
      onClick={() => handleDayClick(cell.date)}
      onMouseEnter={() => handleDayHover(cell.date)}
      onMouseLeave={() => handleDayHover(null)}
      title={holiday?.name ?? undefined}
      whileHover={cell.isCurrentMonth ? { scale: 1.13 } : {}}
      whileTap={cell.isCurrentMonth ? { scale: 0.9 } : {}}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      className={cn(
        'relative flex flex-col items-center justify-center',
        'h-10 w-full rounded-lg text-sm font-medium',
        'select-none focus:outline-none',
        // Base
        !cell.isCurrentMonth && 'day-other-month',
        cell.isCurrentMonth && !isEndpoint && 'day-current-month',
        // Today ring
        cell.isToday && !isEndpoint && 'day-today',
        // Range endpoints
        isEndpoint && 'day-range-endpoint',
        start && !end && 'rounded-l-full rounded-r-none',
        end   && !start && 'rounded-r-full rounded-l-none',
        start && end && 'rounded-full',
        // In-range fill
        inRange && !isEndpoint && 'day-in-range rounded-none',
        // Hover preview while selecting
        preview && !isEndpoint && 'day-preview',
        'cursor-pointer'
      )}
      aria-label={`${cell.day}${holiday ? `, ${holiday.name}` : ''}`}
      aria-pressed={isEndpoint}
    >
      {/* Holiday emoji */}
      {holiday && (
        <span
          className="absolute top-0.5 right-0.5 text-[9px] leading-none pointer-events-none"
          aria-hidden="true"
        >
          {holiday.emoji}
        </span>
      )}

      {/* Day number */}
      <span
        className={cn(
          'z-10 leading-none',
          cell.isToday && !isEndpoint && 'day-today-text font-bold',
          holiday && cell.isCurrentMonth && !isEndpoint && 'holiday-text',
        )}
      >
        {cell.day}
      </span>

      {/* Note dot */}
      {hasNote && cell.isCurrentMonth && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className={cn(
            'absolute bottom-1 w-1 h-1 rounded-full',
            isEndpoint ? 'bg-white/60' : 'note-dot'
          )}
          aria-hidden="true"
        />
      )}

      {/* Endpoint selection pulse ring */}
      {isEndpoint && (
        <motion.span
          className="absolute inset-0 rounded-full"
          initial={{ opacity: 0.6, scale: 0.6 }}
          animate={{ opacity: 0, scale: 1.5 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          style={{ background: 'var(--cal-accent)', borderRadius: '50%', pointerEvents: 'none' }}
        />
      )}
    </motion.button>
  )
})
