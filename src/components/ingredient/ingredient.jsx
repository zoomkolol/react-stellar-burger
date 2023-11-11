import PropTypes from "prop-types";
import { Counter, CurrencyIcon, Box, Typography } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredient.module.css';
import { ingredientPropType } from "../../common/utils/prop-types.js";
import { useDrag } from 'react-dnd'
import { useSelector } from "react-redux";

function Ingredient({onClick, ingredient }) {

  const burgerConstructorData = useSelector(state => state.burgerConstructor);

  const count = () => {
    if(ingredient.type === 'bun') {
      return burgerConstructorData.bun._id === ingredient._id ? 2 : 0;
    } else {
      return burgerConstructorData.ingredients.filter(ing => ing._id === ingredient._id).length;
    }
  }

  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: 'ingredientToConstructor',
    item: { ingredient },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));
  const opacity = isDragging ? 0 : 1


  return (
    <li ref={dragRef} draggable style={{opacity}} onClick={onClick} className={ styles.ingredientContainer + ' pl-4'}>
      <img className='pl-4 pr-4' src={ingredient.image} alt={ ingredient.name } />
      <div className={ `${styles.priceContainer} pt-1 pb-1` }>
        <p className="text text_type_digits-default">{ingredient.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className="text text_type_main-small">{ingredient.name}</p>
      <Counter count={count()} size="default" extraClass="m-1" />
    </li>
  );
}

Ingredient.propTypes = {
  ingredient: ingredientPropType
}

export default Ingredient;
