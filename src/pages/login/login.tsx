import { EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { FormEvent } from 'react';
import styles from './login.module.css';
import { Link } from 'react-router-dom';
import { login } from '../../common/services/action';
import { useForm } from '../../common/hooks/useForm';
import { useAppDispatch } from '../../common/hooks/hooks';

export function LoginPage() {
  const dispatch = useAppDispatch();

  const {values, handleChange, setValues} = useForm({
    email: '',
    password: ''
  });

  const formLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(login({email: values.email ?? '', password: values.password ?? ''}));
  }

  return (
    <>
    <form onSubmit={formLogin}>
      <div className={ styles.container }>
        <p className="text text_type_main-medium">Вход</p>
        <EmailInput
          onChange={handleChange}
          value={values.email ?? ''}
          name={'email'}
          isIcon={false}
          extraClass="pt-6"
        />
        <PasswordInput
          onChange={handleChange}
          value={values.password ?? ''}
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
