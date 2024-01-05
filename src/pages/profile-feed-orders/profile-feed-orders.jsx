import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import styles from './profile-feed-orders.module.css';
import { ProfileOrder } from "../../features/profile-order/profile-order";
import { connectUserWebSocket, disconnectWebsocket } from "../../common/utils/socketMiddleware/socketMiddleware-actions";
import { USER_WSS } from "../../common/utils/constants";


export function ProfileFeedOrders() {
  const dispatch = useDispatch();
  const getOrders = store => store.profileOrder.orders;
  const orders = useSelector(getOrders);

  useEffect(() => {
    dispatch(connectUserWebSocket({url: USER_WSS}));

    return () => {
      dispatch(disconnectWebsocket());
    }
  }, [dispatch])

  return (
    <>
      <div className={`${styles.feed__container} mr-15 custom-scroll`}>
        <ul className={styles.orders}>
          {orders && orders.map((order) => {
            return (
              <ProfileOrder key={order._id} order={order} />
            )
          })}
        </ul>
      </div>
    </>
  )
}
