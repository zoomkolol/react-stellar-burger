import React from 'react';
import styles from './modal-overlay.module.css'

function ModalOverlay({onClick}) {
  return (
    <div onClick={onClick} className={ styles.overlay }></div>
  )
}

export default ModalOverlay
