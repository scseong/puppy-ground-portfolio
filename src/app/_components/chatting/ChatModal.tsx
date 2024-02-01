import Modal from 'react-modal';
import styles from './chatModal.module.scss';
type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  ariaHideApp: boolean;
};

const ChatModal = ({ isOpen, onClose, children }: ModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      ariaHideApp={false}
      contentLabel="Modal"
      className={styles.modal}
      style={{
        overlay: {
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(255, 255, 255, 0.75)',
          zIndex: '3000'
        }
      }}
    >
      {children}
    </Modal>
  );
};
export default ChatModal;
