import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import styles from './profile-feed-orders.module.css';
import { ProfileOrder } from "../../features/profile-order/profile-order";
import { ACCESS_TOKEN, WSS_URL } from "../../common/utils/constants";
import { wsConnectionClosed, wsConnectionStart } from "../../common/utils/socketMiddleware/socketMiddleware-slice";


export function ProfileFeedOrders() {
  const dispatch = useDispatch();
  const getOrders = store => store.websocket.message.orders;
  const orders = useSelector(getOrders);

  useEffect(() => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    dispatch(wsConnectionStart({wsUrl: WSS_URL + `?token=${accessToken.replace("Bearer ", "")}`}));

    return () => {
      dispatch(wsConnectionClosed());
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
