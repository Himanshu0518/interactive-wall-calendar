import { useCallback, useMemo } from 'react'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { addNote, updateNote, deleteNote } from '@/store/slices/calendarSlice'
import type { Note } from '@/store/slices/calendarSlice'

export function useNotes() {
  const dispatch = useAppDispatch()
  const { notes, dateRange } = useAppSelector((s) => s.calendar)

  const addNewNote = useCallback(
    (date: string, content: string) => {
      if (!content.trim()) return
      dispatch(addNote({ date, content: content.trim() }))
    },
    [dispatch]
  )

  const editNote = useCallback(
    (id: string, content: string) => {
      dispatch(updateNote({ id, content }))
    },
    [dispatch]
  )

  const removeNote = useCallback(
    (id: string) => dispatch(deleteNote(id)),
    [dispatch]
  )

  // Notes for the currently selected date range
  const notesForRange = useMemo<Note[]>(() => {
    if (!dateRange.start) return []
    const end = dateRange.end ?? dateRange.start
    const s = dateRange.start <= end ? dateRange.start : end
    const e = dateRange.start <= end ? end : dateRange.start
    return notes.filter((n) => n.date >= s && n.date <= e)
  }, [notes, dateRange])

  const notesByDate = useMemo<Record<string, Note[]>>(() => {
    return notes.reduce<Record<string, Note[]>>((acc, note) => {
      if (!acc[note.date]) acc[note.date] = []
      acc[note.date].push(note)
      return acc
    }, {})
  }, [notes])

  const hasNotesOnDate = useCallback(
    (date: string) => !!notesByDate[date]?.length,
    [notesByDate]
  )

  // Default note date: start of range or today
  const defaultNoteDate = useMemo(() => {
    if (dateRange.start) return dateRange.start
    const d = new Date()
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
  }, [dateRange.start])

  return {
    notes,
    notesForRange,
    notesByDate,
    hasNotesOnDate,
    defaultNoteDate,
    addNewNote,
    editNote,
    removeNote,
  }
}
