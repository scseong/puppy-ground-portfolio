'use client';

import Script from 'next/script';

declare global {
  interface Window {
    Kakao: any;
  }
}

const KakaoShareButton = () => {
  const clickShare = () => {
    window.Kakao.Link.sendScrap({
      requestUrl: location.href
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
      <button onClick={clickShare}>Share</button>
    </>
  );
};

export default KakaoShareButton;
