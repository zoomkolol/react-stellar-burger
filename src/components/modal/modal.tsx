import React, { ReactNode } from 'react';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './modal.module.css';
import { createPortal } from 'react-dom';
import ModalOverlay from '../modal-overlay/modal-overlay';

const modalRoot = document.querySelector('#root');

type Props = {
  children?: ReactNode;
  title?: string;
  onClose: () => void;
}

function Modal( {children: child, title, onClose}: Props ) {

  React.useEffect(() => {
    const handleEscDown = (evt: KeyboardEvent) => {
      if(evt.key === 'Escape') {
        onClose();
      }
    }

    document.addEventListener('keydown', handleEscDown);

    return () => {
      document.removeEventListener('keydown', handleEscDown);
    }
  }, []);

  return createPortal (
    modalRoot ? (
    <div className={ styles.popup }>
      <div className={ styles.container }>
        <ModalOverlay onClick={onClose} />
        <div className={ styles.modal }>
          <div className={`${ styles.closeIcon } mt-7 mr-7`}>
            <CloseIcon onClick={onClose} type="primary" />
          </div>
          {child}
        </div>
      </div>
    </div>
  ) : null,
  modalRoot || document.body);
}

export default Modal
