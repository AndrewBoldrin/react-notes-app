import { useState } from 'react';
import SideBar from '../components/SideBar';
import Layout from '../components/layout/Layout';
import Note from '../components/Note';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {

  const defaultNotepad = {name: 'untitled', notes: [<Note />]};

  const [notepadList, setNotepadList] = useState([
    // defaultNotepad
  ]);
  const [currentNotepadIndex, setCurrentNotepadIndex] = useState(0);
  const [count, setCount] = useState(0);

  function handleNewClick() {
    setCount((prevCount) => prevCount + 1);
    setNotepadList([...notepadList, defaultNotepad]);
    setCurrentNotepadIndex(notepadList.length);
  }

  return (
    <Layout>
      <SideBar 
        isNew={handleNewClick}
        list={notepadList}
        setNewNotepad={handleNewClick}
      />
      <Component 
        {...pageProps}
        number={count}
        setNewNotepad={handleNewClick}
        list={notepadList}
      />
    </Layout>
  );
}

export default MyApp;