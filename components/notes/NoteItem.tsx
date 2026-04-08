'use client'

import { useState, useRef, useEffect } from 'react'
import { Pencil, Trash2, Check, X } from 'lucide-react'
import { motion } from 'framer-motion'
import { format, parseISO } from 'date-fns'
import type { Note } from '@/store/slices/calendarSlice'

interface NoteItemProps {
  note: Note
  onEdit: (id: string, content: string) => void
  onDelete: (id: string) => void
}

export function NoteItem({ note, onEdit, onDelete }: NoteItemProps) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(note.content)
  const [hovered, setHovered] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (editing) textareaRef.current?.focus()
  }, [editing])

  const handleSave = () => {
    if (draft.trim()) onEdit(note.id, draft.trim())
    setEditing(false)
  }

  const handleCancel = () => {
    setDraft(note.content)
    setEditing(false)
  }

  // Use date-fns for consistent formatting. Handle both single day and range.
  const [startD, endD] = note.rangeKey.split('_')
  const formattedStart = format(parseISO(startD), 'MMM d')
  const formattedDate =
    startD === endD
      ? formattedStart
      : `${formattedStart} – ${format(parseISO(endD), 'MMM d')}`

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: -20, scale: 0.95, height: 0, marginBottom: 0, paddingTop: 0, paddingBottom: 0 }}
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      className="note-item"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.4rem' }}>
        <span className="note-date-label">{formattedDate}</span>

        <motion.div
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.15 }}
          style={{ display: 'flex', gap: '0.2rem' }}
        >
          {!editing ? (
            <>
              <motion.button
                onClick={() => setEditing(true)}
                className="note-action-btn"
                aria-label="Edit note"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.85 }}
              >
                <Pencil size={11} />
              </motion.button>
              <motion.button
                onClick={() => onDelete(note.id)}
                className="note-action-btn note-delete-btn"
                aria-label="Delete note"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.85 }}
              >
                <Trash2 size={11} />
              </motion.button>
            </>
          ) : (
            <>
              <motion.button
                onClick={handleSave}
                className="note-action-btn note-save-btn-inline"
                aria-label="Save"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.85 }}
              >
                <Check size={11} />
              </motion.button>
              <motion.button
                onClick={handleCancel}
                className="note-action-btn"
                aria-label="Cancel"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.85 }}
              >
                <X size={11} />
              </motion.button>
            </>
          )}
        </motion.div>
      </div>

      {editing ? (
        <motion.textarea
          ref={textareaRef}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) handleSave()
            if (e.key === 'Escape') handleCancel()
          }}
          className="note-textarea"
          style={{ marginTop: '0.25rem' }}
          rows={3}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.15 }}
        />
      ) : (
        <motion.p
          className="note-content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.15 }}
        >
          {note.content}
        </motion.p>
      )}
    </motion.div>
  )
}
