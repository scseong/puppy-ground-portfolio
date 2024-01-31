import styles from './footer.module.scss';

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.footerBox}>
        Copyright 2024 &copy; <strong>Puppy Ground</strong> All rights reserved.
      </div>
    </div>
  );
};

export default Footer;
