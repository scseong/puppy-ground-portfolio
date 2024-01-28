import PrivateRouteWrapper from '@/shared/PrivateRouteWrapper';
import CreateForm from './CreateForm';

const Page = () => {
  return (
    <>
      <CreateForm />
    </>
  );
};

const PrivateCreatePage = () => {
  return (
    <PrivateRouteWrapper>
      <Page />
    </PrivateRouteWrapper>
  );
};

export default PrivateCreatePage;
