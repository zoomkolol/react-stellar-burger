import { useSelector } from 'react-redux';
import styles from './card-order.module.css';
import { FormattedDate, Typography, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export function CardOrder({order}) {

  //TODO: убарть ререндер элемента

  const getIngredientsData = store => store.burgerIngredients.ingredients;
  const ingredientsData = useSelector(getIngredientsData);
  const location = useLocation();

  const orderIngredientsWithFullInfo = [];

  const [totalPrice, setTotalPrice] = useState();

  order.ingredients.forEach((id) => {
    const contains = ingredientsData.find((element) => element._id === id);

    if(contains) {
      orderIngredientsWithFullInfo.push({
        _id: id,
        price: contains.price,
        image: contains.image
      })
    }
  })

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
