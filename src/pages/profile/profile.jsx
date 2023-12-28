import { NavLink } from 'react-router-dom';
import styles from './profile.module.css';
import { Typography, Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout, updateUser } from '../../common/services/action';
import { useForm } from '../../common/hooks/useForm';

export function ProfilePage() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user.user);
  const inputRef = useRef(null);
  const [isDisabled, setIsDisabled] = useState(true);

  const initialValues = {
    name: user.name,
    email: user.email,
    password: ''
  }

  const {values, handleChange, setValues} = useForm(initialValues);

  const onIconClick = () => {
    setIsDisabled(false);
    setTimeout(() => inputRef.current.focus(), 0)
  }

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  }

  const resetForm = () => {
    setValues(initialValues);
  }

  const submitForm = (e) => {
    e.preventDefault();
    dispatch(updateUser(values.email, values.name, values.password));
  }

  return (
    <>
    <div className={ styles.container}>
      <div className={ styles.list__container + ' mr-15' } >
        <ul className={ styles.list + ' mb-20' }>
          <li>
            <NavLink to='/profile' className={ styles.list__element }>{
              ({isActive}) => (
                <p className={isActive ? "text text_type_main-medium" : 'text text_type_main-medium text_color_inactive'}>Профиль</p>
              )
            }
            </NavLink>
          </li>
          <li>
            <NavLink to='/profile/orders' className={ styles.list__element }>{
              ({isActive}) => (
                <p className={isActive ? "text text_type_main-medium" : 'text text_type_main-medium text_color_inactive'}>История заказов</p>
              )
            }
            </NavLink>
          </li>
          <li>
            <NavLink onClick={handleLogout} className={styles.list__element}><p className='text text_type_main-medium text_color_inactive'>Выход</p></NavLink>
          </li>
        </ul>
        <p className={styles.notation__container + " text text_type_main-default text_color_inactive"}>В этом разделе вы можете изменить свои персональные данные</p>
      </div>
      <form className={ styles.profile__form } onSubmit={submitForm}>
        <Input
          type={'text'}
          placeholder={'Имя'}
          onChange={handleChange}
          value={values.name}
          name={'name'}
          extraClass="pt-6"
          icon="EditIcon"
          disabled={isDisabled}
          ref={inputRef}
          error={false}
          onIconClick={onIconClick}
          onBlur={() => setIsDisabled(true)}
        />
        <EmailInput
          onChange={handleChange}
          value={values.email}
          placeholder={'Логин'}
          name={'email'}
          isIcon={true}
          extraClass="pt-6"
        />
        <PasswordInput
          onChange={handleChange}
          value={values.password}
          name={'password'}
          icon="EditIcon"
          extraClass="pt-6 pb-6"
        />
        <div>
          <Button htmlType="button" type="secondary" size="medium" onClick={resetForm}>Отмена</Button>
          <Button htmlType="submit" type="primary" size="medium">Сохранить</Button>
        </div>
      </form>
    </div>
    </>
  )
}
