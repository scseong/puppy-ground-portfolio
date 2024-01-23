'use client';

import ReactModal from 'react-modal';
import { useRouter } from 'next/navigation';

const MungModal = () => {
  const router = useRouter();

  const closeModal = () => {
    router.back();
  };

  return (
    <ReactModal isOpen={true} onRequestClose={closeModal} ariaHideApp={false} contentLabel="Modal">
      <div>게시글 작성 모달</div>
    </ReactModal>
  );
};

export default MungModal;
