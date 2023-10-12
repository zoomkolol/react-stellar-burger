import React from 'react';
import { Typography, CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types';
import styles from './modal-overlay.module.css';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#root');

function ModalOverlay( {children: child, title, onClose} ) {

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
        <div onClick={onClose} className={ styles.overlay }></div>
        <div className={ styles.modal }>
          <h2 className={ `${styles.title} text text_type_main-large pl-10 pt-10 pr-10` }>
            {title}
          </h2>
          <div className={`${ styles.closeIcon } mt-15 mr-10`}>
            <CloseIcon onClick={onClose} type="primary" />
          </div>
          {child}
        </div>
      </div>
    </div>
  ),
  modalRoot);
}

ModalOverlay.propTypes = {
  children: PropTypes.element.isRequired,
  title: PropTypes.string,
  onClose: PropTypes.func.isRequired
}

export default ModalOverlay
