import { data } from '../../utils/data';
import { Button, CurrencyIcon, Box, Typography } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burgerConstructor.module.css';
import BurgerConstructorElement from '../burgerConstructorElement/burgerConstructorElement';

function BurgerConstructor() {

  return (
    <div className={ styles.constructorContainer + ' pt-25 pl-4 pr-4' }>
      <div className={ styles.elementList + ' custom-scroll'}>
        {data.map((element) => (
          <BurgerConstructorElement key={element._id} {...element} />
        ))}
      </div>
      <div className={ styles.checkoutContainer + ' pt-10' }>
        <div className={ styles.currencyContainer + ' pr-10'}>
          <p className="text text_type_digits-default">610</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button htmlType="button" type="primary" size="medium">
          Оформить заказ
        </Button>
      </div>
    </div>
  );
}

export default BurgerConstructor;
