import { useCallback, useMemo } from 'react'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import {
  goToPrevMonth,
  goToNextMonth,
  goToToday,
} from '@/store/slices/calendarSlice'

export interface DayCell {
  date: string // YYYY-MM-DD
  day: number
  isCurrentMonth: boolean
  isToday: boolean
  dayOfWeek: number
}

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

function toDateString(year: number, month: number, day: number): string {
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
}

export function useCalendar() {
  const dispatch = useAppDispatch()
  const { currentYear, currentMonth } = useAppSelector((s) => s.calendar)

  const today = useMemo(() => {
    const d = new Date()
    return toDateString(d.getFullYear(), d.getMonth(), d.getDate())
  }, [])

  const monthName = MONTH_NAMES[currentMonth]
  const dayNames = DAY_NAMES

  const days: DayCell[] = useMemo(() => {
    const firstDay = new Date(currentYear, currentMonth, 1).getDay()
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
    const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate()
    const cells: DayCell[] = []

    // Previous month padding
    for (let i = firstDay - 1; i >= 0; i--) {
      const day = daysInPrevMonth - i
      const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1
      const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear
      cells.push({
        date: toDateString(prevYear, prevMonth, day),
        day,
        isCurrentMonth: false,
        isToday: false,
        dayOfWeek: firstDay - 1 - i,
      })
    }

    // Current month
    for (let d = 1; d <= daysInMonth; d++) {
      const dateStr = toDateString(currentYear, currentMonth, d)
      cells.push({
        date: dateStr,
        day: d,
        isCurrentMonth: true,
        isToday: dateStr === today,
        dayOfWeek: (firstDay + d - 1) % 7,
      })
    }

    // Next month padding to complete grid (always 6 rows = 42 cells)
    const remaining = 42 - cells.length
    for (let d = 1; d <= remaining; d++) {
      const nextMonth = currentMonth === 11 ? 0 : currentMonth + 1
      const nextYear = currentMonth === 11 ? currentYear + 1 : currentYear
      cells.push({
        date: toDateString(nextYear, nextMonth, d),
        day: d,
        isCurrentMonth: false,
        isToday: false,
        dayOfWeek: (cells.length) % 7,
      })
    }

    return cells
  }, [currentYear, currentMonth, today])

  const prevMonth = useCallback(() => dispatch(goToPrevMonth()), [dispatch])
  const nextMonth = useCallback(() => dispatch(goToNextMonth()), [dispatch])
  const goToTodayFn = useCallback(() => dispatch(goToToday()), [dispatch])

  return {
    currentYear,
    currentMonth,
    monthName,
    dayNames,
    days,
    today,
    prevMonth,
    nextMonth,
    goToToday: goToTodayFn,
  }
}
