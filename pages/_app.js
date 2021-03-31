import { useState } from 'react';
import SideBar from '../components/SideBar';
import Layout from '../components/layout/Layout';
import Note from '../components/Note';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {

  
  const [currentNotepadIndex, setCurrentNotepadIndex] = useState(0);
  const [count, setCount] = useState(0);
  const defaultNotepad = {name: 'untitled', notes: [<Note />]};
  const [notepadList, setNotepadList] = useState([
    // defaultNotepad
  ]);
  
  function handleNewClick() {
    setCount((prevCount) => prevCount + 1);
    setCurrentNotepadIndex(notepadList.length);
    let n = {name: 'untitled', notes: [<Note number={count}/>]};
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

  return (
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
      />
    </Layout>
  );
}

export default MyApp;