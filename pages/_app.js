import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import SideBar from '../components/SideBar';
import Layout from '../components/layout/Layout';
import '../styles/globals.css';
import React from 'react';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from '../styles/theme';

export default function MyApp({ Component, pageProps }) {

  const router = useRouter();
  const initialNoteXPos = 310;
  const initialNoteYPos = 10;
  const [currentNotepadIndex, setCurrentNotepadIndex] = useState(0);
  const defaultNote = {
    name: 'Note', 
    text: '', 
    x: initialNoteXPos, 
    y: initialNoteYPos, 
    width: 100,
    heihgt: 100,
    color: 'blue'
  };
  const defaultNotepad = {name: 'untitled', notes: [ defaultNote ]};
  const windowGlobal = typeof window !== 'undefined' && window;
  const [mounted, setMounted] = useState(false);

  const [notepadList, setNotepadList] = useState(
    windowGlobal ? JSON.parse(windowGlobal.localStorage.localNotepadList) : []
  );
  
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    windowGlobal.localStorage.setItem("localNotepadList", JSON.stringify(notepadList));
  }, [notepadList]);
  
  function updateNotepadList(updatedNoteList) {
    let updatedNotepadList = notepadList.map((notepad, index) => {
      if(index == currentNotepadIndex) {
        notepad.notes = updatedNoteList;
      }
      return notepad;
    });
    return updatedNotepadList;
  }
  
  function onNewNotepad() {
    setNotepadList([...notepadList, defaultNotepad]);
    setCurrentNotepadIndex(notepadList.length);
  }
  
  function changeActiveNotepad(index) {
    setCurrentNotepadIndex(index);
    if(notepadList) 
      router.push('/Notepad', undefined, { shallow: true });
  }
  
  function onEditNotepadName(text, notepadIndex) {
    let newNotepadList = notepadList.map((item, index) => {
      if(index == notepadIndex) {
        item.name = text;
      }
      return item;
    });
    setNotepadList(newNotepadList);
  }
  
  function onDeleteNotepad(notepadIndex) {
    let newNotepadList = notepadList.filter((item, index) => {
      if(index !== notepadIndex) 
        return item;
    });
    setNotepadList(newNotepadList);
  }

  function updateNotePosition(noteIndex, posX, posY) {
    let updatedNoteList = notepadList[currentNotepadIndex].notes.map((item, index) => {
      if(noteIndex == index) {
        item.x = posX;
        item.y = posY;
      }
      return item;
    });
    return updatedNoteList;
  }

  function handleNoteMove(noteIndex, posX, posY) {
    let updatedNoteList = updateNotePosition(noteIndex, posX, posY);
    let updatedNotepadList = updateNotepadList(updatedNoteList);

    setNotepadList(updatedNotepadList);
  }

  // return the array of notes with new color
  function changeNoteColor(noteIndex, newColor) {
    let newNotes = notepadList[currentNotepadIndex].notes.map((item, index) => {
      if(noteIndex == index) 
        item.color = newColor;
      return item;
    });
    return newNotes;
  }

  function onChangeNoteColor(noteIndex, newColor) {
    let newNotes = changeNoteColor(noteIndex, newColor);
    let newNotepadList = updateNotepadList(newNotes);
    setNotepadList(newNotepadList);
  }

  // return list of notes with the renamed note
  function renameNote(noteIndex, newName) {
    let newNotes = notepadList[currentNotepadIndex].notes.map((note, index) => {
      if(index == noteIndex)
        note.name = newName;
      return note;
    });
    return newNotes;
  }

  function onRenameNote(noteIndex, newName) {
    let newNotes = renameNote(noteIndex, newName);
    let newNotepadList = updateNotepadList(newNotes);
    setNotepadList(newNotepadList);
  }
  
  // removing note from notes list and returning a new note list
  function removeNote(noteIndex) {
    let newNotesList = notepadList[currentNotepadIndex].notes.filter((item, index) => {
      if(index !== noteIndex) {
        return item;
      }
    });
    return newNotesList;
  }

  function changeNoteText(noteIndex, text) {
    let newNotes = notepadList[currentNotepadIndex].notes.map((note, index) => {
      if(noteIndex == index)
        note.text = text;
      return note;
    });
    return newNotes;
  }

  function handleChangeText(noteIndex, text) {
    let newNotes = changeNoteText(noteIndex, text);
    let newNotepadList = updateNotepadList(newNotes);
    setNotepadList(newNotepadList);
  }

  function changeTextAreaSize(noteIndex, noteWidth, noteHeight) {
    let newNotes = notepadList[currentNotepadIndex].notes.map((note, index) => {
      if(noteIndex == index) {
        note.width = noteWidth;
        note.height = noteHeight;
      }
      return note;
    });
    return newNotes;
  }

  function handleChangeTextAreaSize(noteIndex, noteWidth, noteHeight) {
    let newNotes = changeTextAreaSize(noteIndex, noteWidth, noteHeight);
    let newNotepadList = updateNotepadList(newNotes);
    setNotepadList(newNotepadList);
  }

  function getNewNotePos() {
    let fittingNumber = Math.trunc((document.documentElement.clientWidth - 310) / 310); 
    let notesLength = notepadList[currentNotepadIndex].notes.length;
    let yLine = Math.trunc(notesLength / fittingNumber);

    let newPosX = initialNoteXPos + (340 * (notesLength - (fittingNumber * yLine)));
    let newPosY = initialNoteYPos + ((310 * Math.trunc(yLine)) );

    return {x: newPosX, y: newPosY};
  }

  function onAddNote() {
    let newPos = getNewNotePos();
    let newNote = {name: 'Note', text: '', x: newPos.x, y: newPos.y, color: 'blue', width: 300, height: 300};
    let newNotepadList = notepadList.map((item, index) => {
      if(index == currentNotepadIndex)
        item.notes.push(newNote);
      return item;
    })
    setNotepadList(newNotepadList);
  }
  
  // only close a note if there is more than one note in the note list
  function onCloseNote(noteIndex) {
    if(notepadList[currentNotepadIndex].notes.length > 1) {
      let newNotesList = removeNote(noteIndex);
      let newNotepadList = updateNotepadList(newNotesList);
      setNotepadList(newNotepadList);
    }
  }

  return (
    mounted &&
    <React.Fragment>
      <Head>
        <title>Notes App</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <Layout>
          <SideBar 
            notepadList={notepadList}
            currentNotepadIndex={currentNotepadIndex}
            changeActiveNotepad={changeActiveNotepad}
            onEditNotepadName={onEditNotepadName}
            onDeleteNotepad={onDeleteNotepad}
          />
          <Component 
            {...pageProps}
            notepad={notepadList[currentNotepadIndex]}
            onNewNotepad={onNewNotepad}
            noteMove={handleNoteMove}
            onChangeNoteColor={onChangeNoteColor}
            onRenameNote={onRenameNote}
            onAddNote={onAddNote}
            onCloseNote={onCloseNote}
            handleChangeText={handleChangeText}
            handleChangeTextAreaSize={handleChangeTextAreaSize}
          />
        </Layout>
      </ThemeProvider>
    </React.Fragment>
  );
}