import { useRouter } from 'next/router';
import { makeStyles } from '@material-ui/core/styles';
import Note from '../components/Note';
import NewNotepadButton from '../components/NewNotepadButton';


function Notepad(props) {

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
    
      const router = useRouter();
      const classes = useStyles();

      function handleNewClick() {
        props.setNewNotepad();
      }

    console.log('notepad', props.number);
    return(
        <div>
            notepad nº: {props.number}
            <Note />
            <NewNotepadButton 
                setNewNotepad={handleNewClick}
            />
        </div>
    );
}

export default Notepad;