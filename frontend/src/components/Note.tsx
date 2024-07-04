import React from 'react'
import { useNote } from './NoteLayout'
import { Box, Button, Modal, Typography } from '@mui/material';
import './Note.css'
import { Link, useNavigate } from 'react-router-dom';
import { MuiMarkdown } from 'mui-markdown';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  type NoteProps = {
    onDelete(id: string): void
  }

const Note = ({onDelete}: NoteProps) => {
    const Note = useNote();
    const navigate = useNavigate();
    const boxStyles = {
        display: "flex",
        justifyContent: 'space-between',
        
    };

    // modal............
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    function handleDelete() {
        onDelete(Note.id);
        navigate('/');
    }


  return (
        <>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Are you sure.. ?
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Click yes to delete the note.
                    <Box
                        sx={{
                            paddingTop: '2rem',
                            display: 'flex',
                            gap: '1rem'
                        }}
                    >
                        <Button variant='contained' color='error' onClick={handleDelete}>Yes</Button>
                        <Button variant='contained' color='info'>Cancel</Button>
                    </Box>
                </Typography>
                </Box>
            </Modal>

            <div className='note-header' style={{
                ...boxStyles,
                padding: '1rem'

            }}>
                <Box
                    sx={{
                        ...boxStyles,
                        gap: "1rem",
                        flexDirection: "column",
                    }}
                >
                    <h2>{Note.title}</h2>
                    <div className="note-tags">
                        {Note.tags.map((tag, index) => {
                            return (
                                <div key={index} className="tag">
                                    <p>{tag.label}</p>
                                </div>
                            )
                        })}
                    </div>
                </Box>

                <div className='btn-container'>
                    <Link to={`/${Note.id}/edit`}>
                        <Button variant='contained' color='info'>Edit</Button>
                    </Link>
                    <Button onClick={handleOpen} variant='outlined' color='error'>Delete</Button>
                    <Link to='/'>
                        <Button variant='text' color='secondary'>Back</Button>
                    </Link>
                </div>
            </div>

            <Box
                sx={{
                    padding: '1.6rem'
                }}
            >
                <MuiMarkdown>{Note.markdown}</MuiMarkdown>
                
            </Box>
        </>
    )
}

export default Note
