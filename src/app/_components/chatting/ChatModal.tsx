import ReactModal from 'react-modal';
import styles from './chatModal.module.scss';
type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  ariaHideApp: boolean;
};
const ChatModal = ({ isOpen, onClose, children }: ModalProps) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      ariaHideApp={false}
      contentLabel="Modal"
      className={styles.modalContainer}
    >
      {children}
    </ReactModal>
  );
};
export default ChatModal;
