import React from 'react';
import Ingredient from '../ingredient/ingredient';
import { data } from '../../utils/data';
import { Tab, Box, Typography } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burgerIngredients.module.css';

function BurgerIngredients() {
  const [current, setCurrent] = React.useState('Булки');

  return (
    <section className={ styles.burgerIngredients + ' pr-10' }>
      <h1 className="text text_type_main-large pt-10 pb-5">Соберите бургер</h1>
      <div className='pb-10' style={{ display: 'flex' }}>
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
      <div className={ styles.ingredients + ' custom-scroll' }>
        <h2 className="text text_type_main-medium pb-6">Булки</h2>
        <ul className={ styles.ingredientList }>
          {data.map((burger) => (
            <Ingredient key={burger._id} {...burger} ingredientType='bun' />
          ))}
        </ul>
        <h2 className="text text_type_main-medium pt-10 pb-6">Соусы</h2>
        <ul className={ styles.ingredientList }>
          {data.map((burger) => (
            <Ingredient key={burger._id} {...burger} ingredientType='sauce' />
          ))}
        </ul>
        <h2 className="text text_type_main-medium pt-10 pb-6">Начинки</h2>
        <ul className={ styles.ingredientList }>
          {data.map((burger) => (
            <Ingredient key={burger._id} {...burger} ingredientType='main' />
          ))}
        </ul>
      </div>
    </section>
  );
}

export default BurgerIngredients;
