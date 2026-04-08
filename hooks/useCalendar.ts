import { useCallback, useMemo } from 'react'
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  format,
  isSameMonth,
  isToday,
  getDay,
} from 'date-fns'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import {
  goToPrevMonth,
  goToNextMonth,
  goToToday,
} from '@/store/slices/calendarSlice'

export interface DayCell {
  date: string       // YYYY-MM-DD
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

export function useCalendar() {
  const dispatch = useAppDispatch()
  const { currentYear, currentMonth } = useAppSelector((s) => s.calendar)

  const monthName = MONTH_NAMES[currentMonth]
  const dayNames = DAY_NAMES

  const days: DayCell[] = useMemo(() => {
    const pivotDate = new Date(currentYear, currentMonth, 1)
    const monthStart = startOfMonth(pivotDate)
    const monthEnd = endOfMonth(pivotDate)

    // Full 6-row grid: pad to include leading/trailing days
    const gridStart = startOfWeek(monthStart)   // Sunday
    const gridEnd = endOfWeek(monthEnd)          // Saturday

    const allDays = eachDayOfInterval({ start: gridStart, end: gridEnd })

    // Always render 42 cells (6 rows × 7)
    const cells = allDays.slice(0, 42)

    return cells.map((d) => ({
      date: format(d, 'yyyy-MM-dd'),
      day: d.getDate(),
      isCurrentMonth: isSameMonth(d, pivotDate),
      isToday: isToday(d),
      dayOfWeek: getDay(d),
    }))
  }, [currentYear, currentMonth])

  const prevMonth = useCallback(() => dispatch(goToPrevMonth()), [dispatch])
  const nextMonth = useCallback(() => dispatch(goToNextMonth()), [dispatch])
  const goToTodayFn = useCallback(() => dispatch(goToToday()), [dispatch])

  return {
    currentYear,
    currentMonth,
    monthName,
    dayNames,
    days,
    prevMonth,
    nextMonth,
    goToToday: goToTodayFn,
  }
}
