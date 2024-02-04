import styles from './modal-overlay.module.css'

type Prop = {
  onClick: () => void;
}

function ModalOverlay({onClick}: Prop) {
  return (
    <div onClick={onClick} className={ styles.overlay }></div>
  )
}

export default ModalOverlay
