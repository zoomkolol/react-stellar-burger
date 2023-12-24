import { Typography, EmailInput, PasswordInput, Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';
import styles from './reset-password.module.css';
import { Link, Navigate } from 'react-router-dom';
import { resetPassword } from '../../common/services/api';

export function ResetPassPage() {

  const [password , setPassword] = useState('');
  const onChangePassword = e => {
    setPassword(e.target.value)
  };

  const [token , setToken] = useState('');
  const onChangeToken = e => {
    setToken(e.target.value)
  };

  const onClick = () => {
    resetPassword(password, token)
    .then(localStorage.removeItem("passwordChangeRequest"))
  }

  return (
    <>
    {localStorage.getItem("passwordChangeRequest") !== null ? (
      <div className={ styles.container }>
      <p className="text text_type_main-medium">Восстановление пароля</p>
      <PasswordInput
        onChange={onChangePassword}
        placeholder='Введите новый пароль'
        value={password}
        name={'password'}
        extraClass="pt-6"
      />
      <Input
      type={'text'}
      placeholder={'Введите код из письма'}
      onChange={onChangeToken}
      value={token}
      name={'token'}
      extraClass="pt-6"
      />
      <Button htmlType="button" type="primary" size="large" extraClass="mt-6 mb-20" onClick={onClick}>Сохранить</Button>
      <p className="text text_type_main-default text_color_inactive pb-4">Вспомнили пароль? <Link className={ styles.link } to={'/login'} >Войти</Link></p>
      </div>
    ) : (
      <Navigate to="/" replace={true} />
    )}
    </>
  )

}
