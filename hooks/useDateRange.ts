import { useCallback } from 'react'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import {
  setDateRangeStart,
  setDateRangeEnd,
  clearDateRange,
  setHoveredDate,
} from '@/store/slices/calendarSlice'

export function useDateRange() {
  const dispatch = useAppDispatch()
  const { dateRange, hoveredDate, isSelectingRange } = useAppSelector(
    (s) => s.calendar
  )

  const handleDayClick = useCallback(
    (date: string) => {
      if (!isSelectingRange || !dateRange.start) {
        dispatch(setDateRangeStart(date))
      } else {
        dispatch(setDateRangeEnd(date))
      }
    },
    [dispatch, isSelectingRange, dateRange.start]
  )

  const handleDayHover = useCallback(
    (date: string | null) => {
      if (isSelectingRange) dispatch(setHoveredDate(date))
    },
    [dispatch, isSelectingRange]
  )

  const clearRange = useCallback(() => dispatch(clearDateRange()), [dispatch])

  // Determine the effective end for hover preview
  const effectiveEnd =
    isSelectingRange && hoveredDate ? hoveredDate : dateRange.end

  const isStart = useCallback(
    (date: string) => date === dateRange.start,
    [dateRange.start]
  )

  const isEnd = useCallback(
    (date: string) => !!dateRange.end && date === dateRange.end,
    [dateRange.end]
  )

  const isInRange = useCallback(
    (date: string) => {
      const start = dateRange.start
      const end = effectiveEnd
      if (!start || !end) return false
      const s = start < end ? start : end
      const e = start < end ? end : start
      return date > s && date < e
    },
    [dateRange.start, effectiveEnd]
  )

  const isRangePreview = useCallback(
    (date: string) => {
      if (!isSelectingRange || !dateRange.start || !hoveredDate) return false
      const s = dateRange.start < hoveredDate ? dateRange.start : hoveredDate
      const e = dateRange.start < hoveredDate ? hoveredDate : dateRange.start
      return date >= s && date <= e
    },
    [isSelectingRange, dateRange.start, hoveredDate]
  )

  const hasRange = !!dateRange.start && !!dateRange.end

  return {
    dateRange,
    isSelectingRange,
    hoveredDate,
    handleDayClick,
    handleDayHover,
    clearRange,
    isStart,
    isEnd,
    isInRange,
    isRangePreview,
    hasRange,
  }
}
