import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import NoteIcon from '@material-ui/icons/Note';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete'
import { red } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    width: '300px',
    maxWidth: 300,
    minHeight: '100vh',
    borderRight: '1px solid #ccc',
    backgroundColor: theme.palette.background.paper
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },

  icon: {
    '&:hover': {
      fontSize: '1.7rem',
    }
  },
}));

export default function SideBar() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Notepads
        </ListSubheader>
      }
      className={classes.root}
    >
      <ListItem button>
        <ListItemIcon>
          <NoteIcon />
        </ListItemIcon>

        <ListItemText primary="Sent mail" />

        <ListItemIcon>
          <EditIcon  className={classes.icon}/>
        </ListItemIcon>

        <ListItemIcon>
          <DeleteIcon className={classes.icon} onClick={() => alert('aqui')} style={{color: red[500]}} />
        </ListItemIcon>

      </ListItem>
    </List>
  );
}
