import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
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

    // textArea: {
    //     width: '100%',
    //     height: '100%',
    // },

    icon : {
        '&:hover': {
            fontSize: '1.7rem'
        }
    },

    // btnClose: {
    //     '&:hover': {
    //         fontSize: '1.7rem'
    //     }
    // }
  });

export default function Note(props) {

    const classes = useStyles();

    return (
        <div>
            notepad nº: {props.number}
            <Card className={classes.card}>
                <AppBar position="static">
                    <Toolbar variant="dense">
                        {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                            <MenuIcon />
                        </IconButton> */}
                        <Typography variant="h6" color="inherit">
                            Note {props.number}
                        </Typography>
                        <AddIcon className={classes.icon}/>
                        <CloseIcon className={classes.icon} />
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
                        <TextareaAutosize className={classes.card} aria-label="empty textarea" placeholder="Empty" />;
                    </CardContent>
                </CardActionArea>

            </Card>
        </div>
    );
}