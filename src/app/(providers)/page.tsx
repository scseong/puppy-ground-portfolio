'use client';
// import { useRouter } from 'next/router';
import MainGrid from '../_components/main/MainGrid';
import styles from './page.module.scss';
// import { useEffect } from 'react';

export default function Home() {
  // const router = useRouter();

  // useEffect(() => {
  //   if (router.query.alert) {
  //     alert(router.query.alert);
  //     router.push(router.pathname);
  //   }
  // }, [router]);

  return (
    <main className={styles.main}>
      <MainGrid />
    </main>
  );
}
