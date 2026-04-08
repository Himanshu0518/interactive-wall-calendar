import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface DateRange {
  start: string | null // ISO date string YYYY-MM-DD
  end: string | null
}

export interface Note {
  id: string
  date: string // YYYY-MM-DD
  content: string
  createdAt: string
}

export interface CalendarState {
  currentYear: number
  currentMonth: number // 0-indexed
  dateRange: DateRange
  notes: Note[]
  hoveredDate: string | null
  isSelectingRange: boolean
}

const today = new Date()

const initialState: CalendarState = {
  currentYear: today.getFullYear(),
  currentMonth: today.getMonth(),
  dateRange: { start: null, end: null },
  notes: [],
  hoveredDate: null,
  isSelectingRange: false,
}

const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    goToPrevMonth(state) {
      if (state.currentMonth === 0) {
        state.currentMonth = 11
        state.currentYear -= 1
      } else {
        state.currentMonth -= 1
      }
    },
    goToNextMonth(state) {
      if (state.currentMonth === 11) {
        state.currentMonth = 0
        state.currentYear += 1
      } else {
        state.currentMonth += 1
      }
    },
    goToToday(state) {
      state.currentYear = today.getFullYear()
      state.currentMonth = today.getMonth()
    },
    setDateRangeStart(state, action: PayloadAction<string>) {
      state.dateRange = { start: action.payload, end: null }
      state.isSelectingRange = true
    },
    setDateRangeEnd(state, action: PayloadAction<string>) {
      if (!state.dateRange.start) return
      const start = state.dateRange.start
      const end = action.payload
      // Ensure start <= end
      if (end < start) {
        state.dateRange = { start: end, end: start }
      } else {
        state.dateRange.end = end
      }
      state.isSelectingRange = false
    },
    clearDateRange(state) {
      state.dateRange = { start: null, end: null }
      state.isSelectingRange = false
    },
    setHoveredDate(state, action: PayloadAction<string | null>) {
      state.hoveredDate = action.payload
    },
    addNote(state, action: PayloadAction<{ date: string; content: string }>) {
      const note: Note = {
        id: crypto.randomUUID(),
        date: action.payload.date,
        content: action.payload.content,
        createdAt: new Date().toISOString(),
      }
      state.notes.push(note)
    },
    updateNote(state, action: PayloadAction<{ id: string; content: string }>) {
      const note = state.notes.find((n) => n.id === action.payload.id)
      if (note) note.content = action.payload.content
    },
    deleteNote(state, action: PayloadAction<string>) {
      state.notes = state.notes.filter((n) => n.id !== action.payload)
    },
  },
})

export const {
  goToPrevMonth,
  goToNextMonth,
  goToToday,
  setDateRangeStart,
  setDateRangeEnd,
  clearDateRange,
  setHoveredDate,
  addNote,
  updateNote,
  deleteNote,
} = calendarSlice.actions

export default calendarSlice.reducer
