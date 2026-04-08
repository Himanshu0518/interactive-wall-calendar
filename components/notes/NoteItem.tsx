'use client'

import { useState, useRef, useEffect } from 'react'
import { Pencil, Trash2, Check, X } from 'lucide-react'
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

  const formatDate = (dateStr: string) =>
    new Date(dateStr + 'T00:00:00').toLocaleDateString('en-US', {
      month: 'short', day: 'numeric',
    })

  return (
    <div
      className="note-item"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.4rem' }}>
        <span className="note-date-label">{formatDate(note.date)}</span>

        <div style={{
          display: 'flex', gap: '0.2rem',
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.15s',
        }}>
          {!editing ? (
            <>
              <button onClick={() => setEditing(true)} className="note-action-btn" aria-label="Edit note">
                <Pencil size={11} />
              </button>
              <button onClick={() => onDelete(note.id)} className="note-action-btn note-delete-btn" aria-label="Delete note">
                <Trash2 size={11} />
              </button>
            </>
          ) : (
            <>
              <button onClick={handleSave} className="note-action-btn note-save-btn-inline" aria-label="Save">
                <Check size={11} />
              </button>
              <button onClick={handleCancel} className="note-action-btn" aria-label="Cancel">
                <X size={11} />
              </button>
            </>
          )}
        </div>
      </div>

      {editing ? (
        <textarea
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
        />
      ) : (
        <p className="note-content">{note.content}</p>
      )}
    </div>
  )
}
