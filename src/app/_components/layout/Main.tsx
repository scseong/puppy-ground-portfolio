import styles from './main.module.scss';

const Main = ({ children }: { children: React.ReactNode }) => {
  return <main className={styles.main}>{children}</main>;
};

export default Main;
