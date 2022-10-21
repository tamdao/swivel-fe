import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>SwivelTech</title>
        <meta
          name="description"
          content="SwivelTech Practical Assignment - Sr.Level"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Link href="/employee/list">
          <a className={styles.card}>
            <h2>Goto Employees &rarr;</h2>
          </a>
        </Link>
      </main>
    </div>
  );
};

export default Home;
