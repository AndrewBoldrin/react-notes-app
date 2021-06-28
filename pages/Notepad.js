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
  notepadList, 
  onNewNotepad, 
  onCloseNote, 
  onAddNote ,
  onRenameNote
}) {
      
  const classes = useStyles();

  function getNotepadName() {
    return notepadList.name;
  }

  return(
    <div className={classes.container} >
        {
          notepadList?.notes?.length === 0 ? 'Nenhum existe nenhum notepad' : 
          notepadList?.notes?.map((note, index) => {
            return (
              <Note
                key={index}
                note={note}
                noteIndex={index} 
                notepadName={getNotepadName}
                noteMove={noteMove}
                onAddNote={onAddNote}
                onCloseNote={onCloseNote}
                onRenameNote={onRenameNote}
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