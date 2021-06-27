import { useState } from 'react';
import SideBar from '../components/SideBar';
import Layout from '../components/layout/Layout';
import '../styles/globals.css';
import React from 'react';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from '../styles/theme';

export default function MyApp({ Component, pageProps }) {

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);
  
  const [currentNotepadIndex, setCurrentNotepadIndex] = useState(0);
  const defaultNote = {text: '', x: 600, y: 300, colour: 'blue'};
  const defaultNotepad = {name: 'untitled', notes: [ defaultNote ]};
  const [notepadList, setNotepadList] = useState([  ]);

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

  function updateNotepadList(updatedNoteList) {
    let updatedNotepadList = notepadList.map((item, index) => {
      if(index == currentNotepadIndex) {
        let changedNotepad = {name: item.name, notes: updatedNoteList};
        return changedNotepad;
      }
      return item;
    });
    return updatedNotepadList;
  }

  function handleNoteMove(noteIndex, posX, posY) {
    let updatedNoteList = updateNotePosition(noteIndex, posX, posY);
    let updatedNotepadList = updateNotepadList(updatedNoteList);

    setNotepadList(updatedNotepadList);
  }

  function onAddNote() {
    let newNotepadList = notepadList.map((item, index) => {
      if(index == currentNotepadIndex) 
        item.notes.push(defaultNote);
      return item;
    })
    setNotepadList(newNotepadList);
  }
  
  function onNewNotepad() {
    setNotepadList([...notepadList, defaultNotepad]);
    setCurrentNotepadIndex(notepadList.length);
  }

  function changeActiveNotepad(index) {
    setCurrentNotepadIndex(index);
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

  // removing note from notes list and returning a new note list
  function removeNote(noteIndex) {
    let newNotesList = notepadList[currentNotepadIndex].notes.filter((item, index) => {
      if(index !== noteIndex) {
        return item;
      }
    });
    return newNotesList;
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
    <React.Fragment>
      <Head>
        <title>My page</title>
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
            notepadList={notepadList[currentNotepadIndex]}
            onNewNotepad={onNewNotepad}
            noteMove={handleNoteMove}
            onAddNote={onAddNote}
            onCloseNote={onCloseNote}
          />
        </Layout>
      </ThemeProvider>
    </React.Fragment>
  );
}

// export default MyApp;