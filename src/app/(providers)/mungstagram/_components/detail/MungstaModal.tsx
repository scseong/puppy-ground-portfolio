import { useEffect, useRef } from 'react';
import styles from './mungstaModal.module.scss';

type Props = {
  show: boolean;
  onCloseModal: () => void;
  children: React.ReactNode;
};
const MungstaModal = ({ show, children, onCloseModal }: Props) => {
  const stopPropagation = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
  };

  const modalRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onCloseModal();
      }
    };
    window.addEventListener('mousedown', handleClick);
    return () => window.removeEventListener('mousedown', handleClick);
  }, [modalRef, onCloseModal]);

  if (!show) {
    return null;
  }

  return (
    <div onClick={onCloseModal} ref={modalRef} className={styles.modalContainer}>
      <div onClick={stopPropagation}>
        {children}
      </div>
    </div>
  );
};

export default MungstaModal;
