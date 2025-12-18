import Link from 'next/link';
import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import MungstaPosts from './_components/root/MungstaPosts';
import { Main } from '@/app/_components/layout';
import styles from './page.module.scss';

export const metadata: Metadata = {
  title: '멍스타그램 | Puppy Ground',
  description: '#멍스타그램 #강아지일상 #댕댕이. 지금 가장 핫한 댕댕이들의 일상을 확인하세요!',
  openGraph: {
    title: '멍스타그램 | Puppy Ground',
    description: '#멍스타그램 #강아지일상 #댕댕이. 지금 가장 핫한 댕댕이들의 일상을 확인하세요!'
  }
};

export const revalidate = 60;

const MungstaPostsInfinite = dynamic(() => import('./_components/root/MungstaPostsInfinite'), {
  ssr: false,
  loading: () => <div style={{ height: 200 }} />
});

const MungstaMainPage = async () => {
  return (
    <Main>
      <div className={styles.header}>
        <h2>멍스타그램</h2>
        <Link href="/mungstagram/create">등록하기</Link>
      </div>
      <section className={styles.mungstagram}>
        <MungstaPosts />
        <MungstaPostsInfinite />
      </section>
    </Main>
  );
};

export default MungstaMainPage;
