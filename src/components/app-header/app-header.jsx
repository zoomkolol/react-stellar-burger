import { Logo, BurgerIcon, ListIcon, ProfileIcon, Box, Typography } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';


function AppHeader() {
  return (
    <header className={ styles.header }>
      <nav className={ styles.nav }>
        <ul className={ styles.navLinkList }>
          <li className={ `${styles.navLinkContainer} pl-5 pt-4 pr-7 pb-4` }>
            <BurgerIcon type="primary" />
            <p className="text text_type_main-default pl-2">Конструктор</p>
          </li>
          <li className={ `${styles.navLinkContainer} pl-5 pt-4 pr-5 pb-4 `}>
            <ListIcon type="secondary" />
            <p className="text text_type_main-default text_color_inactive pl-2">Лента заказов</p>
          </li>
        </ul>
      </nav>
      <div className={ styles.logo }>
        <Logo />
      </div>
      <div className={ `${styles.navLinkContainer} pl-5 pt-4 pr-5 pb-4` }>
        <ProfileIcon type="secondary" />
        <p className="text text_type_main-default text_color_inactive pl-2">Личный кабинет</p>
      </div>
    </header>
  );
}

export default AppHeader;
