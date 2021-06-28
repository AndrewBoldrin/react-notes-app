import { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';
import PaletteIcon from '@material-ui/icons/Palette';
import { 
    Card, 
    CardActionArea, 
    CardContent, 
    ListItem, 
    ButtonGroup,
    AppBar,
    TextareaAutosize,
    ListItemText,
    TextField,
    IconButton
} from '@material-ui/core';

const useStyles = makeStyles({
    card: {
        minWidth: 300,
        maxWidth: 900,
        minHeight: 300,
        maxHeight: 900,
    },
    media: {
      height: 140,
    },
    textArea: {
        minWidth: 300,
        maxWidth: 900,
        minHeight: 300,
        maxHeight: 900,
        border: 'none',

        '&:focus': {
            outline: 'none',
        }
    },
    input: {
        color: 'white',
    },
    icon : {
        color: 'white',
    },
  });

export default function Note({ 
    note, 
    noteIndex, 
    notepadName, 
    noteMove,
    onAddNote,
    onCloseNote,
    onRenameNote
}) {

    const [isDown, setIsDown] = useState(false);
    const [componentOffSetLeft, setComponentOffSetLeft] = useState();
    const [componentOffSetTop, setComponentOffSetTop] = useState();
    const [isEditing, setIsEditing] = useState(false);
    const [newName, setNewName] = useState();
    const noteRef = useRef(null);
    const classes = useStyles();
 
    useEffect(() => {
        document.addEventListener('mousemove', mousemove);
        document.addEventListener('mouseup', mouseup);

        return () => {
            document.removeEventListener('mousemove', mousemove);
            document.removeEventListener('mouseup', mousemove);
        };
    }, [isDown]);

    const mousemove = (e) => {
        if(isDown) {
            let posX = e.clientX;
            let posY = e.clientY;
            let newPosX = posX - componentOffSetLeft;
            let newPosY = posY - componentOffSetTop;

            noteMove(noteIndex, newPosX, newPosY);
        }
    }
        
    const mouseup = () => {
        setIsDown(false);
    }
        
    function handleMouseDown(event) {
        // gap between mouse and note
        const { offsetLeft, offsetTop } = noteRef.current;
        setIsDown(true);
        setComponentOffSetLeft(event.clientX - offsetLeft);
        setComponentOffSetTop(event.clientY - offsetTop);
    }

    function handleEditClick() {
        setIsEditing(!isEditing);
    }

    function handleEdit(event) {
        onRenameNote(noteIndex, newName);
        setIsEditing(false);
        event.preventDefault();
    }
        
    return (
        <Card ref={noteRef} className={classes.card} style={{position: 'absolute', left: note.x + 'px', top: note.y + 'px'}}>
            <AppBar onMouseDown={() => handleMouseDown(event)} position="static">
                <ListItem
                    style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                    { 
                        isEditing ?
                        <form 
                            onSubmit={(event) => handleEdit(event)}
                            autoComplete="off"
                            >
                            <TextField 
                                id="standard-basic" 
                                style={{ maxWidth: 150 }}
                                defaultValue={note.name}
                                className={classes.editField}
                                InputProps={{ className: classes.input }}
                                onChange={() => setNewName(event.target.value)} 
                                autoFocus
                            />
                        </form> 
                        :
                        <ListItemText >{note.name}</ListItemText>
                    }
                    <ButtonGroup>
                        <IconButton edge="end" aria-label="edit">
                            <PaletteIcon className={classes.icon} />
                        </IconButton>
                        <IconButton 
                            onClick={ () => handleEditClick() }
                            aria-label="edit"
                            edge="end"
                        >
                            <EditIcon className={classes.icon} />
                        </IconButton>
                        <IconButton 
                            onClick={ onAddNote } 
                            edge="end" 
                        >
                            <AddIcon  className={classes.icon}/>
                        </IconButton>
                        <IconButton 
                            onClick={ () => onCloseNote(noteIndex) } 
                            edge="end" 
                        >
                            <CloseIcon className={classes.icon} />
                        </IconButton>
                    </ButtonGroup>
                </ListItem>
            </AppBar>
            <CardActionArea>
                <CardContent>
                    <TextareaAutosize className={classes.textArea} aria-label="empty textarea" placeholder="Empty" />;
                </CardContent>
            </CardActionArea>
        </Card>
    );
}