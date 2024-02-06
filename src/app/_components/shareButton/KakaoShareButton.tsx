'use client';

import Script from 'next/script';

declare global {
  interface Window {
    Kakao: any;
  }
}

const KakaoShareButton = ({ children }: { children: React.ReactNode }) => {
  const clickShare = () => {
    window.Kakao.Link.sendDefault({
      objectType: 'feed',
      content: {
        title: 'Puppy Ground',
        description: '반려견 중고 물품 거래 및 정보공유 플랫폼',
        imageUrl: 'https://i.ibb.co/vXcZp4y/8.png',
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
      <div onClick={clickShare}>{children}</div>
    </>
  );
};

export default KakaoShareButton;
