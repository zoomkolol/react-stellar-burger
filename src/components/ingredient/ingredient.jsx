import PropTypes from "prop-types";
import { Counter, CurrencyIcon, Box, Typography } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredient.module.css';

function Ingredient(props) {
  if(props.type !== props.ingredientType) return null

  return (
    <li className={ styles.ingredientContainer + ' pl-4'}>
      <img className='pl-4 pr-4' src={props.image} alt={ props.name } />
      <div className={ styles.priceContainer + ' pt-1 pb-1' }>
        <p className="text text_type_digits-default">{props.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className="text text_type_main-small">{props.name}</p>
      <Counter count={1} size="default" extraClass="m-1" />
    </li>
  );
}

Ingredient.propTypes = {
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired
}

export default Ingredient;
