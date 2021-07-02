import Head from 'next/head'
import { makeStyles } from '@material-ui/core/styles';
import NewNotepadButton from '../components/NewNotepadButton';

export default function Home({ onNewNotepad }) {

  const useStyles = makeStyles((theme) => ({
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
    },
  }));

  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Head>
        <title>Notes App</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
      </Head>
      
      <h1>Select or create a notepad</h1>

      <NewNotepadButton 
        onNewNotepad={onNewNotepad}
      /> 

    </div>
  )
}
