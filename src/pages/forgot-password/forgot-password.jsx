import { Typography, EmailInput, PasswordInput, Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';
import styles from './forgot-password.module.css';
import { Link } from 'react-router-dom';
import { forgotPassword } from '../../common/services/api';

export function ForgotPassPage() {
  const [email, setEmail] = useState('');
  const onChangeEmail = e => {
    setEmail(e.target.value)
  };

  const onSubmit = () => {
    forgotPassword(email)
    .then(localStorage.setItem("passwordChangeRequest", true));
  }

  return (
    <>
    <div className={ styles.container }>
      <p className="text text_type_main-medium">Восстановление пароля</p>
      <form onSubmit={onSubmit} className={ styles.form__container }>
        <EmailInput
          onChange={onChangeEmail}
          value={email}
          name={'email'}
          isIcon={false}
          extraClass="pt-6"
        />
        <Button htmlType="submit" type="primary" size="large" extraClass="mt-6 mb-20">Восстановить</Button>
      </form>
      <p className="text text_type_main-default text_color_inactive pb-4">Вспомнили пароль? <Link className={ styles.link } to={'/login'} >Войти</Link></p>
    </div>
    </>
  )
}
