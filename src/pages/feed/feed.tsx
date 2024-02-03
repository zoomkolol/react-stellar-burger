import { useDispatch, useSelector } from "react-redux";
import styles from "./feed.module.css";
import { useEffect } from "react";
import { CardOrder } from "../../features/card-order/card-order";
import { wsConnectionClosed, wsConnectionStart } from "../../common/utils/socketMiddleware/socketMiddleware-slice";
import { WSS_URL } from "../../common/utils/constants";
import { RootState } from "../../app/store";
import { useAppDispatch } from "../../common/hooks/hooks";

export function FeedPage() {
  const getOrdersInfo = (store: RootState) => store.websocket.message;
  const getOrders = (store: RootState) => store.websocket.message?.orders;
  const orders = useSelector(getOrders);
  const totalInfo = useSelector(getOrdersInfo);

  const dispatch = useAppDispatch();

  const doneOrders = orders ? orders.filter(order => order.status === "done").slice(0, 10) : '';
  const processOrders = orders ? orders.filter(order => order.status === "pending").slice(0, 10) : '';

  useEffect(() => {
    dispatch(wsConnectionStart(WSS_URL + '/all'));

    return () => {
      dispatch(wsConnectionClosed());
    }
  }, [])

  return (
    <>
      <section className={styles.page}>
        <p className={`${styles.title} text text_type_main-large`}>Лента заказов</p>
        <div className={styles.container}>
          <div className={`${styles.feed__container} mr-15 custom-scroll`}>
            <ul className={styles.orders}>
              {orders && orders.map((order) => {
                return (
                  <CardOrder key={order._id} order={order}/>
                )
              })}
            </ul>
          </div>
          <div className={styles.stats}>
            <div className={`${styles.stats__orders} mb-15`}>
              <div className={`${styles.orders__container} mr-9`}>
              <p className="text text_type_main-medium mb-6">Готовы:</p>
                <ul className={styles.list}>
                  {doneOrders && doneOrders.map((order, index: number) => {
                    return <li key={index}><p className={`${styles.list__element_done} text text_type_digits-default pb-2`}>{order.number}</p></li>
                  })}
                </ul>
              </div>
              <div className={styles.orders__container}>
                <p className="text text_type_main-medium mb-6">В работе:</p>
                <ul className={styles.list}>
                  {processOrders && processOrders.map((order, index: number) => {
                    return <li key={index}><p className="text text_type_digits-default pb-2">{order.number}</p></li>
                  })}
                </ul>
              </div>
            </div>
            <p className={`${styles.title__number} text text_type_main-medium mb-6`}>Выполнено за всё время:</p>
            <p className={`${styles.number_big} text text_type_digits-large mb-15`}>{totalInfo?.total}</p>
            <p className={`${styles.title__number} text text_type_main-medium mb-6`}>Выполнено за сегодня:</p>
            <p className={`${styles.number_big} text text_type_digits-large`}>{totalInfo?.totalToday}</p>
          </div>
        </div>
      </section>
    </>
  )
}
