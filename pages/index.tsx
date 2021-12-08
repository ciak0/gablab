import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => (
  <div className={styles.container}>
    <Head>
      <title>Gablab.dev</title>
      <meta name="description" content="Gablab development website" />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main className={styles.main}>
      <h1 className={styles.title}>
        Welcome to Gablab
      </h1>

      <p className={styles.description}>
        Something nice here
      </p>

      <div className={styles.grid}>
        <a href="https://nextjs.org/docs" className={styles.card}>
          <h2>Documentation &rarr;</h2>
          <p>Find in-depth information about Next.js features and API.</p>
        </a>
      </div>
    </main>

    <footer className={styles.footer}>
      Made with ❤️ by Gab
    </footer>
  </div>
);

export default Home;
