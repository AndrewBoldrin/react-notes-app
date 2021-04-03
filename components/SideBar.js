import React, { useState } from 'react';
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
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    width: '300px',
    maxWidth: 300,
    minHeight: '100vh',
    borderRight: '1px solid #ccc',
    backgroundColor: theme.palette.background.paper
  },

  icon: {
    // marginLeft: '5rem',
    // background: 'red',
    // fontSize: '1.5rem',
    // alignItems: 'center',

    '&:hover': {
      fontSize: '1.7rem',
    }
  },
  
  editField: {
    // background: 'red',
    // width: '200px',
    width: 0,
  
    padding: 0,
    margin: 0,
  },
}));

export default function SideBar(props) {

  const [edit, setEdit] = useState(-1); // indica o index do item que deve ser editado
  const [text, setText] = useState();
  const classes = useStyles();

  function handleClick(index) {
    props.changeShowedNotepad(index);
  }

  function handleEdit(event, index) {
    props.editNotepadName(text, index);
    setEdit(-1);
    event.preventDefault();
  }

  function handleDelete(event, index) {
    props.deleteNotepad(index);
    event.preventDefault();
  }

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
      {
        (props.list.length > 0) ?
        props.list.map((item, index) => {
          return (
            <ListItem 
              key={index}
              button
              onClick={() => handleClick(index)}
              >
              <ListItemIcon>
                <NoteIcon />
              </ListItemIcon>

              {
                edit === index ? 
                <form 
                  onSubmit={() => handleEdit(event, index)}
                  // className={classes.editField} 
                  autoComplete="off"
                >

                  <TextField id="standard-basic" label="Editing" onChange={() => setText(event.target.value)}/>
                </form>
                : <ListItemText primary={item.name} />
                
              }

              <ListItemIcon>
                <EditIcon button onClick={() => setEdit(index)} className={classes.icon}/>
              </ListItemIcon>

              <form 
                  onSubmit={() => handleDelete(event, index)}
                  className={classes.icon} 
                  autoComplete="off"
              >
                <ListItemIcon>
                  <DeleteIcon className={classes.icon} onClick={() => handleDelete(event, index)} style={{color: red[500]}} />
                </ListItemIcon>
              </form>
            </ListItem>
          );
        })
        : 
        <ListItem>
            <ListItemText primary="Vazio" />
        </ListItem>
      }
    </List>
  );
}
