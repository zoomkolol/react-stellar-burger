import { Logo, BurgerIcon, ListIcon, ProfileIcon, Box, Typography } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';
import { NavLink } from 'react-router-dom';


function AppHeader() {
  return (
    <header className={ styles.header }>
      <div className={ styles.container }>
        <nav className={ styles.nav }>
          <ul className={ styles.navLinkList }>
            <li className='pl-5 pt-4 pr-7 pb-4'>
              <NavLink className={ styles.navLinkContainer } to="/">{({isActive}) => (
                <>
                  <BurgerIcon type={isActive ? "primary" : "secondary"} />
                  <p className={isActive ? "text text_type_main-default pl-2" : "text text_type_main-default text_color_inactive pl-2"}>Конструктор</p>
                </>
              )}
              </NavLink>
            </li>
            <li className='pl-5 pt-4 pr-7 pb-4'>
              <NavLink className={ styles.navLinkContainer } to="/feed">{({isActive}) => (
                <>
                  <ListIcon type={isActive ? "primary" : "secondary"} />
                  <p className={isActive ? "text text_type_main-default pl-2" : "text text_type_main-default text_color_inactive pl-2"}>Лента заказов</p>
                </>
              )}
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className={ styles.logo }>
          <Logo />
        </div>
        <div className='pl-5 pt-4 pr-5 pb-4'>
          <NavLink className={ styles.navLinkContainer } to="/profile">{({isActive}) => (
                <>
                  <ProfileIcon type={isActive ? "primary" : "secondary"} />
                  <p className={isActive ? "text text_type_main-default pl-2" : "text text_type_main-default text_color_inactive pl-2"}>Личный кабинет</p>
                </>
              )}
          </NavLink>
        </div>
      </div>
    </header>
  );
}

export default AppHeader;
