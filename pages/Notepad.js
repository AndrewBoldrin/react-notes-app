import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
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

function Notepad({notepadIndex, list, setNewNotepad, number}) {
      
  const classes = useStyles();

  function handleNewClick() {
    setNewNotepad(number);
  }

  return(
    <div className={classes.container} >
        {
          notepadIndex === false ? 'Nenhum existe nenhum notepad' : 
          list[notepadIndex].notes.map((item) => {
            return <div>{item}</div>;
          })
        }
        <NewNotepadButton 
            setNewNotepad={handleNewClick}
        />
    </div>
  );
}

export default Notepad;