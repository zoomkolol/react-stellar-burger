import PropTypes from "prop-types";
import { Counter, CurrencyIcon, Box, Typography } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredient.module.css';
import { ingredientPropType } from "../../utils/prop-types.js";

function Ingredient({onClick, ingredient, ingredientType }) {
  if(ingredient.type !== ingredientType) return null

  return (
    <li onClick={onClick} className={ styles.ingredientContainer + ' pl-4'}>
      <img className='pl-4 pr-4' src={ingredient.image} alt={ ingredient.name } />
      <div className={ `${styles.priceContainer} pt-1 pb-1` }>
        <p className="text text_type_digits-default">{ingredient.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className="text text_type_main-small">{ingredient.name}</p>
      <Counter count={1} size="default" extraClass="m-1" />
    </li>
  );
}

Ingredient.propTypes = {
  ingredient: ingredientPropType
}

export default Ingredient;
