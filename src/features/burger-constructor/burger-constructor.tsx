import { useEffect, useState } from 'react';
import { Button, ConstructorElement, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';
import Modal from '../../components/modal/modal';
import BurgerConstructorElement from '../../components/burger-constructor-element/burger-constructor-element';
import OrderDetails from '../order-details/order-details';
import { useModal } from '../../common/hooks/useModal';
import { useSelector } from 'react-redux';
import { resetConstructor } from './burger-constructor-slice';
import { getOrderDetailsAsync } from '../order-details/order-details-slice';
import { useDrop } from 'react-dnd';
import { addIngredientReducer, addBun } from './burger-constructor-slice';
import { useNavigate } from 'react-router-dom';
import { ROUTE_LOGIN } from '../../common/utils/constants';
import { RootState } from '../../app/store';
import { TIngredient } from '../../common/types/types';
import { useAppDispatch } from '../../common/hooks/hooks';


//TODO: использование памяти? useEffect, чтобы при размонтировании страницы убирались все подписки?

function BurgerConstructor() {
  const getBun = (state: RootState) => state.burgerConstructor.bun;
  const bun = useSelector(getBun);
  const getIngredients = (state: RootState) => state.burgerConstructor.ingredients;
  const ingredients = useSelector(getIngredients);
  const getBunPrice = (state: RootState) => state.burgerConstructor.bunPrice;
  const bunPrice = useSelector(getBunPrice);
  const getIngredientsPrice = (state: RootState) => state.burgerConstructor.ingredientPrice;
  const ingredientPrice = useSelector(getIngredientsPrice);
  const dispatch = useAppDispatch();

  const getUser = (state: RootState) => state.user.user;
  const user = useSelector(getUser);

  const navigate = useNavigate();

  const [, dropTarget] = useDrop({
    accept: 'ingredientToConstructor',
    drop(ingredient: TIngredient) {

      console.log(ingredient);
      console.log(ingredient.type);
      console.log(ingredient.calories);
      if(ingredient.type === 'bun') {
        dispatch(addBun(ingredient))
      } else {
        dispatch(addIngredientReducer(ingredient));
      }

    }
  })

  const { isModalOpen, openModal, closeModal } = useModal();

  function getIngredientsIdArr() {
    const ingredientsIdArr: string[] = [];

    if (bun?._id) {
      ingredientsIdArr.push(bun._id);
    }

    ingredients.forEach((ingredient) => {
      if (ingredient._id) {
        ingredientsIdArr.push(ingredient._id);
      }
    });

    return ingredientsIdArr;
  }

  const placeOrder = async (ingredientsIdArr: string[]) => {
    try {
      await dispatch(getOrderDetailsAsync(ingredientsIdArr));
      openModal();
      dispatch(resetConstructor());
    } catch (err) {
      console.log('Произошла ошибка: ' + err)
    }
  }

  const [loadingOrder, setLoadingOrder] = useState<string | null>();

  useEffect(() => {
    if(loadingOrder) {
      const timeout = setTimeout(() => {
        setLoadingOrder(null)
      }, 15000);

      return () => clearTimeout(timeout);
    }
  }, [loadingOrder])

  const showLoadingText = () => setLoadingOrder("Создаём заказ");

  return (
    <div ref={dropTarget} className={ `${styles.constructorContainer} pt-25 pl-4 pr-4` }>
      {(bun && ingredients.length === 0) && (
        <h2 className="text text_type_main-medium pb-6">Перетащите ингредиенты</h2>
      )}

      {bun && (
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
            <BurgerConstructorElement key={ingredient.uniqueId} index={index} ingredient={ingredient} />
          ))}
        </div>
      )}
      {bun && (
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
      {(ingredients.length > 0 && bun) &&
      (<div className={ `${styles.checkoutContainer} pt-10` }>
        <div className={ `${styles.currencyContainer} pr-10` }>
          <p className="text text_type_digits-medium">{ bunPrice + ingredientPrice }</p>
          <CurrencyIcon type="primary" />
        </div>
        {loadingOrder ? loadingOrder :<Button onClick={() => {
          if(user === null) {
            navigate(ROUTE_LOGIN);
          } else {
            showLoadingText();
            placeOrder(getIngredientsIdArr());
          }
        }} htmlType="button" type="primary" size="medium">
          Оформить заказ
        </Button>}
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
