import { Button } from '@mui/material'
import React, { useMemo, useState } from 'react'
import './NoteList.css'
import ReactSelect from 'react-select'
import { Link } from 'react-router-dom'
import { Note, Tag } from '../App'
import NoteCard from './NoteCard'

type NoteListProps = {
    availableTags: Tag[]
    notes: Note[]
}


const NoteList = ({availableTags, notes}: NoteListProps) => {
    const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
    const [title, setTitle] = useState("");
    const filteredNotes = useMemo(() => {
        return notes.filter(note => {
            return (title == "" || note.title?.toLowerCase().includes(title.toLocaleLowerCase())) && 
                    (selectedTags.length == 0 || selectedTags.every(tag => note.tags.some(noteTag => tag.id == noteTag.id)))
        });
    },[title, selectedTags, notes]);

  return (
    <>
        <div className='header'>
            <h2>Notes</h2>
            <div className='header-btn'>
                <Link to='/new'>
                    <Button
                        variant='contained'
                        color='primary'
                    >Create + </Button>
                </Link>
                {/* <Button
                    variant='outlined'
                    color='info'
                >
                    Edit tags
                </Button> */}
            </div>
        </div>
        <div className="search-container">
            <div className="search">
                <label htmlFor="title">Title</label>
                <input autoFocus type="text" id='title' placeholder='Enter title' value={title} onChange={(e) => setTitle(e.target.value)}/>
            </div>
            <div className="tags">
                <label htmlFor="">Tags</label>
                    <ReactSelect 
                        value={selectedTags.map(tag => {
                            return {label: tag.label, value: tag.id}
                        })}

                        options={availableTags.map(tag => {
                            return {label: tag.label, value: tag.id}
                        })}
                        
                        onChange={tags => {
                        setSelectedTags(tags.map((tag) => {
                            return  {label: tag.label, id: tag.value}
                        }));
                    }}
                
                    isMulti />
            </div>
        </div>
        <div className="notes-container">
            {filteredNotes.map(note => {
                console.log(note);
                
                return (<NoteCard key={note.id} id={note.id} title={note.title} tags={note.tags}/>)
            })}
        </div>
    </>
  )
}


export default NoteList
