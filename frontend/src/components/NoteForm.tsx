import { useState } from 'react'
import { Button, TextField } from '@mui/material'
import CreatableReactSelect from 'react-select/creatable'
import './NoteForm.css'
import { Tag, NoteData} from '../App'
import { v4 as uuid } from 'uuid';
import { useNavigate } from 'react-router-dom'

type NoteFormProps = {
    onSubmit(data: NoteData): void
    onAddTag(tag: Tag): void
    availableTags: Tag[]
    note?: NoteData
};
const NoteForm = ({onSubmit, onAddTag, availableTags, note}: NoteFormProps) => {
    
    const [title, setTitle] = useState(note?.title || '');
    const [markdown, setMarkdown] = useState(note?.markdown || '');
    const [selectedTags, setSelectedTags] = useState<Tag[]>(note?.tags || []);
    const navigate = useNavigate();

    const handleSubmit = (): void => {
        
        onSubmit({
            title, 
            markdown,
            tags: selectedTags
        });

        navigate("..");
    }


  return (
    <form className='note-form'>
        <div className='top-container'>
            <div className='title-field'>
                <p>Title</p>
                <TextField 
                    sx={{
                        width: '20rem'
                    }}
                    variant='standard' 
                    onChange={(e) => setTitle(e.target.value)}
                    autoFocus
                    value={title}
                />
            </div>
            <div className='tag-field'>
                <p>Tags</p>
                {/* <TextField variant='standard' 
                    sx={{width: '20rem'}}
                /> */}
                <CreatableReactSelect 
                    value={selectedTags.map(tag => {
                        return {label: tag.label, value: tag.id}
                    })} 
                    onCreateOption={label => {
                        const newTag = {id: uuid(), label};
                        onAddTag(newTag);
                        setSelectedTags((prev => [...prev, newTag]));
                    }}
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

        <div className='body-container'>

            <TextField 
                label='Body' 
                variant='outlined' multiline
                sx={{
                    width:'90%',
                    marginTop: '2rem'
                    
                }}
                value={markdown}
                rows={14}
                onChange={(e) => setMarkdown(e.target.value)}
            />
        </div>

        <div className='form-btns'>
            <Button variant='contained'color='primary' onClick={handleSubmit}>Save</Button>
            <Button variant='contained' color='error' onClick={() => navigate("/")}>Cancel</Button>
        </div>
    </form>
  )
}

export default NoteForm
