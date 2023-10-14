import { ConstructorElement, DragIcon, Box, Typography } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor-element.module.css';
import { ingredientPropType } from "../../utils/prop-types.js";

function BurgerConstructorElement({ ingredient }) {

  if(ingredient.type === 'bun') return null

  return (
    <div className={ styles.element }>
      <DragIcon type="primary" />
      <ConstructorElement
        text={ingredient.name}
        thumbnail={ingredient.image}
        price={ingredient.price}
      />
    </div>
  );
}

BurgerConstructorElement.propTypes = {
  ingredient: ingredientPropType
}

export default BurgerConstructorElement;
