import React from 'react';
import Ingredient from '../ingredient/ingredient';
import Modal from '../modal/modal';
import { Tab, Box, Typography } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { useModal } from '../../hooks/useModal';
import { useIngredients } from '../../services/ingredients-context';
import { useBurger } from '../../services/burger-context';
import { useTotalPrice } from '../../services/total-price-context';

function BurgerIngredients() {
  const [current, setCurrent] = React.useState('Булки');
  const [currentIngredientInfo, setCurrentIngredientInfo] = React.useState({});
  const { isModalOpen, openModal, closeModal } = useModal();
  const ingredients = useIngredients();
  const { dispatch: burgerDispatch } = useBurger();
  const { dispatch: totalPriceDispatch } = useTotalPrice();

  function handleOpenModal(ingredient) {
    setCurrentIngredientInfo(ingredient);
    openModal();
  }

  return (
    <section className={ `${styles.burgerIngredients} pr-10` }>
      <h1 className="text text_type_main-large pt-10 pb-5">Соберите бургер</h1>
      <div className={ `${styles.tabs} pb-10` } >
        <Tab value="Булки" active={current === 'Булки'} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="Соусы" active={current === 'Соусы'} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="Начинки" active={current === 'Начинки'} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>
      <div className={ `${styles.ingredients} custom-scroll` }>
        <h2 className="text text_type_main-medium pb-6">Булки</h2>
        <ul className={ styles.ingredientList }>
          {ingredients.map((ingredient) => (
            <Ingredient onClick={() => {
              handleOpenModal(ingredient);
              burgerDispatch({type: 'ADD_BUN', bun: ingredient});
              totalPriceDispatch({type: 'ADD_BUN_PRICE', amount: ingredient.price});
            }}
            key={ingredient._id} ingredient={ingredient} ingredientType='bun' />
          ))}
        </ul>
        <h2 className="text text_type_main-medium pt-10 pb-6">Соусы</h2>
        <ul className={ styles.ingredientList }>
          {ingredients.map((ingredient) => (
            <Ingredient onClick={() => {
              handleOpenModal(ingredient);
              burgerDispatch({type: 'ADD_INGREDIENT', ingredient: ingredient});
              totalPriceDispatch({type: 'ADD_INGREDIENT_PRICE', amount: ingredient.price});
            }}
            key={ingredient._id} ingredient={ingredient} ingredientType='sauce' />
          ))}
        </ul>
        <h2 className="text text_type_main-medium pt-10 pb-6">Начинки</h2>
        <ul className={ styles.ingredientList }>
          {ingredients.map((ingredient) => (
            <Ingredient onClick={() => {
              handleOpenModal(ingredient);
              burgerDispatch({type: 'ADD_INGREDIENT', ingredient: ingredient});
              totalPriceDispatch({type: 'ADD_INGREDIENT_PRICE', amount: ingredient.price});
            }}
            key={ingredient._id} ingredient={ingredient} ingredientType='main' />
          ))}
        </ul>
      </div>
      {isModalOpen &&
        <Modal onClose={closeModal} title='Детали ингридиента'>
          <IngredientDetails ingredient={currentIngredientInfo} />
        </Modal>
      }
    </section>
  );
}

export default BurgerIngredients;
