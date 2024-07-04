import { useMemo } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import useLocalStorage from './hooks/useLocalStorage.ts';
import NewNote from './pages/NewNote';
import { v4 as uuid } from 'uuid';
import NoteList from './components/NoteList.tsx';
import NoteLayout from './components/NoteLayout.tsx';
import Note from './components/Note.tsx';
import EditNote from './pages/EditNote.tsx';

export type Note = NoteData & {
  id: string;
};

export type Tag = {
  id: string;
  label: string;
};

export type NoteData = {
  title: string 
  markdown: string 
  tags: Tag[];
};

export type RowNote = {
  id: string;
} & RowNoteData;

export type RowNoteData = {
  title: string 
  markdown: string 
  tagIds: string[];
};

function App() {
  const [notes, setNotes] = useLocalStorage<RowNote[]>('NOTES', []);
  const [tags, setTags] = useLocalStorage<Tag[]>('TAGS', []);

  console.log(notes);
  
  const notesWithTag = useMemo(() => {
    return notes.map((note) => {
      return { ...note, tags: tags.filter((tag) => note.tagIds.includes(tag.id))};
    });
  }, [notes, tags]);

  function onCreateNote({ tags, ...data }: NoteData) {
    console.log(data);
    
    setNotes([...notes, { ...data, id: uuid(), tagIds: tags.map((tag) => tag.id) }]);
  }

  function addTag(tag: Tag) {
    setTags(prev => [...prev, tag]);
  }
  function onUpdateNote(id: string, {tags, ...data}: NoteData) {
    setNotes((prev) => {
      return prev.map((note) => {
        if (note.id === id) {
          return { ...note, ...data, tagIds: tags.map((tag) => tag.id) };
        }
        return note;
      });
    });
  }

  function onDelete(id: string) {
    setNotes(prevNote => {
      return prevNote.filter(note => note.id != id);
    });
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<NoteList availableTags={tags} notes={notesWithTag}/>} />
          <Route path="/new" element={<NewNote onSubmit={onCreateNote} onAddTag={addTag} availableTags={tags}/>} />
          <Route path="/:id" element={<NoteLayout notes={notesWithTag}/>}>
            <Route index element={<Note onDelete={onDelete}/>} />
            <Route path="edit" element={<EditNote onSubmit={onUpdateNote} onAddTag={addTag} availableTags={tags}/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
