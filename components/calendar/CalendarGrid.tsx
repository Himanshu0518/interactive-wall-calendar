'use client'

import { useEffect, useRef, useState } from 'react'
import { useCalendar } from '@/hooks/useCalendar'
import { DayCellComponent } from './DayCell'
import { cn } from '@/lib/utils'

export function CalendarGrid() {
  const { dayNames, days, currentMonth, currentYear } = useCalendar()

  // Animate on month change
  const [animKey, setAnimKey] = useState(0)
  const [direction, setDirection] = useState<'forward' | 'back'>('forward')
  const prevMonth = useRef(currentMonth)
  const prevYear  = useRef(currentYear)

  useEffect(() => {
    const mDiff = currentMonth - prevMonth.current
    const yDiff = currentYear - prevYear.current
    const goingForward = yDiff > 0 || (yDiff === 0 && mDiff > 0)
    setDirection(goingForward ? 'forward' : 'back')
    setAnimKey((k) => k + 1)
    prevMonth.current = currentMonth
    prevYear.current  = currentYear
  }, [currentMonth, currentYear])

  return (
    <div className="w-full overflow-hidden">
      {/* Day name headers — static, no animation */}
      <div className="grid grid-cols-7 mb-1">
        {dayNames.map((name) => (
          <div
            key={name}
            className="calendar-day-header text-center text-xs font-semibold py-2 opacity-40 tracking-widest uppercase"
          >
            {name}
          </div>
        ))}
      </div>

      {/* Animated grid */}
      <div
        key={animKey}
        className={cn(
          'grid grid-cols-7 gap-y-0.5',
          direction === 'forward' ? 'anim-slide-left' : 'anim-slide-right'
        )}
      >
        {days.map((cell) => (
          <DayCellComponent key={cell.date} cell={cell} />
        ))}
      </div>
    </div>
  )
}
