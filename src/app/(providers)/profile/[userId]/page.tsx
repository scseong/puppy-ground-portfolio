import PrivateRouteWrapper from '@/shared/PrivateRouteWrapper';
import Profile from '../_components/Profile';

const Page = () => {
  return <Profile />;
};

const PrivateCreatePage = () => {
  return (
    <PrivateRouteWrapper>
      <Page />
    </PrivateRouteWrapper>
  );
};
export default PrivateCreatePage;
