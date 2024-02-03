import { useSelector } from 'react-redux';
import styles from './card-order.module.css';
import { FormattedDate, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Order, TIngredient } from '../../common/types/types';
import { RootState } from '../../app/store';

type Prop = {
  order: Order;
}

export function CardOrder({order}: Prop) {

  //TODO: убарть ререндер элемента

  const getIngredientsData = (store: RootState) => store.burgerIngredients.ingredients;
  const ingredientsData = useSelector(getIngredientsData);
  const location = useLocation();

  const orderIngredientsWithFullInfo: TIngredient[] = [];

  const [totalPrice, setTotalPrice] = useState<number>();

  if(order !== undefined) {
    order.ingredients.forEach((id) => {
      const contains = ingredientsData.find((element) => element._id === id);

      if(contains) {
        orderIngredientsWithFullInfo.push({
          _id: contains._id,
          price: contains.price,
          image: contains.image,
          name: contains.name,
          calories: contains.calories,
          carbohydrates: contains.carbohydrates,
          fat: contains.fat,
          image_large: contains.image_large,
          image_mobile: contains.image_mobile,
          proteins: contains.proteins,
          type: contains.type,
          __v: contains.__v
        })
      }
    })
  }

  const uniqueIngredients = orderIngredientsWithFullInfo.filter((value, index, self) =>
    index === self.findIndex((element) => (
      element.place === value.place && element._id === value._id
    ))
  )

  useEffect(() => {
    setTotalPrice(orderIngredientsWithFullInfo.reduce((current, element) => current + element.price, 0));
  }, [])

  return (
    <>
    <Link
      to={`/feed/${order.number}`}
      state={{ background: location }}
      className={styles.link}>
      <li className={`${styles.card} mr-2`}>
        <div className={`${styles.orderId} mt-6 mb-6`}>
          <p className="text text_type_digits-default">#{order.number}</p>
          <FormattedDate className="text text_type_main-default text_color_inactive" date={new Date(order.updatedAt)} />
        </div>
        <p className="text text_type_main-medium mb-6">{order.name}</p>
        <div className={`${styles.components__container} mb-6`}>
          <div className={styles.components__group}>
            {uniqueIngredients !== undefined  ?
              (uniqueIngredients.slice(0, 6).map((ingredient, index) =>
                (<div className={`${styles.component__element}`} key={index} style={{zIndex: 6 - index}}>
                    <img className={styles.component__image} src={ingredient.image} alt="" />
                    {(index === 5 && uniqueIngredients.length > 6) && (
                      <div className={`${styles.sixth__overlay}`}><p className={`${styles.sixth__overlay__text} text text_type_digits-default`}>+{uniqueIngredients.length - 6}</p></div>
                    )}
                </div>))
              )
              : ('Загрузка...')
            }
          </div>
          <div className={`${styles.currency__container} pl-6`}>
            <p className="text text_type_digits-default">{totalPrice}</p>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </li>
    </Link>
    </>
  )
}
