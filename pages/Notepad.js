import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Note from '../components/Note';
import NewNotepadButton from '../components/NewNotepadButton';

const useStyles = makeStyles((theme) => ({
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
    },

    new: {
      position: 'absolute',
      bottom: '50px',
      right: '50px',
    },
  }));

function Notepad({notepadList, setNewNotepad, deleteNote, addNewNote}) {
      
  const classes = useStyles();

  function handleAddNewNote() {
    addNewNote();
  }

  function handleNewNotepad() {
    setNewNotepad();
  }

  function handleDeleteNote(noteIndex) {
    deleteNote(noteIndex);
  }

  function getNotepadName() {
    return notepadList.name;
  }

  return(
    <div className={classes.container} >
        {
          notepadList?.notes.length === 0 ? 'Nenhum existe nenhum notepad' : 
          notepadList?.notes.map((note, index) => {
            return (
              <div key={note.id}>
                <Note 
                  index={index} 
                  deleteNote={handleDeleteNote}
                  addNewNote={handleAddNewNote}
                  notepadName={getNotepadName}
                />
              </div>
            );
          })
        }
        <NewNotepadButton 
            setNewNotepad={handleNewNotepad}
        />
    </div>
  );
}

export default Notepad;