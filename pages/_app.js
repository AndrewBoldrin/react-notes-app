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

  const [count, setCount] = useState(0);

  function handleNewNotepad() {
    setNotepadList([...notepadList, defaultNotepad]);
  }

  function handleNewClick() {
      setCount((prevCount) => prevCount + 1);
  }

  return (
    <Layout>
      <SideBar 
        isNew={handleNewClick}
        list={notepadList}
        newNotepad={handleNewNotepad}
      />
      <Component 
        {...pageProps}
        number={count}
        isNew={handleNewClick}
        list={notepadList}
        newNotepad={handleNewNotepad}
      />
    </Layout>
  );
}

export default MyApp;