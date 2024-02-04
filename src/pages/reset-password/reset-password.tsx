import { PasswordInput, Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './reset-password.module.css';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { resetPassword } from '../../common/services/api';
import { useForm } from '../../common/hooks/useForm';
import { ROUTE_HOMEPAGE } from '../../common/utils/constants';

export function ResetPassPage() {
  const passwordChangeRequest = localStorage.getItem("passwordChangeRequest");
  const navigate = useNavigate();

  const {values, handleChange, setValues} = useForm({
    password: '',
    token: ''
  });

  const onClick = () => {
    if(values.password && values.token) {
      resetPassword(values.password, values.token)
      .then(() => {
      localStorage.removeItem("passwordChangeRequest");
      navigate(ROUTE_HOMEPAGE, { replace: true });
    })
    }
  }

  return (
    <>
    {passwordChangeRequest === "true" ? (
      <div className={ styles.container }>
      <p className="text text_type_main-medium">Восстановление пароля</p>
      <PasswordInput
        onChange={handleChange}
        placeholder='Введите новый пароль'
        value={values.password ?? ''}
        name={'password'}
        extraClass="pt-6"
      />
      <Input
      type={'text'}
      placeholder={'Введите код из письма'}
      onChange={handleChange}
      value={values.token ?? ''}
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
