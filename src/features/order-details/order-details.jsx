import styles from './order-details.module.css';
import done from '../../images/done.png'
import { useSelector } from 'react-redux';

export default function OrderDetails() {
  const getOrderId = state => state.orderDetails.orderId;
  const orderId = useSelector(getOrderId);

  return (
    <div className={ styles.container }>
      <p className={`${ styles.orderNumber } text text_type_digits-large pt-30`}>{orderId}</p>
      <p className="text text_type_main-medium pt-8">идентификатор заказа</p>
      <img className='pt-15' src={done} alt='Иконка галочки' />
      <p className="text text_type_main-default pt-15 pb-2">Ваш заказ начали готовить</p>
      <p className="text text_type_main-default text_color_inactive pb-30">Дождитесь готовности на орбитальной станции</p>
    </div>
  )
}
