import { Typography, EmailInput, PasswordInput, Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './register.module.css';
import { Link } from 'react-router-dom';
import { register } from '../../common/services/action';
import { useForm } from '../../common/hooks/useForm';
import { useDispatch } from 'react-redux';

export function RegisterPage() {
  const dispatch = useDispatch();

  const {values, handleChange, setValues} = useForm({
    email: '',
    password: '',
    name: ''
  });

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(register(values.email, values.password, values.name));
  }

  return (
    <>
    <div className={ styles.container }>
      <p className="text text_type_main-medium">Регистрация</p>
      <form className={ styles.form } onSubmit={onSubmit}>
        <Input
        type={'text'}
        placeholder={'Имя'}
        onChange={handleChange}
        value={values.name}
        name={'name'}
        extraClass="pt-6"
        />
        <EmailInput
          onChange={handleChange}
          value={values.email}
          name={'email'}
          isIcon={false}
          extraClass="pt-6"
        />
        <PasswordInput
          onChange={handleChange}
          value={values.password}
          name={'password'}
          extraClass="pt-6"
        />
        <Button htmlType="submit" type="primary" size="large" extraClass="mt-6 mb-20">Зарегистрироваться</Button>
      </form>
      <p className="text text_type_main-default text_color_inactive pb-4">Уже зарегистрированы? <Link className={ styles.link } to={'/login'} >Войти</Link></p>
    </div>

    </>
  )
}
