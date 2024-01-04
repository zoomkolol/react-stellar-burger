import { useEffect } from "react"
import { closeWebSocket, webSocket } from "../../common/utils/socketMiddleware"
import { useDispatch, useSelector } from "react-redux"
import { USER, USER_WSS } from "../../common/utils/constants";
import styles from './profile-feed-orders.module.css';
import { ProfileOrder } from "../../features/profile-order/profile-order";


export function ProfileFeedOrders() {
  const dispatch = useDispatch();
  const getOrders = store => store.profileOrder.orders;
  const orders = useSelector(getOrders);

  useEffect(() => {
    webSocket(dispatch, USER_WSS, USER);

    return () => {
      closeWebSocket("1000", "ProfileFeed was unmounted");
    }
  }, [])

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
