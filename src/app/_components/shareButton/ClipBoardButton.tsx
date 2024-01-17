import { useToast } from '@/hooks/useToast';

const ClipBoardButton = () => {
  const { successTopRight } = useToast();
  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    successTopRight({ message: '링크가 복사되었습니다.' });
  };
  return (
    <>
      <button onClick={copyToClipboard}>clipboard</button>
    </>
  );
};

export default ClipBoardButton;
