'use client'

import { memo } from 'react'
import { cn } from '@/lib/utils'
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

  const start    = isStart(cell.date)
  const end      = isEnd(cell.date)
  const inRange  = isInRange(cell.date)
  const preview  = isRangePreview(cell.date)
  const hasNote  = hasNotesOnDate(cell.date)
  const holiday  = cell.isCurrentMonth ? getHoliday(cell.date) : null

  return (
    <button
      onClick={() => handleDayClick(cell.date)}
      onMouseEnter={() => handleDayHover(cell.date)}
      onMouseLeave={() => handleDayHover(null)}
      title={holiday?.name ?? undefined}
      className={cn(
        'relative flex flex-col items-center justify-center',
        'h-10 w-full rounded-lg text-sm font-medium',
        'transition-all duration-100 select-none focus:outline-none',
        // Base
        !cell.isCurrentMonth && 'day-other-month',
        cell.isCurrentMonth && !start && !end && 'day-current-month',
        // Today ring
        cell.isToday && !start && !end && 'day-today',
        // Range endpoints
        (start || end) && 'day-range-endpoint',
        start && 'rounded-l-full rounded-r-none',
        end   && 'rounded-r-full rounded-l-none',
        start && end && 'rounded-full',          // same-day click
        // In-range fill
        inRange && !start && !end && 'day-in-range rounded-none',
        // Hover preview while selecting
        preview && !start && !end && 'day-preview',
        'cursor-pointer'
      )}
      aria-label={`${cell.day}${holiday ? `, ${holiday.name}` : ''}`}
      aria-pressed={start || end}
    >
      {/* Holiday emoji — top-right corner */}
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
          cell.isToday && !start && !end && 'day-today-text font-bold',
          holiday && cell.isCurrentMonth && !start && !end && 'holiday-text',
        )}
      >
        {cell.day}
      </span>

      {/* Note dot */}
      {hasNote && cell.isCurrentMonth && (
        <span
          className={cn(
            'absolute bottom-1 w-1 h-1 rounded-full',
            start || end ? 'bg-white/60' : 'note-dot'
          )}
          aria-hidden="true"
        />
      )}
    </button>
  )
})
