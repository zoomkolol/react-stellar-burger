import React from 'react';
import { Typography, CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types';
import styles from './modal.module.css';
import { createPortal } from 'react-dom';
import ModalOverlay from '../modal-overlay/modal-overlay';

const modalRoot = document.querySelector('#root');

function Modal( {children: child, title, onClose} ) {

  React.useEffect(() => {
    const handleEscDown = (evt) => {
      if(evt.key === 'Escape') {
        onClose();
      }
    }

    document.addEventListener('keydown', handleEscDown);

    return () => {
      document.removeEventListener('keydown', handleEscDown);
    }
  }, []);

  return createPortal ((
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
  ),
  modalRoot);
}

Modal.propTypes = {
  children: PropTypes.element.isRequired,
  title: PropTypes.string,
  onClose: PropTypes.func.isRequired
}

export default Modal
