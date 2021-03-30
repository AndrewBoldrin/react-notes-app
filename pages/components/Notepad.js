import { useRouter } from 'next/router';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Note from './Note';
import NewNotepadButton from './NewNotepadButton';


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
        props.isNew();
        router.push('/components/Notepad');
      }

    console.log('notepad', props.number);
    return(
        <div>
            notepad nº: {props.number}
            <Note />
            <NewNotepadButton 
                isNew={handleNewClick}
            />
        </div>
    );
}

export default Notepad;