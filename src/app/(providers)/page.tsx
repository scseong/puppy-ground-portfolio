import MainGrid from '../_components/main/MainGrid';
import styles from './page.module.scss';

export default function Home() {
  return <main className={styles.main}>{<MainGrid />}</main>;
}
