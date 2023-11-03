import React from 'react';
import { Button, ConstructorElement, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';
import Modal from '../modal/modal';
import BurgerConstructorElement from '../burger-constructor-element/burger-constructor-element';
import OrderDetails from '../order-details/order-details';
import { useModal } from '../../hooks/useModal';
import { useBurger, dispatchBurgerAction } from '../../services/burger-context';
import { useTotalPrice } from '../../services/total-price-context';
import { getOrderDetails } from '../../services/api';

function BurgerConstructor() {
  const { isModalOpen, openModal, closeModal } = useModal();
  const { burgerState, dispatch: burgerDispatch } = useBurger();
  const burgerActions = dispatchBurgerAction(burgerDispatch);
  const { state } = useTotalPrice();
  const [ orderId, setOrderId ] = React.useState(0);
  const [loading, setLoading] = React.useState(false)

  function getIngredientsId() {
    setLoading(true);
    const ingredientsIdArr = [];
    ingredientsIdArr.push(burgerState.bun._id);
    burgerState.ingredients.forEach(ingredient => {
      ingredientsIdArr.push(ingredient._id)
    });

    getOrderDetails(ingredientsIdArr)
    .then((data) => {
      setOrderId(data.order.number);
      burgerActions.resetConstructor();
      setLoading(false);
    })
    .catch(err => console.log(err));
  }

  return (
    <div className={ `${styles.constructorContainer} pt-25 pl-4 pr-4` }>
      {burgerState.bun.name !== undefined && (
        <div className={ `${styles.lockedElement} pl-6 pr-4 pb-4` }>
        <ConstructorElement
        type="top"
        isLocked={true}
        text={`${burgerState.bun.name} + (верх)`}
        price={burgerState.bun.price}
        thumbnail={burgerState.bun.image}
        />
        </div>
      )}
      {burgerState.ingredients !== undefined && (
        <div className={ `${styles.elementList} custom-scroll` }>
          {burgerState.ingredients.map((ingredient) => (
            <BurgerConstructorElement key={ingredient._id} ingredient={ingredient} />
          ))}
        </div>
      )}
      {burgerState.bun.name !== undefined && (
        <div className={ `${styles.lockedElement} pl-6 pr-3 pt-4` }>
        <ConstructorElement
        type="bottom"
        isLocked={true}
        text={`${burgerState.bun.name} + (низ)`}
        price={burgerState.bun.price}
        thumbnail={burgerState.bun.image}
        />
        </div>
      )}
      {(burgerState.ingredients.length > 0 && burgerState.bun.name !== undefined) &&
      (<div className={ `${styles.checkoutContainer} pt-10` }>
        <div className={ `${styles.currencyContainer} pr-10` }>
          <p className="text text_type_digits-medium">{state.bunPrice * 2 + state.ingredientPrice}</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button onClick={() => {
          openModal();
          getIngredientsId();
        }} htmlType="button" type="primary" size="medium">
          Оформить заказ
        </Button>
      </div>)}
      {isModalOpen &&
        <Modal onClose={closeModal}>
          <OrderDetails orderId={orderId}/>
        </Modal>
      }
    </div>
  );
}

export default BurgerConstructor;
