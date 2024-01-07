import { NavLink, Outlet } from 'react-router-dom';
import styles from './profile.module.css';
import { Typography } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch } from 'react-redux';
import { logout } from '../../common/services/action';


export function ProfilePage() {
  const dispatch = useDispatch();

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  }

  return (
    <>
    <div className={ styles.container}>
      <div className={ styles.list__container + ' mr-15' } >
        <ul className={ styles.list + ' mb-20' }>
          <li>
            <NavLink to='/profile' className={ styles.list__element }>{
              ({isActive}) => (
                <p className={isActive ? "text text_type_main-medium" : 'text text_type_main-medium text_color_inactive'}>Профиль</p>
              )
            }
            </NavLink>
          </li>
          <li>
            <NavLink to='/profile/orders' className={ styles.list__element }>{
              ({isActive}) => (
                <p className={isActive ? "text text_type_main-medium" : 'text text_type_main-medium text_color_inactive'}>История заказов</p>
              )
            }
            </NavLink>
          </li>
          <li>
            <NavLink onClick={handleLogout} className={styles.list__element}><p className='text text_type_main-medium text_color_inactive'>Выход</p></NavLink>
          </li>
        </ul>
        <p className={styles.notation__container + " text text_type_main-default text_color_inactive"}>В этом разделе вы можете изменить свои персональные данные</p>
      </div>
      <Outlet />
    </div>
    </>
  )
}
