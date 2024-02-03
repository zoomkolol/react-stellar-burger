import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredient.module.css';
import { MouseEvent } from 'react';
import { useDrag } from 'react-dnd'
import { useSelector } from "react-redux";
import { useLocation, Link } from 'react-router-dom';
import { TIngredient } from '../../common/types/types';
import { RootState } from '../../app/store';

type Props = {
  onClick: () => void;
  ingredient: TIngredient;
}

function Ingredient({onClick, ingredient }: Props) {
  const getBurgerConstructorData = (state: RootState) => state.burgerConstructor;
  const burgerConstructorData = useSelector(getBurgerConstructorData);
  const location = useLocation();
  const ingredientId = ingredient['_id'];

  const count = () => {
    if(ingredient.type === 'bun') {
      return burgerConstructorData.bun?._id === ingredient._id ? 2 : 0;
    } else {
      return burgerConstructorData.ingredients.filter(ing => ing._id === ingredient._id).length;
    }
  }

  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: 'ingredientToConstructor',
    item:  ingredient,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));
  const opacity = isDragging ? 0 : 1



  return (
    <Link
      key={ingredientId}
      to={`/ingredients/${ingredientId}`}
      state={{ background: location }}
      className={styles.link}
    >
      <li ref={dragRef} draggable style={{opacity}} onClick={onClick} className={ styles.ingredientContainer + ' pl-4'}>
        <img className='pl-4 pr-4' src={ingredient.image} alt={ ingredient.name } />
        <div className={ `${styles.priceContainer} pt-1 pb-1` }>
          <p className="text text_type_digits-default">{ingredient.price}</p>
          <CurrencyIcon type="primary" />
        </div>
        <p className="text text_type_main-small">{ingredient.name}</p>
        <Counter count={count()} size="default" extraClass="m-1" />
      </li>
    </Link>
  );
}

export default Ingredient;
