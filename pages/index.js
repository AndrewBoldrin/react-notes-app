import Head from 'next/head'
// import styles from '../styles/Home.module.css'
import { makeStyles } from '@material-ui/core/styles';
import { useRouter } from 'next/router';
import NewNotepadButton from '../components/NewNotepadButton';

export default function Home(props) {

  const useStyles = makeStyles((theme) => ({
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
    },
  }));

  const classes = useStyles();
  const router = useRouter();

  function handleNewClick() {
    props.newNotepad();
    props.isNew();
    router.push('/Notepad');
  }

  return (
    <div className={classes.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
      </Head>
      {/* {props.number} */}
      <h1>Pagina inicial</h1>
      {props.list.length === 0 ? 'vazio' : 
      'alguma coisa'}
      {/* {props.list[0].notes} */}
      {/* <Note /> */}
      <NewNotepadButton 
        isNew={handleNewClick}
        newNotepad={handleNewClick}
      />      

    </div>
  )
}
