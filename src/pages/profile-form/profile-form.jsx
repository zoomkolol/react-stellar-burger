import { useDispatch, useSelector } from 'react-redux';
import styles from './profile-form.module.css';
import { Typography, Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useRef, useState } from 'react';
import { useForm } from '../../common/hooks/useForm';
import { updateUser } from '../../common/services/action';

export function ProfileFormPage() {
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

  const resetForm = () => {
    setValues(initialValues);
  }

  const submitForm = (e) => {
    e.preventDefault();
    dispatch(updateUser(values.email, values.name, values.password));
  }
  return (
    <>
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
    </>
  )
}
