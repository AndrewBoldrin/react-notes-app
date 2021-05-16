import { useState } from 'react';
import SideBar from '../components/SideBar';
import Layout from '../components/layout/Layout';
import Note from '../components/Note';
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
  const [count, setCount] = useState(0);
  const defaultNotepad = {name: 'untitled', notes: [<Note />]};
  const [notepadList, setNotepadList] = useState([
    // defaultNotepad
  ]);
  
  function handleNewClick() {
    setCount((prevCount) => prevCount + 1);
    setCurrentNotepadIndex(notepadList.length);
    let n = {name: 'untitled', notes: [<Note number={count} />]};
    setNotepadList([...notepadList, n]);
  }

  function changeShowedNotepad(index) {
    setCurrentNotepadIndex(index);
  }

  function editNotepadName(text, index) {
    notepadList.forEach((item) => {
      if(notepadList.indexOf(item) === index) {
        item.name = text;
        return item;
      }
      return item;
    })
  }

  function deleteNotepad(index) {
    let newNotepadList = [];
    notepadList.forEach((item) => {
      if(notepadList.indexOf(item) !== index) {
        newNotepadList.push(item);
      }
    })
    setNotepadList(newNotepadList);
  }

  function deleteNote(notepadIndex, noteIndex) {
    if(notepadList[notepadIndex].notes.length > 1) {
        let newNotesList = [];
        let newNotepadList = [];
    
        notepadList[notepadIndex].notes.forEach((item) => {
          if(notepadList[notepadIndex].notes.indexOf(item) !== noteIndex) {
            newNotesList.push(item);
          }
        });
    
        notepadList.forEach((item) => {
          if(notepadList.indexOf(item) !== notepadIndex) {
            newNotepadList.push(item);
          } else {
            newNotepadList.push({name: item.name, notes: [...newNotesList]});
          }
        })
    
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
            isNew={handleNewClick}
            list={notepadList}
            setNewNotepad={handleNewClick}
            changeShowedNotepad={changeShowedNotepad}
            editNotepadName={editNotepadName}
            deleteNotepad={deleteNotepad}
          />
          <Component 
            {...pageProps}
            setNewNotepad={handleNewClick}
            list={notepadList}
            notepadIndex={notepadList.length === 0 ? false : currentNotepadIndex}
            deleteNote={deleteNote}
          />
        </Layout>
      </ThemeProvider>
    </React.Fragment>
  );
}

// export default MyApp;