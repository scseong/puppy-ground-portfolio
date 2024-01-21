'use client';

import Image from 'next/image';
import Script from 'next/script';
import kakaotalk from '../../../../public/images/kakaoLogo.png';
import style from './kakaoShareButton.module.scss';

declare global {
  interface Window {
    Kakao: any;
  }
}

const KakaoShareButton = () => {
  const clickShare = () => {
    window.Kakao.Link.sendDefault({
      objectType: 'feed',
      content: {
        title: 'Puppy Ground',
        description: '반려견 중고 물품 거래 및 정보공유 플랫폼',
        imageUrl:
          'https://th.bing.com/th?id=OIG.yCY0aHQ8ykhnDeT.vco2&w=236&c=11&rs=1&qlt=90&bgcl=ececec&o=6&pid=PersonalBing&p=0',
        link: {
          mobileWebUrl: location.href,
          webUrl: location.href
        }
      },
      buttons: [
        {
          title: '자세히보기',
          link: {
            mobileWebUrl: location.href,
            webUrl: location.href
          }
        }
      ]
    });
  };

  return (
    <>
      <Script
        src="https://developers.kakao.com/sdk/js/kakao.js"
        async
        onLoad={() => {
          window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_API_KEY);
        }}
      />
      <button onClick={clickShare} className={style.kakaoButton}>
        <Image src={kakaotalk} alt="kakaotalk" width={45} height={45} />
      </button>
    </>
  );
};

export default KakaoShareButton;
