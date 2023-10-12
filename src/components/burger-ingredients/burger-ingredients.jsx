import React from 'react';
import Ingredient from '../ingredient/ingredient';
import ModalOverlay from '../modal-overlay/modal-overlay';
import { Tab, Box, Typography } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css';
import IngredientDetails from '../ingredient-details/ingredient-details';

function BurgerIngredients(props) {
  const [current, setCurrent] = React.useState('Булки');
  const [openModal, setOpenModal] = React.useState(false);
  const [currentIngredientInfo, setCurrentIngredientInfo] = React.useState({});

  function handleOpenModal(ingredient) {
    setCurrentIngredientInfo(ingredient);
    setOpenModal(true);
    console.log(ingredient);
  }

  function handleCloseModal() {
    setOpenModal(false);
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
          {props.data.map((ingredient) => (
            <Ingredient onClick={() => handleOpenModal(ingredient)} key={ingredient._id} {...ingredient} ingredientType='bun' />
          ))}
        </ul>
        <h2 className="text text_type_main-medium pt-10 pb-6">Соусы</h2>
        <ul className={ styles.ingredientList }>
          {props.data.map((ingredient) => (
            <Ingredient onClick={() => handleOpenModal(ingredient)} key={ingredient._id} {...ingredient} ingredientType='sauce' />
          ))}
        </ul>
        <h2 className="text text_type_main-medium pt-10 pb-6">Начинки</h2>
        <ul className={ styles.ingredientList }>
          {props.data.map((ingredient) => (
            <Ingredient onClick={() => handleOpenModal(ingredient)} key={ingredient._id} {...ingredient} ingredientType='main' />
          ))}
        </ul>
      </div>
      {openModal &&
        <ModalOverlay onClose={handleCloseModal} title='Детали ингридиента'>
          <IngredientDetails ingredient={currentIngredientInfo} />
        </ModalOverlay>
      }
    </section>
  );
}

export default BurgerIngredients;
