import { ReactNode } from "react";
import styles from "./style.module.css";
import { Close as CloseButton } from "../Icons";

interface ModalProps {
  children: ReactNode;
  hideModal: () => void;
}

const Modal = ({ children, hideModal }: ModalProps) => {
  return (
    <div className={styles.modal}>
      <CloseButton onClick={hideModal} />
      {children}
    </div>
  );
};

export default Modal;
