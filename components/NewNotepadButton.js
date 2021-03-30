import { useRouter } from 'next/router';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';


export default function NewNotepadButton(props) {    
    const useStyles = makeStyles((theme) => ({
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
        router.push('../Notepad');
    }

    return (
        <Fab onClick={handleNewClick} className={classes.new} color="primary" aria-label="add">
            <AddIcon />
        </Fab>
    );

}