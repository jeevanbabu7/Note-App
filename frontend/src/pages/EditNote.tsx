import React from 'react'
import NoteForm from '../components/NoteForm'
import { NoteData } from '../App'
import { Tag } from '../App'
import { useNote } from '../components/NoteLayout'

type NewNoteProps = {
  onSubmit(id: string, data: NoteData): void
  onAddTag(tag: Tag): void
  availableTags: Tag[]
}
const EditNote = ({onSubmit, onAddTag, availableTags}: NewNoteProps) => {
    const note = useNote();

  return (
    <div>
        <h2>Edit</h2>
      <NoteForm onSubmit={(data) => onSubmit(note.id, data)} onAddTag={onAddTag} availableTags={availableTags}
                note={note}
      />
    </div>
  )
}

export default EditNote
