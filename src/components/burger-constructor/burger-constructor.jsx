import React from 'react';
import { Button, ConstructorElement, CurrencyIcon, Box, Typography } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay';
import BurgerConstructorElement from '../burger-constructor-element/burger-constructor-element';
import OrderDetails from '../order-details/order-details';

function BurgerConstructor(props) {

  const [openModal, setOpenModal] = React.useState(false);

  function handleOpenModal() {
    setOpenModal(true);
  }

  function handleCloseModal() {
    setOpenModal(false);
  }

  return (
    <div className={ `${styles.constructorContainer} pt-25 pl-4 pr-4` }>
      <div className={ `${styles.lockedElement} pl-6 pr-4 pb-4` }>
      <ConstructorElement
        type="top"
        isLocked={true}
        text="Краторная булка N-200i (верх)"
        price={200}
        thumbnail='https://yandex-practicum.github.io/react-developer-burger-ui-components/docs/static/img-5f9ccf21a0eb45d06e57410b025f366c.png'
      />
      </div>
      <div className={ `${styles.elementList} custom-scroll` }>
        {props.data.map((element) => (
          <BurgerConstructorElement key={element._id} {...element} />
        ))}
      </div>
      <div className={ `${styles.lockedElement} pl-6 pr-3 pt-4` }>
      <ConstructorElement
        type="bottom"
        isLocked={true}
        text="Краторная булка N-200i (низ)"
        price={200}
        thumbnail='https://yandex-practicum.github.io/react-developer-burger-ui-components/docs/static/img-5f9ccf21a0eb45d06e57410b025f366c.png'
      />
      </div>
      <div className={ `${styles.checkoutContainer} pt-10` }>
        <div className={ `${styles.currencyContainer} pr-10` }>
          <p className="text text_type_digits-medium">610</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button onClick={handleOpenModal} htmlType="button" type="primary" size="medium">
          Оформить заказ
        </Button>
      </div>
      {openModal &&
        <ModalOverlay onClose={handleCloseModal}>
          <OrderDetails />
        </ModalOverlay>
      }
    </div>
  );
}

export default BurgerConstructor;
