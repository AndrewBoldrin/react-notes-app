import { useState } from 'react';
import Layout from './components/layout/Layout';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {

  const [notepadList, setNotepadList] = useState([]);
  const [count, setCount] = useState(0);

  function handleNewClick() {
      setCount((prevCount) => prevCount + 1);
  }

  return (
    <Layout>
      <Component 
        {...pageProps}
        number={count}
        isNew={handleNewClick}
      />
    </Layout>
  );
}

export default MyApp;