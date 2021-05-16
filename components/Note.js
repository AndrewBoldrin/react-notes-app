import { useState, useEffect, useRef, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';

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

    icon : {
        '&:hover': {
            fontSize: '1.7rem'
        }
    },
  });

export default function Note(props) {

    const [isDown, setIsDown] = useState(false);
    const [componentOffSetLeft, setComponentOffSetLeft] = useState();
    const [componentOffSetTop, setComponentOffSetTop] = useState();
    const [newX, setNewX] = useState(500);
    const [newY, setNewY] = useState(500);
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

            setNewX(newPosX);
            setNewY(newPosY);
        }
    }
        
    const mouseup = () => {
        setIsDown(false);
    }
        
    function handleMouseDown(event) {
        // distancia da esquerda e do topo do click do mouse no componente note
        const { offsetLeft, offsetTop } = noteRef.current;
        setIsDown(true);
        setComponentOffSetLeft(event.clientX - offsetLeft);
        setComponentOffSetTop(event.clientY - offsetTop);
    }

    function handleCloseNote() {
        props.deleteNote(props.notepadIndex, props.index);
    }
        
    return (
        <Card ref={noteRef} className={classes.card} style={{position: 'absolute', left: newX + 'px', top: newY + 'px'}}>
            <AppBar onMouseDown={() => handleMouseDown(event)} position="static">
                <Toolbar variant="dense">
                    {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton> */}
                    <Typography variant="h6" color="inherit">
                        Note {props.number}
                    </Typography>
                    <AddIcon className={classes.icon}/>
                    <CloseIcon onClick={handleCloseNote} className={classes.icon} />
                </Toolbar>
            </AppBar>
            <CardActionArea>
                <CardContent>
                    {/* <Typography gutterBottom variant="h5" component="h2">
                        Lizard
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                        across all continents except Antarctica
                    </Typography> */}
                    <TextareaAutosize className={classes.textArea} aria-label="empty textarea" placeholder="Empty" />;
                </CardContent>
            </CardActionArea>

        </Card>
    );
}