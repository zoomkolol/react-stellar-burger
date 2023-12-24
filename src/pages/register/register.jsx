import { Typography, EmailInput, PasswordInput, Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';
import styles from './register.module.css';
import { Link } from 'react-router-dom';
import { register } from '../../common/services/api';

export function RegisterPage() {
  const [email, setEmail] = useState('');
  const onChangeEmail = e => {
    setEmail(e.target.value)
  };

  const [password , setPassword] = useState('');
  const onChangePassword = e => {
    setPassword(e.target.value)
  };

  const [name , setName] = useState('');
  const onChangeName = e => {
    setName(e.target.value)
  };

  const onClick = () => {
    register(email, password, name)
  }

  return (
    <>
    <div className={ styles.container }>
      <p className="text text_type_main-medium">Регистрация</p>
      <Input
      type={'text'}
      placeholder={'Имя'}
      onChange={onChangeName}
      value={name}
      name={'name'}
      extraClass="pt-6"
    />
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
      <Button htmlType="button" type="primary" size="large" extraClass="mt-6 mb-20" onClick={onClick}>Зарегистрироваться</Button>
      <p className="text text_type_main-default text_color_inactive pb-4">Уже зарегистрированы? <Link className={ styles.link } to={'/login'} >Войти</Link></p>
    </div>

    </>
  )
}
