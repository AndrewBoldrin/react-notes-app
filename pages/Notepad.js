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

function Notepad({notepadIndex, list, setNewNotepad, number, deleteNote}) {
      
  const classes = useStyles();

  function handleNewClick() {
    setNewNotepad(number);
  }

  function handleDeleteNote(notepadIndex, noteIndex) {
    deleteNote(notepadIndex, noteIndex);
  }

  return(
    <div className={classes.container} >
        {
          notepadIndex === false || list[notepadIndex].notes.length === 0 ? 'Nenhum existe nenhum notepad' : 
          list[notepadIndex].notes.map((note, index) => {
            return (
              <div key={note.id}>
                <Note notepadIndex={notepadIndex} index={index} deleteNote={handleDeleteNote}/>
              </div>
            );
          })
        }
        <NewNotepadButton 
            setNewNotepad={handleNewClick}
        />
    </div>
  );
}

export default Notepad;