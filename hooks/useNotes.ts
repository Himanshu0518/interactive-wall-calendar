import { useCallback, useMemo } from 'react'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { addNote, updateNote, deleteNote } from '@/store/slices/calendarSlice'
import type { Note } from '@/store/slices/calendarSlice'

export function useNotes() {
  const dispatch = useAppDispatch()
  const { notes, dateRange } = useAppSelector((s) => s.calendar)

  const currentRangeKey = useMemo(() => {
    if (!dateRange.start) return null
    const end = dateRange.end ?? dateRange.start
    const s = dateRange.start <= end ? dateRange.start : end
    const e = dateRange.start <= end ? end : dateRange.start
    return `${s}_${e}`
  }, [dateRange.start, dateRange.end])

  const addNewNote = useCallback(
    (rangeKey: string, content: string) => {
      if (!content.trim()) return
      dispatch(addNote({ rangeKey, content: content.trim() }))
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

  // Notes tied exactly to the currently selected date range
  const notesForRange = useMemo<Note[]>(() => {
    if (!currentRangeKey) return []
    return notes.filter((n) => n.rangeKey === currentRangeKey)
  }, [notes, currentRangeKey])

  // Check if a specific date lies inside ANY note's rangeKey interval
  const hasNotesOnDate = useCallback(
    (date: string) => {
      return notes.some((note) => {
        const [start, end] = note.rangeKey.split('_')
        return date >= start && date <= end
      })
    },
    [notes]
  )

  return {
    notes,
    notesForRange,
    hasNotesOnDate,
    currentRangeKey,
    addNewNote,
    editNote,
    removeNote,
  }
}

