import PrivateRouteWrapper from '@/shared/PrivateRouteWrapper';
import Profile from '../_components/Profile';
import List from '../_components/List';
import styles from './page.module.scss';

const Page = () => {
  return (
    <div className={styles.container}>
      <div className={styles.right}>
        <Profile />
      </div>
      <div className={styles.left}>
        <List />
      </div>
    </div>
  );
};

// const PrivateCreatePage = () => {
//   return (
//     <PrivateRouteWrapper>
//       <Page />
//     </PrivateRouteWrapper>
//   );
// };
// export default PrivateCreatePage;

export default Page;
