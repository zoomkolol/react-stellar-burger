import styles from './card-order-details.module.css'
import { Typography, FormattedDate, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getOrderInfoFromNumber } from '../../common/services/api';

//TODO: Вынести селекторы в отдельный файл
export default function CardOrderDetails({modal = false}) {
  const orderNumber = useParams().number;
  const [order, setOrder] = useState();

  const getIngredientsData = store => store.burgerIngredients.ingredients;
  const ingredientsData = useSelector(getIngredientsData);

  const orderIngredientsWithFullInfo = [];

  const uniqueIngredients = [];

  const [totalPrice, setTotalPrice] = useState();

  if(order !== undefined) {
    order.ingredients.forEach((id) => {
      const contains = ingredientsData.find((element) => element._id === id);

      if(contains) {
        orderIngredientsWithFullInfo.push({
          _id: id,
          price: contains.price,
          image: contains.image,
          name: contains.name
        })
      }
    })
  }

  orderIngredientsWithFullInfo.forEach(ingredient => {
    const id = ingredient._id;

    const contains = uniqueIngredients.find(ingredient => ingredient.id === id);

    if(!contains) {
      const newIngredient = {...ingredient, count: 1, id};
      uniqueIngredients.push(newIngredient);
    } else {
      contains.count += 1;
    }
  })

  useEffect(() => {
    setTotalPrice(orderIngredientsWithFullInfo.reduce((current, element) => current + element.price, 0));
    getOrderInfoFromNumber(orderNumber).then(function(result){
      setOrder(result.orders[0]);
    })

  }, [])

  if(!order) {
    return null
  }

  return (
    <div className={ styles.container }>
      <p className={`${styles.order__number} text text_type_digits-default mb-10 mt-5`}>#{order.number}</p>
      <h2 className={(modal ? styles.title  : styles.title_full) + " text text_type_main-medium mb-3" }>
        {order.name}
      </h2>
      <p className={`${styles.order__status} text text_type_main-small mb-15`}>{
        order.status === "done" ? "Выполнен" : "В работе"
      }</p>
      <p className="text text_type_main-medium mb-6">Состав:</p>
      <div className={`${styles.ingredients__container} mb-10 custom-scroll`}>
        <div className={`${styles.container__ingredient} mr-6`}>
          {
            uniqueIngredients && uniqueIngredients.map((ingredient, index) => {
              return <div className={`${styles.container__ing} mb-4`} key={index}>
                <div className={`${styles.component__element} mr-4`}>
                  <img className={styles.component__image} src={ingredient.image} alt="" />
                </div>
                <p className={`${styles.ingredient__name} text text_type_main-medium mr-4`}>{ingredient.name}</p>
                <div className={`${styles.currency__container}`}>
                  <p className="text text_type_digits-default">{ingredient.count} x {ingredient.price}</p><CurrencyIcon type="primary" />
                </div>
            </div>
            })
          }
        </div>
      </div>
      <div className={`${styles.info__container} mb-5`}>
        <p className="text text_type_main-default text_color_inactive"><FormattedDate date={new Date(order.updatedAt)} /></p>
        <div className={`${styles.currency__container}`}>
          <p className="text text_type_digits-default">{totalPrice ? totalPrice : ''}</p><CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  )
}
