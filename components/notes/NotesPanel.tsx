'use client'

import { useState } from 'react'
import { Plus, StickyNote } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNotes } from '@/hooks/useNotes'
import { NoteItem } from './NoteItem'

export function NotesPanel() {
  const { notesForRange, currentRangeKey, addNewNote, editNote, removeNote } = useNotes()
  const [inputValue, setInputValue] = useState('')
  const [isAdding, setIsAdding] = useState(false)

  const handleAdd = () => {
    if (!inputValue.trim() || !currentRangeKey) return
    addNewNote(currentRangeKey, inputValue)
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
          <AnimatePresence mode="wait">
            {notesForRange.length > 0 && currentRangeKey && (
              <motion.span
                key={notesForRange.length}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.7 }}
                transition={{ duration: 0.15 }}
                className="notes-count"
              >
                ({notesForRange.length})
              </motion.span>
            )}
          </AnimatePresence>
        </div>
        <motion.button
          onClick={() => setIsAdding(true)}
          className="notes-add-btn"
          disabled={isAdding || !currentRangeKey}
          whileHover={{ scale: !isAdding && currentRangeKey ? 1.06 : 1 }}
          whileTap={{ scale: !isAdding && currentRangeKey ? 0.93 : 1 }}
          transition={{ type: 'spring', stiffness: 400, damping: 18 }}
          style={{ opacity: !currentRangeKey ? 0.4 : 1, cursor: !currentRangeKey ? 'not-allowed' : 'pointer' }}
        >
          <Plus size={11} /> Add
        </motion.button>
      </div>

      {/* Add form */}
      <AnimatePresence>
        {isAdding && currentRangeKey && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -8 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -4 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="note-input-wrapper"
            style={{ marginBottom: '0.5rem', overflow: 'hidden' }}
          >
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
              <motion.button
                onClick={handleAdd}
                disabled={!inputValue.trim()}
                className="notes-save-btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Save
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Notes list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
        <AnimatePresence mode="popLayout">
          {!currentRangeKey && (
            <motion.div
              key="empty-no-range"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="notes-empty"
            >
              <StickyNote size={22} strokeWidth={1.2} />
              <p>Select a date range<br />to see or add notes</p>
            </motion.div>
          )}

          {currentRangeKey && notesForRange.length === 0 && !isAdding && (
            <motion.div
              key="empty-range"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="notes-empty"
            >
              <p style={{ margin: 0, opacity: 0.7 }}>No notes for this selection.<br/>Click <strong>Add</strong> to create one.</p>
            </motion.div>
          )}
          {notesForRange.map((note) => (
            <NoteItem key={note.id} note={note} onEdit={editNote} onDelete={removeNote} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}
