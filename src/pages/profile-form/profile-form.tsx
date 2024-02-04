import styles from './profile-form.module.css';
import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { FormEvent, useRef, useState } from 'react';
import { useForm } from '../../common/hooks/useForm';
import { updateUser } from '../../common/services/action';
import { useAppDispatch, useAppSelector } from '../../common/hooks/hooks';
import { RootState } from '../../app/store';

export function ProfileFormPage() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(store => store.user.user);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  const initialValues = {
    name: user?.name,
    email: user?.email,
    password: ''
  }

  const {values, handleChange, setValues} = useForm(initialValues);

  const onIconClick = () => {
    setIsDisabled(false);
    setTimeout(() => inputRef.current?.focus(), 0)
  }

  const resetForm = () => {
    setValues(initialValues);
    console.log(values.email, values.name, values.password);
  }

  const submitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(updateUser(values.email ?? '', values.name ?? '', values.password ?? ''));
    console.log(values.email, values.name, values.password);
  }


  return (
    <>
    <form className={ styles.profile__form } onSubmit={submitForm}>
        <Input
          type={'text'}
          placeholder={'Имя'}
          onChange={handleChange}
          value={values.name ?? ''}
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
          value={values.email ?? ''}
          placeholder={'Логин'}
          name={'email'}
          isIcon={true}
          extraClass="pt-6"
        />
        <PasswordInput
          onChange={handleChange}
          value={values.password ?? ''}
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
