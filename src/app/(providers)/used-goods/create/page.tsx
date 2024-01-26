import PrivateRouteWrapper from '@/shared/PrivateRouteWrapper';
import CreateForm from './CreateForm';
import KakaoMapMarker from '@/app/_components/kakaoMap/KakaoMapMarker';

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
