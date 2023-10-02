import { ConstructorElement, DragIcon, Box, Typography } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor-element.module.css';
import PropTypes from 'prop-types';

function BurgerConstructorElement(props) {

  if(props.type === 'bun') return null

  return (
    <div className={ styles.element }>
      <DragIcon type="primary" />
      <ConstructorElement
        text={props.name}
        thumbnail={props.image}
        price={props.price}
      />
    </div>
  );
}

BurgerConstructorElement.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired
}

export default BurgerConstructorElement;
