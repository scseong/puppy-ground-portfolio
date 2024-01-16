import { supabase } from '@/shared/supabase/supabase';
import styles from './page.module.scss';

export default function Home() {
  return <main className={styles.main}>메인 페이지</main>;
}
