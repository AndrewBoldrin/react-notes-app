import { useState } from 'react';
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

function Notepad({ 
  noteMove,
  notepad, 
  onNewNotepad, 
  onCloseNote, 
  onAddNote ,
  onRenameNote,
  onChangeNoteColor
}) {
      
  const classes = useStyles();
  const [selectedNote, setSelectedNote] = useState(0);

  function handleSeletedNote(noteIndex) {
    setSelectedNote(noteIndex);
  }

  return(
    <div className={classes.container} >
        {
          notepad?.notes?.length === 0 ? 'Nenhum existe nenhum notepad' : 
          notepad?.notes?.map((note, index, length) => {
            return (
              <Note
                key={index}
                note={note}
                noteIndex={index}
                notepadLength={length.length} 
                selectedNote={selectedNote}
                setSelectedNote={handleSeletedNote}
                noteMove={noteMove}
                onChangeNoteColor={onChangeNoteColor}
                onRenameNote={onRenameNote}
                onAddNote={onAddNote}
                onCloseNote={onCloseNote}
              />
            );
          })
        }
        <NewNotepadButton 
            onNewNotepad={onNewNotepad}
        />
    </div>
  );
}

export default Notepad;