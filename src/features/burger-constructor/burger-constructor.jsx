import React, { useCallback } from 'react';
import { Button, ConstructorElement, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';
import Modal from '../../components/modal/modal';
import BurgerConstructorElement from '../../components/burger-constructor-element/burger-constructor-element';
import OrderDetails from '../order-details/order-details';
import { useModal } from '../../common/hooks/useModal';
import { useDispatch, useSelector } from 'react-redux';
import { resetConstructor } from './burger-constructor-slice';
import { getOrderDetailsAsync } from '../order-details/order-details-slice';
import { useDrop } from 'react-dnd';
import { addIngredient, addBun } from './burger-constructor-slice';


function BurgerConstructor() {
  const getBun = state => state.burgerConstructor.bun;
  const bun = useSelector(getBun);
  const getIngredients = state => state.burgerConstructor.ingredients;
  const ingredients = useSelector(getIngredients);
  const getBunPrice = state => state.burgerConstructor.bunPrice;
  const bunPrice = useSelector(getBunPrice);
  const getIngredientsPrice = state => state.burgerConstructor.ingredientPrice;
  const ingredientPrice = useSelector(getIngredientsPrice);
  const dispatch = useDispatch();


  const [, dropTarget] = useDrop({
    accept: 'ingredientToConstructor',
    drop(ingredient) {

      if(ingredient.ingredient.type === 'bun') {
        dispatch(addBun(ingredient.ingredient))
      } else {
        dispatch(addIngredient(ingredient.ingredient));
      }

    }
  })

  const { isModalOpen, openModal, closeModal } = useModal();

  function getIngredientsIdArr() {
    const ingredientsIdArr = [];
    ingredientsIdArr.push(bun._id);
    ingredients.forEach(ingredient => {
      ingredientsIdArr.push(ingredient._id)
    });
    return ingredientsIdArr;
  }

  const placeOrder = async (ingredientsIdArr) => {
    try {
      await dispatch(getOrderDetailsAsync(ingredientsIdArr));
      dispatch(resetConstructor());
      openModal();
    } catch (err) {
      console.log('Произошла ошибка: ' + err)
    }
  }

  const renderIng = useCallback((key, index, ingredient) => {
    return (
      <BurgerConstructorElement key={key} index={index} ingredient={ingredient} />
    )
  }, [])

  return (
    <div  ref={dropTarget} className={ `${styles.constructorContainer} pt-25 pl-4 pr-4` }>
      {(bun.name === undefined && ingredients.length === 0) && (
        <h2 className="text text_type_main-medium pb-6">Перетащите ингредиенты</h2>
      )}

      {bun.name !== undefined && (
        <div className={ `${styles.lockedElement} pl-6 pr-4 pb-4` }>
        <ConstructorElement
        type="top"
        isLocked={true}
        text={`${bun.name} + (верх)`}
        price={bun.price}
        thumbnail={bun.image}
        />
        </div>
      )}
      {ingredients !== undefined && (
        <div className={ `${styles.elementList} custom-scroll` }>
          {ingredients.map((ingredient, index) => (
            renderIng(ingredient.uniqueId, index, ingredient)
          ))}
        </div>
      )}
      {bun.name !== undefined && (
        <div className={ `${styles.lockedElement} pl-6 pr-3 pt-4` }>
        <ConstructorElement
        type="bottom"
        isLocked={true}
        text={`${bun.name} + (низ)`}
        price={bun.price}
        thumbnail={bun.image}
        />
        </div>
      )}
      {(ingredients.length > 0 && bun.name !== undefined) &&
      (<div className={ `${styles.checkoutContainer} pt-10` }>
        <div className={ `${styles.currencyContainer} pr-10` }>
          <p className="text text_type_digits-medium">{ bunPrice + ingredientPrice }</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button onClick={() => {
          placeOrder(getIngredientsIdArr())
        }} htmlType="button" type="primary" size="medium">
          Оформить заказ
        </Button>
      </div>)}
      {isModalOpen &&
        <Modal onClose={closeModal}>
          <OrderDetails />
        </Modal>
      }
    </div>
  );
}

export default BurgerConstructor;
