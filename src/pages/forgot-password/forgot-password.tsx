import { EmailInput, PasswordInput, Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './forgot-password.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { forgotPassword } from '../../common/services/api';
import { useForm } from '../../common/hooks/useForm';
import { ROUTE_RESET_PASSWORD } from '../../common/utils/constants';
import { FormEvent } from 'react';

export function ForgotPassPage() {
  const navigate = useNavigate();

  const {values, handleChange, setValues} = useForm({email: ''});

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(values.email) {
      forgotPassword(values.email)
      .then(() => {
        localStorage.setItem("passwordChangeRequest", 'true');
        navigate(ROUTE_RESET_PASSWORD, { replace: true });
      })
    }
  }

  return (
    <>
    <div className={ styles.container }>
      <p className="text text_type_main-medium">Восстановление пароля</p>
      <form onSubmit={onSubmit} className={ styles.form__container }>
        <EmailInput
          onChange={handleChange}
          value={values.email ?? ''}
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
