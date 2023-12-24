import { NavLink } from 'react-router-dom';
import styles from './profile.module.css';
import { Typography, Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout, updateUser } from '../../common/services/action';

//TODO: доделать ивент onBlur, вынести в отдельную функцию, добавить сброс value до стейта

export function ProfilePage() {
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user.user);
  const inputRef = useRef(null);

  const [isDisabled, setIsDisabled] = useState(true);

  const onIconClick = () => {
    setIsDisabled(false);
    setTimeout(() => inputRef.current.focus(), 0)
  }

  const [email, setEmail] = useState(user.email);
  const onChangeEmail = e => {
    setEmail(e.target.value)
  };

  const [password , setPassword] = useState('');
  const onChangePassword = e => {
    setPassword(e.target.value)
  };

  const [name , setName] = useState(user.name);
  const onChangeName = e => {
    setName(e.target.value)
  };

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  }

  const resetForm = () => {
    setEmail(user.email);
    setPassword('');
    setName(user.name);
  }

  const submitForm = (e) => {
    e.preventDefault();
    dispatch(updateUser(email, name));
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
          onChange={onChangeName}
          value={name}
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
          onChange={onChangeEmail}
          value={email}
          placeholder={'Логин'}
          name={'email'}
          isIcon={true}
          extraClass="pt-6"
        />
        <PasswordInput
          onChange={onChangePassword}
          value={password}
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
