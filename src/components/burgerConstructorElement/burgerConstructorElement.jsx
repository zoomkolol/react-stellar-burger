import { ConstructorElement, DragIcon, Box, Typography } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burgerConstructorElement.module.css';
import PropTypes from 'prop-types';

function BurgerConstructorElement(props) {

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
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired
}

export default BurgerConstructorElement;
