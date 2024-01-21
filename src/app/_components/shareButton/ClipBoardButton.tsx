import { useToast } from '@/hooks/useToast';
import style from './clipBoardButton.module.scss';
import { IoShareSocialOutline } from 'react-icons/io5';

const ClipBoardButton = () => {
  const { successTopRight } = useToast();
  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    successTopRight({ message: '링크가 복사되었습니다.' });
  };
  return (
    <>
      <button onClick={copyToClipboard} className={style.shareButton}>
        <IoShareSocialOutline />
      </button>
    </>
  );
};

export default ClipBoardButton;
