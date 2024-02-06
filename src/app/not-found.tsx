import Image from 'next/image';
import Link from 'next/link';
import { FaLongArrowAltRight } from 'react-icons/fa';
import styles from '@/app/not-found.module.scss';
import logo from '../../public/images/logo.png';

const NotFound = () => {
  return (
    <>
      <div className={styles.logo}>
        <Link href={'/'}>Puppy Ground</Link>
        <Image width={30} height={30} src={logo} alt="로고" />
      </div>
      <div className={styles.container}>
        <div className={styles.notFound}>
          <h2>404</h2>
          <p>페이지가 없습니다.</p>
          <Link href={'/'}>
            퍼피 그라운드 사이트로 돌아가기
            <FaLongArrowAltRight />
          </Link>
        </div>
      </div>
    </>
  );
};

export default NotFound;
