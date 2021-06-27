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
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    width: '300px',
    maxWidth: 300,
    minHeight: '100vh',
    borderRight: '1px solid #ccc',
    backgroundColor: theme.palette.background.paper
  },
}));

export default function SideBar({ 
 notepadList, 
 changeActiveNotepad, 
 onEditNotepadName, 
 onDeleteNotepad,
 currentNotepadIndex
}) {

  const [edit, setEdit] = useState(-1);
  const [text, setText] = useState();
  const classes = useStyles();

  function handleEditNotepad(event, index) {
    onEditNotepadName(text, index);
    setEdit(-1);
    event.preventDefault();
  }

  function handleDeleteNotepad(event, index) {
    onDeleteNotepad(index);
    event.preventDefault();
  }

  function handleEditClick(index) {
    if(edit == -1) 
      setEdit(index);
    else if(edit == index)
      setEdit(-1);
    else 
      setEdit(index);
  }

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">Notepads</ListSubheader>
      }
      className={classes.root}
    >
      {
        (notepadList.length > 0) ?
        notepadList.map((item, index) => {
          return (
            <ListItem 
              key={index}
              selected={currentNotepadIndex == index}
              button
              onClick={() => changeActiveNotepad(index)}
              >
              <ListItemIcon>
                <NoteIcon />
              </ListItemIcon>

              {
                edit === index ? 
                <form 
                  onSubmit={() => handleEditNotepad(event, index)}
                  autoComplete="off"
                >

                  <TextField id="standard-basic" defaultValue={item.name} onChange={() => setText(event.target.value)} autoFocus/>
                </form>
                : <ListItemText primary={item.name} />
                
              }

              <IconButton aria-label="edit"
                onClick={() => handleEditClick(index)} 
              >
                <EditIcon />
              </IconButton>

              <IconButton 
                edge="end" 
                aria-label="delete"
                onClick={() => handleDeleteNotepad(event, index)} 
              >
                <DeleteIcon style={ {color: red[500]} } />
              </IconButton>
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
