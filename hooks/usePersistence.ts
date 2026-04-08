import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { addNote, deleteNote } from '@/store/slices/calendarSlice'
import { setTheme } from '@/store/slices/themeSlice'
import type { Note } from '@/store/slices/calendarSlice'
import type { Theme } from '@/store/slices/themeSlice'

const NOTES_KEY = 'wall-calendar:notes'
const THEME_KEY = 'wall-calendar:theme'

/** Loads persisted notes and theme from localStorage into Redux on first mount. */
export function usePersistence() {
  const dispatch = useAppDispatch()
  const notes = useAppSelector((s) => s.calendar.notes)
  const theme = useAppSelector((s) => s.theme.theme)

  // Hydrate on mount (runs once, client-side only)
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem(THEME_KEY) as Theme | null
      if (savedTheme) dispatch(setTheme(savedTheme))

      const savedNotes = localStorage.getItem(NOTES_KEY)
      if (savedNotes) {
        const parsed: Note[] = JSON.parse(savedNotes)
        parsed.forEach((note) => {
          dispatch(addNote({ date: note.date, content: note.content }))
        })
      }
    } catch {
      // localStorage unavailable or corrupted — silently ignore
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // intentionally empty — only run once

  // Persist notes on change
  useEffect(() => {
    try {
      localStorage.setItem(NOTES_KEY, JSON.stringify(notes))
    } catch { /* ignore */ }
  }, [notes])

  // Persist theme on change
  useEffect(() => {
    try {
      localStorage.setItem(THEME_KEY, theme)
    } catch { /* ignore */ }
  }, [theme])
}

export { deleteNote }
