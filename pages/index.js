import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router';

export default function Home() {

  const router = useRouter();

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <button onClick={() => router.push('/components/Notepad')}>Next</button>

    </div>
  )
}
