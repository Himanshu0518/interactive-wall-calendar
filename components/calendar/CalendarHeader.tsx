'use client'

import { ChevronLeft, ChevronRight, CalendarDays } from 'lucide-react'
import { useCalendar } from '@/hooks/useCalendar'
import { useDateRange } from '@/hooks/useDateRange'

export function CalendarHeader() {
  const { currentYear, monthName, prevMonth, nextMonth, goToToday } = useCalendar()
  const { dateRange, clearRange, hasRange } = useDateRange()

  const formatDate = (d: string) =>
    new Date(d + 'T00:00:00').toLocaleDateString('en-US', {
      month: 'short', day: 'numeric',
    })

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
      {/* Month + year + nav */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
          <h2 className="calendar-month-title">{monthName}</h2>
          <span className="calendar-year">{currentYear}</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
          <button onClick={goToToday} className="calendar-nav-btn" aria-label="Today">
            Today
          </button>
          <button onClick={prevMonth} className="calendar-nav-btn" aria-label="Previous month"
            style={{ padding: '0.35rem 0.45rem' }}>
            <ChevronLeft size={14} />
          </button>
          <button onClick={nextMonth} className="calendar-nav-btn" aria-label="Next month"
            style={{ padding: '0.35rem 0.45rem' }}>
            <ChevronRight size={14} />
          </button>
        </div>
      </div>

      {/* Range pill */}
      {dateRange.start && (
        <div className="animate-fade-in">
          <span className="calendar-range-pill">
            <CalendarDays size={11} />
            {formatDate(dateRange.start)}
            {dateRange.end && dateRange.end !== dateRange.start && (
              <> → {formatDate(dateRange.end)}</>
            )}
            {hasRange && (
              <button
                onClick={clearRange}
                aria-label="Clear range"
                style={{
                  marginLeft: '0.3rem', fontSize: '0.7rem', fontWeight: 700,
                  opacity: 0.6, cursor: 'pointer', background: 'none',
                  border: 'none', color: 'inherit', lineHeight: 1, padding: 0,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.6')}
              >
                ✕
              </button>
            )}
          </span>
        </div>
      )}
    </div>
  )
}
