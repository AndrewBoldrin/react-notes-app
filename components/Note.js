import { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';
import PaletteIcon from '@material-ui/icons/Palette';
import Brightness1Icon from '@material-ui/icons/Brightness1';
import { 
    Card, 
    CardActionArea, 
    CardContent, 
    ListItem, 
    AppBar,
    TextareaAutosize,
    ListItemText,
    TextField,
    IconButton,
    Paper,
    Popper,
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
        fontSize: 16,

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
    paperContainer: {
        display: 'flex', 
        minWidth: 150, 
        maxWidth: 150,
        flexWrap: 'wrap',
    },
  });

export default function Note({ 
    note, 
    noteIndex, 
    noteMove,
    onAddNote,
    onCloseNote,
    onRenameNote,
    onChangeNoteColor,
    selectedNote,
    setSelectedNote,
    lastSelectedNote
}) {

    const [isDown, setIsDown] = useState(false);
    const [componentOffSetLeft, setComponentOffSetLeft] = useState();
    const [componentOffSetTop, setComponentOffSetTop] = useState();
    const [isEditing, setIsEditing] = useState(false);
    const [newName, setNewName] = useState();
    const [togglePalette, setTogglePalette] = useState(null);
    const noteRef = useRef(null);
    const classes = useStyles();

    const open = Boolean(togglePalette);
    const paletteColors = ['pink', 'purple', 'red', 'brown', 'green', 'blue'];
 
    useEffect(() => {
        document.addEventListener('mousemove', mousemove);
        document.addEventListener('mouseup', mouseup);
        if(selectedNote != noteIndex) {
            setSelectedNote(noteIndex);
        }

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

            if(newPosX > 305 && newPosY > 0) 
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
    
    function handleTogglePalette(event) {
        setTogglePalette(togglePalette ? null : event.currentTarget);
    }

    function handleChangeNoteColor(newColor) {
        onChangeNoteColor(noteIndex, newColor);
        setTogglePalette(null);
    }

    function handleAddNote() {
        onAddNote();
    }

    function handleTextAreaClick() {
        if(selectedNote != noteIndex)
            setSelectedNote(noteIndex);
    }

    function handleCloseNote() {
        setSelectedNote(lastSelectedNote);
        onCloseNote(noteIndex);
    }

    return (
        <Card 
            ref={noteRef} 
            className={classes.card} 
            style={{
                position: 'absolute', 
                left: note.x + 'px',
                top: note.y + 'px',
                zIndex: selectedNote==noteIndex ? 2 : 1,
            }}>
            <AppBar 
                onMouseDown={() => handleMouseDown(event)} 
                position="static"
                style={{ backgroundColor: note.color }}
            >
                <ListItem
                    style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                    { isEditing ?
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
                    <IconButton 
                        edge="end" 
                        aria-label="edit" 
                        onClick={ (event) => handleTogglePalette(event)}
                    >
                        <PaletteIcon className={classes.icon} />
                    </IconButton>

                    <Popper 
                        open={open} 
                        anchorEl={togglePalette}
                        placement="top"
                        style={{ zIndex: selectedNote==noteIndex ? 2 : 1, }}
                    >
                        <Paper 
                            className={classes.paperContainer }
                        >
                            { paletteColors.map((color) => {
                                return (
                                    <IconButton 
                                        key={ color.toString() } 
                                        value={ color }
                                        onClick={ () => handleChangeNoteColor(color) }
                                    >
                                        <Brightness1Icon style={{ color: color }}/>
                                    </IconButton>
                                );
                            })}
                        </Paper>
                    </Popper>

                    <IconButton 
                        onClick={ () => handleEditClick() }
                        aria-label="edit"
                        edge="end"
                    >
                        <EditIcon className={classes.icon} />
                    </IconButton>
                    <IconButton 
                        onClick={ () => handleAddNote() } 
                        edge="end" 
                    >
                        <AddIcon  className={classes.icon}/>
                    </IconButton>
                    <IconButton 
                        onClick={ () => handleCloseNote() } 
                        edge="end" 
                    >
                        <CloseIcon className={classes.icon} />
                    </IconButton>
                </ListItem>
            </AppBar>
            <CardActionArea>
                <CardContent>
                    <TextareaAutosize 
                        className={classes.textArea} 
                        aria-label="empty textarea" 
                        placeholder="Empty" 
                        onClick={ () => handleTextAreaClick() }
                    />;
                </CardContent>
            </CardActionArea>
        </Card>
    );
}