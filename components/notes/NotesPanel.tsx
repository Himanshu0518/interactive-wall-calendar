'use client'

import { useState } from 'react'
import { Plus, StickyNote } from 'lucide-react'
import { useNotes } from '@/hooks/useNotes'
import { NoteItem } from './NoteItem'

export function NotesPanel() {
  const { notesForRange, defaultNoteDate, addNewNote, editNote, removeNote } = useNotes()
  const [inputValue, setInputValue] = useState('')
  const [isAdding, setIsAdding] = useState(false)

  const handleAdd = () => {
    if (!inputValue.trim()) return
    addNewNote(defaultNoteDate, inputValue)
    setInputValue('')
    setIsAdding(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) handleAdd()
    if (e.key === 'Escape') { setInputValue(''); setIsAdding(false) }
  }

  return (
    <div className="notes-panel scroll-thin" style={{ overflowY: 'auto' }}>
      {/* Header row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <StickyNote size={13} style={{ opacity: 0.5 }} />
          <span className="notes-title">Notes</span>
          {notesForRange.length > 0 && (
            <span className="notes-count">({notesForRange.length})</span>
          )}
        </div>
        <button
          onClick={() => setIsAdding(true)}
          className="notes-add-btn"
          disabled={isAdding}
        >
          <Plus size={11} /> Add
        </button>
      </div>

      {/* Add form */}
      {isAdding && (
        <div className="note-input-wrapper" style={{ marginBottom: '0.5rem' }}>
          <textarea
            autoFocus
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Write a note… (Ctrl+Enter to save)"
            className="note-textarea"
            rows={3}
          />
          <div style={{ display: 'flex', gap: '0.4rem', marginTop: '0.4rem', justifyContent: 'flex-end' }}>
            <button
              onClick={() => { setInputValue(''); setIsAdding(false) }}
              className="notes-cancel-btn"
            >
              Cancel
            </button>
            <button
              onClick={handleAdd}
              disabled={!inputValue.trim()}
              className="notes-save-btn"
            >
              Save
            </button>
          </div>
        </div>
      )}

      {/* Notes list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
        {notesForRange.length === 0 && !isAdding && (
          <div className="notes-empty">
            <StickyNote size={22} strokeWidth={1.2} />
            <p>Select a date range<br />to see or add notes</p>
          </div>
        )}
        {notesForRange.map((note) => (
          <NoteItem key={note.id} note={note} onEdit={editNote} onDelete={removeNote} />
        ))}
      </div>
    </div>
  )
}
