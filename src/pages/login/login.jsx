import { Typography, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';
import styles from './login.module.css';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../common/services/action';

export function LoginPage() {
  const dispatch = useDispatch();

  const formLogin = (e) => {
    e.preventDefault();
    dispatch(login({email, password}));
  }

  const [email, setEmail] = useState('');
  const onChangeEmail = e => {
    setEmail(e.target.value)
  };

  const [password , setPassword] = useState('');
  const onChangePassword = e => {
    setPassword(e.target.value)
  };

  return (
    <>
    <form onSubmit={formLogin}>
      <div className={ styles.container }>
        <p className="text text_type_main-medium">Вход</p>
        <EmailInput
          onChange={onChangeEmail}
          value={email}
          name={'email'}
          isIcon={false}
          extraClass="pt-6"
        />
        <PasswordInput
          onChange={onChangePassword}
          value={password}
          name={'password'}
          extraClass="pt-6"
        />
        <Button htmlType="submit" type="primary" size="large" extraClass="mt-6 mb-20">Войти</Button>
        <p className="text text_type_main-default text_color_inactive pb-4">Вы — новый пользователь? <Link className={ styles.link } to={'/register'} >Зарегистрироваться</Link></p>
        <p className="text text_type_main-default text_color_inactive">Забыли пароль? <Link className={ styles.link } to={'/forgot-password'} >Восстановить пароль</Link></p>
      </div>
    </form>
    </>
  )
}
