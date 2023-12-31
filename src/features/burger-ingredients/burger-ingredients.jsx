import React, { useEffect, useRef } from 'react';
import Ingredient from '../../components/ingredient/ingredient';
import { Tab, Box, Typography } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { addIngredientDetails } from '../ingredient-details/ingredient-details-slice';

function BurgerIngredients() {
  const [currentTab, setCurrentTab] = React.useState('Булки');
  const getIngredients = state => state.burgerIngredients.ingredients;
  const ingredients = useSelector(getIngredients);
  const dispatch = useDispatch();


  const tabsContainerRef = useRef();
  const headingBunsRef = useRef();
  const headingSaucesRef = useRef();
  const headingFillingsRef = useRef();

  const getDistanceBetween = () => {
    const calculateDistanceBetween = (tabsContainer, element) => {
      const tabsContainerRect = tabsContainer.current.getBoundingClientRect();
      const elementRect = element.current.getBoundingClientRect();

      const distanceBetween = Math.abs(tabsContainerRect.y - elementRect.y)

      return distanceBetween
    }
    const distance1 = calculateDistanceBetween(tabsContainerRef, headingBunsRef);
    const distance2 = calculateDistanceBetween(tabsContainerRef, headingSaucesRef);
    const distance3 = calculateDistanceBetween(tabsContainerRef, headingFillingsRef);

    const minDistance = Math.min(distance1, distance2, distance3);

    let neededHeading;

    if(minDistance === distance1) {
      neededHeading = headingBunsRef;
    } else if (minDistance === distance2) {
      neededHeading = headingSaucesRef;
    } else {
      neededHeading = headingFillingsRef;
    }

    setCurrentTab(neededHeading.current.textContent);
  }

  useEffect(() => {
    document.querySelector('#container').addEventListener('scroll', getDistanceBetween);
  }, [])

  return (
    <section className={ `${styles.burgerIngredients} pr-10` }>
      <h1 className="text text_type_main-large pt-10 pb-5">Соберите бургер</h1>
      <div ref={tabsContainerRef} className={ `${styles.tabs} pb-10` } >
        <Tab value="Булки" active={currentTab === 'Булки'} onClick={setCurrentTab}>
          Булки
        </Tab>
        <Tab value="Соусы" active={currentTab === 'Соусы'} onClick={setCurrentTab}>
          Соусы
        </Tab>
        <Tab value="Начинки" active={currentTab === 'Начинки'} onClick={setCurrentTab}>
          Начинки
        </Tab>
      </div>
      <div id='container' className={ `${styles.ingredients} custom-scroll` }>
        <h2 ref={headingBunsRef} className="text text_type_main-medium pb-6">Булки</h2>
        <ul className={ styles.ingredientList }>
          {ingredients.map((ingredient) => {
            if(ingredient.type !== 'bun') return null;

            return(
            <Ingredient onClick={() => {
              dispatch(addIngredientDetails(ingredient));
            }}
            key={ingredient._id} ingredient={ingredient} />)
          })}
        </ul>
        <h2 ref={headingSaucesRef} className="text text_type_main-medium pt-10 pb-6">Соусы</h2>
        <ul className={ styles.ingredientList }>
          {ingredients.map((ingredient) => {
            if(ingredient.type !== 'sauce') return null;

            return (<Ingredient onClick={() => {
              dispatch(addIngredientDetails(ingredient));
            }}
            key={ingredient._id} ingredient={ingredient}/>
          )})}
        </ul>
        <h2 ref={headingFillingsRef} className="text text_type_main-medium pt-10 pb-6">Начинки</h2>
        <ul className={ styles.ingredientList }>
          {ingredients.map((ingredient) => {
            if(ingredient.type !== 'main') return null;

            return (<Ingredient onClick={() => {
              dispatch(addIngredientDetails(ingredient));
            }}
            key={ingredient._id} ingredient={ingredient}/>
          )})}
        </ul>
      </div>
    </section>
  );
}

export default BurgerIngredients;
