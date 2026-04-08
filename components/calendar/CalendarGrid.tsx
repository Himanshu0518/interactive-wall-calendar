'use client'

import { useEffect, useRef, useState } from 'react'
import { useCalendar } from '@/hooks/useCalendar'
import { DayCellComponent } from './DayCell'
import { motion, AnimatePresence, Variants } from 'framer-motion'

export function CalendarGrid() {
  const { dayNames, days, currentMonth, currentYear } = useCalendar()

  const [animKey, setAnimKey] = useState(0)
  const [direction, setDirection] = useState<'forward' | 'back'>('forward')
  const prevMonth = useRef(currentMonth)
  const prevYear = useRef(currentYear)

  useEffect(() => {
    const mDiff = currentMonth - prevMonth.current
    const yDiff = currentYear - prevYear.current
    const goingForward = yDiff > 0 || (yDiff === 0 && mDiff > 0)
    setDirection(goingForward ? 'forward' : 'back')
    setAnimKey((k) => k + 1)
    prevMonth.current = currentMonth
    prevYear.current = currentYear
  }, [currentMonth, currentYear])

  const variants: Variants = {
    enter: (dir: 'forward' | 'back') => ({
      x: dir === 'forward' ? 40 : -40,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] },
    },
    exit: (dir: 'forward' | 'back') => ({
      x: dir === 'forward' ? -40 : 40,
      opacity: 0,
      transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] },
    }),
  }

  return (
    <div className="w-full overflow-hidden">
      {/* Day name headers — static */}
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

      {/* Animated grid via Framer Motion */}
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={animKey}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            className="grid grid-cols-7 gap-y-0.5"
          >
            {days.map((cell) => (
              <DayCellComponent key={cell.date} cell={cell} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
